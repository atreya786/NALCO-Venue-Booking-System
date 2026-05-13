import { getVenues } from "@/lib/db/venue";
import Link from "next/link";
import { auth } from "@/lib/auth";

export default async function VenuesPage() {
  const venues = await getVenues();

  const session = await auth();

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Venues</h1>

        {session?.user.role === "ADMIN" && (
          <Link
            href="/venues/create"
            className="bg-black text-white px-4 py-2 rounded-lg"
          >
            + Create Venue
          </Link>
        )}
      </div>

      <div className="overflow-x-auto border rounded-lg">
        <table className="w-full">
          <thead className="bg-gray-900">
            <tr>
              <th className="text-left p-4">Venue Name</th>

              <th className="text-left p-4">Location</th>

              <th className="text-left p-4">Capacity</th>

              <th className="text-left p-4">Type</th>
            </tr>
          </thead>

          <tbody>
            {venues?.map((venue: any) => (
              <tr key={venue.venue_id} className="border-t">
                <td className="p-4">{venue.venue_name}</td>

                <td className="p-4">{venue.location}</td>

                <td className="p-4">{venue.capacity}</td>

                <td className="p-4">{venue.venue_type}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
