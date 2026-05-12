import Sidebar from "@/components/Sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode; // Any react renderable content
}) {
  return (
    <div className="flex">
      <Sidebar />

      <main className="flex-1 p-6">{children}</main>
    </div>
  );
}
