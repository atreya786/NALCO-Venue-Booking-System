import { notFound } from "next/navigation";

import { getAppointmentById } from "@/lib/db/appointment";

import { updateAppointmentAction } from "@/actions/appointment";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export default async function EditAppointmentPage({ params }: Props) {
  const { id } = await params;

  const appointment = await getAppointmentById(Number(id));

  if (!appointment) {
    notFound();
  }

  return (
    <div className="max-w-2xl">
      <h1 className="mb-6 text-2xl font-bold">Edit Appointment</h1>

      <form
        action={updateAppointmentAction}
        className="space-y-5 rounded-2xl border border-[var(--border)] bg-[var(--card)] p-6"
      >
        <input
          type="hidden"
          name="appointment_id"
          value={appointment.appointment_id}
        />

        <div>
          <label className="mb-2 block text-sm font-medium">Venue ID</label>

          <input
            type="number"
            name="venue_id"
            defaultValue={appointment.venue_id}
            required
            className="w-full rounded-lg border border-[var(--border)] bg-[var(--background)] p-3"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium">Purpose</label>

          <input
            type="text"
            name="purpose"
            defaultValue={appointment.purpose}
            required
            className="w-full rounded-lg border border-[var(--border)] bg-[var(--background)] p-3"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium">Description</label>

          <textarea
            name="description"
            rows={4}
            defaultValue={appointment.description}
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
                new Date(appointment.start_time).toISOString().split("T")[0]
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
              defaultValue={new Date(appointment.start_time)
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
                new Date(appointment.end_time).toISOString().split("T")[0]
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
              defaultValue={new Date(appointment.end_time)
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
          Update Appointment
        </button>
      </form>
    </div>
  );
}
