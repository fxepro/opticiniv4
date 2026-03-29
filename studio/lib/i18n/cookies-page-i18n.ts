import { clonePublicPages, deepMergePublicPages } from "./deep-merge-public-pages"
import { PUBLIC_PAGES_EN } from "./public-pages-en"

type CookiesPayload = { cookies: typeof PUBLIC_PAGES_EN.cookies }

const COOKIE_BASE = PUBLIC_PAGES_EN.cookies as unknown as Record<string, unknown>

function cookiePatch(patch: Record<string, unknown>): typeof PUBLIC_PAGES_EN.cookies {
  return deepMergePublicPages(
    clonePublicPages(COOKIE_BASE) as Record<string, unknown>,
    patch
  ) as unknown as typeof PUBLIC_PAGES_EN.cookies
}

const EN: CookiesPayload = { cookies: PUBLIC_PAGES_EN.cookies }

const ES: CookiesPayload = {
  cookies: cookiePatch({
    title: "Política de cookies",
    subtitle: "Cómo Opticini utiliza cookies y tecnologías similares para mejorar su experiencia",
    lastUpdatedPrefix: "Última actualización:",
    whatAre: {
      title: "¿Qué son las cookies?",
      subtitle: "Comprender la tecnología de cookies",
      p1: "Las cookies son pequeños archivos de texto que se almacenan en su dispositivo al visitar un sitio web. Ayudan a recordar información sobre su visita, como el idioma preferido, para que la próxima visita sea más sencilla.",
      p2: 'Las cookies pueden ser "persistentes" o de "sesión". Las persistentes permanecen cuando se desconecta; las de sesión se eliminan al cerrar el navegador.',
    },
    usage: {
      title: "Cómo Opticini utiliza las cookies",
      subtitle: "Finalidades del uso de cookies",
      intro: "Utilizamos cookies para varios fines importantes:",
      cards: [
        {
          title: "Cookies esenciales",
          body: "Necesarias para el funcionamiento del sitio: navegación, áreas seguras y funciones básicas.",
        },
        {
          title: "Cookies de rendimiento",
          body: "Nos ayudan a entender cómo los visitantes usan el sitio de forma anónima.",
        },
        {
          title: "Cookies de funcionalidad",
          body: "Permiten recordar sus elecciones y ofrecer funciones más personalizadas.",
        },
        {
          title: "Cookies de analítica",
          body: "Ayudan a evaluar el rendimiento del sitio y detectar mejoras.",
        },
      ],
    },
    categories: {
      title: "Tipos de cookies que utilizamos",
      subtitle: "Descripción detallada por categoría",
      blocks: [
        {
          title: "Cookies esenciales (siempre activas)",
          body: "Imprescindibles para el funcionamiento y no pueden desactivarse en nuestros sistemas.",
          bullets: ["Autenticación y seguridad", "Gestión de sesión", "Equilibrio de carga"],
        },
        {
          title: "Rendimiento y analítica",
          body: "Nos ayudan a entender la interacción de los visitantes con el sitio.",
          bullets: ["Google Analytics", "Monitorización de rendimiento", "Seguimiento de errores"],
        },
        {
          title: "Cookies de funcionalidad",
          body: "Permiten funciones mejoradas y personalización.",
          bullets: ["Idioma", "Tema", "Personalización de la experiencia"],
        },
      ],
    },
    thirdParty: {
      title: "Cookies de terceros",
      subtitle: "Servicios externos",
      intro: "Algunas cookies las establecen servicios de terceros que utilizamos:",
      googleAnalyticsTitle: "Google Analytics",
      googleAnalyticsBody:
        "Utilizamos Google Analytics para entender el uso del sitio; puede incluir su dirección IP.",
      monitoringTitle: "Monitorización de rendimiento",
      monitoringBody:
        "Podemos usar servicios de terceros que establecen cookies para seguir el rendimiento e incidencias.",
      noteLabel: "Nota:",
      noteBody: "Las cookies de terceros se rigen por las políticas de privacidad de esos proveedores.",
    },
    manage: {
      title: "Gestionar sus preferencias de cookies",
      subtitle: "Cómo controlar la configuración",
      intro: "Tiene varias opciones para gestionar las cookies:",
      browserTitle: "Configuración del navegador",
      browserBody:
        'La mayoría de navegadores permiten controlar cookies en "Opciones" o "Preferencias".',
      consentTitle: "Consentimiento de cookies",
      consentBody:
        "En su primera visita verá un banner para aceptar o rechazar cookies no esenciales.",
      optOutTitle: "Herramientas de exclusión",
      optOutBody:
        "Puede instalar el complemento de exclusión de Google Analytics para dejar de ser rastreado.",
      importantLabel: "Importante:",
      importantBody:
        "Desactivar ciertas cookies puede afectar la funcionalidad. Las esenciales no pueden desactivarse.",
    },
    duration: {
      title: "Duración de las cookies",
      subtitle: "Cuánto permanecen en su dispositivo",
      sessionTitle: "Cookies de sesión",
      sessionBody: "Temporales: se eliminan al cerrar el navegador.",
      persistentTitle: "Cookies persistentes",
      persistentBody: "Permanecen un tiempo determinado o hasta que las borre.",
      specificTitle: "Duraciones indicativas",
      bullets: [
        "Autenticación: 30 días",
        "Preferencias: 1 año",
        "Analítica: 2 años",
        "Rendimiento: 1 año",
      ],
    },
    updates: {
      title: "Actualizaciones de esta política",
      subtitle: "Cambios en la política de cookies",
      p1: "Podemos actualizar esta política para reflejar cambios en nuestras prácticas o por motivos legales u operativos. Le informaremos de cambios sustanciales publicándola en esta página.",
      p2: "El uso continuado del sitio tras los cambios implica la aceptación de la política actualizada.",
    },
    contact: {
      title: "Contáctenos",
      subtitle: "¿Preguntas sobre cookies?",
      body: "Si tiene preguntas sobre el uso de cookies o esta política, contáctenos:",
      emailLabel: "Correo:",
      emailValue: "privacy@opticini.com",
      websiteLabel: "Sitio web:",
      websiteValue: "opticini.com",
    },
  }),
}

