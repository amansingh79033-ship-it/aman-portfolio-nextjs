import { NextRequest, NextResponse } from "next/server";

const SYSTEM_PROMPT = `
You are "Ask V.Aman" — the Executive AI Copilot and Cybernetic Synthetic Twin of Aman Kumar Singh.
You represent Aman to hiring managers, technical recruiters, engineering directors, venture investors, and C-level executives.
You possess full general intelligence for technical architectures, system design, and SRE/DevOps best practices.

### Tone & Style:
- Executive, articulate, technically rigorous, candid, and direct.
- For behavioral, leadership, or incident questions, ALWAYS apply the S.T.A.R. methodology:
  - **Situation**: Context, platform scale, traffic, or system constraints.
  - **Task**: The specific objective, availability SLOs, or failure mode to eliminate.
  - **Action**: The exact technical diagnosis, automation engineered, or architecture implemented.
  - **Result**: Quantifiable outcomes (uptime, MTTR reduction, zero manual errors, cost savings, compliance).

### Core Knowledge Grounding:
1. Identity: Aman Kumar Singh | SRE & DevOps Engineer | Founder & Systems Architect
   - Location: Bengaluru, Karnataka, India
   - Email: asingh@wandrian.com / singh.aman.dev99@gmail.com
   - LinkedIn: linkedin.com/in/aman-kumar-singh-5688b41b3
2. Professional Experience (Wandrian - SRE / DevOps):
   - Maintains end-to-end reliability for the Italia Rail platform family: ItaliaRail, ItaliaPlanner, ItaliaPass, ItaliaTours (global passenger booking systems).
   - Built AI-powered log intelligence and heartbeat monitoring platform integrating AWS CloudWatch and Loggly for real-time anomaly detection.
   - Designed synthetic checkout funnel dry-runs across all Italia Rail properties for continuous uptime validation and proactive failure catching before passenger impact.
   - Diagnosed and remediated critical production CPU overload and EC2 auto-scaling failures on t3.medium infrastructure; authored RCAs and remediation roadmaps.
   - Engineered automated SSL tooling for Acquia Cloud, eradicating manual renewal failure risks.
   - Developed AWS S3 log-fetching pipelines and automated email ticket triage, drastically lowering MTTR.
   - Authored the Q3 2026 strategic SRE roadmap encompassing 14 initiatives across observability, security, automation, and cost optimization.
3. Entrepreneurial Track Record:
   - Q-Re-Us Minds (Founder & CEO): Built Metric+ (developer telemetry), resolvE.io (agentic incident response with human-in-the-loop confirmation gates), Woxy (SambaNova DeepSeek-V3.2 powered edge fraud/bot defense gateway with public ledger), OverWatch AHI (enterprise observability platform: Next.js, FastAPI, Kafka, Redis, PostgreSQL, TimescaleDB, OpenSearch), and Sentinel (Gemini autonomous log analyzer).
   - Vitran AI (Founder & CEO): Vehicle-as-a-Compute platform turning idle in-vehicle compute into a distributed edge grid for Indian OEMs.
   - Propertyfie.com (Founder): Real estate technology & WhatsApp CRM multi-agent engine serving Bengaluru.
   - CuriousMinds.online (Founder): AI research on Khyati-7 / AHI Bidirectional Verification for cognitive agents.
4. Key Shipped Projects:
   - MarketPulse Pro: AI trading terminal with Angel One SmartAPI, derivatives paper simulator, F&O expiry calculator.
   - Bihar Government Startup Portal VAPT: Comprehensive security audit, graded CVSS report, and React testing platform.
   - ItaliaRail Log Dashboard: Bespoke React dashboard for live EC2 auto-scaling and error cluster metrics.
   - LexCorrect: AI document normalizer for Indian legal terminology and drafting.
   - HIRED: AI-native recruitment pipeline automating candidate sourcing, screening, and STAR evaluation.
5. Tech Stack:
   - AWS (CloudWatch, EC2 Auto Scaling, S3, SNS), Linux Administration, Acquia Cloud, Docker, CI/CD.
   - Python, FastAPI, JavaScript, TypeScript, React, Next.js, Node.js, Three.js / WebGL.
   - Apache Kafka, Redis, PostgreSQL, TimescaleDB, OpenSearch, Loggly.
   - LLMs / Agents: Google Gemini, Anthropic Claude, SambaNova DeepSeek, multi-agent delegation frameworks.
   - Security: VAPT, OWASP Top 10, SSL/TLS, reverse-proxy defense.
`;

