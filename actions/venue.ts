"use server";

import sql from "mssql";

import connectDB from "@/lib/db";

import { auth } from "@/lib/auth";

import { revalidatePath } from "next/cache";

import { redirect } from "next/navigation";

export async function createVenue(formData: FormData) {
  // Get session
  const session = await auth();

  // RBAC Protection
  if (!session || session.user.role !== "ADMIN") {
    throw new Error("Unauthorized");
  }

  // Extract fields
  const venue_name = formData.get("venue_name") as string;

  const location = formData.get("location") as string;

  const capacity = Number(formData.get("capacity"));

  const venue_type = formData.get("venue_type") as string;

  // Basic validation
  if (!venue_name || !capacity) {
    throw new Error("Venue name and capacity are required");
  }

  try {
    const pool = await connectDB();

    if (pool) {
      await pool
        .request()
        .input("venue_name", sql.VarChar, venue_name)
        .input("location", sql.VarChar, location)
        .input("capacity", sql.Int, capacity)
        .input("venue_type", sql.VarChar, venue_type).query(`
            INSERT INTO Venues (
               venue_name,
               location,
               capacity,
               venue_type
            )
            VALUES (
               @venue_name,
               @location,
               @capacity,
               @venue_type
            )
         `);
    }
  } catch (error) {
    console.error("Create Venue Error:", error);

    throw new Error("Failed to create venue");
  }

  // Refresh venue page cache
  revalidatePath("/venues");

  // Redirect after success
  redirect("/venues");
}
