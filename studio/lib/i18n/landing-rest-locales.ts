import type { LandingOverlay } from "./merge-landing"
import {
  ov,
  HOME_EN,
  NAV_EXTRA_EN,
  FOOTER_EXTRA_EN,
} from "./landing-core"

type Home = typeof HOME_EN
type NavEn = typeof NAV_EXTRA_EN
type FooterEn = typeof FOOTER_EXTRA_EN

function cloneHome(): Home {
  return JSON.parse(JSON.stringify(HOME_EN)) as Home
}

function pack(h: Home, n: NavEn, f: FooterEn): LandingOverlay {
  return ov(h, n, f)
}

function cloneFooter(base: FooterEn): FooterEn {
  return { ...base }
}

/* ——— French ——— */
const HOME_FR = cloneHome()
HOME_FR.hero = {
  badge: "Plateforme B2B de conformité d’infrastructure",
  title1: "Visibilité totale.",
  title2: "Confiance totale.",
  subtitle:
    "Une plateforme pour la découverte, les opérations, la sécurité, la conformité, les coûts et les risques — sur infrastructure locale, hybride et cloud.",
  subline:
    "Sachez ce que vous avez · Mesurez les performances · Prouvez la conformité · Réduisez les risques",
  requestDemo: "Demander une démo",
}
HOME_FR.trust.signals = [
  "Prêt SOC 2",
  "ISO 27001",
  "HIPAA",
  "PCI DSS",
  "Avec ou sans agent",
]
HOME_FR.challenge = {
  kicker: "Le défi",
  title: "L’infrastructure moderne est fragmentée",
  body: "Vos outils ne communiquent pas — laissant des failles de sécurité et de conformité invisibles jusqu’au dernier moment.",
  cards: [
    { title: "Outils de supervision", sub: "Ne montrent que des métriques de performance" },
    { title: "Scanners de sécurité", sub: "Ne montrent que des listes de vulnérabilités" },
    { title: "Outils de conformité", sub: "Ne montrent qu’une preuve ponctuelle" },
    { title: "Outils financiers", sub: "Ne montrent que des coûts déconnectés" },
  ],
  alertTitle: "Aucun ne parle aux autres.",
  alertBody:
    "Les équipes assemblent tableaux de bord, captures et feuilles de calcul — pendant que le risque augmente silencieusement.",
}
HOME_FR.solution = {
  kicker: "La solution Opticini",
  title: "Un plan d’insights unifié",
  body: "Opticini remplace des dizaines d’outils déconnectés par une vue continue — mappée sur la santé, la sécurité, la conformité, le coût et le risque en temps réel.",
  labels: [
    { emoji: "🖥️", label: "Infrastructure on-premise" },
    { emoji: "☁️", label: "Environnements cloud et hybrides" },
    { emoji: "🔌", label: "Apps, API et identité" },
  ],
  banner:
    "Tout est mappé sur la santé, la sécurité, la conformité, le coût et le risque — en temps réel.",
}
HOME_FR.platform = {
  ...HOME_FR.platform,
  kicker: "Plateforme",
  title: "10 plans d’insight. Une plateforme.",
  body: "Chaque plan est profondément intégré — un changement dans un domaine se répercute instantanément sur les autres.",
  learnMore: "En savoir plus →",
  planes: [
    { slug: "discovery", emoji: "🔍", title: "Découverte", tagline: "Tout ce qui existe" },
    { slug: "health", emoji: "💓", title: "Santé", tagline: "Ce qui se passe — et ce qui va arriver" },
    { slug: "performance", emoji: "⚡", title: "Performance", tagline: "Mesurer l’essentiel pour les équipes" },
    { slug: "security", emoji: "🔐", title: "Sécurité", tagline: "Voir le risque avant les attaquants" },
    { slug: "configuration", emoji: "⚙️", title: "Configuration", tagline: "Éviter la dérive silencieuse" },
    { slug: "compliance", emoji: "📋", title: "Conformité", tagline: "Toujours prêt pour l’audit" },
    { slug: "evidence", emoji: "📂", title: "Preuves", tagline: "Pas de captures. Pas de tableurs." },
    { slug: "change", emoji: "🔄", title: "Changement", tagline: "Chaque incident commence par un changement" },
    { slug: "cost", emoji: "💰", title: "Coût", tagline: "Visibilité avant optimisation" },
    { slug: "risk", emoji: "⚠️", title: "Risque", tagline: "Toutes les alertes ne se valent pas" },
  ],
}
HOME_FR.audiences = {
  kicker: "Conçu pour les équipes",
  title: "Les bons insights pour chaque partie prenante",
  items: [
    {
      emoji: "📊",
      role: "Exploitation IT & SRE",
      focus:
        "Santé de l’infrastructure, disponibilité et performance en temps réel sur toute votre stack.",
    },
    {
      emoji: "🛡️",
      role: "Équipes sécurité",
      focus:
        "Surveillance continue de l’exposition, détection des mauvaises configurations et réduction de la surface d’attaque.",
    },
    {
      emoji: "📋",
      role: "GRC & conformité",
      focus:
        "Contrôles permanents, collecte automatisée de preuves et rapports prêts pour l’audit.",
    },
    {
      emoji: "💵",
      role: "FinOps & finance",
      focus:
        "Attribution des coûts cloud, gaspillage et optimisation des dépenses d’infrastructure.",
    },
    {
      emoji: "🏢",
      role: "Direction",
      focus:
        "Posture de risque réelle, maturité opérationnelle et contexte métier — pas de bruit de tableaux de bord.",
    },
  ],
}
HOME_FR.comparison = {
  kicker: "Pourquoi Opticini",
  title: "Le dernier outil que vous ajouterez",
  colOld: "Approche traditionnelle",
  colNew: "Avec Opticini",
  rows: [
    { old: "Outils isolés", new: "Plateforme d’insight unifiée" },
    { old: "Alertes réactives", new: "Supervision continue" },
    { old: "Audits ponctuels", new: "Toujours prêt pour l’audit" },
    { old: "Surcharge de données", new: "Scores de risque priorisés" },
    { old: "Collecte manuelle de preuves", new: "Preuve automatisée" },
    { old: "Panique d’audit", new: "Confiance en la conformité" },
  ],
}
HOME_FR.deploy = {
  kicker: "Déploiement",
  title: "Avec votre infrastructure, pas contre elle",
  subtitle: "Avec ou sans agent. Vous choisissez.",
  items: [
    { emoji: "🖥️", label: "On-premise" },
    { emoji: "☁️", label: "Cloud (AWS / GCP / Azure)" },
    { emoji: "🔀", label: "Hybride" },
    { emoji: "📦", label: "Conteneurs & K8s" },
    { emoji: "🔌", label: "API & services" },
    { emoji: "🔑", label: "Identité" },
    { emoji: "🌐", label: "Réseaux" },
  ],
}
HOME_FR.finalCta = {
  title: "De la visibilité à la confiance",
  body: "Opticini ne se contente pas d’afficher des données. Elle montre l’essentiel, pourquoi c’est important et quoi faire ensuite.",
  requestDemo: "Demander une démo",
  footnote: "Sans carte bancaire · Compatible SOC 2 · Prêt entreprise",
}

const NAV_FR: NavEn = {
  allSystemsOperational: "Tous les systèmes opérationnels",
  talkToSales: "Parler aux ventes",
  workspace: "Espace de travail",
}

const FOOTER_FR: FooterEn = {
  ...FOOTER_EXTRA_EN,
  landingCtaTitle: "Prêt à clarifier votre infrastructure ?",
  landingCtaSubtitle:
    "Rejoignez les équipes qui unifient visibilité, conformité et risque avec Opticini.",
  requestDemo: "Demander une démo",
  brandTagline:
    "Une plateforme pour la découverte, les opérations, la sécurité, la conformité, les coûts et les risques.",
  copyrightLine: "© 2025 Opticini. Tous droits réservés.",
  colPlatform: "Plateforme",
  colCompany: "Entreprise",
  colPartnerships: "Partenariats",
  colVerticals: "Verticaux",
  colFrameworks: "Référentiels",
  linkAbout: "À propos",
  linkBlog: "Blog",
  linkRequestDemo: "Demander une démo",
  linkContactSales: "Contacter les ventes",
  linkAffiliates: "Affiliés",
  linkConsultants: "Consultants",
  linkAuditPartners: "Partenaires d’audit",
  linkTechnologyPartners: "Partenaires technologiques",
  platformDiscovery: "Découverte",
  platformHealth: "Santé",
  platformPerformance: "Performance",
  platformSecurity: "Sécurité",
  platformConfiguration: "Configuration",
  platformCompliance: "Conformité",
  platformEvidence: "Preuves",
  platformChange: "Changement",
  platformCost: "Coût",
  platformRisk: "Risque",
  verticalNonprofits: "Associations",
  verticalStartups: "Startups",
  verticalSMB: "PME",
  verticalGovernment: "Secteur public",
  verticalHealthcare: "Santé",
  verticalFintech: "Fintech",
  verticalEducation: "Éducation",
  fwHipaaRule: "Règle de sécurité HIPAA",
  fwNistCsf: "Cybersécurité NIST",
  fwCis: "CIS Critical Security",
}

/* German */
const HOME_DE = cloneHome()
HOME_DE.hero = {
  badge: "B2B-Infrastruktur-Compliance-Plattform",
  title1: "Volle Transparenz.",
  title2: "Volles Vertrauen.",
  subtitle:
    "Eine Plattform für Discovery, Betrieb, Sicherheit, Compliance, Kosten und Risiko — lokal, hybrid und in der Cloud.",
  subline:
    "Wissen, was Sie haben · Leistung messen · Compliance nachweisen · Risiko senken",
  requestDemo: "Demo anfragen",
}
HOME_DE.trust.signals = [
  "SOC 2 bereit",
  "ISO 27001",
  "HIPAA",
  "PCI DSS",
  "Mit oder ohne Agent",
]
HOME_DE.challenge = {
  kicker: "Die Herausforderung",
  title: "Moderne Infrastruktur ist fragmentiert",
  body: "Ihre Tools sprechen nicht miteinander — Sicherheits- und Compliance-Lücken bleiben unsichtbar, bis es zu spät ist.",
  cards: [
    { title: "Monitoring-Tools", sub: "Zeigen nur Leistungsmetriken" },
    { title: "Security-Scanner", sub: "Zeigen nur Schwachstellenlisten" },
    { title: "Compliance-Tools", sub: "Zeigen nur punktuelle Nachweise" },
    { title: "Finanz-Tools", sub: "Zeigen nur getrennte Kostendaten" },
  ],
  alertTitle: "Keines spricht mit dem anderen.",
  alertBody:
    "Teams flicken Dashboards, Screenshots und Tabellen zusammen — während das Risiko still wächst.",
}
HOME_DE.solution = {
  kicker: "Die Opticini-Lösung",
  title: "Eine einheitliche Insight-Ebene",
  body: "Opticini ersetzt Dutzende getrennte Tools durch eine durchgängige Sicht — gemappt auf Gesundheit, Sicherheit, Compliance, Kosten und Risiko in Echtzeit.",
  labels: [
    { emoji: "🖥️", label: "On-Premise-Infrastruktur" },
    { emoji: "☁️", label: "Cloud- und Hybridumgebungen" },
    { emoji: "🔌", label: "Apps, APIs und Identität" },
  ],
  banner:
    "Alles gemappt auf Gesundheit, Sicherheit, Compliance, Kosten und Risiko — in Echtzeit.",
}
HOME_DE.platform = {
  ...HOME_DE.platform,
  kicker: "Plattform",
  title: "10 Insight-Ebenen. Eine Plattform.",
  body: "Jede Ebene ist tief integriert — Änderungen in einem Bereich wirken sofort in allen anderen.",
  learnMore: "Mehr erfahren →",
  planes: [
    { slug: "discovery", emoji: "🔍", title: "Entdeckung", tagline: "Alles, was existiert" },
    { slug: "health", emoji: "💓", title: "Gesundheit", tagline: "Status quo — und was kommt" },
    { slug: "performance", emoji: "⚡", title: "Leistung", tagline: "Das Wesentliche für Nutzer und Teams" },
    { slug: "security", emoji: "🔐", title: "Sicherheit", tagline: "Risiko sehen, bevor Angreifer zuschlagen" },
    { slug: "configuration", emoji: "⚙️", title: "Konfiguration", tagline: "Stilles Konfigurationsverfall verhindern" },
    { slug: "compliance", emoji: "📋", title: "Compliance", tagline: "Immer auditbereit" },
    { slug: "evidence", emoji: "📂", title: "Evidenz", tagline: "Keine Screenshots. Keine Tabellen." },
    { slug: "change", emoji: "🔄", title: "Änderung", tagline: "Jeder Vorfall beginnt mit einer Änderung" },
    { slug: "cost", emoji: "💰", title: "Kosten", tagline: "Transparenz vor Optimierung" },
    { slug: "risk", emoji: "⚠️", title: "Risiko", tagline: "Nicht jede Alarmierung ist gleich wichtig" },
  ],
}
HOME_DE.audiences = {
  kicker: "Für Teams gebaut",
  title: "Die richtigen Insights für jeden Stakeholder",
  items: [
    {
      emoji: "📊",
      role: "IT-Betrieb & SRE",
      focus: "Infrastrukturgesundheit, Verfügbarkeit und Performance in Echtzeit über den gesamten Stack.",
    },
    {
      emoji: "🛡️",
      role: "Security-Teams",
      focus: "Kontinuierliche Expositionsüberwachung, Fehlkonfigurationen und Angriffsfläche reduzieren.",
    },
    {
      emoji: "📋",
      role: "GRC & Compliance",
      focus: "Dauerhafte Kontrollen, automatisierte Nachweise und auditfertige Reports.",
    },
    {
      emoji: "💵",
      role: "FinOps & Finance",
      focus: "Cloud-Kostenallokation, Verschwendung erkennen und Infrastrukturausgaben optimieren.",
    },
    {
      emoji: "🏢",
      role: "Führung",
      focus: "Reale Risikoposition, Betriebsbereitschaft und Business-Kontext — kein Dashboard-Rauschen.",
    },
  ],
}
HOME_DE.comparison = {
  kicker: "Warum Opticini",
  title: "Das letzte Tool, das Sie hinzufügen müssen",
  colOld: "Traditioneller Ansatz",
  colNew: "Mit Opticini",
  rows: [
    { old: "Insellösungen", new: "Einheitliche Insight-Plattform" },
    { old: "Reaktive Alarme", new: "Kontinuierliches Monitoring" },
    { old: "Punktuelle Audits", new: "Immer auditbereit" },
    { old: "Datenüberflutung", new: "Priorisierte Risikowerte" },
    { old: "Manuelle Nachweise", new: "Automatisierte Belege" },
    { old: "Audit-Panik", new: "Compliance-Vertrauen" },
  ],
}
HOME_DE.deploy = {
  kicker: "Deployment",
  title: "Mit Ihrer Infrastruktur, nicht dagegen",
  subtitle: "Mit oder ohne Agent. Sie entscheiden.",
  items: [
    { emoji: "🖥️", label: "On-Premise" },
    { emoji: "☁️", label: "Cloud (AWS / GCP / Azure)" },
    { emoji: "🔀", label: "Hybrid" },
    { emoji: "📦", label: "Container & K8s" },
    { emoji: "🔌", label: "APIs & Dienste" },
    { emoji: "🔑", label: "Identitätssysteme" },
    { emoji: "🌐", label: "Netzwerke" },
  ],
}
HOME_DE.finalCta = {
  title: "Von Sichtbarkeit zu Vertrauen",
  body: "Opticini zeigt nicht nur Daten. Sie zeigt, was zählt, warum es zählt und was als Nächstes zu tun ist.",
  requestDemo: "Demo anfragen",
  footnote: "Keine Kreditkarte · SOC 2 · Enterprise-ready",
}

