import sql from "mssql";

import connectDB from "../db";

export async function getAppointments() {
  const pool = await connectDB();

  const result = await pool?.request().query(`
    SELECT
      a.*,
      u.name AS requested_by_name,
      v.venue_name
    FROM Appointments a
    JOIN Users u
      ON a.requested_by = u.user_id
    JOIN Venues v
      ON a.venue_id = v.venue_id
    ORDER BY a.created_at DESC
  `);

  return result?.recordset;
}

export async function createAppointment(data: {
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
      INSERT INTO Appointments (
        venue_id,
        requested_by,
        purpose,
        description,
        start_time,
        end_time
      )
      VALUES (
        @venue_id,
        @requested_by,
        @purpose,
        @description,
        @start_time,
        @end_time
      )
    `);
}
