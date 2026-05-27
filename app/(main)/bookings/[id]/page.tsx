import { notFound } from "next/navigation";

import { getBookingById } from "@/lib/db/bookings";

import Link from "next/link";

import { auth } from "@/lib/auth";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export default async function BookingDetailsPage({ params }: Props) {
  const { id } = await params;

  const session = await auth();

  const booking = await getBookingById(Number(id));

  if (!booking) {
    notFound();
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-bold">{booking.purpose}</h1>

        <p className="mt-2 text-[var(--muted)]">
          Booking request details and allocation status.
        </p>
      </div>

      {/* Main Card */}
      <div
        className="
          rounded-3xl
          border
          border-[var(--border)]
          bg-[var(--card)]
          p-6
        "
      >
        <div className="grid gap-6 md:grid-cols-2">
          {/* Venue */}
          <div>
            <p className="mb-2 text-sm text-gray-400">Venue</p>

            <p className="text-lg font-medium">{booking.venue_name}</p>
          </div>

          {/* Booking Date */}
          <div>
            <p className="mb-2 text-sm text-gray-400">Booking Date</p>

            <p className="text-lg font-medium">
              {new Date(booking.booking_date).toLocaleDateString()}
            </p>
          </div>

          {/* Requested By */}
          <div>
            <p className="mb-2 text-sm text-gray-400">Requested By</p>

            <p className="text-lg font-medium">{booking.requested_by_name}</p>
          </div>

          {/* Role */}
          <div>
            <p className="mb-2 text-sm text-gray-400">Role</p>

            <p className="text-lg font-medium">{booking.requested_by_role}</p>
          </div>

          {/* Status */}
          <div>
            <p className="mb-2 text-sm text-gray-400">Booking Status</p>

            {booking.status === "APPROVED" && (
              <span
                className="
                  rounded-full
                  bg-green-500/15
                  px-3
                  py-1
                  text-sm
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
                  text-sm
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
                  text-sm
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
                  text-sm
                  font-medium
                  text-gray-400
                "
              >
                CANCELLED
              </span>
            )}
          </div>

          {/* Allocation */}
          <div>
            <p className="mb-2 text-sm text-gray-400">Allocation Status</p>

            {booking.status === "APPROVED" && booking.is_allocated ? (
              <span
                className="
                  rounded-full
                  bg-green-500/15
                  px-3
                  py-1
                  text-sm
                  font-medium
                  text-green-400
                "
              >
                VENUE ALLOCATED
              </span>
            ) : booking.status === "APPROVED" && !booking.is_allocated ? (
              <span
                className="
                  rounded-full
                  bg-orange-500/15
                  px-3
                  py-1
                  text-sm
                  font-medium
                  text-orange-400
                "
              >
                WAITING QUEUE
              </span>
            ) : (
              <span className="text-sm text-[var(--muted)]">—</span>
            )}
          </div>

          {/* Guide */}
          <div>
            <p className="mb-2 text-sm text-gray-400">Guide Approval</p>

            <ApprovalBadge status={booking.guide_status} />
          </div>

          {/* HOD */}
          <div>
            <p className="mb-2 text-sm text-gray-400">HOD Approval</p>

            <ApprovalBadge status={booking.hod_status} />
          </div>

          {/* Admin */}
          <div>
            <p className="mb-2 text-sm text-gray-400">Admin Approval</p>

            <ApprovalBadge status={booking.admin_status} />
          </div>

          {/* Created */}
          <div>
            <p className="mb-2 text-sm text-gray-400">Created At</p>

            <p className="text-lg font-medium">
              {new Date(booking.created_at).toLocaleString()}
            </p>
          </div>

          {/* Description */}
          <div className="md:col-span-2">
            <p className="mb-2 text-sm text-gray-400">Description</p>

            <div
              className="
                rounded-2xl
                border
                border-[var(--border)]
                bg-white/5
                p-5
              "
            >
              <p className="leading-7 text-gray-200">{booking.description}</p>
            </div>
          </div>

          {/* Edit */}
          {(session?.user.id === String(booking.requested_by) ||
            session?.user.role === "ADMIN") && (
            <div className="md:col-span-2">
              <Link
                href={`/bookings/${booking.appointment_id}/edit`}
                className="
                  inline-flex
                  rounded-xl
                  bg-[var(--accent)]
                  px-5
                  py-3
                  text-sm
                  font-medium
                  text-white
                  transition
                  hover:bg-[var(--accent-hover)]
                "
              >
                Edit Booking
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function ApprovalBadge({ status }: { status: string }) {
  if (status === "APPROVED") {
    return (
      <span
        className="
          rounded-full
          bg-green-500/15
          px-3
          py-1
          text-sm
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
          text-sm
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
        text-sm
        font-medium
        text-yellow-400
      "
    >
      PENDING
    </span>
  );
}
