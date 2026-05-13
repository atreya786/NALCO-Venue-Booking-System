import { loginAction } from "@/actions/auth";

export default function LoginPage() {
  return (
    <div
      className="
            min-h-screen
            flex
            items-center
            justify-center
            bg-[var(--background)]
            px-4
         "
    >
      <form
        action={loginAction}
        className="
               w-full
               max-w-md
               bg-[var(--card)]
               border
               border-[var(--border)]
               rounded-2xl
               p-8
               shadow-2xl
               space-y-5
            "
      >
        <h1
          className="
                  text-4xl
                  font-bold
                  text-[var(--foreground)]
                  mb-2
               "
        >
          Login
        </h1>

        {/* Email */}
        <input
          type="email"
          name="email"
          placeholder="Email"
          className="
                  w-full
                  bg-transparent
                  border
                  border-[var(--border)]
                  rounded-xl
                  p-4
                  text-[var(--foreground)]
                  placeholder:text-[var(--muted)]
                  outline-none
                  focus:border-[var(--accent)]
                  transition-colors
               "
          required
        />

        {/* Password */}
        <input
          type="password"
          name="password"
          placeholder="Password"
          className="
                  w-full
                  bg-transparent
                  border
                  border-[var(--border)]
                  rounded-xl
                  p-4
                  text-[var(--foreground)]
                  placeholder:text-[var(--muted)]
                  outline-none
                  focus:border-[var(--accent)]
                  transition-colors
               "
          required
        />

        {/* Submit */}
        <button
          type="submit"
          className="
                  w-full
                  bg-[var(--accent)]
                  hover:bg-[var(--accent-hover)]
                  text-white
                  py-4
                  rounded-xl
                  font-semibold
                  transition-colors
                  cursor-pointer
               "
        >
          Login
        </button>
      </form>
    </div>
  );
}
