export default function Loading() {
  return (
    <div
      className="
            min-h-screen
            bg-[var(--background)]
            p-6
         "
    >
      <div
        className="
               max-w-2xl
               bg-[var(--card)]
               border
               border-[var(--border)]
               rounded-2xl
               p-8
               shadow-xl
               animate-pulse
            "
      >
        {/* Heading */}
        <div
          className="
                  h-10
                  w-56
                  bg-[var(--border)]
                  rounded-lg
                  mb-8
               "
        />

        {/* Input Skeletons */}
        <div className="space-y-6">
          <div>
            <div
              className="
                        h-4
                        w-28
                        bg-[var(--border)]
                        rounded
                        mb-3
                     "
            />

            <div
              className="
                        h-14
                        w-full
                        bg-[var(--border)]
                        rounded-xl
                     "
            />
          </div>

          <div>
            <div
              className="
                        h-4
                        w-24
                        bg-[var(--border)]
                        rounded
                        mb-3
                     "
            />

            <div
              className="
                        h-14
                        w-full
                        bg-[var(--border)]
                        rounded-xl
                     "
            />
          </div>

          <div>
            <div
              className="
                        h-14
                        w-full
                        bg-[var(--accent)]
                        opacity-50
                        rounded-xl
                     "
            />
          </div>
        </div>
      </div>
    </div>
  );
}
