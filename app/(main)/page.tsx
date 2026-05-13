export default function HomePage() {
  return (
    <div
      className="
            min-h-screen
            bg-[var(--background)]
            text-[var(--foreground)]
         "
    >
      {/* Header */}
      <div className="mb-8">
        <h1
          className="
                  text-4xl
                  font-bold
               "
        >
          Dashboard
        </h1>

        <p
          className="
                  text-[var(--muted)]
                  mt-2
               "
        >
          Welcome to the NALCO Venue Booking System
        </p>
      </div>

      {/* Stats Grid */}
      <div
        className="
               grid
               grid-cols-1
               md:grid-cols-2
               xl:grid-cols-4
               gap-6
            "
      >
        {/* Card 1 */}
        <div
          className="
                  bg-[var(--card)]
                  border
                  border-[var(--border)]
                  rounded-2xl
                  p-6
                  shadow-xl
               "
        >
          <p
            className="
                     text-[var(--muted)]
                     text-sm
                     mb-2
                  "
          >
            Total Venues
          </p>

          <h2
            className="
                     text-3xl
                     font-bold
                  "
          >
            10
          </h2>
        </div>

        {/* Card 2 */}
        <div
          className="
                  bg-[var(--card)]
                  border
                  border-[var(--border)]
                  rounded-2xl
                  p-6
                  shadow-xl
               "
        >
          <p
            className="
                     text-[var(--muted)]
                     text-sm
                     mb-2
                  "
          >
            Pending Requests
          </p>

          <h2
            className="
                     text-3xl
                     font-bold
                  "
          >
            4
          </h2>
        </div>

        {/* Card 3 */}
        <div
          className="
                  bg-[var(--card)]
                  border
                  border-[var(--border)]
                  rounded-2xl
                  p-6
                  shadow-xl
               "
        >
          <p
            className="
                     text-[var(--muted)]
                     text-sm
                     mb-2
                  "
          >
            Approved Today
          </p>

          <h2
            className="
                     text-3xl
                     font-bold
                  "
          >
            7
          </h2>
        </div>

        {/* Card 4 */}
        <div
          className="
                  bg-[var(--card)]
                  border
                  border-[var(--border)]
                  rounded-2xl
                  p-6
                  shadow-xl
               "
        >
          <p
            className="
                     text-[var(--muted)]
                     text-sm
                     mb-2
                  "
          >
            Active Users
          </p>

          <h2
            className="
                     text-3xl
                     font-bold
                  "
          >
            25
          </h2>
        </div>
      </div>
    </div>
  );
}
