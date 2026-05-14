import Link from "next/link";

import { getBookings } from "@/lib/db/bookings";

import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function BookingsPage() {
  const bookings = await getBookings();
  const session = await auth();

  if (!session || session?.user.role === "STUDENT") {
    redirect("/");
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-5xl font-bold">Bookings</h1>
      </div>

      <div className="overflow-hidden rounded-3xl border border-[var(--border)]">
        <table className="w-full">
          <thead className="bg-[var(--accent)] text-white">
            <tr>
              <th className="px-6 py-5 text-left text-lg font-semibold">
                Purpose
              </th>

              <th className="px-6 py-5 text-left text-lg font-semibold">
                Venue
              </th>

              <th className="px-6 py-5 text-left text-lg font-semibold">
                Requested By
              </th>

              <th className="px-6 py-5 text-left text-lg font-semibold">
                Status
              </th>
            </tr>
          </thead>

          <tbody>
            {bookings?.map((booking: any) => (
              <tr
                key={booking.appointment_id}
                className="border-t border-[var(--border)] hover:bg-white/5 transition"
              >
                <td className="px-6 py-6">
                  <Link
                    href={`/bookings/${booking.appointment_id}`}
                    className="text-cyan-500 text-xl hover:underline"
                  >
                    {booking.purpose}
                  </Link>
                </td>

                <td className="px-6 py-6 text-xl text-gray-300">
                  {booking.venue_name}
                </td>

                <td className="px-6 py-6 text-xl">
                  {booking.requested_by_name}
                </td>

                <td className="px-6 py-6">
                  {booking.status === "APPROVED" && (
                    <span className="bg-green-500/20 text-green-400 px-4 py-1 rounded-full text-sm font-medium">
                      APPROVED
                    </span>
                  )}

                  {booking.status === "PENDING" && (
                    <span className="bg-yellow-500/20 text-yellow-400 px-4 py-1 rounded-full text-sm font-medium">
                      PENDING
                    </span>
                  )}

                  {booking.status === "REJECTED" && (
                    <span className="bg-red-500/20 text-red-400 px-4 py-1 rounded-full text-sm font-medium">
                      REJECTED
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
