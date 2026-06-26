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

<p align="center">
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 850 460" width="100%" height="auto" style="background: #090a10; border-radius: 12px; border: 1px solid #1e293b; font-family: system-ui, -apple-system, sans-serif;">
    <!-- Dark ambient mesh grid background -->
    <defs>
      <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
        <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#101524" stroke-width="1"/>
      </pattern>
      <linearGradient id="glowGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#3b82f6" stop-opacity="0.15" />
        <stop offset="50%" stop-color="#8b5cf6" stop-opacity="0.05" />
        <stop offset="100%" stop-color="#00d2ff" stop-opacity="0.15" />
      </linearGradient>
      <linearGradient id="neonCyan" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stop-color="#00d2ff" />
        <stop offset="100%" stop-color="#0080ff" />
      </linearGradient>
      <linearGradient id="neonGreen" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stop-color="#10b981" />
        <stop offset="100%" stop-color="#059669" />
      </linearGradient>
      <linearGradient id="lineGlow" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stop-color="#ef4444" stop-opacity="0.2" />
        <stop offset="50%" stop-color="#3b82f6" stop-opacity="0.8" />
        <stop offset="100%" stop-color="#10b981" stop-opacity="0.8" />
      </linearGradient>
      <filter id="shadow" x="-10%" y="-10%" width="120%" height="120%">
        <feDropShadow dx="0" dy="4" stdDeviation="6" flood-color="#000000" flood-opacity="0.5"/>
      </filter>
    </defs>
    
    <rect width="850" height="460" rx="12" fill="#090a10" />
    <rect width="850" height="460" fill="url(#grid)" rx="12" />
    <circle cx="200" cy="150" r="180" fill="url(#glowGrad)" filter="url(#shadow)" />
    <circle cx="650" cy="300" r="120" fill="url(#glowGrad)" filter="url(#shadow)" />

    <!-- App Main Mockup Panel Window Bar -->
    <rect x="15" y="15" width="820" height="430" rx="8" fill="#0c0e16" stroke="#1f293d" stroke-width="1.5" filter="url(#shadow)" />
    <rect x="15" y="15" width="820" height="36" rx="8" fill="#07080d" />
    <!-- Window buttons -->
    <circle cx="35" cy="33" r="5" fill="#f43f5e" />
    <circle cx="50" cy="33" r="5" fill="#eab308" />
    <circle cx="65" cy="33" r="5" fill="#10b981" />
    
    <text x="90" y="37" fill="#64748b" font-size="11" font-family="monospace">🛡️ virtForce OS -- Telemetry HQ Dashboard -- Port 3000</text>
    <rect x="670" y="24" width="150" height="18" rx="4" fill="#1e1b4b" stroke="#312e81" stroke-width="1" />
    <text x="678" y="36" fill="#00d2ff" font-size="9" font-family="monospace" font-weight="bold">● SIMULATION ACTIVE</text>

    <!-- Sidebar Panel Navigation -->
    <rect x="15" y="51" width="120" height="394" fill="#08090f" />
    <!-- Nav Items -->
    <text x="25" y="80" fill="#ffffff" font-size="11" font-weight="bold" font-family="monospace">☰ WORKSPACE</text>
    
    <rect x="20" y="100" width="110" height="20" rx="3" fill="#1e293b" />
    <text x="30" y="113" fill="#00d2ff" font-size="10" font-family="sans-serif" font-weight="500">🎯 CAD Canvas</text>
    
    <text x="30" y="143" fill="#64748b" font-size="10" font-family="sans-serif">⚙️ Sprint Tasks</text>
    <text x="30" y="173" fill="#64748b" font-size="10" font-family="sans-serif">🛡️ Secure Sandboxes</text>
    <text x="30" y="203" fill="#64748b" font-size="10" font-family="sans-serif">💬 Webhook Gate</text>
    <text x="30" y="233" fill="#64748b" font-size="10" font-family="sans-serif">📈 Growth Lab</text>
    
    <!-- System Metrics panel inside Sidebar -->
    <rect x="20" y="340" width="110" height="90" rx="4" fill="#030406" stroke="#161b26" stroke-width="1" />
    <text x="26" y="354" fill="#475569" font-size="8" font-family="monospace" font-weight="bold">BURNRATE / SEC</text>
    <text x="26" y="368" fill="#ef4444" font-size="11" font-family="monospace" font-weight="bold">$0.0018 / s</text>
    <text x="26" y="388" fill="#475569" font-size="8" font-family="monospace" font-weight="bold">TOTAL BUDGET</text>
    <text x="26" y="402" fill="#10b981" font-size="11" font-family="monospace" font-weight="bold">$91.12 Left</text>
    <text x="26" y="420" fill="#475569" font-size="7" font-family="monospace">MEMORY: 512 MB</text>

    <!-- Main CAD Topology Swarm Canvas Area -->
    <text x="155" y="75" fill="#f8fafc" font-size="14" font-weight="bold">Interactive CAD Topological Swarm Canvas</text>
    <text x="155" y="93" fill="#94a3b8" font-size="10">Drag agent nodes to align pipelines. Real-time simulated communication pathways active.</text>

    <!-- Interactive Grid Canvas Border -->
    <rect x="155" y="105" width="455" height="235" rx="6" fill="#05060b" stroke="#1e293b" stroke-width="1.5" />
    
    <!-- Connections in swarm canvas -->
    <path d="M 215 175 Q 280 140 345 175" fill="none" stroke="url(#lineGlow)" stroke-width="2.5" />
    <path d="M 345 175 Q 410 140 475 220" fill="none" stroke="#2563eb" stroke-dasharray="4 4" stroke-width="1.8" />
    <path d="M 475 220 Q 410 290 345 280" fill="none" stroke="#10b981" stroke-width="2" />
    <path d="M 345 280 Q 280 270 215 250" fill="none" stroke="#8b5cf6" stroke-dasharray="3 3" stroke-width="1.5" />
    <path d="M 475 220 L 555 175" fill="none" stroke="#10b981" stroke-width="2" />
    <path d="M 215 250 L 555 255" fill="none" stroke="#f59e0b" stroke-width="1" stroke-opacity="0.3" />

    <!-- Animated pulsing path signal particles -->
    <circle cx="280" cy="158" r="4" fill="#00d2ff" />
    <circle cx="410" cy="180" r="4" fill="#22c55e" />

    <!-- Agent Nodes in swarm -->
    <!-- CEO Node -->
    <circle cx="215" cy="175" r="22" fill="#090d16" stroke="#00d2ff" stroke-width="2" filter="url(#shadow)" />
    <text x="215" y="179" text-anchor="middle" font-size="12">🎯</text>
    <text x="215" y="209" text-anchor="middle" fill="#ffffff" font-size="9" font-weight="bold">CEO (Supervisor)</text>
    <text x="215" y="219" text-anchor="middle" fill="#00d2ff" font-size="8">Status: IDLE</text>

    <!-- PM Node -->
    <circle cx="345" cy="175" r="22" fill="#0d111d" stroke="#2563eb" stroke-width="2" filter="url(#shadow)" />
    <text x="345" y="179" text-anchor="middle" font-size="12">📋</text>
    <text x="345" y="209" text-anchor="middle" fill="#ffffff" font-size="9" font-weight="bold">PM (Specs Node)</text>
    <text x="345" y="219" text-anchor="middle" fill="#2563eb" font-size="8">Status: SLEEPING</text>

    <!-- DEV Node (Active) -->
    <circle cx="475" cy="220" r="26" fill="#0a191f" stroke="#10b981" stroke-width="3" filter="url(#shadow)" />
    <circle cx="475" cy="220" r="32" fill="none" stroke="#10b981" stroke-opacity="0.4" stroke-width="1" />
    <text x="475" y="224" text-anchor="middle" font-size="14">💻</text>
    <text x="475" y="258" text-anchor="middle" fill="#10b981" font-size="9" font-weight="bold">DEV (OpenHands)</text>
    <text x="475" y="268" text-anchor="middle" fill="#34d399" font-size="8" font-weight="bold">Status: WRITING CODE</text>

    <!-- QA Node -->
    <circle cx="345" cy="280" r="22" fill="#180e15" stroke="#ec4899" stroke-width="2" filter="url(#shadow)" />
    <text x="345" y="284" text-anchor="middle" font-size="12">🛡️</text>
    <text x="345" y="312" text-anchor="middle" fill="#ffffff" font-size="9" font-weight="bold">QA (Auditor)</text>

    <!-- DevOps Node -->
    <circle cx="555" cy="175" r="20" fill="#0e0c15" stroke="#8b5cf6" stroke-width="2" filter="url(#shadow)" />
    <text x="555" y="179" text-anchor="middle" font-size="11">⚙️</text>

    <!-- Marketing Node -->
    <circle cx="215" cy="275" r="20" fill="#120c15" stroke="#f59e0b" stroke-width="2" filter="url(#shadow)" />
    <text x="215" y="279" text-anchor="middle" font-size="11">✨</text>

    <!-- Canvas Drag Overlay Hint -->
    <rect x="495" y="115" width="105" height="24" rx="4" fill="#1e1b4b" stroke="#4338ca" stroke-width="1" />
    <text x="502" y="130" fill="#c7d2fe" font-size="8" font-family="monospace">👆 Drag &amp; Drop Nodes</text>

    <!-- Sidebar Live Inspector Panel -->
    <rect x="620" y="105" width="205" height="235" rx="6" fill="#05060b" stroke="#1e293b" stroke-width="1.5" />
    <rect x="620" y="105" width="205" height="28" rx="6" fill="#0a0d15" />
    <text x="632" y="123" fill="#e2e8f0" font-weight="bold" font-size="10" font-family="monospace">⚙️ NODE PARAM INSPECTOR</text>

    <!-- Inspector Fields (Currently Selected Node: DEV) -->
    <text x="632" y="152" fill="#94a3b8" font-size="9">TARGET NODE:</text>
    <text x="632" y="165" fill="#10b981" font-size="11" font-weight="bold" font-family="monospace">DEV (OpenHands-Sandbox)</text>
    
    <text x="632" y="190" fill="#94a3b8" font-size="9">MEMORY LIMIT CONFIG:</text>
    <rect x="632" y="196" width="180" height="20" rx="3" fill="#1e293b" />
    <text x="640" y="210" fill="#e2e8f0" font-size="10" font-family="monospace">512 MB (Sandbox High)</text>
    
    <text x="632" y="235" fill="#94a3b8" font-size="9">SOVEREIGN AI MODEL ROUTE:</text>
    <rect x="632" y="241" width="180" height="20" rx="3" fill="#1e293b" />
    <text x="640" y="255" fill="#00d2ff" font-size="10" font-family="monospace">Google Gemini-2.5-Pro</text>

    <text x="632" y="280" fill="#94a3b8" font-size="9">CONTAINER PORT BINDINGS:</text>
    <text x="632" y="295" fill="#ffffff" font-size="10" font-family="monospace" font-weight="bold">Port 3000 (Forward Proxy)</text>
    
    <!-- Active terminal execution console simulator inside Dashboard -->
    <rect x="155" y="350" width="670" height="85" rx="6" fill="#030406" stroke="#111622" stroke-width="1.5" />
    <rect x="155" y="350" width="670" height="18" rx="6" fill="#07080d" />
    <text x="167" y="362" fill="#64748b" font-weight="bold" font-size="8" font-family="monospace">TERMINAL STDOUT COMMAND CONSOLE (DOCKER-COMPILE LOGS)</text>
    
    <text x="167" y="382" fill="#a78bfa" font-size="9" font-family="monospace">virtforce-dev | [SANDBOX-COMPILE] Generating custom React components in /src/components/MyMVP.tsx...</text>
    <text x="167" y="397" fill="#34d399" font-size="9" font-family="monospace">✓ SUCCESS: Static assets compiled successfully in 184ms inside test container container-08</text>
    <text x="167" y="412" fill="#38bdf8" font-size="9" font-family="monospace">virtforce-host | [HITL LOCK-HOLD] Triggering active sandbox approvals loop. Staging git diff deltas...</text>
    <text x="167" y="425" fill="#94a3b8" font-size="9" font-family="monospace">$ _</text>
  </svg>
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

