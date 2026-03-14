"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MessageCircle, Clock } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { PageHero } from "@/components/page-hero";
import { PageLayout } from "@/components/page-layout";

const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL ?? (typeof window !== "undefined" ? "" : "http://localhost:8000");

const VERTICALS = [
  { value: "nonprofits", label: "Nonprofits" },
  { value: "startups", label: "Startups" },
  { value: "smb", label: "SMB" },
  { value: "government", label: "Government" },
  { value: "healthcare", label: "Healthcare" },
  { value: "fintech", label: "Fintech" },
  { value: "education", label: "Education" },
  { value: "other", label: "Other" },
];

const TIME_TO_START = [
  { value: "immediately", label: "Immediately" },
  { value: "30-days", label: "Within 30 days" },
  { value: "90-days", label: "Within 90 days" },
  { value: "6-months", label: "Within 6 months" },
  { value: "exploring", label: "Exploring options" },
];

export default function ContactSalesPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    phone: "",
    role: "",
    vertical: "",
    timeToStart: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const payload = {
        name: formData.name,
        email: formData.email,
        company: formData.company,
        phone: formData.phone,
        service: "contact-sales",
        message: [
          `[Contact Sales]`,
          formData.role && `Role: ${formData.role}`,
          formData.vertical && `Vertical: ${VERTICALS.find((v) => v.value === formData.vertical)?.label ?? formData.vertical}`,
          formData.timeToStart && `Time to start: ${TIME_TO_START.find((t) => t.value === formData.timeToStart)?.label ?? formData.timeToStart}`,
          formData.message,
        ]
          .filter(Boolean)
          .join("\n"),
      };

      const response = await fetch(`${API_BASE}/api/consultation/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        toast({
          title: "Message Sent",
          description: "Our sales team will reach out within 24 hours.",
        });
        setFormData({
          name: "",
          email: "",
          company: "",
          phone: "",
          role: "",
          vertical: "",
          timeToStart: "",
          message: "",
        });
      } else {
        throw new Error(result.error || "Failed to submit");
      }
    } catch {
      toast({
        title: "Error",
        description: "Failed to send message. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <PageLayout>
      <PageHero
        badge="Contact Sales"
        title="Talk to Our Sales Team"
        subtitle="Get in touch to discuss how Opticini can support your compliance and operational needs."
      />

      <section className="pt-16 mt-12 py-12 px-4" style={{ background: "var(--rd-bg-white)" }}>
        <div className="max-w-2xl mx-auto">
          <div className="mb-10">
            <h2 className="text-2xl font-bold mb-2" style={{ color: "var(--rd-text-heading)", fontFamily: "var(--rd-font-heading)" }}>
              Tell us about your project
            </h2>
            <p className="text-base" style={{ color: "var(--rd-text-secondary)" }}>
              Share your details and we'll connect you with the right person to discuss pricing, implementation, and how Opticini fits your organization.
            </p>
          </div>

          <div
            className="rounded-[18px] border-[1.5px] p-8"
            style={{ borderColor: "var(--rd-border-light)", background: "var(--rd-bg-subtle)" }}
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="name">Full Name *</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                    required
                    className="mt-1 rounded-lg border-[1.5px]"
                    style={{ borderColor: "var(--rd-border-light)" }}
                  />
                </div>
                <div>
                  <Label htmlFor="email">Email *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    required
                    className="mt-1 rounded-lg border-[1.5px]"
                    style={{ borderColor: "var(--rd-border-light)" }}
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="company">Company / Organization *</Label>
                  <Input
                    id="company"
                    value={formData.company}
                    onChange={(e) => handleInputChange("company", e.target.value)}
                    required
                    className="mt-1 rounded-lg border-[1.5px]"
                    style={{ borderColor: "var(--rd-border-light)" }}
                  />
                </div>
                <div>
                  <Label htmlFor="phone">Phone</Label>
                  <Input
                    id="phone"
                    value={formData.phone}
                    onChange={(e) => handleInputChange("phone", e.target.value)}
                    className="mt-1 rounded-lg border-[1.5px]"
                    style={{ borderColor: "var(--rd-border-light)" }}
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="role">Your Role</Label>
                <Input
                  id="role"
                  value={formData.role}
                  onChange={(e) => handleInputChange("role", e.target.value)}
                  placeholder="e.g. CISO, Compliance Manager, IT Director"
                  className="mt-1 rounded-lg border-[1.5px]"
                  style={{ borderColor: "var(--rd-border-light)" }}
                />
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="vertical">Industry / Vertical</Label>
                  <Select value={formData.vertical} onValueChange={(v) => handleInputChange("vertical", v)}>
                    <SelectTrigger className="mt-1 rounded-lg border-[1.5px]" style={{ borderColor: "var(--rd-border-light)" }}>
                      <SelectValue placeholder="Select your industry" />
                    </SelectTrigger>
                    <SelectContent>
                      {VERTICALS.map((v) => (
                        <SelectItem key={v.value} value={v.value}>
                          {v.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="timeToStart">When do you plan to start?</Label>
                  <Select value={formData.timeToStart} onValueChange={(v) => handleInputChange("timeToStart", v)}>
                    <SelectTrigger className="mt-1 rounded-lg border-[1.5px]" style={{ borderColor: "var(--rd-border-light)" }}>
                      <SelectValue placeholder="Select timeline" />
                    </SelectTrigger>
                    <SelectContent>
                      {TIME_TO_START.map((t) => (
                        <SelectItem key={t.value} value={t.value}>
                          {t.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <Label htmlFor="message">Tell us about your needs *</Label>
                <Textarea
                  id="message"
                  value={formData.message}
                  onChange={(e) => handleInputChange("message", e.target.value)}
                  required
                  rows={4}
                  placeholder="Describe your compliance challenges, goals, or what you're looking to achieve..."
                  className="mt-1 rounded-lg border-[1.5px] resize-none"
                  style={{ borderColor: "var(--rd-border-light)" }}
                />
              </div>

              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full rounded-lg font-semibold py-6"
                style={{ background: "var(--rd-blue-600)", color: "#fff" }}
              >
                {isSubmitting ? (
                  <>
                    <Clock className="h-5 w-5 mr-2 animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    <MessageCircle className="h-5 w-5 mr-2" />
                    Contact Sales
                  </>
                )}
              </Button>
            </form>
          </div>
        </div>
      </section>

    </PageLayout>
  );
}
