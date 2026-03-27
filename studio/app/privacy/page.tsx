"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Shield, Eye, Lock, Database, Users, Globe } from "lucide-react"
import { useTranslation } from "react-i18next"

export default function PrivacyPolicyPage() {
  const { t } = useTranslation()
  const usageItems = t("privacyPolicy.usageItems", { returnObjects: true }) as string[]
  const sharingItems = t("privacyPolicy.sharingItems", { returnObjects: true }) as string[]
  const rightsItems = t("privacyPolicy.rightsItems", { returnObjects: true }) as string[]

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-12">
        <div className="flex justify-center mb-4">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10">
            <Shield className="h-8 w-8 text-primary" />
          </div>
        </div>
        <h1 className="text-4xl font-bold tracking-tight mb-4">{t("privacyPolicy.title")}</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          {t("privacyPolicy.subtitle")}
        </p>
        <p className="text-sm text-muted-foreground mt-2" suppressHydrationWarning>
          {t("privacyPolicy.lastUpdatedPrefix")} {new Date().toLocaleDateString()}
        </p>
      </div>

      <div className="max-w-4xl mx-auto space-y-8">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Eye className="h-5 w-5 text-primary" />
              {t("privacyPolicy.infoCollect.title")}
            </CardTitle>
            <CardDescription>{t("privacyPolicy.infoCollect.subtitle")}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="font-semibold mb-2">{t("privacyPolicy.infoCollect.urlsTitle")}</h3>
              <p className="text-muted-foreground">
                {t("privacyPolicy.infoCollect.urlsBody")}
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">{t("privacyPolicy.infoCollect.performanceTitle")}</h3>
              <p className="text-muted-foreground">
                {t("privacyPolicy.infoCollect.performanceBody")}
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">{t("privacyPolicy.infoCollect.analyticsTitle")}</h3>
              <p className="text-muted-foreground">
                {t("privacyPolicy.infoCollect.analyticsBody")}
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Database className="h-5 w-5 text-primary" />
              {t("privacyPolicy.usage.title")}
            </CardTitle>
            <CardDescription>{t("privacyPolicy.usage.subtitle")}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <ul className="space-y-2 text-muted-foreground">
              {usageItems.map((item) => (
                <li key={item}>- {item}</li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Lock className="h-5 w-5 text-primary" />
              {t("privacyPolicy.protection.title")}
            </CardTitle>
            <CardDescription>{t("privacyPolicy.protection.subtitle")}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="font-semibold mb-2">{t("privacyPolicy.protection.securityTitle")}</h3>
              <p className="text-muted-foreground">
                {t("privacyPolicy.protection.securityBody")}
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">{t("privacyPolicy.protection.retentionTitle")}</h3>
              <p className="text-muted-foreground">
                {t("privacyPolicy.protection.retentionBody")}
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">{t("privacyPolicy.protection.accessTitle")}</h3>
              <p className="text-muted-foreground">
                {t("privacyPolicy.protection.accessBody")}
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5 text-primary" />
              {t("privacyPolicy.sharing.title")}
            </CardTitle>
            <CardDescription>{t("privacyPolicy.sharing.subtitle")}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-muted-foreground">
              {t("privacyPolicy.sharing.intro")}
            </p>
            <ul className="space-y-2 text-muted-foreground">
              {sharingItems.map((item) => (
                <li key={item}>- {item}</li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Globe className="h-5 w-5 text-primary" />
              {t("privacyPolicy.rights.title")}
            </CardTitle>
            <CardDescription>{t("privacyPolicy.rights.subtitle")}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-muted-foreground">
              {t("privacyPolicy.rights.intro")}
            </p>
            <ul className="space-y-2 text-muted-foreground">
              {rightsItems.map((item) => (
                <li key={item}>- {item}</li>
              ))}
            </ul>
            <p className="text-muted-foreground mt-4">
              {t("privacyPolicy.rights.contactLine")}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>{t("privacyPolicy.contact.title")}</CardTitle>
            <CardDescription>{t("privacyPolicy.contact.subtitle")}</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              {t("privacyPolicy.contact.body")}
            </p>
            <div className="mt-4 space-y-2">
              <p className="text-muted-foreground">{t("privacyPolicy.contact.email")}</p>
              <p className="text-muted-foreground">{t("privacyPolicy.contact.website")}</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
