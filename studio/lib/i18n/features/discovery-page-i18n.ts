import type { FeatureDetailConfig } from "@/components/feature-detail-page"

/** Text-only Discovery plane (colors stay in code). */
export type DiscoveryI18nPayload = Omit<FeatureDetailConfig, "colors">

/** Full page copy + badge string for plane hero (i18next {{num}}). */
export type DiscoveryPagePatch = {
  featureUi: { planeInsight: string }
  features: { discovery: DiscoveryI18nPayload }
}

const DISCOVERY_ES: DiscoveryI18nPayload = {
  title: "Descubrimiento",
  subtitle: "Sepa todo lo que existe",
  tagline: "No puede gestionar, asegurar ni cumplir con lo que no ve.",
  planeNum: 1,
  stats: [
    { value: "100%", label: "cobertura de activos" },
    { value: "Tiempo real", label: "descubrimiento continuo" },
    { value: "7+", label: "tipos de activos" },
    { value: "0", label: "hojas de cálculo" },
  ],
  posStrong: "No puede gestionar, asegurar ni cumplir con lo que no ve.",
  posBody:
    "Opticini Discovery ofrece una única vista fiable de cada activo en entornos locales, híbridos y en la nube — de forma automática y continua.",
  sectionLabel: "Qué hace Descubrimiento",
  sectionTitle: "De servidores físicos a APIs — un inventario vivo",
  cards: [
    {
      icon: "🖥️",
      title: "Activos de infraestructura",
      items: [
        "Servidores físicos y VM",
        "Instancias en la nube (AWS, Azure, GCP)",
        "Contenedores y clústeres Kubernetes",
        "Almacenamiento y bases de datos",
      ],
    },
    {
      icon: "🌐",
      title: "Red e identidad",
      items: [
        "Dispositivos de red y cortafuegos",
        "APIs y puntos finales de servicio",
        "Sistemas de identidad e IAM",
        "DNS y certificados",
      ],
    },
    {
      icon: "🔗",
      title: "Relaciones y contexto",
      items: [
        "Mapeo de dependencias entre activos",
        "Atribución a propietarios y equipos",
        "Etiquetado de entorno (prod/dev/staging)",
        "Seguimiento de cambios en tiempo real",
      ],
    },
  ],
  compareLabel: "Por qué importa el descubrimiento",
  compareTitle: "De puntos ciegos a visibilidad total",
  compareOld: "Sin descubrimiento",
  compareNew: "Con Opticini Discovery",
  compareRows: [
    { old: "Activos desconocidos por todas partes", new: "Inventario vivo completo" },
    { old: "Seguimiento en hojas de cálculo", new: "Grafo de activos autoactualizado" },
    { old: "Ceguera ante TI sombra", new: "Activos no autorizados visibles al instante" },
    { old: "Datos CMDB obsoletos", new: "Sustitución CMDB continua y precisa" },
  ],
  outcomeLabel: "Resultado",
  outcomeText:
    "Un único inventario vivo de todo en su infraestructura — mantenido automáticamente y siempre preciso.",
  ctaTitle: "Vea todo. Sepa todo.",
  ctaSubtitle:
    "Descubrimiento continuo de activos en toda su infraestructura — sin esfuerzo manual.",
}

const DISCOVERY_FR: DiscoveryI18nPayload = {
  title: "Découverte",
  subtitle: "Tout ce qui existe",
  tagline: "Vous ne pouvez pas gérer, sécuriser ni vous conformer à ce que vous ne voyez pas.",
  planeNum: 1,
  stats: [
    { value: "100%", label: "couverture des actifs" },
    { value: "Temps réel", label: "découverte continue" },
    { value: "7+", label: "types d’actifs" },
    { value: "0", label: "tableurs" },
  ],
  posStrong: "Vous ne pouvez pas gérer, sécuriser ni vous conformer à ce que vous ne voyez pas.",
  posBody:
    "Opticini Discovery offre une vue unique et faisant autorité de chaque actif — sur site, hybride et cloud — automatiquement et en continu.",
  sectionLabel: "Ce que fait la Découverte",
  sectionTitle: "Des serveurs physiques aux API — un inventaire vivant",
  cards: [
    {
      icon: "🖥️",
      title: "Actifs d’infrastructure",
      items: [
        "Serveurs physiques et VM",
        "Instances cloud (AWS, Azure, GCP)",
        "Conteneurs et clusters Kubernetes",
        "Stockage et bases de données",
      ],
    },
    {
      icon: "🌐",
      title: "Réseau et identité",
      items: [
        "Équipements réseau et pare-feu",
        "API et points de terminaison",
        "Identité et IAM",
        "DNS et certificats",
      ],
    },
    {
      icon: "🔗",
      title: "Relations et contexte",
      items: [
        "Cartographie des dépendances",
        "Attribution propriétaire et équipe",
        "Balises d’environnement (prod/dev/staging)",
        "Suivi des changements en temps réel",
      ],
    },
  ],
  compareLabel: "Pourquoi la Découverte compte",
  compareTitle: "Des angles morts à une visibilité complète",
  compareOld: "Sans Découverte",
  compareNew: "Avec Opticini Discovery",
  compareRows: [
    { old: "Actifs inconnus partout", new: "Inventaire vivant complet" },
    { old: "Suivi dans des tableurs", new: "Graphe d’actifs auto-mis à jour" },
    { old: "Aveuglement face au shadow IT", new: "Actifs non autorisés visibles instantanément" },
    { old: "CMDB obsolète", new: "Remplacement CMDB continu et exact" },
  ],
  outcomeLabel: "Résultat",
  outcomeText:
    "Un inventaire vivant unique de toute votre infrastructure — maintenu automatiquement, toujours exact.",
  ctaTitle: "Tout voir. Tout savoir.",
  ctaSubtitle:
    "Découverte continue des actifs sur toute votre infrastructure — sans effort manuel.",
}

