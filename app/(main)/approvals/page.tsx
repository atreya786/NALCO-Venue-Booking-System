import { auth } from "@/lib/auth";

import { redirect } from "next/navigation";

import { getBookings } from "@/lib/db/bookings";

import { approveBooking, rejectBooking } from "@/actions/approval";

export default async function ApprovalsPage() {
  const session = await auth();

  if (!session) {
    redirect("/login");
  }

  const bookings = await getBookings();

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-5xl font-bold">Approvals</h1>
        </div>
      </div>

      <div className="overflow-hidden rounded-3xl border border-[var(--border)]">
        <table className="w-full">
          <thead className="bg-cyan-700">
            <tr>
              <th className="px-6 py-5 text-left text-lg font-semibold">
                Sl No.
              </th>

              <th className="px-6 py-5 text-left text-lg font-semibold">
                Purpose
              </th>

              <th className="px-6 py-5 text-left text-lg font-semibold">
                Requested By
              </th>

              <th className="px-6 py-5 text-left text-lg font-semibold">
                Faculty
              </th>

              <th className="px-6 py-5 text-left text-lg font-semibold">HOD</th>

              <th className="px-6 py-5 text-left text-lg font-semibold">
                Admin
              </th>

              <th className="px-6 py-5 text-left text-lg font-semibold">
                Actions
              </th>
            </tr>
          </thead>

          <tbody>
            {bookings?.map((booking: any) => {
              const role = session.user.role;

              const canFacultyApprove =
                role === "FACULTY" && booking.faculty_status === "PENDING";

              const canHodApprove =
                role === "HOD" &&
                booking.faculty_status === "APPROVED" &&
                booking.hod_status === "PENDING";

              const canAdminApprove =
                role === "ADMIN" &&
                booking.faculty_status === "APPROVED" &&
                booking.hod_status === "APPROVED" &&
                booking.admin_status === "PENDING";

              const canApprove =
                canFacultyApprove || canHodApprove || canAdminApprove;

              return (
                <tr
                  key={booking.appointment_id}
                  className="border-t border-[var(--border)] hover:bg-white/5 transition"
                >
                  <td className="px-6 py-6 text-cyan-500 text-xl">
                    {booking.appointment_id}
                  </td>

                  <td className="px-6 py-6 text-cyan-500 text-xl">
                    {booking.purpose}
                  </td>

                  <td className="px-6 py-6 text-xl">
                    {booking.requested_by_name}
                  </td>

                  <td className="px-6 py-6">
                    <StatusBadge status={booking.faculty_status} />
                  </td>

                  <td className="px-6 py-6">
                    <StatusBadge status={booking.hod_status} />
                  </td>

                  <td className="px-6 py-6">
                    <StatusBadge status={booking.admin_status} />
                  </td>

                  <td className="px-6 py-6">
                    {canApprove ? (
                      <div className="flex gap-3">
                        <form
                          action={async () => {
                            "use server";

                            await approveBooking(
                              booking.appointment_id,
                            );
                          }}
                        >
                          <button className="bg-green-600 hover:bg-green-700 transition px-4 py-2 rounded-xl font-medium">
                            Approve
                          </button>
                        </form>

                        <form
                          action={async () => {
                            "use server";

                            await rejectBooking(booking.appointment_id);
                          }}
                        >
                          <button className="bg-red-600 hover:bg-red-700 transition px-4 py-2 rounded-xl font-medium">
                            Reject
                          </button>
                        </form>
                      </div>
                    ) : (
                      <span className="text-zinc-500">No Actions</span>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  if (status === "APPROVED") {
    return (
      <span className="bg-green-500/20 text-green-400 px-4 py-1 rounded-full text-sm font-medium">
        APPROVED
      </span>
    );
  }

  if (status === "REJECTED") {
    return (
      <span className="bg-red-500/20 text-red-400 px-4 py-1 rounded-full text-sm font-medium">
        REJECTED
      </span>
    );
  }

  return (
    <span className="bg-yellow-500/20 text-yellow-400 px-4 py-1 rounded-full text-sm font-medium">
      PENDING
    </span>
  );
}
