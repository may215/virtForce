# Show HN: Production SRE – Open-source autonomous SRE swarm with a visual CAD canvas

Hi HN, 

I've been working on **Production SRE**, a completely self-hosted Site Reliability Engineering orchestration platform, and we just open-sourced it.

**The Problem:** 
Most multi-agent AI frameworks rely on opaque, non-interactive terminal outputs or read-only text logs. When dealing with production environments, it's hard to visualize what autonomous agents are doing, and even harder to trust them without strict Human-In-The-Loop (HITL) sandboxes.

**What we built:**
We built a high-integrity SRE swarm platform focused heavily on visibility, security, and token efficiency. 

Key technical features:
1. **Interactive Topological CAD Swarm Canvas:** Instead of a CLI output, you get a visual, topological map of the swarm's state and active workloads.
2. **Ephemeral Secure Sandboxing:** Every task runs in a zero-privilege Docker runtime container. If an agent writes a script that makes malicious API calls or unauthorized access attempts, the security fence automatically kills it and triggers visual telemetry.
3. **Topological Ingress Crawler (Token Cache):** To handle large repositories, we built a crawler that generates lightweight, serialized context-graphs. It matches project updates using delta hash checks to skip redundant repository scans, which we've benchmarked to reduce LLM token costs by ~92%.
4. **Daemon Sync & Gateways:** Links with local Multica daemons and includes Telegram/WhatsApp inbound gateways for remote management.

**Tech Stack:** React, Express, LangGraph, Docker.

**We need contributors!**
Since we're newly open-sourced and the roadmap is massive, we are actively looking for contributors of all levels. Whether you want to squash bugs on the React frontend, optimize the Express/LangGraph backend, or help us write unit tests, we'd love to have you. 

Would love to hear your feedback on the architecture, the visual canvas, or any questions about the security sandbox!

GitHub: https://github.com/production-sre/production-sre

Thanks!
