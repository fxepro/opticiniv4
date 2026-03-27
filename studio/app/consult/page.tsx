"use client";

import { useState, useMemo, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  MessageCircle,
  CheckCircle,
  Clock,
  Shield,
  BarChart3,
  FileText,
  Cpu,
  BookOpen,
  Heart,
  Search,
  Users,
  Calendar,
  Phone,
  Mail,
  type LucideIcon,
} from "lucide-react";
import Link from "next/link";
import { useToast } from "@/hooks/use-toast";
import { PageHero } from "@/components/page-hero";
import { PageLayout } from "@/components/page-layout";
import { PUBLIC_PAGES_EN } from "@/lib/i18n/public-pages-en";

const CONSULT_EN = PUBLIC_PAGES_EN.consult;

const API_BASE =
  process.env.NEXT_PUBLIC_API_BASE_URL ??
  (typeof window !== "undefined" ? "" : "http://localhost:8000");

type ConsultServiceI18n = {
  id: string;
  title: string;
  description: string;
  includes: string[];
  closing: string;
};

const SERVICE_ICONS: Record<string, LucideIcon> = {
  "compliance-readiness": Shield,
  "infrastructure-risk": BarChart3,
  "compliance-implementation": FileText,
  "technical-advisory": Cpu,
  "team-training": BookOpen,
  "ongoing-advisory": Heart,
  "full-audit": Search,
};

