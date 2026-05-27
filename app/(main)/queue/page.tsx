import { auth } from "@/lib/auth";

import { redirect } from "next/navigation";

import { getVenueQueues } from "@/lib/db/bookings";

export default async function QueuePage() {
  const session = await auth();

  if (!session) {
    redirect("/login");
  }

  // Apprentices cannot access queue
  if (session.user.role === "APPRENTICE") {
    redirect("/");
  }

  const venueQueues = await getVenueQueues();

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-5xl font-bold">Queue Dashboard</h1>

        <p className="mt-2 text-[var(--muted)]">
          View allocated venues and waiting queue requests.
        </p>
      </div>

      {/* Venue Queues */}
      {Object.entries(venueQueues).map(([venueName, bookings]: any) => {
        const allocatedBooking = bookings.find((b: any) => b.is_allocated);

        const waitingBookings = bookings.filter((b: any) => !b.is_allocated);

        return (
          <div
            key={venueName}
            className="
                overflow-hidden
                rounded-3xl
                border
                border-[var(--border)]
                bg-[var(--card)]
              "
          >
            {/* Venue Header */}
            <div
              className="
                  flex
                  items-center
                  justify-between
                  bg-[var(--accent)]
                  px-6
                  py-5
                "
            >
              <div>
                <h2 className="text-2xl font-bold text-white">{venueName}</h2>

                <p className="mt-1 text-sm text-cyan-100">
                  Full-day venue allocation workflow
                </p>
              </div>

              <div
                className="
                    rounded-full
                    bg-white/15
                    px-4
                    py-2
                    text-sm
                    font-medium
                    text-white
                  "
              >
                {waitingBookings.length} Waiting
              </div>
            </div>

            {/* Current Allocation */}
            <div className="border-b border-[var(--border)] p-6">
              <div className="mb-5 flex items-center justify-between">
                <h3 className="text-xl font-semibold">Current Allocation</h3>

                {allocatedBooking && (
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
                )}
              </div>

              {allocatedBooking ? (
                <div
                  className="
                      rounded-2xl
                      border
                      border-green-500/20
                      bg-green-500/10
                      p-5
                    "
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-2xl font-bold text-green-400">
                        {allocatedBooking.purpose}
                      </p>

                      <div className="mt-3 space-y-1 text-sm text-zinc-300">
                        <p>
                          Requested By: {allocatedBooking.requested_by_name}
                        </p>

                        <p>Role: {allocatedBooking.requested_by_role}</p>

                        <p>
                          Booking Date:{" "}
                          {new Date(
                            allocatedBooking.booking_date,
                          ).toLocaleDateString()}
                        </p>
                      </div>
                    </div>

                    <span
                      className="
                          rounded-full
                          bg-green-500/20
                          px-4
                          py-1
                          text-sm
                          font-medium
                          text-green-400
                        "
                    >
                      ALLOCATED
                    </span>
                  </div>
                </div>
              ) : (
                <div
                  className="
                      rounded-2xl
                      border
                      border-dashed
                      border-[var(--border)]
                      p-6
                      text-sm
                      text-zinc-500
                    "
                >
                  No active allocation for this venue.
                </div>
              )}
            </div>

            {/* Waiting Queue */}
            <div className="p-6">
              <div className="mb-5 flex items-center justify-between">
                <h3 className="text-xl font-semibold">Waiting Queue</h3>

                <span
                  className="
                      rounded-full
                      bg-orange-500/15
                      px-3
                      py-1
                      text-sm
                      font-medium
                      text-orange-400
                    "
                >
                  {waitingBookings.length} Pending Allocation
                </span>
              </div>

              {waitingBookings.length > 0 ? (
                <div className="space-y-4">
                  {waitingBookings.map((booking: any, index: number) => (
                    <div
                      key={booking.appointment_id}
                      className="
                            flex
                            items-start
                            justify-between
                            rounded-2xl
                            border
                            border-[var(--border)]
                            bg-white/5
                            p-5
                          "
                    >
                      <div className="flex gap-4">
                        {/* Queue Number */}
                        <div
                          className="
                                flex
                                h-11
                                w-11
                                items-center
                                justify-center
                                rounded-xl
                                bg-orange-500/15
                                text-sm
                                font-bold
                                text-orange-400
                              "
                        >
                          #{index + 1}
                        </div>

                        {/* Content */}
                        <div>
                          <p className="text-lg font-semibold text-cyan-400">
                            {booking.purpose}
                          </p>

                          <div className="mt-2 space-y-1 text-sm text-zinc-400">
                            <p>Requested By: {booking.requested_by_name}</p>

                            <p>Role: {booking.requested_by_role}</p>

                            <p>
                              Booking Date:{" "}
                              {new Date(
                                booking.booking_date,
                              ).toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Badge */}
                      <span
                        className="
                              rounded-full
                              bg-orange-500/15
                              px-3
                              py-1
                              text-sm
                              font-medium
                              text-orange-400
                            "
                      >
                        WAITING
                      </span>
                    </div>
                  ))}
                </div>
              ) : (
                <div
                  className="
                      rounded-2xl
                      border
                      border-dashed
                      border-[var(--border)]
                      p-6
                      text-sm
                      text-zinc-500
                    "
                >
                  No waiting queue requests for this venue.
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
