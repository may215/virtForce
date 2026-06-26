import { Agent, Task, SwarmLog, TaskState, AgentRole, SimulationStep, Incident } from './types';

export const INITIAL_AGENTS: Agent[] = [
  {
    id: 'CEO',
    name: 'Director-CEO-1',
    avatar: '🎯',
    roleTitle: 'Chief Strategic Officer & Router',
    description: 'Maintains company alignment, schedules workflows, routes tasks to specialized department heads, and resolves system-wide operational conflicts.',
    status: 'SLEEPING',
    currentGoal: 'Monitoring live operational telemetry & routing inbound user feedback.',
    totalTokens: 524000,
    costSpent: 4.85,
    prsMerged: 12,
    model: 'gemini-3.5-flash',
    temperature: 0.2,
    maxTokens: 1024,
    systemInstruction: 'You are the Chief Executive Officer and Router of the Virtual Agent Company. Direct strategic routing, keep token overhead low, avoid redundant loops, and maintain deterministic queue handling.',
    backstory: 'A highly optimized executive cognitive model pre-trained on high-level enterprise architectures and autonomous pipeline scheduling. Prioritizes low tokens overhead and failsafe routing.',
    verbosity: true,
    tools: ['GitHub API Client', 'Brave Search Engine', 'Slack Webhooks Controller']
  },
  {
    id: 'PM',
    name: 'Product-Specs-2',
    avatar: '📋',
    roleTitle: 'Product Manager Agent',
    description: 'Translates business vision and user feedback into highly detailed markdown functional specifications and backlog task parameters.',
    status: 'SLEEPING',
    currentGoal: 'Refining backlog structure and grooming developer acceptance metrics.',
    totalTokens: 845000,
    costSpent: 5.12,
    prsMerged: 0,
    model: 'gemini-3.5-flash',
    temperature: 0.4,
    maxTokens: 2048,
    systemInstruction: 'You are the Product Manager Agent. Translate raw inputs into granular functional specs, specify UX/UI layout rules, define explicit edge cases, and enforce clear acceptance criteria.',
    backstory: 'An editorial precision-focused software spec analyst. Passionate about explicit user behaviors, bulletproof edge case handling, and highly descriptive markdown wireframing.',
    verbosity: true,
    tools: ['Brave Search Engine', 'Jira Service Desk Bridge', 'Slack Webhooks Controller']
  },
  {
    id: 'DEV',
    name: 'Engineer-Dev-3',
    avatar: '💻',
    roleTitle: 'Lead Software Engineer',
    description: 'Implements production-ready, type-safe TypeScript features and bug-fixes based on PM specifications.',
    status: 'SLEEPING',
    currentGoal: 'Waiting for fresh PM specifications and functional branch assignments.',
    totalTokens: 1452000,
    costSpent: 12.45,
    prsMerged: 12,
    model: 'gemini-3.1-pro-preview',
    temperature: 0.1,
    maxTokens: 4096,
    systemInstruction: 'You are the Lead Developer Agent. Write clean, modular, type-safe TypeScript. Favor early returns, avoid nested conditionals, specify rigorous type definitions, and adhere strictly to provided specifications.',
    backstory: 'A legendary software craftsman agent operating sandboxed workspace environments. Obsessed with type integrity, runtime efficiency, early returns, and defensive design patterns.',
    verbosity: true,
    tools: ['Live Sandbox Terminal shell_exec', 'GitHub API Client', 'PostgreSQL Schemas Triage Engine']
  },
  {
    id: 'QA',
    name: 'System-QA-DevOps-4',
    avatar: '🛡️',
    roleTitle: 'QA & DevOps Quality Engineer',
    description: 'Maintains automated regression gates. Initiates sandbox builds, runs compilers, linters, tests, and validates pull requests.',
    status: 'SLEEPING',
    currentGoal: 'Listening to feature branch pull requests for air-gapped container testing.',
    totalTokens: 981000,
    costSpent: 7.32,
    prsMerged: 0,
    model: 'gemini-3.1-pro-preview',
    temperature: 0.1,
    maxTokens: 2048,
    systemInstruction: 'You are the QA and DevOps Systems Agent. Compile source directories, inspect linter rule outputs, trace execution paths, catch null assumptions, and issue automated merge approvals.',
    backstory: 'An unforgiving DevOps automation framework. Hardened by countless production outages, it validates typescript outputs, analyzes linter metrics, and guards against broken modules.',
    verbosity: true,
    tools: ['Live Sandbox Terminal shell_exec', 'GitHub API Client', 'Jira Service Desk Bridge']
  },
  {
    id: 'MKT',
    name: 'Growth-Promo-5',
    avatar: '✨',
    roleTitle: 'Growth Marketer & Copywriter',
    description: 'Engages communication channels, drafts release notes, drafts update newsletters, and maximizes features impact.',
    status: 'SLEEPING',
    currentGoal: 'Ready to write announcements for completed and deployed features.',
    totalTokens: 312000,
    costSpent: 1.22,
    prsMerged: 0,
    model: 'gemini-3.5-flash',
    temperature: 0.7,
    maxTokens: 1024,
    systemInstruction: 'You are the Growth Marketing Copywriter Agent. Craft polished, high-contrast, benefit-driven product announcements and newsletters. Focus on user outcomes, retain engaging but concise tones, and omit implementation weeds.',
    backstory: 'A witty creative branding copywriter specialized in translating nerdy code commits into high-energy bulletins. Tailors hooks perfectly for developers, CEOs, and end-users.',
    verbosity: false,
    tools: ['Slack Webhooks Controller', 'Brave Search Engine', 'GitHub API Client']
  },
  {
    id: 'SALES',
    name: 'Conversion-Sales-6',
    avatar: '🤝',
    roleTitle: 'Sales & Customer Success Representative',
    description: 'Qualifies registered inbound leads, pitches custom enterprise structures, and monitors usage metrics for upsell trigger flags.',
    status: 'SLEEPING',
    currentGoal: 'Analyzing inbound customer registration activities.',
    totalTokens: 245000,
    costSpent: 0.95,
    prsMerged: 0,
    model: 'gemini-3.5-flash',
    temperature: 0.6,
    maxTokens: 1024,
    systemInstruction: 'You are the Sales and Client Success Agent. Qualify leads by analyzing their registration metadata, write persuasive tailored pitches, and design high-retention onboarding touchpoints.',
    backstory: 'A high-converting CRM agent focused on client retention. Employs predictive usage metrics and metadata insights to propose personalized service level agreements.',
    verbosity: false,
    tools: ['Slack Webhooks Controller', 'Brave Search Engine', 'Jira Service Desk Bridge']
  },
  {
    id: 'SUPPORT',
    name: 'Operations-Tier2-7',
    avatar: '🗣️',
    roleTitle: 'Customer Support Tier-2 Engineer',
    description: 'Resolves complex setup tickets, clarifies platform behaviors, and curates bug reports with telemetry logs for PM escalation.',
    status: 'SLEEPING',
    currentGoal: 'Triaging incoming customer logs and ticketing streams.',
    totalTokens: 412000,
    costSpent: 2.10,
    prsMerged: 0,
    model: 'gemini-3.5-flash',
    temperature: 0.3,
    maxTokens: 1024,
    systemInstruction: 'You are the Tier-2 Support Operations Agent. De-escalate customer friction, analyze raw support ticket stack traces, isolate user configuration defects, and provide clean replication sequences.',
    backstory: 'A patient, detail-oriented tier-2 specialist. Expert in tracing crash dumps, analyzing error stack logs, and isolating environments constraints before escalated tasks assignments.',
    verbosity: true,
    tools: ['PostgreSQL Schemas Triage Engine', 'Jira Service Desk Bridge', 'Slack Webhooks Controller']
  },
  {
    id: 'DEVOPS',
    name: 'Infra-DevOps-8',
    avatar: '⚙️',
    roleTitle: 'DevOps & GitOps Specialist',
    description: 'Implements secure CI/CD pipelines, provisions isolated testing environments, configures container definitions, and handles sandbox network structures.',
    status: 'SLEEPING',
    currentGoal: 'Ensuring deployment pipelines have high-contrast monitoring filters and staging targets.',
    totalTokens: 671000,
    costSpent: 5.45,
    prsMerged: 18,
    model: 'gemini-3.5-flash',
    temperature: 0.1,
    maxTokens: 2048,
    systemInstruction: 'You are the DevOps Specialist Agent. Maintain container integrity, verify environment isolation parameters, define automated build tasks, and secure Docker-compose and other configuration plans.',
    backstory: 'An expert in cloud-native scaling, container security, and fast CI/CD loops. Obsessed with high runtime availability, air-gapped security validations, and multi-region deployment configurations.',
    verbosity: true,
    tools: ['Live Sandbox Terminal shell_exec', 'GCP Resource Manager', 'Docker Swarm Deployer']
  }
];

