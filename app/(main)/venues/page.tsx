import { getVenues } from "@/lib/db/venue";

import Link from "next/link";

import { auth } from "@/lib/auth";

import { deactivateVenue, activateVenue } from "@/actions/venue";

export default async function VenuesPage() {
  const venues = await getVenues();

  const session = await auth();

  return (
    <div
      className="
            min-h-screen
            bg-[var(--background)]
            p-6
         "
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-5xl font-bold mb-5">Venues</h1>
        <Link
          href="/bookings/create"
          className="bg-[var(--accent)]
                     hover:bg-[var(--accent-hover)]
                     text-white
                     p-3
                     text-lg
                     rounded-xl
                     transition-colors"
        >
          Create Booking
        </Link>

        {session?.user.role === "ADMIN" && (
          <Link
            href="/venues/create"
            className="
                     bg-[var(--accent)]
                     hover:bg-[var(--accent-hover)]
                     text-white
                     p-3
                     text-lg
                     rounded-xl
                     transition-colors
                  "
          >
            + Add New Venue
          </Link>
        )}
      </div>

      {/* Table Container */}
      <div className="overflow-hidden rounded-3xl border border-[var(--border)]">
        <table className="w-full">
          {/* Table Header */}
          <thead className="bg-[var(--accent)] text-white">
            <tr>
              <th className="px-6 py-5 text-left text-lg font-semibold">
                Venue Id
              </th>

              <th className="px-6 py-5 text-left text-lg font-semibold">
                Venue Name
              </th>

              <th className="px-6 py-5 text-left text-lg font-semibold">
                Location
              </th>

              <th className="px-6 py-5 text-left text-lg font-semibold">
                Capacity
              </th>

              <th className="px-6 py-5 text-left text-lg font-semibold">
                Type
              </th>

              {session?.user.role === "ADMIN" && (
                <th className="px-6 py-5 text-left text-lg font-semibold">
                  Actions
                </th>
              )}

              <th className="px-6 py-5 text-left text-lg font-semibold">
                Status
              </th>
            </tr>
          </thead>

          {/* Table Body */}
          <tbody>
            {venues?.map((venue: any) => (
              <tr
                key={venue.venue_id}
                className="border-t border-[var(--border)] hover:bg-white/5 transition"
              >
                <td className="px-6 py-6 text-xl text-gray-300">
                  {venue.venue_id}
                </td>

                <td className="px-6 py-6">
                  <Link
                    href={`/venues/${venue.venue_id}`}
                    className="text-cyan-500 text-xl hover:underline"
                  >
                    {venue.venue_name}
                  </Link>
                </td>

                <td className="px-6 py-6 text-xl text-gray-300">
                  {venue.location}
                </td>

                <td className="px-6 py-6 text-xl">{venue.capacity}</td>

                <td className="px-6 py-6 text-xl">{venue.venue_type}</td>

                {/* Actions */}
                {session?.user.role === "ADMIN" && (
                  <td className="px-6 py-6">
                    <div className="flex items-center gap-3">
                      <Link
                        href={`/venues/${venue.venue_id}/edit`}
                        className="
                    bg-[var(--accent)]
                    hover:bg-[var(--accent-hover)]
                    text-white
                    px-4
                    py-2
                    rounded-xl
                    font-medium
                    transition
                  "
                      >
                        Edit
                      </Link>

                      {venue.is_active ? (
                        <form
                          action={deactivateVenue.bind(
                            null,
                            venue.venue_id.toString(),
                          )}
                        >
                          <button
                            className="
                        bg-red-500/15
                        hover:bg-red-500
                        border
                        border-red-500/30
                        hover:border-red-500
                        text-red-400
                        hover:text-white
                        px-4
                        py-2
                        rounded-xl
                        font-medium
                        transition-all
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
                        bg-green-500/15
                        hover:bg-green-500
                        border
                        border-green-500/30
                        hover:border-green-500
                        text-green-400
                        hover:text-white
                        px-4
                        py-2
                        rounded-xl
                        font-medium
                        transition-all
                      "
                          >
                            Activate
                          </button>
                        </form>
                      )}
                    </div>
                  </td>
                )}

                <td className="px-6 py-6">
                  {venue.is_active ? (
                    <span className="bg-green-500/20 text-green-400 px-4 py-1 rounded-full text-sm font-medium">
                      ACTIVE
                    </span>
                  ) : (
                    <span className="bg-red-500/20 text-red-400 px-4 py-1 rounded-full text-sm font-medium">
                      INACTIVE
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