### 1. Ephemeral Secure Sandboxing V2 & HITL Control
Every time a code development task is initiated, virtForce isolates the thread inside a zero-privilege Docker runtime container. If any third-party script makes malicious API calls or accesses restricted files, the security fence automatically kills the script and triggers a visual telemetry warning.

<p align="center">
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 850 380" width="100%" height="auto" style="background: #08090e; border-radius: 12px; border: 1px solid #1e293b; font-family: system-ui, -apple-system, sans-serif;">
    <defs>
      <pattern id="grid2" width="20" height="20" patternUnits="userSpaceOnUse">
        <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#0e121f" stroke-width="1"/>
      </pattern>
      <linearGradient id="shieldGlow" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stop-color="#10b981" stop-opacity="0.1" />
        <stop offset="100%" stop-color="#10b981" stop-opacity="0.0" />
      </linearGradient>
      <linearGradient id="threatGlow" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stop-color="#ef4444" stop-opacity="0.15" />
        <stop offset="100%" stop-color="#ef4444" stop-opacity="0.0" />
      </linearGradient>
    </defs>

    <rect width="850" height="380" rx="12" fill="#08090e" />
    <rect width="850" height="380" fill="url(#grid2)" rx="12" />

    <text x="30" y="45" fill="#ffffff" font-size="16" font-weight="bold" font-family="monospace">🛡️ EPHEMERAL SANDBOXING &amp; SECURE HITL LIFECYCLE</text>
    <text x="30" y="65" fill="#64748b" font-size="10">Deep-dive of container quarantine lanes, secure reverse proxies, and the Human-In-The-Loop gatekeeper authorization matrix.</text>

    <!-- HOST ENVIRONMENT OUTER FRAME -->
    <rect x="30" y="90" width="350" height="250" rx="8" fill="#0a0c13" stroke="#1e293b" stroke-width="1.5" />
    <text x="45" y="112" fill="#94a3b8" font-size="10" font-weight="bold" font-family="monospace">💻 HOST SERVER INSTANCE (UNSECURED PORTS ENTRY)</text>
    
    <!-- HOST Webhook Gateway -->
    <rect x="45" y="130" width="140" height="50" rx="6" fill="#111422" stroke="#2a354f" stroke-width="1" />
    <text x="55" y="148" fill="#e2e8f0" font-size="11" font-weight="bold" font-family="monospace"> social webhook</text>
    <text x="55" y="163" fill="#64748b" font-size="9" font-family="monospace">WhatsApp / Telegram</text>

    <!-- HOST Reverse Proxy Interface (Port 3000) -->
    <rect x="45" y="200" width="140" height="50" rx="6" fill="#111422" stroke="#2563eb" stroke-width="1" />
    <text x="55" y="218" fill="#3b82f6" font-size="11" font-weight="bold" font-family="monospace">nginx proxy</text>
    <text x="55" y="233" fill="#64748b" font-size="9" font-family="monospace">Exclusive Ingress 3000</text>

    <!-- Threat Vectors Blocking Illustration -->
    <path d="M 200 155 Q 240 180 200 220" fill="none" stroke="#f59e0b" stroke-width="1.5" stroke-dasharray="3 3" />
    <text x="215" y="193" fill="#f59e0b" font-size="9" font-family="monospace">Signing Signature Key check</text>

    <!-- AIR-GAPPED DOCKER QUARANTINE SANDBOX BOUNDARY (STAGE 3 ISOLATION HIGH NANO) -->
    <rect x="420" y="90" width="400" height="250" rx="8" fill="#050e0e" stroke="#10b981" stroke-dasharray="4 4" stroke-width="2" />
    <!-- Background glow for secured quarantine zone -->
    <rect x="421" y="91" width="398" height="248" rx="8" fill="url(#shieldGlow)" pointer-events-none="true" />
    <text x="435" y="112" fill="#10b981" font-size="10" font-weight="bold" font-family="monospace">🛡️ ISOLATED EPHEMERAL DOCKER RUNTIME SANDBOX (HIGH NANO)</text>

    <!-- Secure Container Sub-blocks -->
    <!-- Low privilege coder VM -->
    <rect x="435" y="130" width="160" height="60" rx="6" fill="#081816" stroke="#10b981" stroke-width="1" />
    <text x="445" y="148" fill="#34d399" font-size="10" font-weight="bold" font-family="monospace">DEV Node Container</text>
    <text x="445" y="162" fill="#52a08f" font-size="8" font-family="monospace">- Zero Network Access</text>
    <text x="445" y="174" fill="#52a08f" font-size="8" font-family="monospace">- Read-only code layers</text>

    <!-- QA Compilation testing isolation block -->
    <rect x="625" y="130" width="180" height="60" rx="6" fill="#081816" stroke="#10b981" stroke-width="1" />
    <text x="635" y="148" fill="#34d399" font-size="10" font-weight="bold" font-family="monospace">QA Vulnerability Sandbox</text>
    <text x="635" y="162" fill="#52a08f" font-size="8" font-family="monospace">- Air-gapped npm compilation</text>
    <text x="635" y="174" fill="#52a08f" font-size="8" font-family="monospace">- Vitest regression validation</text>

    <!-- Threat prevention shield visual representation -->
    <path d="M 605 130 L 605 270" stroke="#059669" stroke-width="1" stroke-dasharray="2 2" />

    <!-- Code Delta holding chamber (staged diffs) -->
    <rect x="435" y="215" width="370" height="55" rx="6" fill="#0c101d" stroke="#312e81" stroke-width="1" />
    <text x="445" y="231" fill="#818cf8" font-size="9" font-weight="bold" font-family="monospace">📦 SECURITY STANDBOX HOLDING CHAMBER (GIT DIFF DELTAS)</text>
    <text x="445" y="245" fill="#94a3b8" font-size="8" font-family="monospace">File Changed: /src/components/MyMVP.tsx</text>
    <text x="445" y="258" fill="#10b981" font-size="8" font-family="monospace">+ Added state persistence and input bounds checks</text>

    <!-- Flow Arrows connecting Host and container -->
    <g>
      <!-- Draw modern curved connectors -->
      <path d="M 185 225 L 420 225" fill="none" stroke="#2563eb" stroke-width="2px" />
      <polygon points="423,225 415,220 415,230" fill="#2563eb" />
      <text x="230" y="215" fill="#3b82f6" font-size="9" font-family="monospace">TCP Inbound Pipe</text>
    </g>

    <!-- HITL Authorization Gate Dialog -->
    <rect x="435" y="285" width="370" height="40" rx="4" fill="#111827" stroke="#1f2937" stroke-width="1" />
    <text x="445" y="299" fill="#f59e0b" font-weight="bold" font-size="9" font-family="monospace">🔒 [HUMAN SIGN-OFF HOLD ACTIVE]</text>
    <text x="445" y="313" fill="#e2e8f0" font-size="8" font-family="sans-serif">Select "APPROVE &amp; MERGE" inside the Sandbox Gate panel under Telemetry controls.</text>

    <!-- Accept and decline micro visual buttons -->
    <rect x="715" y="291" width="80" height="15" rx="2" fill="#047857" />
    <text x="725" y="302" fill="#ffffff" font-size="8" font-weight="bold" font-family="monospace">✔ APPROVE</text>

    <rect x="715" y="310" width="80" height="11" rx="2" fill="#9f1239" />
    <text x="728" y="319" fill="#ffffff" font-size="7" font-weight="bold" font-family="monospace">✘ REJECT</text>
  </svg>