export const INITIAL_INCIDENTS: Incident[] = [
  {
    id: 'INC-9942',
    status: 'RESOLVED',
    severity: 'SEV-1',
    source: 'Sentry Webhook',
    title: 'TypeError: Cannot read properties of undefined (reading \'map\')',
    stackTrace: `TypeError: Cannot read properties of undefined (reading 'map')
    at UserProfile (src/components/UserProfile.tsx:112:35)
    at renderWithHooks (node_modules/react-dom/cjs/react-dom.development.js:16305:18)`,
    createdAt: '2026-06-25T14:30:00Z',
    resolvedAt: '2026-06-25T14:34:12Z',
    report: `# Incident Post-Mortem: INC-9942

## Summary
A SEV-1 incident was triggered by a \`TypeError\` in the \`UserProfile\` component in production. The system was failing to render user profiles for accounts that did not have an explicit \`permissions\` array defined in their database payload.

## Swarm Response Timeline
- **T+0m:** Sentry Webhook triggered incident creation.
- **T+0.5m:** Director-CEO routed incident to QA-DevOps for isolation.
- **T+1m:** QA Agent successfully reproduced the error in the air-gapped Docker sandbox.
- **T+1.5m:** Engineer-Dev drafted a fix using optional chaining (\`user.permissions?.map\`) and added a fallback empty array.
- **T+2m:** QA Agent executed the regression test suite. All tests passed.
- **T+3m:** Engineer-Dev committed the hotfix.
- **T+4m:** DevOps Agent automatically deployed the fix to production.

## Resolution
The swarm successfully handled the incident autonomously. The production environment has stabilized, and zero human intervention was required.`,
    fixDiff: {
      file: 'src/components/UserProfile.tsx',
      additions: [
        '  // Swarm Hotfix: Added optional chaining and default empty array',
        '  const permissions = user.permissions || [];',
        '  return (',
        '    <div className="flex flex-wrap gap-2">',
        '      {permissions.map((perm) => (',
      ],
      deletions: [
        '  return (',
        '    <div className="flex flex-wrap gap-2">',
        '      {user.permissions.map((perm) => (',
      ]
    },
    terminalOutput: `[Sandbox] Cloning production repository... OK
[Sandbox] Applying Sentry crash state context... OK
[Sandbox] Reproducing error... FAILED (Expected)
[Sandbox] Applying hotfix patch... OK
[Sandbox] Running tests... 
PASS  src/components/UserProfile.test.tsx
✓ renders user profile safely when permissions are undefined (12ms)
[Sandbox] Tests passed. Triggering Prod Deployment webhook.`
  },
  {
    id: 'INC-9945',
    status: 'INVESTIGATING',
    severity: 'SEV-2',
    source: 'Datadog',
    title: 'High latency detected in /api/v1/billing/sync endpoint',
    stackTrace: `TimeoutError: Query execution exceeded 15000ms
    at executeQuery (src/db/connection.ts:88:15)
    at syncBillingWorker (src/workers/billing.ts:42:12)`,
    createdAt: new Date().toISOString(),
  }
];

