import sql from "mssql";

import connectDB from "../db";

export async function updateApprovalStatus(data: {
  appointment_id: number;

  role: string;

  action: "APPROVED" | "REJECTED";
}) {
  const pool = await connectDB();

  if (!pool) {
    throw new Error("Database connection failed");
  }

  // Get current booking state
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

  // Prevent changes after final state
  if (booking.status === "APPROVED" || booking.status === "REJECTED") {
    throw new Error("This booking is already finalized");
  }

  // FACULTY RULES
  if (data.role === "FACULTY") {
    if (booking.faculty_status !== "PENDING") {
      throw new Error("Faculty approval already completed");
    }

    await pool.request().input("id", sql.Int, data.appointment_id).query(`
        UPDATE Bookings
        SET
          faculty_status = '${data.action}',
          status = '${data.action === "REJECTED" ? "REJECTED" : "PENDING"}'
        WHERE appointment_id = @id
      `);

    return;
  }

  // HOD RULES
  if (data.role === "HOD") {
    if (booking.faculty_status !== "APPROVED") {
      throw new Error("Faculty approval required first");
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

  // ADMIN RULES
  if (data.role === "ADMIN") {
    if (booking.faculty_status !== "APPROVED") {
      throw new Error("Faculty approval required first");
    }

    if (booking.hod_status !== "APPROVED") {
      throw new Error("HOD approval required first");
    }

    if (booking.admin_status !== "PENDING") {
      throw new Error("Admin approval already completed");
    }

    await pool.request().input("id", sql.Int, data.appointment_id).query(`
        UPDATE Bookings
        SET
          admin_status = '${data.action}',
          status = '${data.action}',
          approved_at = CASE
            WHEN '${data.action}' = 'APPROVED'
            THEN GETDATE()
            ELSE approved_at
          END
        WHERE appointment_id = @id
      `);

    return;
  }

  throw new Error("Invalid role");
}