const NAV_DE: NavEn = {
  allSystemsOperational: "Alle Systeme betriebsbereit",
  talkToSales: "Vertrieb kontaktieren",
  workspace: "Workspace",
}

const FOOTER_DE: FooterEn = {
  ...FOOTER_EXTRA_EN,
  landingCtaTitle: "Bereit für Klarheit in Ihrer Infrastruktur?",
  landingCtaSubtitle:
    "Schließen Sie sich Teams an, die mit Opticini Sichtbarkeit, Compliance und Risiko vereinen.",
  requestDemo: "Demo anfragen",
  brandTagline:
    "Eine Plattform für Discovery, Betrieb, Sicherheit, Compliance, Kosten und Risiko.",
  copyrightLine: "© 2025 Opticini. Alle Rechte vorbehalten.",
  colPlatform: "Plattform",
  colCompany: "Unternehmen",
  colPartnerships: "Partnerschaften",
  colVerticals: "Branchen",
  colFrameworks: "Frameworks",
  linkAbout: "Über uns",
  linkBlog: "Blog",
  linkRequestDemo: "Demo anfragen",
  linkContactSales: "Vertrieb kontaktieren",
  linkAffiliates: "Affiliates",
  linkConsultants: "Berater",
  linkAuditPartners: "Audit-Partner",
  linkTechnologyPartners: "Technologie-Partner",
  platformDiscovery: "Discovery",
  platformHealth: "Health",
  platformPerformance: "Performance",
  platformSecurity: "Security",
  platformConfiguration: "Konfiguration",
  platformCompliance: "Compliance",
  platformEvidence: "Evidence",
  platformChange: "Change",
  platformCost: "Kosten",
  platformRisk: "Risiko",
  verticalNonprofits: "Nonprofits",
  verticalStartups: "Startups",
  verticalSMB: "KMU",
  verticalGovernment: "Öffentlicher Sektor",
  verticalHealthcare: "Gesundheitswesen",
  verticalFintech: "Fintech",
  verticalEducation: "Bildung",
  fwHipaaRule: "HIPAA-Sicherheitsregel",
  fwNistCsf: "NIST Cybersecurity",
  fwCis: "CIS Critical Security",
}

/* Italian / Portuguese / Russian: use clone + assign key sections via spread from ES-adapted strings — implement compact by reusing ES planes structure with new titles */

function esLikeHome(
  hero: Home["hero"],
  trust: string[],
  challenge: Home["challenge"],
  solution: Home["solution"],
  platformMeta: Pick<Home["platform"], "kicker" | "title" | "body" | "learnMore">,
  planes: Home["platform"]["planes"],
  audiences: Home["audiences"],
  comparison: Home["comparison"],
  deploy: Home["deploy"],
  finalCta: Home["finalCta"]
): Home {
  const h = cloneHome()
  h.hero = hero
  h.trust.signals = trust
  h.challenge = challenge
  h.solution = solution
  h.platform = { ...h.platform, ...platformMeta, planes }
  h.audiences = audiences
  h.comparison = comparison
  h.deploy = deploy
  h.finalCta = finalCta
  return h
}

const HOME_IT = esLikeHome(
  {
    badge: "Piattaforma B2B di conformità infrastrutturale",
    title1: "Visibilità completa.",
    title2: "Fiducia totale.",
    subtitle:
      "Una piattaforma per discovery, operazioni, sicurezza, conformità, costi e rischio — su infrastruttura locale, ibrida e cloud.",
    subline:
      "Sapere cosa avete · Misurare le prestazioni · Dimostrare la conformità · Ridurre il rischio",
    requestDemo: "Richiedi demo",
  },
  ["Pronto SOC 2", "ISO 27001", "HIPAA", "PCI DSS", "Con o senza agent"],
  {
    kicker: "La sfida",
    title: "L’infrastruttura moderna è frammentata",
    body: "I vostri strumenti non dialogano — lasciando lacune di sicurezza e conformità invisibili fino a quando è troppo tardi.",
    cards: [
      { title: "Strumenti di monitoraggio", sub: "Mostrano solo metriche di performance" },
      { title: "Scanner di sicurezza", sub: "Mostrano solo elenchi di vulnerabilità" },
      { title: "Strumenti di conformità", sub: "Mostrano solo evidenze puntuali" },
      { title: "Strumenti finanziari", sub: "Mostrano solo costi disconnessi" },
    ],
    alertTitle: "Nessuno parla con gli altri.",
    alertBody:
      "I team assemblano dashboard, screenshot e fogli — mentre il rischio cresce in silenzio.",
  },
  {
    kicker: "La soluzione Opticini",
    title: "Un piano di insight unificato",
    body: "Opticini sostituisce decine di strumenti disconnessi con una vista continua — mappata su salute, sicurezza, conformità, costo e rischio in tempo reale.",
    labels: [
      { emoji: "🖥️", label: "Infrastruttura on-premise" },
      { emoji: "☁️", label: "Ambienti cloud e ibridi" },
      { emoji: "🔌", label: "App, API e identità" },
    ],
    banner:
      "Tutto mappato su salute, sicurezza, conformità, costo e rischio — in tempo reale.",
  },
  {
    kicker: "Piattaforma",
    title: "10 piani di insight. Una piattaforma.",
    body: "Ogni piano è profondamente integrato — un cambiamento in un dominio si riflette istantaneamente negli altri.",
    learnMore: "Scopri di più →",
  },
  [
    { slug: "discovery", emoji: "🔍", title: "Scoperta", tagline: "Tutto ciò che esiste" },
    { slug: "health", emoji: "💓", title: "Salute", tagline: "Cosa succede — e cosa sta per succedere" },
    { slug: "performance", emoji: "⚡", title: "Prestazioni", tagline: "Misurare ciò che conta" },
    { slug: "security", emoji: "🔐", title: "Sicurezza", tagline: "Vedere il rischio prima degli attaccanti" },
    { slug: "configuration", emoji: "⚙️", title: "Configurazione", tagline: "Evitare il decadimento silenzioso" },
    { slug: "compliance", emoji: "📋", title: "Conformità", tagline: "Sempre pronti per l’audit" },
    { slug: "evidence", emoji: "📂", title: "Evidenze", tagline: "Niente screenshot. Niente fogli." },
    { slug: "change", emoji: "🔄", title: "Cambiamento", tagline: "Ogni incidente inizia con un cambiamento" },
    { slug: "cost", emoji: "💰", title: "Costo", tagline: "Visibilità prima dell’ottimizzazione" },
    { slug: "risk", emoji: "⚠️", title: "Rischio", tagline: "Non tutti gli alert sono uguali" },
  ],
  {
    kicker: "Pensato per i team",
    title: "Insight giusti per ogni stakeholder",
    items: [
      {
        emoji: "📊",
        role: "IT Operations & SRE",
        focus:
          "Salute dell’infrastruttura, uptime e visibilità delle prestazioni in tempo reale su tutto lo stack.",
      },
      {
        emoji: "🛡️",
        role: "Team di sicurezza",
        focus:
          "Monitoraggio continuo dell’esposizione, errori di configurazione e riduzione della superficie di attacco.",
      },
      {
        emoji: "📋",
        role: "GRC e conformità",
        focus: "Controlli sempre attivi, raccolta automatizzata di evidenze e report pronti per l’audit.",
      },
      {
        emoji: "💵",
        role: "FinOps e finanza",
        focus: "Attribuzione costi cloud, sprechi e ottimizzazione della spesa infrastrutturale.",
      },
      {
        emoji: "🏢",
        role: "Dirigenza",
        focus: "Postura di rischio reale, prontezza operativa e contesto di business — non rumore da dashboard.",
      },
    ],
  },
  {
    kicker: "Perché Opticini",
    title: "L’ultimo strumento che aggiungerete",
    colOld: "Approccio tradizionale",
    colNew: "Con Opticini",
    rows: [
      { old: "Strumenti isolati", new: "Piattaforma di insight unificata" },
      { old: "Alert reattivi", new: "Monitoraggio continuo" },
      { old: "Audit puntuali", new: "Sempre pronti per l’audit" },
      { old: "Sovraccarico di dati", new: "Punteggi di rischio prioritizzati" },
      { old: "Raccolta manuale di evidenze", new: "Prova automatizzata" },
      { old: "Panico da audit", new: "Fiducia nella conformità" },
    ],
  },
  {
    kicker: "Distribuzione",
    title: "Lavora con la vostra infrastruttura, non contro",
    subtitle: "Con o senza agent. A voi la scelta.",
    items: [
      { emoji: "🖥️", label: "On-premise" },
      { emoji: "☁️", label: "Cloud (AWS / GCP / Azure)" },
      { emoji: "🔀", label: "Ibrido" },
      { emoji: "📦", label: "Container e K8s" },
      { emoji: "🔌", label: "API e servizi" },
      { emoji: "🔑", label: "Sistemi di identità" },
      { emoji: "🌐", label: "Reti" },
    ],
  },
  {
    title: "Dalla visibilità alla fiducia",
    body: "Opticini non mostra solo dati. Mostra cosa conta, perché conta e cosa fare dopo.",
    requestDemo: "Richiedi demo",
    footnote: "Nessuna carta di credito · SOC 2 · Pronto per l’enterprise",
  }
)

const NAV_IT: NavEn = {
  allSystemsOperational: "Tutti i sistemi operativi",
  talkToSales: "Parla con le vendite",
  workspace: "Workspace",
}

const FOOTER_IT: FooterEn = {
  ...FOOTER_EXTRA_EN,
  landingCtaTitle: "Pronti a chiarire la vostra infrastruttura?",
  landingCtaSubtitle:
    "Unitevi ai team che con Opticini uniscono visibilità, conformità e rischio.",
  requestDemo: "Richiedi demo",
  brandTagline:
    "Una piattaforma per discovery, operazioni, sicurezza, conformità, costi e rischio.",
  copyrightLine: "© 2025 Opticini. Tutti i diritti riservati.",
  colPlatform: "Piattaforma",
  colCompany: "Azienda",
  colPartnerships: "Partnership",
  colVerticals: "Verticali",
  colFrameworks: "Framework",
  linkAbout: "Chi siamo",
  linkBlog: "Blog",
  linkRequestDemo: "Richiedi demo",
  linkContactSales: "Contatta vendite",
  linkAffiliates: "Affiliati",
  linkConsultants: "Consulenti",
  linkAuditPartners: "Partner di audit",
  linkTechnologyPartners: "Partner tecnologici",
  platformDiscovery: "Discovery",
  platformHealth: "Salute",
  platformPerformance: "Prestazioni",
  platformSecurity: "Sicurezza",
  platformConfiguration: "Configurazione",
  platformCompliance: "Conformità",
  platformEvidence: "Evidenze",
  platformChange: "Change",
  platformCost: "Costo",
  platformRisk: "Rischio",
  verticalNonprofits: "Non profit",
  verticalStartups: "Startup",
  verticalSMB: "PMI",
  verticalGovernment: "Pubblica amministrazione",
  verticalHealthcare: "Sanità",
  verticalFintech: "Fintech",
  verticalEducation: "Istruzione",
  fwHipaaRule: "HIPAA Security Rule",
  fwNistCsf: "NIST Cybersecurity",
  fwCis: "CIS Critical Security",
}