const DISCOVERY_DE: DiscoveryI18nPayload = {
  title: "Entdeckung",
  subtitle: "Alles, was existiert",
  tagline: "Was Sie nicht sehen, können Sie nicht verwalten, absichern oder compliant halten.",
  planeNum: 1,
  stats: [
    { value: "100%", label: "Asset-Abdeckung" },
    { value: "Echtzeit", label: "kontinuierliche Entdeckung" },
    { value: "7+", label: "Asset-Typen" },
    { value: "0", label: "Tabellenkalkulationen" },
  ],
  posStrong: "Was Sie nicht sehen, können Sie nicht verwalten, absichern oder compliant halten.",
  posBody:
    "Opticini Discovery liefert eine einzige verbindliche Sicht auf jedes Asset — lokal, hybrid und in der Cloud — automatisch und kontinuierlich.",
  sectionLabel: "Was Entdeckung leistet",
  sectionTitle: "Von physischen Servern bis APIs — ein lebendes Inventar",
  cards: [
    {
      icon: "🖥️",
      title: "Infrastruktur-Assets",
      items: [
        "Physische Server und VMs",
        "Cloud-Instanzen (AWS, Azure, GCP)",
        "Container und Kubernetes-Cluster",
        "Storage und Datenbanken",
      ],
    },
    {
      icon: "🌐",
      title: "Netzwerk & Identität",
      items: [
        "Netzwerkgeräte und Firewalls",
        "APIs und Service-Endpunkte",
        "Identitätssysteme und IAM",
        "DNS und Zertifikate",
      ],
    },
    {
      icon: "🔗",
      title: "Beziehungen & Kontext",
      items: [
        "Abhängigkeits-Mapping",
        "Owner- und Team-Zuordnung",
        "Umgebungs-Tags (prod/dev/staging)",
        "Echtzeit-Änderungsverfolgung",
      ],
    },
  ],
  compareLabel: "Warum Entdeckung wichtig ist",
  compareTitle: "Von blinden Flecken zu vollständiger Sichtbarkeit",
  compareOld: "Ohne Entdeckung",
  compareNew: "Mit Opticini Discovery",
  compareRows: [
    { old: "Unbekannte Assets überall", new: "Vollständiges Live-Inventar" },
    { old: "Tracking in Tabellen", new: "Automatisch aktualisiertes Asset-Graph" },
    { old: "Shadow-IT-Blindheit", new: "Unautorisierte Assets sofort sichtbar" },
    { old: "Veraltete CMDB-Daten", new: "Kontinuierlicher, genauer CMDB-Ersatz" },
  ],
  outcomeLabel: "Ergebnis",
  outcomeText:
    "Ein einziges lebendes Inventar Ihrer gesamten Infrastruktur — automatisch gepflegt, immer korrekt.",
  ctaTitle: "Alles sehen. Alles wissen.",
  ctaSubtitle:
    "Kontinuierliche Asset-Entdeckung in Ihrer gesamten Infrastruktur — ohne manuellen Aufwand.",
}

const DISCOVERY_IT: DiscoveryI18nPayload = {
  title: "Scoperta",
  subtitle: "Tutto ciò che esiste",
  tagline: "Non puoi gestire, proteggere o adeguare ciò che non vedi.",
  planeNum: 1,
  stats: [
    { value: "100%", label: "copertura degli asset" },
    { value: "Tempo reale", label: "rilevamento continuo" },
    { value: "7+", label: "tipi di asset" },
    { value: "0", label: "fogli di calcolo" },
  ],
  posStrong: "Non puoi gestire, proteggere o adeguare ciò che non vedi.",
  posBody:
    "Opticini Discovery offre un’unica vista autorevole di ogni asset — on‑prem, ibrido e cloud — in modo automatico e continuo.",
  sectionLabel: "Cosa fa Scoperta",
  sectionTitle: "Da server fisici alle API — un inventario vivo",
  cards: [
    {
      icon: "🖥️",
      title: "Asset di infrastruttura",
      items: [
        "Server fisici e VM",
        "Istanze cloud (AWS, Azure, GCP)",
        "Container e cluster Kubernetes",
        "Storage e database",
      ],
    },
    {
      icon: "🌐",
      title: "Rete e identità",
      items: [
        "Dispositivi di rete e firewall",
        "API ed endpoint di servizio",
        "Sistemi di identità e IAM",
        "DNS e certificati",
      ],
    },
    {
      icon: "🔗",
      title: "Relazioni e contesto",
      items: [
        "Mappatura delle dipendenze",
        "Attribuzione a owner e team",
        "Tag di ambiente (prod/dev/staging)",
        "Tracciamento modifiche in tempo reale",
      ],
    },
  ],
  compareLabel: "Perché Scoperta conta",
  compareTitle: "Da punti ciechi a visibilità completa",
  compareOld: "Senza Scoperta",
  compareNew: "Con Opticini Discovery",
  compareRows: [
    { old: "Asset sconosciuti ovunque", new: "Inventario live completo" },
    { old: "Tracciamento su fogli di calcolo", new: "Grafo asset aggiornato automaticamente" },
    { old: "Cecità allo shadow IT", new: "Asset non autorizzati visibili subito" },
    { old: "CMDB obsoleta", new: "Sostituzione CMDB continua e accurata" },
  ],
  outcomeLabel: "Risultato",
  outcomeText:
    "Un unico inventario live di tutta la tua infrastruttura — mantenuto automaticamente e sempre accurato.",
  ctaTitle: "Vedi tutto. Sappi tutto.",
  ctaSubtitle:
    "Rilevamento continuo degli asset su tutta la tua infrastruttura — senza sforzo manuale.",
}

