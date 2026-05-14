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
      <div>
        <h1 className="text-3xl font-bold">{booking.purpose}</h1>

        <p className="mt-2 text-gray-400">Booking Details</p>
      </div>

      <div className="rounded-2xl border border-[var(--border)] bg-[var(--card)] p-6">
        <div className="grid gap-6 md:grid-cols-2">
          <div>
            <p className="mb-2 text-sm text-gray-400">Venue</p>

            <p className="text-lg font-medium">{booking.venue_name}</p>
          </div>

          <div>
            <p className="mb-2 text-sm text-gray-400">Requested By</p>

            <p className="text-lg font-medium">
              {booking.requested_by_name}
            </p>
          </div>

          <div>
            <p className="mb-2 text-sm text-gray-400">Role</p>

            <p className="text-lg font-medium">
              {booking.requested_by_role}
            </p>
          </div>

          <div>
            <p className="mb-2 text-sm text-gray-400">Status</p>

            <span className="rounded-full bg-yellow-500/15 px-3 py-1 text-sm font-medium text-yellow-400">
              {booking.status}
            </span>
          </div>

          <div>
            <p className="mb-2 text-sm text-gray-400">Start Time</p>

            <p className="text-lg font-medium">
              {new Date(booking.start_time).toLocaleString()}
            </p>
          </div>

          <div>
            <p className="mb-2 text-sm text-gray-400">End Time</p>

            <p className="text-lg font-medium">
              {new Date(booking.end_time).toLocaleString()}
            </p>
          </div>

          <div className="md:col-span-2">
            <p className="mb-2 text-sm text-gray-400">Description</p>

            <p className="text-lg font-medium">{booking.description}</p>
          </div>

          {(session?.user.id === String(booking.requested_by) ||
            session?.user.role === "ADMIN") && (
            <div className="md:col-span-2">
              <Link
                href={`/bookings/${booking.appointment_id}/edit`}
                className="inline-flex rounded-lg bg-[var(--accent)] px-4 py-2 text-sm font-medium text-white hover:bg-[var(--accent-hover)]"
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
