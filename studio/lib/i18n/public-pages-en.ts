import {
  changeConfig,
  complianceConfig,
  configurationConfig,
  costConfig,
  discoveryConfig,
  evidenceConfig,
  healthConfig,
  performanceConfig,
  riskConfig,
  securityConfig,
} from "@/lib/feature-configs"
import { featureConfigToI18nPayload } from "./feature-config-i18n"

const featuresEn = {
  discovery: featureConfigToI18nPayload(discoveryConfig),
  health: featureConfigToI18nPayload(healthConfig),
  performance: featureConfigToI18nPayload(performanceConfig),
  security: featureConfigToI18nPayload(securityConfig),
  configuration: featureConfigToI18nPayload(configurationConfig),
  compliance: featureConfigToI18nPayload(complianceConfig),
  evidence: featureConfigToI18nPayload(evidenceConfig),
  change: featureConfigToI18nPayload(changeConfig),
  cost: featureConfigToI18nPayload(costConfig),
  risk: featureConfigToI18nPayload(riskConfig),
}

export const PUBLIC_PAGES_EN = {
  featureUi: {
    planeInsight: "Insight Plane {{num}}",
    requestDemo: "Request Demo",
    seeIntegrations: "See integrations →",
  },

  features: featuresEn,

  workspaceOverview: {
    badge: "Dashboard",
    title: "Workspace Overview",
    subtitle: "Monitor audits, sites, and activity at a glance.",
  },

  workspaceLogin: {
    heroTitle: "Workspace Login",
    heroSubtitle:
      "Sign in to access your unified workspace and manage your website performance",
    cardTitle: "Workspace Login",
    cardDescription: "Sign in to access your unified workspace",
    labelUsername: "Username",
    placeholderUsername: "Enter your username",
    labelPassword: "Password",
    placeholderPassword: "Enter your password",
    signingIn: "Signing in...",
    signInButton: "Sign In to Workspace",
    noAccount: "Don't have an account?",
    signUpLink: "Sign Up",
    loginFailedDefault:
      "Login failed. Please check your credentials.",
  },

  footerLinkedPages: {
    partnershipsBadge: "Partnerships",
    frameworksBadge: "Compliance Frameworks",
    inquiryTitle: "Get in Touch",
    inquirySubtitlePartnership:
      "Interested in partnering with Opticini? Tell us about your organization and we'll reach out.",
    inquirySubtitleVertical:
      "Interested in how Opticini can support {{title}}? Tell us about your organization and we'll reach out.",
    labelFullName: "Full Name *",
    labelEmail: "Email *",
    labelOrganization: "Organization",
    labelPhone: "Phone",
    labelInterest: "Tell us about your interest *",
    labelNeeds: "Tell us about your needs *",
    placeholderPartnershipInterest:
      "Describe your experience, services, or how you'd like to partner with Opticini...",
    placeholderVerticalNeeds:
      "Describe your compliance or operational challenges...",
    submitting: "Submitting...",
    submitInquiry: "Submit Inquiry",
    toastInquirySubmittedTitle: "Inquiry Submitted",
    toastInquirySubmittedDesc: "We'll get back to you within 24 hours.",
    toastErrorTitle: "Error",
    toastErrorDesc: "Failed to submit inquiry. Please try again.",
    ctaPartnershipSubtitle:
      "Get in touch to learn more about partnering with Opticini.",
    ctaVerticalTitle: "Ready to simplify compliance?",
    ctaVerticalSubtitle:
      "See how Opticini helps {{title}} focus on their mission.",
    ctaFrameworkTitle: "Ready to simplify {{title}} compliance?",
    ctaFrameworkSubtitle:
      "See how Opticini helps teams manage controls, evidence, and audit readiness.",
    requestDemo: "Request Demo",
  },

  blog: {
    heroBadge: "Resources",
    heroTitle: "Blog",
    heroSubtitle:
      "Insights, tips, and updates about website performance, SEO, and digital marketing",
    loading: "Loading blog posts...",
    searchPlaceholder: "Search posts...",
    search: "Search",
    featuredPosts: "Featured Posts",
    recentPosts: "Recent Posts",
    featuredBadge: "Featured",
    minRead: "{{count}} min read",
    noPosts: "No blog posts available yet.",
    categories: "Categories",
    tags: "Tags",
  },

  feedback: {
    heroBadge: "We value your input",
    heroTitle: "Share Your Feedback",
    heroSubtitle:
      "Help us improve Opticini by sharing your thoughts, suggestions, and experiences",
    experienceTitle: "How was your experience?",
    experienceSubtitle:
      "Your feedback helps us make Opticini better for everyone",
    rating0: "Rate your experience",
    rating1: "Poor",
    rating2: "Fair",
    rating3: "Good",
    rating4: "Very Good",
    rating5: "Excellent",
    greatTitle: "What did we do great?",
    greatPlaceholder:
      "Tell us what you loved about Opticini. What features worked well? What exceeded your expectations?",
    betterTitle: "What could be better?",
    betterPlaceholder:
      "Share suggestions for improvement. What features need work? What would make your experience smoother?",
    removeTitle: "What should we remove and relish?",
    removePlaceholder:
      "What features are frustrating or unnecessary? What should we completely remove or redesign?",
    submitting: "Submitting...",
    submit: "Submit Feedback",
    toastRatingTitle: "Rating Required",
    toastRatingDesc: "Please select a star rating before submitting feedback.",
    toastFeedbackTitle: "Feedback Required",
    toastFeedbackDesc: "Please provide at least one piece of feedback.",
    toastThanksTitle: "Thank You!",
    toastThanksDesc:
      "Your feedback has been submitted successfully. We appreciate your input!",
    toastErrorTitle: "Error",
    toastErrorDesc: "Failed to submit feedback. Please try again.",
  },

  about: {
    heroBadge: "About",
    heroTitle: "About Opticini",
    heroSubtitle:
      "Infrastructure insight, compliance intelligence, and operational clarity — all in one platform.",
    intro: [
      "Opticini was created to solve a problem that many technology teams face: understanding what is actually happening across their infrastructure, systems, and compliance environments.",
      "Modern organizations rely on dozens of platforms, services, and monitoring tools. Critical metrics are scattered, compliance requirements are difficult to track, and operational insights are often buried inside complex dashboards.",
      "Opticini brings those signals together into one unified platform so teams can see what matters, understand risk, and operate with confidence.",
    ],
    storyTitle: "The Story Behind Opticini",
    storySubtitle: "A personal challenge that became a platform for everyone.",
    storyParagraphs: [
      "As a technologist and entrepreneur working from the mountains of Colorado, I often found myself chasing information across different systems just to understand what was happening inside my own infrastructure.",
      "Metrics lived in one tool. Security signals in another. Compliance data somewhere else entirely.",
      "The process of collecting information was exhausting. And even when the data was found, it was rarely clear what to do next.",
      "Hours turned into days researching solutions, comparing tools, reading documentation, and trying to piece together a complete picture of system health and operational risk.",
      "Eventually I realized the real problem wasn't the lack of data.",
    ],
    storyHighlight: "The problem was lack of clarity.",
    storyClosing: [
      "So I built the platform I wished existed.",
      "Opticini began as a personal project to bring together performance insights, system monitoring, compliance signals, and infrastructure visibility into a single place where everything could be understood and acted upon.",
      "What started as a tool for myself evolved into something much bigger — a platform designed to help organizations understand their systems, prepare for audits, and operate with greater confidence.",
      "Today Opticini is built for developers, infrastructure teams, security professionals, consultants, and organizations that need clear visibility into their operational and compliance environments.",
    ],
    missionTitle: "Our Mission",
    missionLead:
      "To simplify infrastructure intelligence and compliance readiness.",
    missionBody: [
      "We believe organizations should not need dozens of disconnected tools just to understand how their systems are performing or whether they are operating securely.",
      "Opticini exists to provide a clear operational picture of infrastructure health, risk posture, and compliance readiness in one accessible platform.",
      "Our goal is to make operational insight and governance available to organizations of every size.",
    ],
    valuesTitle: "Our Values",
    values: [
      {
        title: "Clarity over complexity",
        desc: "Technology should simplify decisions, not create more confusion.",
      },
      {
        title: "Practical solutions",
        desc: "Every feature in Opticini is built around real operational challenges.",
      },
      {
        title: "Transparency",
        desc: "Clear metrics and honest insights are the foundation of strong systems.",
      },
      {
        title: "Continuous improvement",
        desc: "The platform evolves based on real-world feedback and changing infrastructure needs.",
      },
    ],
    providesTitle: "What Opticini Provides",
    providesSubtitle:
      "Opticini brings together multiple operational and compliance capabilities into a unified platform.",
    capabilities: [
      {
        title: "Infrastructure Discovery",
        desc: "Automatically identify and catalog infrastructure assets across environments so teams know exactly what systems exist and how they are connected.",
      },
      {
        title: "Operational Health Monitoring",
        desc: "Monitor system health, service availability, and infrastructure performance signals to detect issues early and maintain reliable operations.",
      },
      {
        title: "Security & Risk Visibility",
        desc: "Identify configuration risks, security signals, and infrastructure vulnerabilities before they become operational problems.",
      },
      {
        title: "Compliance & Governance",
        desc: "Track compliance frameworks, manage controls, and organize audit evidence to maintain continuous readiness for external audits.",
      },
      {
        title: "Evidence & Audit Management",
        desc: "Centralize the documentation, records, and verification data required to demonstrate compliance during security reviews and audits.",
      },
      {
        title: "Infrastructure Insight & Analytics",
        desc: "Convert raw infrastructure data into meaningful insights that help teams understand system behavior, identify trends, and improve operational resilience.",
      },
    ],
    builtForTitle: "Built for Modern Technology Teams",
    builtForSubtitle:
      "Opticini is designed for organizations that need clarity across complex technology environments.",
    builtForIncludes: "This includes:",
    audiences: [
      "infrastructure teams",
      "DevOps engineers",
      "security teams",
      "compliance professionals",
      "consultants and auditors",
      "SaaS companies preparing for audits",
    ],
    builtForClosing:
      "Whether you are preparing for your first compliance framework or operating across multiple infrastructure environments, Opticini provides the insight and structure needed to move forward with confidence.",
  },

  consult: {
    heroBadge: "Talk to Sales",
    heroTitle: "Expert Compliance & Infrastructure Consulting",
    heroSubtitle: "Turn compliance complexity into operational clarity.",
    intro: [
      "Opticini offers professional consulting services designed to help organizations understand their infrastructure posture, prepare for audits, and implement strong compliance and governance practices.",
      "Our experts work alongside your teams to interpret system insights, identify risks, and create practical improvement strategies that move your organization toward continuous compliance.",
    ],
    servicesHeading: "Our Consulting Services",
    servicesSub:
      "Comprehensive advisory services designed to support your organization's compliance and infrastructure maturity.",
    includesLabel: "Includes",
    services: [
      {
        id: "compliance-readiness",
        title: "Compliance Readiness Assessment",
        description:
          "A structured evaluation of your current security and compliance posture to determine readiness for frameworks such as SOC 2, ISO 27001, and other governance standards.",
        includes: [
          "Review of infrastructure and security posture",
          "Identification of compliance gaps",
          "Control mapping against required frameworks",
          "Risk and readiness assessment",
          "Prioritized compliance roadmap",
        ],
        closing:
          "This engagement helps organizations understand where they stand and what steps are required to reach audit readiness.",
      },
      {
        id: "infrastructure-risk",
        title: "Infrastructure & Risk Analysis",
        description:
          "Deep analysis of infrastructure configurations, system health, and operational risk signals generated by the Opticini platform.",
        includes: [
          "Infrastructure insight interpretation",
          "Configuration risk analysis",
          "Operational bottleneck identification",
          "System architecture review",
          "Prioritized risk mitigation recommendations",
        ],
        closing:
          "Our goal is to help teams convert platform insights into meaningful operational improvements.",
      },
      {
        id: "compliance-implementation",
        title: "Compliance Implementation Strategy",
        description:
          "Guidance on implementing compliance frameworks efficiently while minimizing operational disruption.",
        includes: [
          "Framework implementation planning",
          "Policy and control mapping",
          "Evidence collection strategy",
          "Integration planning with existing systems",
          "Implementation timeline and milestones",
        ],
        closing:
          "This service ensures organizations can move from planning to execution with confidence.",
      },
      {
        id: "technical-advisory",
        title: "Technical Advisory",
        description:
          "Expert guidance on infrastructure architecture, system integrations, and governance automation using Opticini.",
        includes: [
          "Architecture review and recommendations",
          "Infrastructure design consultation",
          "Integration planning",
          "Tool selection guidance",
          "Compliance automation strategies",
        ],
        closing:
          "Technical advisory helps organizations build a sustainable and scalable compliance infrastructure.",
      },
      {
        id: "team-training",
        title: "Team Training & Workshops",
        description:
          "Hands-on training programs that teach teams how to operate compliance and infrastructure monitoring programs effectively.",
        includes: [
          "Opticini platform training",
          "Compliance operations workshops",
          "Audit preparation training",
          "Infrastructure monitoring best practices",
          "Team enablement sessions",
        ],
        closing:
          "Training empowers teams to maintain compliance and operational excellence independently.",
      },
      {
        id: "ongoing-advisory",
        title: "Ongoing Advisory & Support",
        description:
          "Continuous expert guidance to help organizations maintain compliance readiness and operational visibility.",
        includes: [
          "Regular compliance check-ins",
          "Infrastructure monitoring guidance",
          "Support with audit preparation",
          "Progress tracking and reporting",
          "Advisory support for emerging risks",
        ],
        closing:
          "This service ensures organizations maintain momentum as their infrastructure and compliance requirements evolve.",
      },
      {
        id: "full-audit",
        title: "Full Compliance & Infrastructure Audit",
        description:
          "A comprehensive engagement that combines readiness assessment, infrastructure analysis, and optimization planning.",
        includes: [
          "Complete compliance readiness review",
          "Infrastructure and risk assessment",
          "Multi-framework analysis",
          "Comprehensive improvement roadmap",
          "Prioritized action plan",
        ],
        closing:
          "This engagement provides organizations with a clear path toward long-term compliance and infrastructure resilience.",
      },
    ],
    partnerTitle: "Consultant & Auditor Partnerships",
    partnerBody:
      "Opticini also supports independent consultants and audit professionals through our partner program. Consultants can onboard and manage multiple client organizations within the platform while providing advisory services and preparing clients for formal audits.",
    partnerBenefitsLabel: "Partners benefit from",
    partnerBenefits: [
      "Multi-client management tools",
      "Audit readiness workflows",
      "Referral and affiliate revenue opportunities",
      "Collaboration tools for client engagements",
    ],
    requestTitle: "Request a Consultation",
    requestSub:
      "Tell us about your compliance or infrastructure challenges, and our experts will help you develop a clear path toward stronger governance, operational insight, and audit readiness.",
    labelName: "Full Name *",
    labelEmail: "Email *",
    labelCompany: "Company",
    labelPhone: "Phone",
    labelService: "Service of Interest *",
    servicePlaceholder: "Select a service",
    serviceCustom: "Custom / Other",
    labelMessage: "Tell us about your challenges *",
    messagePlaceholder:
      "Describe your compliance or infrastructure challenges and what you hope to achieve...",
    submitScheduling: "Schedule a Consultation",
    submitting: "Submitting...",
    sidebarTitle: "Schedule Your Call",
    sidebarSubtitle: "We respond within 24 hours",
    sidebarBlurb:
      "Choose a time that works best for you. We'll send you a calendar invite with meeting details.",
    hoursWeekdayLabel: "Monday – Friday",
    hoursWeekday: "9 AM – 6 PM",
    hoursSatLabel: "Saturday",
    hoursSat: "10 AM – 4 PM",
    quickContact: "Quick Contact",
    ctaTitle: "Transform your compliance operations",
    ctaBody:
      "Schedule a consultation to begin transforming your compliance operations with Opticini.",
    requestDemo: "Request Demo",
    seePlatform: "See Platform",
    toastSuccessTitle: "Consultation Request Submitted",
    toastSuccessDesc: "We'll get back to you within 24 hours with next steps.",
    toastErrorTitle: "Error",
    toastErrorDesc:
      "Failed to submit consultation request. Please try again.",
  },

  cookies: {
    title: "Cookie Policy",
    subtitle:
      "How Opticini uses cookies and similar technologies to enhance your experience",
    lastUpdatedPrefix: "Last updated:",
    whatAre: {
      title: "What Are Cookies?",
      subtitle: "Understanding cookie technology",
      p1: "Cookies are small text files that are stored on your device (computer, tablet, or mobile) when you visit a website. They help websites remember information about your visit, such as your preferred language and other settings, which can make your next visit easier and the site more useful to you.",
      p2: 'Cookies can be "persistent" or "session" cookies. Persistent cookies remain on your device when you go offline, while session cookies are deleted as soon as you close your web browser.',
    },
    usage: {
      title: "How Opticini Uses Cookies",
      subtitle: "Our cookie usage purposes",
      intro: "We use cookies for several important purposes:",
      cards: [
        {
          title: "Essential Cookies",
          body: "These cookies are necessary for the website to function properly. They enable basic functions like page navigation and access to secure areas of the website.",
        },
        {
          title: "Performance Cookies",
          body: "These cookies help us understand how visitors interact with our website by collecting and reporting information anonymously.",
        },
        {
          title: "Functionality Cookies",
          body: "These cookies allow the website to remember choices you make and provide enhanced, more personal features.",
        },
        {
          title: "Analytics Cookies",
          body: "These cookies help us understand how our website is performing and identify areas for improvement.",
        },
      ],
    },
    categories: {
      title: "Types of Cookies We Use",
      subtitle: "Detailed breakdown of our cookie categories",
      blocks: [
        {
          title: "Essential Cookies (Always Active)",
          body: "These cookies are necessary for the website to function and cannot be switched off in our systems.",
          bullets: [
            "Authentication and security cookies",
            "Session management cookies",
            "Load balancing cookies",
          ],
        },
        {
          title: "Performance & Analytics Cookies",
          body: "These cookies help us understand how visitors interact with our website.",
          bullets: [
            "Google Analytics cookies",
            "Performance monitoring cookies",
            "Error tracking cookies",
          ],
        },
        {
          title: "Functionality Cookies",
          body: "These cookies enable enhanced functionality and personalization.",
          bullets: [
            "Language preference cookies",
            "Theme preference cookies",
            "User experience customization cookies",
          ],
        },
      ],
    },
    thirdParty: {
      title: "Third-Party Cookies",
      subtitle: "Cookies from external services",
      intro:
        "Some cookies on our website are set by third-party services that we use to enhance your experience:",
      googleAnalyticsTitle: "Google Analytics",
      googleAnalyticsBody:
        "We use Google Analytics to understand how visitors use our website. Google Analytics uses cookies to collect information about your use of our website, including your IP address.",
      monitoringTitle: "Performance Monitoring",
      monitoringBody:
        "We may use third-party performance monitoring services that set cookies to help us track website performance and identify issues.",
      noteLabel: "Note:",
      noteBody:
        "Third-party cookies are subject to the privacy policies of those third parties. We recommend reviewing their policies for more information.",
    },
    manage: {
      title: "Managing Your Cookie Preferences",
      subtitle: "How to control cookie settings",
      intro: "You have several options for managing cookies:",
      browserTitle: "Browser Settings",
      browserBody:
        'Most web browsers allow you to control cookies through their settings preferences. You can usually find these settings in the "Options" or "Preferences" menu of your browser.',
      consentTitle: "Cookie Consent",
      consentBody:
        "When you first visit our website, you'll see a cookie consent banner that allows you to accept or decline non-essential cookies.",
      optOutTitle: "Opt-Out Tools",
      optOutBody:
        "You can opt out of Google Analytics tracking by installing the Google Analytics Opt-out Browser Add-on.",
      importantLabel: "Important:",
      importantBody:
        "Disabling certain cookies may affect the functionality of our website. Essential cookies cannot be disabled as they are necessary for basic website operation.",
    },
    duration: {
      title: "Cookie Duration",
      subtitle: "How long cookies remain on your device",
      sessionTitle: "Session Cookies",
      sessionBody:
        "These cookies are temporary and are deleted when you close your browser. They are used to maintain your session while using our website.",
      persistentTitle: "Persistent Cookies",
      persistentBody:
        "These cookies remain on your device for a set period or until you delete them. They help us remember your preferences and provide a better user experience.",
      specificTitle: "Specific Durations",
      bullets: [
        "Authentication cookies: 30 days",
        "Preference cookies: 1 year",
        "Analytics cookies: 2 years",
        "Performance cookies: 1 year",
      ],
    },
    updates: {
      title: "Updates to This Policy",
      subtitle: "How we handle changes to our cookie policy",
      p1: "We may update this Cookie Policy from time to time to reflect changes in our practices or for other operational, legal, or regulatory reasons. We will notify you of any material changes by posting the new Cookie Policy on this page.",
      p2: "Your continued use of our website after any changes constitutes acceptance of the updated Cookie Policy.",
    },
    contact: {
      title: "Contact Us",
      subtitle: "Questions about our cookie policy?",
      body:
        "If you have any questions about our use of cookies or this Cookie Policy, please contact us:",
      emailLabel: "Email:",
      emailValue: "privacy@opticini.com",
      websiteLabel: "Website:",
      websiteValue: "opticini.com",
    },
  },

  contactSales: {
    heroBadge: "Contact Sales",
    heroTitle: "Talk to Our Sales Team",
    heroSubtitle:
      "Get in touch to discuss how Opticini can support your compliance and operational needs.",
    sectionTitle: "Tell us about your project",
    sectionSubtitle:
      "Share your details and we'll connect you with the right person to discuss pricing, implementation, and how Opticini fits your organization.",
    labelName: "Full Name *",
    labelEmail: "Email *",
    labelCompany: "Company / Organization *",
    labelPhone: "Phone",
    labelRole: "Your Role",
    rolePlaceholder: "e.g. CISO, Compliance Manager, IT Director",
    labelVertical: "Industry / Vertical",
    verticalPlaceholder: "Select your industry",
    labelTimeline: "When do you plan to start?",
    timelinePlaceholder: "Select timeline",
    labelMessage: "Tell us about your needs *",
    messagePlaceholder:
      "Describe your compliance challenges, goals, or what you're looking to achieve...",
    sending: "Sending...",
    submit: "Contact Sales",
    toastSuccessTitle: "Message Sent",
    toastSuccessDesc: "Our sales team will reach out within 24 hours.",
    toastErrorTitle: "Error",
    toastErrorDesc: "Failed to send message. Please try again.",
    verticals: [
      { value: "nonprofits", label: "Nonprofits" },
      { value: "startups", label: "Startups" },
      { value: "smb", label: "SMB" },
      { value: "government", label: "Government" },
      { value: "healthcare", label: "Healthcare" },
      { value: "fintech", label: "Fintech" },
      { value: "education", label: "Education" },
      { value: "other", label: "Other" },
    ],
    timeToStart: [
      { value: "immediately", label: "Immediately" },
      { value: "30-days", label: "Within 30 days" },
      { value: "90-days", label: "Within 90 days" },
      { value: "6-months", label: "Within 6 months" },
      { value: "exploring", label: "Exploring options" },
    ],
  },

  requestDemo: {
    heroBadge: "Request Demo",
    heroTitle: "Experience Opticini with Demo Data",
    heroSubtitle:
      "Get access to a demo account with pre-loaded sample data to explore all features and capabilities of Opticini.",
    cards: {
      sampleDataTitle: "Sample Data",
      sampleDataBody:
        "Explore real monitoring data, reports, and analytics from sample websites",
      fullAccessTitle: "Full Access",
      fullAccessBody:
        "Access all features including AI analysis, monitoring, and reporting tools",
      expertSupportTitle: "Expert Support",
      expertSupportBody:
        "Get guidance from our team to help you make the most of your demo",
    },
    formTitle: "Request Demo Account",
    formSignedIn:
      "Signed in as {{user}}. We'll use your account details.",
    formAnonymous:
      "Sign in to pre-fill your information, or fill out the form manually.",
    labels: {
      fullName: "Full Name *",
      email: "Email Address *",
      company: "Company / Organization",
      role: "Your Role *",
      useCase: "Primary Use Case *",
      message: "Additional Information",
    },
    placeholders: {
      name: "John Doe",
      email: "john@example.com",
      company: "Acme Inc.",
      role: "Select your role",
      useCase: "What do you want to use Opticini for?",
      message:
        "Tell us more about your needs, timeline, or any specific features you'd like to explore...",
    },
    roleOptions: [
      { value: "CTO", label: "CTO / Technical Director" },
      { value: "Engineering Manager", label: "Engineering Manager" },
      { value: "Developer", label: "Developer" },
      { value: "DevOps", label: "DevOps Engineer" },
      { value: "Product Manager", label: "Product Manager" },
      { value: "Marketing", label: "Marketing Manager" },
      { value: "Other", label: "Other" },
    ],
    useCaseOptions: [
      { value: "Website Monitoring", label: "Website Monitoring" },
      { value: "Performance Analysis", label: "Performance Analysis" },
      { value: "Security Auditing", label: "Security Auditing" },
      { value: "SEO Monitoring", label: "SEO Monitoring" },
      { value: "API Monitoring", label: "API Monitoring" },
      { value: "Multi-site Management", label: "Multi-site Management" },
      { value: "Team Collaboration", label: "Team Collaboration" },
      { value: "Other", label: "Other" },
    ],
    submitting: "Submitting...",
    submit: "Submit Demo Request",
    errorFallback: "Failed to submit demo request. Please try again.",
    submittedTitle: "Demo Request Submitted!",
    submittedSubtitle:
      "Thank you for your interest. We'll review your request and get back to you soon.",
    whatsNextTitle: "What happens next?",
    whatsNext: [
      "Our team will review your demo request",
      "We'll contact you within 24-48 hours",
      "You'll get access to a demo account with sample data",
    ],
    returnHome: "Return to Homepage",
    goWorkspace: "Go to Workspace",
  },

  privacyPolicy: {
    title: "Privacy Policy",
    subtitle:
      "How we collect, use, and protect your information when using Opticini",
    lastUpdatedPrefix: "Last updated:",
    infoCollect: {
      title: "Information We Collect",
      subtitle: "What data we gather and how we use it",
      urlsTitle: "Website URLs",
      urlsBody:
        "When you test a website's performance, we collect the URL you submit for analysis. This information is used solely to provide performance testing services and generate reports.",
      performanceTitle: "Performance Data",
      performanceBody:
        "We collect performance metrics, Core Web Vitals, and analysis results for the websites you test. This data helps us provide accurate performance insights and recommendations.",
      analyticsTitle: "Usage Analytics",
      analyticsBody:
        "We may collect anonymous usage statistics to improve our service, including features used, testing frequency, and general usage patterns.",
    },
    usage: {
      title: "How We Use Your Information",
      subtitle: "Our legitimate purposes for data processing",
    },
    usageItems: [
      "Provide website performance testing and analysis services",
      "Generate detailed performance reports and recommendations",
      "Improve our testing algorithms and service quality",
      "Respond to customer support requests and inquiries",
      "Ensure service security and prevent abuse",
      "Comply with legal obligations and regulations",
    ],
    protection: {
      title: "Data Protection & Security",
      subtitle: "How we keep your information safe",
      securityTitle: "Security Measures",
      securityBody:
        "We implement industry-standard security measures including encryption, secure data transmission, and access controls to protect your information.",
      retentionTitle: "Data Retention",
      retentionBody:
        "Performance test results are retained for 30 days to allow you to review and compare results. After this period, data is automatically deleted.",
      accessTitle: "Access Controls",
      accessBody:
        "Only authorized personnel have access to our systems, and all access is logged and monitored for security purposes.",
    },
    sharing: {
      title: "Data Sharing & Third Parties",
      subtitle: "When and how we share information",
      intro:
        "We do not sell, rent, or trade your personal information to third parties. We may share data only in the following circumstances:",
    },
    sharingItems: [
      "With your explicit consent",
      "To comply with legal requirements or court orders",
      "To protect our rights, property, or safety",
      "With service providers who assist in our operations (under strict confidentiality agreements)",
    ],
    rights: {
      title: "Your Rights & Choices",
      subtitle: "Control over your personal information",
      intro: "You have the right to:",
      contactLine:
        "To exercise these rights, please contact us at privacy@opticini.com",
    },
    rightsItems: [
      "Access your personal information",
      "Request correction of inaccurate data",
      "Request deletion of your data",
      "Object to processing of your data",
      "Request data portability",
      "Withdraw consent at any time",
    ],
    contact: {
      title: "Contact Us",
      subtitle: "Questions about this privacy policy?",
      body:
        "If you have any questions about this Privacy Policy or our data practices, please contact us:",
      email: "Email: privacy@opticini.com",
      website: "Website: opticini.com",
    },
  },

  termsOfService: {
    title: "Terms of Service",
    subtitle: "The terms and conditions governing your use of Opticini services",
    lastUpdatedPrefix: "Last updated:",
    acceptance: {
      title: "Acceptance of Terms",
      subtitle: "By using our service, you agree to these terms",
      p1: 'By accessing and using Opticini ("the Service"), you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.',
      p2: 'These Terms of Service ("Terms") govern your use of our website performance testing and monitoring services. Please read these Terms carefully before using our Service.',
    },
    service: {
      title: "Service Description",
      subtitle: "What Opticini provides",
      intro:
        "Opticini provides website performance testing and monitoring services, including:",
      items: [
        "Website performance analysis and testing",
        "Core Web Vitals measurement",
        "Performance optimization recommendations",
        "Waterfall charts and resource analysis",
        "Performance monitoring and reporting",
      ],
      outro:
        "We reserve the right to modify, suspend, or discontinue any part of the Service at any time with reasonable notice.",
    },
    responsibilities: {
      title: "User Responsibilities",
      subtitle: "Your obligations when using our service",
      intro: "When using Opticini, you agree to:",
      items: [
        "Provide accurate and truthful information",
        "Use the Service only for lawful purposes",
        "Not attempt to gain unauthorized access to our systems",
        "Not interfere with or disrupt the Service",
        "Respect intellectual property rights",
        "Comply with all applicable laws and regulations",
      ],
      importantLabel: "Important:",
      importantBody:
        "You are responsible for ensuring you have the right to test any website URL you submit for analysis.",
    },
    acceptableUse: {
      title: "Acceptable Use Policy",
      subtitle: "What is not allowed on our platform",
      intro: "The following activities are strictly prohibited:",
      items: [
        "Testing websites without proper authorization",
        "Attempting to overload or crash our systems",
        "Using automated tools to abuse our service",
        "Attempting to reverse engineer our technology",
        "Sharing malicious content or links",
        "Violating any applicable laws or regulations",
      ],
      outro:
        "Violation of these terms may result in immediate suspension or termination of your access to the Service.",
    },
    intellectual: {
      title: "Intellectual Property",
      subtitle: "Ownership and usage rights",
      ourRightsTitle: "Our Rights",
      ourRightsBody:
        "The Service and its original content, features, and functionality are owned by Opticini and are protected by international copyright, trademark, patent, trade secret, and other intellectual property laws.",
      yourRightsTitle: "Your Rights",
      yourRightsBody:
        "You retain ownership of any content you submit to our Service. By submitting content, you grant us a non-exclusive, worldwide, royalty-free license to use, display, and distribute your content solely for the purpose of providing our Service.",
      thirdPartyTitle: "Third-Party Content",
      thirdPartyBody:
        "Our Service may contain links to third-party websites or services. We are not responsible for the content or practices of these third-party sites.",
    },
    liability: {
      title: "Limitation of Liability",
      subtitle: "Our liability limitations",
      intro:
        "To the maximum extent permitted by law, Opticini shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from:",
      items: [
        "Your use or inability to use the Service",
        "Any unauthorized access to or use of our servers",
        "Any interruption or cessation of transmission to or from the Service",
        "Any bugs, viruses, or other harmful code that may be transmitted",
        "Any errors or omissions in any content or for any loss or damage incurred",
      ],
      outro:
        "Our total liability to you for any claims arising from the use of our Service shall not exceed the amount you paid us, if any, in the twelve months preceding the claim.",
    },
    termination: {
      title: "Termination",
      subtitle: "How service access can be terminated",
      p1: "We may terminate or suspend your access to the Service immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach the Terms.",
      p2: "Upon termination, your right to use the Service will cease immediately. If you wish to terminate your account, you may simply discontinue using the Service.",
    },
    changes: {
      title: "Changes to Terms",
      subtitle: "How we handle updates to these terms",
      p1: "We reserve the right to modify or replace these Terms at any time. If a revision is material, we will try to provide at least 30 days notice prior to any new terms taking effect.",
      p2: "Your continued use of the Service after any changes constitutes acceptance of the new Terms.",
    },
    contact: {
      title: "Contact Us",
      subtitle: "Questions about these terms?",
      body:
        "If you have any questions about these Terms of Service, please contact us:",
      email: "Email: legal@opticini.com",
      website: "Website: opticini.com",
    },
  },

  upgrade: {
    heroBadge: "Plans & Pricing",
    heroTitle: "Upgrade Your Compliance Infrastructure",
    heroSubtitle:
      "Move from manual compliance management to a fully automated audit readiness platform.",
    intro:
      "Opticini helps teams manage infrastructure visibility, evidence collection, risk monitoring, and audit preparation from a single platform. Whether you're starting your first compliance journey or operating across multiple frameworks, Opticini scales with your organization.",
    whyTitle: "Why Upgrade",
    whySub:
      "Compliance today requires more than spreadsheets and scattered tools. Opticini provides a unified platform that connects:",
    whyBullets: [
      "Infrastructure discovery",
      "Security monitoring",
      "Compliance frameworks",
      "Audit evidence",
      "Risk management",
      "Governance workflows",
    ],
    whyClosing:
      "Upgrade your workspace to unlock deeper automation, reporting, and audit readiness.",
    plansTitle: "Plans",
    plansSub: "Choose the plan that matches your organization's needs.",
    mostPopular: "Most Popular",
    includesLabel: "Includes",
    bestForLabel: "Best for",
    requestDemo: "Request Demo",
    plans: [
      {
        id: "starter",
        name: "Starter",
        tagline: "Perfect for early-stage teams beginning their compliance journey",
        description:
          "Starter provides the foundational tools required to understand infrastructure assets and begin organizing compliance processes.",
        includes: [
          "Infrastructure discovery",
          "Asset inventory",
          "Basic security insights",
          "Compliance workspace",
          "Policy and control library",
          "Manual evidence uploads",
          "Dashboard visibility",
          "Single compliance framework",
        ],
        bestFor: [
          "Startups",
          "Early compliance preparation",
          "Small DevOps teams",
        ],
        closing:
          "Starter helps teams establish a structured approach to compliance while maintaining simplicity.",
      },
      {
        id: "growth",
        name: "Growth",
        tagline: "For organizations actively preparing for compliance audits",
        description:
          "Growth expands the platform with automation and integrations that streamline evidence collection and compliance monitoring.",
        includes: [
          "Everything in Starter plus",
          "Automated evidence collection",
          "Integrations with infrastructure platforms",
          "Configuration monitoring",
          "Risk tracking",
          "Multi-environment support",
          "Audit preparation workspace",
          "Compliance reporting",
          "Additional frameworks",
        ],
        bestFor: [
          "Growing SaaS companies",
          "SOC 2 or ISO preparation",
          "Security teams scaling operations",
        ],
        closing:
          "Growth enables teams to move beyond manual processes and operate with continuous compliance visibility.",
      },
      {
        id: "business",
        name: "Business",
        tagline: "For organizations operating mature compliance programs",
        description:
          "Business introduces advanced governance and workflow capabilities that support ongoing compliance operations across multiple teams.",
        includes: [
          "Everything in Growth plus",
          "Control testing workflows",
          "Remediation tracking",
          "Exception management",
          "Advanced dashboards",
          "Audit lifecycle management",
          "Role-based access controls",
          "Cross-team collaboration tools",
        ],
        bestFor: [
          "Companies maintaining annual certifications",
          "Internal compliance teams",
          "Multi-department governance",
        ],
        closing:
          "Business is designed for organizations conducting recurring audits and managing compliance as a continuous program.",
      },
      {
        id: "enterprise",
        name: "Enterprise",
        tagline: "For large organizations and complex compliance environments",
        description:
          "Enterprise provides the full power of the Opticini platform with advanced customization, integration, and deployment options.",
        includes: [
          "Everything in Business plus",
          "Multi-organization architecture",
          "Unlimited compliance frameworks",
          "Enterprise integrations",
          "API and webhook access",
          "Single sign-on (SSO / SAML)",
          "Custom reporting",
          "Dedicated onboarding and support",
        ],
        bestFor: [
          "Large enterprises",
          "Regulated industries",
          "Multi-subsidiary organizations",
        ],
        closing:
          "Enterprise enables organizations to operate compliance across global infrastructure environments.",
      },
    ],
    consultantTitle: "Consultant & Auditor Program",
    consultantLead: "Grow Your Compliance Practice with Opticini",
    consultantBody:
      "Opticini partners with consultants, auditors, and advisory firms to help their clients achieve compliance faster and more efficiently. Through the Opticini Consultant Program, partners can:",
    consultantBullets: [
      "Onboard their own clients",
      "Manage multiple organizations from a unified workspace",
      "Conduct compliance readiness assessments",
      "Prepare clients for formal audits",
    ],
    consultantClosing:
      "Consultants receive affiliate revenue for client subscriptions and can deliver their advisory services directly through the platform. This model allows consultants and auditors to scale their practice while providing clients with a modern compliance management platform.",
    learnPartner: "Learn About the Partner Program",
    implementationTitle: "Implementation & Advisory",
    implementationIntro:
      "Many organizations benefit from expert guidance when implementing compliance frameworks. Opticini offers optional implementation services including:",
    implementationServices: [
      "Compliance framework configuration",
      "Infrastructure integrations",
      "Policy and control mapping",
      "Audit readiness preparation",
    ],
    implementationClosing:
      "These services ensure teams can begin operating effectively on the platform from day one.",
    finalCtaTitle: "Start your compliance journey with Opticini today",
    finalCtaSub:
      "Choose the plan that matches your organization's needs and begin building a structured, scalable compliance program.",
    seePlatform: "See Platform",
  },
}
