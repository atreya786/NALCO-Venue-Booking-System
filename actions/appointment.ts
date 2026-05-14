"use server";

import { auth } from "@/lib/auth";

import { redirect } from "next/navigation";

import { revalidatePath } from "next/cache";

import { createAppointment } from "@/lib/db/appointment";

export async function createAppointmentAction(formData: FormData) {
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

  await createAppointment({
    venue_id: Number(formData.get("venue_id")),

    requested_by: Number(session.user.id),

    purpose: String(formData.get("purpose")),

    description: String(formData.get("description")),

    start_time: startDateTime,

    end_time: endDateTime,
  });

  revalidatePath("/appointments");

  redirect("/appointments");
}
