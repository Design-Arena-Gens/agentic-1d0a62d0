import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Unity to Android Porter - Complete Guide & Toolkit",
  description: "Step-by-step guide and tools for porting Unity games from PC to Android",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
