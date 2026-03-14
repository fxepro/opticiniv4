import type { FeatureDetailConfig } from "@/components/feature-detail-page";

const blue = {
  primary: "#2563eb",
  badgeBg: "#eff6ff",
  badgeBorder: "#bfdbfe",
  taglineBg: "#eff6ff",
  taglineBorder: "#bfdbfe",
  cardIconBg: "#eff6ff",
  outcomeBorder: "#bfdbfe",
  outcomeBg: "#eff6ff",
  ctaGradient: "linear-gradient(160deg,#1e3a8a,#2563eb,#3b82f6)",
  ctaBtnColor: "#1e3a8a",
};

const green = {
  primary: "#10b981",
  badgeBg: "#f0fdf4",
  badgeBorder: "#a7f3d0",
  taglineBg: "#f0fdf4",
  taglineBorder: "#a7f3d0",
  cardIconBg: "#f0fdf4",
  outcomeBorder: "#a7f3d0",
  outcomeBg: "#f0fdf4",
  ctaGradient: "linear-gradient(160deg,#065f46,#059669,#10b981)",
  ctaBtnColor: "#065f46",
};

const amber = {
  primary: "#f59e0b",
  badgeBg: "#fffbeb",
  badgeBorder: "#fde68a",
  taglineBg: "#fffbeb",
  taglineBorder: "#fde68a",
  cardIconBg: "#fffbeb",
  outcomeBorder: "#fde68a",
  outcomeBg: "#fffbeb",
  ctaGradient: "linear-gradient(160deg,#78350f,#d97706,#f59e0b)",
  ctaBtnColor: "#78350f",
};

const red = {
  primary: "#ef4444",
  badgeBg: "#fef2f2",
  badgeBorder: "#fecaca",
  taglineBg: "#fef2f2",
  taglineBorder: "#fecaca",
  cardIconBg: "#fef2f2",
  outcomeBorder: "#fecaca",
  outcomeBg: "#fef2f2",
  ctaGradient: "linear-gradient(160deg,#7f1d1d,#dc2626,#ef4444)",
  ctaBtnColor: "#7f1d1d",
};

const teal = {
  primary: "#14b8a6",
  badgeBg: "#f0fdf4",
  badgeBorder: "#99f6e4",
  taglineBg: "#f0fdf4",
  taglineBorder: "#99f6e4",
  cardIconBg: "#f0fdf4",
  outcomeBorder: "#99f6e4",
  outcomeBg: "#f0fdf4",
  ctaGradient: "linear-gradient(160deg,#134e4a,#0d9488,#14b8a6)",
  ctaBtnColor: "#134e4a",
};

const indigo = {
  primary: "#6366f1",
  badgeBg: "#eef2ff",
  badgeBorder: "#c7d2fe",
  taglineBg: "#eef2ff",
  taglineBorder: "#c7d2fe",
  cardIconBg: "#eef2ff",
  outcomeBorder: "#c7d2fe",
  outcomeBg: "#eef2ff",
  ctaGradient: "linear-gradient(160deg,#312e81,#4f46e5,#6366f1)",
  ctaBtnColor: "#312e81",
};

const purple = {
  primary: "#8b5cf6",
  badgeBg: "#faf5ff",
  badgeBorder: "#ddd6fe",
  taglineBg: "#faf5ff",
  taglineBorder: "#ddd6fe",
  cardIconBg: "#faf5ff",
  outcomeBorder: "#ddd6fe",
  outcomeBg: "#faf5ff",
  ctaGradient: "linear-gradient(160deg,#4c1d95,#7c3aed,#8b5cf6)",
  ctaBtnColor: "#4c1d95",
};

const orange = {
  primary: "#f97316",
  badgeBg: "#fff7ed",
  badgeBorder: "#fed7aa",
  taglineBg: "#fff7ed",
  taglineBorder: "#fed7aa",
  cardIconBg: "#fff7ed",
  outcomeBorder: "#fed7aa",
  outcomeBg: "#fff7ed",
  ctaGradient: "linear-gradient(160deg,#7c2d12,#ea580c,#f97316)",
  ctaBtnColor: "#7c2d12",
};

