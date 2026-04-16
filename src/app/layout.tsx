import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "End2End",
  description: "A privary focused Zero meta-data collected end-to-end encryped messaging platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className="h-full antialiased">
      <body className="min-h-full flex flex-col bg-[#0a0a0a] text-white">
        {children}
      </body>
    </html>
  );
}
