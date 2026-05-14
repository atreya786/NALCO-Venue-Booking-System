import Link from "next/link";

import { signOut,auth } from "@/lib/auth";

export default async function Sidebar() {

  const session = await auth();

  return (
    <aside
      className="
            w-72
            min-h-screen
            bg(--sidebar)
            text-white
            border-r
            border-white/10
            flex
            flex-col
            justify-between
            p-6
         "
    >
      {/* Top Section */}
      <div>
        {/* Logo / Title */}
        <div className="mb-10">
          <h1
            className="
                     text-2xl
                     font-bold
                     leading-snug
                  "
          >
            NALCO
          </h1>

          <p
            className="
                     text-sm
                     text-white/70
                     mt-1
                  "
          >
            Venue Booking System
          </p>
        </div>

        {/* Navigation */}
        <nav className="flex flex-col gap-2">
          <Link
            href="/"
            className="
                     px-4
                     py-3
                     rounded-xl
                     hover:bg-white/10
                     transition-colors
                     font-medium
                  "
          >
            Dashboard
          </Link>

          {session?.user?.role !== "STUDENT" && (<Link
            href="/bookings"
            className="
                     px-4
                     py-3
                     rounded-xl
                     hover:bg-white/10
                     transition-colors
                     font-medium
                  "
          >
            Bookings
          </Link>)}

          <Link
            href="/approvals"
            className="
                     px-4
                     py-3
                     rounded-xl
                     hover:bg-white/10
                     transition-colors
                     font-medium
                  "
          >
            Approvals
          </Link>

          <Link
            href="/venues"
            className="
                     px-4
                     py-3
                     rounded-xl
                     hover:bg-white/10
                     transition-colors
                     font-medium
                  "
          >
            Venues
          </Link>
        </nav>
      </div>

      {/* Bottom Section */}
      <div>
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
                     bg-white/10
                     hover:bg-white/20
                     text-white
                     py-3
                     rounded-xl
                     transition-colors
                     font-medium
                     cursor-pointer
                  "
          >
            Logout
          </button>
        </form>
      </div>
    </aside>
  );
}
