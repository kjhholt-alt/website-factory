import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const publicOnly = searchParams.get("public") === "true";

    const events = await prisma.calendarEvent.findMany({
      where: publicOnly ? { isPublic: true } : undefined,
      orderBy: { date: "asc" },
    });

    return NextResponse.json({ events });
  } catch (error) {
    console.error("Fetch events error:", error);
    return NextResponse.json(
      { error: "Failed to fetch events" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const {
      title,
      description,
      date,
      startTime,
      endTime,
      location,
      programId,
      spotsTotal,
      isPublic,
    } = body;

    if (!title || !date || !startTime || !endTime) {
      return NextResponse.json(
        { error: "Missing required fields: title, date, startTime, endTime" },
        { status: 400 }
      );
    }

    const event = await prisma.calendarEvent.create({
      data: {
        title,
        description: description || null,
        date: new Date(date),
        startTime,
        endTime,
        location: location || null,
        programId: programId || null,
        spotsTotal: spotsTotal || null,
        isPublic: isPublic !== undefined ? isPublic : true,
      },
    });

    return NextResponse.json({ success: true, id: event.id });
  } catch (error) {
    console.error("Create event error:", error);
    return NextResponse.json(
      { error: "Failed to create event" },
      { status: 500 }
    );
  }
}
