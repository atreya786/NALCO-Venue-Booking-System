import sql from "mssql";

import connectDB from "../db";

export async function updateApprovalStatus(data: {
  appointment_id: number;

  role: string;

  action: "APPROVED" | "REJECTED";
}) {
  const pool = await connectDB();

  if (!pool) return;

  let query = "";

  if (data.role === "FACULTY") {
    query = `
      UPDATE Bookings
      SET
        faculty_status = '${data.action}',
        status = '${data.action === "REJECTED" ? "REJECTED" : "PENDING"}'
      WHERE appointment_id = @appointment_id
    `;
  }

  if (data.role === "HOD") {
    query = `
      UPDATE Bookings
      SET
        hod_status = '${data.action}',
        status = '${data.action === "REJECTED" ? "REJECTED" : "PENDING"}'
      WHERE appointment_id = @appointment_id
    `;
  }

  if (data.role === "ADMIN") {
    query = `
      UPDATE Bookings
      SET
        admin_status = '${data.action}',
        status = '${data.action}',
        approved_at = CASE
          WHEN '${data.action}' = 'APPROVED'
          THEN GETDATE()
          ELSE approved_at
        END
      WHERE appointment_id = @appointment_id
    `;
  }

  await pool
    .request()
    .input("appointment_id", sql.Int, data.appointment_id)
    .query(query);
}
