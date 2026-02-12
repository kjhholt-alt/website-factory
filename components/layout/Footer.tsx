import Link from "next/link";
import { getConfig, getEnabledPages, getPageLabel, getPageHref } from "@/lib/config";
import { Phone, Mail, MapPin, Facebook, Instagram, Twitter, Youtube } from "lucide-react";

export function Footer() {
  const config = getConfig();
  const enabledPages = getEnabledPages();
  const { business } = config;

  const formattedAddress = `${business.location.address}, ${business.location.city}, ${business.location.state} ${business.location.zip}`;

  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {/* Column 1: Business Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold">{business.name}</h3>
            <p className="text-sm text-primary-foreground/80">
              {config.business.tagline}
            </p>
            <div className="space-y-2 text-sm">
              <div className="flex items-start space-x-2">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-secondary" />
                <span>{formattedAddress}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4 shrink-0 text-secondary" />
                <span>{business.phone}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4 shrink-0 text-secondary" />
                <span>{business.email}</span>
              </div>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold">Quick Links</h3>
            <nav className="flex flex-col space-y-2">
              {enabledPages.map((page) => (
                <Link
                  key={page}
                  href={getPageHref(page)}
                  className="text-sm text-primary-foreground/80 transition-colors hover:text-secondary"
                >
                  {getPageLabel(page)}
                </Link>
              ))}
            </nav>
          </div>

          {/* Column 3: Social Media */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold">Follow Us</h3>
            <p className="text-sm text-primary-foreground/80">
              Stay connected and follow our latest updates on social media.
            </p>
            <div className="flex space-x-4">
              <a
                href="#"
                aria-label="Facebook"
                className="rounded-full bg-primary-foreground/10 p-2 transition-colors hover:bg-secondary hover:text-secondary-foreground"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a
                href="#"
                aria-label="Instagram"
                className="rounded-full bg-primary-foreground/10 p-2 transition-colors hover:bg-secondary hover:text-secondary-foreground"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href="#"
                aria-label="Twitter"
                className="rounded-full bg-primary-foreground/10 p-2 transition-colors hover:bg-secondary hover:text-secondary-foreground"
              >
                <Twitter className="h-5 w-5" />
              </a>
              <a
                href="#"
                aria-label="YouTube"
                className="rounded-full bg-primary-foreground/10 p-2 transition-colors hover:bg-secondary hover:text-secondary-foreground"
              >
                <Youtube className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-10 border-t border-primary-foreground/20 pt-6 text-center">
          <p className="text-sm text-primary-foreground/70">
            &copy; 2026 {business.name}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