const HOME_PT = esLikeHome(
  {
    badge: "Plataforma B2B de conformidade de infraestrutura",
    title1: "Visibilidade completa.",
    title2: "Confiança total.",
    subtitle:
      "Uma plataforma para descoberta, operações, segurança, conformidade, custo e risco — em infraestrutura local, híbrida e na nuvem.",
    subline:
      "Saiba o que tem · Saiba o desempenho · Prove conformidade · Reduza o risco",
    requestDemo: "Solicitar demo",
  },
  ["Pronto SOC 2", "ISO 27001", "HIPAA", "PCI DSS", "Com ou sem agente"],
  {
    kicker: "O desafio",
    title: "A infraestrutura moderna está fragmentada",
    body: "Suas ferramentas não conversam — deixando lacunas de segurança e conformidade invisíveis até ser tarde.",
    cards: [
      { title: "Ferramentas de monitoramento", sub: "Mostram só métricas de desempenho" },
      { title: "Scanners de segurança", sub: "Mostram só listas de vulnerabilidades" },
      { title: "Ferramentas de conformidade", sub: "Mostram só evidências pontuais" },
      { title: "Ferramentas financeiras", sub: "Mostram só custos desconectados" },
    ],
    alertTitle: "Nenhuma fala com a outra.",
    alertBody:
      "Equipes juntam dashboards, capturas e planilhas — enquanto o risco cresce em silêncio.",
  },
  {
    kicker: "A solução Opticini",
    title: "Um plano de insight unificado",
    body: "Opticini substitui dezenas de ferramentas desconectadas por uma visão contínua — mapeada para saúde, segurança, conformidade, custo e risco em tempo real.",
    labels: [
      { emoji: "🖥️", label: "Infraestrutura on-premise" },
      { emoji: "☁️", label: "Ambientes cloud e híbridos" },
      { emoji: "🔌", label: "Apps, APIs e identidade" },
    ],
    banner:
      "Tudo mapeado para saúde, segurança, conformidade, custo e risco — em tempo real.",
  },
  {
    kicker: "Plataforma",
    title: "10 planos de insight. Uma plataforma.",
    body: "Cada plano é profundamente integrado — uma mudança em um domínio reflete-se instantaneamente nos outros.",
    learnMore: "Saiba mais →",
  },
  [
    { slug: "discovery", emoji: "🔍", title: "Descoberta", tagline: "Tudo o que existe" },
    { slug: "health", emoji: "💓", title: "Saúde", tagline: "O que está acontecendo — e o que vem aí" },
    { slug: "performance", emoji: "⚡", title: "Desempenho", tagline: "Meça o que importa" },
    { slug: "security", emoji: "🔐", title: "Segurança", tagline: "Veja o risco antes dos atacantes" },
    { slug: "configuration", emoji: "⚙️", title: "Configuração", tagline: "Evite a deterioração silenciosa" },
    { slug: "compliance", emoji: "📋", title: "Conformidade", tagline: "Sempre pronto para auditoria" },
    { slug: "evidence", emoji: "📂", title: "Evidências", tagline: "Sem capturas. Sem planilhas." },
    { slug: "change", emoji: "🔄", title: "Mudança", tagline: "Todo incidente começa com uma mudança" },
    { slug: "cost", emoji: "💰", title: "Custo", tagline: "Visibilidade antes de otimizar" },
    { slug: "risk", emoji: "⚠️", title: "Risco", tagline: "Nem todos os alertas são iguais" },
  ],
  {
    kicker: "Feito para equipes",
    title: "Os insights certos para cada stakeholder",
    items: [
      {
        emoji: "📊",
        role: "Operações de TI e SRE",
        focus:
          "Saúde da infraestrutura, disponibilidade e desempenho em tempo real em todo o stack.",
      },
      {
        emoji: "🛡️",
        role: "Equipes de segurança",
        focus:
          "Monitoramento contínuo de exposição, detecção de misconfiguração e redução da superfície de ataque.",
      },
      {
        emoji: "📋",
        role: "GRC e conformidade",
        focus: "Controles sempre ativos, coleta automatizada de evidências e relatórios prontos para auditoria.",
      },
      {
        emoji: "💵",
        role: "FinOps e finanças",
        focus: "Atribuição de custos em nuvem, desperdício e otimização de gastos de infraestrutura.",
      },
      {
        emoji: "🏢",
        role: "Executivos",
        focus: "Postura de risco real, prontidão operacional e contexto de negócios — não ruído de dashboard.",
      },
    ],
  },
  {
    kicker: "Por que Opticini",
    title: "A última ferramenta que você precisará adicionar",
    colOld: "Abordagem tradicional",
    colNew: "Com Opticini",
    rows: [
      { old: "Ferramentas isoladas", new: "Plataforma de insight unificada" },
      { old: "Alertas reativos", new: "Monitoramento contínuo" },
      { old: "Auditorias pontuais", new: "Sempre pronto para auditoria" },
      { old: "Sobrecarga de dados", new: "Pontuações de risco priorizadas" },
      { old: "Coleta manual de evidências", new: "Prova automatizada" },
      { old: "Pânico de auditoria", new: "Confiança na conformidade" },
    ],
  },
  {
    kicker: "Implantação",
    title: "Funciona com sua infraestrutura, não contra ela",
    subtitle: "Com ou sem agente. Você escolhe.",
    items: [
      { emoji: "🖥️", label: "On-premise" },
      { emoji: "☁️", label: "Nuvem (AWS / GCP / Azure)" },
      { emoji: "🔀", label: "Híbrido" },
      { emoji: "📦", label: "Contêineres e K8s" },
      { emoji: "🔌", label: "APIs e serviços" },
      { emoji: "🔑", label: "Sistemas de identidade" },
      { emoji: "🌐", label: "Redes" },
    ],
  },
  {
    title: "Da visibilidade à confiança",
    body: "Opticini não só mostra dados. Mostra o que importa, por que importa e o que fazer a seguir.",
    requestDemo: "Solicitar demo",
    footnote: "Sem cartão de crédito · SOC 2 · Pronto para empresas",
  }
)

const NAV_PT: NavEn = {
  allSystemsOperational: "Todos os sistemas operacionais",
  talkToSales: "Falar com vendas",
  workspace: "Workspace",
}

const FOOTER_PT: FooterEn = {
  ...FOOTER_EXTRA_EN,
  landingCtaTitle: "Pronto para trazer clareza à sua infraestrutura?",
  landingCtaSubtitle:
    "Junte-se a equipes que unem visibilidade, conformidade e risco com Opticini.",
  requestDemo: "Solicitar demo",
  brandTagline:
    "Uma plataforma para descoberta, operações, segurança, conformidade, custo e risco.",
  copyrightLine: "© 2025 Opticini. Todos os direitos reservados.",
  colPlatform: "Plataforma",
  colCompany: "Empresa",
  colPartnerships: "Parcerias",
  colVerticals: "Verticais",
  colFrameworks: "Frameworks",
  linkAbout: "Sobre",
  linkBlog: "Blog",
  linkRequestDemo: "Solicitar demo",
  linkContactSales: "Contatar vendas",
  linkAffiliates: "Afiliados",
  linkConsultants: "Consultores",
  linkAuditPartners: "Parceiros de auditoria",
  linkTechnologyPartners: "Parceiros de tecnologia",
  platformDiscovery: "Descoberta",
  platformHealth: "Saúde",
  platformPerformance: "Desempenho",
  platformSecurity: "Segurança",
  platformConfiguration: "Configuração",
  platformCompliance: "Conformidade",
  platformEvidence: "Evidências",
  platformChange: "Mudança",
  platformCost: "Custo",
  platformRisk: "Risco",
  verticalNonprofits: "Sem fins lucrativos",
  verticalStartups: "Startups",
  verticalSMB: "PME",
  verticalGovernment: "Governo",
  verticalHealthcare: "Saúde",
  verticalFintech: "Fintech",
  verticalEducation: "Educação",
  fwHipaaRule: "Regra de segurança HIPAA",
  fwNistCsf: "Cibersegurança NIST",
  fwCis: "CIS Critical Security",
}

const HOME_RU = esLikeHome(
  {
    badge: "B2B-платформа соответствия инфраструктуры",
    title1: "Полная видимость.",
    title2: "Полная уверенность.",
    subtitle:
      "Одна платформа для обнаружения, эксплуатации, безопасности, соответствия, затрат и риска — локально, гибридно и в облаке.",
    subline:
      "Знайте, что у вас есть · Знайте, как работает · Докажите соответствие · Снизьте риск",
    requestDemo: "Запросить демо",
  },
  ["Готово к SOC 2", "ISO 27001", "HIPAA", "PCI DSS", "С агентом или без"],
  {
    kicker: "Вызов",
    title: "Современная инфраструктура фрагментирована",
    body: "Ваши инструменты не связаны — пробелы в безопасности и соответствии остаются невидимыми, пока не станет поздно.",
    cards: [
      { title: "Мониторинг", sub: "Только метрики производительности" },
      { title: "Сканеры безопасности", sub: "Только списки уязвимостей" },
      { title: "Инструменты соответствия", sub: "Только разовые доказательства" },
      { title: "Финансовые инструменты", sub: "Только разрозненные затраты" },
    ],
    alertTitle: "Никто не говорит друг с другом.",
    alertBody:
      "Команды склеивают дашборды, скриншоты и таблицы — риск тихо растёт.",
  },
  {
    kicker: "Решение Opticini",
    title: "Единая плоскость инсайтов",
    body: "Opticini заменяет десятки разрозненных инструментов одним непрерывным видом — сопоставленным со здоровьем, безопасностью, соответствием, затратами и риском в реальном времени.",
    labels: [
      { emoji: "🖥️", label: "Локальная инфраструктура" },
      { emoji: "☁️", label: "Облачные и гибридные среды" },
      { emoji: "🔌", label: "Приложения, API и идентификация" },
    ],
    banner:
      "Всё сопоставлено со здоровьем, безопасностью, соответствием, затратами и риском — в реальном времени.",
  },
  {
    kicker: "Платформа",
    title: "10 плоскостей инсайтов. Одна платформа.",
    body: "Каждая плоскость глубоко интегрирована — изменение в одной области мгновенно отражается во всех остальных.",
    learnMore: "Подробнее →",
  },
  [
    { slug: "discovery", emoji: "🔍", title: "Открытие", tagline: "Всё, что существует" },
    { slug: "health", emoji: "💓", title: "Здоровье", tagline: "Что происходит — и что будет дальше" },
    { slug: "performance", emoji: "⚡", title: "Производительность", tagline: "Измеряйте важное" },
    { slug: "security", emoji: "🔐", title: "Безопасность", tagline: "Риск до атакующих" },
    { slug: "configuration", emoji: "⚙️", title: "Конфигурация", tagline: "Без тихого разрушения настроек" },
    { slug: "compliance", emoji: "📋", title: "Соответствие", tagline: "Всегда готовы к аудиту" },
    { slug: "evidence", emoji: "📂", title: "Доказательства", tagline: "Без скриншотов и таблиц" },
    { slug: "change", emoji: "🔄", title: "Изменения", tagline: "Инцидент начинается с изменения" },
    { slug: "cost", emoji: "💰", title: "Затраты", tagline: "Видимость до оптимизации" },
    { slug: "risk", emoji: "⚠️", title: "Риск", tagline: "Не все оповещения равны" },
  ],
  {
    kicker: "Для команд",
    title: "Правильные инсайты для каждой роли",
    items: [
      {
        emoji: "📊",
        role: "IT Ops и SRE",
        focus:
          "Здоровье инфраструктуры, доступность и производительность в реальном времени по всему стеку.",
      },
      {
        emoji: "🛡️",
        role: "Команды безопасности",
        focus:
          "Непрерывный мониторинг экспозиции, ошибок конфигурации и сокращение поверхности атаки.",
      },
      {
        emoji: "📋",
        role: "GRC и соответствие",
        focus: "Постоянный контроль, автоматический сбор доказательств и отчёты для аудита.",
      },
      {
        emoji: "💵",
        role: "FinOps и финансы",
        focus: "Распределение облачных затрат, потери и оптимизация расходов на инфраструктуру.",
      },
      {
        emoji: "🏢",
        role: "Руководство",
        focus: "Реальная позиция по риску, готовность и бизнес-контекст — не шум дашбордов.",
      },
    ],
  },
  {
    kicker: "Почему Opticini",
    title: "Последний инструмент, который вам нужно добавить",
    colOld: "Традиционный подход",
    colNew: "С Opticini",
    rows: [
      { old: "Разрозненные инструменты", new: "Единая платформа инсайтов" },
      { old: "Реактивные оповещения", new: "Непрерывный мониторинг" },
      { old: "Разовые аудиты", new: "Всегда готовы к аудиту" },
      { old: "Перегрузка данных", new: "Приоритизированные оценки риска" },
      { old: "Ручной сбор доказательств", new: "Автоматические доказательства" },
      { old: "Паника аудита", new: "Уверенность в соответствии" },
    ],
  },
  {
    kicker: "Развёртывание",
    title: "С вашей инфраструктурой, а не против неё",
    subtitle: "С агентом или без. Вы выбираете.",
    items: [
      { emoji: "🖥️", label: "On-premise" },
      { emoji: "☁️", label: "Облако (AWS / GCP / Azure)" },
      { emoji: "🔀", label: "Гибрид" },
      { emoji: "📦", label: "Контейнеры и K8s" },
      { emoji: "🔌", label: "API и сервисы" },
      { emoji: "🔑", label: "Системы идентификации" },
      { emoji: "🌐", label: "Сети" },
    ],
  },
  {
    title: "От видимости к уверенности",
    body: "Opticini показывает не только данные. Показывает, что важно, почему это важно и что делать дальше.",
    requestDemo: "Запросить демо",
    footnote: "Без карты · SOC 2 · Готово для enterprise",
  }
)

const NAV_RU: NavEn = {
  allSystemsOperational: "Все системы работают",
  talkToSales: "Связаться с продажами",
  workspace: "Рабочая область",
}

