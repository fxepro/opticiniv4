export type WorkspaceAppId =
  | "home"
  | "discovery"
  | "health"
  | "performance"
  | "security"
  | "configuration"
  | "compliance"
  | "evidence"
  | "change"
  | "cost"
  | "risk"
  | "admin"
  | "account"
  | "collateral"
  | "integrations";

export interface WorkspaceApp {
  id: WorkspaceAppId;
  label: string;
  icon: string;
  matchIds: string[];
  matchTitles: string[];
  pathPrefixes: string[];
  fallbackHref?: string;
  isUtility?: boolean;
}

const normalize = (value: string | undefined | null) =>
  (value ?? "").toLowerCase().trim();

export const WORKSPACE_APPS: WorkspaceApp[] = [
  {
    id: "home",
    label: "Home",
    icon: "Home",
    matchIds: ["workspace"],
    matchTitles: ["workspace", "home"],
    pathPrefixes: ["/workspace/home"],
    fallbackHref: "/workspace/home",
  },
  {
    id: "discovery",
    label: "Discovery",
    icon: "Search",
    matchIds: ["discovery"],
    matchTitles: ["discovery"],
    pathPrefixes: ["/workspace/discovery", "/workspace/discovery/overview"],
    fallbackHref: "/workspace/discovery/overview",
  },
  {
    id: "health",
    label: "Health",
    icon: "Heart",
    matchIds: ["health"],
    matchTitles: ["health"],
    pathPrefixes: ["/workspace/health", "/workspace/health/overview", "/workspace/monitoring"],
    fallbackHref: "/workspace/health/overview",
  },
  {
    id: "performance",
    label: "Performance",
    icon: "Zap",
    matchIds: ["performance", "user_features", "my_tools", "tools"],
    matchTitles: ["performance", "my tools", "tools", "user features"],
    pathPrefixes: ["/workspace/performance", "/workspace/performance/overview"],
    fallbackHref: "/workspace/performance/overview",
  },
  {
    id: "security",
    label: "Security",
    icon: "Shield",
    matchIds: ["security", "security_monitoring", "security-audit"],
    matchTitles: ["security"],
    pathPrefixes: ["/workspace/security", "/workspace/security/overview", "/workspace/security-monitoring"],
    fallbackHref: "/workspace/security/overview",
  },
  {
    id: "configuration",
    label: "Configuration",
    icon: "Settings",
    matchIds: ["configuration"],
    matchTitles: ["configuration"],
    pathPrefixes: ["/workspace/configuration", "/workspace/configuration/overview"],
    fallbackHref: "/workspace/configuration/overview",
  },
  {
    id: "compliance",
    label: "Compliance",
    icon: "FileCheck",
    matchIds: ["compliance"],
    matchTitles: ["compliance"],
    pathPrefixes: ["/workspace/compliance"],
    fallbackHref: "/workspace/compliance/overview",
  },
  {
    id: "evidence",
    label: "Evidence",
    icon: "FolderOpen",
    matchIds: ["evidence"],
    matchTitles: ["evidence"],
    pathPrefixes: ["/workspace/evidence", "/workspace/evidence/overview"],
    fallbackHref: "/workspace/evidence/overview",
  },
  {
    id: "change",
    label: "Change",
    icon: "GitBranch",
    matchIds: ["change"],
    matchTitles: ["change"],
    pathPrefixes: ["/workspace/change", "/workspace/change/overview"],
    fallbackHref: "/workspace/change/overview",
  },
  {
    id: "cost",
    label: "Cost",
    icon: "DollarSign",
    matchIds: ["cost"],
    matchTitles: ["cost"],
    pathPrefixes: ["/workspace/cost", "/workspace/cost/overview"],
    fallbackHref: "/workspace/cost/overview",
  },
  {
    id: "risk",
    label: "Risk",
    icon: "AlertTriangle",
    matchIds: ["risk"],
    matchTitles: ["risk"],
    pathPrefixes: ["/workspace/risk", "/workspace/risk/overview"],
    fallbackHref: "/workspace/risk/overview",
  },
  {
    id: "admin",
    label: "Admin",
    icon: "LayoutDashboard",
    matchIds: ["admin", "admin_overview", "administration"],
    matchTitles: ["admin", "administration"],
    pathPrefixes: ["/workspace/admin-overview"],
    fallbackHref: "/workspace/admin-overview",
    isUtility: true,
  },
  {
    id: "account",
    label: "Account",
    icon: "User",
    matchIds: ["account"],
    matchTitles: ["account"],
    pathPrefixes: ["/workspace/account"],
    fallbackHref: "/workspace/account",
    isUtility: true,
  },
  {
    id: "collateral",
    label: "Collateral",
    icon: "GraduationCap",
    matchIds: ["collateral", "collateral_management"],
    matchTitles: ["collateral"],
    pathPrefixes: ["/workspace/collateral", "/workspace/collateral-management"],
    fallbackHref: "/workspace/collateral",
    isUtility: true,
  },
  {
    id: "integrations",
    label: "Integrations",
    icon: "Plug",
    matchIds: ["integrations", "communication"],
    matchTitles: ["integrations", "communication"],
    pathPrefixes: ["/workspace/integrations", "/workspace/communication"],
    fallbackHref: "/workspace/integrations",
    isUtility: true,
  },
];

