import sql from "mssql";

import connectDB from "../db";

export async function validateBooking(venue_id: number, booking_date: string) {
  const pool = await connectDB();

  if (!pool) {
    throw new Error("Database connection failed");
  }

  // CHECK WORKING HOURS

  const now = new Date();

  const currentHour = now.getHours();

  if (currentHour < 9 || currentHour >= 18) {
    throw new Error("Bookings allowed only between 9AM and 6PM");
  }

  // CHECK PAST DATE

  const today = new Date();

  today.setHours(0, 0, 0, 0);

  const selectedDate = new Date(booking_date);

  if (selectedDate < today) {
    throw new Error("Past dates are not allowed");
  }

  // CHECK BLOCKED DATE

  const blocked = await pool
    .request()
    .input("booking_date", sql.Date, booking_date).query(`
        SELECT *
        FROM BlockedDates
        WHERE blocked_date = @booking_date
      `);

  if (blocked.recordset.length > 0) {
    throw new Error("This date is blocked by admin");
  }

  // CHECK VENUE ACTIVE

  const venue = await pool.request().input("venue_id", sql.Int, venue_id)
    .query(`
        SELECT *
        FROM Venues
        WHERE
          venue_id = @venue_id

        AND
          is_active = 1
      `);

  if (venue.recordset.length === 0) {
    throw new Error("Venue is inactive");
  }
}
