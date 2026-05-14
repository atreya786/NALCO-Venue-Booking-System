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
      <div className="flex items-center justify-between">
        <h1 className="text-5xl font-bold">Venues</h1>
      </div>

      <div className="rounded-2xl border border-[var(--border)] bg-[var(--card)] p-6">
        <div className="grid gap-6 md:grid-cols-2">
          <div>
            <p className="mb-2 text-sm text-gray-400">Venue ID</p>

            <p className="text-lg font-medium">{venue.venue_id}</p>
          </div>

          <div>
            <p className="mb-2 text-sm text-gray-400">Venue Type</p>

            <p className="text-lg font-medium">{venue.venue_type}</p>
          </div>

          <div>
            <p className="mb-2 text-sm text-gray-400">Location</p>

            <p className="text-lg font-medium">{venue.location}</p>
          </div>

          <div>
            <p className="mb-2 text-sm text-gray-400">Capacity</p>

            <p className="text-lg font-medium">{venue.capacity}</p>
          </div>

          <div>
            <p className="mb-2 text-sm text-gray-400">Status</p>

            <span
              className={`rounded-full px-3 py-1 text-sm font-medium ${
                venue.is_active
                  ? "bg-green-500/15 text-green-400"
                  : "bg-red-500/15 text-red-400"
              }`}
            >
              {venue.is_active ? "Active" : "Inactive"}
            </span>
          </div>

          <div>
            <p className="mb-2 text-sm text-gray-400">Created At</p>

            <p className="text-lg font-medium">
              {new Date(venue.created_at).toLocaleString()}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
