"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Mail, CheckCheck } from "lucide-react";

export default function AdminMessagesPage() {
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
          <CardTitle className="text-lg">All Messages</CardTitle>
          <Button variant="outline" size="sm" className="gap-2" disabled>
            <CheckCheck className="h-4 w-4" />
            Mark All Read
          </Button>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
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
