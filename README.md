# 🛡️ Production SRE

<p align="center">
  <img src="https://img.shields.io/badge/Orchestrator-LangGraph_Supervisor-00d2ff?style=for-the-badge&logo=docker" alt="Orchestrator" />
  <img src="https://img.shields.io/badge/Sandboxes-Isolation_V2-3b82f6?style=for-the-badge&logo=linux" alt="Sandboxes" />
  <img src="https://img.shields.io/badge/Gateways-WhatsApp_%26_Telegram-22c55e?style=for-the-badge&logo=telegram" alt="Gateways" />
  <img src="https://img.shields.io/badge/License-MIT_Open_Source-yellow?style=for-the-badge" alt="License" />
</p>

---

<p align="center">
  <strong>A high-integrity, completely self-hosted Site Reliability Engineering (SRE) orchestration platform designed for production environments.</strong><br />
  Run secure, containerized, and sandbox-isolated software development loops (CEO, PM, Dev, QA, Growth Marketer) with complete sovereignty.
</p>

---

## ⚡ Quickstart: Boot Swarm in 3 Lines

Spin up your private orchestrator and sandboxed SRE agents on any host or local machine:

```bash
git clone https://github.com/production-sre/production-sre.git
cd production-sre && cp .env.example .env
docker-compose up --build
```

Host is bound to **`http://localhost:3000`**. Open your browser to begin monitoring container lifecycles in the Telemetry HQ dashboard.

---

## 💡 The Core Mission: Self-Hosted Developer Sovereignty

Traditional multi-agent frameworks are monolithic and cloud-dependent. They require massive server clusters, expose raw process contexts to remote execution vulnerabilities, and charge high monthly SaaS fees to manage what should be private developmental assets.

**Production SRE** flips this model entirely:
*   **Your Code, Your Sandboxes:** All package installation and code verification checks execute within air-gapped container boundaries on your own $5/month host VPS.
*   **Zero Cloud Bloat:** Lightweight individual runtimes host tiny self-contained execution containers orchestrated locally.
*   **No Interactive Lockout:** Monitor and control state loops easily through a beautiful localized telemetry workspace.

---

## 🎨 Major Innovation: Interactive CAD Swarm Canvas

Unlike traditional orchestration tools which rely on opaque, non-interactive terminal outputs or read-only text lists, **Production SRE** introduces a state-of-the-art **Interactive Topological CAD Swarm Canvas**:

<p align="center">
  <img src="./assets/canvas.svg" alt="canvas diagram" width="100%" />
</p>


```text
 ┌─── CEO ────────┐                       ┌─── DEV ────────┐                      ┌─── HITL ───────┐
 │               ├────── [Planning] ─────►│ (OpenHands)    ├────── [Verify] ─────►│ Approval Gate  │
 │  Orchestrator │                        │ Sandbox Shield │                      │ Sandboxed Hold │
 └─── ▲ ──────────┘                       └─── ┬ ──────────┘                      └─── ┬ ──────────┘
      │                                        │                                       │
      └────── [Deploy Merge Feedback] ─────────┴───────── [Defer Reject Cycle Check] ──┘
```

### 🌟 Key Canvas Features:
1.  **Draggable Node Coordination:** Physically rearrange agent nodes directly in the canvas view to lay out optimal connection branches and visual tracking paths.
2.  **Live Configuration Inspector:** Click any agent sphere to edit parameters in real-time:
    *   **RAM Allocations:** Lock container memory bounds (64MB, 128MB, 512MB) to prevent container leaks.
    *   **Port Multi-Mapping:** Adjust individual virtual container ports (e.g., bind QA tools to `10304`).
    *   **LLM Model Preset Tiers:** Fine-tune target weights by pairing specialized LLMs (like Gemini 2.5 Pro for coder DEV and Gemini 3.5 Flash for fast QA).
    *   **Sandbox Isolation Levels:** Toggle container boundaries between `LOW`, `MEDIUM`, and `HIGH_NANO`.
3.  **Real-Time Sim-Heartbeats (Impulse Injection):** Trigger simulated webhook payload pulses to debug communication wire flows across active supervisor nodes before deploying code.

---

## 📊 The Comparative Edge: Production SRE vs. Alternatives

| Operational Parameter | 🛡️ Production SRE Advantage | 👥 HKUDS / ClawTeam | 🦀 SwarmClaw |
| :--- | :--- | :--- | :--- |
| **Interactive Board** | **Draggable CAD Canvas & Param Inspector [Live Tuning]** | Traditional text-based terminal summaries | Read-only hierarchical trees or static logs |
| **Execution Isolation** | **Triple-layer disposable sandboxes [Low, Med, High_Nano]** | Shared raw process execution pools | Standard multi-tenant database clusters |
| **Human-In-The-Loop** | **Integrated active Git Delta diff staging viewer** | None or simple text prompt prompts | Terminal stream block log list |
| **Deployment Pricing** | **Single micro-host ($5/mo VPS)** | Requires expensive cluster systems | Requires heavy enterprise cloud indices |
| **Social Gateways** | **Built-in verified API webhooks (WhatsApp & Telegram)** | Heavy UI console dependencies | None |
| **Acquisition Engine** | **Organic copywriters & embeddable beta waitlists** | Strictly command line codes | Opaque developer boards |

