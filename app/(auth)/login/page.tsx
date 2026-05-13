import { loginAction } from "@/actions/auth";

export default function LoginPage() {
  return (
    <div className="h-screen flex items-center justify-center">
      <form action={loginAction} className="flex flex-col gap-4 w-80">
        <h1 className="text-3xl font-bold">Login</h1>

        <input
          type="email"
          name="email"
          placeholder="Email"
          className="border p-3 rounded"
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          className="border p-3 rounded"
        />

        <button className="bg-black text-white p-3 rounded">Login</button>
      </form>
    </div>
  );
}
