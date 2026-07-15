import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "MCP Scout - Discover & Install MCP Servers",
  description: "The definitive registry for Model Context Protocol servers. Search, install, and manage servers for AI agents.",
  openGraph: {
    title: "MCP Scout",
    description: "Discover & Install MCP Servers",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-[#0D0D0D] text-white antialiased">
        {children}
      </body>
    </html>
  );
}
