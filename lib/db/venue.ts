import sql from "mssql";

import connectDB from "@/lib/db";

export async function getVenues() {
  try {
    const pool = await connectDB();

    if (pool) {
      const result = await pool.request().query(`
        SELECT *
        FROM Venues
        ORDER BY venue_id ASC
      `);

      return result.recordset;
    }
  } catch (error) {
    console.error("Get Venues Error:", error);

    throw new Error("Failed to fetch venues");
  }
}

export async function getVenueById(id: number) {
  try {
    const pool = await connectDB();

    if (pool) {
      const result = await pool.request().input("id", sql.Int, id).query(`
          SELECT *
          FROM Venues
          WHERE venue_id = @id
        `);

      return result.recordset[0];
    }
  } catch (error) {
    console.error("Get Venue Error:", error);

    throw new Error("Failed to fetch venue");
  }
}
