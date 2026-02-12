import { Resend } from "resend";
import { getConfig } from "@/lib/config";

const resend = process.env.RESEND_API_KEY
  ? new Resend(process.env.RESEND_API_KEY)
  : null;

interface EmailOptions {
  to: string;
  subject: string;
  html: string;
}

export async function sendEmail({ to, subject, html }: EmailOptions): Promise<boolean> {
  const config = getConfig();
  const from = `${config.business.name} <noreply@${process.env.EMAIL_DOMAIN || "resend.dev"}>`;

  if (!resend) {
    console.log(`[EMAIL] Would send to: ${to}`);
    console.log(`[EMAIL] Subject: ${subject}`);
    console.log(`[EMAIL] From: ${from}`);
    return true;
  }

  try {
    await resend.emails.send({ from, to, subject, html });
    return true;
  } catch (error) {
    console.error("[EMAIL] Failed to send:", error);
    return false;
  }
}
