import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { sendEmail } from "@/lib/email";
import { contactConfirmationEmail, newContactNotifyEmail } from "@/lib/email-templates";
import { getConfig } from "@/lib/config";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const { name, email, message, phone } = body;

    const missingFields: string[] = [];
    if (!name) missingFields.push("name");
    if (!email) missingFields.push("email");
    if (!message) missingFields.push("message");

    if (missingFields.length > 0) {
      return NextResponse.json(
        {
          error: `Missing required fields: ${missingFields.join(", ")}`,
        },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Invalid email format", field: "email" },
        { status: 400 }
      );
    }

    if (message.length < 10) {
      return NextResponse.json(
        { error: "Message must be at least 10 characters", field: "message" },
        { status: 400 }
      );
    }

    await prisma.contactSubmission.create({
      data: {
        name,
        email,
        message,
        phone: phone || null,
      },
    });

    // Send emails (non-blocking)
    const confirmEmail = contactConfirmationEmail({ name });
    const notifyEmail = newContactNotifyEmail({ name, email, phone: phone || null, message });

    Promise.allSettled([
      sendEmail({ to: email, ...confirmEmail }),
      sendEmail({ to: getConfig().business.email, ...notifyEmail }),
    ]).catch(() => {});

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Contact submission error:", error);
    return NextResponse.json(
      { error: "Failed to submit contact form" },
      { status: 500 }
    );
  }
}