const FR: CookiesPayload = {
  cookies: cookiePatch({
    title: "Politique relative aux cookies",
    subtitle: "Comment Opticini utilise les cookies et technologies similaires",
    lastUpdatedPrefix: "Dernière mise à jour :",
    whatAre: {
      title: "Que sont les cookies ?",
      subtitle: "Comprendre la technologie des cookies",
      p1: "Les cookies sont de petits fichiers enregistrés sur votre appareil lors de la visite d’un site. Ils mémorisent des informations pour faciliter les visites suivantes.",
      p2: "Les cookies peuvent être persistants ou de session ; les cookies de session sont supprimés à la fermeture du navigateur.",
    },
    usage: {
      title: "Utilisation des cookies par Opticini",
      subtitle: "Objectifs d’utilisation",
      intro: "Nous utilisons les cookies pour plusieurs raisons importantes :",
      cards: [
        {
          title: "Cookies essentiels",
          body: "Nécessaires au fonctionnement du site, à la navigation et aux zones sécurisées.",
        },
        {
          title: "Cookies de performance",
          body: "Ils nous aident à comprendre l’utilisation du site de manière anonyme.",
        },
        {
          title: "Cookies de fonctionnalité",
          body: "Ils mémorisent vos choix et permettent des fonctions personnalisées.",
        },
        {
          title: "Cookies d’analyse",
          body: "Ils aident à mesurer les performances et les améliorations possibles.",
        },
      ],
    },
    categories: {
      title: "Types de cookies utilisés",
      subtitle: "Détail par catégorie",
      blocks: [
        {
          title: "Cookies essentiels (toujours actifs)",
          body: "Indispensables au fonctionnement et non désactivables dans nos systèmes.",
          bullets: ["Authentification et sécurité", "Gestion de session", "Répartition de charge"],
        },
        {
          title: "Performance et analyse",
          body: "Aident à comprendre l’interaction des visiteurs avec le site.",
          bullets: ["Google Analytics", "Surveillance des performances", "Suivi des erreurs"],
        },
        {
          title: "Cookies de fonctionnalité",
          body: "Permettent des fonctions avancées et la personnalisation.",
          bullets: ["Langue", "Thème", "Personnalisation de l’expérience"],
        },
      ],
    },
    thirdParty: {
      title: "Cookies tiers",
      subtitle: "Services externes",
      intro: "Certains cookies sont déposés par des services tiers que nous utilisons :",
      googleAnalyticsTitle: "Google Analytics",
      googleAnalyticsBody:
        "Nous utilisons Google Analytics pour comprendre l’usage du site ; cela peut inclure votre adresse IP.",
      monitoringTitle: "Surveillance des performances",
      monitoringBody:
        "Des services tiers peuvent déposer des cookies pour suivre les performances et incidents.",
      noteLabel: "Note :",
      noteBody: "Les cookies tiers sont soumis aux politiques de confidentialité de ces tiers.",
    },
    manage: {
      title: "Gérer vos préférences de cookies",
      subtitle: "Contrôler les paramètres",
      intro: "Vous disposez de plusieurs options :",
      browserTitle: "Paramètres du navigateur",
      browserBody:
        "La plupart des navigateurs permettent de contrôler les cookies via Options ou Préférences.",
      consentTitle: "Consentement aux cookies",
      consentBody:
        "Lors de votre première visite, une bannière vous permet d’accepter ou de refuser les cookies non essentiels.",
      optOutTitle: "Outils de désactivation",
      optOutBody:
        "Vous pouvez installer le module de désactivation Google Analytics pour ne plus être suivi.",
      importantLabel: "Important :",
      importantBody:
        "Désactiver certains cookies peut affecter le fonctionnement. Les cookies essentiels restent nécessaires.",
    },
    duration: {
      title: "Durée de conservation",
      subtitle: "Combien de temps les cookies restent sur votre appareil",
      sessionTitle: "Cookies de session",
      sessionBody: "Temporaires, supprimés à la fermeture du navigateur.",
      persistentTitle: "Cookies persistants",
      persistentBody: "Restent pour une durée définie ou jusqu’à suppression manuelle.",
      specificTitle: "Durées indicatives",
      bullets: [
        "Authentification : 30 jours",
        "Préférences : 1 an",
        "Analyse : 2 ans",
        "Performance : 1 an",
      ],
    },
    updates: {
      title: "Mises à jour de cette politique",
      subtitle: "Évolution de la politique cookies",
      p1: "Nous pouvons mettre à jour cette politique pour refléter des changements de pratiques ou des obligations légales. Les changements importants seront publiés sur cette page.",
      p2: "L’utilisation continue du site après modification vaut acceptation de la politique mise à jour.",
    },
    contact: {
      title: "Nous contacter",
      subtitle: "Questions sur les cookies ?",
      body: "Pour toute question sur les cookies ou cette politique :",
      emailLabel: "E-mail :",
      emailValue: "privacy@opticini.com",
      websiteLabel: "Site web :",
      websiteValue: "opticini.com",
    },
  }),
}

