import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Mail, CheckCheck } from "lucide-react";
import { prisma } from "@/lib/db";
import { MessageActions } from "@/components/admin/MessageActions";

export default async function AdminMessagesPage() {
  const messages = await prisma.contactSubmission.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Contact Messages</h1>
        <p className="text-muted-foreground mt-1">
          View and respond to messages from your contact form.
        </p>
      </div>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-lg">
            All Messages{" "}
            <span className="text-sm font-normal text-muted-foreground">
              ({messages.length} {messages.length === 1 ? "message" : "messages"})
            </span>
          </CardTitle>
          <Button
            variant="outline"
            size="sm"
            className="gap-2"
            disabled={messages.length === 0}
          >
            <CheckCheck className="h-4 w-4" />
            Mark All Read
          </Button>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {messages.length === 0 ? (
              <div className="flex flex-col items-center gap-3 py-8">
                <Mail className="h-10 w-10 text-muted-foreground/50" />
                <div className="text-center">
                  <p className="font-medium text-muted-foreground">
                    No messages yet
                  </p>
                  <p className="text-xs text-muted-foreground/70 mt-1">
                    Messages from your contact form will appear here.
                  </p>
                </div>
              </div>
            ) : (
              messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`rounded-lg border p-4 ${
                    !msg.read
                      ? "border-primary/30 bg-primary/5"
                      : "border-border"
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <p
                          className={`text-sm ${
                            !msg.read ? "font-bold" : "font-medium"
                          }`}
                        >
                          {msg.name}
                        </p>
                        {!msg.read && (
                          <Badge variant="secondary" className="text-xs">
                            Unread
                          </Badge>
                        )}
                      </div>
                      <p className="text-xs text-muted-foreground">
                        {msg.email}
                      </p>
                      <p
                        className={`text-sm mt-2 ${
                          !msg.read
                            ? "text-foreground"
                            : "text-muted-foreground"
                        }`}
                      >
                        {msg.message.length > 200
                          ? msg.message.slice(0, 200) + "..."
                          : msg.message}
                      </p>
                    </div>
                    <div className="flex flex-col items-end gap-2 ml-4 shrink-0">
                      <p className="text-xs text-muted-foreground">
                        {new Date(msg.createdAt).toLocaleDateString()}
                      </p>
                      <MessageActions
                        messageId={msg.id}
                        isRead={msg.read}
                      />
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>

      <div className="text-xs text-muted-foreground">
        <p>
          Messages are sorted by newest first. Unread messages are highlighted.
        </p>
      </div>
    </div>
  );
}
