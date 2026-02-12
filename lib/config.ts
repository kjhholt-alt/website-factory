import siteConfig from "@/config/site.json";

export interface LocationInfo {
  address: string;
  city: string;
  state: string;
  zip: string;
}

export interface BusinessInfo {
  name: string;
  tagline: string;
  owner: string;
  phone: string;
  email: string;
  location: LocationInfo;
}

export interface ThemeConfig {
  primaryColor: string;
  secondaryColor: string;
  mode: "light" | "dark";
}

export interface Program {
  id: string;
  name: string;
  description: string;
  ageRange: string;
  price: number;
  priceUnit: string;
  schedule: string;
  spotsTotal: number | null;
  featured: boolean;
}

export interface Testimonial {
  quote: string;
  name: string;
  detail: string;
}

export interface ValueItem {
  title: string;
  description: string;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface SiteConfig {
  business: BusinessInfo;
  theme: ThemeConfig;
  pages: Record<string, boolean>;
  programs: Program[];
  registration: {
    fields: string[];
    requireWaiver: boolean;
    requirePayment: boolean;
  };
  content: {
    heroHeadline: string;
    heroSubheadline: string;
    stats: {
      kidsTrained: string;
      yearsExperience: string;
      rating: string;
    };
    testimonials: Testimonial[];
    about: {
      mission: string;
      coachBio: string;
      values: ValueItem[];
    };
    faq: FaqItem[];
  };
  features: {
    emailNotifications: boolean;
    adminDashboard: boolean;
    calendarPublic: boolean;
    exportCsv: boolean;
  };
}

const config = siteConfig as SiteConfig;

export function getConfig(): SiteConfig {
  return config;
}

export function getPrograms(): Program[] {
  return config.programs;
}

export function getFeaturedPrograms(): Program[] {
  return config.programs.filter((p) => p.featured);
}

export function getEnabledPages(): string[] {
  return Object.entries(config.pages)
    .filter(([, enabled]) => enabled)
    .map(([page]) => page);
}

export function getBusinessInfo(): BusinessInfo {
  return config.business;
}

export function getTheme(): ThemeConfig {
  return config.theme;
}

export function getPageLabel(page: string): string {
  const labels: Record<string, string> = {
    home: "Home",
    about: "About",
    programs: "Programs",
    schedule: "Schedule",
    register: "Register",
    contact: "Contact",
    faq: "FAQ",
    gallery: "Gallery",
    blog: "Blog",
  };
  return labels[page] || page.charAt(0).toUpperCase() + page.slice(1);
}

export function getPageHref(page: string): string {
  if (page === "home") return "/";
  return `/${page}`;
}
