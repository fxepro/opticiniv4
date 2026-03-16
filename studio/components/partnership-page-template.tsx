"use client";

import { useState } from "react";
import { CheckCircle, Clock, MessageCircle } from "lucide-react";
import Link from "next/link";
import { PageHero } from "@/components/page-hero";
import { PageLayout } from "@/components/page-layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import type { PartnershipContent, PartnershipSection } from "@/lib/partnerships-data";

const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL ?? (typeof window !== "undefined" ? "" : "http://localhost:8000");

const sectionStyles = {
  prose: "py-16 px-4 border-b",
  bullets: "py-16 px-4 border-b",
  closing: "py-16 px-4",
};

export function PartnershipPageTemplate({ content }: { content: PartnershipContent }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    phone: "",
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
        ...formData,
        service: `partnership-${content.slug}`,
        message: `[${content.title} partnership inquiry]\n\n${formData.message}`,
      };

      const response = await fetch(`${API_BASE}/api/consultation/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        toast({
          title: "Inquiry Submitted",
          description: "We'll get back to you within 24 hours.",
        });
        setFormData({ name: "", email: "", company: "", phone: "", message: "" });
      } else {
        throw new Error(result.error || "Failed to submit inquiry");
      }
    } catch {
      toast({
        title: "Error",
        description: "Failed to submit inquiry. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const showInquiryForm = content.slug !== "affiliates";

  return (
    <PageLayout>
      <PageHero
        badge="Partnerships"
        title={content.title}
        subtitle={content.subtitle}
      />

      {/* Intro */}
      <section className="pt-16 mt-12 py-12 px-4 border-b" style={{ background: "var(--rd-bg-white)", borderColor: "var(--rd-border-light)" }}>
        <div className="max-w-3xl mx-auto">
          {content.intro.map((p, i) => (
            <p key={i} className={`text-base leading-relaxed ${i < content.intro.length - 1 ? "mb-4" : ""}`} style={{ color: "var(--rd-text-secondary)" }}>
              {p}
            </p>
          ))}
        </div>
      </section>

      {/* Sections */}
      {content.sections.map((section, idx) => (
        <SectionBlock key={idx} section={section} idx={idx} />
      ))}

      {/* Inquiry Form (Consultants, Audit Partners, Technology Partners) */}
      {showInquiryForm && (
        <section id="inquiry" className="py-16 px-4 scroll-mt-24" style={{ background: "var(--rd-bg-subtle)" }}>
          <div className="container mx-auto max-w-2xl">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ color: "var(--rd-text-heading)", fontFamily: "var(--rd-font-heading)" }}>
                Get in Touch
              </h2>
              <p className="text-xl" style={{ color: "var(--rd-text-secondary)" }}>
                Interested in partnering with Opticini? Tell us about your organization and we&apos;ll reach out.
              </p>
            </div>

            <div
              className="bg-white border-[1.5px] rounded-[18px] p-8"
              style={{ borderColor: "var(--rd-border-light)" }}
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
                    <Label htmlFor="company">Organization</Label>
                    <Input
                      id="company"
                      value={formData.company}
                      onChange={(e) => handleInputChange("company", e.target.value)}
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
                  <Label htmlFor="message">Tell us about your interest *</Label>
                  <Textarea
                    id="message"
                    value={formData.message}
                    onChange={(e) => handleInputChange("message", e.target.value)}
                    required
                    rows={4}
                    placeholder="Describe your experience, services, or how you'd like to partner with Opticini..."
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
                      Submitting...
                    </>
                  ) : (
                    <>
                      <MessageCircle className="h-5 w-5 mr-2" />
                      Submit Inquiry
                    </>
                  )}
                </Button>
              </form>
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="py-16 px-4 text-white" style={{ background: "linear-gradient(160deg, var(--rd-blue-700), var(--rd-blue-600), var(--rd-blue-500))" }}>
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4" style={{ fontFamily: "var(--rd-font-heading)" }}>
            {content.ctaText}
          </h2>
          <p className="text-lg text-white/90 mb-8">
            Get in touch to learn more about partnering with Opticini.
          </p>
          {showInquiryForm ? (
            <Button asChild size="lg" className="bg-white rounded-lg font-semibold hover:bg-white/95" style={{ color: "var(--rd-blue-700)" }}>
              <Link href="#inquiry">
                {content.ctaText}
              </Link>
            </Button>
          ) : (
            <Button asChild size="lg" className="bg-white rounded-lg font-semibold hover:bg-white/95" style={{ color: "var(--rd-blue-700)" }}>
              <Link href={content.ctaHref}>
                {content.ctaText}
              </Link>
            </Button>
          )}
        </div>
      </section>
    </PageLayout>
  );
}

function SectionBlock({ section, idx }: { section: PartnershipSection; idx: number }) {
  const bg = idx % 2 === 0 ? "var(--rd-bg-white)" : "var(--rd-bg-subtle)";

  if (section.type === "bullets") {
    return (
      <section className={sectionStyles.bullets} style={{ background: bg, borderColor: "var(--rd-border-light)" }}>
        <div className="container mx-auto max-w-3xl px-4">
          <h2 className="text-2xl md:text-3xl font-bold mb-6" style={{ color: "var(--rd-text-heading)", fontFamily: "var(--rd-font-heading)" }}>
            {section.heading}
          </h2>
          <ul className="space-y-3">
            {section.items.map((item, i) => (
              <li key={i} className="flex items-start gap-3 text-base" style={{ color: "var(--rd-text-secondary)" }}>
                <CheckCircle className="h-5 w-5 mt-0.5 shrink-0" style={{ color: "var(--rd-blue-600)" }} />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </section>
    );
  }

  if (section.type === "prose") {
    return (
      <section className={sectionStyles.prose} style={{ background: bg, borderColor: "var(--rd-border-light)" }}>
        <div className="container mx-auto max-w-3xl px-4">
          <h2 className="text-2xl md:text-3xl font-bold mb-6" style={{ color: "var(--rd-text-heading)", fontFamily: "var(--rd-font-heading)" }}>
            {section.heading}
          </h2>
          <div className="space-y-4">
            {section.paragraphs.map((p, i) => (
              <p key={i} className="text-base leading-relaxed" style={{ color: "var(--rd-text-secondary)" }}>
                {p}
              </p>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (section.type === "closing") {
    return (
      <section className={sectionStyles.closing} style={{ background: bg }}>
        <div className="container mx-auto max-w-3xl px-4 text-center">
          <div className="space-y-4">
            {section.paragraphs.map((p, i) => (
              <p key={i} className="text-base leading-relaxed" style={{ color: "var(--rd-text-secondary)" }}>
                {p}
              </p>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return null;
}