const cyan = {
  primary: "#0ea5e9",
  badgeBg: "#f0f9ff",
  badgeBorder: "#bae6fd",
  taglineBg: "#f0f9ff",
  taglineBorder: "#bae6fd",
  cardIconBg: "#f0f9ff",
  outcomeBorder: "#bae6fd",
  outcomeBg: "#f0f9ff",
  ctaGradient: "linear-gradient(160deg,#0c4a6e,#0284c7,#0ea5e9)",
  ctaBtnColor: "#0c4a6e",
};

const riskRed = {
  primary: "#dc2626",
  badgeBg: "#fff1f2",
  badgeBorder: "#fecdd3",
  taglineBg: "#fff1f2",
  taglineBorder: "#fecdd3",
  cardIconBg: "#fff1f2",
  outcomeBorder: "#fecdd3",
  outcomeBg: "#fff1f2",
  ctaGradient: "linear-gradient(160deg,#7f1d1d,#b91c1c,#dc2626)",
  ctaBtnColor: "#7f1d1d",
};

export const discoveryConfig: FeatureDetailConfig = {
  title: "Discovery",
  subtitle: "Know everything that exists",
  tagline: "You can't manage, secure, or comply with what you can't see.",
  planeNum: 1,
  stats: [
    { value: "100%", label: "asset coverage" },
    { value: "Real-time", label: "continuous discovery" },
    { value: "7+", label: "asset types" },
    { value: "0", label: "spreadsheets" },
  ],
  posStrong: "You can't manage, secure, or comply with what you can't see.",
  posBody:
    "Opticini Discovery provides a single, authoritative view of every asset across your local, hybrid, and cloud environments — automatically and continuously.",
  sectionLabel: "What Discovery Does",
  sectionTitle: "From physical servers to APIs — one living inventory",
  cards: [
    {
      icon: "🖥️",
      title: "Infrastructure Assets",
      items: [
        "Physical servers & VMs",
        "Cloud instances (AWS, Azure, GCP)",
        "Containers & Kubernetes clusters",
        "Storage & databases",
      ],
    },
    {
      icon: "🌐",
      title: "Network & Identity",
      items: [
        "Network devices & firewalls",
        "APIs & service endpoints",
        "Identity systems & IAM",
        "DNS & certificates",
      ],
    },
    {
      icon: "🔗",
      title: "Relationships & Context",
      items: [
        "Asset dependency mapping",
        "Owner & team attribution",
        "Environment tagging (prod/dev/staging)",
        "Real-time change tracking",
      ],
    },
  ],
  compareLabel: "Why Discovery Matters",
  compareTitle: "From blind spots to complete visibility",
  compareOld: "Without Discovery",
  compareNew: "With Opticini Discovery",
  compareRows: [
    { old: "Unknown assets everywhere", new: "Complete live inventory" },
    { old: "Spreadsheet-based tracking", new: "Auto-updated asset graph" },
    { old: "Shadow IT blindness", new: "Unauthorized assets surfaced instantly" },
    { old: "Stale CMDB data", new: "Continuous, accurate CMDB replacement" },
  ],
  outcomeLabel: "Outcome",
  outcomeText:
    "A single, living inventory of everything in your infrastructure — automatically maintained, always accurate.",
  ctaTitle: "See everything. Know everything.",
  ctaSubtitle:
    "Continuous asset discovery across your entire infrastructure — no manual effort required.",
  colors: blue,
};