const FOOTER_RU: FooterEn = {
  ...FOOTER_EXTRA_EN,
  landingCtaTitle: "Готовы прояснить свою инфраструктуру?",
  landingCtaSubtitle:
    "Присоединяйтесь к командам, объединяющим видимость, соответствие и риск с Opticini.",
  requestDemo: "Запросить демо",
  brandTagline:
    "Одна платформа для обнаружения, эксплуатации, безопасности, соответствия, затрат и риска.",
  copyrightLine: "© 2025 Opticini. Все права защищены.",
  colPlatform: "Платформа",
  colCompany: "Компания",
  colPartnerships: "Партнёрства",
  colVerticals: "Отрасли",
  colFrameworks: "Стандарты",
  linkAbout: "О нас",
  linkBlog: "Блог",
  linkRequestDemo: "Запросить демо",
  linkContactSales: "Связаться с продажами",
  linkAffiliates: "Партнёры",
  linkConsultants: "Консультанты",
  linkAuditPartners: "Аудиторы-партнёры",
  linkTechnologyPartners: "Технологические партнёры",
  platformDiscovery: "Discovery",
  platformHealth: "Здоровье",
  platformPerformance: "Производительность",
  platformSecurity: "Безопасность",
  platformConfiguration: "Конфигурация",
  platformCompliance: "Соответствие",
  platformEvidence: "Доказательства",
  platformChange: "Изменения",
  platformCost: "Затраты",
  platformRisk: "Риск",
  verticalNonprofits: "НКО",
  verticalStartups: "Стартапы",
  verticalSMB: "МСБ",
  verticalGovernment: "Государство",
  verticalHealthcare: "Здравоохранение",
  verticalFintech: "Финтех",
  verticalEducation: "Образование",
  fwHipaaRule: "Правило безопасности HIPAA",
  fwNistCsf: "Кибербезопасность NIST",
  fwCis: "CIS Critical Security",
}

/* Nordic + CJK + hi/ar/he via esLikeHome compact */
const HOME_SV = esLikeHome(
  {
    badge: "B2B-plattform för infrastrukturefterlevnad",
    title1: "Full synlighet.",
    title2: "Fullt förtroende.",
    subtitle:
      "En plattform för upptäckt, drift, säkerhet, regelefterlevnad, kostnad och risk — lokalt, hybrid och moln.",
    subline: "Vet vad ni har · Se prestanda · Visa regelefterlevnad · Minska risk",
    requestDemo: "Boka demo",
  },
  ["SOC 2-redo", "ISO 27001", "HIPAA", "PCI DSS", "Med eller utan agent"],
  {
    kicker: "Utmaningen",
    title: "Modern infrastruktur är fragmenterad",
    body: "Era verktyg pratar inte med varandra — säkerhets- och regegluckor förblir osynliga tills det är för sent.",
    cards: [
      { title: "Övervakningsverktyg", sub: "Visar bara prestandamått" },
      { title: "Säkerhetsskannrar", sub: "Visar bara sårbarhetslistor" },
      { title: "Regelefterlevnadsverktyg", sub: "Visar bara punktbevis" },
      { title: "Finansverktyg", sub: "Visar bara frånkopplade kostnader" },
    ],
    alertTitle: "Ingen pratar med någon annan.",
    alertBody:
      "Team lappar ihop dashboards, skärmdumpar och kalkylblad — medan risken växer tyst.",
  },
  {
    kicker: "Opticini-lösningen",
    title: "Ett enat insiktsplan",
    body: "Opticini ersätter dussintals frånkopplade verktyg med en sammanhängande vy — mappad till hälsa, säkerhet, regelefterlevnad, kostnad och risk i realtid.",
    labels: [
      { emoji: "🖥️", label: "On-premise-infrastruktur" },
      { emoji: "☁️", label: "Moln- och hybridmiljöer" },
      { emoji: "🔌", label: "Appar, API:er och identitet" },
    ],
    banner: "Allt mappat till hälsa, säkerhet, regelefterlevnad, kostnad och risk — i realtid.",
  },
  {
    kicker: "Plattform",
    title: "10 insiktsplan. En plattform.",
    body: "Varje plan är djupt integrerat — en förändring i ett område syns direkt i alla andra.",
    learnMore: "Läs mer →",
  },
  HOME_EN.platform.planes,
  {
    kicker: "Byggt för team",
    title: "Rätt insikter för varje intressent",
    items: [
      {
        emoji: "📊",
        role: "IT-drift & SRE",
        focus: "Infrastrukturhälsa, tillgänglighet och prestanda i realtid över hela stacken.",
      },
      {
        emoji: "🛡️",
        role: "Säkerhetsteam",
        focus: "Kontinuerlig exponeringsövervakning, felkonfiguration och minskad attackyta.",
      },
      {
        emoji: "📋",
        role: "GRC & regelefterlevnad",
        focus: "Ständiga kontroller, automatiserade bevis och revisionsklara rapporter.",
      },
      {
        emoji: "💵",
        role: "FinOps & ekonomi",
        focus: "Molntillskrivning av kostnader, slöseri och optimering av infrastrukturkostnader.",
      },
      {
        emoji: "🏢",
        role: "Ledning",
        focus: "Verklig riskbild, operativ beredskap och affärskontext — inte dashboardbrus.",
      },
    ],
  },
  {
    kicker: "Varför Opticini",
    title: "Det sista verktyget ni behöver lägga till",
    colOld: "Traditionellt förhållningssätt",
    colNew: "Med Opticini",
    rows: [
      { old: "Isolerade verktyg", new: "Enad insiktsplattform" },
      { old: "Reaktiva larm", new: "Kontinuerlig övervakning" },
      { old: "Punktvisa revisioner", new: "Alltid revisionsklar" },
      { old: "Dataöverflöd", new: "Prioriterade riskpoäng" },
      { old: "Manuell bevisinsamling", new: "Automatiserat bevis" },
      { old: "Revisionspanik", new: "Efterlevnadsförtroende" },
    ],
  },
  {
    kicker: "Distribution",
    title: "Fungerar med er infrastruktur, inte emot den",
    subtitle: "Med eller utan agent. Ni bestämmer.",
    items: [
      { emoji: "🖥️", label: "On-premise" },
      { emoji: "☁️", label: "Cloud (AWS / GCP / Azure)" },
      { emoji: "🔀", label: "Hybrid" },
      { emoji: "📦", label: "Containrar & K8s" },
      { emoji: "🔌", label: "API:er & tjänster" },
      { emoji: "🔑", label: "Identitetssystem" },
      { emoji: "🌐", label: "Nätverk" },
    ],
  },
  {
    title: "Från synlighet till förtroende",
    body: "Opticini visar inte bara data. Den visar vad som betyder något, varför det spelar roll och vad ni gör härnäst.",
    requestDemo: "Boka demo",
    footnote: "Inget kort krävs · SOC 2 · Enterprise-redo",
  }
)

const NAV_SV: NavEn = {
  allSystemsOperational: "Alla system i drift",
  talkToSales: "Prata med sälj",
  workspace: "Workspace",
}

const FOOTER_SV: FooterEn = {
  ...FOOTER_EXTRA_EN,
  landingCtaTitle: "Redo att ge er infrastruktur klarhet?",
  landingCtaSubtitle: "Gå med team som förenar synlighet, regelefterlevnad och risk med Opticini.",
  requestDemo: "Boka demo",
  brandTagline:
    "En plattform för upptäckt, drift, säkerhet, regelefterlevnad, kostnad och risk.",
  copyrightLine: "© 2025 Opticini. Alla rättigheter förbehållna.",
  colPlatform: "Plattform",
  colCompany: "Företag",
  colPartnerships: "Partnerskap",
  colVerticals: "Vertikaler",
  colFrameworks: "Ramverk",
  linkAbout: "Om oss",
  linkBlog: "Blogg",
  linkRequestDemo: "Boka demo",
  linkContactSales: "Kontakta sälj",
  linkAffiliates: "Affiliates",
  linkConsultants: "Konsulter",
  linkAuditPartners: "Revisionspartners",
  linkTechnologyPartners: "Teknikpartners",
  platformDiscovery: "Discovery",
  platformHealth: "Hälsa",
  platformPerformance: "Prestanda",
  platformSecurity: "Säkerhet",
  platformConfiguration: "Konfiguration",
  platformCompliance: "Regelefterlevnad",
  platformEvidence: "Bevis",
  platformChange: "Förändring",
  platformCost: "Kostnad",
  platformRisk: "Risk",
  verticalNonprofits: "Ideella",
  verticalStartups: "Startups",
  verticalSMB: "SMB",
  verticalGovernment: "Offentlig sektor",
  verticalHealthcare: "Hälsovård",
  verticalFintech: "Fintech",
  verticalEducation: "Utbildning",
  fwHipaaRule: "HIPAA-säkerhetsregel",
  fwNistCsf: "NIST cybersäkerhet",
  fwCis: "CIS Critical Security",
}

const HOME_NO = esLikeHome(
  {
    badge: "B2B-plattform for infrastruktursamsvar",
    title1: "Full synlighet.",
    title2: "Full tillit.",
    subtitle:
      "Én plattform for oppdagelse, drift, sikkerhet, samsvar, kostnad og risiko — lokalt, hybrid og sky.",
    subline: "Vet hva dere har · Se ytelse · Vis samsvar · Reduser risiko",
    requestDemo: "Be om demo",
  },
  ["SOC 2-klar", "ISO 27001", "HIPAA", "PCI DSS", "Med eller uten agent"],
  {
    kicker: "Utfordringen",
    title: "Moderne infrastruktur er fragmentert",
    body: "Verktøyene deres snakker ikke sammen — sikkerhets- og samsvarshull forblir usynlige til det er for sent.",
    cards: [
      { title: "Overvåkingsverktøy", sub: "Viser bare ytelsesmetrikker" },
      { title: "Sikkerhetsskannere", sub: "Viser bare sårbarhetslister" },
      { title: "Samsvarsverktøy", sub: "Viser bare punktbevis" },
      { title: "Økonomiverktøy", sub: "Viser bare frakoblede kostnader" },
    ],
    alertTitle: "Ingen snakker med hverandre.",
    alertBody: "Team lapper sammen dashbord, skjermbilder og regneark — mens risikoen vokser stille.",
  },
  {
    kicker: "Opticini-løsningen",
    title: "Ett samlet innsiktsplan",
    body: "Opticini erstatter dusinvis av frakoblede verktøy med én sammenhengende visning — kartlagt til helse, sikkerhet, samsvar, kostnad og risiko i sanntid.",
    labels: [
      { emoji: "🖥️", label: "Lokal infrastruktur" },
      { emoji: "☁️", label: "Sky- og hybridmiljøer" },
      { emoji: "🔌", label: "Apper, API-er og identitet" },
    ],
    banner: "Alt kartlagt til helse, sikkerhet, samsvar, kostnad og risiko — i sanntid.",
  },
  {
    kicker: "Plattform",
    title: "10 innsiktsplan. Én plattform.",
    body: "Hvert plan er dypt integrert — en endring i ett domene vises umiddelbart i alle andre.",
    learnMore: "Les mer →",
  },
  HOME_EN.platform.planes,
  {
    kicker: "Bygget for team",
    title: "Riktig innsikt for hver interessent",
    items: [
      {
        emoji: "📊",
        role: "IT-drift og SRE",
        focus: "Infrastrukturhelse, oppetid og ytelse i sanntid på hele stacken.",
      },
      {
        emoji: "🛡️",
        role: "Sikkerhetsteam",
        focus: "Kontinuerlig eksponeringsovervåking, feilkonfigurasjon og redusert angrepsflate.",
      },
      {
        emoji: "📋",
        role: "GRC og samsvar",
        focus: "Kontinuerlige kontroller, automatisert bevis og revisjonsklare rapporter.",
      },
      {
        emoji: "💵",
        role: "FinOps og økonomi",
        focus: "Skykostnadstilskrivelse, sløsing og optimalisering av infrastrukturkostnader.",
      },
      {
        emoji: "🏢",
        role: "Ledelse",
        focus: "Reell risikoposisjon, operasjonell beredskap og forretningskontekst — ikke dashbordstøy.",
      },
    ],
  },
  {
    kicker: "Hvorfor Opticini",
    title: "Det siste verktøyet dere trenger å legge til",
    colOld: "Tradisjonell tilnærming",
    colNew: "Med Opticini",
    rows: [
      { old: "Siloverktøy", new: "Samlet innsiktsplattform" },
      { old: "Reaktive varsler", new: "Kontinuerlig overvåking" },
      { old: "Punkrevisjoner", new: "Alltid revisjonsklar" },
      { old: "Dataoverlast", new: "Prioriterte risikoscore" },
      { old: "Manuell bevisinnsamling", new: "Automatisert bevis" },
      { old: "Revisjonspanikk", new: "Samsvarstillit" },
    ],
  },
  {
    kicker: "Utrulling",
    title: "Fungerer med infrastrukturen deres, ikke mot den",
    subtitle: "Med eller uten agent. Dere velger.",
    items: [
      { emoji: "🖥️", label: "Lokalt" },
      { emoji: "☁️", label: "Sky (AWS / GCP / Azure)" },
      { emoji: "🔀", label: "Hybrid" },
      { emoji: "📦", label: "Containere og K8s" },
      { emoji: "🔌", label: "API-er og tjenester" },
      { emoji: "🔑", label: "Identitetssystemer" },
      { emoji: "🌐", label: "Nettverk" },
    ],
  },
  {
    title: "Fra synlighet til tillit",
    body: "Opticini viser ikke bare data. Den viser hva som betyr noe, hvorfor det betyr noe og hva dere gjør videre.",
    requestDemo: "Be om demo",
    footnote: "Ikke kort påkrevd · SOC 2 · Enterprise-klar",
  }
)

