import sql from "mssql";

import connectDB from "../db";

import { validateBooking } from "../utils/booking-validation";

import { updateVenueAllocation } from "../utils/allocation";

export async function getBookings() {
  const pool = await connectDB();

  const result = await pool?.request().query(`
    SELECT
      b.*,

      u.name AS requested_by_name,

      u.role AS requested_by_role,

      v.venue_name

    FROM Bookings b

    JOIN Users u
      ON b.requested_by = u.user_id

    JOIN Venues v
      ON b.venue_id = v.venue_id

    ORDER BY b.created_at DESC
  `);

  return result?.recordset;
}

export async function getBookingsByUserId(user_id: number) {
  const pool = await connectDB();

  const result = await pool?.request().input("user_id", sql.Int, user_id)
    .query(`
      SELECT
        b.*,

        u.name AS requested_by_name,

        u.role AS requested_by_role,

        v.venue_name

      FROM Bookings b

      JOIN Users u
        ON b.requested_by = u.user_id

      JOIN Venues v
        ON b.venue_id = v.venue_id

      WHERE
        b.requested_by = @user_id

      ORDER BY
        b.created_at DESC
    `);

  return result?.recordset;
}

export async function getBookingById(id: number) {
  const pool = await connectDB();

  const result = await pool?.request().input("id", sql.Int, id).query(`
      SELECT
        b.*,

        u.name AS requested_by_name,

        u.role AS requested_by_role,

        v.venue_name

      FROM Bookings b

      JOIN Users u
        ON b.requested_by = u.user_id

      JOIN Venues v
        ON b.venue_id = v.venue_id

      WHERE
        b.appointment_id = @id
    `);

  return result?.recordset[0];
}

export async function createBooking(data: {
  venue_id: number;

  requested_by: number;

  booking_date: string;

  purpose: string;

  description: string;
}) {
  const pool = await connectDB();

  if (!pool) {
    throw new Error("Database connection failed");
  }

  await validateBooking(data.venue_id, data.booking_date);

  await pool
    .request()
    .input("venue_id", sql.Int, data.venue_id)
    .input("requested_by", sql.Int, data.requested_by)
    .input("booking_date", sql.Date, data.booking_date)
    .input("purpose", sql.NVarChar, data.purpose)
    .input("description", sql.NVarChar, data.description).query(`
      INSERT INTO Bookings (
        venue_id,
        requested_by,
        booking_date,
        purpose,
        description,
        status,
        guide_status,
        hod_status,
        admin_status,
        is_allocated
      )
      VALUES (
        @venue_id,
        @requested_by,
        @booking_date,
        @purpose,
        @description,
        'PENDING',
        'PENDING',
        'PENDING',
        'PENDING',
        0
      )
    `);
}

export async function updateBooking(data: {
  appointment_id: number;

  venue_id: number;

  booking_date: string;

  purpose: string;

  description: string;
}) {
  const pool = await connectDB();

  if (!pool) {
    throw new Error("Database connection failed");
  }

  await pool
    .request()
    .input("appointment_id", sql.Int, data.appointment_id)
    .input("venue_id", sql.Int, data.venue_id)
    .input("booking_date", sql.Date, data.booking_date)
    .input("purpose", sql.NVarChar, data.purpose)
    .input("description", sql.NVarChar, data.description).query(`
      UPDATE Bookings

      SET
        venue_id = @venue_id,

        booking_date = @booking_date,

        purpose = @purpose,

        description = @description,

        updated_at = GETDATE()

      WHERE
        appointment_id = @appointment_id
    `);
}

export async function cancelBooking(appointment_id: number) {
  const pool = await connectDB();

  if (!pool) {
    throw new Error("Database connection failed");
  }

  // Get booking
  const result = await pool.request().input("id", sql.Int, appointment_id)
    .query(`
      SELECT *
      FROM Bookings
      WHERE appointment_id = @id
    `);

  const booking = result.recordset[0];

  if (!booking) {
    throw new Error("Booking not found");
  }

  // Cancel booking
  await pool.request().input("id", sql.Int, appointment_id).query(`
      UPDATE Bookings

      SET
        status = 'CANCELLED',

        is_allocated = 0

      WHERE
        appointment_id = @id
    `);

  // Recalculate allocation
  await updateVenueAllocation(booking.venue_id, booking.booking_date);
}

export async function getAllocatedBookings() {
  const pool = await connectDB();

  const result = await pool?.request().query(`
      SELECT
        b.*,

        u.name AS requested_by_name,

        u.role AS requested_by_role,

        v.venue_name

      FROM Bookings b

      JOIN Users u
        ON b.requested_by = u.user_id

      JOIN Venues v
        ON b.venue_id = v.venue_id

      WHERE
        b.status = 'APPROVED'

      AND
        b.is_allocated = 1

      ORDER BY
        b.booking_date ASC
    `);

  return result?.recordset;
}

export async function getQueuedBookings() {
  const pool = await connectDB();

  const result = await pool?.request().query(`
      SELECT
        b.*,

        u.name AS requested_by_name,

        u.role AS requested_by_role,

        v.venue_name

      FROM Bookings b

      JOIN Users u
        ON b.requested_by = u.user_id

      JOIN Venues v
        ON b.venue_id = v.venue_id

      WHERE
        b.status = 'APPROVED'

      AND
        b.is_allocated = 0

      ORDER BY
        b.booking_date ASC,
        b.created_at ASC
    `);

  return result?.recordset;
}

export async function getVenueQueues() {
  const pool = await connectDB();

  const result = await pool?.request().query(`
      SELECT
        b.*,

        u.name AS requested_by_name,

        u.role AS requested_by_role,

        v.venue_name

      FROM Bookings b

      JOIN Users u
        ON b.requested_by = u.user_id

      JOIN Venues v
        ON b.venue_id = v.venue_id

      WHERE
        b.status = 'APPROVED'

      ORDER BY
        v.venue_name,
        b.booking_date,
        b.created_at ASC
    `);

  const bookings = result?.recordset || [];

  const grouped: Record<string, any[]> = {};

  for (const booking of bookings) {
    const key = `
      ${booking.venue_name}
      - 
      ${booking.booking_date}
    `;

    if (!grouped[key]) {
      grouped[key] = [];
    }

    grouped[key].push(booking);
  }

  return grouped;
}