export const healthConfig: FeatureDetailConfig = {
  title: "Health",
  subtitle: "Availability is the foundation of trust",
  tagline: "Availability is the foundation of trust. You need to know before your users do.",
  planeNum: 2,
  stats: [
    { value: "99.9%", label: "SLA visibility" },
    { value: "<30s", label: "alert latency" },
    { value: "Real-time", label: "health scoring" },
    { value: "Proactive", label: "failure detection" },
  ],
  posStrong: "Availability is the foundation of trust. You need to know before your users do.",
  posBody:
    "Opticini Health gives you continuous visibility into the operational health of every system — with intelligent alerting, dependency-aware status, and SLA tracking built in.",
  sectionLabel: "What Health Does",
  sectionTitle: "Know what's degrading before it becomes an outage",
  cards: [
    {
      icon: "💓",
      title: "Continuous Monitoring",
      items: [
        "Real-time availability checks",
        "Service health scoring",
        "Uptime & SLA tracking",
        "Historical trends & patterns",
      ],
    },
    {
      icon: "🔗",
      title: "Dependency-Aware Status",
      items: [
        "Service dependency mapping",
        "Downstream impact analysis",
        "Single point of failure detection",
        "Blast radius estimation",
      ],
    },
    {
      icon: "🔔",
      title: "Intelligent Alerting",
      items: [
        "Context-aware alert routing",
        "Noise reduction & deduplication",
        "Escalation policies",
        "Slack, PagerDuty, email integrations",
      ],
    },
  ],
  compareLabel: "Why Health Matters",
  compareTitle: "From reactive firefighting to proactive awareness",
  compareOld: "Without Health Monitoring",
  compareNew: "With Opticini Health",
  compareRows: [
    { old: "Users report outages first", new: "Proactive detection before impact" },
    { old: "Alert storms & noise", new: "Intelligent, deduplicated alerts" },
    { old: "Unknown dependencies", new: "Full dependency context" },
    { old: "Missed SLA commitments", new: "Continuous SLA tracking" },
  ],
  outcomeLabel: "Outcome",
  outcomeText:
    "Always-on visibility into what's working, what's degrading, and what's about to fail — before users notice.",
  ctaTitle: "Know before your users do",
  ctaSubtitle:
    "Continuous health monitoring across every system, service, and dependency.",
  colors: green,
};

export const performanceConfig: FeatureDetailConfig = {
  title: "Performance",
  subtitle: "Performance issues erode trust long before they cause outages",
  tagline: "Slow is the new down. Performance issues erode trust long before they cause outages.",
  planeNum: 3,
  stats: [
    { value: "P99", label: "latency tracking" },
    { value: "Real-time", label: "resource metrics" },
    { value: "Auto", label: "baseline learning" },
    { value: "Full", label: "stack visibility" },
  ],
  posStrong: "Performance issues erode trust long before they cause outages.",
  posBody:
    "Opticini Performance gives you deep visibility into how infrastructure, services, and workloads are consuming resources — with anomaly detection that finds problems before users feel them.",
  sectionLabel: "What Performance Does",
  sectionTitle: "From isolated metrics to contextual performance intelligence",
  cards: [
    {
      icon: "⚡",
      title: "Resource Metrics",
      items: [
        "CPU, memory, disk, network I/O",
        "Container & pod resource usage",
        "Database query performance",
        "Network throughput & latency",
      ],
    },
    {
      icon: "📈",
      title: "Anomaly Detection",
      items: [
        "Dynamic baseline learning",
        "Deviation & spike detection",
        "Seasonal & trend awareness",
        "Capacity forecasting",
      ],
    },
    {
      icon: "🔍",
      title: "Context & Causality",
      items: [
        "Correlated with change events",
        "Root cause suggestions",
        "Cost efficiency correlation",
        "Right-sizing recommendations",
      ],
    },
  ],
  compareLabel: "Why Performance Matters",
  compareTitle: "From blind metrics to actionable insight",
  compareOld: "Without Performance Visibility",
  compareNew: "With Opticini Performance",
  compareRows: [
    { old: "Reactive to slowdowns", new: "Proactive anomaly detection" },
    { old: "Siloed metric dashboards", new: "Unified full-stack view" },
    { old: "Overprovisioned waste", new: "Right-sizing recommendations" },
    { old: "Unknown capacity limits", new: "Predictive capacity forecasting" },
  ],
  outcomeLabel: "Outcome",
  outcomeText:
    "Infrastructure that performs at its best — with anomalies detected early, resources right-sized, and capacity planned ahead.",
  ctaTitle: "Find performance problems before users do",
  ctaSubtitle:
    "Continuous resource monitoring with intelligent anomaly detection across your full stack.",
  colors: amber,
};

