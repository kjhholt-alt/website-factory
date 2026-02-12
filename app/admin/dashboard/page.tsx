import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Users, Mail, CalendarDays, Trophy } from "lucide-react";
import { prisma } from "@/lib/db";
import { getPrograms } from "@/lib/config";

export default async function AdminDashboardPage() {
  const [totalRegistrations, unreadMessages, upcomingEvents, recentRegistrations, recentMessages] =
    await Promise.all([
      prisma.registration.count(),
      prisma.contactSubmission.count({ where: { read: false } }),
      prisma.calendarEvent.count({ where: { date: { gte: new Date() } } }),
      prisma.registration.findMany({ take: 5, orderBy: { createdAt: "desc" } }),
      prisma.contactSubmission.findMany({ take: 5, orderBy: { createdAt: "desc" } }),
    ]);

  const activePrograms = getPrograms().length;

  const stats = [
    {
      title: "Total Registrations",
      value: totalRegistrations.toString(),
      description: "All time registrations",
      icon: Users,
    },
    {
      title: "Unread Messages",
      value: unreadMessages.toString(),
      description: "Pending contact submissions",
      icon: Mail,
    },
    {
      title: "Upcoming Events",
      value: upcomingEvents.toString(),
      description: "Scheduled in the next 30 days",
      icon: CalendarDays,
    },
    {
      title: "Active Programs",
      value: activePrograms.toString(),
      description: "Currently running programs",
      icon: Trophy,
    },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Admin Dashboard</h1>
        <p className="text-muted-foreground mt-1">
          Overview of your business at a glance.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.title}>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">
                  {stat.title}
                </CardTitle>
                <Icon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className="text-xs text-muted-foreground mt-1">
                  {stat.description}
                </p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Recent Registrations</CardTitle>
          </CardHeader>
          <CardContent>
            {recentRegistrations.length === 0 ? (
              <p className="text-sm text-muted-foreground">
                No recent registrations to display.
              </p>
            ) : (
              <div className="space-y-4">
                {recentRegistrations.map((reg) => (
                  <div
                    key={reg.id}
                    className="flex items-start justify-between border-b border-border pb-3 last:border-0 last:pb-0"
                  >
                    <div>
                      <p className="text-sm font-medium">{reg.childName}</p>
                      <p className="text-xs text-muted-foreground">
                        Parent: {reg.parentName}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Program: {reg.programId}
                      </p>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      {new Date(reg.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Recent Messages</CardTitle>
          </CardHeader>
          <CardContent>
            {recentMessages.length === 0 ? (
              <p className="text-sm text-muted-foreground">
                No recent messages to display.
              </p>
            ) : (
              <div className="space-y-4">
                {recentMessages.map((msg) => (
                  <div
                    key={msg.id}
                    className="flex items-start justify-between border-b border-border pb-3 last:border-0 last:pb-0"
                  >
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <p className="text-sm font-medium">{msg.name}</p>
                        {!msg.read && (
                          <Badge variant="secondary" className="text-xs">
                            Unread
                          </Badge>
                        )}
                      </div>
                      <p className="text-xs text-muted-foreground">
                        {msg.email}
                      </p>
                      <p className="text-xs text-muted-foreground mt-1 truncate">
                        {msg.message.length > 80
                          ? msg.message.slice(0, 80) + "..."
                          : msg.message}
                      </p>
                    </div>
                    <p className="text-xs text-muted-foreground ml-2 shrink-0">
                      {new Date(msg.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
