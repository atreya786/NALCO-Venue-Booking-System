import { auth } from "@/lib/auth";

import { redirect } from "next/navigation";

import { getBookings, getBookingsByUserId } from "@/lib/db/bookings";

import { approveBooking, rejectBooking } from "@/actions/approval";

export default async function ApprovalsPage() {
  const session = await auth();

  if (!session) {
    redirect("/login");
  }

  const bookings =
    session.user.role === "ADMIN"
      ? await getBookings()
      : await getBookingsByUserId(Number(session.user.id));

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-5xl font-bold">Approvals</h1>

          <p className="mt-2 text-[var(--muted)]">
            Manage booking approval workflow.
          </p>
        </div>
      </div>

      {/* Table */}
      <div
        className="
          overflow-hidden
          rounded-3xl
          border
          border-[var(--border)]
          bg-[var(--card)]
        "
      >
        <table className="w-full">
          <thead
            className="
              bg-[var(--accent)]
              text-white
            "
          >
            <tr>
              <th className="px-6 py-5 text-left text-sm font-semibold uppercase tracking-wide">
                #
              </th>

              <th className="px-6 py-5 text-left text-sm font-semibold uppercase tracking-wide">
                Purpose
              </th>

              <th className="px-6 py-5 text-left text-sm font-semibold uppercase tracking-wide">
                Venue
              </th>

              <th className="px-6 py-5 text-left text-sm font-semibold uppercase tracking-wide">
                Booking Date
              </th>

              <th className="px-6 py-5 text-left text-sm font-semibold uppercase tracking-wide">
                Requested By
              </th>

              <th className="px-6 py-5 text-left text-sm font-semibold uppercase tracking-wide">
                Guide
              </th>

              <th className="px-6 py-5 text-left text-sm font-semibold uppercase tracking-wide">
                HOD
              </th>

              <th className="px-6 py-5 text-left text-sm font-semibold uppercase tracking-wide">
                Admin
              </th>

              <th className="px-6 py-5 text-left text-sm font-semibold uppercase tracking-wide">
                Allocation
              </th>

              <th className="px-6 py-5 text-left text-sm font-semibold uppercase tracking-wide">
                Actions
              </th>
            </tr>
          </thead>

          <tbody>
            {bookings?.map((booking: any, index: number) => {
              const role = session.user.role;

              const canGuideApprove =
                role === "GUIDE" && booking.guide_status === "PENDING";

              const canHodApprove =
                role === "HOD" &&
                booking.guide_status === "APPROVED" &&
                booking.hod_status === "PENDING";

              const canAdminApprove =
                role === "ADMIN" &&
                booking.guide_status === "APPROVED" &&
                booking.hod_status === "APPROVED" &&
                booking.admin_status === "PENDING";

              const canApprove =
                canGuideApprove || canHodApprove || canAdminApprove;

              return (
                <tr
                  key={booking.appointment_id}
                  className="
                      border-t
                      border-[var(--border)]
                      transition
                      hover:bg-white/5
                    "
                >
                  {/* Serial */}
                  <td className="px-6 py-5 text-sm text-gray-400">
                    {index + 1}
                  </td>

                  {/* Purpose */}
                  <td className="px-6 py-5">
                    <p className="font-medium text-cyan-400">
                      {booking.purpose}
                    </p>
                  </td>

                  {/* Venue */}
                  <td className="px-6 py-5 text-gray-300">
                    {booking.venue_name}
                  </td>

                  {/* Booking Date */}
                  <td className="px-6 py-5 text-gray-300">
                    {new Date(booking.booking_date).toLocaleDateString()}
                  </td>

                  {/* Requested By */}
                  <td className="px-6 py-5">
                    <div>
                      <p className="font-medium">{booking.requested_by_name}</p>

                      <p className="text-sm text-[var(--muted)]">
                        {booking.requested_by_role}
                      </p>
                    </div>
                  </td>

                  {/* Guide */}
                  <td className="px-6 py-5">
                    <StatusBadge status={booking.guide_status} />
                  </td>

                  {/* HOD */}
                  <td className="px-6 py-5">
                    <StatusBadge status={booking.hod_status} />
                  </td>

                  {/* Admin */}
                  <td className="px-6 py-5">
                    <StatusBadge status={booking.admin_status} />
                  </td>

                  {/* Allocation */}
                  <td className="px-6 py-5">
                    {booking.status === "APPROVED" && booking.is_allocated ? (
                      <span
                        className="
                            rounded-full
                            bg-green-500/15
                            px-3
                            py-1
                            text-xs
                            font-medium
                            text-green-400
                          "
                      >
                        ALLOCATED
                      </span>
                    ) : booking.status === "APPROVED" &&
                      !booking.is_allocated ? (
                      <span
                        className="
                            rounded-full
                            bg-orange-500/15
                            px-3
                            py-1
                            text-xs
                            font-medium
                            text-orange-400
                          "
                      >
                        WAITING
                      </span>
                    ) : (
                      <span className="text-sm text-[var(--muted)]">—</span>
                    )}
                  </td>

                  {/* Actions */}
                  <td className="px-6 py-5">
                    {canApprove ? (
                      <div className="flex gap-3">
                        <form
                          action={async () => {
                            "use server";

                            await approveBooking(booking.appointment_id);
                          }}
                        >
                          <button
                            className="
                                rounded-xl
                                bg-green-600
                                px-4
                                py-2
                                text-sm
                                font-medium
                                transition
                                hover:bg-green-700
                              "
                          >
                            Approve
                          </button>
                        </form>

                        <form
                          action={async () => {
                            "use server";

                            await rejectBooking(booking.appointment_id);
                          }}
                        >
                          <button
                            className="
                                rounded-xl
                                bg-red-600
                                px-4
                                py-2
                                text-sm
                                font-medium
                                transition
                                hover:bg-red-700
                              "
                          >
                            Reject
                          </button>
                        </form>
                      </div>
                    ) : (
                      <span className="text-sm text-[var(--muted)]">
                        No Actions
                      </span>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  if (status === "APPROVED") {
    return (
      <span
        className="
          rounded-full
          bg-green-500/15
          px-3
          py-1
          text-xs
          font-medium
          text-green-400
        "
      >
        APPROVED
      </span>
    );
  }

  if (status === "REJECTED") {
    return (
      <span
        className="
          rounded-full
          bg-red-500/15
          px-3
          py-1
          text-xs
          font-medium
          text-red-400
        "
      >
        REJECTED
      </span>
    );
  }

  return (
    <span
      className="
        rounded-full
        bg-yellow-500/15
        px-3
        py-1
        text-xs
        font-medium
        text-yellow-400
      "
    >
      PENDING
    </span>
  );
}