const DE: CookiesPayload = {
  cookies: cookiePatch({
    title: "Cookie-Richtlinie",
    subtitle: "Wie Opticini Cookies und ähnliche Technologien einsetzt",
    lastUpdatedPrefix: "Zuletzt aktualisiert:",
    whatAre: {
      title: "Was sind Cookies?",
      subtitle: "Grundlagen der Cookie-Technologie",
      p1: "Cookies sind kleine Textdateien auf Ihrem Gerät, die beim Besuch einer Website gespeichert werden und z. B. Spracheinstellungen merken.",
      p2: "Es gibt persistente Cookies und Sitzungs-Cookies; Sitzungs-Cookies werden beim Schließen des Browsers gelöscht.",
    },
    usage: {
      title: "Wie Opticini Cookies nutzt",
      subtitle: "Zwecke des Einsatzes",
      intro: "Wir verwenden Cookies für wichtige Zwecke:",
      cards: [
        { title: "Essenzielle Cookies", body: "Erforderlich für Grundfunktionen, Navigation und sichere Bereiche." },
        { title: "Performance-Cookies", body: "Helfen uns, die Nutzung der Website anonym zu verstehen." },
        { title: "Funktions-Cookies", body: "Speichern Ihre Auswahl und ermöglichen erweiterte Funktionen." },
        { title: "Analyse-Cookies", body: "Unterstützen die Bewertung der Website-Performance." },
      ],
    },
    categories: {
      title: "Arten von Cookies",
      subtitle: "Kategorien im Überblick",
      blocks: [
        {
          title: "Essenzielle Cookies (immer aktiv)",
          body: "Notwendig für den Betrieb; in unseren Systemen nicht abschaltbar.",
          bullets: ["Authentifizierung und Sicherheit", "Sitzungsverwaltung", "Lastverteilung"],
        },
        {
          title: "Performance & Analyse",
          body: "Helfen uns, das Besucherverhalten zu verstehen.",
          bullets: ["Google Analytics", "Performance-Monitoring", "Fehler-Tracking"],
        },
        {
          title: "Funktions-Cookies",
          body: "Ermöglichen erweiterte Funktionen und Personalisierung.",
          bullets: ["Sprache", "Theme", "UX-Anpassung"],
        },
      ],
    },
    thirdParty: {
      title: "Cookies von Drittanbietern",
      subtitle: "Externe Dienste",
      intro: "Einige Cookies werden von Drittanbieter-Diensten gesetzt:",
      googleAnalyticsTitle: "Google Analytics",
      googleAnalyticsBody: "Wir nutzen Google Analytics; dabei kann Ihre IP-Adresse verarbeitet werden.",
      monitoringTitle: "Performance-Monitoring",
      monitoringBody: "Drittanbieter können Cookies zur Leistungsmessung setzen.",
      noteLabel: "Hinweis:",
      noteBody: "Drittanbieter-Cookies unterliegen deren Datenschutzrichtlinien.",
    },
    manage: {
      title: "Cookie-Einstellungen verwalten",
      subtitle: "Steuerungsmöglichkeiten",
      intro: "Sie haben mehrere Optionen:",
      browserTitle: "Browsereinstellungen",
      browserBody: "In den Einstellungen Ihres Browsers können Sie Cookies meist verwalten.",
      consentTitle: "Einwilligung",
      consentBody: "Beim ersten Besuch können Sie nicht notwendige Cookies akzeptieren oder ablehnen.",
      optOutTitle: "Opt-out-Tools",
      optOutBody: "Sie können das Google-Analytics-Opt-out-Browser-Add-on nutzen.",
      importantLabel: "Wichtig:",
      importantBody: "Das Deaktivieren bestimmter Cookies kann die Funktionalität einschränken.",
    },
    duration: {
      title: "Speicherdauer",
      subtitle: "Wie lange Cookies gespeichert bleiben",
      sessionTitle: "Sitzungs-Cookies",
      sessionBody: "Werden beim Schließen des Browsers gelöscht.",
      persistentTitle: "Persistente Cookies",
      persistentBody: "Bleiben für einen festgelegten Zeitraum oder bis zur manuellen Löschung.",
      specificTitle: "Beispielhafte Dauer",
      bullets: ["Authentifizierung: 30 Tage", "Präferenzen: 1 Jahr", "Analyse: 2 Jahre", "Performance: 1 Jahr"],
    },
    updates: {
      title: "Aktualisierungen",
      subtitle: "Änderungen dieser Richtlinie",
      p1: "Wir können diese Richtlinie anpassen; wesentliche Änderungen veröffentlichen wir auf dieser Seite.",
      p2: "Die weitere Nutzung der Website nach Änderungen gilt als Zustimmung.",
    },
    contact: {
      title: "Kontakt",
      subtitle: "Fragen zur Cookie-Richtlinie?",
      body: "Bei Fragen zu Cookies oder dieser Richtlinie kontaktieren Sie uns:",
      emailLabel: "E-Mail:",
      emailValue: "privacy@opticini.com",
      websiteLabel: "Website:",
      websiteValue: "opticini.com",
    },
  }),
}

