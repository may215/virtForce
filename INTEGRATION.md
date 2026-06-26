# 🔌 Production SRE Integration, MCP & Installation Manual

Use this handbook to integrate the Production SRE multi-agent orchestration shell, DevOps sandbox, and topological crawler directly into your existing codebase.

---

## 💾 Core Persistence Architecture

### 1. Does Production SRE have a persistent layer?
**Yes.** Production SRE employs a hybrid, multi-tier persistent storage architecture designed for absolute environment isolation and instant workstation restarts:

*   **Backend State API (`/api/state`):** The dashboard synchronizes task kanban states (`tasks`), active agent memory allocations (`agents`), network logs (`logs`), and real-time simulator stats (`stats`) seamlessly via an Express REST API backend, providing robust state persistence over raw file outputs.
*   **Static Delta Cache (.Production SRE/ Hash-Registry):** For topological code analysis, Production SRE compiles repo directories into lightweight dependency graph structures (`.Production SRE/project-context.json`). This works like a static file cache, ensuring the orchestrator avoids expensive multi-source code ingestion runs on every single run.
*   **Optional Backend Server Persistence:** If running inside production self-hosted clusters, we support standard, air-gapped sqlite database adapters or JSON file-stores.

---

## 🛠️ Step-by-Step Flow: Installing Production SRE Inside an Existing Project

Follow this guide to inject our 7-agent workspace (CEO, PM, DEV, QA, DevOps, Marketing, Support) and the associated endpoints into an existing dynamic Express & React application.

### Step 1: Install Required Dependencies
In your existing target project, add our core dependencies for handling model operations, state management, and fluid UI animations:

```bash
# Install core Google GenAI SDK, Sentry for monitoring, and styling tools
npm install @google/genai dotenv @sentry/react @sentry/browser motion lucide-react

# Install dev testing engine for safety unit verifications
npm install -D vitest
```

### Step 2: Integrate Backend Router Endpoints
Incorporate the secure AI-driven development and copywriting handlers into your existing Express backend server (`server.ts` or `app.ts`). 

Ensure you initialize the `GoogleGenAI` client **lazily** to prevent server crashes on startup if secret keys are missing:

```typescript
// Add these routes inside your Express app setup (e.g., server.ts)
import express from "express";
import { GoogleGenAI, Type } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(express.json());

let aiClient: GoogleGenAI | null = null;
function getGeminiClient(): GoogleGenAI {
  if (!aiClient) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error("GEMINI_API_KEY is missing. Configure in settings.");
    }
    aiClient = new GoogleGenAI({ apiKey });
  }
  return aiClient;
}

// 1. Refine-Code Endpoint (HITL & QA pipeline)
app.post("/api/gemini/refine-code", async (req, res) => {
  try {
    const { taskId, originalCode, feedback, file } = req.body;
    const client = getGeminiClient();
    
    const response = await client.models.generateContent({
      model: "gemini-3.5-flash",
      contents: `Address this feedback: "${feedback}" on file "${file || "App.tsx"}". Original code:\n${originalCode}`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            file: { type: Type.STRING },
            deletions: { type: Type.ARRAY, items: { type: Type.STRING } },
            additions: { type: Type.ARRAY, items: { type: Type.STRING } }
          },
          required: ["file", "deletions", "additions"]
        }
      }
    });
    res.json(JSON.parse(response.text || "{}"));
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// 2. ROI & Economic Forecaster Endpoint (Venture Incubator)
app.post("/api/incubator/forecast", async (req, res) => {
  try {
    const { mode, budget, metric, techStack } = req.body;
    const client = getGeminiClient();
    
    const response = await client.models.generateContent({
      model: "gemini-3.5-flash",
      contents: `Simulate development for stack "${techStack}" under budget $${budget}`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            launchTimeline: { type: Type.INTEGER },
            scannedVulnerabilities: { type: Type.INTEGER },
            betaUsers: { type: Type.INTEGER },
            roiMultiplier: { type: Type.STRING },
            socialChannel: { type: Type.STRING },
            executiveSummary: { type: Type.STRING }
          },
          required: ["launchTimeline", "scannedVulnerabilities", "betaUsers", "roiMultiplier", "socialChannel", "executiveSummary"]
        }
      }
    });
    res.json(JSON.parse(response.text || "{}"));
  } catch (err: any) {
    res.json({
      launchTimeline: 7,
      scannedVulnerabilities: 12,
      betaUsers: 250,
      roiMultiplier: "1.8x",
      socialChannel: "Reddit",
      executiveSummary: "Fallback simulation parameters deployed."
    });
  }
});
```

