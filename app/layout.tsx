import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Botsub landing page",
  description: "A web app that enables you purchase data with out data.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
