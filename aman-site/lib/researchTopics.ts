export interface ResearchTopic {
  id: string;
  badge: string;
  title: string;
  tagline: string;
  abstract: string;
  keyMetric: string;
  metricLabel: string;
  highlights: {
    heading: string;
    description: string;
  }[];
  specifications: {
    label: string;
    value: string;
  }[];
  mathematicalBasis?: string;
}

export const RESEARCH_TOPICS: Record<string, ResearchTopic> = {
  vitran7: {
    id: "vitran7",
    badge: "Distributed Compute · Green AI",
    title: "vitran7: Datacentre Dependency Reduction via EV & Edge GPU Compute Mesh",
    tagline: "Harvesting idle onboard automotive compute to build a decentralized, zero-water inference grid.",
    abstract:
      "Modern electric vehicles sit idle in parking garages and charging depots for over 92% of their operational lifespan, yet pack 150–500+ INT8/FP16 TFLOPs of automotive-grade silicon (e.g. NVIDIA Orin, Tesla FSD HW4/HW5). vitran7 is an autonomous peer-to-peer compute substrate that dynamically schedules micro-batch transformer inference and token distillation across parked, high-bandwidth EV clusters, offloading centralized hyperscaler datacentres and drastically curtailing cooling water and grid stress.",
    keyMetric: "78.4%",
    metricLabel: "Peak Datacentre Offload Capacity in Dense Urban Nodes",
    highlights: [
      {
        heading: "Opportunistic P2P Micro-Batching",
        description:
          "Splits KV-cache and weights across nearby charging vehicles with sub-2ms local fiber and 5G mmWave interconnects, executing speculative token generation before returning tokens to edge proxies.",
      },
      {
        heading: "Battery-Health Aware Thermal Scheduling",
        description:
          "Dynamic load throttling strictly caps inference power draws to less than 4% of depot battery pack reserves while exploiting parked liquid-cooling loops for optimal silicon efficiency.",
      },
      {
        heading: "Zero-Trust Byzantine Verification",
        description:
          "Deterministic verification kernels run random probe queries across redundant vehicle nodes to prevent compromised hardware from injecting malicious hallucinated logits.",
      },
    ],
    specifications: [
      { label: "Target Silicon", value: "NVIDIA DRIVE Orin / Thor, Apple Silicon Edge, Tesla HW4" },
      { label: "Interconnect Protocol", value: "QUIC over 5G mmWave & Supercharger Ethernet" },
      { label: "P95 Latency", value: "< 28ms (Urban Edge Cluster)" },
      { label: "Carbon Reduction", value: "Up to 64% vs. Centralized Coal-Powered Datacentres" },
      { label: "Consensus Model", value: "Proof-of-Execution via Sparse Deterministic Checkpoints" },
    ],
    mathematicalBasis:
      "\\min \\sum_{i \\in \\mathcal{V}} \\left( \\mathcal{E}_{battery}(i) + \\lambda \\cdot \\mathcal{L}_{P95}(i) \\right) \\quad \\text{s.t.} \\quad T_{junction}(i) < T_{max}, \\quad SoC(i) \\ge SoC_{target}",
  },

  ahi: {
    id: "ahi",
    badge: "Orchestration Architecture",
    title: "AHI: Artificial Heterogeneous Intelligence",
    tagline: "Unifying symbolic logic, formal verifiers, fast heuristic gates, and neural reasoners into a single synchronous topology.",
    abstract:
      "Monolithic LLMs waste massive computational energy trying to perform arithmetic, graph search, and formal syntax validation inside autoregressive token weights. AHI creates a heterogeneous substrate where neural reasoners delegate deterministic constraints to formal SMT solvers, AST parsers, and specialized micro-models, synthesizing responses with guaranteed mathematical invariants.",
    keyMetric: "99.98%",
    metricLabel: "Formal Verification Invariant Retention",
    highlights: [
      {
        heading: "Specialist Co-Processor Model",
        description:
          "Rather than forcing one multi-billion parameter model to solve all domains, AHI dispatches code to formal linter ASTs, arithmetic to symbolic engines, and narrative planning to generative models.",
      },
      {
        heading: "Deterministic Guardrails",
        description:
          "Every intermediate token stream passes through a non-neural constraint validator that aborts and redirects malformed execution paths before tokens leak to downstream agents.",
      },
      {
        heading: "Asynchronous Tensor Handoff",
        description:
          "Ultra-low latency memory channels bridge Python-based neural layers with Rust-based native execution kernels without serializing to raw JSON.",
      },
    ],
    specifications: [
      { label: "Verification Engine", value: "Z3 SMT Solver & Custom Rust Tree-Sitter AST" },
      { label: "Handoff Overhead", value: "< 140 microseconds per specialist bridge" },
      { label: "Hallucination Reduction", value: "91.2% on formal schema generation benchmarks" },
      { label: "Architectural Pattern", value: "Heterogeneous Micro-Kernel Dispatcher" },
    ],
    mathematicalBasis:
      "\\mathcal{Y} = \\text{Verify}_{\\mathcal{S}}\\left( \\mathcal{F}_{neural}(\\mathcal{X}) \\cap \\mathcal{C}_{formal} \\right) \\cup \\mathcal{G}_{symbolic}(\\mathcal{X})",
  },

  semanticExecution: {
    id: "semanticExecution",
    badge: "Runtime Engine",
    title: "Layered Semantic Execution & Speculative Graph Branching",
    tagline: "Translating human intents into typed semantic IR graphs with transactional rollbacks.",
    abstract:
      "Traditional AI pipelines treat prompts as unstructured text streams, leading to unpredictable side-effects. Layered Semantic Execution compiles user prompts into an explicit Intermediate Representation (IR) consisting of discrete semantic opcodes. Execution occurs in isolated sandbox layers with support for speculative branch prediction and atomic state rollbacks.",
    keyMetric: "4.2x",
    metricLabel: "Execution Throughput via Speculative Branching",
    highlights: [
      {
        heading: "Semantic Intermediate Representation (SIR)",
        description:
          "Converts natural language goals into a strongly typed directed acyclic graph (DAG) of idempotent operations with strict input/output contracts.",
      },
      {
        heading: "Speculative Branch Evaluation",
        description:
          "Pre-executes likely secondary tool calls and database queries in temporary copy-on-write memory while waiting for user confirmation.",
      },
      {
        heading: "Transactional Rollback Journals",
        description:
          "Every state modification maintains an inverse operation journal. If any downstream invariant fails, the entire transaction reverts cleanly.",
      },
    ],
    specifications: [
      { label: "IR Format", value: "Typed Protocol Buffers / Cap'n Proto Semantic Graph" },
      { label: "Branch Accuracy", value: "88.6% on multi-turn developer workflows" },
      { label: "Rollback Latency", value: "< 1.5ms across in-memory state trees" },
      { label: "Type Safety", value: "Compile-time schema verification for tool calls" },
    ],
    mathematicalBasis:
      "\\mathcal{S}_{t+1} = \\begin{cases} \\delta(\\mathcal{S}_t, \\text{Op}_k) & \\text{if } \\Phi(\\text{Op}_k) = \\text{Valid} \\\\ \\text{Rollback}(\\mathcal{S}_t) & \\text{otherwise} \\end{cases}",
  },

  memoryLayers: {
    id: "memoryLayers",
    badge: "Memory Subsystem",
    title: "Task-Isolated Ephemeral & Hierarchical Memory Layers",
    tagline: "Preventing context pollution through zero-leak task memory barriers and rolling semantic compaction.",
    abstract:
      "Feeding an agent's entire multi-hour conversation history into every prompt causes severe attention dilution, hallucinations, and exponential cost spikes. This architecture creates a hierarchical memory subsystem: global durable facts, ephemeral task scratchpads, and a rolling compaction layer that synthesizes completed subtasks into lossless compressed delta-states.",
    keyMetric: "68.2%",
    metricLabel: "Context Window Compaction without Recall Loss",
    highlights: [
      {
        heading: "Task-Scoped Ephemeral Scratchpads",
        description:
          "Each sub-agent gets a dedicated sandbox memory that is completely scrubbed upon task completion, guaranteeing zero state contamination to subsequent agents.",
      },
      {
        heading: "Lossless Delta Compaction",
        description:
          "Replaces thousands of conversational tokens with a structured semantic state delta recording exact variables, files modified, and unresolved invariants.",
      },
      {
        heading: "Vector-Graph Hybrid Recall",
        description:
          "Pairs dense semantic embeddings with an explicit entity knowledge graph for sub-millisecond retrieval of historical context.",
      },
    ],
    specifications: [
      { label: "Isolation Guarantee", value: "Process-level memory boundaries per sub-agent" },
      { label: "Compaction Ratio", value: "3.1:1 to 4.8:1 token reduction" },
      { label: "Retrieval Latency", value: "< 8ms (HNSW index + in-memory graph)" },
      { label: "Memory Hierarchy", value: "L1 Ephemeral → L2 Task Delta → L3 Durable Knowledge" },
    ],
    mathematicalBasis:
      "\\mathcal{M}_{effective}(t) = \\mathcal{M}_{L3} \\oplus \\text{Compact}(\\mathcal{M}_{L2}(t)) \\oplus \\text{Scratchpad}_{L1}(task_k)",
  },
};
