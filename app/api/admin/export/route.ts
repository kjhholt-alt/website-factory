import { prisma } from "@/lib/db";
import { getPrograms } from "@/lib/config";

function escapeCsvField(value: string): string {
  if (
    value.includes(",") ||
    value.includes('"') ||
    value.includes("\n") ||
    value.includes("\r")
  ) {
    return `"${value.replace(/"/g, '""')}"`;
  }
  return value;
}

export async function GET() {
  const registrations = await prisma.registration.findMany({
    orderBy: { createdAt: "desc" },
  });

  const programs = getPrograms();
  const programMap = new Map(programs.map((p) => [p.id, p.name]));

  const header =
    "Child Name,Parent Name,Parent Email,Parent Phone,Program,Status,Date,Emergency Contact,Emergency Phone,Medical Info,Waiver Signed";

  const rows = registrations.map((reg) => {
    const programName = programMap.get(reg.programId) || reg.programId;
    const date = new Date(reg.createdAt).toISOString().split("T")[0];

    return [
      escapeCsvField(reg.childName),
      escapeCsvField(reg.parentName),
      escapeCsvField(reg.parentEmail),
      escapeCsvField(reg.parentPhone),
      escapeCsvField(programName),
      escapeCsvField(reg.status),
      date,
      escapeCsvField(reg.emergencyName),
      escapeCsvField(reg.emergencyPhone),
      escapeCsvField(reg.medicalInfo || ""),
      reg.waiverSigned ? "Yes" : "No",
    ].join(",");
  });

  const csvString = [header, ...rows].join("\n");

  return new Response(csvString, {
    headers: {
      "Content-Type": "text/csv",
      "Content-Disposition": 'attachment; filename="registrations.csv"',
    },
  });
}
