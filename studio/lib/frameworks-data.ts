/**
 * Framework page content from docs/frameworks.
 * Footer links map to these slugs.
 */

export type FrameworkSection =
  | {
      type: "bullets";
      heading: string;
      items: string[];
      outro?: string;
    }
  | {
      type: "table";
      heading: string;
      rows: { label: string; value: string }[];
      outro?: string;
    }
  | {
      type: "subsections";
      heading: string;
      subsections: { heading: string; items: string[] }[];
    };

export interface FrameworkContent {
  slug: string;
  title: string;
  subtitle: string;
  intro: string[];
  sections: FrameworkSection[];
}

export const FRAMEWORKS: Record<string, FrameworkContent> = {
  "iso-27002": {
    slug: "iso-27002",
    title: "ISO/IEC 27002",
    subtitle: "Compliance Management",
    intro: [
      "ISO/IEC 27002 provides a comprehensive set of information security controls designed to protect sensitive data, reduce risk, and improve organizational security posture. While ISO 27001 defines the requirements for an Information Security Management System (ISMS), ISO 27002 serves as the practical guide for implementing the controls that support it.",
      "Organizations across industries rely on ISO 27002 to structure their security policies, risk management processes, and operational safeguards.",
    ],
    sections: [
      {
        type: "bullets",
        heading: "Who Uses ISO 27002",
        items: [
          "Technology companies",
          "SaaS platforms",
          "Financial institutions",
          "Healthcare providers",
          "Government contractors",
          "Enterprises managing sensitive data",
        ],
        outro: "It is particularly valuable for organizations implementing or maintaining ISO 27001 certification.",
      },
      {
        type: "bullets",
        heading: "Key Security Domains",
        items: [
          "Access control and identity management",
          "Cryptography and data protection",
          "Physical and environmental security",
          "Supplier and third-party security",
          "Incident management",
          "Security monitoring and logging",
          "Secure development and system operations",
        ],
      },
      {
        type: "bullets",
        heading: "How Opticini Helps",
        items: [
          "Mapping controls directly to ISO standards",
          "Automating evidence collection",
          "Tracking control effectiveness",
          "Managing risk registers",
          "Supporting audit readiness",
        ],
        outro: "Security teams can continuously monitor their compliance posture rather than scrambling during audits.",
      },
      {
        type: "bullets",
        heading: "Why It Matters",
        items: [
          "Adopting ISO 27002 strengthens security governance, demonstrates accountability to customers and regulators, and forms the operational backbone of a mature cybersecurity program.",
        ],
      },
    ],
  },
  hipaa: {
    slug: "hipaa",
    title: "HIPAA Security Rule",
    subtitle: "Compliance",
    intro: [
      "The HIPAA Security Rule establishes national standards for protecting electronic protected health information (ePHI). It requires healthcare organizations and their partners to implement administrative, physical, and technical safeguards to ensure the confidentiality, integrity, and availability of patient data.",
      "Any organization handling health data must comply with these security standards.",
    ],
    sections: [
      {
        type: "bullets",
        heading: "Who Must Comply",
        items: [
          "Healthcare providers",
          "Health insurance companies",
          "Healthcare clearinghouses",
          "Business associates handling patient data",
          "Health technology platforms",
          "Medical billing and data processing services",
        ],
      },
      {
        type: "subsections",
        heading: "Core Security Safeguards",
        subsections: [
          {
            heading: "Administrative Safeguards",
            items: ["Risk assessments", "Workforce security policies", "Security awareness training", "Incident response planning"],
          },
          {
            heading: "Physical Safeguards",
            items: ["Facility access controls", "Device and media protections", "Secure workstation usage"],
          },
          {
            heading: "Technical Safeguards",
            items: ["Access controls and authentication", "Encryption and transmission security", "Audit logging and monitoring", "Integrity controls"],
          },
        ],
      },
      {
        type: "bullets",
        heading: "How Opticini Helps",
        items: [
          "Control tracking aligned to HIPAA safeguards",
          "Automated policy management",
          "Evidence management for audits",
          "Risk assessment workflows",
          "Continuous monitoring dashboards",
        ],
      },
      {
        type: "bullets",
        heading: "Why HIPAA Compliance Matters",
        items: ["Beyond regulatory requirements, HIPAA compliance protects patient trust, reduces legal risk, and strengthens healthcare cybersecurity practices."],
      },
    ],
  },
  soc2: {
    slug: "soc2",
    title: "SOC 2",
    subtitle: "Compliance & Audit Readiness",
    intro: [
      "SOC 2 is a widely recognized auditing framework that evaluates how organizations manage customer data based on five trust service principles.",
      "Developed by the American Institute of Certified Public Accountants (AICPA), SOC 2 is essential for SaaS companies and cloud providers that store or process customer information.",
    ],
    sections: [
      {
        type: "table",
        heading: "The Five Trust Service Criteria",
        rows: [
          { label: "Security", value: "Protection against unauthorized access" },
          { label: "Availability", value: "Systems remain operational and reliable" },
          { label: "Processing Integrity", value: "Systems perform as intended without errors" },
          { label: "Confidentiality", value: "Sensitive information is protected" },
          { label: "Privacy", value: "Personal data is handled responsibly" },
        ],
        outro: "Organizations may be audited against one or multiple criteria depending on their operations.",
      },
      {
        type: "bullets",
        heading: "SOC 2 Type I vs Type II",
        items: [
          "Type I evaluates control design at a specific point in time",
          "Type II evaluates operating effectiveness over a period (typically 6–12 months)",
        ],
      },
      {
        type: "bullets",
        heading: "How Opticini Helps",
        items: [
          "Organizing controls mapped to SOC requirements",
          "Tracking audit evidence automatically",
          "Managing control tests and review cycles",
          "Monitoring compliance posture in real time",
        ],
      },
      {
        type: "bullets",
        heading: "Why SOC 2 Matters",
        items: ["SOC 2 certification demonstrates that an organization takes security and privacy seriously. It has become a critical requirement for doing business with enterprise customers."],
      },
    ],
  },
  "nist-800-53": {
    slug: "nist-800-53",
    title: "NIST SP 800-53",
    subtitle: "Security Controls",
    intro: [
      "NIST Special Publication 800-53 provides one of the most comprehensive catalogs of security and privacy controls available today. It is widely used by federal agencies and organizations working with government systems.",
      "The framework defines hundreds of controls designed to secure information systems across complex environments.",
    ],
    sections: [
      {
        type: "bullets",
        heading: "Who Uses NIST 800-53",
        items: [
          "Federal government agencies",
          "Defense contractors",
          "Cloud service providers",
          "Critical infrastructure organizations",
          "Security-focused enterprises",
        ],
        outro: "Many organizations adopt it voluntarily to achieve a higher level of cybersecurity maturity.",
      },
      {
        type: "bullets",
        heading: "Control Families",
        items: [
          "Access Control (AC)",
          "Audit and Accountability (AU)",
          "Configuration Management (CM)",
          "Incident Response (IR)",
          "System and Communications Protection (SC)",
          "Identification and Authentication (IA)",
          "Risk Assessment (RA)",
        ],
      },
      {
        type: "bullets",
        heading: "How Opticini Helps",
        items: [
          "Structuring control families and mappings",
          "Tracking implementation status",
          "Managing test plans and assessments",
          "Maintaining evidence repositories",
        ],
      },
      {
        type: "bullets",
        heading: "Why NIST 800-53 Matters",
        items: ["This framework is considered the gold standard for security controls and provides a robust baseline for protecting mission-critical systems."],
      },
    ],
  },
  "nist-csf": {
    slug: "nist-csf",
    title: "NIST Cybersecurity Framework",
    subtitle: "CSF",
    intro: [
      "The NIST Cybersecurity Framework provides a flexible risk-based approach for managing cybersecurity across organizations of all sizes. It is widely used in both public and private sectors.",
      "The framework focuses on five core functions that define the lifecycle of cybersecurity management.",
    ],
    sections: [
      {
        type: "table",
        heading: "Core Functions",
        rows: [
          { label: "Identify", value: "Understand organizational assets, risks, and business context" },
          { label: "Protect", value: "Implement safeguards to ensure delivery of critical services" },
          { label: "Detect", value: "Identify cybersecurity events quickly" },
          { label: "Respond", value: "Take action when incidents occur" },
          { label: "Recover", value: "Restore systems and improve resilience after an incident" },
        ],
      },
      {
        type: "bullets",
        heading: "Who Uses NIST CSF",
        items: [
          "Critical infrastructure operators",
          "Financial institutions",
          "Healthcare organizations",
          "Technology companies",
          "Government agencies",
        ],
      },
      {
        type: "bullets",
        heading: "How Opticini Helps",
        items: [
          "Mapping controls to framework categories",
          "Monitoring risk posture",
          "Tracking incident response readiness",
          "Generating compliance reports",
        ],
      },
      {
        type: "bullets",
        heading: "Why NIST CSF Matters",
        items: ["The framework provides a practical way to align cybersecurity strategy with business objectives while improving resilience against cyber threats."],
      },
    ],
  },
  "iso-27001": {
    slug: "iso-27001",
    title: "ISO/IEC 27001",
    subtitle: "Information Security Management",
    intro: [
      "ISO/IEC 27001 is the global standard for establishing, implementing, and maintaining an Information Security Management System (ISMS).",
      "It provides a structured approach for managing sensitive company information through risk management, policies, procedures, and continuous improvement.",
    ],
    sections: [
      {
        type: "bullets",
        heading: "Key Components",
        items: [
          "Risk assessment and treatment",
          "Security policy management",
          "Organizational governance",
          "Incident management processes",
          "Continuous improvement",
        ],
        outro: "Organizations certified under ISO 27001 demonstrate that they maintain a systematic approach to managing sensitive data.",
      },
      {
        type: "bullets",
        heading: "Who Uses ISO 27001",
        items: [
          "SaaS companies",
          "Global enterprises",
          "Financial services",
          "Cloud infrastructure providers",
          "Government contractors",
        ],
      },
      {
        type: "bullets",
        heading: "How Opticini Helps",
        items: [
          "Managing the ISMS lifecycle",
          "Tracking control implementation",
          "Supporting internal and external audits",
          "Organizing evidence and documentation",
        ],
      },
      {
        type: "bullets",
        heading: "Why ISO 27001 Matters",
        items: ["Certification signals strong security governance and increases trust with customers, regulators, and business partners."],
      },
    ],
  },
  "pci-dss": {
    slug: "pci-dss",
    title: "PCI DSS",
    subtitle: "Compliance",
    intro: [
      "The Payment Card Industry Data Security Standard (PCI DSS) defines security requirements for organizations that store, process, or transmit payment card information.",
      "It was created by major credit card companies to reduce fraud and protect cardholder data.",
    ],
    sections: [
      {
        type: "bullets",
        heading: "Who Must Comply",
        items: [
          "Online retailers",
          "Payment processors",
          "SaaS billing platforms",
          "Financial institutions",
          "Any organization handling credit card data",
        ],
      },
      {
        type: "bullets",
        heading: "Core PCI Security Requirements",
        items: [
          "Secure network configuration",
          "Encryption of cardholder data",
          "Vulnerability management",
          "Strong access control measures",
          "Monitoring and logging",
          "Regular security testing",
        ],
      },
      {
        type: "bullets",
        heading: "How Opticini Helps",
        items: [
          "Tracking PCI control requirements",
          "Maintaining audit evidence",
          "Managing risk assessments",
          "Monitoring compliance status",
        ],
      },
      {
        type: "bullets",
        heading: "Why PCI Compliance Matters",
        items: ["Non-compliance can lead to significant financial penalties and reputational damage. PCI DSS ensures the safe handling of payment data."],
      },
    ],
  },
  "cis-controls": {
    slug: "cis-controls",
    title: "CIS Critical Security Controls",
    subtitle: "Prioritized Cybersecurity Best Practices",
    intro: [
      "The CIS Critical Security Controls provide a prioritized set of cybersecurity best practices designed to protect organizations against the most common cyber attacks.",
      "Developed by the Center for Internet Security, the controls are widely adopted because they are practical, measurable, and effective.",
    ],
    sections: [
      {
        type: "bullets",
        heading: "Key Control Areas",
        items: [
          "Asset inventory and management",
          "Continuous vulnerability management",
          "Data protection and encryption",
          "Account and access control management",
          "Security awareness training",
          "Incident response planning",
        ],
      },
      {
        type: "table",
        heading: "Implementation Groups",
        rows: [
          { label: "IG1", value: "Basic cyber hygiene — Small and medium organizations" },
          { label: "IG2", value: "Advanced security — Organizations managing sensitive data" },
          { label: "IG3", value: "Mature security programs — Highly targeted environments" },
        ],
      },
      {
        type: "bullets",
        heading: "How Opticini Helps",
        items: [
          "Mapping controls to CIS versions",
          "Tracking maturity levels",
          "Monitoring compliance metrics",
          "Supporting continuous improvement",
        ],
      },
      {
        type: "bullets",
        heading: "Why CIS Controls Matter",
        items: ["CIS provides one of the most practical security frameworks available and is often used as a starting point for organizations building their cybersecurity programs."],
      },
    ],
  },
};

export function getFrameworkBySlug(slug: string): FrameworkContent | null {
  return FRAMEWORKS[slug] ?? null;
}

export function getAllFrameworkSlugs(): string[] {
  return Object.keys(FRAMEWORKS);
}
