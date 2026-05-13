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
    <div className="flex">
      <Sidebar />

      <main className="flex-1 p-6">{children}</main>
    </div>
  );
}
