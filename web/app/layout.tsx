import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ML Research Pulse",
  description: "Weekly AI/ML research digest for practitioners",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen">{children}</body>
    </html>
  );
}
