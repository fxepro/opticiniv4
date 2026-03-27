"use client";

import { useState } from "react";
import { useTranslation } from "react-i18next";
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

export default function ContactSalesPage() {
  const { t } = useTranslation();
  const VERTICALS = t("contactSales.verticals", { returnObjects: true }) as { value: string; label: string }[];
  const TIME_TO_START = t("contactSales.timeToStart", { returnObjects: true }) as { value: string; label: string }[];
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
          title: t("contactSales.toastSuccessTitle"),
          description: t("contactSales.toastSuccessDesc"),
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
        title: t("contactSales.toastErrorTitle"),
        description: t("contactSales.toastErrorDesc"),
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <PageLayout>
      <PageHero
        badge={t("contactSales.heroBadge")}
        title={t("contactSales.heroTitle")}
        subtitle={t("contactSales.heroSubtitle")}
      />

      <section className="pt-16 mt-12 py-12 px-4" style={{ background: "var(--rd-bg-white)" }}>
        <div className="max-w-2xl mx-auto">
          <div className="mb-10">
            <h2 className="text-2xl font-bold mb-2" style={{ color: "var(--rd-text-heading)", fontFamily: "var(--rd-font-heading)" }}>
              {t("contactSales.sectionTitle")}
            </h2>
            <p className="text-base" style={{ color: "var(--rd-text-secondary)" }}>
              {t("contactSales.sectionSubtitle")}
            </p>
          </div>

          <div
            className="rounded-[18px] border-[1.5px] p-8"
            style={{ borderColor: "var(--rd-border-light)", background: "var(--rd-bg-subtle)" }}
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="name">{t("contactSales.labelName")}</Label>
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
                  <Label htmlFor="email">{t("contactSales.labelEmail")}</Label>
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
                  <Label htmlFor="company">{t("contactSales.labelCompany")}</Label>
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
                  <Label htmlFor="phone">{t("contactSales.labelPhone")}</Label>
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
                <Label htmlFor="role">{t("contactSales.labelRole")}</Label>
                <Input
                  id="role"
                  value={formData.role}
                  onChange={(e) => handleInputChange("role", e.target.value)}
                  placeholder={t("contactSales.rolePlaceholder")}
                  className="mt-1 rounded-lg border-[1.5px]"
                  style={{ borderColor: "var(--rd-border-light)" }}
                />
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="vertical">{t("contactSales.labelVertical")}</Label>
                  <Select value={formData.vertical} onValueChange={(v) => handleInputChange("vertical", v)}>
                    <SelectTrigger className="mt-1 rounded-lg border-[1.5px]" style={{ borderColor: "var(--rd-border-light)" }}>
                      <SelectValue placeholder={t("contactSales.verticalPlaceholder")} />
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
                  <Label htmlFor="timeToStart">{t("contactSales.labelTimeline")}</Label>
                  <Select value={formData.timeToStart} onValueChange={(v) => handleInputChange("timeToStart", v)}>
                    <SelectTrigger className="mt-1 rounded-lg border-[1.5px]" style={{ borderColor: "var(--rd-border-light)" }}>
                      <SelectValue placeholder={t("contactSales.timelinePlaceholder")} />
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
                <Label htmlFor="message">{t("contactSales.labelMessage")}</Label>
                <Textarea
                  id="message"
                  value={formData.message}
                  onChange={(e) => handleInputChange("message", e.target.value)}
                  required
                  rows={4}
                  placeholder={t("contactSales.messagePlaceholder")}
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
                    {t("contactSales.sending")}
                  </>
                ) : (
                  <>
                    <MessageCircle className="h-5 w-5 mr-2" />
                    {t("contactSales.submit")}
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
