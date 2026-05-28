# 🛡️ virtForce OS

<p align="center">
  <img src="https://img.shields.io/badge/Orchestrator-LangGraph_Supervisor-00d2ff?style=for-the-badge&logo=docker" alt="Orchestrator" />
  <img src="https://img.shields.io/badge/Sandboxes-Isolation_V2-3b82f6?style=for-the-badge&logo=linux" alt="Sandboxes" />
  <img src="https://img.shields.io/badge/Gateways-WhatsApp_%26_Telegram-22c55e?style=for-the-badge&logo=telegram" alt="Gateways" />
  <img src="https://img.shields.io/badge/License-MIT_Open_Source-yellow?style=for-the-badge" alt="License" />
</p>

---

<p align="center">
  <strong>A high-integrity, completely self-hosted developer swarm designed for single-operators and indie makers.</strong><br />
  Run secure, containerized, and sandbox-isolated software development loops (CEO, PM, Dev, QA, Growth Marketer) with complete sovereignty.
</p>

---

## ⚡ Quickstart: Boot Swarm in 3 Lines

Spin up your private orchestrator and sandboxed developer agents on any host or local machine:

```bash
git clone https://github.com/virtforce/virtforce.git
cd virtforce && cp .env.example .env
docker-compose up --build
```

Host is bound to **`http://localhost:3000`**. Open your browser to begin monitoring container lifecycles in the Telemetry HQ dashboard.

---

## 💡 The Core Mission: Self-Hosted Developer Sovereignty

Traditional multi-agent frameworks are monolithic and cloud-dependent. They require massive server clusters, expose raw process contexts to remote execution vulnerabilities, and charge high monthly SaaS fees to manage what should be private developmental assets.

**virtForce** flips this model entirely:
*   **Your Code, Your Sandboxes:** All package installation and code verification checks execute within air-gapped container boundaries on your own $5/month host VPS.
*   **Zero Cloud Bloat:** Lightweight individual runtimes host tiny self-contained execution containers orchestrated locally.
*   **No Interactive Lockout:** Monitor and control state loops easily through a beautiful localized telemetry workspace.

---

## 🎨 Major Innovation: Interactive CAD Swarm Canvas

Unlike projects like HKUDS/ClawTeam and SwarmClaw which rely on opaque, non-interactive terminal outputs or read-only text lists, **virtForce** introduces of an state-of-the-art **Interactive Topological CAD Swarm Canvas**:

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

## 📊 The Comparative Edge: virtForce vs. Alternatives

| Operational Parameter | 🛡️ virtForce Advantage | 👥 HKUDS / ClawTeam | 🦀 SwarmClaw |
| :--- | :--- | :--- | :--- |
| **Interactive Board** | **Draggable CAD Canvas & Param Inspector [Live Tuning]** | Traditional text-based terminal summaries | Read-only hierarchical trees or static logs |
| **Execution Isolation** | **Triple-layer disposable sandboxes [Low, Med, High_Nano]** | Shared raw process execution pools | Standard multi-tenant database clusters |
| **Human-In-The-Loop** | **Integrated active Git Delta diff staging viewer** | None or simple text prompt prompts | Terminal stream block log list |
| **Deployment Pricing** | **Single micro-host ($5/mo VPS)** | Requires expensive cluster systems | Requires heavy enterprise cloud indices |
| **Social Gateways** | **Built-in verified API webhooks (WhatsApp & Telegram)** | Heavy UI console dependencies | None |
| **Acquisition Engine** | **Organic copywriters & embeddable beta waitlists** | Strictly command line codes | Opaque developer boards |

---

## 🛠️ Key Architectural Pillars

### 1. Ephemeral Secure Sandboxing V2
Every time a code development task is initiated, virtForce isolates the thread inside a zero-privilege Docker runtime container. If any third-party script makes malicious API calls or accesses restricted files, the security fence automatically kills the script and triggers a visual telemetry warning.

### 2. HITL (Human-In-The-Loop) Change Control
virtForce prioritizes code safety. DEV containers output pristine git file deltas (`git diff` representation) and stage pull requests inside the Security Sandbox holding chamber. Developers inspect true side-by-side git file additions or deletions before committing updates to the production branch:

```bash
# How virtForce performs staging checks inside the air-gapped sandboxes
npm run build && tsc --noEmit && git diff --staged
```

### 3. Remote Channel Gateways
Trigger diagnostics or code compiles directly from your phone while on the go. virtForce exposes small, fast, secure inbound endpoints verified against encryption keys to receive and map commands from Telegram, WhatsApp, or Slack into active supervisor queues safely.

---

## 📁 Repository Blueprint

```text
├── server.ts                 # Express full-stack orchestration router & Vite asset proxy
├── docker-compose.yml        # Self-contained micro-containers config specification
├── ARCHITECTURE.md           # Visual container lifecycles & message validation topologies
├── INSTALL.md                # Vitals setup guide and basic troubleshooting procedures
├── README.md                 # Primary open-source repo details (this file)
├── src/
│   ├── main.tsx              # React bootstrap target
│   ├── App.tsx               # Primary single-page coordinator (Landing & HQ panels)
│   ├── components/
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
   git clone https://github.com/virtforce/virtforce.git
   cd virtforce
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

## 📜 License

virtForce is open-source software licensed under the [MIT License](LICENSE). 
Created and maintained by self-hosted indie makers.
