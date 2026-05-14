import { getVenueById } from "@/lib/db/venue";

import { updateVenue } from "@/actions/venue";

import { redirect } from "next/navigation";

import { auth } from "@/lib/auth";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export default async function EditVenuePage({ params }: Props) {
  const { id } = await params;

  const session = await auth();

  if (!session || session.user.role !== "ADMIN") {
    redirect("/venues");
  }

  const venue = await getVenueById(Number(id));

  return (
    <div
      className="
            min-h-screen
            bg-[var(--background)]
            p-6
         "
    >
      <div
        className="
               max-w-2xl
               bg-[var(--card)]
               border
               border-[var(--border)]
               rounded-2xl
               p-8
               shadow-xl
            "
      >
        <h1
          className="
                  text-4xl
                  font-bold
                  text-[var(--foreground)]
                  mb-8
               "
        >
          Edit Venue
        </h1>

        <form action={updateVenue.bind(null, id)} className="space-y-6">
          {/* Venue Name */}
          <div>
            <label
              className="
                        block
                        mb-2
                        text-sm
                        font-medium
                        text-[var(--muted)]
                     "
            >
              Venue Name
            </label>

            <input
              type="text"
              name="venue_name"
              defaultValue={venue.venue_name}
              className="
                        w-full
                        bg-transparent
                        border
                        border-[var(--border)]
                        rounded-xl
                        p-4
                        text-[var(--foreground)]
                        outline-none
                        focus:border-[var(--accent)]
                        transition-colors
                     "
            />
          </div>

          {/* Location */}
          <div>
            <label
              className="
                        block
                        mb-2
                        text-sm
                        font-medium
                        text-[var(--muted)]
                     "
            >
              Location
            </label>

            <input
              type="text"
              name="location"
              defaultValue={venue.location}
              className="
                        w-full
                        bg-transparent
                        border
                        border-[var(--border)]
                        rounded-xl
                        p-4
                        text-[var(--foreground)]
                        outline-none
                        focus:border-[var(--accent)]
                        transition-colors
                     "
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="
                     w-full
                     bg-[var(--accent)]
                     hover:bg-[var(--accent-hover)]
                     text-white
                     py-4
                     rounded-xl
                     font-semibold
                     transition-colors
                     cursor-pointer
                  "
          >
            Update Venue
          </button>
        </form>
      </div>
    </div>
  );
}