const NAV_NO: NavEn = {
  allSystemsOperational: "Alle systemer operative",
  talkToSales: "Snakk med salg",
  workspace: "Arbeidsområde",
}

const FOOTER_NO: FooterEn = {
  ...FOOTER_EXTRA_EN,
  landingCtaTitle: "Klar til å gi infrastrukturen klarhet?",
  landingCtaSubtitle: "Bli med team som forener synlighet, samsvar og risiko med Opticini.",
  requestDemo: "Be om demo",
  brandTagline:
    "Én plattform for oppdagelse, drift, sikkerhet, samsvar, kostnad og risiko.",
  copyrightLine: "© 2025 Opticini. Alle rettigheter forbeholdt.",
  colPlatform: "Plattform",
  colCompany: "Selskap",
  colPartnerships: "Partnerskap",
  colVerticals: "Vertikaler",
  colFrameworks: "Rammeverk",
  linkAbout: "Om oss",
  linkBlog: "Blogg",
  linkRequestDemo: "Be om demo",
  linkContactSales: "Kontakt salg",
  linkAffiliates: "Affiliater",
  linkConsultants: "Konsulenter",
  linkAuditPartners: "Revisjonspartnere",
  linkTechnologyPartners: "Teknologipartnere",
  platformDiscovery: "Oppdagelse",
  platformHealth: "Helse",
  platformPerformance: "Ytelse",
  platformSecurity: "Sikkerhet",
  platformConfiguration: "Konfigurasjon",
  platformCompliance: "Samsvar",
  platformEvidence: "Bevis",
  platformChange: "Endring",
  platformCost: "Kostnad",
  platformRisk: "Risiko",
  verticalNonprofits: "Ideelle",
  verticalStartups: "Startups",
  verticalSMB: "SMB",
  verticalGovernment: "Offentlig sektor",
  verticalHealthcare: "Helsevesen",
  verticalFintech: "Fintech",
  verticalEducation: "Utdanning",
  fwHipaaRule: "HIPAA-sikkerhetsregel",
  fwNistCsf: "NIST cybersikkerhet",
  fwCis: "CIS Critical Security",
}

const HOME_DA = esLikeHome(
  {
    badge: "B2B-infrastrukturoverholdelsesplatform",
    title1: "Fuld synlighed.",
    title2: "Fuld tillid.",
    subtitle:
      "Én platform til opdagelse, drift, sikkerhed, overholdelse, omkostning og risiko — lokalt, hybrid og cloud.",
    subline: "Ved hvad I har · Se ydeevne · Dokumenter overholdelse · Reducer risiko",
    requestDemo: "Anmod om demo",
  },
  ["SOC 2-klar", "ISO 27001", "HIPAA", "PCI DSS", "Med eller uden agent"],
  {
    kicker: "Udfordringen",
    title: "Moderne infrastruktur er fragmenteret",
    body: "Jeres værktøjer taler ikke sammen — sikkerheds- og overholdelseshuller forbliver usynlige, indtil det er for sent.",
    cards: [
      { title: "Overvågningsværktøjer", sub: "Viser kun ydelsesmålinger" },
      { title: "Sikkerhedsscanninger", sub: "Viser kun sårbarhedslister" },
      { title: "Overholdelsesværktøjer", sub: "Viser kun punktbevis" },
      { title: "Finansværktøjer", sub: "Viser kun adskilte omkostninger" },
    ],
    alertTitle: "Ingen taler med hinanden.",
    alertBody: "Teams lapper dashboards, skærmbilleder og regneark sammen — mens risikoen vokser stille.",
  },
  {
    kicker: "Opticini-løsningen",
    title: "Ét samlet indsigtsplan",
    body: "Opticini erstatter dusinvis af adskilte værktøjer med ét sammenhængende overblik — kortlagt til sundhed, sikkerhed, overholdelse, omkostning og risiko i realtid.",
    labels: [
      { emoji: "🖥️", label: "On-premise-infrastruktur" },
      { emoji: "☁️", label: "Cloud- og hybridmiljøer" },
      { emoji: "🔌", label: "Apps, API'er og identitet" },
    ],
    banner: "Alt kortlagt til sundhed, sikkerhed, overholdelse, omkostning og risiko — i realtid.",
  },
  {
    kicker: "Platform",
    title: "10 indsigtsplaner. Én platform.",
    body: "Hvert plan er dybt integreret — en ændring i ét domæne vises straks i alle andre.",
    learnMore: "Læs mere →",
  },
  HOME_EN.platform.planes,
  {
    kicker: "Bygget til teams",
    title: "Den rigtige indsigt for hver interessent",
    items: [
      {
        emoji: "📊",
        role: "IT-drift og SRE",
        focus: "Infrastruktursundhed, oppetid og ydeevne i realtid på hele stacken.",
      },
      {
        emoji: "🛡️",
        role: "Sikkerhedsteams",
        focus: "Kontinuerlig eksponeringsovervågning, fejlkonfiguration og mindre angrebsflade.",
      },
      {
        emoji: "📋",
        role: "GRC og overholdelse",
        focus: "Løbende kontroller, automatiserede beviser og revisionsklare rapporter.",
      },
      {
        emoji: "💵",
        role: "FinOps og finans",
        focus: "Cloud-omkostningstilskrivning, spild og optimering af infrastrukturomkostninger.",
      },
      {
        emoji: "🏢",
        role: "Ledelse",
        focus: "Reel risikostilling, operationel beredskab og forretningskontekst — ikke dashboard-støj.",
      },
    ],
  },
  {
    kicker: "Hvorfor Opticini",
    title: "Det sidste værktøj I behøver at tilføje",
    colOld: "Traditionel tilgang",
    colNew: "Med Opticini",
    rows: [
      { old: "Silo-værktøjer", new: "Samlet indsigtsplatform" },
      { old: "Reaktive alarmer", new: "Kontinuerlig overvågning" },
      { old: "Punktrevisioner", new: "Altid revisionsklar" },
      { old: "Dataoverflod", new: "Prioriterede risikoscores" },
      { old: "Manuel bevisindsamling", new: "Automatiseret bevis" },
      { old: "Revisionspanik", new: "Tillid til overholdelse" },
    ],
  },
  {
    kicker: "Udrulning",
    title: "Virker med jeres infrastruktur, ikke imod den",
    subtitle: "Med eller uden agent. I vælger.",
    items: [
      { emoji: "🖥️", label: "On-premise" },
      { emoji: "☁️", label: "Cloud (AWS / GCP / Azure)" },
      { emoji: "🔀", label: "Hybrid" },
      { emoji: "📦", label: "Containere og K8s" },
      { emoji: "🔌", label: "API'er og tjenester" },
      { emoji: "🔑", label: "Identitetssystemer" },
      { emoji: "🌐", label: "Netværk" },
    ],
  },
  {
    title: "Fra synlighed til tillid",
    body: "Opticini viser ikke bare data. Den viser, hvad der betyder noget, hvorfor det betyder noget, og hvad I gør derefter.",
    requestDemo: "Anmod om demo",
    footnote: "Intet kort påkrævet · SOC 2 · Enterprise-klar",
  }
)

const NAV_DA: NavEn = {
  allSystemsOperational: "Alle systemer i drift",
  talkToSales: "Tal med salg",
  workspace: "Workspace",
}

const FOOTER_DA: FooterEn = {
  ...FOOTER_EXTRA_EN,
  landingCtaTitle: "Klar til at give jeres infrastruktur klarhed?",
  landingCtaSubtitle: "Slut jer til teams der forener synlighed, overholdelse og risiko med Opticini.",
  requestDemo: "Anmod om demo",
  brandTagline:
    "Én platform til opdagelse, drift, sikkerhed, overholdelse, omkostning og risiko.",
  copyrightLine: "© 2025 Opticini. Alle rettigheder forbeholdes.",
  colPlatform: "Platform",
  colCompany: "Virksomhed",
  colPartnerships: "Partnerskaber",
  colVerticals: "Vertikaler",
  colFrameworks: "Rammer",
  linkAbout: "Om os",
  linkBlog: "Blog",
  linkRequestDemo: "Anmod om demo",
  linkContactSales: "Kontakt salg",
  linkAffiliates: "Affiliates",
  linkConsultants: "Konsulenter",
  linkAuditPartners: "Revisionspartnere",
  linkTechnologyPartners: "Teknologipartnere",
  platformDiscovery: "Opdagelse",
  platformHealth: "Sundhed",
  platformPerformance: "Ydeevne",
  platformSecurity: "Sikkerhed",
  platformConfiguration: "Konfiguration",
  platformCompliance: "Overholdelse",
  platformEvidence: "Bevis",
  platformChange: "Ændring",
  platformCost: "Omkostning",
  platformRisk: "Risiko",
  verticalNonprofits: "Nonprofit",
  verticalStartups: "Startups",
  verticalSMB: "SMV",
  verticalGovernment: "Offentlig sektor",
  verticalHealthcare: "Sundhed",
  verticalFintech: "Fintech",
  verticalEducation: "Uddannelse",
  fwHipaaRule: "HIPAA-sikkerhedsregel",
  fwNistCsf: "NIST cybersikkerhed",
  fwCis: "CIS Critical Security",
}

const HOME_ZH = esLikeHome(
  {
    badge: "B2B 基础设施合规平台",
    title1: "全面可见。",
    title2: "十足信心。",
    subtitle:
      "一个平台覆盖发现、运维、安全、合规、成本与风险 — 本地、混合云与多云环境。",
    subline: "掌握资产 · 看清性能 · 证明合规 · 降低风险",
    requestDemo: "申请演示",
  },
  ["SOC 2 就绪", "ISO 27001", "HIPAA", "PCI DSS", "有代理或无代理"],
  {
    kicker: "挑战",
    title: "现代基础设施高度分散",
    body: "工具彼此不通 — 安全与合规缺口在爆发前难以看见。",
    cards: [
      { title: "监控工具", sub: "只显示性能指标" },
      { title: "安全扫描", sub: "只列出漏洞" },
      { title: "合规工具", sub: "只给单点证据" },
      { title: "财务工具", sub: "只显示割裂的成本" },
    ],
    alertTitle: "它们互不对话。",
    alertBody: "团队靠仪表盘、截图和表格拼凑 — 风险在静默增长。",
  },
  {
    kicker: "Opticini 方案",
    title: "统一的洞察平面",
    body: "Opticini 用连续视图取代众多割裂工具 — 实时映射健康、安全、合规、成本与风险。",
    labels: [
      { emoji: "🖥️", label: "本地基础设施" },
      { emoji: "☁️", label: "云与混合环境" },
      { emoji: "🔌", label: "应用、API 与身份" },
    ],
    banner: "全部映射到健康、安全、合规、成本与风险 — 实时。",
  },
  { kicker: "平台", title: "十大洞察平面。一个平台。", body: "平面深度集成 — 一处变化即刻反映到全局。", learnMore: "了解更多 →" },
  [
    { slug: "discovery", emoji: "🔍", title: "发现", tagline: "掌握全部资产" },
    { slug: "health", emoji: "💓", title: "健康", tagline: "看清现状与趋势" },
    { slug: "performance", emoji: "⚡", title: "性能", tagline: "衡量对用户与团队重要的指标" },
    { slug: "security", emoji: "🔐", title: "安全", tagline: "先于攻击者看见风险" },
    { slug: "configuration", emoji: "⚙️", title: "配置", tagline: "防止配置悄然腐化" },
    { slug: "compliance", emoji: "📋", title: "合规", tagline: "随时可审计" },
    { slug: "evidence", emoji: "📂", title: "证据", tagline: "告别截图与表格" },
    { slug: "change", emoji: "🔄", title: "变更", tagline: "事故往往始于变更" },
    { slug: "cost", emoji: "💰", title: "成本", tagline: "优化前先看清" },
    { slug: "risk", emoji: "⚠️", title: "风险", tagline: "告警并非同等重要" },
  ],
  {
    kicker: "为团队而设",
    title: "为每位干系人提供合适洞察",
    items: [
      { emoji: "📊", role: "IT 运维与 SRE", focus: "全栈实时基础设施健康、可用性与性能可见性。" },
      { emoji: "🛡️", role: "安全团队", focus: "持续暴露面监控、错误配置检测与攻击面收敛。" },
      { emoji: "📋", role: "GRC 与合规", focus: "持续控制、自动取证与可审计报告。" },
      { emoji: "💵", role: "FinOps 与财务", focus: "云成本分摊、浪费识别与基础设施支出优化。" },
      { emoji: "🏢", role: "管理层", focus: "真实风险态势与业务语境 — 而非仪表盘噪音。" },
    ],
  },
  {
    kicker: "为何选择 Opticini",
    title: "您需要添加的最后一类工具",
    colOld: "传统方式",
    colNew: "使用 Opticini",
    rows: [
      { old: "工具孤岛", new: "统一洞察平台" },
      { old: "被动告警", new: "持续监控" },
      { old: "一次性审计", new: "随时可审计" },
      { old: "数据过载", new: "风险优先级评分" },
      { old: "手工取证", new: "自动化证据" },
      { old: "审计慌乱", new: "合规自信" },
    ],
  },
  {
    kicker: "部署",
    title: "与您的基础设施协同，而非对抗",
    subtitle: "有代理或无代理，由您选择。",
    items: [
      { emoji: "🖥️", label: "本地" },
      { emoji: "☁️", label: "云（AWS / GCP / Azure）" },
      { emoji: "🔀", label: "混合" },
      { emoji: "📦", label: "容器与 K8s" },
      { emoji: "🔌", label: "API 与服务" },
      { emoji: "🔑", label: "身份系统" },
      { emoji: "🌐", label: "网络" },
    ],
  },
  {
    title: "从可见到可信",
    body: "Opticini 不只展示数据，更告诉您何者重要、为何重要以及下一步行动。",
    requestDemo: "申请演示",
    footnote: "无需信用卡 · 支持 SOC 2 · 企业就绪",
  }
)

