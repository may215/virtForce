import { SimulationStep, AgentRole, TaskState } from '../types';

export function generateDynamicSimulation(
  productName: string,
  productDesc: string,
  aiProvider: string,
  aiModel: string
): {
  tasks: any[];
  steps: SimulationStep[];
  logs: any[];
  sandboxLogs: string[];
} {
  const taskId = `TASK-${Math.floor(100 + Math.random() * 900)}`;
  const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });

  // 1. Core Task Initialization Object
  const initialTask = {
    id: taskId,
    title: `Build Dynamic MVP: ${productName}`,
    description: productDesc || `Fully functional isolated deployment of ${productName} inside virtual secure Docker container sandbox environment.`,
    state: 'BACKLOG',
    source: 'strategy',
    costAccumulated: 0.12,
    tokensUsed: 4200,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    innerMonologue: {
      CEO: `Initiated active planning bounds for ${productName}. Allocating PM and development container nodes with strict telemetry rules.`
    }
  };

  // 2. Customized Swarm Steps
  const steps: SimulationStep[] = [
    // Step 1: CEO Grooming
    {
      taskId: taskId,
      targetState: 'BACKLOG',
      activeAgent: 'CEO',
      agentGoal: `Initialize architectural blueprint & direct specialized PM division for ${productName}.`,
      logMessage: `CEO supervisor scheduled bootstrap epic for "${productName}".`,
      logDetail: `Active cognitive routing: Assigned task ${taskId} ➔ PM (Planner). Running model: ${aiModel} via ${aiProvider}.`,
      logLevel: 'INFO',
      costIncurred: 0.08,
      tokensUsed: 5400,
      monologue: `This product initiative ("${productName}") aligns with our core objectives. I am initializing specialized secure containment parameters and routing immediate epic assignments down to the requirements division to formulate a functional layout.`
    },
    // Step 2: PM Specifications Formulation
    {
      taskId: taskId,
      targetState: 'SPEC',
      activeAgent: 'PM',
      agentGoal: `Drafting UX layout structure & core product specifications for ${productName}.`,
      logMessage: `PM Agent compiled technical markdown specification sheet for ${productName}.`,
      logLevel: 'SUCCESS',
      specUpdate: `### Custom Spec: ${productName} (MVP)
      
#### Overview:
${productDesc || `Draggable UI representation and responsive service flow for ${productName}.`}

#### Architectural Scope:
1. **Core Container**: Isolation level HIGH_NANO on safe routing clusters.
2. **Persistence State**: Zero-state local memory cache fallback with indexed DB syncing.
3. **Primary Layout Controls**: Desktop-first responsive layout framed with clean visual panels.

#### Interactive Sandbox Validation Rules:
- Inputs must filter malicious script characters.
- System must bind exclusively to Port 3000 under secure proxy wrappers.`,
      costIncurred: 0.12,
      tokensUsed: 8900,
      monologue: `I have compiled the epic specifications for "${productName}". Every feature block maps to interactive client-side React UI controls. Pushing this to our Workspace Developer container node to implement source codes.`
    },
    // Step 3: DEV Coding Sequence
    {
      taskId: taskId,
      targetState: 'DEV',
      activeAgent: 'DEV',
      agentGoal: `Generating production-ready React JSX source codes & sanitizing states.`,
      logMessage: `Lead Developer initiated secure sandbox file write on /src/components/${productName.replace(/[^cd-zA-Z0-9]/g, '')}.tsx.`,
      logDetail: `Writing defensive handlers, modular React controls, and mapping local states.`,
      logLevel: 'INFO',
      costIncurred: 0.22,
      tokensUsed: 14500,
      monologue: `I am programming the primary UI modules for "${productName}". To ensure strict safety boundaries, all user transactions are locked. Pushing full git diff representation to QA Auditor for automated unit and verification suites.`
    },
    // Step 4: QA Sandbox Auditing & Compilation
    {
      taskId: taskId,
      targetState: 'QA',
      activeAgent: 'QA',
      agentGoal: `Executing unit/component validation workflows inside isolated Docker compiler context.`,
      logMessage: `QA Vulnerability Auditor loaded pull request into isolated Sandbox container #8.`,
      logDetail: `Compiled workspace on Port 3000. Verified 0 syntax exceptions. Lint checks passed.`,
      logLevel: 'TOOL_CALL',
      terminalOutput: `$ npm run lint --sandbox-run\n> tsc --noEmit\nChecking type definitions in /src/components/${productName.replace(/[^a-zA-Z0-9]/g, '')}.tsx...\nSUCCESS: Component verified. No loose or insecure global dependencies found.\n\n$ npm run test --env=isolated\n> vitest run ${productName.replace(/[^a-zA-Z0-9]/g, '')}.test.tsx\n ✓ component-render: successfully initialized ${productName} UI\n ✓ state-integrity: local caching writes safely without crashing on null data\n\nBuild output bundle: dist/assets/index.js (32.4 KB)\nTESTING SUMMARY: All 2 checks completed successfully inside Docker. Staging for HITL authorization gate.`,
      diffUpdate: {
        file: `/src/components/${productName.replace(/[^a-zA-Z0-9]/g, '')}.tsx`,
        additions: [
          `+ // Custom synthesized code base for ${productName}`,
          `+ import React, { useState } from 'react';`,
          `+ `,
          `+ export function ${productName.replace(/[^a-zA-Z0-9]/g, '')}Dashboard() {`,
          `+   const [statusLog, setStatusLog] = useState<string[]>([]);`,
          `+   const [activeInput, setActiveInput] = useState("");`,
          `+ `,
          `+   const handleTriggerSecureAction = () => {`,
          `+     if (!activeInput.trim()) return;`,
          `+     setStatusLog(p => [\`[\${new Date().toLocaleTimeString()}] Executed active parameter block safety test\`, ...p]);`,
          `+   };`,
          `+   return (`,
          `+     <div className="p-4 bg-slate-905 border border-slate-800 rounded">`,
          `+       <h3 className="text-sm font-bold text-[#00d2ff] mb-2">${productName}</h3>`,
          `+       <div className="flex gap-2 mb-3">`,
          `+         <input type="text" className="bg-black/40 text-xs border border-slate-800 p-1.5 rounded flex-1" placeholder="Simulate user action..." value={activeInput} onChange={e => setActiveInput(e.target.value)} />`,
          `+         <button onClick={handleTriggerSecureAction} className="bg-indigo-600 text-xs text-white px-3 rounded">Execute</button>`,
          `+       </div>`,
          `+     </div>`,
          `+   );`,
          `+ }`
        ],
        deletions: [
          `- // Legacy mock framework placeholder`,
          `- export default function Todo() { return <div>Wait state placeholder</div>; }`
        ]
      },
      costIncurred: 0.18,
      tokensUsed: 11200,
      monologue: `I have launched the isolated virtual container to host "${productName}". The build compiled perfectly down to static production assets inside the sandboxed file explorer. Submitting code-review ticket to production line.`
    },
    // Step 5: DEVOPS Infrastructure Staging
    {
      taskId: taskId,
      targetState: 'DEV', // Use Dev / QA intermediate for DevOps representation
      activeAgent: 'DEVOPS',
      agentGoal: `Configuring Docker networking, reverse proxies, and caching parameters inside Cloud Run container container-08.`,
      logMessage: `DEVOPS node completed deployment orchestration config inside .github/workflows/deploy.yml.`,
      logDetail: `Wired ingress pathways. Proxy server assigned to Port 3000. Static asset CDN loaded.`,
      logLevel: 'SUCCESS',
      costIncurred: 0.15,
      tokensUsed: 7400,
      monologue: `I have bundled the components for "${productName}" inside an ultra-lean scratch container. Configured nginx proxy parameters on Port 3000. Live sandbox preview ready for inspector view.`
    },
    // Step 6: HITL Administrator Manual Lock
    {
      taskId: taskId,
      targetState: 'HITL',
      activeAgent: 'CEO',
      agentGoal: `Await human gatekeeper authorization to verify sandboxed delta logs.`,
      logMessage: `🔒 [HITL PAUSE] Staged build for "${productName}" is locked awaiting sign-off.`,
      logDetail: `Human-In-The-Loop inspection is mandatory for security verification inside the Sandbox Gate tab.`,
      logLevel: 'INFO',
      costIncurred: 0.05,
      tokensUsed: 3100,
      monologue: `We have completed the full development pipeline for "${productName}" inside the container limits. The code changes are staged. We are halting core ticking until the human administrator validates the changes.`
    },
    // Step 7: Completed & Merged Deployment
    {
      taskId: taskId,
      targetState: 'MERGED',
      activeAgent: 'CEO',
      agentGoal: `Pull request merged to master. Deploying CDN packages.`,
      logMessage: `🚀 COMPLIANCE MERGED: Successfully released "${productName}" to Cloud Run server!`,
      logDetail: `Closed release branch. Virtual secure sandbox terminated, releasing resource limits.`,
      logLevel: 'SUCCESS',
      costIncurred: 0.04,
      tokensUsed: 2500,
      monologue: `Congratulations! Clear differential approvals received. "${productName}" has been successfully merged, compiled and deployed in production.`
    },
    // Step 8: Marketing Launch Rollout
    {
      taskId: taskId,
      targetState: 'MERGED',
      activeAgent: 'MKT',
      agentGoal: `Auto-formulating waitlist copy, press pitches, and public launch waitlists for ${productName}.`,
      logMessage: `Growth Marketer rolled out launch copy blueprints for "${productName}".`,
      logDetail: `Waitlist registration active. Launch copywriting templates structured inside organic sheets database.`,
      logLevel: 'SUCCESS',
      costIncurred: 0.09,
      tokensUsed: 4900,
      monologue: `With "${productName}" live in production, I am generating strategic copy. Crafting standard waitlist forms and high-converting marketing campaigns targeting social networks and community outlets!`
    },
  ];

  const bootstrapLog = {
    id: `bootstrap-log-${Date.now()}`,
    timestamp,
    agentId: 'CEO' as AgentRole,
    level: 'SUCCESS' as const,
    message: `🛠️ CUSTOM EXPERIMENT INITIALIZED: Starting build for "${productName}"!`,
    detail: `Triggered container sandbox sequence v2. Running isolated multi-agent compile flow across CEO, PM, DEV, QA, and MKT nodes.`
  };

  const initialSandboxLogs = [
    `CRITICAL CONTAINER TRIGGER: Spinning up sandbox-node-${taskId.toLowerCase()} virtual instance...`,
    `$ docker run -d -p 3000:3000 --name dev-env-${taskId.toLowerCase()} node:alpine`,
    `CONTAINER SECURED: Zero-privilege container running successfully side-by-side with master agent.`,
    `Streaming standard terminal output channels now...`,
  ];

  return {
    tasks: [initialTask],
    steps,
    logs: [bootstrapLog],
    sandboxLogs: initialSandboxLogs
  };
}
