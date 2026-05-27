import { getVenues } from "@/lib/db/venue";

import Link from "next/link";

import { auth } from "@/lib/auth";

import { deactivateVenue, activateVenue } from "@/actions/venue";

export default async function VenuesPage() {
  const venues = await getVenues();

  const session = await auth();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-5xl font-bold">Venues</h1>

          <p className="mt-2 text-[var(--muted)]">
            Manage active venues and venue allocation workflow.
          </p>
        </div>

        <div className="flex items-center gap-4">
          <Link
            href="/bookings/create"
            className="
              rounded-2xl
              bg-[var(--accent)]
              px-5
              py-3
              text-lg
              font-medium
              text-white
              transition
              hover:bg-[var(--accent-hover)]
            "
          >
            Create Booking
          </Link>

          {session?.user.role === "ADMIN" && (
            <Link
              href="/venues/create"
              className="
                rounded-2xl
                border
                border-[var(--border)]
                bg-white/5
                px-5
                py-3
                text-lg
                font-medium
                transition
                hover:bg-white/10
              "
            >
              + Add Venue
            </Link>
          )}
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
          {/* Header */}
          <thead
            className="
              bg-[var(--accent)]
              text-white
            "
          >
            <tr>
              <th className="px-6 py-5 text-left text-sm font-semibold uppercase tracking-wide">
                ID
              </th>

              <th className="px-6 py-5 text-left text-sm font-semibold uppercase tracking-wide">
                Venue
              </th>

              <th className="px-6 py-5 text-left text-sm font-semibold uppercase tracking-wide">
                Location
              </th>

              <th className="px-6 py-5 text-left text-sm font-semibold uppercase tracking-wide">
                Capacity
              </th>

              <th className="px-6 py-5 text-left text-sm font-semibold uppercase tracking-wide">
                Type
              </th>

              <th className="px-6 py-5 text-left text-sm font-semibold uppercase tracking-wide">
                Status
              </th>

              {session?.user.role === "ADMIN" && (
                <th className="px-6 py-5 text-left text-sm font-semibold uppercase tracking-wide">
                  Actions
                </th>
              )}
            </tr>
          </thead>

          {/* Body */}
          <tbody>
            {venues?.map((venue: any) => (
              <tr
                key={venue.venue_id}
                className="
                    border-t
                    border-[var(--border)]
                    transition
                    hover:bg-white/5
                  "
              >
                {/* ID */}
                <td className="px-6 py-5 text-gray-400">{venue.venue_id}</td>

                {/* Venue */}
                <td className="px-6 py-5">
                  <Link
                    href={`/venues/${venue.venue_id}`}
                    className="
                        text-lg
                        font-medium
                        text-cyan-400
                        hover:underline
                      "
                  >
                    {venue.venue_name}
                  </Link>
                </td>

                {/* Location */}
                <td className="px-6 py-5 text-gray-300">{venue.location}</td>

                {/* Capacity */}
                <td className="px-6 py-5">{venue.capacity}</td>

                {/* Type */}
                <td className="px-6 py-5">{venue.venue_type}</td>

                {/* Status */}
                <td className="px-6 py-5">
                  {venue.is_active ? (
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
                      ACTIVE
                    </span>
                  ) : (
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
                      INACTIVE
                    </span>
                  )}
                </td>

                {/* Actions */}
                {session?.user.role === "ADMIN" && (
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-3">
                      {/* Edit */}
                      <Link
                        href={`/venues/${venue.venue_id}/edit`}
                        className="
                            rounded-xl
                            bg-[var(--accent)]
                            px-4
                            py-2
                            text-sm
                            font-medium
                            text-white
                            transition
                            hover:bg-[var(--accent-hover)]
                          "
                      >
                        Edit
                      </Link>

                      {/* Toggle */}
                      {venue.is_active ? (
                        <form
                          action={deactivateVenue.bind(
                            null,
                            venue.venue_id.toString(),
                          )}
                        >
                          <button
                            className="
                                rounded-xl
                                border
                                border-red-500/30
                                bg-red-500/10
                                px-4
                                py-2
                                text-sm
                                font-medium
                                text-red-400
                                transition
                                hover:bg-red-500
                                hover:text-white
                              "
                          >
                            Deactivate
                          </button>
                        </form>
                      ) : (
                        <form
                          action={activateVenue.bind(
                            null,
                            venue.venue_id.toString(),
                          )}
                        >
                          <button
                            className="
                                rounded-xl
                                border
                                border-green-500/30
                                bg-green-500/10
                                px-4
                                py-2
                                text-sm
                                font-medium
                                text-green-400
                                transition
                                hover:bg-green-500
                                hover:text-white
                              "
                          >
                            Activate
                          </button>
                        </form>
                      )}
                    </div>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
