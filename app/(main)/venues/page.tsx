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
      <div
        className="
               flex
               items-center
               justify-between
               mb-8
            "
      >
        <div>
          <h1
            className="
                     text-4xl
                     font-bold
                     text-[var(--foreground)]
                  "
          >
            Venues
          </h1>

          <p
            className="
                     text-[var(--muted)]
                     mt-2
                  "
          >
            Manage all available venues
          </p>
        </div>

        {session?.user.role === "ADMIN" && (
          <Link
            href="/venues/create"
            className="
                     bg-[var(--accent)]
                     hover:bg-[var(--accent-hover)]
                     text-white
                     px-5
                     py-3
                     rounded-xl
                     font-medium
                     transition-colors
                  "
          >
            + Create Venue
          </Link>
        )}
      </div>

      {/* Table Container */}
      <div
        className="
               overflow-x-auto
               bg-[var(--card)]
               border
               border-[var(--border)]
               rounded-2xl
               shadow-xl
            "
      >
        <table className="w-full">
          {/* Table Header */}
          <thead
            className="
                     bg-[var(--sidebar)]
                     text-white
                  "
          >
            <tr>
              <th className="text-left p-5">Venue Name</th>

              <th className="text-left p-5">Location</th>

              <th className="text-left p-5">Capacity</th>

              <th className="text-left p-5">Type</th>

              {session?.user.role === "ADMIN" && (
                <th className="text-left p-5">Actions</th>
              )}

              <th className="text-left p-5">Status</th>
            </tr>
          </thead>

          {/* Table Body */}
          <tbody>
            {venues?.map((venue: any) => (
              <tr
                key={venue.venue_id}
                className="
                           border-t
                           border-[var(--border)]
                           hover:bg-white/5
                           transition-colors
                        "
              >
                <td
                  className="
                              p-5
                              text-[var(--foreground)]
                              font-medium
                           "
                >
                  {venue.venue_name}
                </td>

                <td
                  className="
                              p-5
                              text-[var(--muted)]
                           "
                >
                  {venue.location}
                </td>

                <td
                  className="
                              p-5
                              text-[var(--foreground)]
                           "
                >
                  {venue.capacity}
                </td>

                <td
                  className="
                              p-5
                              text-[var(--foreground)]
                           "
                >
                  {venue.venue_type}
                </td>

                {/* Actions */}
                {session?.user.role === "ADMIN" && (
                  <td className="p-5">
                    <div className="flex items-center gap-3">
                      {/* Edit */}
                      <Link
                        href={`/venues/${venue.venue_id}/edit`}
                        className="
                                    inline-flex
                                    items-center
                                    bg-[var(--accent)]
                                    hover:bg-[var(--accent-hover)]
                                    text-white
                                    px-4
                                    py-2
                                    rounded-lg
                                    text-sm
                                    font-medium
                                    transition-colors
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
      inline-flex
      items-center
      justify-center
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
      text-sm
      font-semibold
      transition-all
      duration-200
      cursor-pointer
      min-w-[120px]
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
      inline-flex
      items-center
      justify-center
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
      text-sm
      font-semibold
      transition-all
      duration-200
      cursor-pointer
      min-w-[120px]
   "
                          >
                            Activate
                          </button>
                        </form>
                      )}
                    </div>
                  </td>
                )}
                <td className="p-5">
                  {venue.is_active ? (
                    <span
                      className="
               bg-green-500/20
               text-green-400
               px-3
               py-1
               rounded-full
               text-sm
               font-medium
            "
                    >
                      Active
                    </span>
                  ) : (
                    <span
                      className="
               bg-red-500/20
               text-red-400
               px-3
               py-1
               rounded-full
               text-sm
               font-medium
            "
                    >
                      Inactive
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
