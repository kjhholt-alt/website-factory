"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Download, Users } from "lucide-react";

export default function AdminRegistrationsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Registration Management
          </h1>
          <p className="text-muted-foreground mt-1">
            View and manage all program registrations.
          </p>
        </div>
        <Button variant="outline" className="gap-2">
          <Download className="h-4 w-4" />
          Export CSV
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">All Registrations</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground">
                    Child Name
                  </th>
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground">
                    Parent
                  </th>
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground">
                    Program
                  </th>
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground">
                    Status
                  </th>
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground">
                    Date
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td colSpan={5} className="py-12 text-center">
                    <div className="flex flex-col items-center gap-3">
                      <Users className="h-10 w-10 text-muted-foreground/50" />
                      <div>
                        <p className="font-medium text-muted-foreground">
                          No registrations yet
                        </p>
                        <p className="text-xs text-muted-foreground/70 mt-1">
                          Registrations will appear here once families sign up
                          for programs.
                        </p>
                      </div>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      <div className="flex items-center gap-2 text-xs text-muted-foreground">
        <span>Status legend:</span>
        <Badge variant="default">Confirmed</Badge>
        <Badge variant="secondary">Pending</Badge>
        <Badge variant="outline">Cancelled</Badge>
      </div>
    </div>
  );
}
