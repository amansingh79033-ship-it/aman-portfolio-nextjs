export interface WorkExperience {
  role: string;
  company: string;
  location: string;
  period: string;
  platform?: string;
  bullets: string[];
  tags: string[];
}

export interface Venture {
  role: string;
  name: string;
  location: string;
  period: string;
  tagline: string;
  products?: {
    name: string;
    description: string;
    tech?: string[];
  }[];
  bullets: string[];
  tags: string[];
}

export interface KeyProject {
  title: string;
  subtitle: string;
  tags: string[];
  description: string;
  impact?: string;
  link?: string;
}

export interface SkillCategory {
  category: string;
  items: string[];
}

export interface CVData {
  name: string;
  titles: string[];
  location: string;
  email: string;
  linkedin: string;
  summary: string;
  coreCompetencies: string[];
  experience: WorkExperience[];
  ventures: Venture[];
  projects: KeyProject[];
  skills: SkillCategory[];
  languages: { language: string; proficiency: string }[];
}

export const cvData: CVData = {
  name: "Aman Kumar Singh",
  titles: [
    "Site Reliability Engineer",
    "DevOps Engineer",
    "Founder & Systems Architect"
  ],
  location: "Bengaluru, Karnataka, India",
  email: "asingh@wandrian.com",
  linkedin: "https://linkedin.com/in/aman-kumar-singh-5688b41b3",
  summary:
    "Results-driven Site Reliability Engineer and DevOps practitioner with production experience maintaining high-availability cloud infrastructure for international travel booking platforms. Specialises in AI-powered observability, autonomous log intelligence, and agentic incident response systems. Parallel track as a serial entrepreneur — founding and operating multiple ventures across AI-native SaaS, real estate technology, automotive compute platforms, and educational technology — with deep expertise in full-stack system design, product engineering, and go-to-market execution.",
  coreCompetencies: [
    "Site Reliability Engineering",
    "DevOps & Automation",
    "Cloud Infrastructure (AWS)",
    "Linux Administration",
    "Python & FastAPI",
    "JavaScript / TypeScript",
    "React & Next.js",
    "Apache Kafka & Distributed Systems",
    "Redis & TimescaleDB / PostgreSQL",
    "OpenSearch & Loggly",
    "Docker & CI/CD Pipelines",
    "Observability & Log Analysis",
    "Synthetic Monitoring Funnels",
    "Incident Response & Post-Mortems",
    "AI / LLM Application Architecture",
    "Agentic Multi-Agent Systems",
    "Security (VAPT & OWASP Top 10)",
    "System Design & Reliability Architecture"
  ],
  experience: [
    {
      role: "Site Reliability Engineer / DevOps Engineer",
      company: "Wandrian",
      location: "Bengaluru, India",
      period: "Present",
      platform: "Italia Rail Platform Family (ItaliaRail, ItaliaPlanner, ItaliaPass, ItaliaTours)",
      tags: ["AWS", "CloudWatch", "Loggly", "SRE", "Synthetic Monitoring", "Acquia", "EC2 Auto-scaling"],
      bullets: [
        "Manage end-to-end availability and reliability of the Italia Rail platform family — ItaliaRail, ItaliaPlanner, ItaliaPass, ItaliaTours — international travel booking systems serving global passenger traffic.",
        "Designed and built an AI-powered log intelligence and heartbeat monitoring platform integrating AWS CloudWatch and Loggly, enabling proactive anomaly detection and real-time alerting across all four production properties.",
        "Implemented synthetic checkout funnel dry-runs across all Italia Rail properties for continuous uptime validation and early failure detection before end-user booking impact.",
        "Diagnosed and remediated critical CPU overload and EC2 auto-scaling failures on production ItaliaRail infrastructure (t3.medium); produced root cause analysis (RCA) documentation and architectural remediation recommendations.",
        "Engineered SSL automation tooling for Acquia Cloud, eliminating manual certificate renewal risk and drastically reducing certificate management overhead.",
        "Developed AWS S3 log-fetching pipelines and Gmail/SendGrid-based ticket email automation scripts, significantly improving incident triage velocity and lowering Mean Time to Resolution (MTTR).",
        "Authored and presented the strategic SRE roadmap covering 14 initiatives across observability, reliability, automation, security, and cost optimization.",
        "Conducted competitive infrastructure analysis for executive budget presentations and cloud procurement decisions, including monitoring platform alternatives with detailed cost-benefit breakdowns."
      ]
    }
  ],
  ventures: [
    {
      role: "Founder & CEO",
      name: "Q-Re-Us Minds",
      location: "Bengaluru, India",
      period: "Present",
      tagline: 'Applied AI research & SaaS organization: "Build machines that handle what machines do best, so humans can do what only humans can."',
      tags: ["Applied AI", "Observability", "Next.js", "FastAPI", "Kafka", "TimescaleDB", "Gemini", "SambaNova"],
      products: [
        {
          name: "Metric+",
          description: "Intelligent observability analytics platform eliminating repetitive analytical work for engineers and data teams.",
          tech: ["TypeScript", "Next.js", "TimescaleDB", "Telemetry APIs"]
        },
        {
          name: "resolvE.io",
          description: "Agentic AI incident response platform with multi-cloud integrations, adaptive confidence scoring, human-confirmation gates, and unified operations dashboard.",
          tech: ["FastAPI", "Multi-Agent Graph", "CloudWatch", "Datadog"]
        },
        {
          name: "Woxy",
          description: "Edge fraud and bot protection gateway powered by SambaNova DeepSeek-V3.2 with public transparency ledger, FastAPI backend, and animated dashboard.",
          tech: ["SambaNova", "DeepSeek", "FastAPI", "React", "Edge Workers"]
        },
        {
          name: "OverWatch AHI",
          description: "Enterprise observability and autonomous incident intelligence platform with full DB schema, distributed message queues, and Phase 1 roadmap.",
          tech: ["Next.js", "FastAPI", "Kafka", "Redis", "TimescaleDB", "OpenSearch"]
        },
        {
          name: "Sentinel",
          description: "Autonomous log analysis and intelligence tool using Google Gemini as reasoning engine, SOP-to-playbook ingestion, automated PDF reports, and Slack alerts.",
          tech: ["Google Gemini", "AWS CloudWatch", "Loggly", "ReportLab", "Slack API"]
        }
      ],
      bullets: [
        "Architected and shipped 5 production-grade AI-native systems tailored for reliability, telemetry, and automated incident triage.",
        "Engineered autonomous playbooks converting high-volume unstructured log streams into actionable root-cause hypotheses.",
        "Formulated modular agent architectures separating task dispatch, rubric verification, and audit trail generation."
      ]
    },
    {
      role: "Founder & CEO",
      name: "Vitran AI (formerly VehEdge)",
      location: "Bengaluru, India",
      period: "Present",
      tagline: "Vehicle-as-a-Compute platform enabling distributed in-vehicle compute infrastructure for connected and EV automotive applications.",
      tags: ["Distributed Compute", "Automotive IoT", "Three.js", "Fleet Telemetry", "Edge AI"],
      bullets: [
        "Founded Vehicle-as-a-Compute platform targeting Indian OEMs, turning vehicle compute idle time into an edge grid for distributed intelligence.",
        "Delivered interactive fleet simulation engine, full engineering roadmap, and immersive Three.js landing experience for prospective OEM partners and investors."
      ]
    },
    {
      role: "Founder",
      name: "Propertyfie.com / Mahiya Real Estate Solutions",
      location: "Bengaluru, India",
      period: "Present",
      tagline: "RERA-compliant real estate technology platform and sales CRM engine serving the Bengaluru commercial and residential market.",
      tags: ["RealTech", "WhatsApp CRM API", "Full-Stack Web", "Automation", "RERA"],
      bullets: [
        "Designed and built full-featured WhatsApp CRM with multi-agent support, ticket routing, and incoming call management for distributed sales teams.",
        "Engineered automated lead pipeline ingestion, compliance-checked documentation workflows, and end-to-end client engagement tracking."
      ]
    },
    {
      role: "Founder",
      name: "CuriousMinds.online",
      location: "Bengaluru, India",
      period: "Present",
      tagline: "Educational technology and AI research platform focused on intelligent agent systems and cognitive agent architectures.",
      tags: ["AI Research", "Bidirectional Verification", "Cognitive Agents", "Edge LLMs"],
      bullets: [
        "Conducted foundational research on the Khyati-7 / AHI framework (Bidirectional Verification in AI systems) exploring novel trust, guardrail, and validation mechanisms.",
        "Created the beYOU GPT on-device cognitive agent design guide for edge-deployed personal AI assistants."
      ]
    }
  ],
  projects: [
    {
      title: "MarketPulse Pro",
      subtitle: "AI Trading Terminal & Derivatives Simulator",
      tags: ["React", "Angel One SmartAPI", "F&O Analytics", "WebSockets"],
      description:
        "Full-featured AI-powered trading terminal with Angel One SmartAPI integration, paper trading simulator, F&O expiry date calculator, and custom SVG charting system purpose-built for Indian equity and index options markets."
    },
    {
      title: "Bihar Government Startup Portal VAPT",
      subtitle: "Full Security Assessment & Graded Audit Platform",
      tags: ["Python", "React", "OWASP Top 10", "VAPT", "Cybersecurity"],
      description:
        "Conducted comprehensive security vulnerability assessment of the Bihar Government startup portal; delivered graded executive HTML security report with CVSS severity classifications and interactive React-based VAPT testing platform for remediation tracking."
    },
    {
      title: "ItaliaRail Production Log Analysis Dashboard",
      subtitle: "Real-Time Observability & Auto-Scaling Telemetry",
      tags: ["React", "AWS CloudWatch", "Loggly", "EC2 Telemetry"],
      description:
        "Developed bespoke React-based log analysis and monitoring dashboard for the ItaliaRail production environment, delivering real-time visibility into EC2 auto-scaling triggers, error spikes, and server cluster health metrics."
    },
    {
      title: "LexCorrect",
      subtitle: "AI Legal Document Normalization Engine",
      tags: ["Python", "NLP", "LLM Fine-Tuning", "LegalTech"],
      description:
        "Engineered an AI-powered document correction and normalisation tool specialized for Indian legal language, statutory terminology, and drafting conventions — drastically reducing manual proofing effort."
    },
    {
      title: "HIRED",
      subtitle: "AI-Native End-to-End Recruitment Platform",
      tags: ["Next.js", "AI Screening", "Workflow Automation", "STAR Ranking"],
      description:
        "Designed and developed an AI-native recruitment engine for candidate sourcing, resume parsing, structured interview pipeline management, and objective skill qualification."
    },
    {
      title: "Nifty 50 Historical Pattern Research",
      subtitle: "Index Options Expiry-Eve Forecasting Playbook",
      tags: ["Quantitative Analysis", "Python", "Derivatives", "Statistical Modeling"],
      description:
        "Systematic quantitative analysis on Nifty 50 historical price action and expiry-eve dynamics; formulated detailed F&O scenario playbooks with statistical analysis of pre- and post-expiry market behavior."
    }
  ],
  skills: [
    {
      category: "Cloud & Infrastructure",
      items: ["AWS (CloudWatch, EC2 Auto Scaling, S3, SNS)", "Acquia Cloud", "Linux System Administration", "Docker", "Edge Networks"]
    },
    {
      category: "DevOps & SRE",
      items: ["CI/CD Pipelines", "SSL/TLS Automation", "Synthetic Checkout Funnels", "Autonomous Log Intelligence", "Incident Management & RCA", "High-Availability Architecture"]
    },
    {
      category: "Languages & Frameworks",
      items: ["Python", "TypeScript", "JavaScript", "Bash / Shell", "React", "Next.js (App Router)", "FastAPI", "Node.js", "Three.js / WebGL"]
    },
    {
      category: "Databases & Streaming",
      items: ["PostgreSQL", "TimescaleDB (Time-Series)", "Redis", "Apache Kafka", "OpenSearch", "Loggly", "SQLite"]
    },
    {
      category: "AI, LLMs & Agents",
      items: ["Google Gemini API", "Anthropic Claude API", "SambaNova DeepSeek-V3.2", "Multi-Agent Frameworks", "Context Compaction Engines", "RAG & Vector Retrieval"]
    },
    {
      category: "Security & Integrations",
      items: ["VAPT (Vulnerability Assessment & Penetration Testing)", "OWASP Top 10", "WhatsApp Business API", "SendGrid / Gmail API", "Slack API", "Angel One SmartAPI"]
    }
  ],
  languages: [
    { language: "English", proficiency: "Professional Working Proficiency" },
    { language: "Hindi", proficiency: "Native / Bilingual Proficiency" }
  ]
};
