import sql from "mssql";

import connectDB from "../db";

export async function getBlockedDates() {
  const pool = await connectDB();

  const result = await pool?.request().query(`
      SELECT *
      FROM BlockedDates

      ORDER BY blocked_date ASC
    `);

  return result?.recordset;
}

export async function blockDate(booking_date: string, reason: string) {
  const pool = await connectDB();

  if (!pool) {
    throw new Error("Database connection failed");
  }

  await pool
    .request()
    .input("booking_date", sql.Date, booking_date)
    .input("reason", sql.NVarChar, reason).query(`
      INSERT INTO BlockedDates (
        blocked_date,
        reason
      )
      VALUES (
        @booking_date,
        @reason
      )
    `);
}

export async function unblockDate(booking_date: string) {
  const pool = await connectDB();

  if (!pool) {
    throw new Error("Database connection failed");
  }

  await pool.request().input("booking_date", sql.Date, booking_date).query(`
      DELETE FROM BlockedDates

      WHERE blocked_date = @booking_date
    `);
}
