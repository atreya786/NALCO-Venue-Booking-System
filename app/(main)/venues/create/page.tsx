import { redirect } from "next/navigation";

import { auth } from "@/lib/auth";

import { createVenue } from "@/actions/venue";

export default async function CreateVenuePage() {
  const session = await auth();

  // RBAC Protection
  if (!session || session.user.role !== "ADMIN") {
    redirect("/venues");
  }

  return (
    <div className="p-6 max-w-2xl">
      <h1 className="text-3xl font-bold mb-6">Create Venue</h1>

      <form action={createVenue} className="space-y-4">
        <div>
          <label className="block mb-1 font-medium">Venue Name</label>

          <input
            type="text"
            name="venue_name"
            className="w-full border rounded-lg p-3"
            required
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Location</label>

          <input
            type="text"
            name="location"
            className="w-full border rounded-lg p-3"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Capacity</label>

          <input
            type="number"
            name="capacity"
            className="w-full border rounded-lg p-3"
            required
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Venue Type</label>

          <input
            type="text"
            name="venue_type"
            className="w-full border rounded-lg p-3"
          />
        </div>

        <button
          type="submit"
          className="bg-black text-white px-6 py-3 rounded-lg"
        >
          Create Venue
        </button>
      </form>
    </div>
  );
}
