import { getConfig } from "@/lib/config";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import ContactForm from "@/components/forms/ContactForm";

export default function ContactPage() {
  const config = getConfig();
  const { business } = config;
  const { location } = business;

  return (
    <div>
      {/* Page Header Banner */}
      <section className="gradient-primary py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl font-bold text-white sm:text-4xl lg:text-5xl">
            Contact Us
          </h1>
          <p className="mt-4 text-lg text-white/80">
            Have a question or want to learn more? We would love to hear from
            you.
          </p>
        </div>
      </section>

      {/* Contact Content */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-3">
            {/* Left: Contact Form */}
            <div className="lg:col-span-2">
              <h2 className="text-2xl font-bold">Send Us a Message</h2>
              <p className="mt-2 text-muted-foreground">
                Fill out the form below and we will get back to you as soon as
                possible.
              </p>
              <div className="mt-8">
                <ContactForm />
              </div>
            </div>

            {/* Right: Business Info Sidebar */}
            <div className="lg:col-span-1">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">
                    {business.name}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Address */}
                  <div className="flex items-start gap-3">
                    <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                    <div>
                      <p className="font-medium">Address</p>
                      <p className="text-sm text-muted-foreground">
                        {location.address}
                        <br />
                        {location.city}, {location.state} {location.zip}
                      </p>
                    </div>
                  </div>

                  <Separator />

                  {/* Phone */}
                  <div className="flex items-start gap-3">
                    <Phone className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                    <div>
                      <p className="font-medium">Phone</p>
                      <p className="text-sm text-muted-foreground">
                        {business.phone}
                      </p>
                    </div>
                  </div>

                  <Separator />

                  {/* Email */}
                  <div className="flex items-start gap-3">
                    <Mail className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                    <div>
                      <p className="font-medium">Email</p>
                      <p className="text-sm text-muted-foreground">
                        {business.email}
                      </p>
                    </div>
                  </div>

                  <Separator />

                  {/* Business Hours */}
                  <div className="flex items-start gap-3">
                    <Clock className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                    <div>
                      <p className="font-medium">Business Hours</p>
                      <div className="mt-1 space-y-1 text-sm text-muted-foreground">
                        {(business.hours || ["Mon - Fri: 9am - 5pm"]).map((line, i) => (
                          <p key={i}>{line}</p>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
