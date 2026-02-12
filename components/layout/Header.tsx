"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { getConfig, getEnabledPages, getPageLabel, getPageHref } from "@/lib/config";
import { Button } from "@/components/ui/button";
import { MobileNav } from "@/components/layout/MobileNav";
import { cn } from "@/lib/utils";

export function Header() {
  const pathname = usePathname();
  const config = getConfig();
  const enabledPages = getEnabledPages();

  const navPages = enabledPages.filter((page) => page !== "register");

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo / Business Name */}
        <Link href="/" className="flex items-center space-x-2">
          <span className="text-xl font-bold text-primary">
            {config.business.name}
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex md:items-center md:space-x-6">
          {navPages.map((page) => {
            const href = getPageHref(page);
            const isActive =
              pathname === href ||
              (page !== "home" && pathname.startsWith(href));

            return (
              <Link
                key={page}
                href={href}
                className={cn(
                  "text-sm transition-colors hover:text-primary",
                  isActive
                    ? "font-semibold text-primary underline underline-offset-4"
                    : "text-muted-foreground"
                )}
              >
                {getPageLabel(page)}
              </Link>
            );
          })}
        </nav>

        {/* Desktop CTA + Mobile Menu */}
        <div className="flex items-center space-x-4">
          {enabledPages.includes("register") && (
            <Link href="/register" className="hidden md:inline-flex">
              <Button variant="secondary" size="default">
                Register
              </Button>
            </Link>
          )}

          {/* Mobile hamburger menu */}
          <div className="md:hidden">
            <MobileNav />
          </div>
        </div>
      </div>
    </header>
  );
}