export const securityConfig: FeatureDetailConfig = {
  title: "Security",
  subtitle: "See risk before attackers do",
  tagline:
    "Most breaches don't start with zero-days. They start with what you already have — misconfigured, exposed, or overlooked.",
  planeNum: 4,
  stats: [
    { value: "Continuous", label: "posture assessment" },
    { value: "Real-time", label: "exposure detection" },
    { value: "Zero", label: "point-in-time scans" },
    { value: "Full", label: "attack surface view" },
  ],
  posStrong:
    "Most breaches don't start with zero-days. They start with what you already have — misconfigured, exposed, or overlooked.",
  posBody:
    "Opticini Security provides continuous insight into your infrastructure's exposure, misconfigurations, and vulnerabilities — so your team can act before attackers find what you haven't.",
  sectionLabel: "What Security Does",
  sectionTitle: "Continuous posture — not point-in-time scans",
  cards: [
    {
      icon: "🔍",
      title: "Exposure Detection",
      items: [
        "Open ports & exposed services",
        "Public-facing assets inventory",
        "TLS & certificate health",
        "Cloud misconfiguration detection",
      ],
    },
    {
      icon: "🛡️",
      title: "Vulnerability & Posture",
      items: [
        "CVE correlation to live assets",
        "Software & package risk mapping",
        "Patch status tracking",
        "CIS benchmark scoring",
      ],
    },
    {
      icon: "🔑",
      title: "Identity & Access Risk",
      items: [
        "Excessive permissions & privilege sprawl",
        "Unused credentials & access",
        "Service account risks",
        "MFA & auth gap detection",
      ],
    },
  ],
  compareLabel: "Why Security Matters",
  compareTitle: "From point-in-time scans to continuous posture",
  compareOld: "Traditional Security Scans",
  compareNew: "With Opticini Security",
  compareRows: [
    { old: "Quarterly or annual scans", new: "Continuous posture monitoring" },
    { old: "Unknown attack surface", new: "Full attack surface mapped" },
    { old: "Uncontextualized CVE lists", new: "CVEs correlated to live assets" },
    { old: "Access sprawl undetected", new: "Identity risks surfaced continuously" },
  ],
  outcomeLabel: "Outcome",
  outcomeText:
    "A continuously updated view of your security posture — so you find and fix exposure before attackers do.",
  ctaTitle: "See risk before attackers do",
  ctaSubtitle:
    "Continuous security posture monitoring — from exposure to identity to misconfiguration.",
  colors: red,
};

