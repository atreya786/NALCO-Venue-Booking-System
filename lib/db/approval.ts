import sql from "mssql";

import connectDB from "../db";

import { updateVenueAllocation } from "../utils/allocation";

export async function updateApprovalStatus(data: {
  appointment_id: number;

  role: string;

  action: "APPROVED" | "REJECTED";
}) {
  const pool = await connectDB();

  if (!pool) {
    throw new Error("Database connection failed");
  }

  // Get booking
  const result = await pool.request().input("id", sql.Int, data.appointment_id)
    .query(`
      SELECT *
      FROM Bookings
      WHERE appointment_id = @id
    `);

  const booking = result.recordset[0];

  if (!booking) {
    throw new Error("Booking not found");
  }

  // Prevent finalized changes
  if (booking.status === "REJECTED" || booking.status === "CANCELLED") {
    throw new Error("This booking is finalized");
  }

  // GUIDE APPROVAL
  if (data.role === "GUIDE") {
    if (booking.guide_status !== "PENDING") {
      throw new Error("Guide approval already completed");
    }

    await pool.request().input("id", sql.Int, data.appointment_id).query(`
        UPDATE Bookings
        SET
          guide_status = '${data.action}',
          status = '${data.action === "REJECTED" ? "REJECTED" : "PENDING"}'
        WHERE appointment_id = @id
      `);

    return;
  }

  // HOD APPROVAL
  if (data.role === "HOD") {
    if (booking.guide_status !== "APPROVED") {
      throw new Error("Guide approval required first");
    }

    if (booking.hod_status !== "PENDING") {
      throw new Error("HOD approval already completed");
    }

    await pool.request().input("id", sql.Int, data.appointment_id).query(`
        UPDATE Bookings
        SET
          hod_status = '${data.action}',
          status = '${data.action === "REJECTED" ? "REJECTED" : "PENDING"}'
        WHERE appointment_id = @id
      `);

    return;
  }

  // ADMIN APPROVAL
  if (data.role === "ADMIN") {
    if (booking.hod_status !== "APPROVED") {
      throw new Error("HOD approval required first");
    }

    if (booking.admin_status !== "PENDING") {
      throw new Error("Admin approval already completed");
    }

    // REJECT
    if (data.action === "REJECTED") {
      await pool.request().input("id", sql.Int, data.appointment_id).query(`
          UPDATE Bookings
          SET
            admin_status = 'REJECTED',
            status = 'REJECTED'
          WHERE appointment_id = @id
        `);

      return;
    }

    // APPROVE
    await pool.request().input("id", sql.Int, data.appointment_id).query(`
        UPDATE Bookings
        SET
          admin_status = 'APPROVED',
          status = 'APPROVED'
        WHERE appointment_id = @id
      `);

    // RUN ALLOCATION ENGINE
    await updateVenueAllocation(booking.venue_id, booking.booking_date);

    return;
  }

  throw new Error("Invalid role");
}