const NAV_ZH: NavEn = {
  allSystemsOperational: "所有系统运行正常",
  talkToSales: "联系销售",
  workspace: "工作区",
}

const FOOTER_ZH: FooterEn = {
  ...FOOTER_EXTRA_EN,
  landingCtaTitle: "准备好让基础设施更清晰了吗？",
  landingCtaSubtitle: "加入使用 Opticini 统一可见性、合规与风险的团队。",
  requestDemo: "申请演示",
  brandTagline: "一个平台覆盖发现、运维、安全、合规、成本与风险。",
  copyrightLine: "© 2025 Opticini. 保留所有权利。",
  colPlatform: "平台",
  colCompany: "公司",
  colPartnerships: "合作",
  colVerticals: "行业",
  colFrameworks: "框架",
  linkAbout: "关于",
  linkBlog: "博客",
  linkRequestDemo: "申请演示",
  linkContactSales: "联系销售",
  linkAffiliates: "联盟",
  linkConsultants: "顾问",
  linkAuditPartners: "审计伙伴",
  linkTechnologyPartners: "技术伙伴",
  platformDiscovery: "发现",
  platformHealth: "健康",
  platformPerformance: "性能",
  platformSecurity: "安全",
  platformConfiguration: "配置",
  platformCompliance: "合规",
  platformEvidence: "证据",
  platformChange: "变更",
  platformCost: "成本",
  platformRisk: "风险",
  verticalNonprofits: "非营利",
  verticalStartups: "初创",
  verticalSMB: "中小企业",
  verticalGovernment: "政府",
  verticalHealthcare: "医疗",
  verticalFintech: "金融科技",
  verticalEducation: "教育",
  fwHipaaRule: "HIPAA 安全规则",
  fwNistCsf: "NIST 网络安全",
  fwCis: "CIS 关键安全",
}

const HOME_JA = esLikeHome(
  {
    badge: "B2B インフラコンプライアンスプラットフォーム",
    title1: "完全な可視性。",
    title2: "確かな信頼。",
    subtitle:
      "発見、運用、セキュリティ、コンプライアンス、コスト、リスクを一つのプラットフォームで — オンプレ、ハイブリッド、クラウドへ。",
    subline: "保有資産を把握 · 性能を知る · コンプライアンスを証明 · リスクを下げる",
    requestDemo: "デモを依頼",
  },
  ["SOC 2 対応準備", "ISO 27001", "HIPAA", "PCI DSS", "エージェント有無"],
  {
    kicker: "課題",
    title: "現代のインフラは分断されている",
    body: "ツール同士が連携せず — セキュリティとコンプライアンスの隙間は手遅れになるまで見えません。",
    cards: [
      { title: "監視ツール", sub: "性能指標だけ" },
      { title: "セキュリティスキャナ", sub: "脆弱性リストだけ" },
      { title: "コンプライアンスツール", sub: "点の証跡だけ" },
      { title: "財務ツール", sub: "バラバラのコストだけ" },
    ],
    alertTitle: "互いに話しません。",
    alertBody: "チームはダッシュボードやスクショ、表でつなぎ合わせ — リスクは静かに増えます。",
  },
  {
    kicker: "Opticini の解決策",
    title: "統一されたインサイト平面",
    body: "Opticini は多数のバラバラなツールを一つの連続ビューに — 健全性、セキュリティ、コンプライアンス、コスト、リスクをリアルタイムにマッピング。",
    labels: [
      { emoji: "🖥️", label: "オンプレインフラ" },
      { emoji: "☁️", label: "クラウド・ハイブリッド環境" },
      { emoji: "🔌", label: "アプリ、API、アイデンティティ" },
    ],
    banner: "すべてを健全性、セキュリティ、コンプライアンス、コスト、リスクにリアルタイムでマッピング。",
  },
  { kicker: "プラットフォーム", title: "10 のインサイト平面。1 つのプラットフォーム。", body: "各平面は深く統合 — 一領域の変化が即座に全体に反映。", learnMore: "詳しく見る →" },
  [
    { slug: "discovery", emoji: "🔍", title: "ディスカバリー", tagline: "存在するすべてを把握" },
    { slug: "health", emoji: "💓", title: "ヘルス", tagline: "今とこれから" },
    { slug: "performance", emoji: "⚡", title: "パフォーマンス", tagline: "重要なものを測る" },
    { slug: "security", emoji: "🔐", title: "セキュリティ", tagline: "攻撃者より先にリスクを" },
    { slug: "configuration", emoji: "⚙️", title: "設定", tagline: "静かな設定劣化を防ぐ" },
    { slug: "compliance", emoji: "📋", title: "コンプライアンス", tagline: "常に監査対応" },
    { slug: "evidence", emoji: "📂", title: "エビデンス", tagline: "スクショと表にさよなら" },
    { slug: "change", emoji: "🔄", title: "変更", tagline: "インシデントは変更から" },
    { slug: "cost", emoji: "💰", title: "コスト", tagline: "最適化の前に可視化" },
    { slug: "risk", emoji: "⚠️", title: "リスク", tagline: "アラートは一律ではない" },
  ],
  {
    kicker: "チームのために",
    title: "ステークホルダーごとに適切なインサイト",
    items: [
      { emoji: "📊", role: "IT 運用と SRE", focus: "スタック全体のリアルタイムな健全性、稼働率、性能の可視性。" },
      { emoji: "🛡️", role: "セキュリティチーム", focus: "継続的な露出監視、設定ミス検知、攻撃面の縮小。" },
      { emoji: "📋", role: "GRC・コンプライアンス", focus: "常時コントロール、自動証跡収集、監査対応レポート。" },
      { emoji: "💵", role: "FinOps・財務", focus: "クラウドコスト配賦、浪費の特定、インフラ支出の最適化。" },
      { emoji: "🏢", role: "経営", focus: "実リスク姿勢、運用準備、ビジネス文脈 — ダッシュボードノイズではなく。" },
    ],
  },
  {
    kicker: "Opticini を選ぶ理由",
    title: "追加する最後のツールになる",
    colOld: "従来のアプローチ",
    colNew: "Opticini で",
    rows: [
      { old: "サイロ化したツール", new: "統一インサイトプラットフォーム" },
      { old: "反応的アラート", new: "継続監視" },
      { old: "点の監査", new: "常に監査準備完了" },
      { old: "データ過多", new: "優先度付きリスクスコア" },
      { old: "手作業の証跡収集", new: "自動化された証明" },
      { old: "監査パニック", new: "コンプライアンスへの信頼" },
    ],
  },
  {
    kicker: "デプロイ",
    title: "インフラと協働し、対立しない",
    subtitle: "エージェントの有無はお選びください。",
    items: [
      { emoji: "🖥️", label: "オンプレミス" },
      { emoji: "☁️", label: "クラウド（AWS / GCP / Azure）" },
      { emoji: "🔀", label: "ハイブリッド" },
      { emoji: "📦", label: "コンテナと K8s" },
      { emoji: "🔌", label: "API とサービス" },
      { emoji: "🔑", label: "アイデンティティ" },
      { emoji: "🌐", label: "ネットワーク" },
    ],
  },
  {
    title: "可視性から信頼へ",
    body: "Opticini はデータを示すだけではありません。何が重要か、なぜか、次に何をすべきかを示します。",
    requestDemo: "デモを依頼",
    footnote: "クレカ不要 · SOC 2 · エンタープライズ対応",
  }
)

const NAV_JA: NavEn = {
  allSystemsOperational: "全システム正常稼働",
  talkToSales: "営業に相談",
  workspace: "ワークスペース",
}

const FOOTER_JA: FooterEn = {
  ...FOOTER_EXTRA_EN,
  landingCtaTitle: "インフラの見通しを良くしませんか？",
  landingCtaSubtitle: "Opticini で可視性、コンプライアンス、リスクを統合するチームに参加。",
  requestDemo: "デモを依頼",
  brandTagline: "発見、運用、セキュリティ、コンプライアンス、コスト、リスクの一つのプラットフォーム。",
  copyrightLine: "© 2025 Opticini. 無断転載禁止。",
  colPlatform: "プラットフォーム",
  colCompany: "会社",
  colPartnerships: "パートナー",
  colVerticals: "業種",
  colFrameworks: "フレームワーク",
  linkAbout: "概要",
  linkBlog: "ブログ",
  linkRequestDemo: "デモを依頼",
  linkContactSales: "営業に連絡",
  linkAffiliates: "アフィリエイト",
  linkConsultants: "コンサルタント",
  linkAuditPartners: "監査パートナー",
  linkTechnologyPartners: "テクノロジーパートナー",
  platformDiscovery: "ディスカバリー",
  platformHealth: "ヘルス",
  platformPerformance: "パフォーマンス",
  platformSecurity: "セキュリティ",
  platformConfiguration: "設定",
  platformCompliance: "コンプライアンス",
  platformEvidence: "エビデンス",
  platformChange: "変更",
  platformCost: "コスト",
  platformRisk: "リスク",
  verticalNonprofits: "非営利",
  verticalStartups: "スタートアップ",
  verticalSMB: "中小企業",
  verticalGovernment: "政府",
  verticalHealthcare: "ヘルスケア",
  verticalFintech: "フィンテック",
  verticalEducation: "教育",
  fwHipaaRule: "HIPAA セキュリティルール",
  fwNistCsf: "NIST サイバーセキュリティ",
  fwCis: "CIS Critical Security",
}

const HOME_KO = esLikeHome(
  {
    badge: "B2B 인프라 컴플라이언스 플랫폼",
    title1: "완전한 가시성.",
    title2: "완전한 신뢰.",
    subtitle:
      "발견, 운영, 보안, 컴플라이언스, 비용, 리스크를 하나의 플랫폼에서 — 온프레미스, 하이브리드, 클라우드.",
    subline: "자산 파악 · 성능 이해 · 컴플라이언스 입증 · 리스크 감소",
    requestDemo: "데모 요청",
  },
  ["SOC 2 준비", "ISO 27001", "HIPAA", "PCI DSS", "에이전트 유무"],
  {
    kicker: "과제",
    title: "현대 인프라는 파편화되어 있습니다",
    body: "도구들이 서로 연결되지 않아 — 보안·컴플라이언스 공백이 늦게까지 보이지 않습니다.",
    cards: [
      { title: "모니터링 도구", sub: "성능 지표만 표시" },
      { title: "보안 스캐너", sub: "취약점 목록만 표시" },
      { title: "컴플라이언스 도구", sub: "특정 시점 증거만 표시" },
      { title: "재무 도구", sub: "끊긴 비용만 표시" },
    ],
    alertTitle: "서로 대화하지 않습니다.",
    alertBody: "팀은 대시보드·스크린샷·스프레드시트로 이어 붙이고 — 리스크는 조용히 커집니다.",
  },
  {
    kicker: "Opticini 솔루션",
    title: "통합 인사이트 평면",
    body: "Opticini는 수많은 분리 도구를 하나의 연속 뷰로 — 건강, 보안, 컴플라이언스, 비용, 리스크를 실시간 매핑.",
    labels: [
      { emoji: "🖥️", label: "온프레미스 인프라" },
      { emoji: "☁️", label: "클라우드·하이브리드 환경" },
      { emoji: "🔌", label: "앱, API, 아이덴티티" },
    ],
    banner: "모두 건강, 보안, 컴플라이언스, 비용, 리스크에 실시간으로 매핑.",
  },
  { kicker: "플랫폼", title: "10개 인사이트 평면. 하나의 플랫폼.", body: "각 평면은 깊게 통합 — 한 영역의 변화가 즉시 전파됩니다.", learnMore: "더 알아보기 →" },
  [
    { slug: "discovery", emoji: "🔍", title: "디스커버리", tagline: "존재하는 모든 것 파악" },
    { slug: "health", emoji: "💓", title: "헬스", tagline: "지금과 다가올 일" },
    { slug: "performance", emoji: "⚡", title: "퍼포먼스", tagline: "중요한 것 측정" },
    { slug: "security", emoji: "🔐", title: "보안", tagline: "공격자보다 먼저 리스크" },
    { slug: "configuration", emoji: "⚙️", title: "구성", tagline: "구성 드리프트 방지" },
    { slug: "compliance", emoji: "📋", title: "컴플라이언스", tagline: "항상 감사 준비" },
    { slug: "evidence", emoji: "📂", title: "증거", tagline: "스크린샷·스프레드시트 없이" },
    { slug: "change", emoji: "🔄", title: "변경", tagline: "사고는 변경에서 시작" },
    { slug: "cost", emoji: "💰", title: "비용", tagline: "최적화 전 가시성" },
    { slug: "risk", emoji: "⚠️", title: "리스크", tagline: "모든 알림이 같지 않음" },
  ],
  {
    kicker: "팀을 위해",
    title: "이해관계자별 올바른 인사이트",
    items: [
      { emoji: "📊", role: "IT 운영 & SRE", focus: "전체 스택의 실시간 인프라 상태, 가용성, 성능 가시성." },
      { emoji: "🛡️", role: "보안 팀", focus: "지속적 노출 모니터링, 오구성 탐지, 공격 표면 축소." },
      { emoji: "📋", role: "GRC·컴플라이언스", focus: "상시 통제, 자동 증거 수집, 감사 준비 보고서." },
      { emoji: "💵", role: "FinOps·재무", focus: "클라우드 비용 배분, 낭비 식별, 인프라 지출 최적화." },
      { emoji: "🏢", role: "경영진", focus: "실제 리스크 자세, 운영 준비도, 비즈니스 맥락 — 대시보드 노이즈가 아님." },
    ],
  },
  {
    kicker: "Opticini를 선택하는 이유",
    title: "추가할 마지막 도구",
    colOld: "전통적 접근",
    colNew: "Opticini와",
    rows: [
      { old: "도구 사일로", new: "통합 인사이트 플랫폼" },
      { old: "반응형 알림", new: "지속 모니터링" },
      { old: "일회성 감사", new: "항상 감사 준비" },
      { old: "데이터 과부하", new: "우선순위 리스크 점수" },
      { old: "수동 증거 수집", new: "자동화된 증명" },
      { old: "감사 공황", new: "컴플라이언스 자신감" },
    ],
  },
  {
    kicker: "배포",
    title: "인프라와 함께 작동, 맞서지 않음",
    subtitle: "에이전트 유무는 선택입니다.",
    items: [
      { emoji: "🖥️", label: "온프레미스" },
      { emoji: "☁️", label: "클라우드 (AWS / GCP / Azure)" },
      { emoji: "🔀", label: "하이브리드" },
      { emoji: "📦", label: "컨테이너 & K8s" },
      { emoji: "🔌", label: "API & 서비스" },
      { emoji: "🔑", label: "아이덴티티" },
      { emoji: "🌐", label: "네트워크" },
    ],
  },
  {
    title: "가시성에서 신뢰로",
    body: "Opticini는 데이터만 보여주지 않습니다. 무엇이 중요한지, 왜 중요한지, 다음에 무엇을 할지 보여줍니다.",
    requestDemo: "데모 요청",
    footnote: "카드 불필요 · SOC 2 · 엔터프라이즈 준비",
  }
)

