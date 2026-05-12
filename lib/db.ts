import sql from "mssql";

const config: sql.config = {
  user: process.env.DB_USER!,
  password: process.env.DB_PASSWORD!,
  server: process.env.DB_SERVER!,
  database: process.env.DB_DATABASE!,

  options: {
    trustServerCertificate: true,
    encrypt: false,
  },
};

export default async function connectDB() {
  try {
    const pool = await sql.connect(config);

    console.log("MSSQL Connected");

    return pool;
  } catch (error) {
    console.log(error);
  }
}