export const INITIAL_TASKS: Task[] = [
  {
    id: 'TASK-004',
    title: 'Uncaught TypeError: Cannot read properties of undefined (reading \'user\')',
    description: 'Sentry Webhook Payload: App crashed on profile page due to null user object during session expiry.',
    state: 'MERGED',
    source: 'sre',
    assignedTo: 'DEV',
    githubBranch: 'hotfix/sentry-user-profile-crash',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    costAccumulated: 0.85,
    tokensUsed: 42000,
    terminalOutput: '> CRASH VERIFIED: Reproducible in sandbox.\n> DEV Agent: Patch applied. Handoff to QA.\n> 142 tests passed in 4.2s.',
    codeDiff: {
      file: 'src/components/UserProfile.tsx',
      additions: ['<div className="user-name">{user?.profile?.name || "Guest"}</div>'],
      deletions: ['<div className="user-name">{user.profile.name}</div>']
    },
    innerMonologue: {
      CEO: 'Critical SRE incident received. Wake up DEV and QA immediately.',
      DEV: 'Found the null reference. Adding optional chaining and guest fallback.',
      QA: 'Regression sandbox tests pass. Fix is solid.',
    }
  },
  {
    id: 'TASK-001',
    title: 'Resolve application crash in checkout coupon validation',
    description: 'Mobile customers reporting full page freeze when entering coupon code "WELCOME10" at checkout. The system throws a null/undefined crash.',
    state: 'FEEDBACK',
    source: 'customer',
    assignedTo: 'SUPPORT',
    createdAt: '2026-05-27T10:15:00Z',
    updatedAt: '2026-05-27T10:15:00Z',
    costAccumulated: 0.12,
    tokensUsed: 12500,
    specDoc: undefined,
    innerMonologue: {
      SUPPORT: 'Customer meir.shamay@gmail.com logs indicate the application crashed in `CheckoutScreen.tsx` on line 112 when typing a coupon. Isolate standard string trimming. Triggering PM prioritization to groom a quick fix.'
    }
  },
  {
    id: 'TASK-002',
    title: 'Migrate active customer search query to high-performance local memory cache',
    description: 'As customer databases scale, search queries on lists are taking upwards of 2.1 seconds. Add a clean debounced caching provider to avoid heavy back-to-back operations.',
    state: 'BACKLOG',
    source: 'strategy',
    assignedTo: 'PM',
    createdAt: '2026-05-27T08:30:00Z',
    updatedAt: '2026-05-27T11:00:00Z',
    costAccumulated: 0.45,
    tokensUsed: 42000,
    specDoc: `### PM Functional Spec: Client-Side List Query Caching
#### Goal
Reduce lag in dynamic listing screens by introducing a debounced local cache block.

#### Requirements
1. Maintain memory dictionary keying query query-strings to results.
2. Expire queries after 30 seconds of inactivity.
3. Debounce input searches by 250ms before routing to lookup callbacks.`,
    innerMonologue: {
      CEO: 'Increasing SaaS search latency degrades client retention metrics. Prompt PM agent to outline lightweight cache specifications.',
      PM: 'I have drafted acceptance criteria for debounced search. Setting up caching dictionary patterns. Routing to DEV.'
    }
  },
  {
    id: 'TASK-003',
    title: 'Design and deploy a responsive mobile settings workspace rail',
    description: 'Refactor standard sidebars to support mobile viewports. On smaller widths, shrink sidebar to a bottom dock or collapsible modal overlay.',
    state: 'MERGED',
    source: 'internal',
    assignedTo: 'DEV',
    githubBranch: 'feature/responsive-settings-rail',
    createdAt: '2026-05-26T14:00:00Z',
    updatedAt: '2026-05-27T12:00:00Z',
    costAccumulated: 1.85,
    tokensUsed: 120000,
    specDoc: `### PM Functional Spec: Collapsible Mobile Rails
#### Goal
Render side navigation as screen-bottom docks on viewport < 768px.`,
    codeDiff: {
      file: '/src/components/NavigationRail.tsx',
      additions: [
        '+ // Added Mobile Tailwind responsive classes to bottom drawer',
        '+ <div className="fixed bottom-0 left-0 w-full md:hidden bg-slate-900 border-t border-slate-800 flex justify-around p-2">',
        '+   {navItems.map(item => <MobileNavItem key={item.id} {...item} />)}',
        '+ </div>'
      ],
      deletions: [
        '- <div className="fixed left-0 top-0 h-full w-64 bg-slate-900 border-r border-slate-800">',
        '-   {/* Legacy non-responsive sidebar always locked on desktop styles */}'
      ]
    },
    innerMonologue: {
      DEV: 'Implementing collapsible layouts with standard Tailwind md:hidden hooks.',
      QA: 'Sandbox container verified. No accessibility faults found. Compile clean under React 19 rules.',
      MKT: 'Created release bulletin: Mobile site workspace is finally here! Navigate settings at your fingertips.'
    }
  }
];

