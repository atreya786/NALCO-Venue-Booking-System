"use server";

import { auth } from "@/lib/auth";

import { redirect } from "next/navigation";

import { revalidatePath } from "next/cache";

import { createBooking, updateBooking } from "@/lib/db/bookings";

export async function createBookingAction(formData: FormData) {
  const session = await auth();

  if (!session) {
    redirect("/login");
  }

  const venue_id = Number(formData.get("venue_id"));

  const booking_date = String(formData.get("booking_date"));

  const purpose = String(formData.get("purpose"));

  const description = String(formData.get("description"));

  await createBooking({
    venue_id,

    requested_by: Number(session.user.id),

    booking_date,

    purpose,

    description,
  });

  revalidatePath("/bookings");

  revalidatePath("/approvals");

  revalidatePath("/queue");

  redirect("/bookings");
}

export async function updateBookingAction(formData: FormData) {
  const session = await auth();

  if (!session) {
    redirect("/login");
  }

  await updateBooking({
    appointment_id: Number(formData.get("appointment_id")),

    venue_id: Number(formData.get("venue_id")),

    booking_date: String(formData.get("booking_date")),

    purpose: String(formData.get("purpose")),

    description: String(formData.get("description")),
  });

  revalidatePath("/bookings");

  revalidatePath("/queue");

  redirect("/bookings");
}
