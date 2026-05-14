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
      <h1 className="mb-6 text-2xl font-bold">Edit Booking</h1>

      <form
        action={updateBookingAction}
        className="space-y-5 rounded-2xl border border-[var(--border)] bg-[var(--card)] p-6"
      >
        <input
          type="hidden"
          name="booking_id"
          value={booking.appointment_id}
        />

        <div>
          <label className="mb-2 block text-sm font-medium">Venue ID</label>

          <input
            type="number"
            name="venue_id"
            defaultValue={booking.venue_id}
            required
            className="w-full rounded-lg border border-[var(--border)] bg-[var(--background)] p-3"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium">Purpose</label>

          <input
            type="text"
            name="purpose"
            defaultValue={booking.purpose}
            required
            className="w-full rounded-lg border border-[var(--border)] bg-[var(--background)] p-3"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium">Description</label>

          <textarea
            name="description"
            rows={4}
            defaultValue={booking.description}
            className="w-full rounded-lg border border-[var(--border)] bg-[var(--background)] p-3"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="mb-2 block text-sm font-medium">Start Date</label>

            <input
              type="date"
              name="start_date"
              defaultValue={
                new Date(booking.start_time).toISOString().split("T")[0]
              }
              required
              className="w-full rounded-lg border border-[var(--border)] bg-[var(--background)] p-3 text-white [color-scheme:dark]"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">Start Time</label>

            <input
              type="time"
              name="start_time"
              defaultValue={new Date(booking.start_time)
                .toTimeString()
                .slice(0, 5)}
              required
              className="w-full rounded-lg border border-[var(--border)] bg-[var(--background)] p-3 text-white [color-scheme:dark]"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="mb-2 block text-sm font-medium">End Date</label>

            <input
              type="date"
              name="end_date"
              defaultValue={
                new Date(booking.end_time).toISOString().split("T")[0]
              }
              required
              className="w-full rounded-lg border border-[var(--border)] bg-[var(--background)] p-3 text-white [color-scheme:dark]"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">End Time</label>

            <input
              type="time"
              name="end_time"
              defaultValue={new Date(booking.end_time)
                .toTimeString()
                .slice(0, 5)}
              required
              className="w-full rounded-lg border border-[var(--border)] bg-[var(--background)] p-3 text-white [color-scheme:dark]"
            />
          </div>
        </div>

        <button
          type="submit"
          className="rounded-lg bg-[var(--accent)] px-5 py-3 font-medium text-white hover:bg-[var(--accent-hover)]"
        >
          Update Booking
        </button>
      </form>
    </div>
  );
}
