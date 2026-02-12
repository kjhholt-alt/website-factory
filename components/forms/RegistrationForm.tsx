"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { CheckCircle, AlertCircle, CalendarDays, DollarSign } from "lucide-react";
import type { Program } from "@/lib/config";

interface RegistrationFormProps {
  programs: Program[];
  requireWaiver: boolean;
}

export default function RegistrationForm({
  programs,
  requireWaiver,
}: RegistrationFormProps) {
  // Parent info
  const [parentName, setParentName] = useState("");
  const [parentEmail, setParentEmail] = useState("");
  const [parentPhone, setParentPhone] = useState("");

  // Child info
  const [childName, setChildName] = useState("");
  const [childDob, setChildDob] = useState("");

  // Program
  const [selectedProgramId, setSelectedProgramId] = useState("");

  // Medical & emergency
  const [medicalInfo, setMedicalInfo] = useState("");
  const [emergencyName, setEmergencyName] = useState("");
  const [emergencyPhone, setEmergencyPhone] = useState("");

  // Waiver
  const [waiverAccepted, setWaiverAccepted] = useState(false);

  // Status
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");

  const selectedProgram = programs.find((p) => p.id === selectedProgramId);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (
      !parentName.trim() ||
      !parentEmail.trim() ||
      !parentPhone.trim() ||
      !childName.trim() ||
      !childDob ||
      !selectedProgramId ||
      !emergencyName.trim() ||
      !emergencyPhone.trim()
    ) {
      setStatus("error");
      return;
    }

    if (requireWaiver && !waiverAccepted) {
      setStatus("error");
      return;
    }

    const formData = {
      parentName,
      parentEmail,
      parentPhone,
      childName,
      childDob,
      programId: selectedProgramId,
      medicalInfo,
      emergencyName,
      emergencyPhone,
      waiverAccepted,
    };

    // Log form data for now -- full API integration comes later
    console.log("Registration form submitted:", formData);

    setStatus("success");
  }

  return (
    <div className="grid gap-8 lg:grid-cols-3">
      {/* Main form */}
      <div className="lg:col-span-2">
        <form onSubmit={handleSubmit} className="space-y-8">
          {status === "success" && (
            <div className="flex items-center gap-3 rounded-lg border border-green-200 bg-green-50 p-4 text-green-800">
              <CheckCircle className="h-5 w-5 shrink-0" />
              <p className="text-sm">
                Registration submitted successfully! We will be in touch shortly
                with confirmation details.
              </p>
            </div>
          )}

          {status === "error" && (
            <div className="flex items-center gap-3 rounded-lg border border-red-200 bg-red-50 p-4 text-red-800">
              <AlertCircle className="h-5 w-5 shrink-0" />
              <p className="text-sm">
                Please fill out all required fields before submitting.
              </p>
            </div>
          )}

          {/* Parent Information */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Parent / Guardian Information</h2>
            <Separator />
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2 sm:col-span-2">
                <Label htmlFor="parent-name">
                  Full Name <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="parent-name"
                  type="text"
                  placeholder="Parent or guardian full name"
                  value={parentName}
                  onChange={(e) => setParentName(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="parent-email">
                  Email <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="parent-email"
                  type="email"
                  placeholder="you@example.com"
                  value={parentEmail}
                  onChange={(e) => setParentEmail(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="parent-phone">
                  Phone <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="parent-phone"
                  type="tel"
                  placeholder="(555) 000-0000"
                  value={parentPhone}
                  onChange={(e) => setParentPhone(e.target.value)}
                  required
                />
              </div>
            </div>
          </div>

          {/* Child Information */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Child Information</h2>
            <Separator />
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="child-name">
                  Child&apos;s Name <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="child-name"
                  type="text"
                  placeholder="Child's full name"
                  value={childName}
                  onChange={(e) => setChildName(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="child-dob">
                  Date of Birth <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="child-dob"
                  type="date"
                  value={childDob}
                  onChange={(e) => setChildDob(e.target.value)}
                  required
                />
              </div>
            </div>
          </div>

          {/* Program Selection */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Program Selection</h2>
            <Separator />
            <div className="space-y-2">
              <Label htmlFor="program-select">
                Select a Program <span className="text-red-500">*</span>
              </Label>
              <Select
                value={selectedProgramId}
                onValueChange={setSelectedProgramId}
              >
                <SelectTrigger id="program-select">
                  <SelectValue placeholder="Choose a program..." />
                </SelectTrigger>
                <SelectContent>
                  {programs.map((program) => (
                    <SelectItem key={program.id} value={program.id}>
                      {program.name} &mdash; ${program.price} / {program.priceUnit}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Medical Information */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Medical Information</h2>
            <Separator />
            <div className="space-y-2">
              <Label htmlFor="medical-info">
                Allergies, Conditions, or Special Needs{" "}
                <span className="text-muted-foreground">(optional)</span>
              </Label>
              <Textarea
                id="medical-info"
                placeholder="Please list any allergies, medical conditions, or special needs we should be aware of..."
                rows={4}
                value={medicalInfo}
                onChange={(e) => setMedicalInfo(e.target.value)}
              />
            </div>
          </div>

          {/* Emergency Contact */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Emergency Contact</h2>
            <Separator />
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="emergency-name">
                  Contact Name <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="emergency-name"
                  type="text"
                  placeholder="Emergency contact name"
                  value={emergencyName}
                  onChange={(e) => setEmergencyName(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="emergency-phone">
                  Contact Phone <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="emergency-phone"
                  type="tel"
                  placeholder="(555) 000-0000"
                  value={emergencyPhone}
                  onChange={(e) => setEmergencyPhone(e.target.value)}
                  required
                />
              </div>
            </div>
          </div>

          {/* Waiver */}
          {requireWaiver && (
            <div className="space-y-4">
              <Separator />
              <div className="flex items-start gap-3">
                <input
                  type="checkbox"
                  id="waiver"
                  checked={waiverAccepted}
                  onChange={(e) => setWaiverAccepted(e.target.checked)}
                  className="mt-1 h-4 w-4 rounded border-input accent-primary"
                  required
                />
                <Label htmlFor="waiver" className="text-sm leading-relaxed">
                  I agree to the terms and waiver. I understand and accept the
                  risks associated with athletic activities and authorize
                  emergency medical treatment if necessary.{" "}
                  <span className="text-red-500">*</span>
                </Label>
              </div>
            </div>
          )}

          <Button type="submit" size="xl" className="w-full">
            Complete Registration
          </Button>
        </form>
      </div>

      {/* Sidebar: selected program details */}
      <div className="lg:col-span-1">
        <div className="sticky top-8">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Program Summary</CardTitle>
            </CardHeader>
            <CardContent>
              {selectedProgram ? (
                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold">{selectedProgram.name}</h3>
                    {selectedProgram.featured && (
                      <Badge variant="secondary" className="mt-1">
                        Popular
                      </Badge>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {selectedProgram.description}
                  </p>
                  <Separator />
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <DollarSign className="h-4 w-4 text-muted-foreground" />
                      <span className="text-lg font-bold">
                        ${selectedProgram.price}
                      </span>
                      <span className="text-sm text-muted-foreground">
                        / {selectedProgram.priceUnit}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CalendarDays className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">{selectedProgram.schedule}</span>
                    </div>
                    <div>
                      <Badge variant="outline">
                        Ages {selectedProgram.ageRange}
                      </Badge>
                    </div>
                    {selectedProgram.spotsTotal !== null && (
                      <p className="text-sm text-muted-foreground">
                        {selectedProgram.spotsTotal} spots available
                      </p>
                    )}
                  </div>
                </div>
              ) : (
                <p className="text-sm text-muted-foreground">
                  Select a program above to see its details here.
                </p>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
