import Link from "next/link";

import { signOut } from "@/lib/auth";

export default function Sidebar() {
  return (
    <div className="w-64 h-screen bg-black text-white p-4">
      <h1 className="text-xl font-bold mb-6">Venue Booking System</h1>

      <div className="flex flex-col gap-4">
        <Link href="/">Dashboard</Link>

        <Link href="/appointments">Appointments</Link>

        <Link href="/approvals">Approvals</Link>

        <Link href="/venues">Venues</Link>
        <form
          action={async () => {
            "use server";

            await signOut({
              redirectTo: "/login",
            });
          }}
        >
          <button>Logout</button>
        </form>
      </div>
    </div>
  );
}
