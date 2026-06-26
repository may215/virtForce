# 📐 Production SRE System Architecture

This document describes the high-level design, secure container topology, and execution workflows of Production SRE.

---

## 🗺️ High-Level System Design

Production SRE is structured as a single lightweight host process controlling localized, ephemeral Docker container sandboxes.

```text
 ┌────────────────────────────────────────────────────────┐
 │                      Host Server                       │
 │      (Express.js Web Server / Vite Asset Engine)       │
 └───────┬───────────────────┬────────────────────┬───────┘
         │                   │                    │
         ▼                   ▼                    ▼
 ┌──────────────┐     ┌──────────────┐     ┌──────────────┐
 │ DEV Container│     │ CEO Container│     │ MKT Container│
 │ (Air-Gapped) │     │  (Strategist)│     │  (Gateways)  │
 ├──────────────┤     ├──────────────┤     ├──────────────┤
 │ Node Runner  │     │ Logic Engine │     │ Telegram API │
 │ Linter Tool  │     │ Budget Guard │     │ WhatsApp API │
 └──────────────┘     └──────────────┘     └──────────────┘
```

---

## 📦 Container Lifecycle & Isolation Levels

Traditional systems spin up raw processes on the host. If an agent installs a malicious Node package or executes custom developer loops on the server, it has complete control over host variables.

Production SRE enforces three isolation levels:

1.  **Low (Shared Host):** Great for rapid local testing without Docker overhead. All agent cycles execute inside single safe process bounds.
2.  **Medium (Per-Group Container):** Separates the Strategic CEO and Marketing Gateways from the active DEV Compiler Sandbox. Staves off dependency leaking.
3.  **High Nano (Zero-Privilege Sandboxes):** Spins up a dedicated, read-only container shell for each threat vector. Commands run with minimal network capabilities.

---

## 🚦 Human-In-The-Loop Staging (HITL)

No agent can write directly to the production branch. Once a DEV workspace container compiles a patch:

1.  It automatically triggers a linter and unit compilation check `npm run build && tsc --noEmit`.
2.  If successful, it outputs a strict file delta (`git diff` representation) and stages a Pull Request (PR).
3.  The system freezes the active agent runtimes and triggers a HITL hold.
4.  The supervisor reviews the diff live in the Security Sandbox dashboard. You can:
5.  **Approve & Merge:** Submits the file delta to production.
6.  **Reject & Feedback:** Pipes custom corrections back to the developer container, triggering an automated AI code refinement loop.

---

## 💾 State Persistence & Error Handling
 
 Unlike typical architectures that rely entirely on front-end storage, Production SRE synchronizes state across boundaries using an Express.js `/api/state` API endpoint. This mechanism robustly manages tasks, agents, logs, and telemetry across reloads without polluting `localStorage`.
 
 For production-grade SRE (Site Reliability Engineering), the system integrates:
 1. **React ErrorBoundary:** Catching catastrophic front-end rendering failures dynamically.
 2. **Sentry Diagnostics (`@sentry/react`):** Forwarding component crash logs directly to the DevOps container for instantaneous hot-patching.

 ---
 
 ## 💬 Inbound Messenger Webhook Gateway

To let developers trigger status diagnostics or commands remotely (e.g., from a mobile device on the train), Production SRE hosts a small, fast webhook endpoint. Any social trigger from WhatsApp, Telegram, or Slack is verified against signing keys:

```text
Incoming Payload ──► Host Gateway ──► Signature Validation ──► Container Queue
```

The system maps command prefixes to isolated container routes:
*   `/status` ──► Strategic Orchestrator Container (query total burn rate, remaining sprints, remaining budget).
*   `/create task <arg>` ──► PM Container (generate specs, create branch).
*   `/help` ──► Returns active container network stats.