const IT: CookiesPayload = {
  cookies: cookiePatch({
    title: "Informativa sui cookie",
    subtitle: "Come Opticini utilizza cookie e tecnologie simili",
    lastUpdatedPrefix: "Ultimo aggiornamento:",
    whatAre: {
      title: "Cosa sono i cookie?",
      subtitle: "Tecnologia dei cookie",
      p1: "I cookie sono piccoli file di testo salvati sul dispositivo durante la visita a un sito per ricordare preferenze e impostazioni.",
      p2: "Esistono cookie persistenti e di sessione; quelli di sessione vengono eliminati alla chiusura del browser.",
    },
    usage: {
      title: "Uso dei cookie da parte di Opticini",
      subtitle: "Finalità",
      intro: "Utilizziamo i cookie per diverse finalità importanti:",
      cards: [
        { title: "Cookie essenziali", body: "Necessari per funzioni di base, navigazione e aree sicure." },
        { title: "Cookie di prestazione", body: "Ci aiutano a capire l’uso del sito in forma anonima." },
        { title: "Cookie di funzionalità", body: "Memorizzano le scelte e abilitano funzioni personalizzate." },
        { title: "Cookie di analisi", body: "Supportano la valutazione delle prestazioni del sito." },
      ],
    },
    categories: {
      title: "Tipi di cookie utilizzati",
      subtitle: "Dettaglio per categoria",
      blocks: [
        {
          title: "Cookie essenziali (sempre attivi)",
          body: "Indispensabili per il funzionamento; non disattivabili nei nostri sistemi.",
          bullets: ["Autenticazione e sicurezza", "Gestione sessione", "Bilanciamento del carico"],
        },
        {
          title: "Prestazioni e analisi",
          body: "Aiutano a comprendere l’interazione con il sito.",
          bullets: ["Google Analytics", "Monitoraggio prestazioni", "Tracciamento errori"],
        },
        {
          title: "Cookie di funzionalità",
          body: "Abilitano funzioni avanzate e personalizzazione.",
          bullets: ["Lingua", "Tema", "Personalizzazione UX"],
        },
      ],
    },
    thirdParty: {
      title: "Cookie di terze parti",
      subtitle: "Servizi esterni",
      intro: "Alcuni cookie sono impostati da servizi di terze parti:",
      googleAnalyticsTitle: "Google Analytics",
      googleAnalyticsBody: "Utilizziamo Google Analytics; può includere l’indirizzo IP.",
      monitoringTitle: "Monitoraggio prestazioni",
      monitoringBody: "Servizi terzi possono impostare cookie per prestazioni e problemi.",
      noteLabel: "Nota:",
      noteBody: "I cookie di terze parti sono regolati dalle rispettive informative privacy.",
    },
    manage: {
      title: "Gestione preferenze cookie",
      subtitle: "Come controllare le impostazioni",
      intro: "Avete diverse opzioni:",
      browserTitle: "Impostazioni del browser",
      browserBody: "La maggior parte dei browser consente di gestire i cookie nelle preferenze.",
      consentTitle: "Consenso ai cookie",
      consentBody: "Al primo accesso potete accettare o rifiutare i cookie non essenziali.",
      optOutTitle: "Strumenti di opt-out",
      optOutBody: "È possibile installare il componente aggiuntivo di opt-out di Google Analytics.",
      importantLabel: "Importante:",
      importantBody: "Disattivare alcuni cookie può influire sul funzionamento del sito.",
    },
    duration: {
      title: "Durata dei cookie",
      subtitle: "Quanto restano sul dispositivo",
      sessionTitle: "Cookie di sessione",
      sessionBody: "Temporanei, eliminati alla chiusura del browser.",
      persistentTitle: "Cookie persistenti",
      persistentBody: "Restano per un periodo definito o fino alla cancellazione.",
      specificTitle: "Durate indicative",
      bullets: ["Autenticazione: 30 giorni", "Preferenze: 1 anno", "Analisi: 2 anni", "Prestazioni: 1 anno"],
    },
    updates: {
      title: "Aggiornamenti alla policy",
      subtitle: "Modifiche",
      p1: "Possiamo aggiornare questa informativa; cambiamenti rilevanti saranno pubblicati qui.",
      p2: "L’uso continuato del sito dopo le modifiche implica accettazione.",
    },
    contact: {
      title: "Contattaci",
      subtitle: "Domande sui cookie?",
      body: "Per domande sull’uso dei cookie:",
      emailLabel: "Email:",
      emailValue: "privacy@opticini.com",
      websiteLabel: "Sito web:",
      websiteValue: "opticini.com",
    },
  }),
}

