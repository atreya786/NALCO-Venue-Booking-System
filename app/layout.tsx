import type { Metadata } from "next";
import { Toaster } from "react-hot-toast";
import "./globals.css";

export const metadata: Metadata = {
  title: "NALCO Venue Booking System",

  description: "NALCO Venue Appointment Management System",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className="
               bg-[var(--background)]
               text-[var(--foreground)]
               antialiased
            "
      >
        {children}
        <Toaster position="top-right" />
      </body>
    </html>
  );
}
