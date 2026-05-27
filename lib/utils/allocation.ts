import sql from "mssql";

import connectDB from "@/lib/db";

import { ROLE_PRIORITY } from "@/lib/constants/priority";

export async function updateVenueAllocation(
  venue_id: number,
  booking_date: string,
) {
  const pool = await connectDB();

  if (!pool) {
    throw new Error("Database connection failed");
  }

  // Get all approved requests
  const result = await pool
    .request()
    .input("venue_id", sql.Int, venue_id)
    .input("booking_date", sql.Date, booking_date).query(`
      SELECT
        b.*,
        u.role

      FROM Bookings b

      JOIN Users u
        ON b.requested_by = u.user_id

      WHERE
        b.venue_id = @venue_id

      AND
        b.booking_date = @booking_date

      AND
        b.status = 'APPROVED'
    `);

  const bookings = result.recordset;

  if (!bookings.length) {
    return;
  }

  // Sort by:
  // 1. Role priority
  // 2. Created time

  bookings.sort((a, b) => {
    const roleDiff =
      ROLE_PRIORITY[a.role as keyof typeof ROLE_PRIORITY] -
      ROLE_PRIORITY[b.role as keyof typeof ROLE_PRIORITY];

    if (roleDiff !== 0) {
      return roleDiff;
    }

    return new Date(a.created_at).getTime() - new Date(b.created_at).getTime();
  });

  // Reset allocation first
  await pool
    .request()
    .input("venue_id", sql.Int, venue_id)
    .input("booking_date", sql.Date, booking_date).query(`
      UPDATE Bookings
      SET is_allocated = 0

      WHERE
        venue_id = @venue_id

      AND
        booking_date = @booking_date
    `);

  // Allocate top priority booking
  const winner = bookings[0];

  await pool.request().input("booking_id", sql.Int, winner.appointment_id)
    .query(`
      UPDATE Bookings
      SET is_allocated = 1

      WHERE appointment_id = @booking_id
    `);
}