const DISCOVERY_PT: DiscoveryI18nPayload = {
  title: "Descoberta",
  subtitle: "Tudo o que existe",
  tagline: "Não pode gerir, proteger nem cumprir o que não vê.",
  planeNum: 1,
  stats: [
    { value: "100%", label: "cobertura de ativos" },
    { value: "Tempo real", label: "descoberta contínua" },
    { value: "7+", label: "tipos de ativos" },
    { value: "0", label: "folhas de cálculo" },
  ],
  posStrong: "Não pode gerir, proteger nem cumprir o que não vê.",
  posBody:
    "O Opticini Discovery oferece uma única visão fiável de cada ativo — no local, híbrido e na nuvem — de forma automática e contínua.",
  sectionLabel: "O que a Descoberta faz",
  sectionTitle: "De servidores físicos a APIs — um inventário vivo",
  cards: [
    {
      icon: "🖥️",
      title: "Ativos de infraestrutura",
      items: [
        "Servidores físicos e VMs",
        "Instâncias na cloud (AWS, Azure, GCP)",
        "Contentores e clusters Kubernetes",
        "Armazenamento e bases de dados",
      ],
    },
    {
      icon: "🌐",
      title: "Rede e identidade",
      items: [
        "Dispositivos de rede e firewalls",
        "APIs e pontos finais de serviço",
        "Sistemas de identidade e IAM",
        "DNS e certificados",
      ],
    },
    {
      icon: "🔗",
      title: "Relações e contexto",
      items: [
        "Mapeamento de dependências entre ativos",
        "Atribuição a proprietários e equipas",
        "Etiquetas de ambiente (prod/dev/staging)",
        "Acompanhamento de alterações em tempo real",
      ],
    },
  ],
  compareLabel: "Porque a Descoberta importa",
  compareTitle: "De pontos cegos a visibilidade total",
  compareOld: "Sem Descoberta",
  compareNew: "Com Opticini Discovery",
  compareRows: [
    { old: "Ativos desconhecidos por todo o lado", new: "Inventário em tempo real completo" },
    { old: "Controlo em folhas de cálculo", new: "Grafo de ativos atualizado automaticamente" },
    { old: "Cegueira ao shadow IT", new: "Ativos não autorizados visíveis de imediato" },
    { old: "CMDB desatualizada", new: "Substituição CMDB contínua e precisa" },
  ],
  outcomeLabel: "Resultado",
  outcomeText:
    "Um único inventário vivo de toda a sua infraestrutura — mantido automaticamente e sempre preciso.",
  ctaTitle: "Veja tudo. Saiba tudo.",
  ctaSubtitle:
    "Descoberta contínua de ativos em toda a sua infraestrutura — sem esforço manual.",
}

const DISCOVERY_RU: DiscoveryI18nPayload = {
  title: "Обнаружение",
  subtitle: "Всё, что существует",
  tagline: "Нельзя управлять, защищать и соответствовать требованиям тому, чего вы не видите.",
  planeNum: 1,
  stats: [
    { value: "100%", label: "охват активов" },
    { value: "В реальном времени", label: "непрерывное обнаружение" },
    { value: "7+", label: "типов активов" },
    { value: "0", label: "таблиц Excel" },
  ],
  posStrong: "Нельзя управлять, защищать и соответствовать требованиям тому, чего вы не видите.",
  posBody:
    "Opticini Discovery даёт единый достоверный обзор каждого актива — локально, в гибриде и в облаке — автоматически и непрерывно.",
  sectionLabel: "Что делает Обнаружение",
  sectionTitle: "От физических серверов до API — живая инвентаризация",
  cards: [
    {
      icon: "🖥️",
      title: "Инфраструктурные активы",
      items: [
        "Физические серверы и ВМ",
        "Облачные инстансы (AWS, Azure, GCP)",
        "Контейнеры и кластеры Kubernetes",
        "Хранилища и базы данных",
      ],
    },
    {
      icon: "🌐",
      title: "Сеть и идентичность",
      items: [
        "Сетевые устройства и межсетевые экраны",
        "API и конечные точки сервисов",
        "Системы идентификации и IAM",
        "DNS и сертификаты",
      ],
    },
    {
      icon: "🔗",
      title: "Связи и контекст",
      items: [
        "Карта зависимостей между активами",
        "Привязка к владельцам и командам",
        "Метки среды (prod/dev/staging)",
        "Отслеживание изменений в реальном времени",
      ],
    },
  ],
  compareLabel: "Почему важно обнаружение",
  compareTitle: "От слепых зон к полной видимости",
  compareOld: "Без обнаружения",
  compareNew: "С Opticini Discovery",
  compareRows: [
    { old: "Неизвестные активы повсюду", new: "Полная живая инвентаризация" },
    { old: "Учёт в таблицах", new: "Автообновляемый граф активов" },
    { old: "Слепота к теневому ИТ", new: "Несанкционированные активы видны сразу" },
    { old: "Устаревшая CMDB", new: "Непрерывная точная замена CMDB" },
  ],
  outcomeLabel: "Итог",
  outcomeText:
    "Единая живая инвентаризация всей инфраструктуры — автоматически поддерживаемая и всегда точная.",
  ctaTitle: "Видеть всё. Знать всё.",
  ctaSubtitle:
    "Непрерывное обнаружение активов по всей инфраструктуре — без ручной работы.",
}