export const configurationConfig: FeatureDetailConfig = {
  title: "Configuration",
  subtitle: "Prevent drift. Enforce what \"good\" looks like.",
  tagline:
    "Configuration drift is one of the leading causes of outages, security gaps, and audit failures.",
  planeNum: 5,
  stats: [
    { value: "Continuous", label: "baseline comparison" },
    { value: "Real-time", label: "drift detection" },
    { value: "Policy", label: "enforcement" },
    { value: "0", label: "manual audits" },
  ],
  posStrong:
    "Configuration drift is one of the leading causes of outages, security gaps, and audit failures.",
  posBody:
    "Opticini Configuration gives you continuous visibility into how systems are configured — and alerts you when they drift from approved baselines. Living configuration intelligence that evolves with your environment.",
  sectionLabel: "What Configuration Does",
  sectionTitle: "Know when something changes — and whether it should have",
  cards: [
    {
      icon: "🖥️",
      title: "System & Infrastructure Configuration",
      items: [
        "OS and system settings",
        "Installed packages and services",
        "Firewall and network rules",
        "Storage and backup settings",
      ],
    },
    {
      icon: "☁️",
      title: "Cloud & Platform Configuration",
      items: [
        "Cloud resource configurations (AWS, Azure, GCP)",
        "IAM policies and role assignments",
        "Kubernetes manifests and policies",
        "Managed service settings",
      ],
    },
    {
      icon: "📋",
      title: "Baseline & Drift Detection",
      sub: "Opticini captures known-good baselines, continuously compares live configurations, and flags deviations in real time.",
      items: [
        "Policy-defined baselines",
        "CIS-aligned standards",
        "Custom per-team or per-workload",
      ],
    },
    {
      icon: "🔗",
      title: "Configuration With Context",
      sub: "Every change is enriched with who made it, when, related deployments, and its security & compliance impact.",
      items: [
        "Change author & timestamp",
        "Related incidents & deployments",
        "Security & compliance impact score",
      ],
    },
  ],
  compareLabel: "Why Configuration Matters",
  compareTitle: "From silent decay to controlled change",
  compareOld: "Without Configuration Control",
  compareNew: "With Opticini Configuration",
  compareRows: [
    { old: "Silent misconfigurations", new: "Immediate visibility & alerts" },
    { old: "Untracked changes", new: "Full accountability with context" },
    { old: "Repeated incidents", new: "Stable, enforced baselines" },
    { old: "Audit surprises", new: "Continuous compliance" },
  ],
  outcomeLabel: "Outcome",
  outcomeText:
    "Stable, secure, and compliant systems — with full visibility into how they're configured and who changed what.",
  ctaTitle: "Stop drift before it becomes a crisis",
  ctaSubtitle:
    "Continuous configuration monitoring — so your infrastructure stays exactly as intended.",
  colors: teal,
};

export const complianceConfig: FeatureDetailConfig = {
  title: "Compliance",
  subtitle: "Compliance shouldn't be a once-a-year panic",
  tagline:
    "Compliance shouldn't be a once-a-year scramble. It should be a continuous state you're always in.",
  planeNum: 6,
  stats: [
    { value: "7+", label: "frameworks supported" },
    { value: "24/7", label: "control monitoring" },
    { value: "0", label: "manual screenshots" },
    { value: "100%", label: "automated evidence" },
  ],
  posStrong:
    "Compliance shouldn't be a once-a-year scramble. It should be a continuous state you're always in.",
  posBody:
    "Opticini Compliance delivers continuous compliance visibility across your infrastructure — mapped to the frameworks that matter, with automated evidence collection and real-time control monitoring.",
  sectionLabel: "Frameworks & Controls",
  sectionTitle: "Stay continuously audit-ready across every standard",
  cards: [
    {
      icon: "📜",
      title: "Supported Frameworks",
      items: [
        "SOC 2 Type I & II",
        "ISO 27001",
        "HIPAA",
        "PCI-DSS",
        "CIS Benchmarks & NIST",
      ],
    },
    {
      icon: "⚙️",
      title: "Continuous Control Monitoring",
      items: [
        "Real-time control status",
        "Control failure alerts",
        "Gap identification & prioritization",
        "Remediation guidance",
      ],
    },
    {
      icon: "🤝",
      title: "Shared Responsibility Modeling",
      items: [
        "Cloud provider responsibilities mapped",
        "Your obligations clearly defined",
        "Vendor compliance tracking",
        "Third-party risk integration",
      ],
    },
  ],
  compareLabel: "Why Compliance Matters",
  compareTitle: "From once-a-year panic to continuous readiness",
  compareOld: "Traditional Compliance Approach",
  compareNew: "With Opticini Compliance",
  compareRows: [
    { old: "Annual audit scrambles", new: "Always audit-ready" },
    { old: "Manual evidence collection", new: "Automated evidence, always fresh" },
    { old: "Surprise control failures", new: "Real-time failure alerts" },
    { old: "Spreadsheet chaos", new: "Structured, framework-mapped status" },
  ],
  outcomeLabel: "Outcome",
  outcomeText:
    "Continuous compliance across SOC 2, ISO 27001, HIPAA, PCI, and more — without the annual sprint.",
  ctaTitle: "Make compliance continuous, not cyclical",
  ctaSubtitle:
    "Real-time control monitoring across every framework you need to satisfy.",
  colors: indigo,
};

