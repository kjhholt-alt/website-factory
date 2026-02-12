import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const { registrationId } = body;

    if (!registrationId) {
      return NextResponse.json(
        { error: "Missing required field: registrationId" },
        { status: 400 }
      );
    }

    await prisma.registration.update({
      where: { id: registrationId },
      data: {
        waiverSigned: true,
        waiverSignedAt: new Date(),
      },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Waiver signing error:", error);
    return NextResponse.json(
      { error: "Failed to sign waiver" },
      { status: 500 }
    );
  }
}
