"use server";

import { auth } from "@/lib/auth";

import { revalidatePath } from "next/cache";

import { updateApprovalStatus } from "@/lib/db/approval";

export async function approveAppointment(appointment_id: number) {
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

  revalidatePath(`/appointments/${appointment_id}`);
}

export async function rejectAppointment(appointment_id: number) {
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

  revalidatePath(`/appointments/${appointment_id}`);
}