const DISCOVERY_SV: DiscoveryI18nPayload = {
  title: "Upptäckt",
  subtitle: "Allt som finns",
  tagline: "Du kan inte hantera, skydda eller följa regler för det du inte ser.",
  planeNum: 1,
  stats: [
    { value: "100%", label: "täckning av tillgångar" },
    { value: "Realtid", label: "kontinuerlig upptäckt" },
    { value: "7+", label: "tillgångstyper" },
    { value: "0", label: "kalkylark" },
  ],
  posStrong: "Du kan inte hantera, skydda eller följa regler för det du inte ser.",
  posBody:
    "Opticini Discovery ger en enda auktoritativ vy över varje tillgång — lokalt, hybrid och i molnet — automatiskt och kontinuerligt.",
  sectionLabel: "Vad Upptäckt gör",
  sectionTitle: "Från fysiska servrar till API:er — ett levande register",
  cards: [
    {
      icon: "🖥️",
      title: "Infrastrukturtillgångar",
      items: [
        "Fysiska servrar och VM:ar",
        "Molninstanser (AWS, Azure, GCP)",
        "Containrar och Kubernetes-kluster",
        "Lagring och databaser",
      ],
    },
    {
      icon: "🌐",
      title: "Nätverk och identitet",
      items: [
        "Nätverksenheter och brandväggar",
        "API:er och tjänsteendpunkter",
        "Identitetssystem och IAM",
        "DNS och certifikat",
      ],
    },
    {
      icon: "🔗",
      title: "Relationer och kontext",
      items: [
        "Kartläggning av beroenden",
        "Koppling till ägare och team",
        "Miljötaggar (prod/dev/staging)",
        "Realtidsuppföljning av ändringar",
      ],
    },
  ],
  compareLabel: "Varför Upptäckt spelar roll",
  compareTitle: "Från blinda fläckar till full synlighet",
  compareOld: "Utan Upptäckt",
  compareNew: "Med Opticini Discovery",
  compareRows: [
    { old: "Okända tillgångar överallt", new: "Fullständigt levande register" },
    { old: "Spårning i kalkylark", new: "Automatiskt uppdaterad tillgångsgraf" },
    { old: "Blind för skugga-IT", new: "Obehöriga tillgångar syns direkt" },
    { old: "Föråldrad CMDB", new: "Kontinuerlig, korrekt CMDB-ersättning" },
  ],
  outcomeLabel: "Resultat",
  outcomeText:
    "Ett enda levande register över hela din infrastruktur — underhållet automatiskt och alltid korrekt.",
  ctaTitle: "Se allt. Vet allt.",
  ctaSubtitle:
    "Kontinuerlig tillgångsupptäckt i hela din infrastruktur — utan manuellt arbete.",
}

const DISCOVERY_NO: DiscoveryI18nPayload = {
  title: "Oppdagelse",
  subtitle: "Alt som finnes",
  tagline: "Du kan ikke administrere, sikre eller etterleve det du ikke ser.",
  planeNum: 1,
  stats: [
    { value: "100%", label: "dekning av eiendeler" },
    { value: "Sanntid", label: "kontinuerlig oppdagelse" },
    { value: "7+", label: "eiendelstyper" },
    { value: "0", label: "regneark" },
  ],
  posStrong: "Du kan ikke administrere, sikre eller etterleve det du ikke ser.",
  posBody:
    "Opticini Discovery gir én autoritativ oversikt over hver eiendel — lokalt, hybrid og i skyen — automatisk og kontinuerlig.",
  sectionLabel: "Hva Oppdagelse gjør",
  sectionTitle: "Fra fysiske servere til API-er — et levende register",
  cards: [
    {
      icon: "🖥️",
      title: "Infrastruktureiendeler",
      items: [
        "Fysiske servere og VM-er",
        "Skyinstanser (AWS, Azure, GCP)",
        "Containere og Kubernetes-klynger",
        "Lagring og databaser",
      ],
    },
    {
      icon: "🌐",
      title: "Nettverk og identitet",
      items: [
        "Nettverksenheter og brannmurer",
        "API-er og tjenesteendepunkter",
        "Identitetssystemer og IAM",
        "DNS og sertifikater",
      ],
    },
    {
      icon: "🔗",
      title: "Relasjoner og kontekst",
      items: [
        "Avhengighetskartlegging",
        "Tilordning til eiere og team",
        "Miljøtagger (prod/dev/staging)",
        "Sanntidssporing av endringer",
      ],
    },
  ],
  compareLabel: "Hvorfor Oppdagelse betyr noe",
  compareTitle: "Fra blindsoner til full oversikt",
  compareOld: "Uten Oppdagelse",
  compareNew: "Med Opticini Discovery",
  compareRows: [
    { old: "Ukjente eiendeler overalt", new: "Fullstendig levende register" },
    { old: "Sporing i regneark", new: "Automatisk oppdatert eiendelsgraf" },
    { old: "Blind for skygge-IT", new: "Uautoriserte eiendeler synlige med én gang" },
    { old: "Utdatert CMDB", new: "Kontinuerlig, nøyaktig CMDB-erstatning" },
  ],
  outcomeLabel: "Resultat",
  outcomeText:
    "Ett levende register over hele infrastrukturen din — vedlikeholdt automatisk og alltid nøyaktig.",
  ctaTitle: "Se alt. Vit alt.",
  ctaSubtitle:
    "Kontinuerlig eiendelsoppdagelse i hele infrastrukturen din — uten manuelt arbeid.",
}