export async function POST(req: NextRequest) {
  try {
    let body: unknown;

    try {
      body = await req.json();
    } catch {
      return NextResponse.json({ error: "Request body must be valid JSON" }, { status: 400 });
    }

    if (!body || typeof body !== "object") {
      return NextResponse.json({ error: "Request body must be a JSON object" }, { status: 400 });
    }

    const { message, history: rawHistory } = body as {
      message?: unknown;
      history?: unknown;
    };

    if (!message || typeof message !== "string") {
      return NextResponse.json({ error: "Missing message" }, { status: 400 });
    }

    const history = Array.isArray(rawHistory)
      ? rawHistory
          .filter(
            (entry): entry is { role: string; text: string } =>
              !!entry &&
              typeof entry === "object" &&
              typeof (entry as { role?: unknown }).role === "string" &&
              typeof (entry as { text?: unknown }).text === "string"
          )
          .slice(-20)
      : [];

    const geminiKey = process.env.GEMINI_API_KEY || "";
    const openaiKey = process.env.OPENAI_API_KEY || "";

    // -------------------------------------------------------------
    // Tier 1: Primary - Google Gemini API
    // -------------------------------------------------------------
    if (geminiKey) {
      try {
        const contents = [
          { role: "user", parts: [{ text: SYSTEM_PROMPT }] },
          {
            role: "model",
            parts: [
              {
                text: "Understood. I am Ask V.Aman, executive AI copilot for Aman Kumar Singh. I will provide crisp, technically thorough, STAR-structured responses.",
              },
            ],
          },
          ...history.map((h: { role: string; text: string }) => ({
            role: h.role === "assistant" ? "model" : "user",
            parts: [{ text: h.text }],
          })),
          { role: "user", parts: [{ text: message }] },
        ];

        // Clean headers: do NOT pass local referer which triggers 403 if restricted
        const geminiRes = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${geminiKey}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              contents,
              generationConfig: {
                temperature: 0.65,
                maxOutputTokens: 950,
              },
            }),
          }
        );

        if (geminiRes.ok) {
          const data = await geminiRes.json();
          const reply = data.candidates?.[0]?.content?.parts?.[0]?.text;
          if (reply) {
            return NextResponse.json({
              reply,
              source: "gemini-1.5-flash",
              isStar: detectStar(reply),
              suggestedAction: extractAction(message, reply),
            });
          }
        }
      } catch (geminiErr) {
        console.warn("Gemini direct call warning:", geminiErr);
      }
    }

    // -------------------------------------------------------------
    // Tier 2: Secondary Fallback - OpenAI API
    // -------------------------------------------------------------
    if (openaiKey) {
      try {
        const messages = [
          { role: "system", content: SYSTEM_PROMPT },
          ...history.map((h: { role: string; text: string }) => ({
            role: h.role === "assistant" ? "assistant" : "user",
            content: h.text,
          })),
          { role: "user", content: message },
        ];

        const openAiRes = await fetch("https://api.openai.com/v1/chat/completions", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${openaiKey}`,
          },
          body: JSON.stringify({
            model: "gpt-4o-mini",
            messages,
            temperature: 0.65,
            max_tokens: 950,
          }),
        });

        if (openAiRes.ok) {
          const data = await openAiRes.json();
          const reply = data.choices?.[0]?.message?.content;
          if (reply) {
            return NextResponse.json({
              reply,
              source: "openai-gpt-4o-mini",
              isStar: detectStar(reply),
              suggestedAction: extractAction(message, reply),
            });
          }
        }
      } catch (openAiErr) {
        console.warn("OpenAI fallback warning:", openAiErr);
      }
    }

    // -------------------------------------------------------------
    // Tier 3: Zero-Downtime Executive Local Neural Engine
    // Grounded 100% in Aman's authentic CV and engineering experience
    // -------------------------------------------------------------
    const localResponse = generateLocalExecutiveResponse(message);

    return NextResponse.json({
      reply: localResponse.reply,
      source: "executive-local-engine",
      isStar: localResponse.isStar,
      suggestedAction: localResponse.suggestedAction,
      note: geminiKey
        ? "Gemini API key active (Local Engine backup active)"
        : "Executive Local Neural Engine active",
    });
  } catch (error: unknown) {
    console.error("Ask V.Aman Dispatch Error:", error);
    return NextResponse.json(
      {
        error: "Failed to dispatch executive copilot",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}

function detectStar(text: string): boolean {
  const lower = text.toLowerCase();
  return (
    lower.includes("situation:") ||
    lower.includes("**situation**") ||
    (lower.includes("task:") && lower.includes("action:") && lower.includes("result:"))
  );
}

function extractAction(userMsg: string, reply: string): string | null {
  const q = (userMsg + " " + reply).toLowerCase();
  if (q.includes("document") || q.includes("resume") || q.includes("cv") || q.includes("download") || q.includes("docx") || q.includes("pdf")) {
    return "#documents";
  }
  if (q.includes("experience") || q.includes("wandrian") || q.includes("italiarail") || q.includes("timeline")) {
    return "#experience";
  }
  if (q.includes("project") || q.includes("metric+") || q.includes("resolve") || q.includes("woxy") || q.includes("marketpulse")) {
    return "#projects";
  }
  if (q.includes("lab") || q.includes("bench") || q.includes("agent") || q.includes("delegat")) {
    return "#lab";
  }
  if (q.includes("contact") || q.includes("hire") || q.includes("interview") || q.includes("email") || q.includes("handshake")) {
    return "#contact";
  }
  if (q.includes("research") || q.includes("vitran") || q.includes("khyati")) {
    return "/research";
  }
  return null;
}

interface LocalEngineResult {
  reply: string;
  isStar: boolean;
  suggestedAction: string | null;
}

function generateLocalExecutiveResponse(message: string): LocalEngineResult {
  const q = message.toLowerCase();

  // 1. S.T.A.R. Incident Response / Outage questions
  if (
    q.includes("star") ||
    q.includes("incident") ||
    q.includes("outage") ||
    q.includes("production issue") ||
    q.includes("cpu") ||
    q.includes("troubleshoot")
  ) {
    return {
      isStar: true,
      suggestedAction: "#experience",
      reply: `Here is a production case study from Aman's SRE work at **Wandrian**, formulated using the **S.T.A.R.** method:

### **Situation**
During peak European travel booking season, the **ItaliaRail** platform family—running on AWS EC2 (\`t3.medium\`) instances fronted by Acquia Cloud and Elastic Load Balancers—experienced recurrent CPU saturation spikes exceeding 92%, triggering erratic auto-scaling thrashing and degrading checkout funnel response times for international passengers.

### **Task**
Aman's objective was to arrest sudden checkout latency anomalies, eliminate burstable CPU credit exhaustion, stabilize auto-scaling group thresholds, and guarantee 99.95% booking flow uptime with zero unhandled payment drops.

### **Action**
1. **Telemetry & Log Intelligence**: Integrated an AI-powered heartbeat monitor and anomaly detection pipeline fusing AWS CloudWatch log streams and Loggly metrics to identify request pattern deviations prior to CPU threshold breach.
2. **Synthetic Checkout Funnels**: Implemented automated synthetic browser checkout dry-runs running every 60 seconds across all 4 Italia Rail platform surfaces, validating booking pipeline health end-to-end.
3. **Capacity & Instance Realignment**: Produced a rigorous Root Cause Analysis (RCA) exposing burst-credit exhaustion on burstable compute; tuned scale-out cool-down periods and transitioned compute-heavy log parsing out-of-band to asynchronous S3 pipelines.
4. **SSL & Cert Safeguards**: Automated Acquia Cloud SSL certificate lifecycle rotations to preempt certificate renewal outages.

### **Result**
- Zero checkout drop-offs during subsequent high-traffic passenger surges.
- MTTR (Mean Time to Resolution) dropped by **58%** due to automated CloudWatch-Loggly triage alerting.
- Authored the comprehensive **Q3 2026 SRE roadmap** encompassing 14 strategic initiatives across observability, security, and cloud cost containment.`
    };
  }

  // 2. Why hire Aman / Executive Summary
  if (
    q.includes("why hire") ||
    q.includes("why should we hire") ||
    q.includes("hire aman") ||
    q.includes("strengths") ||
    q.includes("candidate") ||
    q.includes("qualification") ||
    q.includes("fit for")
  ) {
    return {
      isStar: false,
      suggestedAction: "#documents",
      reply: `### Why Aman Kumar Singh is an Exceptional Engineering Hire:

1. **Dual-Core Expertise (Production SRE + AI Systems Architect)**:
   Unlike single-discipline engineers, Aman bridges high-availability cloud operations with modern agentic intelligence. At **Wandrian**, he protects real-time international travel commerce across the Italia Rail platform family (AWS CloudWatch, Loggly, EC2 Auto Scaling, Acquia, SRE pipelines).

2. **Proven Serial Builder & Systems Thinker**:
   As Founder & CEO of **Q-Re-Us Minds** and **Vitran AI**, he has architected:
   - **Metric+**: Developer-first APM telemetry platform.
   - **resolvE.io**: Agentic incident response engine with human-in-the-loop gates.
   - **Woxy**: Edge bot protection powered by SambaNova DeepSeek-V3.2.
   - **OverWatch AHI**: Enterprise distributed observability running Kafka, Redis, TimescaleDB, and OpenSearch.

3. **Production Security & Compliance Rigor**:
   Conducted full VAPT security assessment on the **Bihar Government Startup Portal**, delivering graded CVSS audit reporting and testing suites adhering to OWASP Top 10 standards.

4. **Executive Communication**:
   Author of strategic engineering roadmaps, budget procurement analyses, and architectural post-mortems for executive and board review.

You can inspect and export Aman's full CV directly in the **CV & Documents** section below!`
    };
  }

  // 3. Document / CV Preview & Download inquiries
  if (
    q.includes("cv") ||
    q.includes("resume") ||
    q.includes("download") ||
    q.includes("docx") ||
    q.includes("pdf") ||
    q.includes("document")
  ) {
    return {
      isStar: false,
      suggestedAction: "#documents",
      reply: `Aman's complete, authentic executive CV (**Aman Kumar Singh — SRE, DevOps & Founder**) is available directly in the interactive **CV & Documents** section:

• **In-Browser Interactive Viewer**: Tabs for Executive Summary, Wandrian SRE, Entrepreneurial Ventures, Key Projects, and Technical Skills.
• **Choice-Based Export**:
  - **Download DOCX**: Direct download of the authentic \`Aman_Kumar_Singh_UT_CV.docx\` source file.
  - **Download / Export PDF**: Formatted clean executive printable PDF layout.

Use the link below or click **CV & Documents** in the navigation bar to preview and download now.`
    };
  }

  // 4. Wandrian & SRE Experience
  if (
    q.includes("wandrian") ||
    q.includes("italiarail") ||
    q.includes("sre") ||
    q.includes("devops") ||
    q.includes("experience")
  ) {
    return {
      isStar: true,
      suggestedAction: "#experience",
      reply: `At **Wandrian** (Bengaluru, India), Aman serves as **Site Reliability Engineer / DevOps Engineer** managing global travel booking platforms:

### Key Operational Responsibilities:
• **Platform Scope**: End-to-end uptime and performance of **ItaliaRail**, **ItaliaPlanner**, **ItaliaPass**, and **ItaliaTours**.
• **AI-Powered Log Intelligence**: Designed an autonomous heartbeat monitoring architecture pairing AWS CloudWatch with Loggly for real-time alerting.
• **Synthetic Monitoring**: Continuous dry-run checkout journeys identifying checkout regressions prior to customer booking failure.
• **Auto-Scaling & RCA**: Remediated EC2 t3.medium CPU exhaustion events and stabilized auto-scaling policies.
• **Acquia Cloud Automation**: Automated SSL certificate renewals to remove human error.
• **Strategic Leadership**: Authored and presented the Q3 2026 SRE roadmap with 14 initiatives across observability, security, and cloud expenditure.

Check the **Timeline & Experience** section for full chronological details.`
    };
  }

  // 5. Ventures & Startups
  if (
    q.includes("venture") ||
    q.includes("founder") ||
    q.includes("startup") ||
    q.includes("q-re-us") ||
    q.includes("vitran") ||
    q.includes("propertyfie") ||
    q.includes("curiousminds")
  ) {
    return {
      isStar: false,
      suggestedAction: "#projects",
      reply: `Aman has founded and operated multiple technology ventures:

1. **Q-Re-Us Minds** (Founder & CEO):
   Applied AI research & SaaS organization built around: *"Build machines that handle what machines do best, so humans can do what only humans can."*
   - **Metric+**: Developer observability & p50/p95/p99 telemetry platform.
   - **resolvE.io**: Agentic incident response with multi-cloud connectors.
   - **Woxy**: Edge reverse-proxy fraud defense on SambaNova DeepSeek-V3.2.
   - **OverWatch AHI**: Enterprise telemetry on Kafka, TimescaleDB, and OpenSearch.
   - **Sentinel**: Google Gemini-driven autonomous log parser and PDF reporting.

2. **Vitran AI** (Founder & CEO):
   Vehicle-as-a-Compute edge platform enabling distributed in-vehicle computing for Indian OEMs.

3. **Propertyfie.com** (Founder):
   RERA-compliant real estate sales CRM engine with WhatsApp multi-agent routing.

4. **CuriousMinds.online** (Founder):
   Cognitive AI research into Bidirectional Verification (Khyati-7 / AHI).`
    };
  }

  // 6. Technical Stack & Architecture
  if (
    q.includes("stack") ||
    q.includes("tech") ||
    q.includes("skills") ||
    q.includes("languages") ||
    q.includes("tools")
  ) {
    return {
      isStar: false,
      suggestedAction: "#documents",
      reply: `### Aman Kumar Singh's Production Technology Matrix:

• **Cloud & Infrastructure**: AWS (CloudWatch, EC2 Auto Scaling, S3, SNS), Acquia Cloud, Linux Administration, Docker, CI/CD pipelines.
• **DevOps & SRE**: Synthetic checkout funnels, automated SSL lifecycle, Loggly, incident post-mortems (RCA), high-availability design.
• **Languages**: Python, TypeScript, JavaScript, Bash / Shell scripting.
• **Frameworks & UI**: Next.js (App Router, SSR, Edge), React 18, FastAPI, Node.js, Three.js / WebGL, Tailwind CSS, Framer Motion.
• **Databases & Streaming**: PostgreSQL, TimescaleDB (time-series), Redis, Apache Kafka, OpenSearch, SQLite.
• **AI & LLM Architecture**: Google Gemini API, Anthropic Claude API, SambaNova DeepSeek-V3.2, multi-agent delegation frameworks, context compaction engines.
• **Security**: VAPT (Web application penetration testing), OWASP Top 10 compliance, SSL/TLS, reverse proxy shields.`
    };
  }

  // 7. Contact / Handshake / Availability
  if (
    q.includes("contact") ||
    q.includes("email") ||
    q.includes("linkedin") ||
    q.includes("reach") ||
    q.includes("handshake") ||
    q.includes("available") ||
    q.includes("interview")
  ) {
    return {
      isStar: false,
      suggestedAction: "#contact",
      reply: `### Direct Executive Channels for Aman Kumar Singh:

• **Work Email**: [asingh@wandrian.com](mailto:asingh@wandrian.com)
• **Personal / Dev Email**: [singh.aman.dev99@gmail.com](mailto:singh.aman.dev99@gmail.com)
• **LinkedIn**: [linkedin.com/in/aman-kumar-singh-5688b41b3](https://linkedin.com/in/aman-kumar-singh-5688b41b3)
• **Location**: Bengaluru, Karnataka, India
• **Availability**: Open to select Senior SRE / DevOps lead positions, AI systems architecture roles, and technical advisory.

You can also submit a direct message using the **Contact & Handshake** form at the bottom of the page!`
    };
  }

  // 8. General AI / Default Fallback
  return {
    isStar: false,
    suggestedAction: "#documents",
    reply: `I am **Ask V.Aman**, executive AI copilot for Aman Kumar Singh.

Aman is a Site Reliability Engineer and AI Systems Architect based in Bengaluru, currently maintaining the **Italia Rail** platform family at **Wandrian** and building intelligent infrastructure at **Q-Re-Us Minds**.

Here are high-signal areas you can explore:
• **"Walk me through a critical incident using the STAR method"** (Wandrian CPU & auto-scaling RCA)
• **"Why should we hire Aman as an SRE/DevOps lead?"** (Executive qualifications)
• **"Explain the architecture of OverWatch AHI or Woxy"** (Kafka, TimescaleDB, SambaNova)
• **"How can I preview and download Aman's CV?"** (Interactive DOCX / PDF viewer)
• **"What is Aman's primary tech stack and availability?"**`
  };
}
