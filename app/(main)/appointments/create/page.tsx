import { createAppointmentAction } from "@/actions/appointment";

export default function CreateAppointmentPage() {
  return (
    <div className="max-w-2xl">
      <h1 className="mb-6 text-2xl font-bold">Create Appointment</h1>

      <form
        action={createAppointmentAction}
        className="space-y-5 rounded-2xl border border-[var(--border)] bg-[var(--card)] p-6"
      >
        <div>
          <label className="mb-2 block text-sm font-medium">Venue ID</label>

          <input
            type="number"
            name="venue_id"
            required
            className="w-full rounded-lg border border-[var(--border)] bg-[var(--background)] p-3"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium">Purpose</label>

          <input
            type="text"
            name="purpose"
            required
            className="w-full rounded-lg border border-[var(--border)] bg-[var(--background)] p-3"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium">Description</label>

          <textarea
            name="description"
            rows={4}
            className="w-full rounded-lg border border-[var(--border)] bg-[var(--background)] p-3"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="mb-2 block text-sm font-medium">Start Date</label>

            <input
              type="date"
              name="start_date"
              required
              className="w-full rounded-lg border border-[var(--border)] bg-[var(--background)] p-3 text-white [color-scheme:dark]"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">Start Time</label>

            <input
              type="time"
              name="start_time"
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
              required
              className="w-full rounded-lg border border-[var(--border)] bg-[var(--background)] p-3 text-white [color-scheme:dark]"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">End Time</label>

            <input
              type="time"
              name="end_time"
              required
              className="w-full rounded-lg border border-[var(--border)] bg-[var(--background)] p-3 text-white [color-scheme:dark]"
            />
          </div>
        </div>

        <button
          type="submit"
          className="rounded-lg bg-[var(--accent)] px-5 py-3 font-medium text-white hover:bg-[var(--accent-hover)]"
        >
          Create Appointment
        </button>
      </form>
    </div>
  );
}