export const evidenceConfig: FeatureDetailConfig = {
  title: "Evidence",
  subtitle: "Prove compliance — automatically",
  tagline: "Audits fail when proof is missing, outdated, or incomplete. Eliminate the scramble.",
  planeNum: 7,
  stats: [
    { value: "Auto", label: "collected evidence" },
    { value: "Always", label: "fresh & current" },
    { value: "0", label: "manual screenshots" },
    { value: "Auditor", label: "ready exports" },
  ],
  posStrong: "Audits fail when proof is missing, outdated, or incomplete.",
  posBody:
    "Opticini Evidence automates the collection, organization, and maintenance of audit-ready evidence — so proof is always current and available, not just when an audit starts.",
  sectionLabel: "What Evidence Does",
  sectionTitle: "Automated proof — always current, always structured",
  cards: [
    {
      icon: "⚡",
      title: "Automated Evidence Sources",
      items: [
        "Infrastructure & system configurations",
        "Cloud service settings & snapshots",
        "Security & access controls",
        "Logging, monitoring & backup status",
        "Vulnerability & posture reports",
      ],
    },
    {
      icon: "📋",
      title: "Manual & Attested Evidence",
      items: [
        "Policy documents",
        "Employee & vendor attestations",
        "Exception approvals & sign-offs",
        "External audit artifacts",
        "Versioned change history",
      ],
    },
  ],
  compareLabel: "Why Evidence Matters",
  compareTitle: "From screenshot chaos to structured proof",
  compareOld: "Traditional Evidence Collection",
  compareNew: "With Opticini Evidence",
  compareRows: [
    { old: "Manual screenshots & exports", new: "Automated, continuous collection" },
    { old: "Stale or missing evidence", new: "Freshness-tracked, always current" },
    { old: "Audit prep takes weeks", new: "Evidence ready in minutes" },
    { old: "Spreadsheet chaos", new: "Structured, auditor-ready packages" },
  ],
  outcomeLabel: "Outcome",
  outcomeText:
    "Audit-ready evidence, continuously maintained — without manual effort, screenshots, or spreadsheets.",
  ctaTitle: "Never scramble for evidence again",
  ctaSubtitle:
    "Continuous, automated audit proof — mapped to every control, always current.",
  colors: purple,
};

export const changeConfig: FeatureDetailConfig = {
  title: "Change",
  subtitle: "Know what changed — and why it matters",
  tagline: "Every outage, breach, or compliance failure starts with a change.",
  planeNum: 8,
  stats: [
    { value: "Real-time", label: "change detection" },
    { value: "Full", label: "change timeline" },
    { value: "Correlated", label: "to incidents" },
    { value: "Faster", label: "root cause analysis" },
  ],
  posStrong: "Every outage, breach, or compliance failure starts with a change.",
  posBody:
    "Opticini Change gives you complete visibility into infrastructure, configuration, and deployment changes — so teams understand impact before issues escalate.",
  sectionLabel: "What Change Tracks",
  sectionTitle: "From scattered logs to a single correlated change history",
  cards: [
    {
      icon: "🖥️",
      title: "Infrastructure & Configuration Changes",
      items: [
        "System & OS changes",
        "Configuration updates",
        "Network & firewall rule changes",
        "Cloud resource modifications",
      ],
    },
    {
      icon: "🚀",
      title: "Platform & Application Changes",
      items: [
        "Deployments & releases",
        "Infrastructure-as-code updates",
        "CI/CD pipeline executions",
        "Version & schema changes",
      ],
    },
    {
      icon: "👤",
      title: "Author & Source",
      sub: "Every change shows who made it and from where — human, automated, or pipeline-driven.",
    },
    {
      icon: "🎯",
      title: "Impact & Blast Radius",
      sub: "Affected assets, related incidents, and the estimated scope of impact — before you dig into logs.",
    },
    {
      icon: "📋",
      title: "Compliance Impact",
      sub: "Security and compliance implications of each change, mapped to relevant frameworks and controls.",
    },
  ],
  compareLabel: "Why Change Matters",
  compareTitle: "From unknown root causes to clear accountability",
  compareOld: "Without Change Visibility",
  compareNew: "With Opticini Change",
  compareRows: [
    { old: "Unknown root causes", new: "Clear change accountability" },
    { old: "Slow incident resolution", new: "Faster root cause analysis" },
    { old: "Hidden risky changes", new: "Early risk detection per change" },
    { old: "Audit change-control gaps", new: "Verified change control history" },
  ],
  outcomeLabel: "Outcome",
  outcomeText:
    "Clear accountability, faster incident resolution, and safer changes — everywhere, for every team.",
  ctaTitle: "Bring clarity to change",
  ctaSubtitle:
    "Stop guessing what changed. Start knowing — with full context and compliance impact.",
  colors: orange,
};

