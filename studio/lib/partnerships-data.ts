/**
 * Partnership page content from docs/partnerships.
 * Structure mirrors verticals for consistent templating.
 */

export type PartnershipSection =
  | {
      type: "bullets";
      heading: string;
      items: string[];
    }
  | {
      type: "prose";
      heading: string;
      paragraphs: string[];
    }
  | {
      type: "closing";
      paragraphs: string[];
    };

export interface PartnershipContent {
  slug: string;
  title: string;
  subtitle: string;
  intro: string[];
  sections: PartnershipSection[];
  ctaText: string;
  ctaHref: string;
}

export const PARTNERSHIPS: Record<string, PartnershipContent> = {
  affiliates: {
    slug: "affiliates",
    title: "Opticini Affiliate Program",
    subtitle: "Earn commissions by referring organizations that need compliance management.",
    intro: [
      "Affiliates introduce new customers to Opticini and receive a percentage of subscription revenue for successful referrals.",
      "Whether you run a blog, advisory service, consulting practice, or startup community, the affiliate program allows you to monetize your network while helping organizations improve compliance practices.",
    ],
    sections: [
      {
        type: "bullets",
        heading: "Benefits",
        items: [
          "competitive referral commissions",
          "recurring revenue opportunities",
          "simple referral tracking",
          "dedicated partner dashboard",
        ],
      },
      {
        type: "bullets",
        heading: "Who Should Join",
        items: [
          "startup advisors",
          "technology consultants",
          "business influencers",
          "compliance bloggers",
          "SaaS reviewers",
        ],
      },
      {
        type: "closing",
        paragraphs: [
          "Join the Opticini affiliate program and start earning while helping organizations improve their compliance practices.",
        ],
      },
    ],
    ctaText: "Join the Affiliate Program",
    ctaHref: "/affiliate-signup",
  },
  consultants: {
    slug: "consultants",
    title: "Opticini Consultant Network",
    subtitle: "Compliance professionals who help customers implement controls.",
    intro: [
      "Opticini works with independent consultants who help organizations design and implement compliance programs.",
      "Consultants support customers in areas such as security controls, operational governance, audit preparation, and regulatory readiness.",
      "The Opticini platform enables consultants to collaborate directly with organizations by managing controls, uploading evidence, and guiding compliance activities within the system.",
    ],
    sections: [
      {
        type: "bullets",
        heading: "Benefits",
        items: [
          "access to new client opportunities",
          "centralized compliance workspace",
          "ability to manage multiple organizations",
          "optional billing through the platform",
        ],
      },
      {
        type: "bullets",
        heading: "Who Should Join",
        items: [
          "compliance consultants",
          "governance advisors",
          "security professionals",
          "fractional CISOs",
          "risk management specialists",
        ],
      },
      {
        type: "closing",
        paragraphs: [
          "Join the Opticini Consultant Network and help organizations build stronger compliance programs.",
        ],
      },
    ],
    ctaText: "Join the Consultant Network",
    ctaHref: "/contact-sales",
  },
  "audit-partners": {
    slug: "audit-partners",
    title: "Opticini Audit Partner Program",
    subtitle: "Licensed auditors who certify compliance.",
    intro: [
      "Audit partners provide independent verification of compliance programs managed within the Opticini platform.",
      "Through the audit partner program, certified auditors and accounting firms can work directly with organizations that use Opticini to prepare for and complete compliance audits.",
      "Audit partners gain access to structured compliance documentation, control records, and supporting evidence that simplify the audit process.",
    ],
    sections: [
      {
        type: "bullets",
        heading: "Benefits",
        items: [
          "streamlined audit preparation",
          "access to potential audit clients",
          "structured evidence management",
          "collaboration tools within the platform",
        ],
      },
      {
        type: "bullets",
        heading: "Who Should Join",
        items: [
          "CPA firms",
          "compliance auditors",
          "security assessment firms",
          "independent audit professionals",
        ],
      },
      {
        type: "closing",
        paragraphs: [
          "Become an Opticini Audit Partner and work with organizations that are already audit-ready.",
        ],
      },
    ],
    ctaText: "Become an Audit Partner",
    ctaHref: "/contact-sales",
  },
  "technology-partners": {
    slug: "technology-partners",
    title: "Opticini Technology Partners",
    subtitle: "Integration ecosystem partners for operational oversight, security, and compliance.",
    intro: [
      "The Opticini platform integrates with technology providers that support operational oversight, security management, and compliance monitoring.",
      "Technology partners help organizations connect operational systems such as cloud infrastructure, identity management, and ticketing platforms to Opticini.",
      "These integrations enable automated evidence collection and continuous compliance monitoring.",
    ],
    sections: [
      {
        type: "bullets",
        heading: "Benefits",
        items: [
          "integration visibility within the Opticini ecosystem",
          "expanded platform reach",
          "collaboration with compliance professionals and organizations",
        ],
      },
      {
        type: "bullets",
        heading: "Who Should Join",
        items: [
          "infrastructure platforms",
          "security tools",
          "cloud providers",
          "identity and access management vendors",
        ],
      },
      {
        type: "closing",
        paragraphs: [
          "Become a Technology Partner and extend the Opticini platform with your integrations.",
        ],
      },
    ],
    ctaText: "Become a Technology Partner",
    ctaHref: "/contact-sales",
  },
};

export function getPartnershipBySlug(slug: string): PartnershipContent | null {
  return PARTNERSHIPS[slug] ?? null;
}

export function getAllPartnershipSlugs(): string[] {
  return Object.keys(PARTNERSHIPS);
}
