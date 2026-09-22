# Aman Kumar Singh — Portfolio & Advanced AI Research Hub

Next.js 14 (App Router) + Tailwind CSS + GSAP + Three.js + Framer Motion.

## Run It

From either the root workspace folder or the `aman-site` directory:

```bash
npm run dev
```

- **Automatic Free Port Detection**: Automatically checks port availability and binds to the first open port (e.g. 3000, 3001...) without `EADDRINUSE` conflicts.
- Open `http://localhost:3000` (or the assigned port).
- `npm run build` produces a production build (SSR-ready, deployable to Vercel as-is).

---

## What's Built

### 1. Advanced Research Subpage (`/research`)
Dedicated interactive research laboratory exploring next-generation AI systems and decentralized green compute:

- **vitran7: Datacentre Dependency Reduction via EV & Edge GPU Compute Mesh**
  - **Interactive 3D Simulation** (`components/three/Vitran7Mesh3D.tsx`): Real-time WebGL mesh showing parked EV clusters (Tesla FSD HW4, NVIDIA DRIVE Orin) running P2P micro-batching and tensor sharding over low-latency interconnects.
  - **Live Fleet Orchestration Slider**: Scale from 200 to 50,000 EVs to calculate aggregate cluster TFLOPs, datacentre offload percentage (up to 78.4%+), and zero-water cooling energy savings (MWh).
  - **Node Inspector**: Click any EV node in 3D to inspect real-time SoC battery levels, silicon temperature, and active transformer layers.

- **AHI: Artificial Heterogeneous Intelligence**
  - **Interactive 3D Synapse Lattice** (`components/three/AHISynapseField.tsx`): Crystalline multi-agent network uniting symbolic SMT solvers (Z3), deterministic AST checkers (Tree-sitter), fast heuristic filters, and deep LLM reasoners.
  - **Live Dispatch Matrix**: Interactive evaluation simulator proving 99.98% formal invariant retention and <140µs cross-agent handoffs.

- **Layered Semantic Execution & Speculative Graph Branching**
  - **Interactive 3D Holographic Stack** (`components/three/SemanticStack3D.tsx`): Visualizes token compilation into typed Semantic Intermediate Representation (SIR) opcodes.
  - **Step-Through Execution & Rollback Demonstrator**: Step through speculative branches and trigger simulated runtime faults to watch the atomic rollback journal revert state in <1.5ms.

- **Task-Isolated Ephemeral & Hierarchical Memory Layers**
  - **Interactive 3D Memory Strata** (`components/three/MemoryHoloLayers3D.tsx`): Visualizes L1 Ephemeral Scratchpads (zero state leakage), L2 Rolling Delta Compactors (68.2% context compaction), and L3 Vector-Graph Knowledge Cores.

---

### 2. Main Portfolio & Agent Delegation Experience (`/`)

- **Notch-style floating nav** (`components/Navbar.tsx`) — dynamic-island-style pill with GSAP expansion and badge linking directly to the Research Lab.
- **Agent Constellation** (`components/three/AgentConstellation.tsx`) — signature 3D piece with one orchestrator node delegating across 10 efficiency concepts.
- **Selected Works & Case Studies** (`components/sections/Projects.tsx`) — interactive modal case studies for Linkyy Online, Metric+, and Woxy request defense.
- **AI Lab Section** (`components/sections/AILab.tsx`) — full list/detail view of the ten efficiency concepts and their throughput gains.
- **Delegation Pipeline** (`components/sections/Process.tsx`) — one-agent-one-task delegation architecture and critical review rubric.
- **Interactive Contact Dispatch** (`components/sections/Contact.tsx`) — instant one-click clipboard copy, email client trigger, and interactive dispatch form.

---

## Stack & Performance

- **Three.js**: Pure vanilla WebGL shaders and procedural geometries for maximum 60fps performance without heavyweight 3D model asset overhead.
- **GSAP & ScrollTrigger**: Smooth timeline sequencing and viewport reveals with full `prefers-reduced-motion` compliance.
- **Framer Motion**: Gesture-driven modal animations and state transitions.
- **TypeScript**: 100% strict type safety across all components and data definitions.
