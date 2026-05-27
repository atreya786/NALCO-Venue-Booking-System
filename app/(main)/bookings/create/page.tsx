import { createBookingAction } from "@/actions/bookings";

export default function CreateBookingPage() {
  return (
    <div className="max-w-2xl">
      <h1 className="mb-2 text-3xl font-bold">Create Booking</h1>

      <p className="mb-6 text-[var(--muted)]">
        Submit a venue booking request for full-day allocation.
      </p>

      <form
        action={createBookingAction}
        className="
          space-y-5
          rounded-2xl
          border
          border-[var(--border)]
          bg-[var(--card)]
          p-6
        "
      >
        {/* Venue */}
        <div>
          <label className="mb-2 block text-sm font-medium">Venue ID</label>

          <input
            type="number"
            name="venue_id"
            required
            placeholder="Enter venue ID"
            className="
              w-full
              rounded-lg
              border
              border-[var(--border)]
              bg-[var(--background)]
              p-3
              outline-none
              focus:border-[var(--accent)]
            "
          />
        </div>

        {/* Booking Date */}
        <div>
          <label className="mb-2 block text-sm font-medium">Booking Date</label>

          <input
            type="date"
            name="booking_date"
            required
            className="
              w-full
              rounded-lg
              border
              border-[var(--border)]
              bg-[var(--background)]
              p-3
              text-white
              outline-none
              [color-scheme:dark]
              focus:border-[var(--accent)]
            "
          />
        </div>

        {/* Purpose */}
        <div>
          <label className="mb-2 block text-sm font-medium">Purpose</label>

          <input
            type="text"
            name="purpose"
            required
            placeholder="Enter booking purpose"
            className="
              w-full
              rounded-lg
              border
              border-[var(--border)]
              bg-[var(--background)]
              p-3
              outline-none
              focus:border-[var(--accent)]
            "
          />
        </div>

        {/* Description */}
        <div>
          <label className="mb-2 block text-sm font-medium">Description</label>

          <textarea
            name="description"
            rows={4}
            placeholder="Enter additional details"
            className="
              w-full
              rounded-lg
              border
              border-[var(--border)]
              bg-[var(--background)]
              p-3
              outline-none
              focus:border-[var(--accent)]
            "
          />
        </div>

        {/* Notice */}
        <div
          className="
            rounded-xl
            border
            border-yellow-500/20
            bg-yellow-500/10
            p-4
            text-sm
            text-yellow-300
          "
        >
          Approval does not guarantee venue allocation. Higher priority approved
          requests may receive allocation for the same venue and date.
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="
            rounded-lg
            bg-[var(--accent)]
            px-5
            py-3
            font-medium
            text-white
            transition
            hover:bg-[var(--accent-hover)]
          "
        >
          Create Booking
        </button>
      </form>
    </div>
  );
}