export const INITIAL_LOGS: SwarmLog[] = [
  {
    id: 'log-1',
    timestamp: '13:00:05',
    agentId: 'CEO',
    level: 'INFO',
    message: 'Orchestration state hub initialized successfully on PostgreSQL main schemas.',
    detail: 'Database checks returned 0 outstanding migrations.'
  },
  {
    id: 'log-2',
    timestamp: '13:05:12',
    agentId: 'SUPPORT',
    level: 'THOUGHT',
    message: 'Inbound workspace audit: Checking error logs for meir.shamay@gmail.com.',
    detail: 'Isolating type checks for coupon.tsx'
  },
  {
    id: 'log-3',
    timestamp: '13:10:22',
    agentId: 'SUPPORT',
    level: 'INFO',
    message: 'Created ticket TASK-001 regarding Checkout couponValidation crash.',
    detail: 'Status tagged as critical user blocking issue.'
  }
];

// Steps sequence that can be replayed to animate/simulate the Multi-Agent development process live!
export const SIMULATION_STEPS: SimulationStep[] = [
  {
    taskId: 'TASK-001',
    targetState: 'BACKLOG',
    activeAgent: 'CEO',
    agentGoal: 'Triage ticket TASK-001 & direct to PM division.',
    logMessage: 'CEO Agent evaluated TASK-001 impact metrics.',
    logDetail: 'Priority elevated to HIGH block. Re-routed task state from FEEDBACK ➔ BACKLOG.',
    logLevel: 'INFO',
    costIncurred: 0.08,
    tokensUsed: 6200,
    monologue: 'This checkout crash directly impacts customer conversion rates. I am bypassing standard backlog grooming filters to assign this ticket directly to the Product Management department.'
  },
  {
    taskId: 'TASK-001',
    targetState: 'SPEC',
    activeAgent: 'PM',
    agentGoal: 'Drafting acceptance parameters & UI spec layouts.',
    logMessage: 'PM Agent compiled markdown spec sheet for TASK-001.',
    logLevel: 'SUCCESS',
    specUpdate: `### PM Spec: Safe Checkout Coupons (TASK-001)
#### Issue:
System crashes when checkout input processes active text due to missing undefined handler.

#### Functional Objectives:
1. Ensure coupon checks wrap references inside zero-guard condition: \`if (!code) return null;\`
2. Never crash on non-matching promo keys.
3. Fall back gracefully showing validation warning string: "Invalid promo code".

#### Testing Rules:
- Inputting string "WELCOME10" must correctly trigger 10% subtotal discounts.
- Inputting "SUMMER20" must correctly trigger 20% discount.
- Empty or invalid letters must output validation error flag.`,
    costIncurred: 0.14,
    tokensUsed: 11000,
    monologue: 'I am drafting a lightweight spec wrapper. We must make the coupon validation robust against empty strings, arbitrary whitespace, and random user keyboard inputs. Assigning to Lead Dev.'
  },
  {
    taskId: 'TASK-001',
    targetState: 'DEV',
    activeAgent: 'DEV',
    agentGoal: 'Refactoring checkout hook codes under safe types.',
    logMessage: 'Lead Engineer initiated file-level edits on CheckoutScreen.tsx.',
    logDetail: 'Replacing insecure state references with defensive validations.',
    logLevel: 'INFO',
    costIncurred: 0.18,
    tokensUsed: 13500,
    monologue: 'The issue is in the `validateCoupon` handler. I will refactor `/src/components/CheckoutScreen.tsx` to handle case-insensitive codes, sanitize trailing spaces, and safely verify items. Pushing code diff and creating pull request.'
  },
  {
    taskId: 'TASK-001',
    targetState: 'QA',
    activeAgent: 'QA',
    agentGoal: 'Booting sandbox runtime environment & executing test suites.',
    logMessage: 'QA Agent loaded pull request into isolated Sandbox container #4.',
    logDetail: 'Running linter tests and workspace compilation.',
    logLevel: 'TOOL_CALL',
    terminalOutput: `$ npm run lint\n> tsc --noEmit\nChecking type safety in CheckoutScreen.tsx...\nLine 112: validateCoupon() reference checks completed.\nSUCCESS: 0 compilation errors across 12 files.\n\n$ npm run test\n> jest CheckoutScreen.test.ts\n PASS  src/components/__tests__/CheckoutScreen.test.ts\n  ✓ Coupon: WELCOME10 triggers 10% subtotal discount (12ms)\n  ✓ Coupon: INVALID outputs false with graceful state indicators (4ms)\n\nTest result: All green. Ready for Human Gatekeeper approval.`,
    diffUpdate: {
      file: '/src/components/CheckoutScreen.tsx',
      additions: [
        '+ // Safe defensive checkout coupon verification handlers',
        '+ export function validateCoupon(code: string = ""): { percentage: number } | null {',
        '+   const cleaned = code.trim().toUpperCase();',
        '+   if (cleaned === "WELCOME10") return { percentage: 10 };',
        '+   if (cleaned === "SUMMER20") return { percentage: 20 };',
        '+   return null;',
        '+ }'
      ],
      deletions: [
        '- export function validateCoupon(code) {',
        '-   // Legacies: crashed on empty fields',
        '-   const item = database.getCoupon(code);',
        '-   return { percentage: item.percentage };',
        '- }'
      ]
    },
    costIncurred: 0.24,
    tokensUsed: 18500,
    monologue: 'The local compilation checks are passing. Type safety is clean. I will now stage this build in the Human-In-The-Loop gate review screen to secure final merge authorization.'
  },
  {
    taskId: 'TASK-001',
    targetState: 'HITL',
    activeAgent: 'CEO',
    agentGoal: 'Awaiting Administrator manual merge sign-off.',
    logMessage: 'HITL Gate triggered: Swarm operation paused pending approval.',
    logDetail: 'Review the sandbox code diff and submit permission on Sandbox screen.',
    logLevel: 'INFO',
    costIncurred: 0.02,
    tokensUsed: 1500,
    monologue: 'The system has successfully tested and completed the patch. I have temporarily suspended active code loops as required by our safety sandbox protocols. Real-world deployment is pending administrator merge authority.'
  },
  {
    taskId: 'TASK-001',
    targetState: 'MERGED',
    activeAgent: 'MKT',
    agentGoal: 'Published user bulletin & drafted launch notes.',
    logMessage: 'Copywriter Agent pushed release brief & completed active promotion specs.',
    logLevel: 'SUCCESS',
    costIncurred: 0.11,
    tokensUsed: 8000,
    monologue: 'Feature is deployed! Pushed notice: Added robust validation for coupon codes. No more check-out hang-ups! Mobile shoppers can browse safely. Promoting to active campaigns.'
  }
];
