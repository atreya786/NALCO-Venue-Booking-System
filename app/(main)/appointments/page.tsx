import Link from "next/link";

import { getAppointments } from "@/lib/db/appointment";

export default async function AppointmentsPage() {
  const appointments = await getAppointments();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Appointments</h1>

        <Link
          href="/appointments/create"
          className="rounded-lg bg-[var(--accent)] px-4 py-2 text-sm font-medium text-white hover:bg-[var(--accent-hover)]"
        >
          Create Appointment
        </Link>
      </div>

      <div className="overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--card)]">
        <table className="w-full">
          <thead className="bg-[var(--accent)] text-white">
            <tr className="text-left">
              <th className="p-5 text-sm font-semibold">Purpose</th>

              <th className="p-5 text-sm font-semibold">Venue</th>

              <th className="p-5 text-sm font-semibold">Requested By</th>

              <th className="p-5 text-sm font-semibold">Status</th>
            </tr>
          </thead>

          <tbody>
            {appointments?.map((appointment: any) => (
              <tr
                key={appointment.appointment_id}
                className="border-b border-[var(--border)] transition-colors hover:bg-white/5"
              >
                <td className="p-5">{appointment.purpose}</td>

                <td className="p-5 text-gray-300">{appointment.venue_name}</td>

                <td className="p-5">{appointment.requested_by_name}</td>

                <td className="p-5">
                  <span className="rounded-full bg-yellow-500/15 px-3 py-1 text-sm font-medium text-yellow-400">
                    {appointment.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
