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
          Create Venue
        </h1>

        <form action={createVenue} className="space-y-6">
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
              placeholder="Enter venue name"
              className="
                        w-full
                        bg-transparent
                        border
                        border-[var(--border)]
                        rounded-xl
                        p-4
                        text-[var(--foreground)]
                        placeholder:text-[var(--muted)]
                        outline-none
                        focus:border-[var(--accent)]
                        transition-colors
                     "
              required
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
              placeholder="Enter location"
              className="
                        w-full
                        bg-transparent
                        border
                        border-[var(--border)]
                        rounded-xl
                        p-4
                        text-[var(--foreground)]
                        placeholder:text-[var(--muted)]
                        outline-none
                        focus:border-[var(--accent)]
                        transition-colors
                     "
            />
          </div>

          {/* Capacity */}
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
              Capacity
            </label>

            <input
              type="number"
              name="capacity"
              placeholder="Enter capacity"
              className="
                        w-full
                        bg-transparent
                        border
                        border-[var(--border)]
                        rounded-xl
                        p-4
                        text-[var(--foreground)]
                        placeholder:text-[var(--muted)]
                        outline-none
                        focus:border-[var(--accent)]
                        transition-colors
                     "
              required
            />
          </div>

          {/* Venue Type */}
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
              Venue Type
            </label>

            <input
              type="text"
              name="venue_type"
              placeholder="Seminar Hall / Auditorium / Lab"
              className="
                        w-full
                        bg-transparent
                        border
                        border-[var(--border)]
                        rounded-xl
                        p-4
                        text-[var(--foreground)]
                        placeholder:text-[var(--muted)]
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
            Create Venue
          </button>
        </form>
      </div>
    </div>
  );
}