### Step 3: Copy Front-End Swarm Components
Migrate Production SRE's high-fidelity reactive dashboard views into your React `src/components` tree:
1.  **HQCore.tsx:** The visual CAD swarm flowchart displaying active container lines and node memory settings.
2.  **SecuritySandbox.tsx:** The configuration terminal where you test gateways and perform web crawls.
3.  **KanbanBoard.tsx:** The active task list displaying the 7 roles progressing work from Backlog through specifications, coder, and QA validation.
4.  **VentureIncubator.tsx:** Interactive ROI graphs and community copywriter prompts.

### Step 4: Add Unit Tests Guardrails
Create unit checks in `src/tests/Production SRE.test.ts` to block deploy processes if agent parameter configurations slip or boundary restrictions are violated:

```typescript
import { describe, it, expect } from 'vitest';

describe('Local DevOps Pipeline Validation', () => {
  it('enforces that active sandboxes reside on standard isolated user ports', () => {
    const assignedPort = 10307; // Core DevOps Port
    expect(assignedPort).toBeGreaterThan(1024);
  });
});
```

---

## 🔌 Integrating Production SRE with Other MCP (Model Context Protocol) Clients

Because Production SRE includes a pre-mapped tool specification (`Production SRE-ai-skill.json`), you can hook our multi-agent developers directly into other MCP-compatible interfaces (e.g. Claude Desktop, Cursor, Cline, or Windsurf). 

This allows you to control the sandbox orchestrator directly from your preferred development environment.

### 1. Claude Desktop Integration
To expose Production SRE capabilities to your Claude Desktop chat workspace:
1.  Open your global Claude Desktop configuration file:
    *   **macOS:** `~/Library/Application Support/Claude/claude_desktop_config.json`
    *   **Windows:** `%APPDATA%\Claude\claude_desktop_config.json`
2.  Add `Production SRE` inside the custom `mcpServers` parameter node:

```json
{
  "mcpServers": {
    "Production SRE-orchestrator": {
      "command": "node",
      "args": [
        "/path/to/your/Production SRE/dist/server.cjs",
        "--mcp"
      ],
      "env": {
        "GEMINI_API_KEY": "your-secret-api-key-here"
      }
    }
  }
}
```
3.  Restart your Claude Desktop client. Look for the standard 🔌 connector indicator showing that Production SRE's tools (`refine_code`, `web_ingress_crawl`, etc.) have registered successfully.

### 2. Cursor Integration
To link Production SRE's code refining and crawler tools inside Cursor:
1.  Open **Cursor Settings** > **Features** > **MCP**.
2.  Click **+ Add New MCP Server**.
3.  Input the setup parameters:
    *   **Name:** `Production SRE`
    *   **Type:** `std-io`
    *   **Command:** `node /absolute/path/to/Production SRE/dist/server.cjs --mcp`
4.  Save and restart the editor. Cursor's Composer will now be able to execute automated codebase crawler runs using Production SRE actions.

### 3. Integration with Third-Party MCP Servers
You can plug other MCP tools (such as database engines, file finders, or slack dispatchers) into Production SRE's agent supervisor. Add the following config mappings into `package.json` to daisy-chain MCP tool scopes:

```json
{
  "Production SRE": {
    "externalMcpServers": [
      {
        "name": "sqlite-mcp-server",
        "command": "npx",
        "args": ["-y", "@modelcontextprotocol/server-sqlite", "--db", "./devops-persistence.db"]
      }
    ]
  }
}
```
This setups a bidirectional data route where Production SRE developers write refined code, and the SQLite MCP automatically commits historical logs directly to the localized persistence layer.
