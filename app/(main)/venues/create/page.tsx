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
    <div className="max-w-2xl">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold">Create Venue</h1>

        <p className="mt-2 text-[var(--muted)]">
          Add a new venue to the enterprise allocation system.
        </p>
      </div>

      {/* Form Card */}
      <div
        className="
          rounded-3xl
          border
          border-[var(--border)]
          bg-[var(--card)]
          p-8
          shadow-xl
        "
      >
        <form action={createVenue} className="space-y-6">
          {/* Venue Name */}
          <div>
            <label
              className="
                mb-2
                block
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
              required
              className="
                w-full
                rounded-xl
                border
                border-[var(--border)]
                bg-transparent
                p-4
                text-[var(--foreground)]
                outline-none
                transition-colors
                placeholder:text-[var(--muted)]
                focus:border-[var(--accent)]
              "
            />
          </div>

          {/* Location */}
          <div>
            <label
              className="
                mb-2
                block
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
              placeholder="Enter venue location"
              className="
                w-full
                rounded-xl
                border
                border-[var(--border)]
                bg-transparent
                p-4
                text-[var(--foreground)]
                outline-none
                transition-colors
                placeholder:text-[var(--muted)]
                focus:border-[var(--accent)]
              "
            />
          </div>

          {/* Capacity */}
          <div>
            <label
              className="
                mb-2
                block
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
              placeholder="Enter venue capacity"
              required
              className="
                w-full
                rounded-xl
                border
                border-[var(--border)]
                bg-transparent
                p-4
                text-[var(--foreground)]
                outline-none
                transition-colors
                placeholder:text-[var(--muted)]
                focus:border-[var(--accent)]
              "
            />
          </div>

          {/* Venue Type */}
          <div>
            <label
              className="
                mb-2
                block
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
              placeholder="Auditorium / Seminar Hall / Conference Room"
              className="
                w-full
                rounded-xl
                border
                border-[var(--border)]
                bg-transparent
                p-4
                text-[var(--foreground)]
                outline-none
                transition-colors
                placeholder:text-[var(--muted)]
                focus:border-[var(--accent)]
              "
            />
          </div>

          {/* Workflow Info */}
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
              Venue Allocation Rules
            </h2>

            <div className="space-y-2 text-sm leading-7 text-zinc-300">
              <p>• Only one allocated booking is allowed per venue per date.</p>

              <p>• Multiple approved requests may exist in waiting queue.</p>

              <p>
                • Allocation is managed dynamically by the backend allocation
                engine.
              </p>

              <p>• Venue can be activated or deactivated by admin anytime.</p>
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="
              w-full
              rounded-xl
              bg-[var(--accent)]
              py-4
              font-semibold
              text-white
              transition
              hover:bg-[var(--accent-hover)]
            "
          >
            Create Venue
          </button>
        </form>
      </div>
    </div>
  );
}
