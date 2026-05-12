import Link from "next/link";

export default function Sidebar() {
  return (
    <div className="w-64 h-screen bg-black text-white p-4">
      <h1 className="text-xl font-bold mb-6">Appointment System</h1>

      <div className="flex flex-col gap-4">
        <Link href="/dashboard">Dashboard</Link>

        <Link href="/dashboard/appointments">Appointments</Link>

        <Link href="/dashboard/approvals">Approvals</Link>

        <Link href="/dashboard/venues">Venues</Link>
      </div>
    </div>
  );
}
