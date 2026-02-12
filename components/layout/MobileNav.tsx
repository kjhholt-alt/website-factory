"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { Menu, X } from "lucide-react";
import { getConfig, getEnabledPages, getPageLabel, getPageHref } from "@/lib/config";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function MobileNav() {
  const [open, setOpen] = React.useState(false);
  const pathname = usePathname();
  const config = getConfig();
  const enabledPages = getEnabledPages();

  const navPages = enabledPages.filter((page) => page !== "register");

  return (
    <DialogPrimitive.Root open={open} onOpenChange={setOpen}>
      <DialogPrimitive.Trigger asChild>
        <Button variant="ghost" size="icon" aria-label="Open menu">
          <Menu className="h-6 w-6" />
        </Button>
      </DialogPrimitive.Trigger>

      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay className="fixed inset-0 z-50 bg-black/50 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
        <DialogPrimitive.Content className="fixed inset-y-0 right-0 z-50 flex h-full w-3/4 max-w-sm flex-col bg-white shadow-xl transition-transform data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-border px-6 py-4">
            <span className="text-lg font-bold text-primary">
              {config.business.name}
            </span>
            <DialogPrimitive.Close asChild>
              <Button variant="ghost" size="icon" aria-label="Close menu">
                <X className="h-5 w-5" />
              </Button>
            </DialogPrimitive.Close>
          </div>

          {/* Navigation Links */}
          <nav className="flex flex-1 flex-col space-y-1 overflow-y-auto px-4 py-6">
            {navPages.map((page) => {
              const href = getPageHref(page);
              const isActive =
                pathname === href ||
                (page !== "home" && pathname.startsWith(href));

              return (
                <Link
                  key={page}
                  href={href}
                  onClick={() => setOpen(false)}
                  className={cn(
                    "rounded-md px-3 py-2 text-base transition-colors hover:bg-accent",
                    isActive
                      ? "font-semibold text-primary bg-accent"
                      : "text-foreground"
                  )}
                >
                  {getPageLabel(page)}
                </Link>
              );
            })}
          </nav>

          {/* Register CTA at the bottom */}
          {enabledPages.includes("register") && (
            <div className="border-t border-border px-4 py-4">
              <Link href="/register" onClick={() => setOpen(false)}>
                <Button variant="secondary" className="w-full" size="lg">
                  Register
                </Button>
              </Link>
            </div>
          )}
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
}
