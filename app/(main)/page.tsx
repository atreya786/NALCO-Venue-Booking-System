import Link from "next/link";

export default function HomePage() {
  return (
    <div className="space-y-8">
      {/* Hero */}
      <div
        className="
          relative
          overflow-hidden
          rounded-[2rem]
          border
          border-[var(--border)]
          bg-gradient-to-br
          from-cyan-950/70
          via-[var(--card)]
          to-[var(--card)]
          p-10
          shadow-2xl
        "
      >
        {/* Glow */}
        <div className="absolute -top-20 right-0 h-72 w-72 rounded-full bg-cyan-500/20 blur-3xl" />

        <div className="absolute bottom-0 left-0 h-72 w-72 rounded-full bg-blue-500/10 blur-3xl" />

        <div className="relative z-10 flex flex-col gap-10 xl:flex-row xl:items-center xl:justify-between">
          {/* Left */}
          <div className="max-w-3xl">
            <div
              className="
                mb-5
                inline-flex
                items-center
                rounded-full
                border
                border-cyan-500/20
                bg-cyan-500/10
                px-4
                py-1
                text-sm
                font-medium
                text-cyan-400
              "
            >
              NALCO Full-Day Allocation Workflow
            </div>

            <h1 className="text-5xl font-black leading-tight xl:text-7xl">
              Enterprise
              <span className="block bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                Venue Allocation
              </span>
            </h1>

            <p className="mt-6 max-w-2xl text-lg leading-8 text-zinc-400">
              Full-day venue booking and approval workflow system with dynamic
              queue allocation, priority-based approvals, and automated
              allocation recalculation.
            </p>

            {/* Buttons */}
            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href="/bookings/create"
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
                Create Booking
              </Link>

              <Link
                href="/queue"
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
                View Queue
              </Link>
            </div>
          </div>

          {/* Right Cards */}
          <div className="grid grid-cols-2 gap-5 xl:w-[420px]">
            <DashboardCard title="Allocated Venues" value="08" color="green" />

            <DashboardCard title="Waiting Queue" value="05" color="orange" />

            <DashboardCard
              title="Pending Approvals"
              value="04"
              color="yellow"
            />

            <DashboardCard title="Active Venues" value="10" color="cyan" />
          </div>
        </div>
      </div>

      {/* Bottom Grid */}
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
        {/* Workflow */}
        <div
          className="
            rounded-[2rem]
            border
            border-[var(--border)]
            bg-[var(--card)]
            p-8
            shadow-xl
          "
        >
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-2xl font-bold">Allocation Workflow</h2>

            <span
              className="
                rounded-full
                bg-green-500/15
                px-3
                py-1
                text-sm
                font-medium
                text-green-400
              "
            >
              ACTIVE
            </span>
          </div>

          <div className="space-y-5">
            <WorkflowStep title="Guide Approval" status="Required" />

            <WorkflowStep title="HOD Approval" status="Required" />

            <WorkflowStep title="Admin Allocation" status="Dynamic" />

            <WorkflowStep title="Queue Recalculation" status="Automated" />
          </div>
        </div>

        {/* Quick Actions */}
        <div
          className="
            rounded-[2rem]
            border
            border-[var(--border)]
            bg-[var(--card)]
            p-8
            shadow-xl
          "
        >
          <h2 className="mb-6 text-2xl font-bold">Quick Actions</h2>

          <div className="space-y-4">
            <QuickAction href="/bookings/create" title="Create Booking" />

            <QuickAction href="/bookings" title="View Bookings" />

            <QuickAction href="/approvals" title="Approval Workflow" />

            <QuickAction href="/queue" title="Allocation Queue" />

            <QuickAction href="/venues" title="Manage Venues" />
          </div>
        </div>

        {/* System Overview */}
        <div
          className="
            rounded-[2rem]
            border
            border-[var(--border)]
            bg-[var(--card)]
            p-8
            shadow-xl
          "
        >
          <h2 className="mb-6 text-2xl font-bold">System Overview</h2>

          <div className="space-y-6">
            <StatusItem label="Approval Engine" status="Operational" />

            <StatusItem label="Allocation Engine" status="Operational" />

            <StatusItem label="Queue System" status="Dynamic" />

            <StatusItem label="Venue Services" status="Healthy" />

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
    cyan: "bg-cyan-500/10",
    yellow: "bg-yellow-500/10",
    green: "bg-green-500/10",
    orange: "bg-orange-500/10",
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

        <div
          className={`
            h-12
            w-12
            rounded-xl
            ${colorMap[color]}
          `}
        />
      </div>
    </div>
  );
}

function WorkflowStep({ title, status }: { title: string; status: string }) {
  return (
    <div
      className="
        flex
        items-center
        justify-between
        rounded-xl
        border
        border-[var(--border)]
        bg-white/5
        p-4
      "
    >
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

      <span
        className="
          rounded-full
          bg-green-500/15
          px-3
          py-1
          text-sm
          font-medium
          text-green-400
        "
      >
        {status}
      </span>
    </div>
  );
}
