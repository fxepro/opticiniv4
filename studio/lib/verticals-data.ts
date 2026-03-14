/**
 * Vertical page content structure.
 * Add new verticals by extending VERTICALS and creating a content object.
 */

export type VerticalSection =
  | {
      type: "features";
      heading: string;
      intro?: string;
      features: { title: string; description: string }[];
    }
  | {
      type: "bullets";
      heading: string;
      intro?: string;
      items: string[];
      outro?: string;
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

export interface VerticalContent {
  slug: string;
  title: string;
  subtitle: string;
  intro: string[];
  sections: VerticalSection[];
}

export const VERTICALS: Record<string, VerticalContent> = {
  nonprofits: {
    slug: "nonprofits",
    title: "Nonprofits",
    subtitle: "Compliance Built for Mission-Driven Organizations",
    intro: [
      "Nonprofits exist to serve communities and causes—not to wrestle with compliance paperwork, audit preparation, and regulatory reporting. Yet every nonprofit must maintain strict oversight of finances, governance, donor transparency, and regulatory obligations.",
      "Opticini simplifies nonprofit compliance by organizing your governance, financial oversight, and operational accountability into a single platform. Instead of chasing spreadsheets, emails, and scattered documents, teams gain a centralized environment to track controls, store evidence, prepare audits, and ensure regulatory obligations are met.",
      "Whether you are managing grant funding, preparing your annual IRS filings, maintaining board governance records, or demonstrating donor transparency, Opticini provides a structured approach to compliance without overwhelming small teams.",
      "The platform allows nonprofit leaders to focus on their mission while maintaining clear accountability for donors, regulators, and board members.",
    ],
    sections: [
      {
        type: "features",
        heading: "Built for the Realities of Nonprofit Operations",
        intro:
          "Most nonprofits face compliance challenges not because they lack discipline, but because the tools available are fragmented and designed for corporations rather than mission-driven organizations. Opticini provides a compliance foundation designed specifically for nonprofits.",
        features: [
          {
            title: "Governance & Board Oversight",
            description:
              "Maintain bylaws, board policies, conflict-of-interest records, and meeting documentation in one organized system. Track board approvals and governance controls that demonstrate responsible leadership.",
          },
          {
            title: "Financial Transparency",
            description:
              "Ensure proper oversight of donations, restricted funds, grant expenditures, and financial reporting obligations. Maintain clear documentation for financial reviews and independent audits.",
          },
          {
            title: "Grant & Program Accountability",
            description:
              "Track grant requirements, deliverables, reporting deadlines, and compliance obligations tied to funding sources.",
          },
          {
            title: "Audit Preparation",
            description:
              "Prepare for internal reviews or external financial audits with structured evidence collection and control verification.",
          },
          {
            title: "Donor & Public Accountability",
            description:
              "Maintain records that demonstrate transparency, responsible stewardship, and regulatory compliance with nonprofit obligations.",
          },
        ],
      },
      {
        type: "bullets",
        heading: "Key Compliance Areas for Nonprofits",
        intro:
          "Opticini helps nonprofits manage the operational requirements that support trust and accountability.",
        items: [
          "IRS tax-exempt governance obligations",
          "Board oversight and governance documentation",
          "Financial reporting and transparency",
          "Grant compliance and reporting",
          "Donor transparency and accountability",
          "Internal controls and audit readiness",
        ],
        outro:
          "Rather than tracking these responsibilities across separate systems, Opticini organizes them into a clear compliance framework that evolves with your organization.",
      },
      {
        type: "prose",
        heading: "Simplifying Audit Readiness",
        paragraphs: [
          "When audits or reviews occur, nonprofits often spend weeks gathering documents and reconstructing records.",
          "Opticini changes that dynamic.",
          "Controls, documentation, and supporting evidence are organized continuously throughout the year, allowing nonprofit teams to demonstrate accountability without last-minute preparation.",
          "Audit readiness becomes a natural outcome of good operational practices.",
        ],
      },
      {
        type: "prose",
        heading: "Supporting Organizations of Every Size",
        paragraphs: [
          "From small volunteer-led nonprofits to large organizations managing complex grant funding, Opticini scales with your operational needs.",
          "The platform adapts to your compliance requirements while remaining simple enough for lean teams to manage.",
        ],
      },
      {
        type: "closing",
        paragraphs: [
          "For nonprofits, compliance is not simply about regulation—it is about trust.",
          "Trust from donors. Trust from communities. Trust from regulators and partners.",
          "Opticini helps organizations maintain that trust by ensuring transparency, accountability, and operational integrity.",
          "Your mission remains the focus. Compliance simply supports it.",
        ],
      },
    ],
  },
  smb: {
    slug: "smb",
    title: "SMB",
    subtitle: "Practical Compliance for Growing Businesses",
    intro: [
      "Small and medium-sized businesses face increasing expectations around operational accountability, security practices, and regulatory compliance. Customers, partners, and regulators now expect organizations of all sizes to demonstrate responsible governance, data protection, and operational discipline.",
      "Yet most SMBs lack dedicated compliance teams or specialized software to manage these responsibilities. Compliance tasks often become scattered across spreadsheets, shared drives, and email threads, making it difficult to maintain visibility and consistency.",
      "Opticini provides a structured platform that helps SMBs organize compliance activities, track controls, maintain documentation, and prepare for audits without adding unnecessary complexity.",
      "By centralizing compliance management, businesses gain clarity and confidence in their operational processes while continuing to focus on growth.",
    ],
    sections: [
      {
        type: "features",
        heading: "Compliance Without Enterprise Complexity",
        intro:
          "Large enterprises typically rely on expensive governance and risk management systems that are difficult for smaller organizations to adopt. SMBs need a solution that provides structure and accountability while remaining simple to operate. Opticini delivers a streamlined approach that allows SMBs to implement essential controls and maintain oversight across their operations.",
        features: [
          {
            title: "Operational Controls",
            description:
              "Track and manage internal policies, procedures, and operational practices that support responsible business operations.",
          },
          {
            title: "Evidence & Documentation",
            description:
              "Maintain a centralized repository of documentation, approvals, and records needed for compliance verification.",
          },
          {
            title: "Audit Readiness",
            description:
              "Prepare for internal reviews, customer audits, or regulatory assessments by organizing evidence and control activities throughout the year.",
          },
          {
            title: "Risk Visibility",
            description:
              "Monitor compliance gaps and operational risks before they become larger problems.",
          },
        ],
      },
      {
        type: "bullets",
        heading: "Supporting the Compliance Needs of SMBs",
        intro:
          "As businesses grow, they encounter increasing compliance expectations from customers, vendors, and regulatory bodies. Common areas of oversight include:",
        items: [
          "Operational policies and internal controls",
          "Vendor and supplier accountability",
          "Data protection and privacy practices",
          "Financial and operational transparency",
          "Audit readiness and documentation management",
        ],
        outro:
          "Opticini allows SMBs to manage these responsibilities through a structured system that provides visibility into compliance status and operational discipline.",
      },
      {
        type: "prose",
        heading: "Simplifying Customer and Vendor Requirements",
        paragraphs: [
          "Many SMBs are required to demonstrate compliance when working with larger customers or entering regulated supply chains. Vendor assessments, operational reviews, and security questionnaires can become time-consuming without a structured system.",
          "Opticini helps organizations maintain clear documentation and verifiable controls that demonstrate responsible business practices to partners and customers.",
          "This transparency helps SMBs build stronger partnerships and expand into larger markets.",
        ],
      },
      {
        type: "prose",
        heading: "Scalable Compliance for Growing Organizations",
        paragraphs: [
          "Compliance needs rarely remain static. As businesses expand into new markets, industries, and partnerships, regulatory and operational expectations evolve.",
          "Opticini provides a compliance foundation that grows alongside the business, allowing organizations to add new frameworks, controls, and oversight processes as needed.",
        ],
      },
      {
        type: "prose",
        heading: "Supporting Operational Discipline",
        paragraphs: [
          "For SMBs, compliance is not simply about regulation. It is about creating consistent operational practices that support long-term stability and credibility.",
          "Opticini helps organizations build these practices through structured controls, transparent documentation, and continuous oversight.",
          "With compliance organized and visible, leadership teams gain greater confidence in the integrity of their operations.",
        ],
      },
      {
        type: "closing",
        paragraphs: [
          "Businesses that maintain clear operational controls demonstrate reliability and accountability to the outside world.",
          "Opticini provides SMBs with the tools needed to maintain that confidence while avoiding the complexity of traditional enterprise compliance systems.",
          "Compliance becomes an organized part of daily operations—supporting sustainable growth and stronger relationships with customers and partners.",
        ],
      },
    ],
  },
  startups: {
    slug: "startups",
    title: "Startups",
    subtitle: "Compliance That Scales With Your Growth",
    intro: [
      "Startups move fast. Teams build products, acquire customers, and secure funding while operating with limited resources and time. Yet as soon as a startup begins selling to businesses, compliance becomes unavoidable.",
      "Prospective customers ask for security documentation. Enterprise buyers require proof of controls. Investors expect operational maturity. Regulatory expectations begin to appear earlier than most founders anticipate.",
      "Opticini helps startups establish a structured compliance foundation without slowing innovation. Instead of building compliance processes from scratch, teams gain a platform that organizes controls, evidence, and audit readiness from the beginning.",
      "Compliance becomes a natural part of operational growth rather than a last-minute scramble before closing a major customer or funding round.",
    ],
    sections: [
      {
        type: "features",
        heading: "Designed for Fast-Moving Teams",
        intro:
          "Startups rarely have dedicated compliance departments. Founders, engineers, and operations teams must manage compliance alongside their primary responsibilities. Opticini provides a lightweight framework that allows startups to implement essential controls without unnecessary complexity.",
        features: [
          {
            title: "Security & Operational Controls",
            description:
              "Track the policies and operational practices that demonstrate responsible system management, access control, and infrastructure security.",
          },
          {
            title: "Audit Readiness",
            description:
              "Prepare for independent audits or security reviews with organized evidence and documented controls.",
          },
          {
            title: "Customer Assurance",
            description:
              "Provide structured responses to security questionnaires and vendor assessments from prospective customers.",
          },
          {
            title: "Operational Visibility",
            description:
              "Maintain a clear overview of compliance status across systems, policies, and organizational processes.",
          },
        ],
      },
      {
        type: "bullets",
        heading: "Meeting the Expectations of Enterprise Customers",
        intro:
          "Many startups discover that enterprise customers will not move forward without evidence of strong operational and security practices. Common expectations include:",
        items: [
          "Documented security policies",
          "Access management controls",
          "Incident response procedures",
          "Operational logging and monitoring",
          "Vendor and infrastructure oversight",
        ],
        outro:
          "Opticini helps startups demonstrate these capabilities with a structured compliance approach that grows alongside the company.",
      },
      {
        type: "bullets",
        heading: "Supporting Startup Compliance Frameworks",
        intro:
          "While startups may begin with simple internal controls, they often need to align with recognized standards as they scale. Opticini helps teams organize controls associated with frameworks such as:",
        items: [
          "Security assurance standards used by enterprise buyers",
          "Operational governance practices expected by investors",
          "Vendor risk assessments required during procurement",
          "Regulatory frameworks relevant to specific industries",
        ],
        outro:
          "Instead of treating each framework as a separate project, Opticini allows organizations to map controls once and reuse them across multiple requirements.",
      },
      {
        type: "prose",
        heading: "Eliminating Last-Minute Compliance Scrambles",
        paragraphs: [
          "One of the most common startup challenges occurs when compliance becomes urgent.",
          "A major customer requests documentation. A security review must be completed quickly. An audit is required before closing a deal.",
          "Without an organized system, teams scramble to gather documentation and reconstruct operational evidence.",
          "Opticini prevents these disruptions by maintaining a continuous compliance record throughout the year.",
        ],
      },
      {
        type: "prose",
        heading: "Built for Growth",
        paragraphs: [
          "As startups grow, their compliance needs evolve. What begins as basic operational oversight can quickly expand into more structured security and governance requirements.",
          "Opticini adapts to these changes, supporting organizations as they mature from early-stage startups into established companies serving enterprise customers.",
        ],
      },
      {
        type: "closing",
        paragraphs: [
          "Founders and teams should focus their energy on building products and serving customers.",
          "Opticini ensures that compliance obligations remain organized, visible, and manageable—allowing startups to move quickly without sacrificing operational credibility.",
          "Compliance becomes an enabler of growth rather than a barrier to it.",
        ],
      },
    ],
  },
  government: {
    slug: "government",
    title: "Government",
    subtitle: "Structured Compliance for Public Sector Accountability",
    intro: [
      "Government agencies operate under some of the most demanding accountability and oversight requirements of any sector. Public institutions must demonstrate transparency, maintain rigorous operational controls, and ensure compliance with regulatory frameworks that govern financial stewardship, data protection, and operational integrity.",
      "Managing these obligations often involves coordinating across multiple departments, documenting policies and procedures, maintaining evidence of compliance activities, and preparing for audits or regulatory reviews.",
      "Opticini provides a centralized platform that helps government organizations manage compliance with clarity and structure. By organizing controls, documentation, and audit preparation in one system, agencies gain the visibility required to maintain accountability and operational integrity.",
    ],
    sections: [
      {
        type: "features",
        heading: "Designed for Oversight and Transparency",
        intro:
          "Public institutions must demonstrate responsible management of taxpayer resources and public programs. Compliance is not simply an administrative exercise—it is a core function of public trust. Opticini enables government organizations to manage compliance responsibilities through a structured system that supports oversight, documentation, and accountability.",
        features: [
          {
            title: "Policy & Governance Management",
            description:
              "Maintain operational policies, governance documents, and procedural guidelines in a centralized repository accessible to authorized personnel.",
          },
          {
            title: "Internal Controls",
            description:
              "Track and verify operational controls across departments to ensure that processes align with regulatory expectations and organizational standards.",
          },
          {
            title: "Evidence & Documentation",
            description:
              "Maintain records that demonstrate compliance activities, approvals, and operational procedures required during oversight reviews.",
          },
          {
            title: "Audit Preparation",
            description:
              "Prepare for internal audits, external audits, and regulatory reviews with organized documentation and control verification.",
          },
        ],
      },
      {
        type: "bullets",
        heading: "Supporting Public Sector Compliance",
        intro:
          "Government agencies must operate within a framework of laws, regulations, and internal policies that guide operational conduct and program oversight. Typical compliance areas include:",
        items: [
          "Operational governance and policy management",
          "Financial oversight and public accountability",
          "Program compliance and regulatory adherence",
          "Internal control verification",
          "Audit documentation and review preparation",
          "Vendor and contractor oversight",
        ],
        outro:
          "Opticini provides the structure necessary to track these responsibilities and maintain continuous visibility into compliance status.",
      },
      {
        type: "prose",
        heading: "Strengthening Interdepartmental Coordination",
        paragraphs: [
          "Many government compliance challenges arise from fragmented processes across departments. Policies, documentation, and evidence may exist in separate systems or locations, making oversight difficult and increasing audit preparation time.",
          "Opticini centralizes compliance activities across departments, providing leadership with a unified view of operational controls and accountability practices.",
          "This coordination reduces administrative burden while improving oversight across the organization.",
        ],
      },
      {
        type: "prose",
        heading: "Preparing for Regulatory Reviews",
        paragraphs: [
          "Government organizations regularly undergo internal audits, external oversight reviews, and compliance assessments from regulatory bodies. Preparing for these reviews can require extensive document collection and process verification.",
          "Opticini ensures that documentation and compliance evidence are continuously organized, allowing agencies to demonstrate operational integrity with confidence.",
        ],
      },
      {
        type: "closing",
        paragraphs: [
          "Public institutions exist to serve citizens and communities. Maintaining trust requires consistent oversight, transparent governance, and disciplined operational practices.",
          "Opticini helps government organizations maintain these standards by providing a structured system that supports accountability, compliance, and responsible administration.",
        ],
      },
    ],
  },
  healthcare: {
    slug: "healthcare",
    title: "Healthcare",
    subtitle: "Compliance That Protects Patients and Providers",
    intro: [
      "Healthcare organizations operate in one of the most highly regulated environments in modern society. Patient privacy, clinical safety, operational integrity, and regulatory oversight require healthcare providers to maintain disciplined compliance practices across every part of their organization.",
      "Managing these obligations often involves coordinating policies, maintaining operational controls, documenting procedures, and preparing for regulatory reviews and audits. Without a structured system, compliance efforts can become fragmented and difficult to maintain.",
      "Opticini provides healthcare organizations with a centralized platform to manage compliance responsibilities with clarity and consistency. By organizing controls, documentation, and evidence within a single system, healthcare providers can maintain regulatory readiness while focusing on delivering quality care.",
    ],
    sections: [
      {
        type: "features",
        heading: "Built for Healthcare Operational Complexity",
        intro:
          "Healthcare organizations must balance patient care with strict regulatory expectations governing data protection, operational procedures, and clinical accountability. Opticini helps organizations maintain structured oversight of these responsibilities through a clear compliance framework.",
        features: [
          {
            title: "Patient Data Protection",
            description:
              "Track and document policies and operational practices designed to protect patient information and ensure responsible handling of sensitive healthcare data.",
          },
          {
            title: "Operational Policies & Procedures",
            description:
              "Maintain structured documentation of healthcare policies, protocols, and operational procedures required for regulatory compliance.",
          },
          {
            title: "Evidence Management",
            description:
              "Store and organize compliance evidence, approvals, and operational documentation required during reviews and inspections.",
          },
          {
            title: "Audit & Review Preparation",
            description:
              "Prepare for regulatory audits, accreditation reviews, and internal oversight with organized compliance documentation.",
          },
        ],
      },
      {
        type: "bullets",
        heading: "Supporting Healthcare Compliance Requirements",
        intro:
          "Healthcare organizations must demonstrate accountability across several regulatory and operational areas. Typical compliance responsibilities include:",
        items: [
          "Patient privacy and data protection",
          "Operational policies and procedures",
          "Regulatory reporting and documentation",
          "Internal control verification",
          "Audit readiness and inspection preparation",
          "Vendor and service provider oversight",
        ],
        outro:
          "Opticini provides a structured system that helps organizations maintain visibility across these compliance areas.",
      },
      {
        type: "prose",
        heading: "Strengthening Regulatory Readiness",
        paragraphs: [
          "Healthcare regulators and accreditation bodies require organizations to demonstrate operational discipline and consistent oversight. Preparing for inspections or audits can become difficult when documentation is dispersed across multiple systems.",
          "Opticini helps organizations maintain continuous compliance records so that documentation and evidence are always available when needed.",
        ],
      },
      {
        type: "closing",
        paragraphs: [
          "Healthcare organizations exist to provide safe, reliable care for patients. Maintaining strong compliance practices supports this mission by ensuring operational integrity and responsible oversight.",
          "Opticini provides the structure healthcare teams need to maintain compliance while focusing on delivering high-quality patient care.",
        ],
      },
    ],
  },
  fintech: {
    slug: "fintech",
    title: "Fintech",
    subtitle: "Compliance Infrastructure for Financial Innovation",
    intro: [
      "Financial technology companies operate at the intersection of innovation and regulation. While fintech organizations move quickly to deliver new financial services, they must also maintain strict oversight of risk, security, financial controls, and regulatory obligations.",
      "Customers, partners, and regulators expect fintech companies to demonstrate responsible governance and operational discipline. Meeting these expectations requires structured compliance practices that support both growth and accountability.",
      "Opticini provides fintech organizations with a platform to organize controls, maintain documentation, and demonstrate operational integrity within a rapidly evolving financial environment.",
    ],
    sections: [
      {
        type: "features",
        heading: "Supporting Responsible Financial Operations",
        intro:
          "Fintech companies must maintain transparency and accountability across their systems, financial operations, and customer interactions. Opticini helps organizations establish a structured compliance environment that supports responsible financial operations.",
        features: [
          {
            title: "Risk & Control Management",
            description:
              "Track internal controls designed to manage operational, financial, and technological risk.",
          },
          {
            title: "Security & Infrastructure Oversight",
            description:
              "Document security practices, operational procedures, and infrastructure governance that protect financial systems and customer data.",
          },
          {
            title: "Evidence & Documentation",
            description:
              "Maintain verifiable documentation of compliance activities and internal controls required during audits or regulatory reviews.",
          },
          {
            title: "Audit Readiness",
            description:
              "Prepare for independent audits, partner reviews, or regulatory assessments through structured evidence collection.",
          },
        ],
      },
      {
        type: "bullets",
        heading: "Managing Financial Compliance Expectations",
        intro:
          "Fintech organizations must demonstrate oversight across a range of operational and regulatory areas. Typical compliance responsibilities include:",
        items: [
          "Operational risk management",
          "Financial governance and transparency",
          "Security and data protection practices",
          "Vendor and infrastructure oversight",
          "Audit documentation and regulatory reviews",
        ],
        outro:
          "Opticini allows organizations to maintain structured oversight across these responsibilities.",
      },
      {
        type: "closing",
        paragraphs: [
          "Financial technology companies must maintain the trust of customers, regulators, and financial partners. Strong compliance practices help ensure that innovation can continue without compromising operational integrity.",
          "Opticini provides fintech organizations with the compliance infrastructure necessary to support responsible financial innovation.",
        ],
      },
    ],
  },
  education: {
    slug: "education",
    title: "Education",
    subtitle: "Compliance for Modern Educational Institutions",
    intro: [
      "Educational institutions manage a complex combination of academic programs, administrative operations, financial oversight, and student data protection. Schools, universities, and educational organizations must maintain clear policies, operational accountability, and regulatory compliance across these activities.",
      "Managing compliance within educational environments often requires coordinating policies, maintaining documentation, preparing reports, and demonstrating accountability to regulatory authorities and governing boards.",
      "Opticini provides educational institutions with a centralized platform to organize compliance activities and maintain operational transparency.",
    ],
    sections: [
      {
        type: "features",
        heading: "Supporting Institutional Governance",
        intro:
          "Educational organizations must maintain strong governance structures that ensure accountability to students, faculty, regulators, and governing bodies. Opticini helps institutions maintain structured oversight across academic and administrative operations.",
        features: [
          {
            title: "Policy & Procedure Management",
            description:
              "Maintain institutional policies, governance documents, and operational procedures in a centralized system.",
          },
          {
            title: "Student Data Protection",
            description:
              "Document policies and controls designed to protect student information and maintain responsible data management practices.",
          },
          {
            title: "Evidence & Documentation",
            description:
              "Maintain verifiable records supporting institutional policies, procedures, and operational compliance.",
          },
          {
            title: "Audit Preparation",
            description:
              "Prepare for accreditation reviews, institutional audits, and regulatory inspections with organized documentation.",
          },
        ],
      },
      {
        type: "bullets",
        heading: "Key Compliance Areas in Education",
        intro:
          "Educational institutions must demonstrate accountability across several operational domains. Typical compliance responsibilities include:",
        items: [
          "Student data protection and privacy",
          "Institutional governance and oversight",
          "Financial transparency and accountability",
          "Program and accreditation documentation",
          "Policy management and procedural controls",
          "Audit readiness and regulatory reporting",
        ],
        outro:
          "Opticini provides a structured environment that helps institutions maintain visibility across these responsibilities.",
      },
      {
        type: "closing",
        paragraphs: [
          "Educational institutions play a critical role in shaping communities and future generations. Maintaining trust requires transparent governance, responsible oversight, and disciplined operational practices.",
          "Opticini helps institutions maintain this accountability by organizing compliance activities into a clear, manageable framework.",
        ],
      },
    ],
  },
};

export function getVerticalBySlug(slug: string): VerticalContent | null {
  return VERTICALS[slug] ?? null;
}

export function getAllVerticalSlugs(): string[] {
  return Object.keys(VERTICALS);
}