export default function ConsultPage() {
  const { t, i18n } = useTranslation();
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setHydrated(true);
  }, []);

  const tr = (key: string, fallback: string) => (hydrated ? t(key) : fallback);

  const intro = useMemo(
    () =>
      hydrated
        ? (t("consult.intro", { returnObjects: true }) as string[])
        : CONSULT_EN.intro,
    [t, hydrated, i18n.language]
  );
  const services = useMemo(
    () =>
      hydrated
        ? (t("consult.services", { returnObjects: true }) as ConsultServiceI18n[])
        : (CONSULT_EN.services as unknown as ConsultServiceI18n[]),
    [t, hydrated, i18n.language]
  );
  const partnerBenefits = useMemo(
    () =>
      hydrated
        ? (t("consult.partnerBenefits", { returnObjects: true }) as string[])
        : CONSULT_EN.partnerBenefits,
    [t, hydrated, i18n.language]
  );

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    phone: "",
    service: "",
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
      const response = await fetch(`${API_BASE}/api/consultation/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        toast({
          title: t("consult.toastSuccessTitle"),
          description: t("consult.toastSuccessDesc"),
        });
        setFormData({ name: "", email: "", company: "", phone: "", service: "", message: "" });
      } else {
        throw new Error(result.error || "Failed to submit consultation request");
      }
    } catch {
      toast({
        title: t("consult.toastErrorTitle"),
        description: t("consult.toastErrorDesc"),
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <PageLayout>
      <PageHero
        badge={tr("consult.heroBadge", CONSULT_EN.heroBadge)}
        title={tr("consult.heroTitle", CONSULT_EN.heroTitle)}
        subtitle={tr("consult.heroSubtitle", CONSULT_EN.heroSubtitle)}
      />

      <section className="pt-16 mt-12 py-12 px-4 border-b" style={{ background: "var(--rd-bg-white)", borderColor: "var(--rd-border-light)" }}>
        <div className="max-w-3xl mx-auto text-center">
          {Array.isArray(intro) &&
            intro.map((p, i) => (
              <p
                key={i}
                className={i === 0 ? "text-lg leading-relaxed mb-4" : "text-base leading-relaxed"}
                style={{ color: "var(--rd-text-secondary)" }}
              >
                {p}
              </p>
            ))}
        </div>
      </section>

      <section className="py-16 px-4" style={{ background: "var(--rd-bg-subtle)" }}>
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ color: "var(--rd-text-heading)", fontFamily: "var(--font-sora), sans-serif" }}>
              {tr("consult.servicesHeading", CONSULT_EN.servicesHeading)}
            </h2>
            <p className="text-xl max-w-3xl mx-auto" style={{ color: "var(--rd-text-secondary)" }}>
              {tr("consult.servicesSub", CONSULT_EN.servicesSub)}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {Array.isArray(services) &&
              services.map((service) => {
                const Icon = SERVICE_ICONS[service.id] ?? Shield;
                return (
                  <div
                    key={service.id}
                    className="bg-white border-[1.5px] rounded-[18px] p-8 transition-all hover:border-[#93c5fd] hover:shadow-lg"
                    style={{ borderColor: "var(--rd-border-light)" }}
                  >
                    <div
                      className="w-14 h-14 rounded-xl flex items-center justify-center mb-5"
                      style={{ background: "var(--rd-blue-50)" }}
                    >
                      <Icon className="h-7 w-7" style={{ color: "var(--rd-blue-600)" }} />
                    </div>
                    <h3 className="text-xl font-bold mb-3" style={{ color: "var(--rd-text-heading)", fontFamily: "var(--font-sora), sans-serif" }}>
                      {service.title}
                    </h3>
                    <p className="text-sm mb-5 leading-relaxed" style={{ color: "var(--rd-text-secondary)" }}>
                      {service.description}
                    </p>
                    <p className="text-xs font-bold uppercase tracking-wider mb-3" style={{ color: "var(--rd-blue-600)" }}>
                      {tr("consult.includesLabel", CONSULT_EN.includesLabel)}
                    </p>
                    <ul className="space-y-2 mb-5">
                      {service.includes.map((item, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm" style={{ color: "var(--rd-text-secondary)" }}>
                          <CheckCircle className="h-4 w-4 mt-0.5 shrink-0" style={{ color: "var(--rd-blue-600)" }} />
                          {item}
                        </li>
                      ))}
                    </ul>
                    <p className="text-sm leading-relaxed" style={{ color: "var(--rd-text-secondary)" }}>
                      {service.closing}
                    </p>
                  </div>
                );
              })}
          </div>
        </div>
      </section>

      <section className="py-16 px-4" style={{ background: "var(--rd-bg-white)" }}>
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center" style={{ color: "var(--rd-text-heading)", fontFamily: "var(--font-sora), sans-serif" }}>
            {tr("consult.partnerTitle", CONSULT_EN.partnerTitle)}
          </h2>
          <p className="text-lg mb-8 text-center leading-relaxed" style={{ color: "var(--rd-text-secondary)" }}>
            {tr("consult.partnerBody", CONSULT_EN.partnerBody)}
          </p>
          <p className="text-sm font-bold uppercase tracking-wider mb-4 text-center" style={{ color: "var(--rd-blue-600)" }}>
            {tr("consult.partnerBenefitsLabel", CONSULT_EN.partnerBenefitsLabel)}
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            {Array.isArray(partnerBenefits) &&
              partnerBenefits.map((item) => (
                <div
                  key={item}
                  className="px-5 py-3 rounded-xl border-[1.5px]"
                  style={{ borderColor: "var(--rd-border-light)", background: "var(--rd-bg-subtle)", color: "var(--rd-text-heading)" }}
                >
                  {item}
                </div>
              ))}
          </div>
        </div>
      </section>

      <section id="schedule" className="py-16 px-4 scroll-mt-24" style={{ background: "var(--rd-bg-subtle)" }}>
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ color: "var(--rd-text-heading)", fontFamily: "var(--font-sora), sans-serif" }}>
              {tr("consult.requestTitle", CONSULT_EN.requestTitle)}
            </h2>
            <p className="text-xl" style={{ color: "var(--rd-text-secondary)" }}>
              {tr("consult.requestSub", CONSULT_EN.requestSub)}
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            <div
              className="bg-white border-[1.5px] rounded-[18px] p-8"
              style={{ borderColor: "var(--rd-border-light)" }}
            >
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="name">{tr("consult.labelName", CONSULT_EN.labelName)}</Label>
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
                    <Label htmlFor="email">{tr("consult.labelEmail", CONSULT_EN.labelEmail)}</Label>
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
                    <Label htmlFor="company">{tr("consult.labelCompany", CONSULT_EN.labelCompany)}</Label>
                    <Input
                      id="company"
                      value={formData.company}
                      onChange={(e) => handleInputChange("company", e.target.value)}
                      className="mt-1 rounded-lg border-[1.5px]"
                      style={{ borderColor: "var(--rd-border-light)" }}
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone">{tr("consult.labelPhone", CONSULT_EN.labelPhone)}</Label>
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
                  <Label htmlFor="service">{tr("consult.labelService", CONSULT_EN.labelService)}</Label>
                  <Select value={formData.service} onValueChange={(v) => handleInputChange("service", v)}>
                    <SelectTrigger className="mt-1 rounded-lg border-[1.5px]" style={{ borderColor: "var(--rd-border-light)" }}>
                      <SelectValue placeholder={tr("consult.servicePlaceholder", CONSULT_EN.servicePlaceholder)} />
                    </SelectTrigger>
                    <SelectContent>
                      {Array.isArray(services) &&
                        services.map((s) => (
                          <SelectItem key={s.id} value={s.id}>
                            {s.title}
                          </SelectItem>
                        ))}
                      <SelectItem value="custom">{tr("consult.serviceCustom", CONSULT_EN.serviceCustom)}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="message">{tr("consult.labelMessage", CONSULT_EN.labelMessage)}</Label>
                  <Textarea
                    id="message"
                    value={formData.message}
                    onChange={(e) => handleInputChange("message", e.target.value)}
                    required
                    rows={4}
                    placeholder={tr("consult.messagePlaceholder", CONSULT_EN.messagePlaceholder)}
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
                      {tr("consult.submitting", CONSULT_EN.submitting)}
                    </>
                  ) : (
                    <>
                      <MessageCircle className="h-5 w-5 mr-2" />
                      {tr("consult.submitScheduling", CONSULT_EN.submitScheduling)}
                    </>
                  )}
                </Button>
              </form>
            </div>

            <div
              className="bg-white border-[1.5px] rounded-[18px] p-8 lg:sticky lg:top-24"
              style={{ borderColor: "var(--rd-border-light)" }}
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ background: "var(--rd-blue-50)" }}>
                  <Calendar className="h-6 w-6" style={{ color: "var(--rd-blue-600)" }} />
                </div>
                <div>
                  <h3 className="font-bold" style={{ color: "var(--rd-text-heading)", fontFamily: "var(--font-sora), sans-serif" }}>
                    {tr("consult.sidebarTitle", CONSULT_EN.sidebarTitle)}
                  </h3>
                  <p className="text-sm" style={{ color: "var(--rd-text-secondary)" }}>
                    {tr("consult.sidebarSubtitle", CONSULT_EN.sidebarSubtitle)}
                  </p>
                </div>
              </div>
              <p className="text-sm mb-6 leading-relaxed" style={{ color: "var(--rd-text-secondary)" }}>
                {tr("consult.sidebarBlurb", CONSULT_EN.sidebarBlurb)}
              </p>
              <div className="space-y-3 mb-6">
                <div className="flex justify-between p-3 rounded-lg text-sm" style={{ background: "var(--rd-bg-subtle)" }}>
                  <span style={{ color: "var(--rd-text-secondary)" }}>{tr("consult.hoursWeekdayLabel", CONSULT_EN.hoursWeekdayLabel)}</span>
                  <span className="font-medium" style={{ color: "var(--rd-blue-600)" }}>{tr("consult.hoursWeekday", CONSULT_EN.hoursWeekday)}</span>
                </div>
                <div className="flex justify-between p-3 rounded-lg text-sm" style={{ background: "var(--rd-bg-subtle)" }}>
                  <span style={{ color: "var(--rd-text-secondary)" }}>{tr("consult.hoursSatLabel", CONSULT_EN.hoursSatLabel)}</span>
                  <span className="font-medium" style={{ color: "var(--rd-blue-600)" }}>{tr("consult.hoursSat", CONSULT_EN.hoursSat)}</span>
                </div>
              </div>
              <div className="pt-6 border-t" style={{ borderColor: "var(--rd-border-light)" }}>
                <h4 className="font-semibold mb-3" style={{ color: "var(--rd-text-heading)", fontFamily: "var(--font-sora), sans-serif" }}>
                  {tr("consult.quickContact", CONSULT_EN.quickContact)}
                </h4>
                <div className="space-y-2 text-sm" style={{ color: "var(--rd-text-secondary)" }}>
                  <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4" />
                    <span>(555) 123-4567</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Mail className="h-4 w-4" />
                    <span>consult@opticini.com</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 px-4 text-white" style={{ background: "linear-gradient(160deg, var(--rd-blue-700), var(--rd-blue-600), var(--rd-blue-500))" }}>
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4" style={{ fontFamily: "var(--font-sora), sans-serif" }}>
            {tr("consult.ctaTitle", CONSULT_EN.ctaTitle)}
          </h2>
          <p className="text-lg text-white/90 mb-8">
            {tr("consult.ctaBody", CONSULT_EN.ctaBody)}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-white rounded-lg font-semibold hover:bg-white/95" style={{ color: "var(--rd-blue-700)" }}>
              <Link href="/request-demo">
                <MessageCircle className="h-5 w-5 mr-2" />
                {tr("consult.requestDemo", CONSULT_EN.requestDemo)}
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-2 border-white/50 text-white hover:bg-white/10 rounded-lg">
              <Link href="/#platform">
                <Users className="h-5 w-5 mr-2" />
                {tr("consult.seePlatform", CONSULT_EN.seePlatform)}
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
