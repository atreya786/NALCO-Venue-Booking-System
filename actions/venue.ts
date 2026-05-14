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

export async function updateVenue(id: string, formData: FormData) {
  const session = await auth();

  // RBAC
  if (!session || session.user.role !== "ADMIN") {
    throw new Error("Unauthorized");
  }

  const venue_name = formData.get("venue_name") as string;

  const location = formData.get("location") as string;

  try {
    const pool = await connectDB();

    if (pool) {
      await pool
        .request()
        .input("id", sql.Int, Number(id))
        .input("venue_name", sql.VarChar, venue_name)
        .input("location", sql.VarChar, location).query(`
      UPDATE Venues
      SET
         venue_name = @venue_name,
         location = @location
      WHERE venue_id = @id
   `);
    }
  } catch (error) {
    console.error("Update Venue Error:", error);

    // throw new Error("Failed to update venue");
  }

  revalidatePath("/venues");

  redirect("/venues");
}

export async function deactivateVenue(venue_id: string) {
  // Get session
  const session = await auth();

  // RBAC Protection
  if (!session || session.user.role !== "ADMIN") {
    throw new Error("Unauthorized");
  }

  const id = Number(venue_id);

  try {
    const pool = await connectDB();

    if (pool) {
      await pool.request().input("id", sql.Int, Number(id)).query(`
               UPDATE Venues
               SET is_active = 0
               WHERE venue_id = @id
            `);
    }
  } catch (error) {
    console.error("Deactivate Venue Error:", error);

    throw new Error("Failed to deactivate venue");
  }

  // Refresh venues page
  revalidatePath("/venues");
}

export async function activateVenue(venue_id: string) {
  const session = await auth();

  if (!session || session.user.role !== "ADMIN") {
    throw new Error("Unauthorized");
  }

  const id = Number(venue_id);

  try {
    const pool = await connectDB();

    if (pool) {
      await pool.request().input("id", sql.Int, Number(id)).query(`
               UPDATE Venues
               SET is_active = 1
               WHERE venue_id = @id
            `);
    }
  } catch (error) {
    console.error("Activate Venue Error:", error);

    throw new Error("Failed to activate venue");
  }

  revalidatePath("/venues");
}