const NAV_KO: NavEn = {
  allSystemsOperational: "모든 시스템 정상",
  talkToSales: "영업 문의",
  workspace: "워크스페이스",
}

const FOOTER_KO: FooterEn = {
  ...FOOTER_EXTRA_EN,
  landingCtaTitle: "인프라에 명확함을 더할 준비가 되셨나요?",
  landingCtaSubtitle: "Opticini로 가시성·컴플라이언스·리스크를 통합하는 팀에 합류하세요.",
  requestDemo: "데모 요청",
  brandTagline: "발견, 운영, 보안, 컴플라이언스, 비용, 리스크를 위한 하나의 플랫폼.",
  copyrightLine: "© 2025 Opticini. 모든 권리 보유.",
  colPlatform: "플랫폼",
  colCompany: "회사",
  colPartnerships: "파트너십",
  colVerticals: "수직",
  colFrameworks: "프레임워크",
  linkAbout: "소개",
  linkBlog: "블로그",
  linkRequestDemo: "데모 요청",
  linkContactSales: "영업 문의",
  linkAffiliates: "제휴",
  linkConsultants: "컨설턴트",
  linkAuditPartners: "감사 파트너",
  linkTechnologyPartners: "기술 파트너",
  platformDiscovery: "디스커버리",
  platformHealth: "헬스",
  platformPerformance: "퍼포먼스",
  platformSecurity: "보안",
  platformConfiguration: "구성",
  platformCompliance: "컴플라이언스",
  platformEvidence: "증거",
  platformChange: "변경",
  platformCost: "비용",
  platformRisk: "리스크",
  verticalNonprofits: "비영리",
  verticalStartups: "스타트업",
  verticalSMB: "중소기업",
  verticalGovernment: "정부",
  verticalHealthcare: "의료",
  verticalFintech: "핀테크",
  verticalEducation: "교육",
  fwHipaaRule: "HIPAA 보안 규칙",
  fwNistCsf: "NIST 사이버보안",
  fwCis: "CIS Critical Security",
}

const HOME_HI = esLikeHome(
  {
    badge: "B2B इन्फ्रास्ट्रक्चर अनुपालन प्लेटफ़ॉर्म",
    title1: "पूर्ण दृश्यता।",
    title2: "पूर्ण विश्वास।",
    subtitle:
      "खोज, संचालन, सुरक्षा, अनुपालन, लागत और जोखिम के लिए एक प्लेटफ़ॉर्म — ऑन-प्रिमाइस, हाइब्रिड और क्लाउड।",
    subline: "जानें क्या है · प्रदर्शन समझें · अनुपालन सिद्ध करें · जोखिम घटाएँ",
    requestDemo: "डेमो अनुरोध",
  },
  ["SOC 2 तैयार", "ISO 27001", "HIPAA", "PCI DSS", "एजेंट के साथ या बिना"],
  {
    kicker: "चुनौती",
    title: "आधुनिक इन्फ्रास्ट्रक्चर खंडित है",
    body: "आपके टूल एक-दूसरे से बात नहीं करते — सुरक्षा और अनुपालन अंतराल अदृश्य रहते हैं जब तक देर न हो।",
    cards: [
      { title: "निगरानी टूल", sub: "केवल प्रदर्शन मेट्रिक्स" },
      { title: "सुरक्षा स्कैनर", sub: "केवल कमज़ोरी सूचियाँ" },
      { title: "अनुपालन टूल", sub: "केवल बिंदु-समय साक्ष्य" },
      { title: "वित्त टूल", sub: "केवल अलग लागत डेटा" },
    ],
    alertTitle: "कोई एक-दूसरे से नहीं बोलता।",
    alertBody: "टीमें डैशबोर्ड, स्क्रीनशॉट और स्प्रेडशीट जोड़ती हैं — जोखिम चुपचाप बढ़ता है।",
  },
  {
    kicker: "Opticini समाधान",
    title: "एकीकृत इनसाइट तल",
    body: "Opticini दर्जनों अलग टूल को एक निरंतर दृश्य से बदलता है — स्वास्थ्य, सुरक्षा, अनुपालन, लागत और जोखिम को रियल-टाइम में मैप करता है।",
    labels: [
      { emoji: "🖥️", label: "ऑन-प्रिमाइस इन्फ्रास्ट्रक्चर" },
      { emoji: "☁️", label: "क्लाउड और हाइब्रिड वातावरण" },
      { emoji: "🔌", label: "ऐप, API और पहचान" },
    ],
    banner: "सब कुछ स्वास्थ्य, सुरक्षा, अनुपालन, लागत और जोखिम पर रियल-टाइम में मैप।",
  },
  { kicker: "प्लेटफ़ॉर्म", title: "10 इनसाइट तल। एक प्लेटफ़ॉर्म।", body: "प्रत्येक तल गहराई से एकीकृत — एक डोमेन में बदलाव तुरंत सभी में दिखता है।", learnMore: "और जानें →" },
  HOME_EN.platform.planes,
  {
    kicker: "टीमों के लिए",
    title: "हर हितधारक के लिए सही इनसाइट",
    items: [
      { emoji: "📊", role: "IT संचालन और SRE", focus: "पूरे स्टैक पर रियल-टाइम इन्फ्रास्ट्रक्चर स्वास्थ्य, अपटाइम और प्रदर्शन दृश्यता।" },
      { emoji: "🛡️", role: "सुरक्षा टीमें", focus: "निरंतर एक्सपोज़र निगरानी, गलत कॉन्फ़िगरेशन और हमले की सतह कम करना।" },
      { emoji: "📋", role: "GRC और अनुपालन", focus: "हमेशा-चालू नियंत्रण, स्वचालित साक्ष्य और ऑडिट-तैयार रिपोर्ट।" },
      { emoji: "💵", role: "FinOps और वित्त", focus: "क्लाउड लागत आवंटन, बर्बादी और इन्फ्रास्ट्रक्चर खर्च अनुकूलन।" },
      { emoji: "🏢", role: "कार्यकारी", focus: "वास्तविक जोखिम मुद्रा, परिचालन तत्परता और व्यापार संदर्भ — डैशबोर्ड शोर नहीं।" },
    ],
  },
  {
    kicker: "Opticini क्यों",
    title: "वह अंतिम टूल जो आप जोड़ेंगे",
    colOld: "पारंपरिक दृष्टिकोण",
    colNew: "Opticini के साथ",
    rows: [
      { old: "अलग-थलग टूल", new: "एकीकृत इनसाइट प्लेटफ़ॉर्म" },
      { old: "प्रतिक्रियात्मक अलर्ट", new: "निरंतर निगरानी" },
      { old: "बिंदु-समय ऑडिट", new: "हमेशा ऑडिट-तैयार" },
      { old: "डेटा अधिभार", new: "प्राथमिकताज़ित जोखिम स्कोर" },
      { old: "मैन्युअल साक्ष्य संग्रह", new: "स्वचालित प्रमाण" },
      { old: "ऑडिट घबराहट", new: "अनुपालन विश्वास" },
    ],
  },
  {
    kicker: "तैनाती",
    title: "आपके इन्फ्रास्ट्रक्चर के साथ, उसके विरुद्ध नहीं",
    subtitle: "एजेंट के साथ या बिना। आपकी पसंद।",
    items: [
      { emoji: "🖥️", label: "ऑन-प्रिमाइस" },
      { emoji: "☁️", label: "क्लाउड (AWS / GCP / Azure)" },
      { emoji: "🔀", label: "हाइब्रिड" },
      { emoji: "📦", label: "कंटेनर और K8s" },
      { emoji: "🔌", label: "API और सेवाएँ" },
      { emoji: "🔑", label: "पहचान प्रणाली" },
      { emoji: "🌐", label: "नेटवर्क" },
    ],
  },
  {
    title: "दृश्यता से विश्वास तक",
    body: "Opticini केवल डेटा नहीं दिखाता। यह दिखाता है क्या मायने रखता है, क्यों, और आगे क्या करें।",
    requestDemo: "डेमो अनुरोध",
    footnote: "कार्ड की आवश्यकता नहीं · SOC 2 · एंटरप्राइज़-तैयार",
  }
)

const NAV_HI: NavEn = {
  allSystemsOperational: "सभी सिस्टम सामान्य",
  talkToSales: "बिक्री से बात करें",
  workspace: "वर्कस्पेस",
}

const FOOTER_HI: FooterEn = {
  ...FOOTER_EXTRA_EN,
  landingCtaTitle: "अपने इन्फ्रास्ट्रक्चर में स्पष्टता लाने के लिए तैयार?",
  landingCtaSubtitle: "Opticini के साथ दृश्यता, अनुपालन और जोखिम को एकीकृत करने वाली टीमों से जुड़ें।",
  requestDemo: "डेमो अनुरोध",
  brandTagline: "खोज, संचालन, सुरक्षा, अनुपालन, लागत और जोखिम के लिए एक प्लेटफ़ॉर्म।",
  copyrightLine: "© 2025 Opticini. सर्वाधिकार सुरक्षित।",
  colPlatform: "प्लेटफ़ॉर्म",
  colCompany: "कंपनी",
  colPartnerships: "साझेदारी",
  colVerticals: "वर्टिकल",
  colFrameworks: "फ़्रेमवर्क",
  linkAbout: "हमारे बारे में",
  linkBlog: "ब्लॉग",
  linkRequestDemo: "डेमो अनुरोध",
  linkContactSales: "बिक्री संपर्क",
  linkAffiliates: "एफ़िलिएट",
  linkConsultants: "सलाहकार",
  linkAuditPartners: "ऑडिट भागीदार",
  linkTechnologyPartners: "प्रौद्योगिकी भागीदार",
  platformDiscovery: "डिस्कवरी",
  platformHealth: "स्वास्थ्य",
  platformPerformance: "प्रदर्शन",
  platformSecurity: "सुरक्षा",
  platformConfiguration: "कॉन्फ़िगरेशन",
  platformCompliance: "अनुपालन",
  platformEvidence: "साक्ष्य",
  platformChange: "परिवर्तन",
  platformCost: "लागत",
  platformRisk: "जोखिम",
  verticalNonprofits: "गैर-लाभ",
  verticalStartups: "स्टार्टअप",
  verticalSMB: "एसएमबी",
  verticalGovernment: "सरकार",
  verticalHealthcare: "स्वास्थ्य सेवा",
  verticalFintech: "फ़िनटेक",
  verticalEducation: "शिक्षा",
  fwHipaaRule: "HIPAA सुरक्षा नियम",
  fwNistCsf: "NIST साइबर सुरक्षा",
  fwCis: "CIS Critical Security",
}

