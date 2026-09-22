export type Concept = {
  id: number;
  key: string;
  title: string;
  gain: string;
  summary: string;
  detail: string;
};

export const CONCEPTS: Concept[] = [
  {
    id: 1,
    key: "task-decomposition",
    title: "One-agent-one-task decomposition",
    gain: "+15–20%",
    summary: "Split a broad instruction into ten narrow, independently verifiable subtasks.",
    detail:
      "Instead of one model holding the entire instruction in its head, the instruction is decomposed up front into an ordered task graph. Each node has one job, one owner, and one done-condition — the same discipline a staffing plan uses to split work across ten specialists instead of one generalist.",
  },
  {
    id: 2,
    key: "handoff-contracts",
    title: "Explicit handoff contracts",
    gain: "+10%",
    summary: "Sub-agent N writes a structured summary of what's done before sub-agent N+1 starts.",
    detail:
      "Each sub-agent finishes by writing a short, structured note: what it completed, what it deliberately left out, and what the next agent needs to know. That note — not the raw transcript — is what's passed forward, so context doesn't balloon with every handoff.",
  },
  {
    id: 3,
    key: "context-compaction",
    title: "Rolling context compaction",
    gain: "+20%",
    summary: "Long conversations are periodically summarized into a compact working memory.",
    detail:
      "Rather than keeping every token of a long-running session, older context is periodically compressed into a durable summary layer, freeing the active context window for the task at hand while preserving what actually matters long-term.",
  },
  {
    id: 4,
    key: "long-term-memory",
    title: "Persistent long-term memory layer",
    gain: "+15%",
    summary: "Durable facts live outside the context window and are fetched on demand.",
    detail:
      "Facts, preferences, and prior decisions are written to a separate durable store rather than kept alive in-context indefinitely. Agents read from it selectively, which solves the 'model forgets everything between sessions' problem without bloating every prompt.",
  },
  {
    id: 5,
    key: "critic-pass",
    title: "Independent critic / review pass",
    gain: "+10–15%",
    summary: "An 11th agent reviews the merged output against fixed criteria before shipping.",
    detail:
      "After all ten sub-agents finish, a separate reviewing agent checks the merged result against a fixed rubric — UI quality, backend correctness, SSR/rendering behavior, and security best practices — rather than trusting each sub-agent's self-assessment.",
  },
  {
    id: 6,
    key: "tool-scoping",
    title: "Narrow tool scoping per agent",
    gain: "+8%",
    summary: "Each sub-agent only sees the tools its one task actually needs.",
    detail:
      "A sub-agent responsible for writing copy doesn't get database credentials; one responsible for schema migrations doesn't get a web browser. Narrow tool access reduces wrong-tool errors and shrinks the decision surface for every step.",
  },
  {
    id: 7,
    key: "parallel-execution",
    title: "Parallelizing independent subtasks",
    gain: "+25%",
    summary: "Subtasks with no shared dependency run concurrently instead of in a queue.",
    detail:
      "Not every subtask depends on the one before it. Mapping the dependency graph up front lets independent branches — say, frontend styling and backend schema work — run at the same time instead of waiting in a single-file queue.",
  },
  {
    id: 8,
    key: "structured-io",
    title: "Structured, typed hand-off data",
    gain: "+10%",
    summary: "Agents exchange typed objects, not prose, wherever the data is structured.",
    detail:
      "Where output is inherently structured — a list of files changed, a set of test results — agents pass typed data instead of prose. This removes a whole class of misreading errors at every handoff in the chain.",
  },
  {
    id: 9,
    key: "early-stopping",
    title: "Early-exit on the done-condition",
    gain: "+8%",
    summary: "A subtask agent stops the moment its explicit done-condition is met.",
    detail:
      "Every subtask is scoped with an explicit, checkable finish line. The agent stops there instead of continuing to 'improve' work that's already sufficient — a common source of wasted tokens and scope creep.",
  },
  {
    id: 10,
    key: "final-integration",
    title: "Single integration owner",
    gain: "+12%",
    summary: "One agent — not all ten — is responsible for merging outputs into one artifact.",
    detail:
      "Merging ten sub-agents' output is itself a task, so it gets its own owner rather than being left as an assumption. That agent resolves conflicts and produces the one artifact that goes to review.",
  },
];

export type PipelineStage = {
  agent: number;
  does: string;
  inheritsFrom: string;
  handsOff: string;
};

export const PIPELINE: PipelineStage[] = [
  { agent: 1, does: "Scopes subtask 1 from the original instruction", inheritsFrom: "The raw instruction", handsOff: "Subtask 1 result + a short done-summary" },
  { agent: 2, does: "Picks up where agent 1 stopped", inheritsFrom: "Agent 1's done-summary (not full transcript)", handsOff: "Subtask 2 result + updated summary" },
  { agent: 3, does: "Continues the chain on subtask 3", inheritsFrom: "Agent 2's done-summary", handsOff: "Subtask 3 result + updated summary" },
  { agent: 4, does: "Handles subtask 4 independently", inheritsFrom: "Agent 3's done-summary", handsOff: "Subtask 4 result + updated summary" },
  { agent: 5, does: "Handles subtask 5", inheritsFrom: "Agent 4's done-summary", handsOff: "Subtask 5 result + updated summary" },
  { agent: 6, does: "Handles subtask 6", inheritsFrom: "Agent 5's done-summary", handsOff: "Subtask 6 result + updated summary" },
  { agent: 7, does: "Handles subtask 7", inheritsFrom: "Agent 6's done-summary", handsOff: "Subtask 7 result + updated summary" },
  { agent: 8, does: "Handles subtask 8", inheritsFrom: "Agent 7's done-summary", handsOff: "Subtask 8 result + updated summary" },
  { agent: 9, does: "Handles subtask 9", inheritsFrom: "Agent 8's done-summary", handsOff: "Subtask 9 result + updated summary" },
  { agent: 10, does: "Finishes the final subtask and flags full completion", inheritsFrom: "Agent 9's done-summary", handsOff: "Subtask 10 result + full task-graph status" },
];

export const REVIEW_CRITERIA = [
  { title: "UI", note: "Layout integrity, responsiveness, motion quality, accessibility." },
  { title: "Backend", note: "Correctness of logic, data integrity, error handling." },
  { title: "SSR", note: "Server-render correctness, hydration mismatches, loading states." },
  { title: "Security", note: "Input validation, auth boundaries, dependency and secret hygiene." },
];