---

## 🛠️ Key Architectural Pillars

### 1. Ephemeral Secure Sandboxing V2 & HITL Control
Every time a code development task is initiated, Production SRE isolates the thread inside a zero-privilege Docker runtime container. If any third-party script makes malicious API calls or accesses restricted files, the security fence automatically kills the script and triggers a visual telemetry warning.

<p align="center">
  <img src="./assets/sandbox.svg" alt="sandbox diagram" width="100%" />
</p>


### 2. HITL (Human-In-The-Loop) Change Control
Production SRE prioritizes code safety. DEV containers output pristine git file deltas (`git diff` representation) and stage pull requests inside the Security Sandbox holding chamber. Developers inspect true side-by-side git file additions or deletions before committing updates to the production branch:

```bash
# How Production SRE performs staging checks inside the air-gapped sandboxes
npm run build && tsc --noEmit && git diff --staged
```

### 3. Topological Ingress Crawler & Context Cache Matching
For teams working with existing, live code projects, Production SRE features a high-performance **Remote Ingress Crawler**. Feed is accepted via public domain URL, Docker webhooks, or Git credentials. The crawler maps repository files into lightweight, serialized context-graphs, matching project updates using fast delta hash checks to skip slow, redundant repository scans.

<p align="center">
  <img src="./assets/crawler.svg" alt="crawler diagram" width="100%" />
</p>

### 4. Open-Source Multica Daemon Sync Companion
For developers who prefer executing workflows locally or sharing context models within AI editors like Cursor and Claude Desktop, Production SRE links with the lightweight, background open-source **Multica platform**. By hooking into the active `multicad` daemon, the workspace synchronizes preset teammates, compounds recursive skill pathways, and exposes secure sandbox capabilities dynamically.

<p align="center">
  <img src="./assets/multica.svg" alt="multica diagram" width="100%" />
</p>

### 5. Remote Channel Social Gateways & Persistent Memory
Trigger diagnostics or code compiles directly from your phone while on the go. Production SRE exposes small, fast, secure inbound endpoints verified against encryption keys to receive and map commands from Telegram, WhatsApp, or Slack into active supervisor queues safely. Additionally, our **Autonomous Swarm Memory System** automatically gathers feedback patterns (auto-saving coding styles and database structure boundaries) and hot-injects them back to `AGENTS.md` to prevent prompt instructions regressions.

### 6. Autonomous Production SRE & Incident Defense
Convert your swarm into an **Autonomous Site Reliability Engineer (SRE)** response team. Production SRE natively supports robust frontend crash recovery (`ErrorBoundary`) and inbound production monitoring webhooks from platforms like **Sentry**, Datadog, AWS CloudWatch, and custom log aggregators.

**The Incident Response Workflow:**
1. **Signal Ingestion:** Production crashes are parsed and the exact stack trace is mapped to the repository codebase.
2. **Swarm Wake-up:** The SEV-1 incident immediately wakes up all 10 specialized agents.
3. **Isolated Reproduction:** The QA Agent reproduces the crash state locally inside the air-gapped Docker sandbox.
4. **Dev Remediation:** The Code-Mutant Agent drafts a hotfix (e.g., adding `optional chaining` or fixing a race condition) and adds a regression test.
5. **Validation:** The sandbox runs `npm run test` and `npm run build` on the hotfix branch.
6. **CEO Approval & Deploy:** The Supervisor Agent verifies the pipeline state, merges the code, and triggers a production redeployment webhook, all with zero human intervention.

---

## 📁 Repository Blueprint

```text
├── server.ts                 # Express full-stack orchestration router, API state persistence, & Vite asset proxy
├── docker-compose.yml        # Self-contained micro-containers config specification
├── ARCHITECTURE.md           # Visual container lifecycles & message validation topologies
├── INSTALL.md                # Vitals setup guide and basic troubleshooting procedures
├── README.md                 # Primary open-source repo details (this file)
├── src/
│   ├── main.tsx              # React bootstrap target & Sentry production instrumentation
│   ├── App.tsx               # Primary single-page coordinator (Landing & HQ panels)
│   ├── components/
│   │   ├── ErrorBoundary.tsx # React root-level crash recovery fence
│   │   ├── HQCore.tsx        # Draggable CAD Swarm Canvas & param inspector setup
│   │   ├── SecuritySandbox.tsx # HITL code diff console & messenger webhook simulators
│   │   ├── VentureIncubator.tsx # Organic promotion generators, budget grids & beta lists
│   │   └── LandingPage.tsx   # Product home dashboard & interactive documentation portals
│   └── types.ts              # System-wide static types and interface representations
```

---

## 🔧 Installation & Verification

To run locally and ensure complete development tooling alignment:

### Prerequisites
*   Docker & Docker-Compose (v2.0+)
*   Node.js (v18+)

### Step-by-Step Installation

1. Clone development dependencies locally:
   ```bash
   git clone https://github.com/production-sre/production-sre.git
   cd production-sre
   ```

