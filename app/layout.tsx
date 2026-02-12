import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { getConfig } from "@/lib/config";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import Providers from "@/components/Providers";

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
  const config = getConfig();
  const themeStyle = `:root {
    --primary: ${config.theme.primaryColor};
    --secondary: ${config.theme.secondaryColor};
    --ring: ${config.theme.primaryColor};
  }`;

  return (
    <html lang="en">
      <body className={inter.className}>
        <style dangerouslySetInnerHTML={{ __html: themeStyle }} />
        <Providers>
          <Header />
          <main className="min-h-screen">{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