const DISCOVERY_DA: DiscoveryI18nPayload = {
  title: "Opdagelse",
  subtitle: "Alt hvad der findes",
  tagline: "Du kan ikke administrere, sikre eller leve op til krav om det, du ikke kan se.",
  planeNum: 1,
  stats: [
    { value: "100%", label: "dækning af aktiver" },
    { value: "Realtid", label: "kontinuerlig registrering" },
    { value: "7+", label: "aktivtyper" },
    { value: "0", label: "regneark" },
  ],
  posStrong: "Du kan ikke administrere, sikre eller leve op til krav om det, du ikke kan se.",
  posBody:
    "Opticini Discovery giver ét autoritativt overblik over hvert aktiv — on‑prem, hybrid og i skyen — automatisk og løbende.",
  sectionLabel: "Hvad Opdagelse gør",
  sectionTitle: "Fra fysiske servere til API’er — et levende aktivregister",
  cards: [
    {
      icon: "🖥️",
      title: "Infrastrukturaktiver",
      items: [
        "Fysiske servere og VM’er",
        "Skyinstanser (AWS, Azure, GCP)",
        "Containere og Kubernetes‑clusters",
        "Lagring og databaser",
      ],
    },
    {
      icon: "🌐",
      title: "Netværk og identitet",
      items: [
        "Netværksenheder og firewalls",
        "API’er og serviceendepunkter",
        "Identitetssystemer og IAM",
        "DNS og certifikater",
      ],
    },
    {
      icon: "🔗",
      title: "Relationer og kontekst",
      items: [
        "Kortlægning af afhængigheder",
        "Tildeling til ejere og teams",
        "Miljøtags (prod/dev/staging)",
        "Realtidssporing af ændringer",
      ],
    },
  ],
  compareLabel: "Hvorfor Opdagelse betyder noget",
  compareTitle: "Fra blinde vinkler til fuld synlighed",
  compareOld: "Uden Opdagelse",
  compareNew: "Med Opticini Discovery",
  compareRows: [
    { old: "Ukendte aktiver overalt", new: "Fuldstændigt levende aktivregister" },
    { old: "Sporing i regneark", new: "Automatisk opdateret aktivgraf" },
    { old: "Blindhed over for skygge‑IT", new: "Uautoriserede aktiver synlige med det samme" },
    { old: "Forældet CMDB", new: "Kontinuerlig, præcis CMDB‑erstatning" },
  ],
  outcomeLabel: "Resultat",
  outcomeText:
    "Ét levende aktivregister over hele din infrastruktur — vedligeholdt automatisk og altid præcist.",
  ctaTitle: "Se alt. Vid alt.",
  ctaSubtitle:
    "Kontinuerlig aktivregistrering i hele din infrastruktur — uden manuelt arbejde.",
}

const DISCOVERY_ZH: DiscoveryI18nPayload = {
  title: "发现",
  subtitle: "掌握现有的一切",
  tagline: "看不见的就无法管理、保障安全或满足合规。",
  planeNum: 1,
  stats: [
    { value: "100%", label: "资产覆盖" },
    { value: "实时", label: "持续发现" },
    { value: "7+", label: "资产类型" },
    { value: "0", label: "电子表格" },
  ],
  posStrong: "看不见的就无法管理、保障安全或满足合规。",
  posBody:
    "Opticini Discovery 为每项资产提供单一权威视图——覆盖本地、混合云与公有云——全自动、持续更新。",
  sectionLabel: "发现能力",
  sectionTitle: "从物理服务器到 API——动态资产清单",
  cards: [
    {
      icon: "🖥️",
      title: "基础设施资产",
      items: [
        "物理服务器与虚拟机",
        "云实例（AWS、Azure、GCP）",
        "容器与 Kubernetes 集群",
        "存储与数据库",
      ],
    },
    {
      icon: "🌐",
      title: "网络与身份",
      items: [
        "网络设备与防火墙",
        "API 与服务端点",
        "身份系统与 IAM",
        "DNS 与证书",
      ],
    },
    {
      icon: "🔗",
      title: "关系与上下文",
      items: [
        "资产依赖关系映射",
        "归属团队与负责人",
        "环境标签（生产/开发/预发布）",
        "实时变更追踪",
      ],
    },
  ],
  compareLabel: "为何发现至关重要",
  compareTitle: "从盲区到全面可视",
  compareOld: "没有发现能力",
  compareNew: "使用 Opticini Discovery",
  compareRows: [
    { old: "到处都有未知资产", new: "完整、实时资产清单" },
    { old: "用表格手工跟踪", new: "自动更新的资产关系图" },
    { old: "对影子 IT 视而不见", new: "未授权资产即刻可见" },
    { old: "CMDB 数据陈旧", new: "持续、准确的 CMDB 替代方案" },
  ],
  outcomeLabel: "成果",
  outcomeText: "一份覆盖全部基础设施的动态清单——自动维护、始终准确。",
  ctaTitle: "看清一切。掌握一切。",
  ctaSubtitle: "在全基础设施范围内持续发现资产——无需手工维护。",
}

