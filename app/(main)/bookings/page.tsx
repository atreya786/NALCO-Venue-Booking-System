import Link from "next/link";

import { getBookings, getBookingsByUserId } from "@/lib/db/bookings";

import { auth } from "@/lib/auth";

import { redirect } from "next/navigation";

export default async function BookingsPage() {
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
          <h1 className="text-5xl font-bold">Bookings</h1>

          <p className="mt-2 text-[var(--muted)]">
            View and manage booking requests.
          </p>
        </div>

        <Link
          href="/bookings/create"
          className="
            rounded-xl
            bg-[var(--accent)]
            px-5
            py-3
            font-medium
            text-white
            transition
            hover:bg-[var(--accent-hover)]
          "
        >
          Create Booking
        </Link>
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
                Allocation
              </th>

              <th className="px-6 py-5 text-left text-sm font-semibold uppercase tracking-wide">
                Status
              </th>
            </tr>
          </thead>

          <tbody>
            {bookings?.map((booking: any, index: number) => (
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
                <td className="px-6 py-5 text-sm text-gray-400">{index + 1}</td>

                {/* Purpose */}
                <td className="px-6 py-5">
                  <Link
                    href={`/bookings/${booking.appointment_id}`}
                    className="
                        text-lg
                        font-medium
                        text-cyan-400
                        hover:underline
                      "
                  >
                    {booking.purpose}
                  </Link>
                </td>

                {/* Venue */}
                <td className="px-6 py-5 text-gray-300">
                  {booking.venue_name}
                </td>

                {/* Date */}
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
                  ) : booking.status === "APPROVED" && !booking.is_allocated ? (
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
                      WAITING QUEUE
                    </span>
                  ) : (
                    <span className="text-sm text-[var(--muted)]">—</span>
                  )}
                </td>

                {/* Status */}
                <td className="px-6 py-5">
                  {booking.status === "APPROVED" && (
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
                  )}

                  {booking.status === "PENDING" && (
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
                  )}

                  {booking.status === "REJECTED" && (
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
                  )}

                  {booking.status === "CANCELLED" && (
                    <span
                      className="
                          rounded-full
                          bg-gray-500/15
                          px-3
                          py-1
                          text-xs
                          font-medium
                          text-gray-400
                        "
                    >
                      CANCELLED
                    </span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