export const costConfig: FeatureDetailConfig = {
  title: "Cost",
  subtitle: "Visibility before optimization",
  tagline:
    "FinOps-grade visibility, built natively into infrastructure monitoring — not bolted on later.",
  planeNum: 9,
  stats: [
    { value: "Real-time", label: "cost tracking" },
    { value: "Cloud +", label: "on-prem unified" },
    { value: "Per team", label: "cost attribution" },
    { value: "Waste", label: "detection built in" },
  ],
  posStrong:
    "Opticini Cost provides real-time and historical insight into infrastructure spending across local, hybrid, and cloud environments.",
  posBody:
    "It connects usage, configuration, and performance data to actual cost impact — so finance, IT, and engineering make decisions from the same source of truth. This is FinOps-grade visibility, built natively into infrastructure monitoring.",
  sectionLabel: "Core Capabilities",
  sectionTitle: "From spend to waste to optimization — in one place",
  cards: [
    {
      icon: "🗺️",
      title: "Unified Cost Discovery",
      items: [
        "On-prem infrastructure cost modeling",
        "Cloud cost ingestion (AWS, Azure, GCP)",
        "Hybrid environment normalization",
        "Environment-based segmentation (prod/dev)",
      ],
    },
    {
      icon: "🎯",
      title: "Usage-Based Attribution",
      items: [
        "CPU, memory, disk, network cost mapping",
        "Application-level cost attribution",
        "Team, project & business-unit allocation",
        "Service & workload tagging",
      ],
    },
    {
      icon: "🗑️",
      title: "Waste & Optimization Detection",
      items: [
        "Idle & underutilized resources",
        "Overprovisioned compute & storage",
        "Zombie services & orphaned assets",
        "Redundant environments & unused snapshots",
      ],
    },
    {
      icon: "⚡",
      title: "Change-to-Cost Correlation",
      items: [
        "Cost impact of deployments & config changes",
        "Spike detection tied to scaling events",
        "Drift-driven cost increases",
        "Rollback cost validation",
      ],
    },
    {
      icon: "📊",
      title: "Forecasting & Budget Guardrails",
      items: [
        "Trend-based cost forecasting",
        "Budget thresholds & alerts",
        "Anomaly detection for unexpected spend",
        "What-if analysis for scaling decisions",
      ],
    },
  ],
  compareLabel: "",
  compareTitle: "",
  compareOld: "",
  compareNew: "",
  compareRows: [],
  outcomeLabel: "Outcome",
  outcomeText:
    "Infrastructure spend that's intentional, visible, and defensible — with measurable savings tied to real actions.",
  ctaTitle: "Turn usage into financial clarity",
  ctaSubtitle:
    "See where every dollar goes — and connect spend to performance, change, and risk.",
  colors: cyan,
  extraSection: {
    label: "Who It's For",
    title: "One cost view — shared across every stakeholder",
    cards: [
      {
        title: "Finance & FinOps",
        sub: "Budget control, forecasting, and accountability across teams.",
      },
      {
        title: "Platform & Infrastructure",
        sub: "Right-sizing, waste elimination, and resource optimization.",
      },
      {
        title: "Engineering Leadership",
        sub: "Cost-aware architecture decisions tied to real usage data.",
      },
      {
        title: "Executives",
        sub: "ROI visibility and infrastructure efficiency at the business level.",
      },
    ],
  },
};