</p>


### 2. HITL (Human-In-The-Loop) Change Control
virtForce prioritizes code safety. DEV containers output pristine git file deltas (`git diff` representation) and stage pull requests inside the Security Sandbox holding chamber. Developers inspect true side-by-side git file additions or deletions before committing updates to the production branch:

```bash
# How virtForce performs staging checks inside the air-gapped sandboxes
npm run build && tsc --noEmit && git diff --staged
```

### 3. Topological Ingress Crawler & Context Cache Matching
For single-operators working with existing, live code projects, virtForce features a high-performance **Remote Ingress Crawler**. Feed is accepted via public domain URL, Docker webhooks, or Git credentials. The crawler maps repository files into lightweight, serialized context-graphs, matching project updates using fast delta hash checks to skip slow, redundant repository scans.

<p align="center">
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 850 360" width="100%" height="auto" style="background: #090b11; border-radius: 12px; border: 1px solid #1e293b; font-family: system-ui, -apple-system, sans-serif;">
    <defs>
      <pattern id="grid3" width="20" height="20" patternUnits="userSpaceOnUse">
        <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#111524" stroke-width="1"/>
      </pattern>
      <linearGradient id="glowGradCrawler" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#00d2ff" stop-opacity="0.1" />
        <stop offset="100%" stop-color="#8b5cf6" stop-opacity="0.05" />
      </linearGradient>
      <marker id="arrow-lp-readme" viewBox="0 0 10 10" refX="22" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
        <path d="M 0 0 L 10 5 L 0 10 z" fill="#334155" />
      </marker>
      <marker id="arrow-active-lp-readme" viewBox="0 0 10 10" refX="22" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
        <path d="M 0 0 L 10 5 L 0 10 z" fill="#00d2ff" />
      </marker>
      <filter id="shadow-crawler" x="-10%" y="-10%" width="120%" height="120%">
        <feDropShadow dx="0" dy="4" stdDeviation="4" flood-color="#000000" flood-opacity="0.5"/>
      </filter>
    </defs>

    <rect width="850" height="360" rx="12" fill="#090b11" />
    <rect width="850" height="360" fill="url(#grid3)" rx="12" />
    
    <text x="30" y="40" fill="#ffffff" font-size="14" font-weight="bold" font-family="monospace">📂 TOPOLOGICAL INGRESS CRAWLER &amp; CACHING ENGINE</text>
    <text x="30" y="58" fill="#64748b" font-size="10">Generates lightweight, serialized context-graphs of repository structures, reducing LLM token cost by 92.1%.</text>

    <!-- Top Ingress Crawler Map Board -->
    <rect x="30" y="80" width="540" height="250" rx="8" fill="#050608" stroke="#1e293b" stroke-width="1.5" filter="url(#shadow-crawler)" />
    
    <!-- Top Ingress Board Header -->
    <rect x="30" y="80" width="540" height="30" rx="8" fill="#0b0d14" />
    <circle cx="48" cy="95" r="4" fill="#ef4444" />
    <circle cx="60" cy="95" r="4" fill="#f59e0b" />
    <circle cx="72" cy="95" r="4" fill="#10b981" />
    <text x="92" y="99" fill="#00d2ff" font-size="9" font-family="monospace" font-weight="bold">● INITIALIZATION GRAPH LANES (ACTIVE CACHE SERIALIZATION)</text>
    <text x="430" y="98" fill="#64748b" font-size="8" font-family="monospace">INGRESS_CRAWLER_V2</text>

    <!-- Content of connections map -->
    <line x1="100" y1="195" x2="210" y2="155" stroke="#00d2ff" stroke-width="2" stroke-dasharray="3,3" marker-end="url(#arrow-active-lp-readme)" />
    <line x1="210" y1="155" x2="320" y2="195" stroke="#00d2ff" stroke-width="2" marker-end="url(#arrow-active-lp-readme)" />
    <line x1="320" y1="195" x2="440" y2="155" stroke="#00d2ff" stroke-width="2" marker-end="url(#arrow-active-lp-readme)" />
    <line x1="320" y1="195" x2="440" y2="235" stroke="#334155" stroke-width="1.2" marker-end="url(#arrow-lp-readme)" />

    <!-- File Nodes -->
    <!-- HTML (100, 195) -->
    <circle cx="100" cy="195" r="18" fill="#0a0d14" stroke="#1e293b" stroke-width="1.5" />
    <text x="100" y="199" text-anchor="middle" font-size="11">🌐</text>
    <text x="100" y="225" text-anchor="middle" fill="#e2e8f0" font-size="8" font-family="monospace" font-weight="bold">index.html</text>
    <text x="100" y="172" text-anchor="middle" fill="#475569" font-size="7" font-weight="bold" font-family="monospace">HTML</text>

    <!-- BOOT (210, 155) -->
    <circle cx="210" cy="155" r="18" fill="#0a0d14" stroke="#1e293b" stroke-width="1.5" />
    <text x="210" y="159" text-anchor="middle" font-size="11">⚡</text>
    <text x="210" y="185" text-anchor="middle" fill="#e2e8f0" font-size="8" font-family="monospace" font-weight="bold">main.tsx</text>
    <text x="210" y="132" text-anchor="middle" fill="#475569" font-size="7" font-weight="bold" font-family="monospace">BOOT</text>

    <!-- CORE (320, 195) -->
    <circle cx="320" cy="195" r="18" fill="#141a24" stroke="#00d2ff" stroke-width="1.5" />
    <text x="320" y="199" text-anchor="middle" font-size="11">📦</text>
    <text x="320" y="225" text-anchor="middle" fill="#e2e8f0" font-size="8" font-family="monospace" font-weight="bold">App.tsx</text>
    <text x="320" y="172" text-anchor="middle" fill="#00d2ff" font-size="7" font-weight="bold" font-family="monospace">CORE</text>

    <!-- MAPS (440, 155) -->
    <circle cx="440" cy="155" r="18" fill="#1b2332" stroke="#00d2ff" stroke-width="1.5" />
    <text x="440" y="159" text-anchor="middle" font-size="11">🗺️</text>
    <text x="440" y="185" text-anchor="middle" fill="#e2e8f0" font-size="8" font-family="monospace" font-weight="bold">MapboxRoute.tsx</text>
    <text x="440" y="132" text-anchor="middle" fill="#00d2ff" font-size="7" font-weight="bold" font-family="monospace">MAPS</text>

    <!-- DBMS (440, 235) -->
    <circle cx="440" cy="235" r="18" fill="#0a0d14" stroke="#1e293b" stroke-width="1.5" />
    <text x="440" y="239" text-anchor="middle" font-size="11">💾</text>
    <text x="440" y="265" text-anchor="middle" fill="#8e9bb0" font-size="8" font-family="monospace" font-weight="bold">TechnicianDb.ts</text>
    <text x="440" y="212" text-anchor="middle" fill="#475569" font-size="7" font-weight="bold" font-family="monospace">DBMS</text>

    <!-- Sidebar Performance stats panel -->
    <rect x="590" y="80" width="230" height="250" rx="8" fill="#0a0d14" stroke="#1e293b" stroke-width="1.5" filter="url(#shadow-crawler)" />
    <rect x="590" y="80" width="230" height="30" rx="8" fill="#131722" />
    <text x="602" y="99" fill="#e2e8f0" font-weight="bold" font-size="9" font-family="monospace">📊 CACHE OPTIMIZATION METRICS</text>

    <!-- Stats details -->
    <text x="605" y="135" fill="#f43f5e" font-size="9" font-family="sans-serif">UNOPTIMIZED CRAWL LOAD:</text>
    <text x="605" y="150" fill="#f43f5e" font-size="12" font-weight="bold" font-family="monospace">~148K Tokens</text>
    <text x="605" y="162" fill="#64748b" font-size="8">Requires repetitive full-repo file walk (25s)</text>

    <path d="M 605 180 L 805 180" stroke="#1e293b" stroke-width="1" />

    <text x="605" y="205" fill="#10b981" font-size="9" font-family="sans-serif">VIRTFORCE SEED DELEGATE CRAWL:</text>
    <text x="605" y="222" fill="#10b981" font-size="14" font-weight="bold" font-family="monospace">~11.8K Tokens</text>
    <text x="605" y="235" fill="#10b981" font-weight="bold" font-size="8" font-family="monospace">● INSTANT SERIALIZED CACHE</text>
    <text x="605" y="247" fill="#64748b" font-size="8">Delta hash match resolves context inline (0.1s)</text>

    <!-- Saved badge -->
    <rect x="605" y="275" width="200" height="40" rx="4" fill="#064e3b" stroke="#047857" stroke-width="1" />
    <text x="615" y="291" fill="#34d399" font-size="11" font-weight="bold" font-family="sans-serif">🎯 92.1% SPEND REDUCTION</text>
    <text x="615" y="304" fill="#a7f3d0" font-size="8" font-family="sans-serif">Saves massive prompt context token bandwidth</text>
  </svg>
