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

  const startDate = String(formData.get("start_date"));

  const startTime = String(formData.get("start_time"));

  const endDate = String(formData.get("end_date"));

  const endTime = String(formData.get("end_time"));

  const startDateTime = new Date(`${startDate}T${startTime}`);

  const endDateTime = new Date(`${endDate}T${endTime}`);

  await createBooking({
    venue_id: Number(formData.get("venue_id")),

    requested_by: Number(session.user.id),

    purpose: String(formData.get("purpose")),

    description: String(formData.get("description")),

    start_time: startDateTime,

    end_time: endDateTime,
  });

  revalidatePath("/approvals");

  redirect("/approvals");
}

export async function updateBookingAction(formData: FormData) {
  const session = await auth();

  if (!session) {
    redirect("/login");
  }

  const startDate = String(formData.get("start_date"));

  const startTime = String(formData.get("start_time"));

  const endDate = String(formData.get("end_date"));

  const endTime = String(formData.get("end_time"));

  const startDateTime = new Date(`${startDate}T${startTime}`);

  const endDateTime = new Date(`${endDate}T${endTime}`);

  await updateBooking({
    appointment_id: Number(formData.get("appointment_id")),

    venue_id: Number(formData.get("venue_id")),

    purpose: String(formData.get("purpose")),

    description: String(formData.get("description")),

    start_time: startDateTime,

    end_time: endDateTime,
  });

  revalidatePath("/bookings");

  redirect("/bookings");
}