export const riskConfig: FeatureDetailConfig = {
  title: "Risk",
  subtitle: "Continuous awareness of what could break, expose, or cost you",
  tagline:
    "Not all alerts are equal. Risk synthesizes everything to show you what actually matters — and what to fix first.",
  planeNum: 10,
  stats: [
    { value: "Unified", label: "risk scoring" },
    { value: "Business", label: "impact mapping" },
    { value: "Executive", label: "risk views" },
    { value: "Synthesis", label: "across all 9 planes" },
  ],
  posStrong:
    "Opticini Risk provides a unified, real-time view of operational, security, compliance, and financial risk across your entire infrastructure.",
  posBody:
    "Instead of siloed alerts and static assessments, Risk continuously evaluates how configuration, change, health, performance, and cost interact to create exposure. This is living risk intelligence for modern infrastructure.",
  sectionLabel: "Core Capabilities",
  sectionTitle: "Six dimensions of risk — unified in one view",
  cards: [
    {
      icon: "📊",
      title: "Unified Risk Scoring",
      items: [
        "Asset-level risk scores",
        "Environment-based aggregation",
        "Business impact weighting",
        "Normalized across on-prem, cloud, hybrid",
      ],
    },
    {
      icon: "⚙️",
      title: "Operational Risk Detection",
      items: [
        "Health degradation trends",
        "Capacity exhaustion risk",
        "Single points of failure",
        "SLA & uptime risk modeling",
      ],
    },
    {
      icon: "🔒",
      title: "Security Risk Visibility",
      items: [
        "Exposure from misconfigurations",
        "Unpatched or vulnerable components",
        "Excessive permissions & access sprawl",
        "Public exposure risk",
      ],
    },
    {
      icon: "📋",
      title: "Compliance & Policy Risk",
      items: [
        "Drift from compliance baselines",
        "Evidence gaps & audit readiness risk",
        "Policy violations over time",
        "Control degradation tracking",
      ],
    },
    {
      icon: "🔄",
      title: "Change-Induced Risk",
      items: [
        "Risk from deployments & config changes",
        "High-risk changes without rollback paths",
        "Change velocity vs incident probability",
        "Risk reduction after remediation",
      ],
    },
    {
      icon: "💸",
      title: "Financial & Cost Risk",
      items: [
        "Runaway spend risk detection",
        "Budget threshold breach likelihood",
        "Cost exposure tied to performance issues",
        "Waste accumulation risk over time",
      ],
    },
  ],
  compareLabel: "",
  compareTitle: "",
  compareOld: "",
  compareNew: "",
  compareRows: [],
  outcomeLabel: "Outcome",
  outcomeText:
    "Fewer outages, earlier detection of systemic weaknesses, clearer prioritization of remediation — and no more audit surprises.",
  ctaTitle: "See risk before it becomes an incident",
  ctaSubtitle:
    "Unified risk intelligence across all 10 insight planes — prioritized by business impact.",
  colors: riskRed,
  extraSection: {
    label: "The Synthesis Layer",
    title: "Risk draws from every other insight plane",
    miniCards: [
      { title: "Discovery", sub: "what exists" },
      { title: "Health", sub: "what's degrading" },
      { title: "Performance", sub: "what's stressed" },
      { title: "Security", sub: "what's exposed" },
      { title: "Configuration", sub: "what's misaligned" },
      { title: "Compliance", sub: "what's drifting" },
      { title: "Evidence", sub: "what's unproven" },
      { title: "Change", sub: "what was introduced" },
      { title: "Cost", sub: "what could escalate" },
      { title: "Risk", sub: "actionable insight" },
    ],
  },
};
