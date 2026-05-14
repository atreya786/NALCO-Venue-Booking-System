"use server";

import { auth } from "@/lib/auth";

import { revalidatePath } from "next/cache";

import { updateApprovalStatus } from "@/lib/db/approval";

export async function approveBooking(appointment_id: number) {
  const session = await auth();

  if (!session) {
    throw new Error("Unauthorized");
  }

  await updateApprovalStatus({
    appointment_id,

    role: session.user.role!,

    action: "APPROVED",
  });

  revalidatePath("/approvals");

  revalidatePath(`/bookings/${appointment_id}`);
}

export async function rejectBooking(appointment_id: number) {
  const session = await auth();

  if (!session) {
    throw new Error("Unauthorized");
  }

  await updateApprovalStatus({
    appointment_id,

    role: session.user.role!,

    action: "REJECTED",
  });

  revalidatePath("/approvals");

  revalidatePath(`/bookings/${appointment_id}`);
}