const DISCOVERY_JA: DiscoveryI18nPayload = {
  title: "ディスカバリー",
  subtitle: "存在するすべてを把握",
  tagline: "見えないものは、管理もセキュリティもコンプライアンスもできません。",
  planeNum: 1,
  stats: [
    { value: "100%", label: "資産カバレッジ" },
    { value: "リアルタイム", label: "継続的な検出" },
    { value: "7+", label: "資産タイプ" },
    { value: "0", label: "スプレッドシート" },
  ],
  posStrong: "見えないものは、管理もセキュリティもコンプライアンスもできません。",
  posBody:
    "Opticini Discovery は、オンプレミス・ハイブリッド・クラウドのすべての資産について、単一の信頼できるビューを自動かつ継続的に提供します。",
  sectionLabel: "ディスカバリーの役割",
  sectionTitle: "物理サーバーから API まで——生きたインベントリ",
  cards: [
    {
      icon: "🖥️",
      title: "インフラ資産",
      items: [
        "物理サーバーと VM",
        "クラウドインスタンス（AWS、Azure、GCP）",
        "コンテナと Kubernetes クラスター",
        "ストレージとデータベース",
      ],
    },
    {
      icon: "🌐",
      title: "ネットワークとアイデンティティ",
      items: [
        "ネットワーク機器とファイアウォール",
        "API とサービスエンドポイント",
        "アイデンティティシステムと IAM",
        "DNS と証明書",
      ],
    },
    {
      icon: "🔗",
      title: "関係性とコンテキスト",
      items: [
        "資産間の依存関係マッピング",
        "オーナーとチームへの紐付け",
        "環境タグ（本番/開発/ステージング）",
        "変更のリアルタイム追跡",
      ],
    },
  ],
  compareLabel: "ディスカバリーが重要な理由",
  compareTitle: "死角から全体可視化へ",
  compareOld: "ディスカバリーなし",
  compareNew: "Opticini Discovery あり",
  compareRows: [
    { old: "どこにでも未知の資産", new: "完全なライブインベントリ" },
    { old: "スプレッドシートでの追跡", new: "自動更新される資産グラフ" },
    { old: "シャドウ IT が見えない", new: "不正な資産を即座に可視化" },
    { old: "古い CMDB", new: "継続的で正確な CMDB 置き換え" },
  ],
  outcomeLabel: "成果",
  outcomeText:
    "インフラ全体をカバーする単一のライブインベントリ——自動で維持され、常に正確です。",
  ctaTitle: "すべてを見る。すべてを知る。",
  ctaSubtitle: "インフラ全体で資産を継続的に検出——手作業は不要です。",
}

const DISCOVERY_KO: DiscoveryI18nPayload = {
  title: "디스커버리",
  subtitle: "존재하는 모든 것을 파악",
  tagline: "보이지 않는 것은 관리·보안·규정 준수의 대상이 될 수 없습니다.",
  planeNum: 1,
  stats: [
    { value: "100%", label: "자산 커버리지" },
    { value: "실시간", label: "지속적 탐지" },
    { value: "7+", label: "자산 유형" },
    { value: "0", label: "스프레드시트" },
  ],
  posStrong: "보이지 않는 것은 관리·보안·규정 준수의 대상이 될 수 없습니다.",
  posBody:
    "Opticini Discovery는 온프레미스·하이브리드·클라우드의 모든 자산에 대해 단일하고 신뢰할 수 있는 뷰를 자동으로 지속 제공합니다.",
  sectionLabel: "디스커버리가 하는 일",
  sectionTitle: "물리 서버부터 API까지 — 살아 있는 인벤토리",
  cards: [
    {
      icon: "🖥️",
      title: "인프라 자산",
      items: [
        "물리 서버 및 VM",
        "클라우드 인스턴스(AWS, Azure, GCP)",
        "컨테이너 및 Kubernetes 클러스터",
        "스토리지 및 데이터베이스",
      ],
    },
    {
      icon: "🌐",
      title: "네트워크 및 신원",
      items: [
        "네트워크 장비 및 방화벽",
        "API 및 서비스 엔드포인트",
        "신원 시스템 및 IAM",
        "DNS 및 인증서",
      ],
    },
    {
      icon: "🔗",
      title: "관계 및 맥락",
      items: [
        "자산 간 의존성 매핑",
        "소유자 및 팀 귀속",
        "환경 태그(prod/dev/staging)",
        "실시간 변경 추적",
      ],
    },
  ],
  compareLabel: "디스커버리가 중요한 이유",
  compareTitle: "사각지대에서 전체 가시성으로",
  compareOld: "디스커버리 없음",
  compareNew: "Opticini Discovery 사용",
  compareRows: [
    { old: "어디에나 알 수 없는 자산", new: "완전한 라이브 인벤토리" },
    { old: "스프레드시트로 추적", new: "자동 갱신 자산 그래프" },
    { old: "섀도 IT에 눈멀음", new: "무단 자산 즉시 노출" },
    { old: "오래된 CMDB", new: "지속적이고 정확한 CMDB 대체" },
  ],
  outcomeLabel: "결과",
  outcomeText:
    "전체 인프라를 아우르는 단일 라이브 인벤토리 — 자동으로 유지되며 항상 정확합니다.",
  ctaTitle: "모두 보기. 모두 앎.",
  ctaSubtitle: "전 인프라에 걸친 지속적 자산 탐지 — 수작업 없이.",
}

