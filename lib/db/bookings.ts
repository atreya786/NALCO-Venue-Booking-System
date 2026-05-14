import sql from "mssql";

import connectDB from "../db";

export async function getBookings() {
  const pool = await connectDB();

  const result = await pool?.request().query(`
    SELECT
      a.*,
      u.name AS requested_by_name,
      v.venue_name
    FROM Bookings a
    JOIN Users u
      ON a.requested_by = u.user_id
    JOIN Venues v
      ON a.venue_id = v.venue_id
    ORDER BY a.created_at ASC
  `);

  return result?.recordset;
}

export async function createBooking(data: {
  venue_id: number;
  requested_by: number;
  purpose: string;
  description: string;
  start_time: Date;
  end_time: Date;
}) {
  const pool = await connectDB();

  if (pool)
    await pool
      .request()
      .input("venue_id", sql.Int, data.venue_id)
      .input("requested_by", sql.Int, data.requested_by)
      .input("purpose", sql.NVarChar, data.purpose)
      .input("description", sql.NVarChar, data.description)
      .input("start_time", sql.DateTime2, data.start_time)
      .input("end_time", sql.DateTime2, data.end_time).query(`
  INSERT INTO Bookings (
    venue_id,
    requested_by,
    purpose,
    description,
    start_time,
    end_time,
    status,
    faculty_status,
    hod_status,
    admin_status
  )
  VALUES (
    @venue_id,
    @requested_by,
    @purpose,
    @description,
    @start_time,
    @end_time,
    'PENDING',
    'PENDING',
    'PENDING',
    'PENDING'
  )
`);
}

export async function getBookingById(id: number) {
  const pool = await connectDB();

  const result = await pool?.request().input("id", sql.Int, id).query(`
      SELECT
        a.*,

        u.name AS requested_by_name,

        u.role AS requested_by_role,

        v.venue_name

      FROM Bookings a

      JOIN Users u
        ON a.requested_by = u.user_id

      JOIN Venues v
        ON a.venue_id = v.venue_id

      WHERE a.appointment_id = @id
    `);

  return result?.recordset[0];
}

export async function updateBooking(data: {
  appointment_id: number;

  venue_id: number;

  purpose: string;

  description: string;

  start_time: Date;

  end_time: Date;
}) {
  const pool = await connectDB();

  if (pool)
    await pool
      .request()
      .input("appointment_id", sql.Int, data.appointment_id)
      .input("venue_id", sql.Int, data.venue_id)
      .input("purpose", sql.NVarChar, data.purpose)
      .input("description", sql.NVarChar, data.description)
      .input("start_time", sql.DateTime2, data.start_time)
      .input("end_time", sql.DateTime2, data.end_time).query(`
        UPDATE Bookings
        SET
          venue_id = @venue_id,
          purpose = @purpose,
          description = @description,
          start_time = @start_time,
          end_time = @end_time,
          updated_at = GETDATE()
        WHERE appointment_id = @appointment_id
      `);
}

export async function getBookingsByUserId(user_id: number) {
  const pool = await connectDB();

  const result = await pool?.request().input("user_id", sql.Int, user_id)
    .query(`
      SELECT
        b.*,
        u.name AS requested_by_name,
        v.venue_name
      FROM Bookings b

      JOIN Users u
        ON b.requested_by = u.user_id

      JOIN Venues v
        ON b.venue_id = v.venue_id

      WHERE b.requested_by = @user_id

      ORDER BY b.created_at DESC
    `);

  return result?.recordset;
}
