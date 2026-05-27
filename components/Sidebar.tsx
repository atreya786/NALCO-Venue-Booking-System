import Link from "next/link";

import { signOut, auth } from "@/lib/auth";

export default async function Sidebar() {
  const session = await auth();

  return (
    <aside
      className="
        flex
        min-h-screen
        w-72
        flex-col
        justify-between
        border-r
        border-white/10
        bg-[var(--sidebar)]
        p-6
        text-white
      "
    >
      {/* Top */}
      <div>
        {/* Logo */}
        <div className="mb-10">
          <h1 className="text-3xl font-black">NALCO</h1>

          <p className="mt-2 text-sm text-white/60">Venue Allocation System</p>
        </div>

        {/* User Info */}
        <div
          className="
            mb-8
            rounded-2xl
            border
            border-white/10
            bg-white/5
            p-4
          "
        >
          <p className="text-sm text-white/60">Logged In As</p>

          <h2 className="mt-1 text-lg font-semibold">{session?.user.name}</h2>

          <div className="mt-3">
            <span
              className="
                rounded-full
                bg-cyan-500/15
                px-3
                py-1
                text-xs
                font-medium
                text-cyan-400
              "
            >
              {session?.user.role}
            </span>
          </div>
        </div>

        {/* Navigation */}
        <nav className="space-y-2">
          <SidebarLink href="/" label="Dashboard" />

          <SidebarLink href="/bookings" label="Bookings" />

          <SidebarLink href="/approvals" label="Approvals" />

          <SidebarLink href="/queue" label="Allocation Queue" />

          <SidebarLink href="/venues" label="Venues" />

          {session?.user.role === "ADMIN" && (
            <SidebarLink href="/venues/create" label="Add Venue" />
          )}

          <SidebarLink href="/bookings/create" label="Create Booking" />
        </nav>
      </div>

      {/* Bottom */}
      <div className="space-y-4">
        {/* Workflow Info */}
        <div
          className="
            rounded-2xl
            border
            border-cyan-500/20
            bg-cyan-500/10
            p-4
          "
        >
          <p className="text-sm leading-6 text-cyan-100">
            Full-day allocation workflow with dynamic priority-based queue
            management.
          </p>
        </div>

        {/* Logout */}
        <form
          action={async () => {
            "use server";

            await signOut({
              redirectTo: "/login",
            });
          }}
        >
          <button
            className="
              w-full
              rounded-2xl
              bg-white/10
              py-3
              font-medium
              transition
              hover:bg-white/20
            "
          >
            Logout
          </button>
        </form>
      </div>
    </aside>
  );
}

function SidebarLink({ href, label }: { href: string; label: string }) {
  return (
    <Link
      href={href}
      className="
        block
        rounded-2xl
        px-4
        py-3
        font-medium
        transition
        hover:bg-white/10
      "
    >
      {label}
    </Link>
  );
}