const DISCOVERY_HI: DiscoveryI18nPayload = {
  title: "डिस्कवरी",
  subtitle: "जो कुछ मौजूद है, सब जानें",
  tagline: "जो दिखाई नहीं देता, उसे आप प्रबंधित, सुरक्षित या अनुपालन में नहीं ला सकते।",
  planeNum: 1,
  stats: [
    { value: "100%", label: "संपत्ति कवरेज" },
    { value: "रीयल-टाइम", label: "निरंतर खोज" },
    { value: "7+", label: "संपत्ति प्रकार" },
    { value: "0", label: "स्प्रेडशीट" },
  ],
  posStrong: "जो दिखाई नहीं देता, उसे आप प्रबंधित, सुरक्षित या अनुपालन में नहीं ला सकते।",
  posBody:
    "Opticini Discovery हर संपत्ति का एक ही विश्वसनीय दृश्य देता है — ऑन-प्रिमाइस, हाइब्रिड और क्लाउड — स्वचालित और निरंतर।",
  sectionLabel: "डिस्कवरी क्या करती है",
  sectionTitle: "भौतिक सर्वर से API तक — जीवंत इन्वेंटरी",
  cards: [
    {
      icon: "🖥️",
      title: "इन्फ्रास्ट्रक्चर संपत्तियाँ",
      items: [
        "भौतिक सर्वर और VM",
        "क्लाउड इंस्टेंस (AWS, Azure, GCP)",
        "कंटेनर और Kubernetes क्लस्टर",
        "स्टोरेज और डेटाबेस",
      ],
    },
    {
      icon: "🌐",
      title: "नेटवर्क और पहचान",
      items: [
        "नेटवर्क उपकरण और फ़ायरवॉल",
        "API और सेवा एंडपॉइंट",
        "पहचान प्रणाली और IAM",
        "DNS और प्रमाणपत्र",
      ],
    },
    {
      icon: "🔗",
      title: "संबंध और संदर्भ",
      items: [
        "संपत्तियों के बीच निर्भरता मैपिंग",
        "मालिकों और टीमों को आवंटन",
        "पर्यावरण टैग (prod/dev/staging)",
        "रीयल-टाइम में परिवर्तन ट्रैकिंग",
      ],
    },
  ],
  compareLabel: "डिस्कवरी क्यों मायने रखती है",
  compareTitle: "अंधे कोनों से पूर्ण दृश्यता तक",
  compareOld: "डिस्कवरी के बिना",
  compareNew: "Opticini Discovery के साथ",
  compareRows: [
    { old: "हर जगह अज्ञात संपत्तियाँ", new: "पूर्ण लाइव इन्वेंटरी" },
    { old: "स्प्रेडशीट में ट्रैकिंग", new: "स्वतः अपडेट होने वाला संपत्ति ग्राफ" },
    { old: "शैडो IT पर अंधापन", new: "अनधिकृत संपत्तियाँ तुरंत दिखाई देती हैं" },
    { old: "पुराना CMDB डेटा", new: "निरंतर, सटीक CMDB प्रतिस्थापन" },
  ],
  outcomeLabel: "परिणाम",
  outcomeText:
    "आपके पूरे इन्फ्रास्ट्रक्चर की एक जीवंत इन्वेंटरी — स्वचालित रूप से अपडेट और हमेशा सटीक।",
  ctaTitle: "सब देखें। सब जानें।",
  ctaSubtitle: "पूरे इन्फ्रास्ट्रक्चर में निरंतर संपत्ति खोज — बिना मैनुअल प्रयास के।",
}

const DISCOVERY_AR: DiscoveryI18nPayload = {
  title: "الاكتشاف",
  subtitle: "اعرف كل ما موجود",
  tagline: "لا يمكنك إدارة أو تأمين أو الامتثال لما لا تراه.",
  planeNum: 1,
  stats: [
    { value: "100%", label: "تغطية الأصول" },
    { value: "فوري", label: "اكتشاف مستمر" },
    { value: "7+", label: "أنواع أصول" },
    { value: "0", label: "جداول بيانات" },
  ],
  posStrong: "لا يمكنك إدارة أو تأمين أو الامتثال لما لا تراه.",
  posBody:
    "يمنحك Opticini Discovery رؤية موحّدة وموثوقة لكل أصل — محليًا وهجينًا وسحابيًا — تلقائيًا وباستمرار.",
  sectionLabel: "ماذا يفعل الاكتشاف",
  sectionTitle: "من الخوادم الفعلية إلى واجهات API — جرد حي",
  cards: [
    {
      icon: "🖥️",
      title: "أصول البنية التحتية",
      items: [
        "خوادم فعلية وأجهزة افتراضية",
        "مثيلات سحابية (AWS وAzure وGCP)",
        "حاويات ومجموعات Kubernetes",
        "تخزين وقواعد بيانات",
      ],
    },
    {
      icon: "🌐",
      title: "الشبكة والهوية",
      items: [
        "أجهزة شبكة وجدران نارية",
        "واجهات API ونقاط نهاية الخدمة",
        "أنظمة الهوية وIAM",
        "DNS وشهادات",
      ],
    },
    {
      icon: "🔗",
      title: "العلاقات والسياق",
      items: [
        "رسم خريطة الاعتماديات بين الأصول",
        "إسناد للمالكين والفرق",
        "وسوم البيئة (prod/dev/staging)",
        "تتبع التغييرات في الوقت الفعلي",
      ],
    },
  ],
  compareLabel: "لماذا يهم الاكتشاف",
  compareTitle: "من النقاط العمياء إلى رؤية كاملة",
  compareOld: "بدون اكتشاف",
  compareNew: "مع Opticini Discovery",
  compareRows: [
    { old: "أصول غير معروفة في كل مكان", new: "جرد حي كامل" },
    { old: "تتبع في جداول", new: "رسم بياني للأصول يتحدّث تلقائيًا" },
    { old: "عمى تجاه IT الظلّي", new: "أصول غير مصرّح بها تظهر فورًا" },
    { old: "بيانات CMDB قديمة", new: "استبدال CMDB مستمر ودقيق" },
  ],
  outcomeLabel: "النتيجة",
  outcomeText:
    "جرد حي واحد لكل بنيتك التحتية — يُحدَّث تلقائيًا ويبقى دقيقًا دائمًا.",
  ctaTitle: "أبصر كل شيء. اعلم كل شيء.",
  ctaSubtitle: "اكتشاف مستمر للأصول عبر بنيتك التحتية — دون جهد يدوي.",
}