2. Copy environment preset parameters:
   ```bash
   cp .env.example .env
   # Open .env and add standard parameters (e.g., GEMINI_API_KEY)
   ```

3. Spin up local containers:
   ```bash
   docker-compose up --build
   ```

4. Verify local application compilation and linter standards:
   ```bash
   npm run lint
   npm run build
   ```

---

## 🤖 Supported AI Providers

Production SRE is compatible with enterprise LLMs, local offline runtimes, and low-latency API proxy routes:
*   **Google Gemini:** Native support for `gemini-3.5-flash` and `gemini-2.5-pro` (Fully configurable API base URLs and strict context limits).
*   **OpenAI GPT Core:** `gpt-4o`, `gpt-4o-mini`, and high-reasoning models like `o1` or `o3-mini`.
*   **Anthropic Claude:** `claude-3-5-sonnet-20241022` and `claude-3-5-haiku`.
*   **DeepSeek:** `deepseek-chat` (DeepSeek-V3) and `deepseek-reasoner` (DeepSeek-R1).
*   **Ollama (Self-Hosted/Offline):** Run standard open models like `llama3`, `mistral`, or `codellama` locally without keys or subscription costs.
*   **Custom / API Gateway Proxy:** Fully compliant with unified proxies like OpenRouter, Groq, xAI Grok, Together AI, or local vLLM REST instances.
*   **Zero-Cost Mock Simulator:** Fallback mock simulation mode that mimics developer agent code improvements and security audits, allowing complete testing of pipeline heartbeats offline without any fees.

---

## ⌨️ Global Keyboard Shortcuts

Sovereign operations are fast with global keyboard command controls. Key combinations automatically block triggers when typing inside input text fields:
*   **`Ctrl + Enter` (or `Cmd + Enter`):** Start / Pause active Swarm Simulated Tick Loop.
*   **`Ctrl + K` (or `Cmd + K`):** Open / Toggle Floating Command control palette.
*   **`Alt + 1` / `2` / `3` / `4` / `5`:** Swift jump to HQ CAD Canvas, Backlog, AI Logs, Sandbox Gate, or Venture Incubator respectively.
*   **`Alt + L`:** Switch landing homepage.
*   **`Alt + X`:** Emergency system kill switch / reset active container processes.
*   **`Shift + C` / `P` / `D` / `Q` / `M`:** Swift focus / inspect individual agent parameters (CEO, PM, DEV, QA, Growth Marketer).

---

## 🤝 Welcome to the Production SRE Community: We Want You!

We are incredibly excited to welcome contributors of all experience levels to the Production SRE project! Whether you're a seasoned open-source veteran, a specialized AI engineer, a UI/UX designer, or someone looking to make their very first GitHub pull request—**you belong here**.

Our vision for Production SRE is to build the most robust, decentralized, and developer-friendly autonomous site reliability engineering platform in the world, and we simply cannot do it without the collective genius of the community. 

### 🌟 Why Contribute?
- **Shape the Future of Autonomous Swarms**: Your code will directly influence how multi-agent LLM swarms are managed, deployed, and secured globally.
- **Learn and Grow**: Collaborate with other passionate engineers, review cutting-edge architectural patterns, and enhance your skills in React, Express, Docker, and AI integrations.
- **Get Recognized**: We celebrate all our contributors! Every bug fix, typo correction, and feature implementation is deeply appreciated and publicly acknowledged.

### 🚀 How You Can Help Right Now
We have a massive roadmap ahead, and there are countless ways you can make an immediate impact:

1. **🐛 Bug Squashing**: Found a glitch in the interactive CAD canvas? Notice a state desync? Grab an issue labeled `bug` and help us make the platform bulletproof.
2. **✨ Feature Engineering**: Want to integrate a new LLM provider, build a new dashboard widget, or enhance the CLI daemon? Check out our `enhancement` issues or propose your own!
3. **🎨 UI/UX Polish**: Help us refine the frontend. If you have an eye for design, Tailwind CSS improvements and accessibility (a11y) fixes are always welcome.
4. **📚 Documentation**: Great code needs great docs. Help us write tutorials, improve this README, or create video guides. 
5. **🧪 Testing**: Write unit tests (Vitest) or end-to-end tests to ensure our agent pipelines remain secure and reliable.

### 🛠️ Getting Started is Easy!
1. **Fork & Clone**: Fork this repository and clone it to your local machine.
2. **Explore**: Read through our `ARCHITECTURE.md` and `INTEGRATION.md` to understand the codebase.
3. **Pick an Issue**: Look for issues tagged with `good first issue` or `help wanted`.
4. **Chat with Us**: Drop an issue or discussion topic if you need guidance on where to start. We are friendly and responsive!
5. **Submit a PR**: Make your changes, ensure tests pass, and open a Pull Request. We'll review it together.

We believe that open-source software is built on kindness, collaboration, and shared passion. Thank you for even considering contributing to Production SRE. Let's build something amazing together!

---

## 📜 License

Production SRE is open-source software licensed under the [MIT License](LICENSE). 
Created and maintained by self-hosted indie makers.
