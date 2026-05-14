import Link from "next/link";

import { getAppointments } from "@/lib/db/appointment";

export default async function AppointmentsPage() {
  const appointments = await getAppointments();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-5xl font-bold">Appointments</h1>

        <Link
          href="/appointments/create"
          className="rounded-lg bg-[var(--accent)] px-4 py-2 text-sm font-medium text-white hover:bg-[var(--accent-hover)]"
        >
          Create Appointment
        </Link>
      </div>

      <div className="overflow-hidden rounded-3xl border border-[var(--border)]">
        <table className="w-full">
          <thead className="bg-[var(--accent)] text-white">
            <tr>
              <th className="px-6 py-5 text-left text-lg font-semibold">
                Purpose
              </th>

              <th className="px-6 py-5 text-left text-lg font-semibold">
                Venue
              </th>

              <th className="px-6 py-5 text-left text-lg font-semibold">
                Requested By
              </th>

              <th className="px-6 py-5 text-left text-lg font-semibold">
                Status
              </th>
            </tr>
          </thead>

          <tbody>
            {appointments?.map((appointment: any) => (
              <tr
                key={appointment.appointment_id}
                className="border-t border-[var(--border)] hover:bg-white/5 transition"
              >
                <td className="px-6 py-6">
                  <Link
                    href={`/appointments/${appointment.appointment_id}`}
                    className="text-cyan-500 text-xl hover:underline"
                  >
                    {appointment.purpose}
                  </Link>
                </td>

                <td className="px-6 py-6 text-xl text-gray-300">
                  {appointment.venue_name}
                </td>

                <td className="px-6 py-6 text-xl">
                  {appointment.requested_by_name}
                </td>

                <td className="px-6 py-6">
                  {appointment.status === "APPROVED" && (
                    <span className="bg-green-500/20 text-green-400 px-4 py-1 rounded-full text-sm font-medium">
                      APPROVED
                    </span>
                  )}

                  {appointment.status === "PENDING" && (
                    <span className="bg-yellow-500/20 text-yellow-400 px-4 py-1 rounded-full text-sm font-medium">
                      PENDING
                    </span>
                  )}

                  {appointment.status === "REJECTED" && (
                    <span className="bg-red-500/20 text-red-400 px-4 py-1 rounded-full text-sm font-medium">
                      REJECTED
                    </span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
