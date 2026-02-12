import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { getConfig } from "@/lib/config";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

const inter = Inter({ subsets: ["latin"] });

export function generateMetadata(): Metadata {
  const config = getConfig();
  return {
    title: config.business.name,
    description: config.business.tagline,
  };
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Header />
        <main className="min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
