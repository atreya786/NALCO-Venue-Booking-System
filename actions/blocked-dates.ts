"use server";

import { blockDate, unblockDate } from "@/lib/db/blocked-dates";

import { auth } from "@/lib/auth";

import { redirect } from "next/navigation";

import { revalidatePath } from "next/cache";

export async function blockDateAction(formData: FormData) {
  const session = await auth();

  if (!session || session.user.role !== "ADMIN") {
    redirect("/");
  }

  const booking_date = String(formData.get("booking_date"));

  const reason = String(formData.get("reason"));

  await blockDate(booking_date, reason);

  revalidatePath("/admin");

  revalidatePath("/bookings");
}

export async function unblockDateAction(formData: FormData) {
  const session = await auth();

  if (!session || session.user.role !== "ADMIN") {
    redirect("/");
  }

  const booking_date = String(formData.get("booking_date"));

  await unblockDate(booking_date);

  revalidatePath("/admin");

  revalidatePath("/bookings");
}
