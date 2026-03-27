"use client"

import { useTranslation } from "react-i18next"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Cookie, Settings, Shield, Eye, Database, AlertTriangle } from "lucide-react"
import { CookiePreferencesButton } from "@/components/cookie-preferences-button"

type CookieCard = { title: string; body: string }
type CookieBlock = { title: string; body: string; bullets: string[] }
type CookiesPageI18n = {
  title: string
  subtitle: string
  lastUpdatedPrefix: string
  whatAre: { title: string; subtitle: string; p1: string; p2: string }
  usage: { title: string; subtitle: string; intro: string; cards: CookieCard[] }
  categories: { title: string; subtitle: string; blocks: CookieBlock[] }
  thirdParty: {
    title: string
    subtitle: string
    intro: string
    googleAnalyticsTitle: string
    googleAnalyticsBody: string
    monitoringTitle: string
    monitoringBody: string
    noteLabel: string
    noteBody: string
  }
  manage: {
    title: string
    subtitle: string
    intro: string
    browserTitle: string
    browserBody: string
    consentTitle: string
    consentBody: string
    optOutTitle: string
    optOutBody: string
    importantLabel: string
    importantBody: string
  }
  duration: {
    title: string
    subtitle: string
    sessionTitle: string
    sessionBody: string
    persistentTitle: string
    persistentBody: string
    specificTitle: string
    bullets: string[]
  }
  updates: { title: string; subtitle: string; p1: string; p2: string }
  contact: {
    title: string
    subtitle: string
    body: string
    emailLabel: string
    emailValue: string
    websiteLabel: string
    websiteValue: string
  }
}

const CATEGORY_STYLES = [
  {
    wrapper: "p-4 bg-green-50 border border-green-200 rounded-lg",
    title: "font-semibold text-green-800 mb-2",
    body: "text-sm text-green-700 mb-2",
    list: "text-sm text-green-700 space-y-1",
  },
  {
    wrapper: "p-4 bg-blue-50 border border-blue-200 rounded-lg",
    title: "font-semibold text-blue-800 mb-2",
    body: "text-sm text-blue-700 mb-2",
    list: "text-sm text-blue-700 space-y-1",
  },
  {
    wrapper: "p-4 bg-yellow-50 border border-yellow-200 rounded-lg",
    title: "font-semibold text-yellow-800 mb-2",
    body: "text-sm text-yellow-700 mb-2",
    list: "text-sm text-yellow-700 space-y-1",
  },
] as const

