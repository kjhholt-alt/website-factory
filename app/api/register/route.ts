import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { sendEmail } from "@/lib/email";
import { registrationConfirmationEmail, newRegistrationNotifyEmail } from "@/lib/email-templates";
import { getPrograms, getConfig } from "@/lib/config";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const {
      parentName,
      parentEmail,
      parentPhone,
      childName,
      childDob,
      programId,
      medicalInfo,
      emergencyName,
      emergencyPhone,
      waiverSigned,
    } = body;

    const missingFields: string[] = [];
    if (!parentName) missingFields.push("parentName");
    if (!parentEmail) missingFields.push("parentEmail");
    if (!parentPhone) missingFields.push("parentPhone");
    if (!childName) missingFields.push("childName");
    if (!childDob) missingFields.push("childDob");
    if (!programId) missingFields.push("programId");
    if (!emergencyName) missingFields.push("emergencyName");
    if (!emergencyPhone) missingFields.push("emergencyPhone");

    if (missingFields.length > 0) {
      return NextResponse.json(
        {
          error: `Missing required fields: ${missingFields.join(", ")}`,
        },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(parentEmail)) {
      return NextResponse.json(
        { error: "Invalid email format", field: "parentEmail" },
        { status: 400 }
      );
    }

    const registration = await prisma.registration.create({
      data: {
        parentName,
        parentEmail,
        parentPhone,
        childName,
        childDob,
        programId,
        medicalInfo: medicalInfo || null,
        emergencyName,
        emergencyPhone,
        waiverSigned: waiverSigned || false,
        waiverSignedAt: waiverSigned ? new Date() : null,
      },
    });

    // Send emails (non-blocking)
    const programs = getPrograms();
    const program = programs.find((p) => p.id === programId);
    if (program) {
      const confirmEmail = registrationConfirmationEmail({ parentName, childName, program });
      const notifyEmail = newRegistrationNotifyEmail({
        parentName, parentEmail, parentPhone, childName, childDob,
        programName: program.name,
      });

      Promise.allSettled([
        sendEmail({ to: parentEmail, ...confirmEmail }),
        sendEmail({ to: getConfig().business.email, ...notifyEmail }),
      ]).catch(() => {});
    }

    return NextResponse.json({ success: true, id: registration.id });
  } catch (error) {
    console.error("Registration error:", error);
    return NextResponse.json(
      { error: "Failed to create registration" },
      { status: 500 }
    );
  }
}
