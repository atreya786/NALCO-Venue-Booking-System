import { auth } from "@/lib/auth";

import { redirect } from "next/navigation";

import Sidebar from "@/components/Sidebar";

export default async function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  if (!session) {
    redirect("/login");
  }

  return (
    <div
      className="
            min-h-screen
            flex
            bg-[var(--background)]
            text-[var(--foreground)]
         "
    >
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <main
        className="
               flex-1
               p-6
               overflow-y-auto
            "
      >
        {children}
      </main>
    </div>
  );
}