</p>

### 4. Open-Source Multica Daemon Sync Companion
For developers who prefer executing workflows locally or sharing context models within AI editors like Cursor and Claude Desktop, virtForce links with the lightweight, background open-source **Multica platform**. By hooking into the active `multicad` daemon, the workspace synchronizes preset teammates, compounds recursive skill pathways, and exposes secure sandbox capabilities dynamically.

<p align="center">
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 850 360" width="100%" height="auto" style="background: #08090f; border-radius: 12px; border: 1px solid #1e293b; font-family: system-ui, -apple-system, sans-serif;">
    <defs>
      <pattern id="grid4" width="20" height="20" patternUnits="userSpaceOnUse">
        <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#0e1220" stroke-width="1"/>
      </pattern>
      <filter id="shadow-multica" x="-10%" y="-10%" width="120%" height="120%">
        <feDropShadow dx="0" dy="4" stdDeviation="5" flood-color="#000000" flood-opacity="0.5"/>
      </filter>
    </defs>

    <rect width="850" height="360" rx="12" fill="#08090f" />
    <rect width="850" height="360" fill="url(#grid4)" rx="12" />

    <text x="30" y="40" fill="#ffffff" font-size="14" font-weight="bold" font-family="monospace">🐙 NATIVE MULTICA DAEMON INTEGRATION DECK</text>
    <text x="30" y="58" fill="#64748b" font-size="10">Syncs background agents, compiles skill-sets compound logic during runtime, and maps tools to Cursor / Claude-Desktop MCP.</text>

    <!-- Main multica panel -->
    <rect x="30" y="80" width="790" height="250" rx="8" fill="#040608" stroke="#1e293b" stroke-width="1.5" filter="url(#shadow-multica)" />
    
    <!-- Titlebar -->
    <rect x="30" y="80" width="790" height="32" rx="8" fill="#0b0d13" />
    <circle cx="48" cy="96" r="4" fill="#ef4444" />
    <circle cx="60" cy="96" r="4" fill="#f59e0b" />
    <circle cx="72" cy="96" r="4" fill="#10b981" />
    <text x="92" y="100" fill="#818cf8" font-size="9" font-family="monospace" font-weight="bold">🐙 DAEMON CONNECTED -- localhost:5902</text>
    <rect x="670" y="87" width="140" height="18" rx="4" fill="#022c22" stroke="#065f46" stroke-width="1" />
    <text x="678" y="99" fill="#34d399" font-size="8" font-family="monospace" font-weight="bold">● MULTICA SYNC ACTIVE</text>

    <!-- Left column: 3 loaded workers -->
    <text x="50" y="135" fill="#94a3b8" font-size="9" font-family="monospace" font-weight="bold">SYNCHRONIZED LOCAL DAEMON WORKERS</text>

    <!-- CEO-Copilot Node -->
    <rect x="50" y="148" width="220" height="52" rx="6" fill="#090b11" stroke="#312e81" stroke-width="1.2" />
    <text x="62" y="180" font-size="18">🎯</text>
    <text x="92" y="170" fill="#ffffff" font-size="10" font-weight="bold" font-family="monospace">CEO-Copilot</text>
    <text x="92" y="184" fill="#818cf8" font-size="8" font-family="monospace">ROLE: Supervisor / planner</text>
    <rect x="210" y="156" width="52" height="12" rx="2" fill="#1e1b4b" />
    <text x="214" y="165" fill="#a5b4fc" font-size="7" font-weight="bold" font-family="monospace">ONLINE</text>

    <!-- Code-Mutant Node -->
    <rect x="50" y="210" width="220" height="52" rx="6" fill="#090b11" stroke="#065f46" stroke-width="1.2" />
    <text x="62" y="242" font-size="18">💻</text>
    <text x="92" y="232" fill="#ffffff" font-size="10" font-weight="bold" font-family="monospace">Code-Mutant</text>
    <text x="92" y="246" fill="#10b981" font-size="8" font-family="monospace">ROLE: Coder Agent</text>
    <rect x="210" y="218" width="52" height="12" rx="2" fill="#022c22" />
    <text x="214" y="227" fill="#34d399" font-weight="bold" font-size="7" font-family="monospace">WRITING</text>

    <!-- Aero-DevOps Node -->
    <rect x="50" y="272" width="220" height="48" rx="6" fill="#090b11" stroke="#3b0764" stroke-width="1.2" />
    <text x="62" y="301" font-size="16">⚙️</text>
    <text x="92" y="291" fill="#ffffff" font-size="10" font-weight="bold" font-family="monospace">Aero-DevOps</text>
    <text x="92" y="303" fill="#c084fc" font-size="8" font-family="monospace">ROLE: DevOps Builder</text>
    <rect x="210" y="280" width="52" height="12" rx="2" fill="#2e1065" />
    <text x="214" y="289" fill="#e9d5ff" font-weight="bold" font-size="7" font-family="monospace">STANDBY</text>

    <!-- Center Separator -->
    <line x1="295" y1="130" x2="295" y2="310" stroke="#111625" stroke-width="1.5" />

    <!-- Right column: Terminal CLI sync -->
    <text x="315" y="135" fill="#94a3b8" font-size="9" font-family="monospace" font-weight="bold">TERMINAL OUTPUT STDOUT COMMAND LINE (DAEMON SYNC)</text>
    <rect x="315" y="148" width="485" height="120" rx="6" fill="#020305" stroke="#111625" stroke-width="1.5" />
    <text x="330" y="172" fill="#00d2ff" font-size="10" font-family="monospace">$ multica sync-skills --virtforce</text>
    <text x="330" y="192" fill="#818cf8" font-size="9.5" font-family="monospace">[multicad] sync completed. Exposing skill: code_refiner (Type: MCP) - OK</text>
    <text x="330" y="210" fill="#818cf8" font-size="9.5" font-family="monospace">[multicad] sync completed. Exposing skill: ingress_crawler (Type: MCP) - OK</text>
    <text x="330" y="228" fill="#c084fc" font-size="9.5" font-family="monospace">[multicad] sync completed. Exposing skill: security_agent_shield (Type: MPC) - OK</text>
    <text x="330" y="250" fill="#10b981" font-size="9.5" font-weight="bold" font-family="monospace">[SUCCESS] 3 secure virtForce developer tools hot-loaded inside Multica teammate database.</text>

    <!-- Info note -->
    <rect x="315" y="280" width="485" height="40" rx="4" fill="#0c101d" stroke="#1d283d" stroke-width="1.2" />
    <text x="325" y="296" fill="#94a3b8" font-size="8.5" font-family="sans-serif">Config file</text>
    <text x="372" y="296" fill="#c7d2fe" font-size="8.5" font-weight="bold" font-family="monospace">~/.multica/configs/teammates.json</text>
    <text x="590" y="296" fill="#94a3b8" font-size="8.5" font-family="sans-serif">synchronized successfully under localhost loop.</text>
    <text x="325" y="310" fill="#64748b" font-size="8" font-family="sans-serif">* Enables Cross-MCP triggers to share secure sandboxed execution steps instantly with AI editors.</text>

  </svg>
</p>

### 5. Remote Channel Social Gateways & Persistent Memory
Trigger diagnostics or code compiles directly from your phone while on the go. virtForce exposes small, fast, secure inbound endpoints verified against encryption keys to receive and map commands from Telegram, WhatsApp, or Slack into active supervisor queues safely. Additionally, our **Autonomous Swarm Memory System** automatically gathers feedback patterns (auto-saving coding styles and database structure boundaries) and hot-injects them back to `AGENTS.md` to prevent prompt instructions regressions.

### 6. Autonomous Production SRE & Incident Defense
Convert your swarm into an **Autonomous Site Reliability Engineer (SRE)** response team. virtForce natively supports robust frontend crash recovery (`ErrorBoundary`) and inbound production monitoring webhooks from platforms like **Sentry**, Datadog, AWS CloudWatch, and custom log aggregators.

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

## 🤖 Supported AI Providers

virtForce is compatible with enterprise LLMs, local offline runtimes, and low-latency API proxy routes:
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

## 📜 License

virtForce is open-source software licensed under the [MIT License](LICENSE). 
Created and maintained by self-hosted indie makers.