const DISCOVERY_HE: DiscoveryI18nPayload = {
  title: "גילוי",
  subtitle: "כל מה שקיים",
  tagline: "אי אפשר לנהל, לאבטח או לעמוד בדרישות מה שלא רואים.",
  planeNum: 1,
  stats: [
    { value: "100%", label: "כיסוי נכסים" },
    { value: "בזמן אמת", label: "גילוי רציף" },
    { value: "7+", label: "סוגי נכסים" },
    { value: "0", label: "גיליונות אלקטרוניים" },
  ],
  posStrong: "אי אפשר לנהל, לאבטח או לעמוד בדרישות מה שלא רואים.",
  posBody:
    "Opticini Discovery מספק תצוגה אחת סמכותית לכל נכס — במקום, היברידי וענן — באופן אוטומטי ורציף.",
  sectionLabel: "מה גילוי עושה",
  sectionTitle: "משרתים פיזיים ועד API — מלאי חי",
  cards: [
    {
      icon: "🖥️",
      title: "נכסי תשתית",
      items: [
        "שרתים פיזיים ומכונות וירטואליות",
        "מופעי ענן (AWS, Azure, GCP)",
        "מיכלים ואשכולות Kubernetes",
        "אחסון ומסדי נתונים",
      ],
    },
    {
      icon: "🌐",
      title: "רשת וזהות",
      items: [
        "ציוד רשת וחומות אש",
        "API ונקודות קצה של שירותים",
        "מערכות זהות ו-IAM",
        "DNS ותעודות",
      ],
    },
    {
      icon: "🔗",
      title: "קשרים והקשר",
      items: [
        "מיפוי תלויות בין נכסים",
        "שיוך לבעלים ולצוותים",
        "תגי סביבה (prod/dev/staging)",
        "מעקב שינויים בזמן אמת",
      ],
    },
  ],
  compareLabel: "למה גילוי חשוב",
  compareTitle: "מעיוורון לרואות הכל",
  compareOld: "בלי גילוי",
  compareNew: "עם Opticini Discovery",
  compareRows: [
    { old: "נכסים לא ידועים בכל מקום", new: "מלאי חי מלא" },
    { old: "מעקב בגיליונות", new: "גרף נכסים שמתעדכן אוטומטית" },
    { old: "עיוורון ל-IT צללי", new: "נכסים לא מורשים נראים מיד" },
    { old: "CMDB מיושן", new: "החלפת CMDB רציפה ומדויקת" },
  ],
  outcomeLabel: "תוצאה",
  outcomeText:
    "מלאי חי אחד לכל התשתית שלך — מתוחזק אוטומטית ותמיד מדויק.",
  ctaTitle: "לראות הכל. לדעת הכל.",
  ctaSubtitle: "גילוי נכסים רציף בכל התשתית — בלי עבודה ידנית.",
}

function patch(
  planeInsight: string,
  payload: DiscoveryI18nPayload
): DiscoveryPagePatch {
  return {
    featureUi: { planeInsight },
    features: { discovery: payload },
  }
}

/** Merged after landing + sparse so full Discovery copy wins for each locale. */
export const DISCOVERY_PAGE_PATCH_BY_LANG: Record<string, DiscoveryPagePatch> = {
  es: patch("Plano de insight {{num}}", DISCOVERY_ES),
  fr: patch("Plan d’insight {{num}}", DISCOVERY_FR),
  de: patch("Insight-Ebene {{num}}", DISCOVERY_DE),
  it: patch("Piano insight {{num}}", DISCOVERY_IT),
  pt: patch("Plano de insights {{num}}", DISCOVERY_PT),
  ru: patch("Плоскость инсайтов {{num}}", DISCOVERY_RU),
  sv: patch("Insiktsplan {{num}}", DISCOVERY_SV),
  no: patch("Innsiktsplan {{num}}", DISCOVERY_NO),
  da: patch("Indsigtsplan {{num}}", DISCOVERY_DA),
  zh: patch("洞察平面 {{num}}", DISCOVERY_ZH),
  ja: patch("インサイトプレーン {{num}}", DISCOVERY_JA),
  ko: patch("인사이트 플레인 {{num}}", DISCOVERY_KO),
  hi: patch("इनसाइट प्लेन {{num}}", DISCOVERY_HI),
  ar: patch("مستوى الرؤية {{num}}", DISCOVERY_AR),
  he: patch("מישור תובנה {{num}}", DISCOVERY_HE),
}