const HOME_AR = esLikeHome(
  {
    badge: "منصة B2B للامتثال البنية التحتية",
    title1: "رؤية كاملة.",
    title2: "ثقة تامة.",
    subtitle:
      "منصة واحدة للاكتشاف والتشغيل والأمان والامتثال والتكلفة والمخاطر — محلي وهجين وسحابي.",
    subline: "اعرف ما لديك · افهم الأداء · أثبت الامتثال · خفّف المخاطر",
    requestDemo: "اطلب عرضًا",
  },
  ["جاهز SOC 2", "ISO 27001", "HIPAA", "PCI DSS", "مع وكيل أو بدون"],
  {
    kicker: "التحدي",
    title: "البنية التحتية الحديثة مجزأة",
    body: "أدواتكم لا تتكلم مع بعض — فثغرات الأمان والامتثال تبقى خفية حتى فوات الأوان.",
    cards: [
      { title: "أدوات المراقبة", sub: "تعرض مقاييس الأداء فقط" },
      { title: "ماسحات الأمان", sub: "تعرض قوائم الثغرات فقط" },
      { title: "أدوات الامتثال", sub: "تعرض أدلة لحظية فقط" },
      { title: "أدوات مالية", sub: "تعرض تكاليف منفصلة فقط" },
    ],
    alertTitle: "لا أحد يتحدث مع الآخر.",
    alertBody: "الفرق تربط لوحات ولقطات وجداول — والمخاطر تنمو بهدوء.",
  },
  {
    kicker: "حل Opticini",
    title: "سطح رؤى موحّد",
    body: "يستبدل Opticini عشرات الأدوات المنفصلة بمنظر مستمر — مربوط بالصحة والأمان والامتثال والتكلفة والمخاطر في الوقت الفعلي.",
    labels: [
      { emoji: "🖥️", label: "بنية محلية" },
      { emoji: "☁️", label: "بيئات سحابية وهجينة" },
      { emoji: "🔌", label: "تطبيقات وواجهات وهوية" },
    ],
    banner: "الكل مربوط بالصحة والأمان والامتثال والتكلفة والمخاطر — في الوقت الفعلي.",
  },
  { kicker: "المنصة", title: "10 مستويات رؤى. منصة واحدة.", body: "كل مستوى متكامل بعمق — تغيير في مجال يظهر فورًا في الجميع.", learnMore: "اعرف المزيد ←" },
  HOME_EN.platform.planes,
  {
    kicker: "مصمم للفرق",
    title: "الرؤى المناسبة لكل صاحب مصلحة",
    items: [
      { emoji: "📊", role: "تشغيل IT وSRE", focus: "صحة البنية والتشغيل والأداء في الوقت الفعلي عبر المكدس." },
      { emoji: "🛡️", role: "فرق الأمان", focus: "مراقبة مستمرة للتعرض واكتشاف سوء الإعداد وتقليل سطح الهجوم." },
      { emoji: "📋", role: "GRC والامتثال", focus: "ضوابط دائمة وأدلة آلية وتقارير جاهزة للتدقيق." },
      { emoji: "💵", role: "FinOps والمالية", focus: "إسناد تكلفة السحابة والهدر وتحسين إنفاق البنية." },
      { emoji: "🏢", role: "الإدارة", focus: "وضع مخاطر حقيقي وجاهزية تشغيل وسياق أعمال — لا ضجيج لوحات." },
    ],
  },
  {
    kicker: "لماذا Opticini",
    title: "آخر أداة ستحتاج لإضافتها",
    colOld: "نهج تقليدي",
    colNew: "مع Opticini",
    rows: [
      { old: "أدوات معزولة", new: "منصة رؤى موحدة" },
      { old: "تنبيهات تفاعلية", new: "مراقبة مستمرة" },
      { old: "تدقيق لحظي", new: "جاهز للتدقيق دائمًا" },
      { old: "فائض بيانات", new: "درجات مخاطر مُرجّحة" },
      { old: "جمع أدلة يدوي", new: "إثبات آلي" },
      { old: "ذعر التدقيق", new: "ثقة بالامتثال" },
    ],
  },
  {
    kicker: "النشر",
    title: "يعمل مع بنيتكم لا ضدها",
    subtitle: "مع وكيل أو بدون. الخيار لكم.",
    items: [
      { emoji: "🖥️", label: "محلي" },
      { emoji: "☁️", label: "سحابة (AWS / GCP / Azure)" },
      { emoji: "🔀", label: "هجين" },
      { emoji: "📦", label: "حاويات وK8s" },
      { emoji: "🔌", label: "واجهات وخدمات" },
      { emoji: "🔑", label: "أنظمة هوية" },
      { emoji: "🌐", label: "شبكات" },
    ],
  },
  {
    title: "من الرؤية إلى الثقة",
    body: "Opticini لا يعرض البيانات فقط. يوضح ما يهم ولماذا وماذا تفعل لاحقًا.",
    requestDemo: "اطلب عرضًا",
    footnote: "لا حاجة لبطاقة · SOC 2 · جاهز للمؤسسات",
  }
)

const NAV_AR: NavEn = {
  allSystemsOperational: "جميع الأنظمة تعمل",
  talkToSales: "تحدث إلى المبيعات",
  workspace: "مساحة العمل",
}

const FOOTER_AR: FooterEn = {
  ...FOOTER_EXTRA_EN,
  landingCtaTitle: "مستعد لإضفاء الوضوح على بنيتكم؟",
  landingCtaSubtitle: "انضم إلى فرق توحّد الرؤية والامتثال والمخاطر مع Opticini.",
  requestDemo: "اطلب عرضًا",
  brandTagline: "منصة واحدة للاكتشاف والتشغيل والأمان والامتثال والتكلفة والمخاطر.",
  copyrightLine: "© 2025 Opticini. جميع الحقوق محفوظة.",
  colPlatform: "المنصة",
  colCompany: "الشركة",
  colPartnerships: "الشراكات",
  colVerticals: "القطاعات",
  colFrameworks: "الأطر",
  linkAbout: "من نحن",
  linkBlog: "المدونة",
  linkRequestDemo: "اطلب عرضًا",
  linkContactSales: "اتصل بالمبيعات",
  linkAffiliates: "الشركاء التسويقيون",
  linkConsultants: "الاستشاريون",
  linkAuditPartners: "شركاء التدقيق",
  linkTechnologyPartners: "شركاء التقنية",
  platformDiscovery: "اكتشاف",
  platformHealth: "الصحة",
  platformPerformance: "الأداء",
  platformSecurity: "الأمان",
  platformConfiguration: "الإعداد",
  platformCompliance: "الامتثال",
  platformEvidence: "الأدلة",
  platformChange: "التغيير",
  platformCost: "التكلفة",
  platformRisk: "المخاطر",
  verticalNonprofits: "غير ربحي",
  verticalStartups: "ناشئة",
  verticalSMB: "الشركات الصغيرة",
  verticalGovernment: "حكومة",
  verticalHealthcare: "صحة",
  verticalFintech: "تقنية مالية",
  verticalEducation: "تعليم",
  fwHipaaRule: "قاعدة أمان HIPAA",
  fwNistCsf: "الأمن السيبراني NIST",
  fwCis: "CIS Critical Security",
}

const HOME_HE = esLikeHome(
  {
    badge: "פלטפורמת ציות תשתית B2B",
    title1: "רואים הכול.",
    title2: "בטחון מלא.",
    subtitle:
      "פלטפורמה אחת לגילוי, תפעול, אבטחה, ציות, עלות וסיכון — מקומי, היברידי וענן.",
    subline: "דעו מה יש · הבינו ביצועים · הוכיחו ציות · הפחיתו סיכון",
    requestDemo: "בקשו הדגמה",
  },
  ["מוכן SOC 2", "ISO 27001", "HIPAA", "PCI DSS", "עם סוכן או בלי"],
  {
    kicker: "האתגר",
    title: "תשתית מודרנית מפוצלת",
    body: "הכלים שלכם לא מדברים זה עם זה — פערי אבטחה וציות נשארים בלתי נראים עד שמאוחר מדי.",
    cards: [
      { title: "כלי ניטור", sub: "מציגים רק מדדי ביצועים" },
      { title: "סורקי אבטחה", sub: "מציגים רק רשימות פגיעויות" },
      { title: "כלי ציות", sub: "מציגים רק ראיות נקודתיות" },
      { title: "כלי כספים", sub: "מציגים רק עלויות מנותקות" },
    ],
    alertTitle: "אף אחד לא מדבר עם אחר.",
    alertBody: "צוותים מחברים לוחות, צילומי מסך וגיליונות — בזמן שהסיכון גדל בשקט.",
  },
  {
    kicker: "הפתרון של Opticini",
    title: "מישור תובנות מאוחד",
    body: "Opticini מחליף עשרות כלים מנותקים בתצוגה רציפה — ממופה לבריאות, אבטחה, ציות, עלות וסיכון בזמן אמת.",
    labels: [
      { emoji: "🖥️", label: "תשתית מקומית" },
      { emoji: "☁️", label: "סביבות ענן והיברידיות" },
      { emoji: "🔌", label: "אפליקציות, API וזהות" },
    ],
    banner: "הכול ממופה לבריאות, אבטחה, ציות, עלות וסיכון — בזמן אמת.",
  },
  { kicker: "פלטפורמה", title: "10 מישורי תובנה. פלטפורמה אחת.", body: "כל מישור משולב לעומק — שינוי בתחום אחד משתקף מיד בכולם.", learnMore: "למידע נוסף ←" },
  HOME_EN.platform.planes,
  {
    kicker: "נבנה לצוותים",
    title: "התובנות הנכונות לכל בעל עניין",
    items: [
      { emoji: "📊", role: "תפעול IT ו-SRE", focus: "בריאות תשתית, זמינות וביצועים בזמן אמת על כל המחסנית." },
      { emoji: "🛡️", role: "צוותי אבטחה", focus: "ניטור חשיפה רציף, זיהוי הגדרות שגויות והקטנת שטח התקיפה." },
      { emoji: "📋", role: "GRC וציות", focus: "בקרות מתמשכות, איסוף ראיות אוטומטי ודוחות מוכנים לביקורת." },
      { emoji: "💵", role: "FinOps וכספים", focus: "ייחוס עלויות ענן, בזבוז וייעול הוצאות תשתית." },
      { emoji: "🏢", role: "הנהלה", focus: "עמדת סיכון אמיתית, מוכנות תפעולית והקשר עסקי — לא רעש לוחות." },
    ],
  },
  {
    kicker: "למה Opticini",
    title: "הכלי האחרון שתצטרכו להוסיף",
    colOld: "גישה מסורתית",
    colNew: "עם Opticini",
    rows: [
      { old: "כלים מבודדים", new: "פלטפורמת תובנות מאוחדת" },
      { old: "התראות תגובתיות", new: "ניטור רציף" },
      { old: "ביקורות נקודתיות", new: "תמיד מוכנים לביקורת" },
      { old: "עומס נתונים", new: "ציוני סיכון מדורגים" },
      { old: "איסוף ראיות ידני", new: "הוכחה אוטומטית" },
      { old: "פאניקת ביקורת", new: "ביטחון בציות" },
    ],
  },
  {
    kicker: "פריסה",
    title: "עובד עם התשתית שלכם, לא נגדה",
    subtitle: "עם סוכן או בלי. הבחירה שלכם.",
    items: [
      { emoji: "🖥️", label: "מקומי" },
      { emoji: "☁️", label: "ענן (AWS / GCP / Azure)" },
      { emoji: "🔀", label: "היברידי" },
      { emoji: "📦", label: "מיכלים ו-K8s" },
      { emoji: "🔌", label: "API ושירותים" },
      { emoji: "🔑", label: "מערכות זהות" },
      { emoji: "🌐", label: "רשתות" },
    ],
  },
  {
    title: "מנראות לביטחון",
    body: "Opticini לא רק מציג נתונים. מראה מה חשוב, למה, ומה לעשות הלאה.",
    requestDemo: "בקשו הדגמה",
    footnote: "ללא כרטיס · SOC 2 · מוכן לארגונים",
  }
)

const NAV_HE: NavEn = {
  allSystemsOperational: "כל המערכות פועלות",
  talkToSales: "דברו עם מכירות",
  workspace: "סביבת עבודה",
}

const FOOTER_HE: FooterEn = {
  ...FOOTER_EXTRA_EN,
  landingCtaTitle: "מוכנים להבהיר את התשתית?",
  landingCtaSubtitle: "הצטרפו לצוותים שמאחדים נראות, ציות וסיכון עם Opticini.",
  requestDemo: "בקשו הדגמה",
  brandTagline: "פלטפורמה אחת לגילוי, תפעול, אבטחה, ציות, עלות וסיכון.",
  copyrightLine: "© 2025 Opticini. כל הזכויות שמורות.",
  colPlatform: "פלטפורמה",
  colCompany: "חברה",
  colPartnerships: "שותפויות",
  colVerticals: "אנכיים",
  colFrameworks: "מסגרות",
  linkAbout: "אודות",
  linkBlog: "בלוג",
  linkRequestDemo: "בקשו הדגמה",
  linkContactSales: "צרו קשר עם מכירות",
  linkAffiliates: "שותפים",
  linkConsultants: "יועצים",
  linkAuditPartners: "שותפי ביקורת",
  linkTechnologyPartners: "שותפי טכנולוגיה",
  platformDiscovery: "גילוי",
  platformHealth: "בריאות",
  platformPerformance: "ביצועים",
  platformSecurity: "אבטחה",
  platformConfiguration: "תצורה",
  platformCompliance: "ציות",
  platformEvidence: "ראיות",
  platformChange: "שינוי",
  platformCost: "עלות",
  platformRisk: "סיכון",
  verticalNonprofits: "ללא מטרת רווח",
  verticalStartups: "סטארטאפים",
  verticalSMB: "עסקים קטנים ובינוניים",
  verticalGovernment: "ממשל",
  verticalHealthcare: "בריאות",
  verticalFintech: "פינטק",
  verticalEducation: "חינוך",
  fwHipaaRule: "כלל אבטחת HIPAA",
  fwNistCsf: "סייבר NIST",
  fwCis: "CIS Critical Security",
}

export const extraLandingOverlays: Record<string, LandingOverlay> = {
  fr: pack(HOME_FR, NAV_FR, FOOTER_FR),
  de: pack(HOME_DE, NAV_DE, FOOTER_DE),
  it: pack(HOME_IT, NAV_IT, FOOTER_IT),
  pt: pack(HOME_PT, NAV_PT, FOOTER_PT),
  ru: pack(HOME_RU, NAV_RU, FOOTER_RU),
  sv: pack(HOME_SV, NAV_SV, FOOTER_SV),
  no: pack(HOME_NO, NAV_NO, FOOTER_NO),
  da: pack(HOME_DA, NAV_DA, FOOTER_DA),
  zh: pack(HOME_ZH, NAV_ZH, FOOTER_ZH),
  ja: pack(HOME_JA, NAV_JA, FOOTER_JA),
  ko: pack(HOME_KO, NAV_KO, FOOTER_KO),
  hi: pack(HOME_HI, NAV_HI, FOOTER_HI),
  ar: pack(HOME_AR, NAV_AR, FOOTER_AR),
  he: pack(HOME_HE, NAV_HE, FOOTER_HE),
}
