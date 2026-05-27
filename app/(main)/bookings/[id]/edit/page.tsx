import { notFound } from "next/navigation";

import { getBookingById } from "@/lib/db/bookings";

import { updateBookingAction } from "@/actions/bookings";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export default async function EditBookingPage({ params }: Props) {
  const { id } = await params;

  const booking = await getBookingById(Number(id));

  if (!booking) {
    notFound();
  }

  return (
    <div className="max-w-2xl">
      <h1 className="mb-2 text-3xl font-bold">Edit Booking</h1>

      <p className="mb-6 text-[var(--muted)]">
        Update booking request details.
      </p>

      <form
        action={updateBookingAction}
        className="
          space-y-5
          rounded-2xl
          border
          border-[var(--border)]
          bg-[var(--card)]
          p-6
        "
      >
        <input
          type="hidden"
          name="appointment_id"
          value={booking.appointment_id}
        />

        {/* Venue */}
        <div>
          <label className="mb-2 block text-sm font-medium">Venue ID</label>

          <input
            type="number"
            name="venue_id"
            defaultValue={booking.venue_id}
            required
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
            defaultValue={
              new Date(booking.booking_date).toISOString().split("T")[0]
            }
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
            defaultValue={booking.purpose}
            required
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
            defaultValue={booking.description}
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
          Updating booking details may affect allocation priority and queue
          position.
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
          Update Booking
        </button>
      </form>
    </div>
  );
}