export default function CookiePolicyPage() {
  const { t } = useTranslation()
  const i18nData = t("cookies", { returnObjects: true }) as CookiesPageI18n

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-12">
        <div className="flex justify-center mb-4">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10">
            <Cookie className="h-8 w-8 text-primary" />
          </div>
        </div>
        <h1 className="text-4xl font-bold tracking-tight mb-4">{i18nData.title}</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">{i18nData.subtitle}</p>
        <p className="text-sm text-muted-foreground mt-2">
          {i18nData.lastUpdatedPrefix} {new Date().toLocaleDateString()}
        </p>
        <div className="mt-4">
          <CookiePreferencesButton />
        </div>
      </div>

      <div className="max-w-4xl mx-auto space-y-8">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Cookie className="h-5 w-5 text-primary" />
              {i18nData.whatAre.title}
            </CardTitle>
            <CardDescription>{i18nData.whatAre.subtitle}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-muted-foreground">{i18nData.whatAre.p1}</p>
            <p className="text-muted-foreground">{i18nData.whatAre.p2}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Settings className="h-5 w-5 text-primary" />
              {i18nData.usage.title}
            </CardTitle>
            <CardDescription>{i18nData.usage.subtitle}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-muted-foreground">{i18nData.usage.intro}</p>
            <div className="grid md:grid-cols-2 gap-4 mt-4">
              {i18nData.usage.cards.map((card) => (
                <div key={card.title} className="space-y-3">
                  <h3 className="font-semibold text-foreground">{card.title}</h3>
                  <p className="text-sm text-muted-foreground">{card.body}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Database className="h-5 w-5 text-primary" />
              {i18nData.categories.title}
            </CardTitle>
            <CardDescription>{i18nData.categories.subtitle}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              {i18nData.categories.blocks.map((block, index) => {
                const styles = CATEGORY_STYLES[index] ?? CATEGORY_STYLES[1]
                return (
                  <div key={block.title} className={styles.wrapper}>
                    <h3 className={styles.title}>{block.title}</h3>
                    <p className={styles.body}>{block.body}</p>
                    <ul className={styles.list}>
                      {block.bullets.map((bullet) => (
                        <li key={bullet}>- {bullet}</li>
                      ))}
                    </ul>
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Eye className="h-5 w-5 text-primary" />
              {i18nData.thirdParty.title}
            </CardTitle>
            <CardDescription>{i18nData.thirdParty.subtitle}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-muted-foreground">{i18nData.thirdParty.intro}</p>
            <div className="space-y-4 mt-4">
              <div>
                <h3 className="font-semibold mb-2">{i18nData.thirdParty.googleAnalyticsTitle}</h3>
                <p className="text-muted-foreground text-sm">{i18nData.thirdParty.googleAnalyticsBody}</p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">{i18nData.thirdParty.monitoringTitle}</h3>
                <p className="text-muted-foreground text-sm">{i18nData.thirdParty.monitoringBody}</p>
              </div>
              <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <div className="flex items-center gap-2 text-blue-800">
                  <AlertTriangle className="h-4 w-4" />
                  <span className="font-semibold">{i18nData.thirdParty.noteLabel}</span>
                </div>
                <p className="text-blue-700 text-sm mt-1">{i18nData.thirdParty.noteBody}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-primary" />
              {i18nData.manage.title}
            </CardTitle>
            <CardDescription>{i18nData.manage.subtitle}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-muted-foreground">{i18nData.manage.intro}</p>
            <div className="space-y-4 mt-4">
              <div>
                <h3 className="font-semibold mb-2">{i18nData.manage.browserTitle}</h3>
                <p className="text-muted-foreground text-sm">{i18nData.manage.browserBody}</p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">{i18nData.manage.consentTitle}</h3>
                <p className="text-muted-foreground text-sm">{i18nData.manage.consentBody}</p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">{i18nData.manage.optOutTitle}</h3>
                <p className="text-muted-foreground text-sm">{i18nData.manage.optOutBody}</p>
              </div>
            </div>
            <div className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
              <div className="flex items-center gap-2 text-yellow-800">
                <AlertTriangle className="h-4 w-4" />
                <span className="font-semibold">{i18nData.manage.importantLabel}</span>
              </div>
              <p className="text-yellow-700 text-sm mt-1">{i18nData.manage.importantBody}</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>{i18nData.duration.title}</CardTitle>
            <CardDescription>{i18nData.duration.subtitle}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <h3 className="font-semibold mb-2">{i18nData.duration.sessionTitle}</h3>
                <p className="text-muted-foreground text-sm">{i18nData.duration.sessionBody}</p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">{i18nData.duration.persistentTitle}</h3>
                <p className="text-muted-foreground text-sm">{i18nData.duration.persistentBody}</p>
              </div>
            </div>
            <div className="mt-4">
              <h3 className="font-semibold mb-2">{i18nData.duration.specificTitle}</h3>
              <ul className="text-sm text-muted-foreground space-y-1">
                {i18nData.duration.bullets.map((item) => (
                  <li key={item}>- {item}</li>
                ))}
              </ul>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>{i18nData.updates.title}</CardTitle>
            <CardDescription>{i18nData.updates.subtitle}</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">{i18nData.updates.p1}</p>
            <p className="text-muted-foreground mt-4">{i18nData.updates.p2}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>{i18nData.contact.title}</CardTitle>
            <CardDescription>{i18nData.contact.subtitle}</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">{i18nData.contact.body}</p>
            <div className="mt-4 space-y-2">
              <p className="text-muted-foreground">
                {i18nData.contact.emailLabel} {i18nData.contact.emailValue}
              </p>
              <p className="text-muted-foreground">
                {i18nData.contact.websiteLabel} {i18nData.contact.websiteValue}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
