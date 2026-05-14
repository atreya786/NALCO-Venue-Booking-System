import Link from "next/link";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)]">
      {/* Hero Section */}
      <div className="relative overflow-hidden rounded-[2rem] border border-[var(--border)] bg-gradient-to-br from-cyan-950/70 via-[var(--card)] to-[var(--card)] p-10 shadow-2xl">
        {/* Glow Effects */}
        <div className="absolute -top-20 right-0 h-72 w-72 rounded-full bg-cyan-500/20 blur-3xl" />

        <div className="absolute bottom-0 left-0 h-72 w-72 rounded-full bg-blue-500/10 blur-3xl" />

        <div className="relative z-10 flex flex-col gap-10 xl:flex-row xl:items-center xl:justify-between">
          {/* Left */}
          <div className="max-w-3xl">
            <div className="mb-4 inline-flex items-center rounded-full border border-cyan-500/20 bg-cyan-500/10 px-4 py-1 text-sm font-medium text-cyan-400">
              NALCO Enterprise Venue Workflow
            </div>

            <h1 className="text-5xl font-black leading-tight xl:text-7xl">
              Venue Booking
              <span className="block bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                Management System
              </span>
            </h1>

            <p className="mt-6 max-w-2xl text-lg leading-8 text-zinc-400">
              Centralized workflow platform for venue approvals, booking
              management, scheduling, and enterprise-level resource allocation.
            </p>

            {/* Buttons */}
            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href="/bookings"
                className="
                  rounded-2xl
                  bg-[var(--accent)]
                  px-6
                  py-4
                  text-lg
                  font-semibold
                  text-white
                  transition
                  hover:scale-[1.03]
                  hover:bg-[var(--accent-hover)]
                "
              >
                View Bookings
              </Link>

              <Link
                href="/bookings/create"
                className="
                  rounded-2xl
                  border
                  border-[var(--border)]
                  bg-white/5
                  px-6
                  py-4
                  text-lg
                  font-semibold
                  backdrop-blur-sm
                  transition
                  hover:bg-white/10
                "
              >
                Create Booking
              </Link>
            </div>
          </div>

          {/* Right Stats */}
          <div className="grid grid-cols-2 gap-5 xl:w-[420px]">
            <DashboardCard title="Total Venues" value="10" color="cyan" />

            <DashboardCard
              title="Pending Approvals"
              value="04"
              color="yellow"
            />

            <DashboardCard title="Approved Today" value="07" color="green" />

            <DashboardCard title="Active Users" value="25" color="blue" />
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="mt-10 grid grid-cols-1 gap-6 xl:grid-cols-3">
        {/* Workflow Card */}
        <div className="rounded-[2rem] border border-[var(--border)] bg-[var(--card)] p-8 shadow-xl">
          <div className="mb-5 flex items-center justify-between">
            <h2 className="text-2xl font-bold">Approval Workflow</h2>

            <span className="rounded-full bg-green-500/15 px-3 py-1 text-sm font-medium text-green-400">
              ACTIVE
            </span>
          </div>

          <div className="space-y-5">
            <WorkflowStep title="Faculty Approval" status="Completed" />

            <WorkflowStep title="HOD Verification" status="In Progress" />

            <WorkflowStep title="Admin Finalization" status="Pending" />
          </div>
        </div>

        {/* Quick Actions */}
        <div className="rounded-[2rem] border border-[var(--border)] bg-[var(--card)] p-8 shadow-xl">
          <h2 className="mb-6 text-2xl font-bold">Quick Actions</h2>

          <div className="space-y-4">
            <QuickAction href="/venues" title="Manage Venues" />

            <QuickAction href="/bookings" title="View Bookings" />

            <QuickAction href="/approvals" title="Approval Queue" />

            <QuickAction href="/bookings/create" title="New Booking Request" />
          </div>
        </div>

        {/* System Status */}
        <div className="rounded-[2rem] border border-[var(--border)] bg-[var(--card)] p-8 shadow-xl">
          <h2 className="mb-6 text-2xl font-bold">System Status</h2>

          <div className="space-y-6">
            <StatusItem label="Workflow Engine" status="Operational" />

            <StatusItem label="Approval Services" status="Operational" />

            <StatusItem label="Venue Management" status="Operational" />

            <StatusItem label="Database Cluster" status="Healthy" />
          </div>
        </div>
      </div>
    </div>
  );
}

function DashboardCard({
  title,
  value,
  color,
}: {
  title: string;
  value: string;
  color: string;
}) {
  const colorMap: Record<string, string> = {
    cyan: "text-cyan-400 bg-cyan-500/10",
    yellow: "text-yellow-400 bg-yellow-500/10",
    green: "text-green-400 bg-green-500/10",
    blue: "text-blue-400 bg-blue-500/10",
  };

  return (
    <div
      className="
        rounded-2xl
        border
        border-[var(--border)]
        bg-white/5
        p-6
        backdrop-blur-sm
      "
    >
      <p className="text-sm text-zinc-400">{title}</p>

      <div className="mt-4 flex items-center justify-between">
        <h2 className="text-4xl font-black">{value}</h2>

        <div className={`h-12 w-12 rounded-xl ${colorMap[color]}`} />
      </div>
    </div>
  );
}

function WorkflowStep({ title, status }: { title: string; status: string }) {
  return (
    <div className="flex items-center justify-between rounded-xl border border-[var(--border)] bg-white/5 p-4">
      <p className="font-medium">{title}</p>

      <span className="text-sm text-cyan-400">{status}</span>
    </div>
  );
}

function QuickAction({ href, title }: { href: string; title: string }) {
  return (
    <Link
      href={href}
      className="
        flex
        items-center
        justify-between
        rounded-xl
        border
        border-[var(--border)]
        bg-white/5
        px-5
        py-4
        transition
        hover:bg-white/10
      "
    >
      <span className="font-medium">{title}</span>

      <span className="text-cyan-400">→</span>
    </Link>
  );
}

function StatusItem({ label, status }: { label: string; status: string }) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-zinc-400">{label}</span>

      <span className="rounded-full bg-green-500/15 px-3 py-1 text-sm font-medium text-green-400">
        {status}
      </span>
    </div>
  );
}