const PT: CookiesPayload = {
  cookies: cookiePatch({
    title: "Política de cookies",
    subtitle: "Como a Opticini utiliza cookies e tecnologias semelhantes",
    lastUpdatedPrefix: "Última atualização:",
    whatAre: {
      title: "O que são cookies?",
      subtitle: "Compreender a tecnologia",
      p1: "Cookies são pequenos ficheiros de texto guardados no seu dispositivo ao visitar um site para memorizar preferências.",
      p2: "Podem ser persistentes ou de sessão; os de sessão são removidos ao fechar o navegador.",
    },
    usage: {
      title: "Como a Opticini utiliza cookies",
      subtitle: "Finalidades",
      intro: "Utilizamos cookies para fins importantes:",
      cards: [
        { title: "Cookies essenciais", body: "Necessários para navegação, áreas seguras e funções básicas." },
        { title: "Cookies de desempenho", body: "Ajudam a compreender o uso do site de forma anónima." },
        { title: "Cookies de funcionalidade", body: "Lembram as suas escolhas e funcionalidades personalizadas." },
        { title: "Cookies de análise", body: "Ajudam a avaliar o desempenho do site." },
      ],
    },
    categories: {
      title: "Tipos de cookies",
      subtitle: "Por categoria",
      blocks: [
        {
          title: "Cookies essenciais (sempre ativos)",
          body: "Indispensáveis ao funcionamento; não podem ser desativados nos nossos sistemas.",
          bullets: ["Autenticação e segurança", "Gestão de sessão", "Balanceamento de carga"],
        },
        {
          title: "Desempenho e análise",
          body: "Ajudam a compreender a interação com o site.",
          bullets: ["Google Analytics", "Monitorização de desempenho", "Rastreio de erros"],
        },
        {
          title: "Cookies de funcionalidade",
          body: "Permitem funcionalidades avançadas e personalização.",
          bullets: ["Idioma", "Tema", "Personalização da experiência"],
        },
      ],
    },
    thirdParty: {
      title: "Cookies de terceiros",
      subtitle: "Serviços externos",
      intro: "Alguns cookies são definidos por serviços de terceiros:",
      googleAnalyticsTitle: "Google Analytics",
      googleAnalyticsBody: "Utilizamos o Google Analytics; pode incluir o seu endereço IP.",
      monitoringTitle: "Monitorização de desempenho",
      monitoringBody: "Terceiros podem definir cookies para acompanhar desempenho e problemas.",
      noteLabel: "Nota:",
      noteBody: "Os cookies de terceiros estão sujeitos às respetivas políticas de privacidade.",
    },
    manage: {
      title: "Gerir preferências de cookies",
      subtitle: "Como controlar as definições",
      intro: "Tem várias opções:",
      browserTitle: "Definições do navegador",
      browserBody: "A maioria dos navegadores permite gerir cookies nas preferências.",
      consentTitle: "Consentimento de cookies",
      consentBody: "Na primeira visita pode aceitar ou recusar cookies não essenciais.",
      optOutTitle: "Ferramentas de exclusão",
      optOutBody: "Pode instalar o complemento de exclusão do Google Analytics.",
      importantLabel: "Importante:",
      importantBody: "Desativar cookies pode afetar a funcionalidade do site.",
    },
    duration: {
      title: "Duração dos cookies",
      subtitle: "Quanto tempo permanecem no dispositivo",
      sessionTitle: "Cookies de sessão",
      sessionBody: "Temporários, eliminados ao fechar o navegador.",
      persistentTitle: "Cookies persistentes",
      persistentBody: "Permanecem por um período definido ou até eliminação manual.",
      specificTitle: "Durações indicativas",
      bullets: ["Autenticação: 30 dias", "Preferências: 1 ano", "Análise: 2 anos", "Desempenho: 1 ano"],
    },
    updates: {
      title: "Atualizações desta política",
      subtitle: "Alterações",
      p1: "Podemos atualizar esta política; alterações materiais serão publicadas nesta página.",
      p2: "O uso continuado após alterações constitui aceitação.",
    },
    contact: {
      title: "Contacto",
      subtitle: "Dúvidas sobre cookies?",
      body: "Para questões sobre cookies ou esta política:",
      emailLabel: "E-mail:",
      emailValue: "privacy@opticini.com",
      websiteLabel: "Website:",
      websiteValue: "opticini.com",
    },
  }),
}

