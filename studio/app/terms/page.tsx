"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { FileText, AlertTriangle, CheckCircle, XCircle, Shield, Users, Globe } from "lucide-react"
import { useTranslation } from "react-i18next"

export default function TermsOfServicePage() {
  const { t } = useTranslation()
  const serviceItems = t("termsOfService.service.items", { returnObjects: true }) as string[]
  const responsibilitiesItems = t("termsOfService.responsibilities.items", { returnObjects: true }) as string[]
  const acceptableUseItems = t("termsOfService.acceptableUse.items", { returnObjects: true }) as string[]
  const liabilityItems = t("termsOfService.liability.items", { returnObjects: true }) as string[]

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-12">
        <div className="flex justify-center mb-4">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10">
            <FileText className="h-8 w-8 text-primary" />
          </div>
        </div>
        <h1 className="text-4xl font-bold tracking-tight mb-4">{t("termsOfService.title")}</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          {t("termsOfService.subtitle")}
        </p>
        <p className="text-sm text-muted-foreground mt-2" suppressHydrationWarning>
          {t("termsOfService.lastUpdatedPrefix")} {new Date().toLocaleDateString()}
        </p>
      </div>

      <div className="max-w-4xl mx-auto space-y-8">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-primary" />
              {t("termsOfService.acceptance.title")}
            </CardTitle>
            <CardDescription>{t("termsOfService.acceptance.subtitle")}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-muted-foreground">
              {t("termsOfService.acceptance.p1")}
            </p>
            <p className="text-muted-foreground">
              {t("termsOfService.acceptance.p2")}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Globe className="h-5 w-5 text-primary" />
              {t("termsOfService.service.title")}
            </CardTitle>
            <CardDescription>{t("termsOfService.service.subtitle")}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-muted-foreground">
              {t("termsOfService.service.intro")}
            </p>
            <ul className="space-y-2 text-muted-foreground">
              {serviceItems.map((item) => (
                <li key={item}>- {item}</li>
              ))}
            </ul>
            <p className="text-muted-foreground mt-4">
              {t("termsOfService.service.outro")}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5 text-primary" />
              {t("termsOfService.responsibilities.title")}
            </CardTitle>
            <CardDescription>{t("termsOfService.responsibilities.subtitle")}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-muted-foreground">
              {t("termsOfService.responsibilities.intro")}
            </p>
            <ul className="space-y-2 text-muted-foreground">
              {responsibilitiesItems.map((item) => (
                <li key={item}>- {item}</li>
              ))}
            </ul>
            <div className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
              <div className="flex items-center gap-2 text-yellow-800">
                <AlertTriangle className="h-4 w-4" />
                <span className="font-semibold">{t("termsOfService.responsibilities.importantLabel")}</span>
              </div>
              <p className="text-yellow-700 text-sm mt-1">
                {t("termsOfService.responsibilities.importantBody")}
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <XCircle className="h-5 w-5 text-destructive" />
              {t("termsOfService.acceptableUse.title")}
            </CardTitle>
            <CardDescription>{t("termsOfService.acceptableUse.subtitle")}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-muted-foreground">
              {t("termsOfService.acceptableUse.intro")}
            </p>
            <ul className="space-y-2 text-muted-foreground">
              {acceptableUseItems.map((item) => (
                <li key={item}>- {item}</li>
              ))}
            </ul>
            <p className="text-muted-foreground mt-4">
              {t("termsOfService.acceptableUse.outro")}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-primary" />
              {t("termsOfService.intellectual.title")}
            </CardTitle>
            <CardDescription>{t("termsOfService.intellectual.subtitle")}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="font-semibold mb-2">{t("termsOfService.intellectual.ourRightsTitle")}</h3>
              <p className="text-muted-foreground">
                {t("termsOfService.intellectual.ourRightsBody")}
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">{t("termsOfService.intellectual.yourRightsTitle")}</h3>
              <p className="text-muted-foreground">
                {t("termsOfService.intellectual.yourRightsBody")}
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">{t("termsOfService.intellectual.thirdPartyTitle")}</h3>
              <p className="text-muted-foreground">
                {t("termsOfService.intellectual.thirdPartyBody")}
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-yellow-600" />
              {t("termsOfService.liability.title")}
            </CardTitle>
            <CardDescription>{t("termsOfService.liability.subtitle")}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-muted-foreground">
              {t("termsOfService.liability.intro")}
            </p>
            <ul className="space-y-2 text-muted-foreground">
              {liabilityItems.map((item) => (
                <li key={item}>- {item}</li>
              ))}
            </ul>
            <p className="text-muted-foreground mt-4">
              {t("termsOfService.liability.outro")}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>{t("termsOfService.termination.title")}</CardTitle>
            <CardDescription>{t("termsOfService.termination.subtitle")}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-muted-foreground">
              {t("termsOfService.termination.p1")}
            </p>
            <p className="text-muted-foreground">
              {t("termsOfService.termination.p2")}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>{t("termsOfService.changes.title")}</CardTitle>
            <CardDescription>{t("termsOfService.changes.subtitle")}</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              {t("termsOfService.changes.p1")}
            </p>
            <p className="text-muted-foreground mt-4">
              {t("termsOfService.changes.p2")}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>{t("termsOfService.contact.title")}</CardTitle>
            <CardDescription>{t("termsOfService.contact.subtitle")}</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              {t("termsOfService.contact.body")}
            </p>
            <div className="mt-4 space-y-2">
              <p className="text-muted-foreground">{t("termsOfService.contact.email")}</p>
              <p className="text-muted-foreground">{t("termsOfService.contact.website")}</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