/** Main sidebar display order and separators. Use in main-sidebar for icon strip. */
export const SIDEBAR_ORDER: (WorkspaceAppId | "separator")[] = [
  "home",
  "separator",
  "discovery",
  "health",
  "performance",
  "configuration",
  "cost",
  "separator",
  "risk",
  "compliance",
  "evidence",
  "security",
  "change",
  "separator",
  "account",
  "separator",
  "collateral",
  "integrations",
  "separator",
  "admin",
];

export const isWorkspaceAppId = (
  value: string | null | undefined
): value is WorkspaceAppId =>
  WORKSPACE_APPS.some((app) => app.id === value);

export const sectionMatchesApp = (
  section: { id?: string; title?: string },
  appId: WorkspaceAppId
) => {
  const app = WORKSPACE_APPS.find((item) => item.id === appId);
  if (!app) return false;
  const sectionId = normalize(section.id);
  const sectionTitle = normalize(section.title);
  return (
    app.matchIds.some((id) => normalize(id) === sectionId) ||
    app.matchTitles.some((title) => normalize(title) === sectionTitle)
  );
};

export const getDefaultAppId = (navigation: {
  sections?: { id?: string; title?: string; items?: { href?: string }[] }[];
}) => {
  const sections = navigation?.sections ?? [];
  const primaryApps = WORKSPACE_APPS.filter((app) => !app.isUtility);
  for (const app of primaryApps) {
    if (sections.some((section) => sectionMatchesApp(section, app.id))) {
      return app.id;
    }
  }
  return primaryApps[0]?.id ?? null;
};

export const getDefaultHrefForApp = (
  navigation: { sections?: { id?: string; title?: string; items?: { href?: string }[] }[] } | null,
  appId: WorkspaceAppId
) => {
  const sections = navigation?.sections ?? [];
  const app = WORKSPACE_APPS.find((item) => item.id === appId);
  const matchingSections = sections.filter((section) =>
    sectionMatchesApp(section, appId)
  );
  for (const section of matchingSections) {
    const firstItem = section.items?.find((item) => item.href);
    if (firstItem?.href) {
      return firstItem.href;
    }
  }
  return app?.fallbackHref ?? "/workspace";
};

export const getAppIdForPath = (
  navigation: { sections?: { id?: string; title?: string; items?: { href?: string }[] }[] } | null,
  pathname: string
): WorkspaceAppId | null => {
  if (pathname === "/workspace" || pathname === "/workspace/") return "home";

  const sections = navigation?.sections ?? [];
  let bestMatch: { section: { id?: string; title?: string }; hrefLength: number } | null = null;

  for (const section of sections) {
    for (const item of section.items ?? []) {
      const href = item.href;
      if (!href) continue;
      if (pathname === href || pathname.startsWith(`${href}/`)) {
        if (!bestMatch || href.length > bestMatch.hrefLength) {
          bestMatch = { section, hrefLength: href.length };
        }
      }
    }
  }

  if (bestMatch) {
    const appId = WORKSPACE_APPS.find((app) =>
      sectionMatchesApp(bestMatch.section, app.id)
    )?.id;
    if (appId) return appId;
  }

  for (const app of WORKSPACE_APPS) {
    for (const prefix of app.pathPrefixes) {
      if (pathname === prefix || pathname.startsWith(`${prefix}/`)) {
        return app.id;
      }
    }
  }

  return null;
};
