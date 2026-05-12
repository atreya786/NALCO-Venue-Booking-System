import connectDB from "@/lib/db";

export default async function Page() {
  const pool = await connectDB();

  const result = await pool?.request().query(`
    select * from users
    `);

  console.log(result?.recordset);

  return <div>Dashboard</div>;
}
