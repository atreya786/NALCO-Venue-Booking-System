import connectDB from "@/lib/db";

export async function getVenues() {
  try {
    const pool = await connectDB();

    if (pool) {
      const result = await pool.request().query(`
            SELECT *
            FROM Venues
            WHERE is_active = 1
            ORDER BY created_at DESC
         `);

      return result.recordset;
    }
  } catch (error) {
    console.error("Get Venues Error:", error);

    throw new Error("Failed to fetch venues");
  }
}