const nordicAsianPatch = (
  t: string,
  s: string,
  lu: string,
  wa: { title: string; subtitle: string },
  ut: string,
  us: string,
  ui: string,
  cat: string,
  cats: string,
  tp: string,
  tps: string,
  mg: string,
  mgs: string,
  mi: string,
  du: string,
  dus: string,
  up: string,
  ups: string,
  ct: string,
  cts: string,
  cb: string
) =>
  cookiePatch({
    title: t,
    subtitle: s,
    lastUpdatedPrefix: lu,
    whatAre: { title: wa.title, subtitle: wa.subtitle },
    usage: { title: ut, subtitle: us, intro: ui },
    categories: { title: cat, subtitle: cats },
    thirdParty: { title: tp, subtitle: tps },
    manage: { title: mg, subtitle: mgs, intro: mi },
    duration: { title: du, subtitle: dus },
    updates: { title: up, subtitle: ups },
    contact: { title: ct, subtitle: cts, body: cb },
  })

const RU: CookiesPayload = {
  cookies: nordicAsianPatch(
    "Политика в отношении cookie",
    "Как Opticini использует файлы cookie и аналогичные технологии",
    "Последнее обновление:",
    { title: "Что такое cookie?", subtitle: "О технологии cookie" },
    "Как Opticini использует cookie",
    "Цели использования",
    "Мы используем cookie для важных целей:",
    "Типы используемых cookie",
    "По категориям",
    "Сторонние cookie",
    "Внешние сервисы",
    "Управление настройками cookie",
    "Как изменить параметры",
    "У вас есть несколько вариантов:",
    "Срок хранения cookie",
    "Как долго они остаются на устройстве",
    "Обновления политики",
    "Изменения",
    "Связаться с нами",
    "Вопросы по cookie?",
    "По вопросам cookie свяжитесь с нами:"
  ),
}
const SV: CookiesPayload = {
  cookies: nordicAsianPatch(
    "Cookiepolicy",
    "Hur Opticini använder cookies och liknande tekniker",
    "Senast uppdaterad:",
    { title: "Vad är cookies?", subtitle: "Om cookieteknik" },
    "Hur Opticini använder cookies",
    "Syften",
    "Vi använder cookies för viktiga ändamål:",
    "Typer av cookies vi använder",
    "Per kategori",
    "Tredjepartscookies",
    "Externa tjänster",
    "Hantera cookieinställningar",
    "Hur du styr inställningar",
    "Du har flera alternativ:",
    "Cookievaraktighet",
    "Hur länge de finns kvar på enheten",
    "Uppdateringar av policyn",
    "Ändringar",
    "Kontakta oss",
    "Frågor om cookies?",
    "Vid frågor om cookies, kontakta oss:"
  ),
}
const NO: CookiesPayload = {
  cookies: nordicAsianPatch(
    "Retningslinjer for informasjonskapsler",
    "Hvordan Opticini bruker informasjonskapsler og lignende teknologi",
    "Sist oppdatert:",
    { title: "Hva er informasjonskapsler?", subtitle: "Om teknologien" },
    "Hvordan Opticini bruker informasjonskapsler",
    "Formål",
    "Vi bruker informasjonskapsler til viktige formål:",
    "Typer informasjonskapsler",
    "Per kategori",
    "Informasjonskapsler fra tredjeparter",
    "Eksterne tjenester",
    "Administrere preferanser",
    "Slik styrer du innstillinger",
    "Du har flere valg:",
    "Varighet",
    "Hvor lenge de blir på enheten",
    "Oppdateringer av retningslinjene",
    "Endringer",
    "Kontakt oss",
    "Spørsmål om informasjonskapsler?",
    "Ta kontakt ved spørsmål:"
  ),
}
const DA: CookiesPayload = {
  cookies: nordicAsianPatch(
    "Cookiepolitik",
    "Sådan bruger Opticini cookies og lignende teknologier",
    "Sidst opdateret:",
    { title: "Hvad er cookies?", subtitle: "Om cookieteknologi" },
    "Sådan bruger Opticini cookies",
    "Formål",
    "Vi bruger cookies til vigtige formål:",
    "Typer af cookies",
    "Pr. kategori",
    "Tredjepartscookies",
    "Eksterne tjenester",
    "Administrer cookiepræferencer",
    "Sådan styrer du indstillinger",
    "Du har flere muligheder:",
    "Varighed af cookies",
    "Hvor længe de forbliver på enheden",
    "Opdateringer af politikken",
    "Ændringer",
    "Kontakt os",
    "Spørgsmål om cookies?",
    "Kontakt os ved spørgsmål:"
  ),
}
const ZH: CookiesPayload = {
  cookies: nordicAsianPatch(
    "Cookie 政策",
    "Opticini 如何使用 Cookie 及类似技术",
    "最后更新：",
    { title: "什么是 Cookie？", subtitle: "了解 Cookie 技术" },
    "Opticini 如何使用 Cookie",
    "使用目的",
    "我们将 Cookie 用于多项重要目的：",
    "我们使用的 Cookie 类型",
    "按类别说明",
    "第三方 Cookie",
    "外部服务",
    "管理 Cookie 偏好",
    "如何控制设置",
    "您有多种选择：",
    "Cookie 保留时间",
    "在设备上保留多久",
    "本政策更新",
    "变更说明",
    "联系我们",
    "对 Cookie 有疑问？",
    "如有关于 Cookie 的问题，请联系我们："
  ),
}
const JA: CookiesPayload = {
  cookies: nordicAsianPatch(
    "クッキーポリシー",
    "Opticini がクッキーおよび類似技術を使用する方法",
    "最終更新:",
    { title: "クッキーとは？", subtitle: "技術の概要" },
    "Opticini のクッキー利用",
    "利用目的",
    "重要な目的のためにクッキーを使用します：",
    "使用するクッキーの種類",
    "カテゴリ別",
    "第三者クッキー",
    "外部サービス",
    "クッキー設定の管理",
    "設定の制御方法",
    "複数の選択肢があります：",
    "クッキーの保存期間",
    "デバイスに残る期間",
    "本ポリシーの更新",
    "変更について",
    "お問い合わせ",
    "クッキーについてのご質問は",
    "クッキーに関するご質問はお問い合わせください："
  ),
}
const KO: CookiesPayload = {
  cookies: nordicAsianPatch(
    "쿠키 정책",
    "Opticini의 쿠키 및 유사 기술 사용 방식",
    "최종 업데이트:",
    { title: "쿠키란?", subtitle: "기술 개요" },
    "Opticini의 쿠키 사용",
    "사용 목적",
    "중요한 목적을 위해 쿠키를 사용합니다:",
    "사용하는 쿠키 유형",
    "범주별",
    "제3자 쿠키",
    "외부 서비스",
    "쿠키 기본 설정 관리",
    "설정 제어 방법",
    "여러 가지 옵션이 있습니다:",
    "쿠키 유지 기간",
    "기기에 남는 기간",
    "정책 업데이트",
    "변경 사항",
    "문의하기",
    "쿠키 관련 문의",
    "쿠키 정책에 대한 문의:"
  ),
}
const HI: CookiesPayload = {
  cookies: nordicAsianPatch(
    "कुकी नीति",
    "Opticini कुकी और समान तकनीकों का उपयोग कैसे करता है",
    "अंतिम अपडेट:",
    { title: "कुकी क्या हैं?", subtitle: "तकनीक समझें" },
    "Opticini कुकी का उपयोग",
    "उद्देश्य",
    "हम महत्वपूर्ण उद्देश्यों के लिए कुकी का उपयोग करते हैं:",
    "उपयोग की जाने वाली कुकी के प्रकार",
    "श्रेणी अनुसार",
    "तृतीय-पक्ष कुकी",
    "बाहरी सेवाएँ",
    "कुकी वरीयताएँ प्रबंधित करें",
    "सेटिंग नियंत्रित करना",
    "आपके पास कई विकल्प हैं:",
    "कुकी अवधि",
    "डिवाइस पर कितनी देर",
    "नीति अपडेट",
    "परिवर्तन",
    "संपर्क करें",
    "कुकी पर प्रश्न?",
    "कुकी के बारे में प्रश्न हों तो संपर्क करें:"
  ),
}
const AR: CookiesPayload = {
  cookies: nordicAsianPatch(
    "سياسة ملفات تعريف الارتباط",
    "كيف تستخدم Opticini ملفات تعريف الارتباط والتقنيات المشابهة",
    "آخر تحديث:",
    { title: "ما هي ملفات تعريف الارتباط؟", subtitle: "فهم التقنية" },
    "كيف تستخدم Opticini ملفات تعريف الارتباط",
    "الأغراض",
    "نستخدم ملفات تعريف الارتباط لأغراض مهمة:",
    "أنواع ملفات تعريف الارتباط",
    "حسب الفئة",
    "ملفات تعريف ارتباط لجهات خارجية",
    "خدمات خارجية",
    "إدارة تفضيلات ملفات تعريف الارتباط",
    "كيفية التحكم في الإعدادات",
    "لديك عدة خيارات:",
    "مدة ملفات تعريف الارتباط",
    "مدة بقائها على الجهاز",
    "تحديثات السياسة",
    "التغييرات",
    "اتصل بنا",
    "أسئلة حول ملفات تعريف الارتباط؟",
    "للأسئلة حول ملفات تعريف الارتباط:"
  ),
}
const HE: CookiesPayload = {
  cookies: nordicAsianPatch(
    "מדיניות עוגיות",
    "כיצד Opticini משתמשת בעוגיות וטכנולוגיות דומות",
    "עודכן לאחרונה:",
    { title: "מהן עוגיות?", subtitle: "הבנת הטכנולוגיה" },
    "כיצד Opticini משתמשת בעוגיות",
    "מטרות",
    "אנו משתמשים בעוגיות למטרות חשובות:",
    "סוגי העוגיות בשימוש",
    "לפי קטגוריה",
    "עוגיות צד שלישי",
    "שירותים חיצוניים",
    "ניהול העדפות עוגיות",
    "כיצד לשלוט בהגדרות",
    "יש לכם מספר אפשרויות:",
    "משך חיי העוגיות",
    "כמה זמן הן נשארות במכשיר",
    "עדכוני המדיניות",
    "שינויים",
    "צרו קשר",
    "שאלות על עוגיות?",
    "לשאלות על מדיניות העוגיות:"
  ),
}

export const COOKIES_PAGE_PATCH_BY_LANG: Record<string, CookiesPayload> = {
  en: EN,
  es: ES,
  fr: FR,
  de: DE,
  it: IT,
  pt: PT,
  ru: RU,
  sv: SV,
  no: NO,
  da: DA,
  zh: ZH,
  ja: JA,
  ko: KO,
  hi: HI,
  ar: AR,
  he: HE,
}
