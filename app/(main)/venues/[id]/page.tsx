import { notFound } from "next/navigation";

import { getVenueById } from "@/lib/db/venue";

import Link from "next/link";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export default async function VenueDetailsPage({ params }: Props) {
  const { id } = await params;

  const venue = await getVenueById(Number(id));

  if (!venue) {
    notFound();
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-5xl font-bold">{venue.venue_name}</h1>

          <p className="mt-2 text-[var(--muted)]">
            Venue details and allocation information.
          </p>
        </div>

        <Link
          href={`/venues/${venue.venue_id}/edit`}
          className="
            rounded-2xl
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
          Edit Venue
        </Link>
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
          {/* Venue ID */}
          <div>
            <p className="mb-2 text-sm text-gray-400">Venue ID</p>

            <p className="text-lg font-medium">{venue.venue_id}</p>
          </div>

          {/* Venue Type */}
          <div>
            <p className="mb-2 text-sm text-gray-400">Venue Type</p>

            <p className="text-lg font-medium">{venue.venue_type}</p>
          </div>

          {/* Location */}
          <div>
            <p className="mb-2 text-sm text-gray-400">Location</p>

            <p className="text-lg font-medium">{venue.location}</p>
          </div>

          {/* Capacity */}
          <div>
            <p className="mb-2 text-sm text-gray-400">Capacity</p>

            <p className="text-lg font-medium">{venue.capacity}</p>
          </div>

          {/* Status */}
          <div>
            <p className="mb-2 text-sm text-gray-400">Status</p>

            {venue.is_active ? (
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
                ACTIVE
              </span>
            ) : (
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
                INACTIVE
              </span>
            )}
          </div>

          {/* Created */}
          <div>
            <p className="mb-2 text-sm text-gray-400">Created At</p>

            <p className="text-lg font-medium">
              {new Date(venue.created_at).toLocaleString()}
            </p>
          </div>

          {/* Workflow Info */}
          <div className="md:col-span-2">
            <div
              className="
                rounded-2xl
                border
                border-cyan-500/20
                bg-cyan-500/10
                p-5
              "
            >
              <h2 className="mb-3 text-lg font-semibold text-cyan-400">
                Allocation Workflow
              </h2>

              <div className="space-y-2 text-sm leading-7 text-zinc-300">
                <p>• Only one allocated booking is allowed per date.</p>

                <p>• Multiple approved requests may exist in waiting queue.</p>

                <p>
                  • Allocation is determined dynamically based on role priority
                  and request creation time.
                </p>

                <p>
                  • Queue recalculates automatically after cancellations or new
                  approvals.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
