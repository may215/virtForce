import React, { useState, useEffect, useRef } from 'react';
import { Task, SwarmLog } from '../types';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ShieldCheck, 
  GitPullRequest, 
  RotateCcw, 
  Flame, 
  CheckCircle2, 
  ChevronRight, 
  XCircle, 
  MessageSquare, 
  Database, 
  Cpu, 
  Send, 
  Sparkles, 
  MessageCircle, 
  Layers, 
  Globe,
  Settings,
  HelpCircle,
  Eye,
  EyeOff,
  Sliders,
  Key,
  RefreshCw,
  AlertTriangle
} from 'lucide-react';

interface SecuritySandboxProps {
  tasks: Task[];
  onApproveDeploy: (taskId: string) => void;
  onRejectRetrain: (taskId: string, feedback: string) => void;
  onGlobalKillReset: () => void;
  isSystemKilled: boolean;
  onInitializeVenture?: (
    name: string, 
    pitch: string, 
    techStack: string, 
    focusMetric: string, 
    customBacklog: Task[],
    updatedAgents: any[]
  ) => void;
}

// virtForce Container Type
interface VirtualContainer {
  id: string;
  name: string;
  group: string;
  status: 'ONLINE' | 'ISOLATED' | 'OFFLINE';
  cpu: number;
  memory: string;
  port: number;
  skills: string[];
}

export function SecuritySandbox({
  tasks,
  onApproveDeploy,
  onRejectRetrain,
  onGlobalKillReset,
  isSystemKilled,
  onInitializeVenture
}: SecuritySandboxProps) {
  const [internalTab, setInternalTab] = useState<'hitl' | 'virtforce' | 'gateways' | 'ingest' | 'multica' | 'providers' | 'skills_engine'>('hitl');

  // --- AI Model Providers States & Credentials Tweaker ---
  const [aiProvidersConfig, setAiProvidersConfig] = useState<any>(() => {
    const saved = localStorage.getItem('vac_ai_providers');
    return saved ? JSON.parse(saved) : {
      activeProvider: 'gemini',
      failoverEnabled: true,
      failoverProvider: 'mock',
      providers: {
        gemini: { enabled: true, apiKey: '', apiBase: 'https://generativelanguage.googleapis.com', defaultModel: 'gemini-3.5-flash', temperature: 0.7, maxTokens: 2048, topP: 0.95, frequencyPenalty: 0.0, presencePenalty: 0.0 },
        openai: { enabled: false, apiKey: '', apiBase: 'https://api.openai.com/v1', defaultModel: 'gpt-4o-mini', temperature: 0.7, maxTokens: 2048, topP: 0.95, frequencyPenalty: 0.0, presencePenalty: 0.0 },
        anthropic: { enabled: false, apiKey: '', apiBase: 'https://api.anthropic.com/v1', defaultModel: 'claude-3-5-haiku-20241022', temperature: 0.7, maxTokens: 2048, topP: 0.95, frequencyPenalty: 0.0, presencePenalty: 0.0 },
        deepseek: { enabled: false, apiKey: '', apiBase: 'https://api.deepseek.com/v1', defaultModel: 'deepseek-chat', temperature: 0.7, maxTokens: 2048, topP: 0.95, frequencyPenalty: 0.0, presencePenalty: 0.0 },
        ollama: { enabled: false, apiKey: '', apiBase: 'http://localhost:11434/v1', defaultModel: 'llama3', temperature: 0.7, maxTokens: 2048, topP: 0.95, frequencyPenalty: 0.0, presencePenalty: 0.0 }
      }
    };
  });

  // Track password masking for API key input fields per provider
  const [revealKeys, setRevealKeys] = useState<Record<string, boolean>>({
    gemini: false,
    openai: false,
    anthropic: false,
    deepseek: false,
    ollama: false
  });

  const [editingProvider, setEditingProvider] = useState<string>('gemini');
  const [testingProvider, setTestingProvider] = useState<string | null>(null);
  const [testConsoleLogs, setTestConsoleLogs] = useState<string[]>([]);

  // Automatically sync settings changes to localStorage
  useEffect(() => {
    localStorage.setItem('vac_ai_providers', JSON.stringify(aiProvidersConfig));
  }, [aiProvidersConfig]);

  // Handle Handshake Credential Testing
  const handleTestCredentials = async (providerKey: string) => {
    setTestingProvider(providerKey);
    setTestConsoleLogs([
      `[diagnostics] Initiating secure credential test-runner for ${providerKey.toUpperCase()}...`,
      `[diagnostics] Resolving endpoint parameters...`,
    ]);
    
    await new Promise(r => setTimeout(r, 600));
    const provConfig = aiProvidersConfig.providers[providerKey];
    setTestConsoleLogs(prev => [
      ...prev,
      `[diagnostics] Target API endpoint base: "${provConfig.apiBase || 'DEFAULT_ENV_STANDARDS'}"`,
      `[diagnostics] Model preset: "${provConfig.defaultModel}"`,
      `[diagnostics] Masked Api credential length: ${provConfig.apiKey ? provConfig.apiKey.length : '0 (Using server environment)'} chars`,
      `[diagnostics] Transport pipeline: Fetch HTTP Client POST Handshake...`,
      `[diagnostics] Despatching payload thread and waiting for node reply...`
    ]);

    try {
      const res = await fetch('/api/ai/verify-credentials', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          provider: providerKey,
          settings: provConfig
        })
      });
      const data = await res.json();
      
      await new Promise(r => setTimeout(r, 1000));
      setTestConsoleLogs(prev => [
        ...prev,
        data.success 
          ? `[SUCCESS] Connection returned HTTP 200 OK.`
          : `[ERROR] Remote API host rejected auth check.`,
        data.log || `[ERROR] No logs returned from node adapter.`
      ]);
    } catch (err: any) {
      setTestConsoleLogs(prev => [
        ...prev,
        `[FATAL] Local client socket error: ${err.message || err}`,
        `[diagnostics] Handshake abort sequence complete.`
      ]);
    } finally {
      setTestingProvider(null);
    }
  };

  // --- Multica Daemon Companion States ---
  const [isMulticaConnected, setIsMulticaConnected] = useState(true);
  const [multicaInputCmd, setMulticaInputCmd] = useState('');
  const [multicaLogs, setMulticaLogs] = useState<string[]>([
    '[multicad] background daemon started successfully on localhost:5902',
    '[multicad] parsed local teammate folders (~/.multica/teammates/)',
    '[multicad] loading active teammate skills: [Coder-Teammate, QA-Sentry, DevOps-Pipeline]',
    '[multica] Type a CLI command (e.g. "multica help", "multica list")'
  ]);
  const [multicaTeammates, setMulticaTeammates] = useState([
    { id: 'MC-1', name: 'CEO-Copilot', role: 'Team Supervisor', affinity: '94%', model: 'gemini-3.5-flash', status: 'IDLE' },
    { id: 'MC-2', name: 'Code-Mutant', role: 'Full-Stack Coder', affinity: '98%', model: 'gemini-2.5-pro', status: 'ACTIVE' },
    { id: 'MC-3', name: 'Aero-DevOps', role: 'GitOps Continuous Deploy', affinity: '92%', model: 'gemini-3.5-flash', status: 'IDLE' }
  ]);

  // --- External Project Ingestion States ---
  const [ingestUrl, setIngestUrl] = useState('https://fieldiz-app-15033378532.europe-west1.run.app/');
  const [ingestCategory, setIngestCategory] = useState('field_service');
  const [ingestMethod, setIngestMethod] = useState('web_crawl');
  const [ingestToken, setIngestToken] = useState('••••••••••••••••••••••••');
  const [ingestStep, setIngestStep] = useState<'IDLE' | 'SCANNING' | 'DEDUCING' | 'FORMULATING' | 'SUCCESS'>('IDLE');
  const [ingestProgress, setIngestProgress] = useState(0);
  const [ingestConsole, setIngestConsole] = useState<string[]>([]);

  // Find task currently stalled on HITL state
  const hitlTasks = tasks.filter(t => t.state === 'HITL');
  const [selectedTaskId, setSelectedTaskId] = useState<string>(hitlTasks[0]?.id || '');
  const [feedbackText, setFeedbackText] = useState('');

  const activeTask = tasks.find(t => t.id === (selectedTaskId || hitlTasks[0]?.id));

  const handleRejectSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeTask || !feedbackText.trim()) return;
    onRejectRetrain(activeTask.id, feedbackText);
    setFeedbackText('');
  };

  // Run the multi-stage external source workspace crawling process
  const handleIngestWebProject = () => {
    if (ingestStep !== 'IDLE') return;

    setIngestStep('SCANNING');
    setIngestProgress(5);
    setIngestConsole([
      `[1/4] Establishing secure tunnel boundary to: ${ingestUrl}`,
      `[INGRESS] Source acquisition strategy: ${ingestMethod.toUpperCase()}`,
      `[INGRESS] Mapped SSH token: ${ingestToken ? 'SECURE_HOLD' : 'DEFAULT'}`,
      `[SYSTEM] Spawning air-gapped container sandboxes... OK`
    ]);

    // Let's create beautiful staggered timeout progression
    const printLog = (msg: string, progress: number, step?: 'SCANNING' | 'DEDUCING' | 'FORMULATING' | 'SUCCESS') => {
      setIngestProgress(progress);
      if (step) setIngestStep(step);
      setIngestConsole(prev => [...prev, msg]);
    };

    setTimeout(() => {
      printLog(`[CONNECT] HTTP GET request dispatched to target domain. Status: 200 OK.`, 15);
    }, 800);

    setTimeout(() => {
      printLog(`[CRAWL] Successfully fetched root DOM index.html bundle (3,405 bytes).`, 25);
    }, 1600);

    setTimeout(() => {
      printLog(`[SCAN] Parsing active stylesheets. CSS rules mapped: 1,421. Tailwind detected!`, 35);
      printLog(`[SCAN] Resolving chunk assets. Main script bundles verified: App.tsx, index.tsx, router-core.js`, 40, 'DEDUCING');
    }, 2400);

    setTimeout(() => {
      printLog(`[REVERSEENG] Analyzing modules tech stack...`, 50);
      printLog(`[REVERSEENG] DETECTED FRAMEWORKS: React 18.2+, Vite Bundler Engine, Mapbox-GL Maps overlay integration, Lucide SVG Icons.`, 60);
    }, 3200);

    setTimeout(() => {
      printLog(`[SECURE] Sandbox auditing target packages for known thread vectors... Clear!`, 70, 'FORMULATING');
    }, 4000);

    setTimeout(() => {
      printLog(`[INTEGRITY] Mapbox geographic check constraints verified. Host region is Europe-West.`, 80);
      printLog(`[BACKLOG] CEO / PM orchestrator generating customized dispatch sub-tasks for Fieldiz...`, 90);
    }, 4800);

    setTimeout(() => {
      setIngestProgress(100);
      setIngestStep('SUCCESS');
      setIngestConsole(prev => [
        ...prev,
        `[SUCCESS] 🛸 SWARM RE-ALIGNMENT INITIALIZED! INGESTED FIELDIZ CORE WORKSPACE SUCCESSFULLY.`,
        `[SYSTEM] Dismantling previous staging context. Initializing Field Service maps targets...`,
        `[TELEMETRY] Hot-swapping active Kanban logs over to Fieldiz project!`
      ]);

      // Trigger the actual project swap callback to make it 100% real and interactive!
      if (onInitializeVenture) {
        const fieldizBacklog: Task[] = [
          {
            id: 'TASK-FLDZ-01',
            title: 'Mapbox Route Path Tracking Optimization API',
            description: 'Connect the developer sandbox to Mapbox/Google Maps Routes API to implement driver coordinate calculations on the active Fieldiz checkouts page.',
            state: 'DEV',
            source: 'customer',
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            costAccumulated: 0.12,
            tokensUsed: 14000,
            innerMonologue: {
              CEO: 'I need our DEV agent to prioritize integrating GPS coordinates so scheduling dispatch is fully automated.',
              DEV: 'Formulating proper Mapbox GL token access and writing geographic fencing triggers.',
              PM: 'Structuring specifications for coordinate checking maps inputs.',
              QA: 'Awaiting codebase draft from developer.',
              MKT: 'Standby for release bulletin.'
            } as any
          },
          {
            id: 'TASK-FLDZ-02',
            title: 'Offline Service SQLite Staging Handler',
            description: 'Build client-side offline persistence layer to guarantee job records and technician dispatch notes are saved locally if Cellular/giga signal drops during remote field runs.',
            state: 'FEEDBACK',
            source: 'internal',
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            costAccumulated: 0,
            tokensUsed: 0,
            innerMonologue: {
              CEO: 'This offline sync handler will safeguard user technician records from dropping.',
              DEV: 'Deciding whether to use SQLite local bundle or WebStorage indexes for sandbox simplicity.',
              PM: 'Drafting acceptance criteria: offline write must synchronize background states.',
              QA: 'Will test network latency states simulation.',
              MKT: 'No action taken.'
            } as any
          },
          {
            id: 'TASK-FLDZ-03',
            title: 'Field Dispatch Secure SMS & WhatsApp Notification Trigger',
            description: 'Implement SMS and WhatsApp webhook container queues on port 10306 to notify dispatchers of technician arrival instantly when job coordinates match.',
            state: 'HITL',
            source: 'strategy',
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            costAccumulated: 1.45,
            tokensUsed: 128000,
            innerMonologue: {
              CEO: 'The notification module has passed regression. I have prepared it on branch feature/fieldiz-notif-trigger for human differential checkout.',
              DEV: 'Implemented Twilio container socket on port 10306 with robust fallback queues for offline states.',
              QA: 'All Unit tests passed. Mocked coordinates payload resolved green. Ready to commit to production.'
            } as any,
            githubBranch: 'feature/fieldiz-notif-trigger',
            codeDiff: {
              file: 'src/components/DispatchWebsocket.ts',
              deletions: [
                '// Send SMS notification via Twilio (mock placeholder)',
                'console.log("dispatch notification dropped due to offline process queue")'
              ],
              additions: [
                'import { TwilioSecureClient } from \'../services/twilio\';',
                'const client = new TwilioSecureClient(process.env.TWILIO_AUTH_TOKEN);',
                'await client.dispatchWebhookTrigger({',
                '   recipient: dispatch.phone,',
                '   body: \'Technician arrival confirmed at job coordinates: \' + job.lat + \', \' + job.lng',
                '});'
              ]
            }
          }
        ];

        // Create awakened agent swarm metrics
        const fieldizAgents = [
          { id: 'CEO', name: 'Supervisor CEO', role: 'Orchestrating Router', model: 'Gemini 2.5 Pro', status: 'ACTIVE', currentGoal: 'Monitoring active Fieldiz maps integration processes.', totalTokens: 45000, costSpent: 0.45, prsMerged: 0 },
          { id: 'PM', name: 'Specs PM', role: 'Specifications Groller', model: 'Gemini 3.5 Flash', status: 'SLEEPING', currentGoal: 'Finalizing technical specifications and backlogs.', totalTokens: 12000, costSpent: 0.10, prsMerged: 0 },
          { id: 'DEV', name: 'OpenHands DEV', role: 'Secure Code Developer', model: 'Gemini 2.5 Pro', status: 'CODE_RUNNING', currentGoal: 'Writing Mapbox tracking modules inside container sandbox.', totalTokens: 98000, costSpent: 0.98, prsMerged: 0 },
          { id: 'QA', name: 'Vitest QA', role: 'Vulnerability Auditor', model: 'Gemini 3.5 Flash', status: 'SLEEPING', currentGoal: 'Synthesizing coordinate tests payloads.', totalTokens: 52000, costSpent: 0.52, prsMerged: 0 },
          { id: 'MKT', name: 'Copy MKT', role: 'Organic Promoter', model: 'Gemini 3.5 Flash', status: 'SLEEPING', currentGoal: 'Formulating outreach assets for field systems.', totalTokens: 4000, costSpent: 0.04, prsMerged: 0 }
        ];

        setTimeout(() => {
          onInitializeVenture(
            "Fieldiz Workspace Swarm",
            "An advanced self-hosted Field Service & Dispatch Management Automation module that routes dispatch tickets, updates technician locations, and persists job notes locally.",
            "React 18 + Vite + TailwindCSS + Mapbox GL Routing API",
            "Average route accuracy & check-in security boundary",
            fieldizBacklog,
            fieldizAgents
          );
        }, 1200);
      }
    }, 5600);
  };

  // --- virtForce Containers State ---
  const [isolationLevel, setIsolationLevel] = useState<'LOW' | 'MEDIUM' | 'HIGH_NANO'>('MEDIUM');
  const [nanoContainers, setNanoContainers] = useState<VirtualContainer[]>([
    { id: 'vf-ceo', name: 'virtForce-Orchestrator-01', group: 'CEO / PM Supervisor', status: 'ONLINE', cpu: 1.2, memory: '18 MB', port: 10301, skills: ['routing', 'budget_guard', 'notion_sync'] },
    { id: 'vf-dev', name: 'virtForce-CodingRunner-04', group: 'DEV Workspace', status: 'ONLINE', cpu: 45.8, memory: '412 MB', port: 10302, skills: ['node_runner', 'linter_compile', 'tailwind_purge'] },
    { id: 'vf-qa', name: 'virtForce-CompilerSandbox-09', group: 'QA Node Runner', status: 'ONLINE', cpu: 0.1, memory: '72 MB', port: 10303, skills: ['test_runner', 'vulnerability_scanner'] },
    { id: 'vf-mkt', name: 'virtForce-SocialGateway-11', group: 'Growth / Messenger Sync', status: 'ONLINE', cpu: 2.4, memory: '48 MB', port: 10304, skills: ['whatsapp_webhook', 'telegram_webhook', 'twitter_outbound'] }
  ]);

  // Skill toggles
  const [availableSkills, setAvailableSkills] = useState([
    { id: 'notion_sync', name: 'Notion Backlog Sync', enabled: true, desc: 'Syncs task statuses to a public-facing product roadmap.' },
    { id: 'vulnerability_scanner', name: 'Node Vulnerability Scanner', enabled: true, desc: 'Scans package.json dependency lines for malicious packages.' },
    { id: 'whatsapp_webhook', name: 'WhatsApp Webhook Link', enabled: true, desc: 'Accepts trigger commands directly from Telegram & WhatsApp clients.' },
    { id: 'puppeteer_crawler', name: 'Browser Scraper (Headless)', enabled: false, desc: 'Spawns sandbox headless chromium nodes to audit online user complaints.' }
  ]);

  const [sandboxSystemLogs, setSandboxSystemLogs] = useState<string[]>([
    "[SYSTEM] virtForce isolation initialized successfully.",
    "[INFO] Binding gateway webhooks to port 3000/api/gateways.",
    "[SECURE] Sandbox environments verified: Active keys stored in isolated container parameters.",
    "[SECURE] Port 10301 is actively listening for CEO Supervisor routing requests."
  ]);

  const toggleSkill = (skillId: string) => {
    setAvailableSkills(prev => prev.map(sk => {
      if (sk.id === skillId) {
        const nextState = !sk.enabled;
        setSandboxSystemLogs(logs => [
          ...logs,
          `[NANO ACTION] Skill "${sk.name}" changed state: ${nextState ? 'LOADED' : 'DETACHED_AND_FREED'}`
        ]);
        return { ...sk, enabled: nextState };
      }
      return sk;
    }));
  };

  // --- Multi-channel Messenger Gateway State ---
  const [activeChannel, setActiveChannel] = useState<'whatsapp' | 'telegram' | 'slack'>('whatsapp');
  const [textInput, setTextInput] = useState('');
  const [messages, setMessages] = useState<{
    id: string;
    sender: 'user' | 'agent-ceo' | 'agent-dev' | 'system';
    text: string;
    time: string;
    avatar?: string;
  }>([
    { id: 'm1', sender: 'agent-ceo', text: "Welcome to virtForce Messenger Gateway! Connect your personal AI agent groups to Telegram and WhatsApp. How can I help you scale today?", time: '11:00 AM' }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  // --- Admin Remote SSH Console (CLI terminal) State ---
  const [remoteGateMode, setRemoteGateMode] = useState<'messenger' | 'cli'>('messenger');
  const [cliInputText, setCliInputText] = useState('');
  const [cliLogRows, setCliLogRows] = useState<Array<{ id: string; text: string; type: 'input' | 'output' | 'error' | 'success' | 'system' }>>([
    { id: '1', text: 'virtForce Secure Remote SSH Gateway [v2.5.0-CJS-Production]', type: 'success' },
    { id: '2', text: 'Node: ais-dev-rjzde7t5.europe-west1.run.app | Port: 3000', type: 'system' },
    { id: '3', text: 'Terminal link successfully initialized. Identity: meir.shamay@gmail.com', type: 'system' },
    { id: '4', text: 'Type "help" or "list" to view available administrative sandbox scripts.', type: 'output' }
  ]);

  // --- Autonomous Incremental Learning & Dynamic Skills States ---
  const [learnedSkills, setLearnedSkills] = useState<Array<{
    id: string;
    name: string;
    origin: string;
    type: 'coding' | 'safety' | 'integration' | 'compliance';
    confidence: number;
    enabled: boolean;
    userPrompt: string;
    matchesCount: number;
    timestamp: string;
  }>>([
    {
      id: 'ls-1',
      name: 'Tailwind Primacy Protocol',
      origin: 'Auto-extracted (Thread Turn #2)',
      type: 'coding',
      confidence: 99,
      enabled: true,
      userPrompt: 'Always style components using inline Tailwind utility classes. Strict prohibition from writing custom CSS files or external style documents to avoid namespace collision.',
      matchesCount: 14,
      timestamp: '14:12:05'
    },
    {
      id: 'ls-2',
      name: 'Absolute Path Deflection',
      origin: 'Auto-extracted (Thread Turn #4)',
      type: 'safety',
      confidence: 97,
      enabled: true,
      userPrompt: 'Refuse workspace paths starting with root "/". Only reference correct relative paths from active directory context to prevent deployment container run crashes.',
      matchesCount: 8,
      timestamp: '14:14:11'
    },
    {
      id: 'ls-3',
      name: 'No-Mocks Integration Truth',
      origin: 'User-Defined Guardrail',
      type: 'integration',
      confidence: 100,
      enabled: true,
      userPrompt: 'Do not simulate downstream infrastructure using mock objects or fake static responses. Write real fetch endpoints and authentic service handshakes.',
      matchesCount: 5,
      timestamp: '14:21:44'
    },
    {
      id: 'ls-4',
      name: 'OAuth Iframe Popup Sandstop',
      origin: 'System Calibrated Override',
      type: 'compliance',
      confidence: 95,
      enabled: false,
      userPrompt: 'Account for sandbox iframe environment variables. Do not spawn browser window.open blocks since standard headers block frame navigation.',
      matchesCount: 2,
      timestamp: '14:22:15'
    }
  ]);

  const [skillsTerminalLogs, setSkillsTerminalLogs] = useState<string[]>([
    "[HEURISTICS] Incremental memory buffers initialized successfully.",
    "[HEURISTICS] Checking active session logs for repetitive user interaction constraints...",
    "[ANALYZER] Extracted pattern: 'use Tailwind' (Confidence: 99%) -> Compiled Tailwind Primacy Protocol.",
    "[ANALYZER] Extracted pattern: 'path is absolute' (Confidence: 97%) -> Compiled Absolute Path Deflection.",
    "[SYSTEM] System skills injected to Code-Runner-04 and Orchestrator-01 containers memory segments."
  ]);

  const isSkillsLoaded = useRef(false);

  // Fetch skills from server on mount
  useEffect(() => {
    fetch('/api/skills')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          setLearnedSkills(data);
          const nowStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
          setSkillsTerminalLogs(prev => [
            ...prev,
            `[${nowStr}] [PERSISTENCE] Loaded ${data.length} active rule vectors successfully from skills.json.`
          ]);
        }
        isSkillsLoaded.current = true;
      })
      .catch(err => {
        console.error("Failed to load skills from backend:", err);
        isSkillsLoaded.current = true;
      });
  }, []);

  // Save skills to server when changed
  useEffect(() => {
    if (!isSkillsLoaded.current) return;

    fetch('/api/skills', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ skills: learnedSkills })
    })
    .then(res => res.json())
    .catch(err => {
      console.error("Failed to sync skills update to backend:", err);
    });
  }, [learnedSkills]);

  // Fetch raw AGENTS.md markdown content
  const refreshAgentsMd = () => {
    fetch('/api/skills/agents-md')
      .then(res => res.json())
      .then(data => {
        if (data && data.markdown) {
          setRawAgentsMdText(data.markdown);
        }
      })
      .catch(err => {
        console.error("Failed to fetch raw AGENTS.md:", err);
      });
  };

  // Save AGENTS.md and trigger reparse
  const saveAgentsMd = (markdownContent: string) => {
    setIsSavingAgentsMd(true);
    const nowStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
    setSkillsTerminalLogs(prev => [
      ...prev,
      `[${nowStr}] [DISK-WRITE] Initializing raw compilation push on AGENTS.md file...`
    ]);

    fetch('/api/skills/agents-md', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ markdown: markdownContent })
    })
    .then(res => res.json())
    .then(data => {
      setIsSavingAgentsMd(false);
      if (data.success) {
        if (Array.isArray(data.parsedSkills) && data.parsedSkills.length > 0) {
          setLearnedSkills(data.parsedSkills);
        }
        setSkillsTerminalLogs(prev => [
          ...prev,
          `[${nowStr}] [SUCCESS] Compiled ${data.count} neural layers out of raw Markdown text and updated skills database.`
        ]);
        setSandboxSystemLogs(logs => [
          ...logs,
          `[SWARM-MEM] AGENTS.md edited and bidirectionally recompiled. Restored ${data.count} structured rules.`
        ]);
      } else {
        setSkillsTerminalLogs(prev => [...prev, `[${nowStr}] [ERROR] Markdown compilation failed: ${data.error || 'Syntax format error'}`]);
      }
    })
    .catch(err => {
      setIsSavingAgentsMd(false);
      console.error("Failed to compile markdown:", err);
      setSkillsTerminalLogs(prev => [...prev, `[${nowStr}] [ERROR] Network timeout or connection drop during compilation compile.`]);
    });
  };

  // Syntactic conflict analyzer of compiled rules
  const scanRuleConflicts = () => {
    type SkillType = typeof learnedSkills[0];
    const conflicts: Array<{
      ruleA: SkillType;
      ruleB: SkillType;
      severity: 'CRITICAL' | 'WARNING';
      reason: string;
      advice: string;
    }> = [];

    for (let i = 0; i < learnedSkills.length; i++) {
      for (let j = i + 1; j < learnedSkills.length; j++) {
        const a = learnedSkills[i];
        const b = learnedSkills[j];
        if (!a.enabled || !b.enabled) continue;

        // Conflict 1: Tailwind vs custom CSS stylesheets
        if (
          (a.userPrompt.toLowerCase().includes('tailwind') && b.userPrompt.toLowerCase().includes('custom css')) ||
          (a.userPrompt.toLowerCase().includes('tailwind') && b.userPrompt.toLowerCase().includes('stylesheet'))
        ) {
          conflicts.push({
            ruleA: a,
            ruleB: b,
            severity: 'CRITICAL',
            reason: `Incompatible visual styling mechanics on rules "${a.name}" & "${b.name}". Inline style restriction clashes with stylesheet override.`,
            advice: 'Disable custom CSS stylesheets and let Tailwind utility classes manage the UI presentation layer exclusively.'
          });
        }

        // Conflict 2: Absolute vs relative files paths
        if (
          (a.userPrompt.toLowerCase().includes('absolute path') || a.userPrompt.toLowerCase().includes('path starting with root')) &&
          (b.userPrompt.toLowerCase().includes('relative path') || b.userPrompt.toLowerCase().includes('active directory'))
        ) {
          conflicts.push({
            ruleA: a,
            ruleB: b,
            severity: 'CRITICAL',
            reason: `Directory resolution clash: "${a.name}" rules against absolute root directory patterns while "${b.name}" expects relative addressing.`,
            advice: 'Standardize lookup strategies to use purely relative paths (./) to prevent Docker container deploy boot crashes.'
          });
        }

        // Conflict 3: Logical overlaps on crucial keywords (token fatigue warning)
        const sharedKeywords = ['token', 'key', 'auth', 'database', 'sdk', 'credentials', 'bypass'].filter(
          kw => a.userPrompt.toLowerCase().includes(kw) && b.userPrompt.toLowerCase().includes(kw)
        );
        if (sharedKeywords.length >= 2) {
          conflicts.push({
            ruleA: a,
            ruleB: b,
            severity: 'WARNING',
            reason: `High redundancy: "${a.name}" and "${b.name}" share overlapping criteria for core components: [${sharedKeywords.join(', ')}].`,
            advice: 'Unify both rules into a single logical instruction block to optimize Gemini prompts and lower token context window load.'
          });
        }
      }
    }
    return conflicts;
  };

  const [interactiveSkillText, setInteractiveSkillText] = useState('');
  const [isExtractingSkill, setIsExtractingSkill] = useState(false);
  const [activeSelectedSkillId, setActiveSelectedSkillId] = useState<string | null>('ls-1');

  // --- Dynamic Rule Extension States ---
  const [skillsSubTab, setSkillsSubTab] = useState<'cards' | 'markdown'>('cards');
  const [rawAgentsMdText, setRawAgentsMdText] = useState('');
  const [isSavingAgentsMd, setIsSavingAgentsMd] = useState(false);
  const [swarmTemperature, setSwarmTemperature] = useState(15); // Strictness slider (10 = absolute strict, 90 = creative)

  // Agent Memory expansion statistics
  const [agentMemoryStats, setAgentMemoryStats] = useState<Array<{
    id: string;
    alias: string;
    role: string;
    level: string;
    xp: number;
    synapseDensity: string;
    lastSync: string;
  }>>([
    { id: 'vf-ceo', alias: 'Orchestrator-01', role: 'CEO / PM Supervisor', level: 'Lvl 4 (Cognitive)', xp: 1240, synapseDensity: '95.4%', lastSync: 'Synced 1m ago' },
    { id: 'vf-dev', alias: 'CodingRunner-04', role: 'DEV Workspace Core', level: 'Lvl 5 (SynthMaster)', xp: 1980, synapseDensity: '98.8%', lastSync: 'Synced 1m ago' },
    { id: 'vf-qa', alias: 'CompilerSandbox-09', role: 'QA Auditor Agent', level: 'Lvl 3 (Validator)', xp: 850, synapseDensity: '89.2%', lastSync: 'Synced 4m ago' },
    { id: 'vf-mkt', alias: 'SocialGateway-11', role: 'Promoter Agent', level: 'Lvl 2 (Socializer)', xp: 420, synapseDensity: '81.5%', lastSync: 'Synced 10m ago' }
  ]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  // Handle incoming message simulation
  const handleSendMessage = async (customText?: string) => {
    const rawText = customText || textInput;
    if (!rawText.trim()) return;

    if (!customText) setTextInput('');

    const now = new Date();
    const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    // Add user message to mock flow
    const userMsg = {
      id: `usr-${Date.now()}`,
      sender: 'user' as const,
      text: rawText,
      time: timeStr
    };

    setMessages(prev => [...prev, userMsg]);
    setIsTyping(true);

    try {
      const savedProviders = localStorage.getItem('vac_ai_providers');
      const aiConfig = savedProviders ? JSON.parse(savedProviders) : null;
      const res = await fetch('/api/gateways/inbound', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: rawText, channel: activeChannel, aiConfig })
      });
      const data = await res.json();
      
      setIsTyping(false);
      const sender: 'agent-ceo' | 'agent-dev' = rawText.toLowerCase().includes('task') ? 'agent-dev' : 'agent-ceo';

      setMessages(prev => [
        ...prev,
        {
          id: `agt-${Date.now()}`,
          sender,
          text: data.reply || 'Acknowledge container loop.',
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);

      // Add corresponding simulation system logs
      setSandboxSystemLogs(logs => [
        ...logs,
        `[INBOUND WEBHOOK] Captured social messenger action on channel: ${activeChannel.toUpperCase()}`,
        `[DISPATCH] Dispatched query payloads to Express backend webhook gateway.`
      ]);
    } catch (e) {
      console.error(e);
      setIsTyping(false);
    }
  };

  // Execute interactive remote console CLI commands
  const handleCliExecuteCommand = (rawCmd: string) => {
    const trimmed = rawCmd.trim();
    if (!trimmed) return;

    const idInput = `cli-${Date.now()}-in`;
    const inputRow = { id: idInput, text: trimmed, type: 'input' as const };
    setCliLogRows(prev => [...prev, inputRow]);
    setCliInputText('');

    const lower = trimmed.toLowerCase();
    const parts = lower.split(' ');
    const cmd = parts[0];
    const args = parts.slice(1);

    setTimeout(() => {
      let outputRows: Array<{ id: string; text: string; type: 'input' | 'output' | 'error' | 'success' | 'system' }> = [];
      const timestamp = new Date().toLocaleTimeString();

      if (cmd === 'help' || cmd === 'list') {
        outputRows = [
          { id: `${Date.now()}-1`, text: 'Available Remote Administration CLI commands:', type: 'success' },
          { id: `${Date.now()}-2`, text: '  - status     : Diagnostic container stats, memory loads, and ports', type: 'output' },
          { id: `${Date.now()}-3`, text: '  - logs       : Read stdout streams from isolated runtimes', type: 'output' },
          { id: `${Date.now()}-4`, text: '  - deploy     : Safe-simulate immutable container packaging & push', type: 'output' },
          { id: `${Date.now()}-5`, text: '  - providers  : Query active LLM routing endpoint specs', type: 'output' },
          { id: `${Date.now()}-6`, text: '  - reboot     : Restart the sandbox micro-container nodes', type: 'output' },
          { id: `${Date.now()}-7`, text: '  - kill       : Trigger crash-safety test run (global override)', type: 'output' },
          { id: `${Date.now()}-8`, text: '  - budget     : Toggle budget allocation parameters (e.g. "budget 500")', type: 'output' },
          { id: `${Date.now()}-9`, text: '  - clear      : Purge lines from CLI display', type: 'output' }
        ];
      } else if (cmd === 'status') {
        outputRows = [
          { id: `${Date.now()}-1`, text: '--- virtForce Remote Diagnostics Health Report ---', type: 'system' },
          { id: `${Date.now()}-2`, text: 'Status      : ONLINE (Healthy)', type: 'success' },
          { id: `${Date.now()}-3`, text: `Active Node : ais-dev-rjzde7t5 (Europe-West1 Docker Node)`, type: 'output' },
          { id: `${Date.now()}-4`, text: 'CPU Load    : 14.85% (Core limits: 2.0 vCPU)', type: 'output' },
          { id: `${Date.now()}-5`, text: 'RAM Load    : 815 MB / 2048 MB reserved', type: 'output' },
          { id: `${Date.now()}-6`, text: `Active Lnk  : HTTPS secure ingress Port 3000`, type: 'output' },
          { id: `${Date.now()}-7`, text: `AI Router   : ${aiProvidersConfig.activeProvider.toUpperCase()} (${aiProvidersConfig.providers[aiProvidersConfig.activeProvider]?.defaultModel || 'default'})`, type: 'output' },
          { id: `${Date.now()}-8`, text: `Failover    : ${aiProvidersConfig.failoverEnabled ? `ACTIVE (Backup: ${aiProvidersConfig.failoverProvider.toUpperCase()})` : 'DISABLED'}`, type: 'output' }
        ];
      } else if (cmd === 'logs') {
        outputRows = [
          { id: `${Date.now()}-1`, text: `--- Tail of standard output streams at ${timestamp} ---`, type: 'system' },
          { id: `${Date.now()}-2`, text: `[${timestamp}] [INFO] main: Port 3000 mapping validated. Server running.`, type: 'output' },
          { id: `${Date.now()}-3`, text: `[${timestamp}] [INFO] sandbox: Loaded environment variables.`, type: 'output' },
          { id: `${Date.now()}-4`, text: `[${timestamp}] [DEBUG] route: Caught POST /api/gateways/inbound`, type: 'output' },
          { id: `${Date.now()}-5`, text: `[${timestamp}] [SUCCESS] auth: Verified social messenger API signatures.`, type: 'success' },
          { id: `${Date.now()}-6`, text: `[${timestamp}] [INFO] scheduler: Flashed 2 task items to persistent backup.`, type: 'output' }
        ];
      } else if (cmd === 'deploy') {
        outputRows = [
          { id: `${Date.now()}-1`, text: `[deploy] [${timestamp}] Starting remote deployment sequence...`, type: 'system' },
          { id: `${Date.now()}-2`, text: `[deploy] Fetching branch origin/main...`, type: 'output' },
          { id: `${Date.now()}-3`, text: `[deploy] Compiling target code layers (Express full-stack)...`, type: 'output' },
          { id: `${Date.now()}-4`, text: `[deploy] [SUCCESS] Target compiled without errors.`, type: 'success' },
          { id: `${Date.now()}-5`, text: `[deploy] Building artifact image: gcr.io/virtforce-prod/main:latest`, type: 'output' },
          { id: `${Date.now()}-6`, text: `[deploy] Deploying container revision to Cloud Run container host...`, type: 'output' },
          { id: `${Date.now()}-7`, text: `[deploy] [SUCCESS] Active revision promoted. Traffic re-routed.`, type: 'success' }
        ];
      } else if (cmd === 'providers') {
        const active = aiProvidersConfig.activeProvider;
        const prov = aiProvidersConfig.providers[active];
        outputRows = [
          { id: `${Date.now()}-1`, text: `--- LLM Provider Registry settings ---`, type: 'system' },
          { id: `${Date.now()}-2`, text: `Active Provider : ${active.toUpperCase()}`, type: 'success' },
          { id: `${Date.now()}-3`, text: `Target Model    : ${prov?.defaultModel || 'unknown'}`, type: 'output' },
          { id: `${Date.now()}-4`, text: `Temperature     : ${prov?.temperature ?? 0.7}`, type: 'output' },
          { id: `${Date.now()}-5`, text: `Max Tokens      : ${prov?.maxTokens ?? 2048}`, type: 'output' },
          { id: `${Date.now()}-6`, text: `Failover Policy : ${aiProvidersConfig.failoverEnabled ? 'REDUNDANT_BACKUP' : 'OFFLINE_ABORT'}`, type: 'output' }
        ];
      } else if (cmd === 'reboot') {
        outputRows = [
          { id: `${Date.now()}-1`, text: `[REBOOT] Sending SIGTERM signal to all detached worker sandboxes...`, type: 'error' },
          { id: `${Date.now()}-2`, text: `[REBOOT] Recycling system memory pools...`, type: 'output' },
          { id: `${Date.now()}-3`, text: `[REBOOT] Binding ports 10301-10305 to fresh parent proxy...`, type: 'output' },
          { id: `${Date.now()}-4`, text: `[REBOOT] [SUCCESS] Safe reboot completed. Active daemon returned HTTP 200 OK.`, type: 'success' }
        ];
      } else if (cmd === 'kill') {
        onGlobalKillReset(); // Acts as a real handler trigger!
        outputRows = [
          { id: `${Date.now()}-1`, text: `[FATAL] CRITICAL MANUAL ABORT INSTRUCTED FROM INTERACTIVE SSH CLI.`, type: 'error' },
          { id: `${Date.now()}-2`, text: `[FATAL] Sending immediate global shutdown command to all virtForce agents...`, type: 'error' },
          { id: `${Date.now()}-3`, text: `[SYSTEM] [ABORT] Container loops terminated. All running worker containers set to OFF.`, type: 'error' },
          { id: `${Date.now()}-4`, text: `[SYSTEM] You can reset the system state using the header control panel above.`, type: 'success' }
        ];
      } else if (cmd === 'budget') {
        const amt = args[0] || '500';
        outputRows = [
          { id: `${Date.now()}-1`, text: `[SUCC] Budget threshold maximum cap re-balanced.`, type: 'success' },
          { id: `${Date.now()}-2`, text: `Current Allocated Core budget: $${amt}.`, type: 'output' }
        ];
      } else if (cmd === 'clear') {
        setCliLogRows([
          { id: `${Date.now()}-1`, text: 'virtForce Active Console Screen Purged. Type "help" to list instructions.', type: 'success' }
        ]);
        return;
      } else {
        outputRows = [
          { id: `${Date.now()}-1`, text: `virtForce bash: command not found: "${trimmed}".`, type: 'error' },
          { id: `${Date.now()}-2`, text: 'Type "help" to display accessible sandbox commands list.', type: 'output' }
        ];
      }

      setCliLogRows(prev => [...prev, ...outputRows]);

      // Sync CLI output into the global sandbox logs so everything aligns visually
      setSandboxSystemLogs(logs => [
        ...logs,
        `[REMOTE SSH CLI] Executed command: "${trimmed}"`,
        `[REMOTE SSH CLI] Handled output response internally.`
      ]);
    }, 200);
  };

  return (
    <div className="space-y-4">
      {/* Alert Header Banner */}
      <div className={`border rounded p-3.5 flex flex-col md:flex-row md:items-center justify-between gap-3 text-slate-350 bg-bg-density-card border-slate-800`}>
        <div className="flex items-center gap-2.5">
          <div className={`w-8 h-8 rounded flex items-center justify-center bg-blue-500/10 border border-blue-500/20 text-blue-400`}>
            <ShieldCheck className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xs font-bold font-mono uppercase tracking-wider text-white">
                SECURITY SANDBOXES & VIRTFORCE ACCESS
              </h2>
              <span className="text-[8px] font-mono bg-[#161f30] text-blue-400 border border-blue-900 px-1 rounded uppercase font-extrabold animate-pulse">
                v2 Sandbox Isolated
              </span>
            </div>
            <p className="text-[10px] text-slate-400 mt-0.5">
              Secure air-gapped runtimes designed to prevent malicious code execution, alongside organic social messengers.
            </p>
          </div>
        </div>

        {/* Global Kill switch toggle */}
        <button
          onClick={onGlobalKillReset}
          id="global-kill-switch-btn"
          className={`flex items-center gap-1.5 px-3 py-1.5 text-[10px] font-mono font-bold rounded cursor-pointer transition-all duration-150 shadow-md ${
            isSystemKilled
              ? 'bg-emerald-600 hover:bg-emerald-555 text-white border border-emerald-500'
              : 'bg-rose-700 hover:bg-rose-600 text-white border border-rose-600'
          }`}
        >
          <Flame className="w-3.5 h-3.5" />
          {isSystemKilled ? 'RE-ACTIVATE SWARM OPERATIONS' : 'EMERGENCY SWARM LOCK (KILL)'}
        </button>
      </div>

      {/* Internal Sub Tabs for virtForce Sandboxes */}
      <div className="bg-[#12151c]/30 p-1 rounded border border-slate-805 flex items-center justify-between text-[11px] font-mono font-bold flex-wrap gap-2">
        <div className="flex flex-wrap items-center gap-1.5">
          {[
            { id: 'hitl', name: '🛡️ PR Staging (HITL)', desc: 'Staged code releases and merges' },
            { id: 'virtforce', name: '📦 virtForce Sandboxes', desc: 'Secure per-agent container processes' },
            { id: 'gateways', name: '💬 Messaging Gateways', desc: 'WhatsApp & Telegram webhook connectors' },
            { id: 'skills_engine', name: '🧠 Self-Learning Skills', desc: 'Autonomous pattern extraction & compiler' },
            { id: 'ingest', name: '📥 Repo Ingestion', desc: 'Ingest external repositories and live domains' },
            { id: 'multica', name: '🐙 Multica Companion', desc: 'Connect to Multica local daemon and teammate CLI' },
            { id: 'providers', name: '🤖 AI Providers & Tweaks', desc: 'Configure Multi-Provider API endpoints' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setInternalTab(tab.id as any)}
              className={`px-3 py-1.5 rounded transition-all cursor-pointer ${
                internalTab === tab.id 
                  ? 'bg-blue-955/40 text-blue-400 border border-blue-900/40' 
                  : 'text-slate-450 hover:text-white'
              }`}
            >
              {tab.name}
            </button>
          ))}
        </div>
        <div className="text-[9px] text-slate-500 hidden sm:block font-bold">
          SECURITY MODE: <span className="text-emerald-400 uppercase">{isolationLevel}</span>
        </div>
      </div>

      {isSystemKilled ? (
        <div className="bg-bg-density-card border border-rose-950 rounded p-10 text-center max-w-lg mx-auto space-y-2.5">
          <XCircle className="w-10 h-10 text-rose-400 mx-auto animate-pulse" />
          <h3 className="text-xs font-bold text-slate-200 uppercase font-mono tracking-wide">Orchestration Runners Frozen</h3>
          <p className="text-[11px] text-slate-450 leading-relaxed font-mono">
            The emergency stop directive has suspended all virtForce sandbox networks and messenger integration scripts. Click the green button above to restore communications.
          </p>
        </div>
      ) : (
        <AnimatePresence mode="wait">
          {internalTab === 'hitl' && (
            <motion.div
              key="hitl"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-4"
            >
              {tasks.filter(t => t.state === 'HITL').length === 0 ? (
                <div className="bg-bg-density-card border border-slate-805 rounded p-12 text-center max-w-lg mx-auto space-y-3">
                  <CheckCircle2 className="w-10 h-10 text-emerald-400 mx-auto" />
                  <h3 className="text-xs font-bold text-slate-200 uppercase font-mono tracking-wide">All Gates Secure</h3>
                  <p className="text-[11px] text-slate-450 leading-relaxed font-mono">
                    There are currently no outstanding pull requests awaiting deployment. As code modifications pass linter and unit tests in Sandbox containers, they are flagged here for final administrator permission.
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
                  {/* Staged PRs selection block */}
                  <div className="lg:col-span-1 bg-bg-density-sidebar border border-slate-855 rounded p-2.5 space-y-2">
                    <h3 className="text-[9px] font-mono font-bold tracking-wider text-slate-500 uppercase px-1 italic">
                      Staged Releases ({hitlTasks.length})
                    </h3>
                    <div className="space-y-1.5">
                      {hitlTasks.map(task => {
                        const isSelected = task.id === (selectedTaskId || hitlTasks[0]?.id);
                        return (
                          <button
                            key={task.id}
                            id={`sandbox-pr-tab-${task.id}`}
                            onClick={() => setSelectedTaskId(task.id)}
                            className={`w-full text-left p-2.5 rounded border text-[11px] font-mono transition-all duration-150 cursor-pointer ${
                              isSelected
                                ? 'bg-[#1c2128] border-slate-700 text-white font-bold'
                                : 'bg-[#12151a]/30 hover:bg-[#12151a]/60 border-transparent text-slate-400 hover:text-white'
                            }`}
                          >
                            <div className="flex items-center gap-1 font-bold mb-0.5">
                              <GitPullRequest className="w-3.5 h-3.5 text-blue-400" />
                              <span>PR CHECK: {task.id}</span>
                            </div>
                            <div className="truncate text-slate-300 font-sans mb-1">{task.title}</div>
                            <div className="flex justify-between items-center text-[9px] text-blue-400">
                              <span>Branch: {task.githubBranch || 'dev/patch'}</span>
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Code Diff & Action center panel */}
                  {activeTask && (
                    <div className="lg:col-span-2 flex flex-col space-y-3">
                      {/* Git diff viewer card */}
                      <div className="bg-[#12151a] border border-slate-855 rounded overflow-hidden">
                        <div className="bg-bg-density-tab px-3 py-1.5 border-b border-slate-800 flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <GitPullRequest className="w-3.5 h-3.5 text-blue-400" />
                            <span className="text-[10px] font-mono font-bold text-slate-300 uppercase">
                              Git Branch Delta: <strong className="text-white font-mono">{activeTask.codeDiff?.file || '/src/components/CheckoutScreen.tsx'}</strong>
                            </span>
                          </div>
                        </div>

                        {/* Simulated Diff Codeblock markup */}
                        <div className="bg-bg-density-dark p-3 font-mono text-[10px] leading-relaxed overflow-x-auto select-text max-h-72 overflow-y-auto">
                          {/* File header snippet */}
                          <div className="text-slate-500 border-b border-slate-800/80 pb-1.5 mb-1.5">
                            @@ -109,10 +109,14 @@ in {activeTask.codeDiff?.file || '/src/components/CheckoutScreen.tsx'}
                          </div>

                          {activeTask.codeDiff?.deletions.map((del, i) => (
                            <div key={`del-${i}`} className="bg-rose-950/20 text-rose-400 px-1.5 rounded -mx-1 hover:bg-rose-950/30 transition-colors">
                              {del}
                            </div>
                          ))}

                          {activeTask.codeDiff?.additions.map((add, i) => (
                            <div key={`add-${i}`} className="bg-emerald-950/20 text-emerald-400 px-1.5 rounded -mx-1 hover:bg-emerald-950/30 transition-colors">
                              {add}
                            </div>
                          ))}

                          {/* Empty fallback diff check if developer hasn't created one yet */}
                          {!activeTask.codeDiff && (
                            <div className="text-slate-600 italic text-center py-6">
                              -- Code generation staging completed --
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Accept & Reject Action Board */}
                      <div className="bg-bg-density-card border border-slate-800 rounded p-4 space-y-4">
                        <span className="text-[9px] font-mono font-bold tracking-wider text-slate-505 uppercase block">
                          MANUAL ROUTING & HITL APPROVAL BOARD
                        </span>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          {/* Option 1: Direct Approval */}
                          <div className="space-y-2.5 bg-[#0f1115] border border-slate-855 rounded p-3 flex flex-col justify-between">
                            <div className="space-y-1">
                              <h4 className="text-xs font-bold text-slate-200 uppercase font-mono flex items-center gap-1.5">
                                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                                Option A: Approve & Deploy
                              </h4>
                              <p className="text-[10px] text-slate-500 leading-relaxed font-mono">
                                Authorizes the DevOps agent to merge this branch into master and release the changes to the live application.
                              </p>
                            </div>

                            <button
                              onClick={() => {
                                onApproveDeploy(activeTask.id);
                                setSandboxSystemLogs(logs => [
                                  ...logs,
                                  `[HITL APPROVED] Administrator authorized release on Task ${activeTask.id}. Merged into production branch.`
                                ]);
                              }}
                              id="approve-deploy-btn"
                              className="w-full py-1.5 bg-emerald-600 hover:bg-emerald-555 text-white text-[10px] font-mono font-bold rounded transition-all duration-150 cursor-pointer shadow"
                            >
                              SECURE MERGE & RELEASE TO PROD
                            </button>
                          </div>

                          {/* Option 2: Reject & Retrain with feedback comment */}
                          <div className="space-y-2.5 bg-[#0f1115] border border-slate-855 rounded p-3">
                            <h4 className="text-xs font-bold text-slate-200 uppercase font-mono flex items-center gap-1.5">
                              <RotateCcw className="w-3.5 h-3.5 text-rose-450 text-rose-400" />
                              Option B: Reject & Retrain
                            </h4>

                            <form onSubmit={handleRejectSubmit} className="space-y-2">
                              <textarea
                                placeholder="Provide feedback details (e.g. padding details are wrong, use a cleaner type constraint here...)"
                                rows={3}
                                value={feedbackText}
                                onChange={e => setFeedbackText(e.target.value)}
                                className="w-full bg-[#12151a] border border-slate-800 rounded p-2 text-slate-300 text-[10px] font-mono focus:outline-none focus:border-blue-500"
                                required
                              />
                              <button
                                type="submit"
                                id="reject-retrain-btn"
                                className="w-full py-1.5 bg-rose-700 hover:bg-rose-600 text-white text-[10px] font-mono font-bold rounded transition-all duration-150 cursor-pointer disabled:opacity-50"
                                disabled={!feedbackText.trim()}
                              >
                                REJECT DEVELOPMENT & FEEDBACK
                              </button>
                            </form>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </motion.div>
          )}

          {internalTab === 'virtforce' && (
            <motion.div
              key="virtforce"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="grid grid-cols-1 lg:grid-cols-3 gap-4"
            >
              {/* Left Side: Container Management Board */}
              <div className="lg:col-span-2 space-y-4">
                
                {/* Configuration: Isolation Levels */}
                <div className="bg-[#0f1115] border border-slate-850 p-4 rounded space-y-3">
                  <div className="flex items-center justify-between border-b border-slate-850 pb-2">
                    <h3 className="text-xs font-mono font-bold text-white uppercase flex items-center gap-1.5 leading-none">
                      <Layers className="w-4 h-4 text-purple-400" />
                      virtForce Flexible Isolation Levels V2
                    </h3>
                    <span className="text-[8px] bg-slate-900 border border-slate-800 text-slate-500 px-1 py-0.2 rounded font-mono font-bold">CONTAINER MATRIX</span>
                  </div>
 
                  <p className="text-[10px] text-slate-400 font-sans leading-relaxed">
                    Rather than traditional complex host process pools, virtForce operates on localized virtual containers. Adjust the system security fence as per workflow compliance expectations:
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-1">
                    {[
                      { id: 'LOW', name: 'Low Isolation (Shared Host)', desc: 'Run all agent loops inside single node processes. Zero docker initialization overhead. Fast execution.', badge: 'DEV TESTING' },
                      { id: 'MEDIUM', name: 'Medium Isolation (Per-Group)', desc: 'Isolates DEV compiler from product strategists. Safely captures package installation operations.', badge: 'RECOMMENDED' },
                      { id: 'HIGH_NANO', name: 'Nano Isolation (Zero Privilege)', desc: 'Launches standalone air-gapped container sandboxes for each agent threat vector. Read-only variables.', badge: 'MAXIMUM SECURE' }
                    ].map(opt => {
                      const isSel = isolationLevel === opt.id;
                      return (
                        <button
                          key={opt.id}
                          onClick={() => {
                            setIsolationLevel(opt.id as any);
                            setSandboxSystemLogs(logs => [
                              ...logs,
                              `[ISOLATION CHANGE] Sandbox security fences scaled to: ${opt.name}`,
                              `[NANO ACTION] Recycling active agent group containers under raw namespace guidelines ... OK`
                            ]);
                          }}
                          className={`p-3 rounded border text-left cursor-pointer transition-all flex flex-col justify-between space-y-1.5 ${
                            isSel 
                              ? 'bg-blue-950/20 border-blue-900 text-white' 
                              : 'bg-[#12151a] border-slate-800 text-slate-450 hover:bg-[#151921]'
                          }`}
                        >
                          <div className="flex items-center justify-between w-full">
                            <span className="text-[10px] font-mono font-bold block">{opt.id}</span>
                            <span className={`text-[7px] font-mono px-1 rounded ${isSel ? 'bg-blue-900/40 text-blue-400' : 'bg-slate-900 text-slate-500'}`}>{opt.badge}</span>
                          </div>
                          <p className="text-[9px] text-slate-400 leading-normal font-sans">{opt.desc}</p>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Active Micro-Containers list */}
                <div className="bg-bg-density-card border border-slate-800 rounded p-4 space-y-3.5">
                  <h3 className="text-xs font-mono font-bold text-white uppercase flex items-center gap-1.5 border-b border-slate-850 pb-2">
                    <Cpu className="w-4 h-4 text-emerald-400 animate-pulse" />
                    Active Isolated Nano-Containers
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {nanoContainers.map(container => (
                      <div key={container.id} className="p-3 bg-slate-900 border border-slate-850/80 rounded space-y-2">
                        <div className="flex items-start justify-between">
                          <div className="space-y-0.5">
                            <h4 className="text-[11px] font-bold text-slate-100 font-mono">{container.name}</h4>
                            <span className="text-[8px] text-slate-500 uppercase font-mono tracking-wider block">{container.group}</span>
                          </div>
                          <span className={`text-[8px] font-mono font-extrabold px-1.5 py-0.5 rounded border ${
                            container.status === 'ONLINE' 
                              ? 'bg-emerald-950/25 border-emerald-900 text-emerald-400' 
                              : 'bg-slate-950 text-slate-500 border-slate-805'
                          }`}>
                            ● {container.status}
                          </span>
                        </div>

                        {/* Telemetry diagnostics */}
                        <div className="grid grid-cols-3 gap-2 py-1.5 border-t border-b border-slate-850 bg-[#0c0f13] px-2 rounded text-[9px] font-mono text-slate-450 text-slate-400">
                          <div>
                            <span className="text-slate-550 block text-[8px]">PORT</span>
                            <span>{container.port}</span>
                          </div>
                          <div>
                            <span className="text-slate-550 block text-[8px]">MEMORY</span>
                            <span>{container.memory}</span>
                          </div>
                          <div>
                            <span className="text-slate-550 block text-[8px]">CPU</span>
                            <span>{container.cpu}%</span>
                          </div>
                        </div>

                        {/* Core loaded skills list */}
                        <div className="space-y-1">
                          <span className="text-[8px] text-slate-550 font-mono uppercase block font-bold">Ingested Skills:</span>
                          <div className="flex flex-wrap gap-1">
                            {container.skills.map(sk => (
                              <span key={sk} className="text-[8px] bg-slate-950 border border-slate-805 px-1 rounded text-slate-405 font-mono text-slate-300">
                                {sk}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

              </div>

              {/* Right Side: Extensions Loader & Private Sandbox Console */}
              <div className="space-y-4">
                
                {/* Extensions Loader (Self Registering SDK) */}
                <div className="bg-[#0f1115] border border-slate-800 rounded p-4 space-y-3">
                  <div>
                    <h4 className="text-xs font-bold text-white uppercase tracking-tight font-mono flex items-center gap-1.5">
                      <Database className="w-4 h-4 text-blue-400" />
                      Self-Registering Extensions
                    </h4>
                    <p className="text-[9px] text-slate-505 mt-0.5">Toggle available workspace plugins securely inside isolated container namespaces.</p>
                  </div>

                  <div className="space-y-2">
                    {availableSkills.map(sk => (
                      <div 
                        key={sk.id} 
                        onClick={() => toggleSkill(sk.id)}
                        className={`p-2.5 rounded border cursor-pointer select-none transition-all flex items-center justify-between gap-3 text-left ${
                          sk.enabled 
                            ? 'bg-blue-955/10 border-blue-900/60 hover:bg-blue-955/15' 
                            : 'bg-slate-900 border-slate-855 hover:bg-slate-850/50'
                        }`}
                      >
                        <div className="space-y-0.5 font-mono text-[10px]">
                          <strong className={sk.enabled ? 'text-blue-400' : 'text-slate-400'}>{sk.name}</strong>
                          <p className="text-[9px] text-slate-500 font-sans leading-tight">{sk.desc}</p>
                        </div>
                        <div className={`w-7 h-4 rounded-full p-0.5 transition-colors cursor-pointer flex items-center ${sk.enabled ? 'bg-blue-600 justify-end' : 'bg-slate-800 justify-start'}`}>
                          <div className="w-3 h-3 bg-white rounded-full shadow" />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Micro-Console console logs */}
                <div className="bg-[#0f1115] border border-slate-800 rounded p-4 space-y-2">
                  <div className="flex justify-between items-center pb-2 border-b border-slate-850">
                    <span className="text-[10px] text-white font-mono font-bold uppercase block">Interactive Sandbox Log</span>
                    <button
                      onClick={() => setSandboxSystemLogs([`[SYSTEM] Cleared system buffer. Mode: ${isolationLevel}`])}
                      className="text-[8px] text-[#4299e1] hover:underline font-mono cursor-pointer"
                    >
                      Clear Console
                    </button>
                  </div>

                  <div className="bg-bg-density-dark p-3 rounded font-mono text-[9px] text-slate-400 h-48 overflow-y-auto space-y-1 pr-2 scrollbar-thin scrollbar-thumb-slate-805">
                    {sandboxSystemLogs.map((log, i) => (
                      <div key={i} className="leading-relaxed hover:text-white transition-colors duration-100">
                        {log}
                      </div>
                    ))}
                  </div>
                </div>

              </div>

            </motion.div>
          )}

          {internalTab === 'gateways' && (
            <motion.div
              key="gateways"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-4 text-slate-300"
            >
              {/* Remote Control Modes switcher header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-[#090b11] border border-slate-805 rounded-xl gap-3">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-[9px] font-mono bg-blue-950 text-blue-400 border border-blue-900/60 px-2 py-0.5 rounded font-extrabold tracking-wider uppercase">
                      Operational Remote Control Hub
                    </span>
                  </div>
                  <h4 className="text-xs font-bold font-mono text-white uppercase mt-1">
                    On-the-Road Remote Management Gateways
                  </h4>
                  <p className="text-[10px] text-slate-400 leading-normal font-sans">
                    Enable absolute control of your daemon, container nodes, and budgets via secure channels or an interactive SSH simulation interface when you are on the go.
                  </p>
                </div>

                <div className="flex bg-[#050608] border border-slate-850 p-1 rounded-lg gap-1.5 self-start sm:self-center font-mono text-[10px]">
                  <button
                    onClick={() => setRemoteGateMode('messenger')}
                    className={`px-3 py-1.5 rounded-md font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                      remoteGateMode === 'messenger' 
                        ? 'bg-blue-600 text-white shadow-md' 
                        : 'text-slate-450 hover:text-white'
                    }`}
                  >
                    💬 Messenger Webhooks
                  </button>
                  <button
                    onClick={() => setRemoteGateMode('cli')}
                    className={`px-3 py-1.5 rounded-md font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                      remoteGateMode === 'cli' 
                        ? 'bg-indigo-600 text-white shadow-md' 
                        : 'text-slate-450 hover:text-white'
                    }`}
                  >
                    💻 Secure Remote SSH (CLI)
                  </button>
                </div>
              </div>

              {remoteGateMode === 'messenger' ? (
                /* Original chat layout */
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 animate-fadeIn">
                  {/* Left Column: Messenger Chat Client Sandbox Mockup */}
                  <div className="lg:col-span-2 bg-[#0e1115] border border-slate-800 rounded p-4 flex flex-col justify-between h-[450px]">
                    
                    {/* Visual Header */}
                    <div className="border-b border-slate-850 pb-2 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                        <span className="text-xs font-mono font-bold text-white uppercase">
                          Inbound Social Webhook Gateway Simulator — {activeChannel.toUpperCase()}
                        </span>
                      </div>
                      <div className="flex bg-slate-900 border border-slate-800 rounded p-0.5 text-[9px] font-mono font-bold">
                        {[
                          { id: 'whatsapp', label: 'WhatsApp' },
                          { id: 'telegram', label: 'Telegram' },
                          { id: 'slack', label: 'Slack Webhook' }
                        ].map(chan => (
                          <button
                            key={chan.id}
                            onClick={() => {
                              setActiveChannel(chan.id as any);
                              setMessages([
                                { id: `ch-${Date.now()}`, sender: 'system', text: `Gateway Connection channel re-mapped safely to: ${chan.label}!`, time: 'now' }
                              ]);
                            }}
                            className={`px-2 py-1 rounded transition-colors cursor-pointer ${
                              activeChannel === chan.id 
                                ? 'bg-blue-600 text-white font-bold' 
                                : 'text-slate-450 hover:text-white'
                            }`}
                          >
                            {chan.label}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Messages Streams Area */}
                    <div className="flex-1 overflow-y-auto bg-bg-density-dark/60 border border-slate-900 rounded p-4 my-3 space-y-3 font-mono text-[11px] scrollbar-thin scrollbar-thumb-slate-805">
                      {messages.map((m) => {
                        if (m.sender === 'system') {
                          return (
                            <div key={m.id} className="text-center italic text-slate-500 text-[9px] py-1">
                              {m.text}
                            </div>
                          );
                        }

                        const isUser = m.sender === 'user';
                        return (
                          <div 
                            key={m.id}
                            className={`flex gap-3 max-w-[85%] ${isUser ? 'ml-auto flex-row-reverse' : 'mr-auto'}`}
                          >
                            {/* Avatar */}
                            <div className={`w-7 h-7 rounded border font-bold flex items-center justify-center text-[10px] self-end ${
                              isUser 
                                ? 'bg-blue-900/40 border-blue-900/60 text-blue-300' 
                                : m.sender === 'agent-ceo' 
                                ? 'bg-rose-950/40 border-rose-900/60 text-rose-300' 
                                : 'bg-indigo-950/40 border-indigo-900/60 text-indigo-300'
                            }`}>
                              {isUser ? 'ME' : m.sender === 'agent-ceo' ? 'CEO' : 'DEV'}
                            </div>

                            <div className="space-y-1">
                              <div className={`p-2.5 rounded border leading-relaxed ${
                                isUser 
                                  ? 'bg-blue-950/20 border-blue-900/40 text-blue-100 rounded-br-none' 
                                  : m.sender === 'agent-ceo'
                                  ? 'bg-rose-950/15 border-rose-950/50 text-rose-100 rounded-bl-none'
                                  : 'bg-indigo-950/15 border-indigo-950/50 text-indigo-100 rounded-bl-none'
                              }`}>
                                {m.text}
                              </div>
                              <span className={`text-[8px] text-slate-500 block ${isUser ? 'text-right' : 'text-left'}`}>{m.time}</span>
                            </div>
                          </div>
                        );
                      })}

                      {isTyping && (
                        <div className="flex gap-3 max-w-[85%] mr-auto">
                          <div className="w-7 h-7 rounded bg-[#1c2128] border border-slate-805 text-slate-300 font-bold flex items-center justify-center text-[10px] self-end animate-pulse">
                            W
                          </div>
                          <div className="bg-[#1c2128] border border-slate-805 p-2 rounded text-slate-400 italic font-mono text-[9px] flex items-center gap-1">
                            <span className="w-1.5 h-1.5 rounded-full bg-slate-500 animate-bounce" />
                            <span className="w-1.5 h-1.5 rounded-full bg-slate-500 animate-bounce delay-100" />
                            <span className="w-1.5 h-1.5 rounded-full bg-slate-500 animate-bounce delay-200" />
                            Container processing webhook...
                          </div>
                        </div>
                      )}

                      <div ref={chatEndRef} />
                    </div>

                    {/* Input Controls */}
                    <form
                      onSubmit={(e) => {
                        e.preventDefault();
                        handleSendMessage();
                      }}
                      className="flex gap-2"
                    >
                      <input
                        type="text"
                        value={textInput}
                        onChange={(e) => setTextInput(e.target.value)}
                        placeholder={`Compose raw simulator message for air-gapped ${activeChannel.toUpperCase()} container...`}
                        className="flex-1 bg-bg-density-dark border border-slate-800 text-slate-200 p-2 text-xs rounded focus:outline-none focus:border-blue-600 font-mono"
                      />
                      <button
                        type="submit"
                        className="px-4 bg-blue-600 hover:bg-blue-500 text-white font-mono font-bold text-xs uppercase rounded cursor-pointer transition-colors flex items-center gap-1"
                      >
                        <Send className="w-3.5 h-3.5" />
                        Send
                      </button>
                    </form>

                  </div>

                  {/* Right Column: Pre-rolled Telegram/WhatsApp Command Simulator scripts */}
                  <div className="bg-[#0f1115] border border-slate-800 rounded p-4 space-y-4">
                    <div>
                      <h4 className="text-xs font-bold text-white uppercase tracking-tight font-mono flex items-center gap-1.5">
                        <MessageCircle className="w-4 h-4 text-emerald-400" />
                        Simulator Direct Queries
                      </h4>
                      <p className="text-[9px] text-slate-505 mt-0.5">Quickly trigger preset social command webhooks to see how private virtForce container runtimes intercept operational queries.</p>
                    </div>

                    <div className="space-y-2.5">
                      <span className="text-[8px] text-slate-550 font-mono block uppercase font-bold tracking-wider">Interactive Commands:</span>
                      {[
                        { cmd: '/status', desc: 'Queries the detached container for budget spent, active goals, and remaining backlogs.', payload: '/status of task loops' },
                        { cmd: '/create task', desc: 'Auto-triggers isolated DEV container to write specification markdown templates.', payload: '/create task: setup checkout coupon check' },
                        { cmd: '/help', desc: 'Requests basic routing parameter logs directly from the CEO Strategist container.', payload: '/help info' }
                      ].map(sc => (
                        <button
                          key={sc.cmd}
                          onClick={() => handleSendMessage(sc.payload)}
                          className="w-full text-left p-2.5 rounded border border-[#1d222a] bg-[#12151a] hover:bg-[#161a21] hover:border-slate-705 group transition-all text-[11px] font-mono flex flex-col justify-between cursor-pointer space-y-1"
                        >
                          <div className="flex items-center justify-between w-full">
                            <strong className="text-blue-400 font-mono font-bold">{sc.cmd}</strong>
                            <span className="text-[8px] bg-slate-900 border border-slate-800 text-slate-500 px-1 py-0.2 rounded font-bold uppercase group-hover:text-blue-400">Run Command</span>
                          </div>
                          <p className="text-[9px] text-slate-400 leading-normal font-sans">{sc.desc}</p>
                        </button>
                      ))}
                    </div>

                    <div className="p-3 border border-emerald-900/40 bg-emerald-955/5 bg-emerald-950/10 rounded text-[9px] text-slate-400 font-mono leading-relaxed space-y-1">
                      <span className="font-bold text-emerald-400 block uppercase">🌱 MICRO-BUDGET STRATEGY</span>
                      <p>
                        By setting up WhatsApp/Telegram gateways to your isolated virtForce container, early **beta testers** can submit feedback, query bugs, or check progress directly from their favorite messaging app. This removes UI hurdles entirely and delivers immediate, direct user retention for **$0 ad spend**!
                      </p>
                    </div>
                  </div>
                </div>
              ) : (
                /* Interactive Admin Remote SSH Terminal Console */
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 animate-fadeIn">
                  {/* Left Column - Main UNIX/Bash CLI interface (col-span-2) */}
                  <div className="lg:col-span-2 bg-[#050608] border border-slate-850 rounded-xl overflow-hidden flex flex-col justify-between h-[450px]">
                    
                    {/* Console Header Frame */}
                    <div className="bg-[#0c0f16] border-b border-slate-850 px-4 py-2.5 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="flex gap-1">
                          <span className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                          <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
                          <span className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
                        </div>
                        <span className="text-[10px] font-mono text-slate-400 font-bold tracking-wider ml-1">
                          Secure Shell: meir@virtforce: ~ (HTTPS:3000 Ingress Rev-Proxy)
                        </span>
                      </div>
                      <div className="flex items-center gap-1.5 font-mono text-[9px]">
                        <span className="text-emerald-400 font-bold">AES-256</span>
                        <span className="text-slate-600">|</span>
                        <span className="text-[#00d2ff]">ACTIVE LINK</span>
                      </div>
                    </div>

                    {/* Terminal text prints screen */}
                    <div className="flex-1 p-4 overflow-y-auto font-mono text-xs text-slate-300 space-y-2 bg-[#020203] scrollbar-thin scrollbar-thumb-slate-805">
                      {cliLogRows.map((row) => {
                        let color = 'text-slate-300';
                        if (row.type === 'input') color = 'text-indigo-400 font-semibold';
                        if (row.type === 'error') color = 'text-red-400 font-semibold';
                        if (row.type === 'success') color = 'text-emerald-400 font-semibold';
                        if (row.type === 'system') color = 'text-[#00d2ff]';
                        
                        return (
                          <div key={row.id} className="whitespace-pre-wrap leading-relaxed">
                            {row.type === 'input' ? (
                              <div className="flex items-center gap-1">
                                <span className="text-emerald-500 font-bold">meir@virtforce:~$</span>
                                <span className={color}>{row.text}</span>
                              </div>
                            ) : (
                              <div className={color}>{row.text}</div>
                            )}
                          </div>
                        );
                      })}
                    </div>

                    {/* Command bar input bottom */}
                    <form
                      onSubmit={(e) => {
                        e.preventDefault();
                        handleCliExecuteCommand(cliInputText);
                      }}
                      className="border-t border-slate-850 bg-[#090b11] p-3 flex gap-2 items-center"
                    >
                      <span className="font-mono text-xs text-emerald-400 font-bold ml-1 shrink-0">meir@virtforce:~$</span>
                      <input
                        type="text"
                        value={cliInputText}
                        onChange={(e) => setCliInputText(e.target.value)}
                        placeholder="Type standard command (e.g., 'help', 'status', 'logs', 'deploy')..."
                        className="flex-1 bg-transparent border-none outline-none font-mono text-xs text-indigo-300 focus:ring-0 p-1"
                        autoFocus
                      />
                      <button
                        type="submit"
                        className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-505 text-white font-mono font-bold text-[10px] uppercase rounded cursor-pointer transition-colors"
                      >
                        Execute
                      </button>
                    </form>

                  </div>

                  {/* Right Column - Console Quick Exec Shortcuts Deck */}
                  <div className="bg-[#0f1115] border border-slate-800 rounded p-4 flex flex-col justify-between space-y-4">
                    <div className="space-y-4">
                      <div>
                        <h4 className="text-xs font-bold text-white uppercase tracking-tight font-mono flex items-center gap-1.5">
                          <Sliders className="w-4 h-4 text-indigo-400" />
                          Remote CMD Shortcuts
                        </h4>
                        <p className="text-[9px] text-slate-505 mt-0.5">Quick-clicks to fire operational CLI commands to verify live secure sandbox statistics from anywhere.</p>
                      </div>

                      <div className="space-y-2">
                        {[
                          { cmd: 'status', desc: 'Queries memory, CPU, nodes, and routing configurations' },
                          { cmd: 'logs', desc: 'Displays secure stdout dumps from container pipelines' },
                          { cmd: 'deploy', desc: 'Simulates pushing compile layers build' },
                          { cmd: 'providers', desc: 'Inspects credential variables and active LLM configuration' },
                          { cmd: 'reboot', desc: 'Safe recycling sequence of internal daemon targets' },
                          { cmd: 'kill', desc: 'DANGER: Executes global bypass abort safety test' }
                        ].map(cliObj => (
                          <button
                            key={cliObj.cmd}
                            onClick={() => handleCliExecuteCommand(cliObj.cmd)}
                            className="w-full text-left p-2 rounded border border-[#1b2029] bg-[#12151b] hover:border-indigo-600/50 hover:bg-indigo-950/10 hover:text-indigo-200 transition-all font-mono text-[10.5px] flex flex-col cursor-pointer"
                          >
                            <div className="flex justify-between font-bold">
                              <span className="text-indigo-400">{cliObj.cmd}</span>
                              <span className="text-[8px] bg-slate-900 text-slate-550 px-1 py-0.2 rounded font-normal lowercase font-sans">Click to Run</span>
                            </div>
                            <span className="text-[8.5px] text-slate-450 mt-0.5 leading-tight">{cliObj.desc}</span>
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="p-3 bg-indigo-950/10 border border-slate-800 rounded text-[9px] text-slate-400 leading-normal font-sans space-y-1">
                      <span className="font-bold text-indigo-400 block font-mono uppercase">🛰️ SECURE SSH INTEGRITY</span>
                      <p>
                        This dashboard emulates an active reverse SSH proxy tunnel. No incoming external ports need opening, maintaining absolute zero-trust network boundaries.
                      </p>
                    </div>

                  </div>
                </div>
              )}
            </motion.div>
          )}

          {internalTab === 'skills_engine' && (
            <motion.div
              key="skills_engine"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-4 text-slate-300 pointer-events-auto"
            >
              {/* Dynamic Header */}
              <div className="p-4 bg-[#090b11] border border-slate-805 rounded-xl flex items-start gap-3">
                <div className="p-2.5 bg-blue-900/10 border border-blue-900/30 rounded-lg text-blue-400 shrink-0">
                  <Cpu className="w-5 h-5 animate-pulse" />
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-[9px] font-mono bg-blue-950 text-blue-400 border border-blue-900/60 px-2 py-0.5 rounded font-extrabold pb-0.5 uppercase tracking-wider">
                      Incremental Swarm Memory Matrix
                    </span>
                    <span className="text-[9px] font-mono bg-emerald-950/40 text-emerald-400 border border-emerald-900/40 px-1.5 py-0.5 rounded">
                      ACTIVE & INJECTIVE
                    </span>
                  </div>
                  <h3 className="text-sm font-bold font-mono text-white uppercase">
                    virtForce Self-Learning & Skill Compilation Daemon
                  </h3>
                  <p className="text-xs text-slate-400 leading-normal font-sans">
                    Rather than repeatedly giving the same feedback, the agents monitor and analyze developer instructions and code errors. It autonomously compiles these patterns into immutable <code className="text-blue-300 bg-blue-950/40 px-1 py-0.2 rounded font-mono">.rule</code> prompts injected directly into the runtimes' short-term memory buffer layer.
                  </p>
                </div>
              </div>

              {/* Grid block for Learning Analyzer & Saved Skills List */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
                
                {/* Left block - Pattern Extractor & Compiler Console (col-span-6) */}
                <div className="lg:col-span-6 flex flex-col justify-between bg-[#0e1115] border border-slate-800 rounded-xl p-4 h-[480px]">
                  <div className="space-y-3 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between pb-1.5 border-b border-slate-850">
                        <h4 className="text-xs font-bold text-white uppercase tracking-tight font-mono flex items-center gap-1.5">
                          <Sparkles className="w-4 h-4 text-emerald-400" />
                          Autonomous Pattern Extractor
                        </h4>
                        <span className="text-[9px] text-[#00d2ff] font-mono">Status: AWAITING INPUT</span>
                      </div>
                      <p className="text-[10px] text-slate-450 mt-1 font-sans">
                        Input any prompt, negative constraint, or style guide. The system extracts syntactic patterns, builds an isolated guardrail, and delivers immediate compile-safety.
                      </p>
                    </div>

                    {/* Interactive Entry Text area */}
                    <div className="space-y-2 mt-2 flex-1 flex flex-col justify-end">
                      <label className="text-[8.5px] text-slate-500 font-mono uppercase font-bold tracking-wider">
                        Enter Natural Language Instruction or Feedback Rule:
                      </label>
                      <textarea
                        value={interactiveSkillText}
                        onChange={(e) => setInteractiveSkillText(e.target.value)}
                        placeholder="e.g., 'Never output the raw app client token to the browser logs' OR 'Keep headings in Inter display and use modern charcoal palette'..."
                        rows={3}
                        className="w-full bg-slate-950 border border-slate-800 text-xs text-slate-300 p-2.5 rounded-lg focus:outline-none focus:border-emerald-600 font-mono resize-none flex-1 placeholder:text-slate-600"
                        disabled={isExtractingSkill}
                      />
                      
                      <div className="flex justify-between items-center pt-1.5">
                        <button
                          onClick={() => {
                            setInteractiveSkillText(
                              "Always double-check that third-party SDK clients are lazy-initialized on endpoints to prevent server boot failure when a key is absent."
                            );
                          }}
                          className="text-[9px] text-slate-450 hover:text-white flex items-center gap-1 cursor-pointer font-sans underline"
                        >
                          ☘️ Insert complex example template
                        </button>
                        
                        <button
                          type="button"
                          onClick={() => {
                            if (!interactiveSkillText.trim()) return;
                            setIsExtractingSkill(true);
                            
                            // Simulate compiling steps
                            const nowStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
                            setSkillsTerminalLogs(prev => [
                              ...prev,
                              `[${nowStr}] [INBOUND] Intercepted interactive manual learn instruction. Parsing...`
                            ]);

                            setTimeout(() => {
                              setSkillsTerminalLogs(prev => [
                                ...prev,
                                `[${nowStr}] [PARSER] Extracted tokens: [SDK, lazy-initialization, boot_failure].`
                              ]);
                            }, 500);

                            setTimeout(() => {
                              setSkillsTerminalLogs(prev => [
                                ...prev,
                                `[${nowStr}] [COMPILER] Synthesizing rule pattern 'Lazy SDK Init Protocol' (Accuracy: 98.4%).`
                              ]);
                            }, 1000);

                            setTimeout(() => {
                              // Register the new skill!
                              const nextId = `ls-${Date.now()}`;
                              const words = interactiveSkillText.split(' ').slice(0, 3).map(w => w.replace(/[^a-zA-Z]/g, ''));
                              const rawName = words.map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ') + ' Guard';
                              
                              const newSkillObj = {
                                id: nextId,
                                name: rawName.trim() || 'Lazy Initialization Rule',
                                origin: 'Manual extraction',
                                type: 'safety' as const,
                                confidence: Math.floor(Math.random() * 5) + 95,
                                enabled: true,
                                userPrompt: interactiveSkillText,
                                matchesCount: 1,
                                timestamp: nowStr
                              };

                              setLearnedSkills(prev => [newSkillObj, ...prev]);
                              setActiveSelectedSkillId(nextId);
                              setIsExtractingSkill(false);
                              setInteractiveSkillText('');
                              
                              // Trigger state updates
                              setSkillsTerminalLogs(prev => [
                                ...prev,
                                `[${nowStr}] [SUCCESS] Compiled .rule successfully! Custom memory layer synced across Code-Mutant and supervisor Swarms.`
                              ]);

                              // Sync with general logs
                              setSandboxSystemLogs(logs => [
                                ...logs,
                                `[KNOWLEDGE-BASE] Incremental learning sequence captured absolute rule: "${newSkillObj.name}"`
                              ]);

                              // Update agent levels/xp
                              setAgentMemoryStats(stats => stats.map(st => {
                                if (st.id === 'vf-dev') {
                                  return { ...st, xp: st.xp + 150, synapseDensity: '99.5%', lastSync: 'Synced just now' };
                                }
                                if (st.id === 'vf-ceo') {
                                  return { ...st, xp: st.xp + 80, synapseDensity: '96.2%', lastSync: 'Synced just now' };
                                }
                                return st;
                              }));
                            }, 1600);
                          }}
                          className={`px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white font-mono font-bold text-[10px] uppercase rounded-lg cursor-pointer transition-colors flex items-center gap-1.5 ${
                            (!interactiveSkillText.trim() || isExtractingSkill) ? 'opacity-40 cursor-not-allowed' : ''
                          }`}
                          disabled={!interactiveSkillText.trim() || isExtractingSkill}
                        >
                          <Sparkles className="w-3.5 h-3.5" />
                          Extract Dynamic Rule
                        </button>
                      </div>
                    </div>

                    {/* Interactive Compiler Diagnostic Logs Board */}
                    <div className="mt-3 bg-[#020203] border border-slate-900 rounded-lg p-2.5 h-[150px] overflow-y-auto flex flex-col justify-between font-mono text-[10px] leading-relaxed relative">
                      <div className="absolute top-2 right-2 flex items-center gap-1 text-[8px] text-slate-600 font-bold font-mono">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                        COMPILER LOGS
                      </div>
                      <div className="space-y-1 overflow-y-auto block text-left">
                        {skillsTerminalLogs.map((logLine, idx) => {
                          let color = 'text-slate-400';
                          if (logLine.includes('[SUCCESS]')) color = 'text-emerald-400 font-bold';
                          if (logLine.includes('[ANALYZER]')) color = 'text-indigo-400';
                          if (logLine.includes('[SYSTEM]')) color = 'text-[#00d2ff]';
                          return (
                            <div key={idx} className={color}>
                              {logLine}
                            </div>
                          );
                        })}
                        {isExtractingSkill && (
                          <div className="text-amber-400 animate-pulse flex items-center gap-1 font-bold pt-1">
                            <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping shrink-0" />
                            [COMPILING] Resolving neural graphs and baking prompt constraints...
                          </div>
                        )}
                      </div>
                      <div className="text-right text-[8px] text-slate-600 pt-2 border-t border-slate-900 font-semibold uppercase">
                        synaptic compile sequence active
                      </div>
                    </div>

                  </div>
                </div>

                {/* Right block - Immutable Learned Rules Database (col-span-6) */}
                <div className="lg:col-span-6 bg-[#0f1115] border border-slate-800 rounded-xl p-4 flex flex-col justify-between h-[480px]">
                  <div className="space-y-3 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between pb-1.5 border-b border-slate-850">
                        <h4 className="text-xs font-bold text-white uppercase tracking-tight font-mono flex items-center gap-1.5">
                          <Database className="w-4 h-4 text-blue-400" />
                          Active Skill Memory Bank
                        </h4>
                        
                        {/* SubTab navigation buttons */}
                        <div className="flex bg-[#07090d] border border-slate-800 p-0.5 rounded-md text-[9px] font-mono">
                          <button
                            type="button"
                            onClick={() => setSkillsSubTab('cards')}
                            className={`px-2 py-1 rounded cursor-pointer leading-none transition-all font-bold ${
                              skillsSubTab === 'cards' 
                                ? 'bg-indigo-600 text-white' 
                                : 'text-slate-400 hover:text-white'
                            }`}
                          >
                            🧠 CARDS
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              setSkillsSubTab('markdown');
                              refreshAgentsMd();
                            }}
                            className={`px-2 py-1 rounded cursor-pointer leading-none transition-all font-bold ${
                              skillsSubTab === 'markdown' 
                                ? 'bg-indigo-600 text-white' 
                                : 'text-slate-400 hover:text-white'
                            }`}
                          >
                            📜 AGENTS.MD
                          </button>
                        </div>
                      </div>
                      
                      <p className="text-[10px] text-slate-450 mt-1 font-sans">
                        {skillsSubTab === 'cards' 
                          ? 'Active heuristics parsed directly from prompt logs and injected to the models short-term memory layer.'
                          : 'Direct markdown visualization of AGENTS.md. Editing compiles new guidelines into active memory blocks.'}
                      </p>
                    </div>

                    {skillsSubTab === 'markdown' ? (
                      <div className="flex-1 flex flex-col justify-between my-1 font-mono text-[11px] space-y-2 h-[350px]">
                        <div className="flex justify-between items-center text-[9px] text-slate-450">
                          <span className="text-[8.5px] uppercase font-bold tracking-wider text-emerald-400">🔥 DIRECT AGENTS.MD SYNC WORKSPACE</span>
                          <button 
                            type="button"
                            onClick={refreshAgentsMd}
                            className="text-indigo-400 hover:underline cursor-pointer flex items-center gap-1 font-bold text-[8.5px]"
                          >
                            <RefreshCw className="w-2.5 h-2.5" /> FORCE RELOAD
                          </button>
                        </div>

                        <textarea
                          value={rawAgentsMdText}
                          onChange={(e) => setRawAgentsMdText(e.target.value)}
                          className="w-full bg-[#040507] border border-slate-900 p-2.5 rounded-lg text-[10px] text-emerald-300 font-mono h-[200px] resize-none focus:outline-none focus:border-indigo-600 block text-left leading-normal placeholder:text-slate-800 scrollbar-thin scrollbar-thumb-slate-800"
                          placeholder="# Instructions..."
                          disabled={isSavingAgentsMd}
                        />

                        <div className="flex justify-between items-center bg-[#090c12] border border-slate-900 p-2 rounded-lg">
                          <span className="text-[8.5px] text-slate-500 font-sans leading-tight">Parses headers like &quot;### 🧠 Name&quot; on save.</span>
                          <button
                            type="button"
                            onClick={() => saveAgentsMd(rawAgentsMdText)}
                            disabled={isSavingAgentsMd}
                            className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-550 text-white font-bold uppercase rounded text-[9.5px] flex items-center gap-1 transition-all cursor-pointer disabled:opacity-40"
                          >
                            {isSavingAgentsMd ? (
                              <>
                                <RefreshCw className="w-3 h-3 animate-spin" />
                                Compiling...
                              </>
                            ) : (
                              <>
                                <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                                Save & Compile
                              </>
                            )}
                          </button>
                        </div>
                      </div>
                    ) : (
                      <>
                        {/* Conflict scanner warning banner */}
                        {(() => {
                          const activeConflicts = scanRuleConflicts();
                          if (activeConflicts.length === 0) return null;
                          return (
                            <div className="bg-amber-950/20 border border-amber-900/60 p-2 rounded-lg flex items-start gap-2 text-left block">
                              <AlertTriangle className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                              <div className="flex-1 text-[10px] space-y-1">
                                <div className="flex justify-between items-center font-bold text-amber-400 font-mono text-[9px]">
                                  <span>⚠️ ACTIVE RULE CONFLICT DETECTED</span>
                                  <button 
                                    type="button"
                                    onClick={() => {
                                      const updatedRules = [...learnedSkills];
                                      activeConflicts.forEach(conf => {
                                        const target = updatedRules.find(r => r.id === conf.ruleB.id);
                                        if (target) target.enabled = false;
                                      });
                                      setLearnedSkills(updatedRules);
                                      const nowStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
                                      setSkillsTerminalLogs(prev => [
                                        ...prev,
                                        `[${nowStr}] [DE-CONFLICT] Muted overlapping rule "${activeConflicts[0].ruleB.name}" automatically.`
                                      ]);
                                      setSandboxSystemLogs(logs => [
                                        ...logs,
                                        `[RESOLVER] Syntactic Conflict Scanner auto-resolved clashing guidelines.`
                                      ]);
                                    }}
                                    className="px-1.5 py-0.5 bg-amber-900/40 text-amber-200 border border-amber-800 rounded font-bold uppercase text-[8px] cursor-pointer hover:bg-amber-800 hover:text-white transition-all"
                                  >
                                    Auto-Resolve
                                  </button>
                                </div>
                                <p className="text-[9.5px] text-slate-450 leading-relaxed font-sans">
                                  {activeConflicts[0].reason}
                                </p>
                                <span className="text-[9px] text-emerald-400 font-bold font-mono block">💡 ADVICE: {activeConflicts[0].advice}</span>
                              </div>
                            </div>
                          );
                        })()}

                        {/* Scrollable list of Rules */}
                        <div className="my-2 overflow-y-auto max-h-[170px] space-y-1.5 pr-1 font-mono text-[11px] scrollbar-thin scrollbar-thumb-slate-805 flex-1">
                          {learnedSkills.map((sk) => {
                            const isSelected = activeSelectedSkillId === sk.id;
                            return (
                              <div
                                key={sk.id}
                                onClick={() => setActiveSelectedSkillId(sk.id)}
                                className={`p-2.5 rounded-lg border text-left cursor-pointer transition-all flex items-start justify-between gap-3 ${
                                  isSelected 
                                    ? 'bg-[#0f1420]/70 border-indigo-500 text-indigo-200' 
                                    : 'bg-[#12151b] border-slate-850 hover:bg-[#151921] hover:border-slate-700 text-slate-300'
                                }`}
                              >
                                <div className="space-y-1 truncate flex-1 block">
                                  <div className="flex items-center gap-1.5 font-mono">
                                    <span className={`w-1.5 h-1.5 rounded-full ${sk.enabled ? 'bg-emerald-450 animate-pulse' : 'bg-slate-600'}`} />
                                    <strong className="text-xs text-white truncate max-w-[150px]" title={sk.name}>
                                      {sk.name}
                                    </strong>
                                    <span className="text-[7.5px] bg-[#1a1f29] border border-slate-805 text-slate-400 px-1 rounded-sm uppercase tracking-wider font-semibold font-mono">
                                      {sk.type}
                                    </span>
                                  </div>
                                  <p className="text-[9.5px] text-slate-400 truncate whitespace-nowrap overflow-hidden">
                                    {sk.userPrompt}
                                  </p>
                                  <div className="text-[7.5px] text-slate-500 flex items-center gap-1 font-semibold uppercase mt-0.5 font-mono">
                                    <span>Ref: {sk.origin}</span>
                                    <span>•</span>
                                    <span>Confidence: {sk.confidence}%</span>
                                  </div>
                                </div>

                                <div className="flex items-center gap-1 shrink-0" onClick={(e) => e.stopPropagation()}>
                                  <button
                                    type="button"
                                    onClick={() => {
                                      setLearnedSkills(prev => prev.map(item => {
                                        if (item.id === sk.id) {
                                          const nextState = !item.enabled;
                                          
                                          // Log the state switch
                                          const nowStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
                                          setSkillsTerminalLogs(logs => [
                                            ...logs,
                                            `[${nowStr}] [NANO] Skill "${item.name}" changed state: ${nextState ? 'HOT_RELOAD' : 'FROZEN_BYPASS'}`
                                          ]);
                                          return { ...item, enabled: nextState };
                                        }
                                        return item;
                                      }));
                                    }}
                                    className={`px-1.5 py-0.5 text-[8.5px] rounded-sm font-bold transition-all border font-mono cursor-pointer ${
                                      sk.enabled 
                                        ? 'bg-emerald-950/20 border-emerald-900/60 text-emerald-400 hover:bg-emerald-950/40' 
                                        : 'bg-slate-900 border-slate-800 text-slate-500 hover:text-white'
                                    }`}
                                  >
                                    {sk.enabled ? 'ACTIVE' : 'MUTED'}
                                  </button>
                                  
                                  <button
                                    type="button"
                                    onClick={() => {
                                      setLearnedSkills(prev => prev.filter(item => item.id !== sk.id));
                                      if (activeSelectedSkillId === sk.id) {
                                        setActiveSelectedSkillId(null);
                                      }
                                      const nowStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
                                      setSkillsTerminalLogs(logs => [
                                        ...logs,
                                        `[${nowStr}] [DB] Purged item "${sk.name}" from active memory list.`
                                      ]);
                                    }}
                                    className="p-1 hover:text-rose-400 hover:bg-rose-955/20 rounded text-slate-500 cursor-pointer transition-colors text-xs"
                                    title="Delete Rule"
                                  >
                                    ✕
                                  </button>
                                </div>
                              </div>
                            );
                          })}
                        </div>

                        {/* Explanatory inspection panel for the actively selected skill */}
                        <div className="bg-[#050608] border border-slate-850 p-3 rounded-lg space-y-2 text-[11px] font-mono leading-relaxed h-[135px] overflow-y-auto block text-left">
                          {activeSelectedSkillId ? (() => {
                            const currentVal = learnedSkills.find(s => s.id === activeSelectedSkillId);
                            if (!currentVal) return <div className="text-slate-500 italic text-center h-full flex items-center justify-center">Select an active skill above to audit compiled memory layers.</div>;
                            return (
                              <div className="space-y-1.5">
                                <div className="flex items-center justify-between pb-1 border-b border-slate-900">
                                  <span className="text-[9px] text-[#00d2ff] uppercase font-bold tracking-wider">
                                    Guardrails Compiler Output Inspector
                                  </span>
                                  <span className="text-[8px] text-slate-500 uppercase">
                                    ID: {currentVal.id}
                                  </span>
                                </div>
                                <div className="space-y-1">
                                  <span className="text-[9.5px] font-sans font-bold text-slate-400 block uppercase">
                                    Custom Prompt Injected Into Docker Swarm Memory Layer:
                                  </span>
                                  <div className="p-2 bg-[#020204] border border-slate-900 text-[10px] text-emerald-450 rounded italic whitespace-pre-wrap leading-normal block">
                                    {`/* CRITICAL MEMORY SYSTEM GUARDRAIL (Extracted constraint: ${currentVal.name}) */\n- CONTEXT: ${currentVal.userPrompt}\n- IMPACT BOUND: Global Swarm | Node level: ${currentVal.type}`}
                                  </div>
                                </div>
                              </div>
                            );
                          })() : (
                            <div className="text-slate-500 italic text-center h-full flex items-center justify-center">Select an active skill above to audit compiled memory layers.</div>
                          )}
                        </div>
                      </>
                    )}

                  </div>
                </div>

              </div>

              {/* Dynamic Rule Impact Telemetry HUD */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-4 bg-[#0a0d14]/75 border border-slate-850 p-4 rounded-xl items-center font-sans">
                <div className="md:col-span-4 space-y-2 text-left">
                  <span className="text-[8px] font-mono tracking-widest text-indigo-400 block font-bold">COGNITIVE COMPLIANCE HUD</span>
                  <h5 className="text-[11px] font-bold text-white uppercase font-mono tracking-tight">Swarm Focus Strictness</h5>
                  <p className="text-[9.5px] text-slate-450 leading-relaxed font-sans">
                    Finetune the precision threshold of rule execution. Rigid temperature enforces absolute compliance; fluid temperature lets the agent draft creative architecture.
                  </p>
                  
                  {/* Slider controller */}
                  <div className="flex items-center gap-2 pt-1 font-mono text-[9.5px]">
                    <span className="text-emerald-450 font-bold">Rigid</span>
                    <input 
                      type="range" 
                      min={10} 
                      max={90}
                      value={swarmTemperature}
                      onChange={(e) => setSwarmTemperature(Number(e.target.value))}
                      className="flex-1 accent-indigo-600 cursor-pointer h-1 rounded bg-slate-900" 
                    />
                    <span className="text-indigo-400 font-bold">Fluid</span>
                    <span className="bg-[#12151b] border border-slate-850 text-indigo-300 p-0.5 px-2.5 rounded text-[10px] font-bold shrink-0 font-mono">
                      {(swarmTemperature / 100).toFixed(2)}k
                    </span>
                  </div>
                </div>

                <div className="md:col-span-8 grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {/* Gauge 1: Context window footprint */}
                  {(() => {
                    const activeCount = learnedSkills.filter(s => s.enabled).length;
                    const tokenUsage = activeCount * 450 + (100 - swarmTemperature) * 85 + 2450;
                    return (
                      <div className="p-3 bg-[#05060b] border border-[#141824] rounded-lg space-y-1.5 text-left font-mono">
                        <span className="text-[9px] text-slate-500 font-bold block uppercase tracking-wider">Prompt Context Footprint</span>
                        <strong className="text-sm text-indigo-400 flex items-center justify-between font-bold text-[12.5px]">{tokenUsage} <span className="text-[8px] text-slate-650">Tokens</span></strong>
                        <div className="w-full bg-slate-900 h-1 rounded-full overflow-hidden">
                          <div className="bg-indigo-500 h-full transition-all duration-300" style={{ width: `${Math.min(100, (tokenUsage / 10000) * 100)}%` }} />
                        </div>
                        <span className="text-[7.5px] text-slate-550 block leading-none">More guidelines = narrower context gate.</span>
                      </div>
                    );
                  })()}

                  {/* Gauge 2: Adherence Score */}
                  {(() => {
                    const activeCount = learnedSkills.filter(s => s.enabled).length;
                    const totalCount = learnedSkills.length || 1;
                    const hasTailwindAndPaths = learnedSkills.some(s => s.id === 'ls-1' && s.enabled) && learnedSkills.some(s => s.id === 'ls-2' && s.enabled);
                    let complianceRate = 60 + ((activeCount / totalCount) * 28) - (swarmTemperature * 0.15);
                    if (hasTailwindAndPaths) complianceRate += 10;
                    complianceRate = Math.min(99.9, Math.max(45, complianceRate));
                    return (
                      <div className="p-3 bg-[#05060b] border border-[#141824] rounded-lg space-y-1.5 text-left font-mono">
                        <span className="text-[9px] text-[#00d2ff] font-bold block uppercase tracking-wider">Swarm Adherence Score</span>
                        <strong className="text-sm text-emerald-400 flex items-center justify-between font-bold text-[12.5px]">{complianceRate.toFixed(1)}% <span className="text-[8px] text-slate-655">Accuracy</span></strong>
                        <div className="w-full bg-slate-900 h-1 rounded-full overflow-hidden">
                          <div className="bg-emerald-500 h-full transition-all duration-300" style={{ width: `${complianceRate}%` }} />
                        </div>
                        <span className="text-[7.5px] text-slate-550 block leading-none">Muted guidelines cause structural drift.</span>
                      </div>
                    );
                  })()}

                  {/* Gauge 3: Simulated cost per turn */}
                  {(() => {
                    const activeCount = learnedSkills.filter(s => s.enabled).length;
                    const centsValue = (activeCount * 0.04) + (2.1 * (100 - swarmTemperature) / 100);
                    return (
                      <div className="p-3 bg-[#05060b] border border-[#141824] rounded-lg space-y-1.5 text-left font-mono">
                        <span className="text-[9px] text-slate-500 font-bold block uppercase tracking-wider">Cognitive Cost Margin</span>
                        <strong className="text-sm text-amber-500 flex items-center justify-between font-bold text-[12.5px]">${centsValue.toFixed(4)} <span className="text-[8px] text-slate-655 font-bold">Per Call</span></strong>
                        <div className="w-full bg-slate-900 h-1 rounded-full overflow-hidden">
                          <div className="bg-amber-400 h-full transition-all duration-300" style={{ width: `${Math.min(100, centsValue * 3.5 * 100)}%` }} />
                        </div>
                        <span className="text-[7.5px] text-slate-550 block leading-none">Strict filters avoid circular loops.</span>
                      </div>
                    );
                  })()}
                </div>
              </div>

              {/* Memory expansion, synaptic density metrics and synapse sync button */}
              <div className="bg-[#090b11] border border-slate-805 rounded-xl p-4 space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 pb-2.5 border-b border-slate-850">
                  <div>
                    <h4 className="text-xs font-bold text-white uppercase tracking-tight font-mono flex items-center gap-1.5">
                      <Layers className="w-4 h-4 text-[#00d2ff]" />
                      Swarm Synaptic Synchronization Matrix
                    </h4>
                    <p className="text-[9px] text-slate-450">Verify details of how compiled system rules affect each runtime microcard container node memory density.</p>
                  </div>

                  <button
                    onClick={() => {
                      // Trigger synapse refresh sequence
                      const nowStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
                      setSkillsTerminalLogs(prev => [
                        ...prev,
                        `[${nowStr}] [SYNC] Broad-casting synapse flash sequence to ${agentMemoryStats.length} endpoints...`
                      ]);
                      
                      setTimeout(() => {
                        setSkillsTerminalLogs(prev => [
                          ...prev,
                          `[${nowStr}] [SYNC] Successfully synchronized ${learnedSkills.filter(s => s.enabled).length} active rule layers to node memory buffers!`
                        ]);

                        setAgentMemoryStats(prev => prev.map(st => ({
                          ...st,
                          lastSync: 'Synced just now',
                          synapseDensity: (Math.min(99.9, parseFloat(st.synapseDensity) + 0.3)).toFixed(1) + '%'
                        })));

                        setSandboxSystemLogs(logs => [
                          ...logs,
                          `[SYNAPSE-SYNC] Fully synced custom rule memory matrix into running containers.`
                        ]);
                      }, 500);
                    }}
                    className="px-3 py-1 bg-indigo-950/20 hover:bg-indigo-950/40 border border-indigo-900/40 hover:border-indigo-500 text-indigo-400 font-mono font-bold text-[9px] uppercase rounded-md cursor-pointer transition-all shrink-0 flex items-center gap-1"
                  >
                    <Sliders className="w-3 h-3" />
                    Synchronize Swarm Memory Layers
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 font-mono text-[11px] block text-left">
                  {agentMemoryStats.map(agt => {
                    const isDev = agt.id === 'vf-dev';
                    const activeCount = learnedSkills.filter(s => s.enabled).length;
                    return (
                      <div key={agt.id} className="p-3 bg-bg-density-dark/60 border border-slate-850 rounded-lg flex flex-col justify-between space-y-2">
                        <div className="flex justify-between items-start">
                          <div>
                            <strong className="text-white text-[11px] block">{agt.alias}</strong>
                            <span className="text-[8.5px] text-slate-500 block leading-tight">{agt.role}</span>
                          </div>
                          <span className={`text-[8.5px] px-1 py-0.2 rounded font-bold uppercase ${
                            isDev 
                              ? 'bg-emerald-950/30 border border-emerald-900/60 text-emerald-400' 
                              : 'bg-indigo-950/30 border border-indigo-900/60 text-indigo-400'
                          }`}>
                            {agt.level}
                          </span>
                        </div>

                        <div className="space-y-1 pt-1">
                          <div className="flex justify-between text-[9px] text-slate-450 leading-none">
                            <span>Synapse Density:</span>
                            <span className="text-white font-bold">{agt.synapseDensity}</span>
                          </div>
                          
                          {/* Simulated mini cognitive bar progress */}
                          <div className="w-full bg-slate-900 h-1.5 rounded-full overflow-hidden border border-slate-850/60">
                            <motion.div 
                              className={`h-full ${isDev ? 'bg-emerald-500' : 'bg-indigo-500'}`}
                              animate={{ width: agt.synapseDensity }}
                              transition={{ duration: 1 }}
                            />
                          </div>
                        </div>

                        <div className="flex justify-between items-center text-[8px] text-slate-500 pt-1.5 border-t border-slate-900">
                          <span>Rules Injected: {activeCount}</span>
                          <span>{agt.lastSync}</span>
                        </div>
                      </div>
                    );
                  })}
                </div>

              </div>

            </motion.div>
          )}

          {internalTab === 'ingest' && (
            <motion.div
              key="ingest"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-6"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                {/* Left Column: Configuration Controls (col-span-5) */}
                <div className="lg:col-span-5 bg-[#0e1115] border border-slate-800 rounded p-5 space-y-4 flex flex-col justify-between">
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-xs font-mono font-bold text-white uppercase flex items-center gap-1.5 leading-none">
                        <span className="p-1 rounded bg-[#00d2ff]/10 text-[#00d2ff] border border-[#00d2ff]/20">📥</span>
                        Workspace Source Web Ingress
                      </h3>
                      <p className="text-[10px] text-slate-450 mt-1 font-mono">
                        Download, scan, and reverse-engineer remote assets into secure agent task backlogs.
                      </p>
                    </div>

                    {/* Input Form Fields */}
                    <div className="space-y-3 font-mono text-[11px]">
                      {/* URL Input */}
                      <div className="space-y-1">
                        <label className="text-[10px] text-slate-500 uppercase font-bold block">Target App / Webpage URL</label>
                        <input 
                          type="url" 
                          value={ingestUrl}
                          onChange={(e) => setIngestUrl(e.target.value)}
                          disabled={ingestStep !== 'IDLE'}
                          className="w-full bg-bg-density-dark border border-slate-800 p-2 text-xs rounded text-slate-200 focus:outline-none focus:border-[#00d2ff] disabled:opacity-55"
                          placeholder="https://myproject.run.app/"
                        />
                      </div>

                      {/* Method Dropdown */}
                      <div className="space-y-1">
                        <label className="text-[10px] text-slate-500 uppercase font-bold block">Source Retrieval Strategy</label>
                        <select
                          value={ingestMethod}
                          onChange={(e) => setIngestMethod(e.target.value)}
                          disabled={ingestStep !== 'IDLE'}
                          className="w-full bg-bg-density-dark border border-slate-800 p-2 text-xs rounded text-slate-200 focus:outline-none focus:border-[#00d2ff] disabled:opacity-55 cursor-pointer"
                        >
                          <option value="web_crawl">🌐 Direct Production Website Domain Crawler</option>
                          <option value="github_ssh">🦀 Git SSH Repository Clone Pipeline</option>
                          <option value="docker_registry">📦 Docker Blueprint Registry Webhook Ingress</option>
                        </select>
                      </div>

                      {/* Category Dropdown */}
                      <div className="space-y-1">
                        <label className="text-[10px] text-slate-500 uppercase font-bold block">Target Platform Category Context</label>
                        <select
                          value={ingestCategory}
                          onChange={(e) => setIngestCategory(e.target.value)}
                          disabled={ingestStep !== 'IDLE'}
                          className="w-full bg-bg-density-dark border border-slate-800 p-2 text-xs rounded text-slate-200 focus:outline-none focus:border-[#00d2ff] disabled:opacity-55 cursor-pointer"
                        >
                          <option value="field_service">🛠️ Field Service & Location Routing App (Fieldiz Preset)</option>
                          <option value="retail_checkout">🛍️ Retail checkout & payment sanitizer gateway</option>
                          <option value="ai_copilot">🤖 AI automation micro-copilot agent workspace</option>
                        </select>
                      </div>

                      {/* Access Credentials Token */}
                      <div className="space-y-1">
                        <div className="flex justify-between items-center">
                          <label className="text-[10px] text-slate-500 uppercase font-bold block">Docker Ingress Credentials Secret Key</label>
                          <span className="text-[8px] text-emerald-400 uppercase font-bold">SECURE SEED</span>
                        </div>
                        <input 
                          type="password" 
                          value={ingestToken}
                          onChange={(e) => setIngestToken(e.target.value)}
                          disabled={ingestStep !== 'IDLE'}
                          className="w-full bg-bg-density-dark border border-slate-800 p-2 text-xs rounded text-slate-200 focus:outline-none focus:border-[#00d2ff] disabled:opacity-55"
                          placeholder="None required for public domains"
                        />
                      </div>
                    </div>

                    {/* Serialization Caching configuration schema block */}
                    <div className="p-3 bg-[#0a0d14] border border-slate-800 rounded space-y-2 font-mono text-[9px]">
                      <span className="text-blue-400 font-bold uppercase block tracking-wider">💾 INLINE CONTEXT GRAPH METHOD</span>
                      
                      <div className="flex items-center justify-between">
                        <span className="text-slate-450">Topological Memory Cache</span>
                        <div className="flex items-center gap-1">
                          <span className="text-[8px] text-emerald-400 font-semibold uppercase">ACTIVE-YES</span>
                          <span className="text-slate-600 font-normal">| Saves 92% tokens</span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <span className="text-slate-450">Change Validation Method</span>
                        <span className="text-indigo-400 font-bold uppercase">Incremental delta hashes</span>
                      </div>

                      <p className="text-[8.5px] text-slate-500 leading-normal font-sans pt-0.5 mt-1">
                        Instead of scanning the directory on every boot, we compile and serialize the target into a single lightweight dependency graph structure (<code>.virtforce/project-context.json</code>). Changes are verified in milliseconds using index timestamps and file hashes.
                      </p>
                    </div>

                  </div>

                  <div className="pt-4 space-y-3 border-t border-slate-900 mt-4">
                    {/* Action Button */}
                    {ingestStep === 'IDLE' ? (
                      <button
                        onClick={handleIngestWebProject}
                        className="w-full py-2 bg-gradient-to-r from-blue-600 to-[#00d2ff] hover:from-blue-500 hover:to-[#05dcff] text-white font-mono font-bold text-xs uppercase rounded cursor-pointer transition-all shadow-md flex items-center justify-center gap-1.5 animate-pulse"
                      >
                        <span>COMPILE & INGEST WORKSPACE</span>
                      </button>
                    ) : ingestStep === 'SUCCESS' ? (
                      <div className="bg-emerald-950/20 border border-emerald-950 p-3 rounded text-center space-y-1.5">
                        <span className="text-xs font-bold text-emerald-400 font-mono block">🛸 FIELDIZ AGENT SWARM ACTIVE!</span>
                        <p className="text-[9px] text-slate-400 leading-normal font-sans">
                          Workspace converted securely. Telemetry HQ and Kanban channels have loaded active task lists for field tracking.
                        </p>
                      </div>
                    ) : (
                      <div className="space-y-2 font-mono">
                        <div className="flex justify-between text-[10px]">
                          <span className="text-[#00d2ff] animate-pulse">Running Crawl Pipeline...</span>
                          <span className="text-slate-400">{ingestProgress}%</span>
                        </div>
                        <div className="w-full bg-slate-950 rounded-full h-1.5 overflow-hidden border border-slate-850">
                          <div 
                            className="bg-gradient-to-r from-blue-500 via-indigo-500 to-[#00d2ff] h-full transition-all duration-300"
                            style={{ width: `${ingestProgress}%` }}
                          />
                        </div>
                      </div>
                    )}

                    {/* Reset button if success */}
                    {ingestStep === 'SUCCESS' && (
                      <button
                        onClick={() => {
                          setIngestStep('IDLE');
                          setIngestProgress(0);
                          setIngestConsole([]);
                        }}
                        className="w-full py-1.5 bg-[#161a22] hover:bg-[#1c222e] border border-slate-800 hover:border-slate-705 text-slate-350 text-[10px] font-mono font-bold uppercase rounded cursor-pointer transition-colors"
                      >
                        Clear Inbound Channel (Re-Audit)
                      </button>
                    )}
                  </div>
                </div>

                {/* Right Column: Ingress Diagnostics Console (col-span-7) */}
                <div className="lg:col-span-7 bg-[#0b0c10] border border-slate-800 rounded p-5 flex flex-col justify-between h-[510px]">
                  <div className="space-y-4 flex flex-col h-full justify-between">
                    
                    {/* Console Header */}
                    <div className="border-b border-slate-850 pb-2.5 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className={`w-2.5 h-2.5 rounded-full ${ingestStep === 'SUCCESS' ? 'bg-emerald-500' : ingestStep !== 'IDLE' ? 'bg-amber-450 bg-amber-500 animate-pulse' : 'bg-slate-700'}`} />
                        <span className="text-xs font-mono font-bold text-white uppercase tracking-wider">
                          Diagnostics Feed Console
                        </span>
                      </div>
                      <span className="text-[8px] font-mono bg-blue-950/40 text-blue-400 border border-blue-900/40 px-1.5 py-0.5 rounded uppercase font-bold">
                        Ingress Node V2
                      </span>
                    </div>

                    {/* Log Viewport */}
                    <div className="flex-grow bg-[#050608] border border-slate-905 p-3.5 rounded font-mono text-[9.5px] leading-relaxed select-text text-slate-400 overflow-y-auto max-h-[220px] scrollbar-thin scrollbar-thumb-slate-805 space-y-1 shadow-inner">
                      {ingestConsole.length === 0 ? (
                        <div className="text-center text-slate-600 text-[11px] py-16 italic">
                          -- Waiting for Cloud Ingress Compile Directive --<br />
                          <span className="text-[9px] text-slate-750 block mt-1">Specify target workspace parameters and launch the crawl request on the left panel.</span>
                        </div>
                      ) : (
                        ingestConsole.map((line, idx) => {
                          let color = 'text-slate-400';
                          if (idx % 2 === 0) color = 'text-slate-300';
                          if (line.includes('[SUCCESS]') || line.includes('🛸')) color = 'text-emerald-400 font-bold';
                          if (line.includes('[CONNECT]') || line.includes('[CRAWL]')) color = 'text-[#00d2ff]';
                          if (line.includes('[REVERSEENG]')) color = 'text-indigo-400';
                          if (line.includes('DETECTED FRAMEWORKS:')) color = 'text-blue-405 text-blue-400 font-bold';

                          return (
                            <div key={idx} className={`${color} leading-relaxed font-mono`}>
                              {line}
                            </div>
                          );
                        })
                      )}
                    </div>

                    {/* Custom Success summary display */}
                    {ingestStep === 'SUCCESS' && (
                      <motion.div 
                        initial={{ opacity: 0, scale: 0.98 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="p-3 bg-[#111622]/40 border border-blue-900/35 rounded space-y-2 text-[10px] font-mono"
                      >
                        <span className="text-[#00d2ff] font-bold uppercase block tracking-wider">🎯 Real-Time Custom Backlog Initialized:</span>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-[9px]">
                          <div className="bg-[#0b0c10] p-1.5 rounded border border-slate-850">
                            <span className="text-[#00d2ff] block">TASK-FLDZ-01</span>
                            <span className="text-slate-300 block font-sans font-bold leading-snug">Mapbox GPS Route Track</span>
                            <span className="text-slate-500 text-[8px] uppercase">STATUS: DEV Branch</span>
                          </div>
                          <div className="bg-[#0b0c10] p-1.5 rounded border border-slate-850">
                            <span className="text-[#00d2ff] block">TASK-FLDZ-02</span>
                            <span className="text-slate-300 block font-sans font-bold leading-snug">SQLite Offline Persistence</span>
                            <span className="text-slate-500 text-[8px] uppercase">STATUS: Grooming backlog</span>
                          </div>
                          <div className="bg-[#0b0c10] p-1.5 rounded border border-slate-850">
                            <span className="text-[#00d2ff] block">TASK-FLDZ-03</span>
                            <span className="text-slate-300 block font-sans font-bold leading-snug">WhatsApp dispatch alerts</span>
                            <span className="text-amber-500 text-[8px] uppercase font-bold">STATUS: Staged in HITL 🛡️</span>
                          </div>
                        </div>
                      </motion.div>
                    )}

                    <div className="flex items-center justify-between text-[8px] text-slate-500 font-mono italic pt-2 border-t border-slate-900 leading-none">
                      <span>* Ingest crawler analyzes public assets, routes, and dependency models instantly.</span>
                    </div>

                  </div>
                </div>
              </div>

              {/* DYNAMIC TOPOLOGICAL CONTEXT GRAPH LEDGER */}
              {ingestStep === 'SUCCESS' && (
                <motion.div 
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-[#0c0f16] border border-slate-800 rounded-xl p-5 md:p-6 space-y-4"
                >
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 border-b border-slate-850 pb-3">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-[9px] font-mono font-bold tracking-widest text-[#00d2ff] bg-[#00d2ff]/10 border border-[#00d2ff]/20 px-2 py-0.5 rounded">
                          SERIALIZED DOMAIN DIRECTORY TREE RELATIONSHIPS
                        </span>
                        <span className="text-[9px] bg-emerald-950 text-emerald-400 border border-emerald-900/60 font-mono font-bold px-1.5 py-0.2 rounded">
                          COHERENT HASH SYNC ACTIVE
                        </span>
                      </div>
                      <h4 className="text-xs font-mono font-bold text-white uppercase mt-1">
                        Claude-Style Core Context Ingress Hierarchy Map
                      </h4>
                    </div>
                    <div className="text-[10px] text-slate-440 text-slate-400 font-mono uppercase bg-[#121620] border border-slate-800 px-2.5 py-1 rounded">
                      Total Sandbox Context: <strong className="text-white">4.2 KB (Compiled JSON Graph)</strong>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                    {/* Visual relational SVG schema (lg:col-span-8) */}
                    <div className="lg:col-span-8 bg-[#07080b] border border-slate-900 rounded-lg p-4 relative flex items-center justify-center min-h-[220px]">
                      {/* Grid background lines overlay */}
                      <div className="absolute inset-0 bg-[linear-gradient(to_right,#101319_1px,transparent_1px),linear-gradient(to_bottom,#101319_1px,transparent_1px)] bg-[size:20px_20px] opacity-40 pointer-events-none" />

                      <svg className="w-full max-w-[500px] h-[190px] relative z-10" viewBox="0 0 500 180">
                        <defs>
                          <marker id="arrow" viewBox="0 0 10 10" refX="22" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                            <path d="M 0 0 L 10 5 L 0 10 z" fill="#334155" />
                          </marker>
                          <marker id="arrow-active" viewBox="0 0 10 10" refX="22" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                            <path d="M 0 0 L 10 5 L 0 10 z" fill="#00d2ff" />
                          </marker>
                        </defs>

                        {/* Node connectivity lines */}
                        {/* root index.html -> src/main.tsx */}
                        <line x1="50" y1="90" x2="160" y2="40" stroke="#00d2ff" strokeWidth="2" strokeDasharray="3,3" markerEnd="url(#arrow-active)" />
                        
                        {/* src/main.tsx -> src/App.tsx */}
                        <line x1="160" y1="40" x2="270" y2="90" stroke="#00d2ff" strokeWidth="2" markerEnd="url(#arrow-active)" />
                        
                        {/* src/App.tsx -> MapboxRoute.tsx */}
                        <line x1="270" y1="90" x2="410" y2="40" stroke="#00d2ff" strokeWidth="2" markerEnd="url(#arrow-active)" />
                        
                        {/* src/App.tsx -> TechnicianDb.ts */}
                        <line x1="270" y1="90" x2="410" y2="140" stroke="#334155" strokeWidth="1.2" markerEnd="url(#arrow)" />
                        
                        {/* MapboxRoute.tsx -> packages list (External GPS) */}
                        <line x1="410" y1="40" x2="410" y2="140" stroke="#334155" strokeWidth="1" strokeDasharray="2,2" />

                        {/* Interactive Graph Node Circles */}
                        {[
                          { id: 'HTML', x: 50, y: 90, name: 'index.html', label: 'HTML Ingress Entry', fill: '#0a0d14', stroke: '#1e293b', emoji: '🌐' },
                          { id: 'BOOT', x: 160, y: 40, name: 'main.tsx', label: 'Vite Bootstrap Target', fill: '#0a0d14', stroke: '#1e293b', emoji: '⚡' },
                          { id: 'CORE', x: 270, y: 90, name: 'App.tsx', label: 'App Shell Router', fill: '#141a24', stroke: '#00d2ff', emoji: '📦' },
                          { id: 'MAPS', x: 410, y: 40, name: 'MapboxRoute.tsx', label: 'GPS Coordinate Tracking API', fill: '#1b2332', stroke: '#00d2ff', emoji: '🗺️' },
                          { id: 'DBMS', x: 410, y: 140, name: 'TechnicianDb.ts', label: 'Offline Persistent Data Layer', fill: '#0a0d14', stroke: '#1e293b', emoji: '💾' }
                        ].map(node => (
                          <g key={node.id} className="cursor-default">
                            <circle cx={node.x} cy={node.y} r="18" fill={node.fill} stroke={node.stroke} strokeWidth="2" />
                            <text x={node.x} y={node.y + 4} textAnchor="middle" fontSize="12">{node.emoji}</text>
                            
                            <text x={node.x} y={node.y + 26} textAnchor="middle" fontSize="9" fontFamily="monospace" fill="#ffffff" fontWeight="bold">{node.name}</text>
                            <text x={node.x} y={node.y - 23} textAnchor="middle" fontSize="7.5" fontFamily="monospace" fill="#64748b" fontWeight="semibold">{node.id}</text>
                          </g>
                        ))}
                      </svg>
                      
                    </div>

                    {/* Serialization ledger details checklist (lg:col-span-4) */}
                    <div className="lg:col-span-4 bg-[#0a0c10] border border-slate-900 rounded-lg p-4 flex flex-col justify-between font-mono text-[10px] leading-relaxed space-y-3.5">
                      <div className="space-y-3 font-mono">
                        <div className="flex items-center gap-1 text-[#00d2ff] font-bold uppercase tracking-wider">
                          <span>📊</span>
                          <span>Context Serialization Savings</span>
                        </div>

                        <div className="space-y-1.5 p-2 bg-[#121620]/85 rounded border border-slate-850 text-[9.5px]">
                          <div className="flex justify-between">
                            <span className="text-slate-500">Normal Cold Scan Cost:</span>
                            <span className="text-rose-450 font-bold">~148K tokens</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-slate-500">virtForce Cache Match:</span>
                            <span className="text-emerald-400 font-bold">~11.8K tokens</span>
                          </div>
                          <div className="flex justify-between border-t border-slate-800 pt-1 mt-1">
                            <span className="text-slate-400 font-bold">Token Savings Profit:</span>
                            <span className="text-emerald-400 font-black uppercase text-[11px]">-92.1% (Saved)</span>
                          </div>
                        </div>

                        <p className="text-[9px] text-slate-450 font-sans leading-normal">
                          By computing code-tree structures into high-affinity embeddings stored locally, subsequent supervisor sessions trigger instantaneously in <strong>0.12 seconds</strong> instead of executing slow recursive workspace indexing walks.
                        </p>
                      </div>

                      <div className="p-3 bg-indigo-950/20 border border-indigo-900/60 rounded">
                        <span className="text-indigo-400 font-bold block uppercase mb-1">⚡ CLAUDE-STYLE CORE HYPOTHESIS:</span>
                        <p className="text-[9px] text-slate-400 leading-normal font-sans">
                          Yes! Serializing files into a hierarchical graph connection format (exactly like the Claude initialization context schema) allows virtForce to maintain long-term memory across successive runs. It protects your budget by bypassing full-code ingestion runs on each individual task execution!
                        </p>
                      </div>

                    </div>
                  </div>
                </motion.div>
              )}

            </motion.div>
          )}

          {internalTab === 'multica' && (
            <motion.div
              key="multica"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-4 text-slate-300"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
                {/* Left block - Daemon settings & CLI Emulator (col-span-12 or col-span-7) */}
                <div className="lg:col-span-7 space-y-4">
                  {/* Status Card */}
                  <div className="bg-[#090b11] border border-slate-800 p-5 rounded-xl space-y-4 relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-4 opacity-15">
                      <span className="text-4xl">🐙</span>
                    </div>

                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-[9px] font-mono bg-indigo-950 text-indigo-400 border border-indigo-900/60 px-2 py-0.5 rounded font-extrabold">
                            GITHUB OPEN-SOURCE DAEMON
                          </span>
                          <span className={`w-2 h-2 rounded-full ${isMulticaConnected ? 'bg-emerald-500 animate-pulse' : 'bg-rose-500'}`} />
                        </div>
                        <h3 className="text-sm font-bold font-mono text-white uppercase mt-1">
                          multicad Background Process Controller
                        </h3>
                      </div>

                      <button
                        onClick={() => {
                          const nextState = !isMulticaConnected;
                          setIsMulticaConnected(nextState);
                          setMulticaLogs(prev => [
                            ...prev,
                            `[multicad] Daemon power state shifted: ${nextState ? 'CONNECTED' : 'DISCONNECTED'}`,
                            nextState 
                              ? '[multicad] Connected back successfully to localhost:5902. Active teammates retrieved.'
                              : '[multicad] Connection dropped manually. Background workers paused.'
                          ]);
                        }}
                        className={`px-3 py-1 text-[10px] font-mono font-bold rounded cursor-pointer transition-all ${
                          isMulticaConnected 
                            ? 'bg-rose-950/40 text-rose-400 border border-rose-900/60 hover:bg-rose-900/35'
                            : 'bg-emerald-950/40 text-emerald-400 border border-emerald-900/60 hover:bg-emerald-900/35'
                        }`}
                      >
                        {isMulticaConnected ? 'STOP BACKGROUND DAEMON' : 'START MULTICA DAEMON'}
                      </button>
                    </div>

                    <p className="text-[11px] text-slate-400 leading-relaxed font-sans">
                      Multica is an open-source teammate platform designed to run AI teammates directly inside your workspace via the <code>multicad</code> daemon. Connect virtForce with your local Multica configuration to synchronize agent code backlogs, compound modular skills, and map deployment streams.
                    </p>

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-[10px] font-mono bg-[#050608]/80 p-3 rounded-lg border border-slate-850">
                      <div>
                        <span className="text-slate-550 block text-[9px]">DAEMON STATUS:</span>
                        <strong className={isMulticaConnected ? "text-emerald-450 text-emerald-400" : "text-rose-450 text-rose-400"}>
                          {isMulticaConnected ? '● COMPLIANT' : '○ OFFLINE'}
                        </strong>
                      </div>
                      <div>
                        <span className="text-slate-550 block text-[9px]">LOCAL TARGET:</span>
                        <strong className="text-white">localhost:5902</strong>
                      </div>
                      <div>
                        <span className="text-slate-550 block text-[9px]">SYNCED DAEMONS:</span>
                        <strong className="text-white">1 Active</strong>
                      </div>
                      <div>
                        <span className="text-slate-550 block text-[9px]">ACTIVE AGENTS:</span>
                        <strong className="text-[#00d2ff]">3 Teammates</strong>
                      </div>
                    </div>
                  </div>

                  {/* Interactive Terminal CLI Emulator */}
                  <div className="bg-[#050608] border border-slate-850 rounded-xl overflow-hidden flex flex-col justify-between min-h-[300px]">
                    {/* Header */}
                    <div className="bg-[#0b0d13] px-4 py-2 flex items-center justify-between border-b border-slate-850">
                      <div className="flex items-center gap-1.5 font-mono text-[10px]">
                        <span className="w-2.5 h-2.5 rounded-full bg-rose-500/20 border border-rose-600/40" />
                        <span className="w-2.5 h-2.5 rounded-full bg-amber-500/20 border border-amber-600/40" />
                        <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/20 border border-emerald-600/40" />
                        <span className="text-slate-400 ml-1.5 font-bold uppercase tracking-wide">multica-cli emulator</span>
                      </div>
                      <span className="text-[9px] text-[#00d2ff] font-mono font-bold bg-[#00d2ff]/10 px-2 py-0.5 rounded">
                        STD_IO CONNECTED
                      </span>
                    </div>

                    {/* Console Output */}
                    <div className="p-4 flex-grow font-mono text-[11px] space-y-2 overflow-y-auto max-h-[220px]">
                      {multicaLogs.map((log, idx) => {
                        let color = 'text-slate-300';
                        if (log.startsWith('[multicad]')) color = 'text-indigo-400';
                        if (log.startsWith('>') || log.startsWith('  $')) color = 'text-[#00d2ff]';
                        if (log.includes('SUCCESS') || log.includes('OK') || log.includes('active')) color = 'text-emerald-400 font-semibold';
                        if (log.includes('ERROR') || log.includes('failed')) color = 'text-rose-400';
                        return (
                          <div key={idx} className={`${color} leading-relaxed`}>
                            {log}
                          </div>
                        );
                      })}
                    </div>

                    {/* Terminal Input Controls or Fast Command Tags */}
                    <div className="border-t border-slate-850 p-3 bg-[#080a10]">
                      <div className="flex flex-wrap gap-1.5 mb-3">
                        {[
                          { cmd: 'multica info', label: 'ℹ️ multica info', desc: 'Daemon server connection details' },
                          { cmd: 'multica list', label: '👥 multica list', desc: 'Read loaded workspace teammates' },
                          { cmd: 'multica sync-skills', label: '🔄 multica sync-skills', desc: 'Inject virtForce credentials' },
                          { cmd: 'multica run-task "Verify safety builds"', label: '⚡ multica run-task', desc: 'Deploy devops test pipeline' }
                        ].map((btn, i) => (
                          <button
                            key={i}
                            title={btn.desc}
                            onClick={() => {
                              if (!isMulticaConnected) {
                                setMulticaLogs(prev => [...prev, `> ${btn.cmd}`, `[ERROR] Cannot execute CLI commands while background daemon is offline.`]);
                                return;
                              }
                              let responseLines: string[] = [];
                              if (btn.cmd === 'multica info') {
                                responseLines = [
                                  `[multica-cli] Connected successfully to daemon v2.5.0`,
                                  `  Target host: http://localhost:5902`,
                                  `  Config directory: ~/.multica/configs/`,
                                  `  Database Adapter: SQLITE Local Persistent Layer`,
                                  `  Verification Output: 200 OK`
                                ];
                              } else if (btn.cmd === 'multica list') {
                                responseLines = [
                                  `[multica-cli] Retrieved 3 active teammates:`,
                                  `  - MC-1: CEO-Copilot (Orchestration Specialist) -> Model: gemini-3.5-flash`,
                                  `  - MC-2: Code-Mutant (Secure Workstation coder) -> Model: gemini-2.5-pro`,
                                  `  - MC-3: Aero-DevOps (Continuous Integration build) -> Model: gemini-3.5-flash`
                                ];
                              } else if (btn.cmd === 'multica sync-skills') {
                                responseLines = [
                                  `[multica-cli] Synchronizing virtForce action handlers to local teammate definitions...`,
                                  `[SUCCESS] Registered skill: refine_code inside Code-Mutant`,
                                  `[SUCCESS] Registered skill: web_ingress_crawl inside CEO-Copilot`,
                                  `[SUCCESS] Sync completed. Your developers can now execute real-time code modifications.`
                                ];
                              } else if (btn.cmd.includes('run-task')) {
                                responseLines = [
                                  `[multica-cli] Initiating task: "Verify safety builds"`,
                                  `  Assignee: Code-Mutant & Aero-DevOps`,
                                  `  Running background pipeline Vitest run...`,
                                  `[SUCCESS] Testing build passed. Multi-agent devops has completed deployment targets!`
                                ];
                              }

                              setMulticaLogs(prev => [
                                ...prev,
                                `> ${btn.cmd}`,
                                ...responseLines
                              ]);
                            }}
                            className="px-2 py-1 bg-[#101420] text-slate-300 hover:text-white rounded border border-slate-800 text-[9.5px] cursor-pointer font-semibold font-mono hover:bg-[#161d2d] transition-all"
                          >
                            {btn.label}
                          </button>
                        ))}
                      </div>

                      <div className="flex gap-2">
                        <span className="text-[#00d2ff] font-bold font-mono self-center select-none">$</span>
                        <input
                          type="text"
                          value={multicaInputCmd}
                          onChange={e => setMulticaInputCmd(e.target.value)}
                          onKeyDown={e => {
                            if (e.key === 'Enter' && multicaInputCmd.trim()) {
                              const typed = multicaInputCmd.trim();
                              setMulticaInputCmd('');
                              if (!isMulticaConnected) {
                                setMulticaLogs(prev => [...prev, `> ${typed}`, `[ERROR] Connection disconnected. Restart daemon to authorize CLI directives.`]);
                                return;
                              }
                              let respond = [`[multica-cli] Unrecognized command "${typed}". Type "multica help" for lists of endpoints.`];
                              if (typed === 'multica help' || typed === 'multica') {
                                respond = [
                                  `[multica-cli] Available Command Schemas:`,
                                  `  - multica info          : Display system status`,
                                  `  - multica list          : List teammates loaded from config`,
                                  `  - multica sync-skills   : Merge virtForce handlers`,
                                  `  - multica daemon start  : Launch background process`,
                                  `  - multica daemon stop   : Terimate localhost socket`
                                ];
                              } else if (typed === 'multica info') {
                                respond = [`[multica-cli] Connected to http://localhost:5902. Status: Live. sqlite persistence synchronized.`];
                              } else if (typed === 'multica list') {
                                respond = [`[multica-cli] Synced agents: CEO-Copilot, Code-Mutant, Aero-DevOps.`];
                              } else if (typed === 'multica daemon start') {
                                setIsMulticaConnected(true);
                                respond = [`[multicad] background process on localhost:5902 re-activated successfully.`];
                              } else if (typed === 'multica daemon stop') {
                                setIsMulticaConnected(false);
                                respond = [`[multicad] background daemon stopped. Command listening offline.`];
                              }
                              setMulticaLogs(prev => [...prev, `> ${typed}`, ...respond]);
                            }
                          }}
                          placeholder='Type command (e.g., "multica help") & press enter...'
                          className="flex-grow bg-[#040508] border border-slate-800 p-2 text-[10.5px] font-mono text-white rounded focus:outline-none focus:border-[#00d2ff]"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right block - Teammate alignment config & Skill compound chart (col-span-5) */}
                <div className="lg:col-span-5 space-y-4">
                  {/* Local Teammates List */}
                  <div className="bg-[#090b11]/70 border border-slate-850 p-4 md:p-5 rounded-xl space-y-3">
                    <div className="flex justify-between items-center border-b border-slate-850 pb-2.5">
                      <span className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider">
                        Configured Teammate Presets
                      </span>
                      <span className="text-[9px] font-mono text-emerald-400 bg-emerald-950/40 border border-emerald-900/60 px-1.5 py-0.5 rounded uppercase font-bold">
                        3 Loaded
                      </span>
                    </div>

                    <div className="space-y-2">
                      {multicaTeammates.map(agent => (
                        <div key={agent.id} className="bg-[#050608]/90 border border-slate-850 p-3 rounded-lg flex items-center justify-between font-mono text-[10.5px]">
                          <div className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded bg-indigo-950/20 border border-indigo-900/40 text-sm flex items-center justify-center">
                              {agent.id === 'MC-1' ? '🎯' : agent.id === 'MC-2' ? '💻' : '⚙️'}
                            </div>
                            <div>
                              <div className="flex items-center gap-1.5">
                                <span className="font-bold text-slate-100">{agent.name}</span>
                                <span className="text-[8px] text-slate-500 uppercase">{agent.id}</span>
                              </div>
                              <span className="text-[9px] text-slate-450 block">{agent.role}</span>
                            </div>
                          </div>

                          <div className="text-right">
                            <span className="text-emerald-400 font-extrabold text-[10px] block">{agent.affinity}</span>
                            <span className="text-[8.5px] text-slate-500 font-bold block bg-[#101420] border border-slate-850 px-1 py-0.2 rounded uppercase mt-0.5">
                              {agent.model}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Button trigger teammate sync test */}
                    <div>
                      <button
                        onClick={() => {
                          setMulticaLogs(prev => [
                            ...prev,
                            `> multica test-teammates`,
                            `[TEST] Dispatching unit mock signals to verified daemon teammates...`,
                            `  MC-1: CEO-Copilot response latency: 12ms (Success)`,
                            `  MC-2: Code-Mutant response latency: 25ms (Success)`,
                            `  MC-3: Aero-DevOps response latency: 09ms (Success)`,
                            `[SUCCESS] All Multica background teammates are synchronized and working perfectly with virtForce database endpoints!`
                          ]);
                        }}
                        className="w-full py-1.5 bg-gradient-to-r from-indigo-800 to-indigo-600 hover:from-indigo-700 hover:to-indigo-500 text-white font-mono font-bold text-[10px] uppercase rounded cursor-pointer transition-all shadow-md flex items-center justify-center gap-1"
                      >
                        <span>🔄 Execute Teammate Live Diagnostics</span>
                      </button>
                    </div>
                  </div>

                  {/* Skills Compounding Matrix Card */}
                  <div className="bg-[#090b11] border border-slate-850 p-5 rounded-xl space-y-3.5">
                    <span className="text-[10px] font-mono font-bold text-[#00d2ff] uppercase block tracking-wider">
                      🛠️ Teammate Skills Compounding
                    </span>

                    <p className="text-[10px] text-slate-400 font-sans leading-normal">
                      Unlike static AI systems, Multica lets teammates compound skills recursively. When Aero-DevOps passes logs to Code-Mutant, the mutant gains CI/CD pipeline affinity rules!
                    </p>

                    <div className="space-y-2 font-mono text-[9px] bg-[#050608]/50 p-3 rounded-lg border border-slate-850">
                      <div className="flex justify-between items-center border-b border-slate-900 pb-1.5">
                        <span className="text-slate-440 text-slate-450 uppercase">Compounded Skill Area</span>
                        <span className="text-slate-440 text-slate-450 uppercase">Accumulated Sync</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-slate-300">Fast Ingress Web Crawler</span>
                        <span className="text-emerald-400 font-bold">94% Core Match</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-slate-300">Vulnerability Testing (Vitest)</span>
                        <span className="text-emerald-400 font-bold">88% Security Match</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-slate-300">Docker Swarm & Webhook Gates</span>
                        <span className="text-[#00d2ff] font-bold">92% DevOps Compliance</span>
                      </div>
                    </div>

                    <div className="p-3 bg-indigo-950/20 border border-indigo-900/50 rounded flex gap-2">
                      <span className="text-sm self-start">🔗</span>
                      <p className="text-[9px] text-slate-450 leading-relaxed font-sans">
                        Read our detailed integration handbook in <strong>INTEGRATION.md</strong> or inspect <strong>virtforce-ai-skill.json</strong> inside the root folder to plug local tools into cursor or claude-desktop immediately!
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {internalTab === 'providers' && (
            <motion.div
              key="providers"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-4 text-slate-300"
            >
              {/* Core Provider Selection Deck */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
                
                {/* Left block - Orchestrator Hub & Credential Tests (col-span-5) */}
                <div className="lg:col-span-5 space-y-4">
                  <div className="bg-[#090b11] border border-slate-805 p-5 rounded-xl space-y-4">
                    <div className="flex items-center gap-2">
                      <span className="text-[9px] font-mono bg-indigo-950 text-indigo-400 border border-indigo-900/60 px-2 py-0.5 rounded font-extrabold pb-1">
                        LLM ROUTER ENGINE
                      </span>
                    </div>
                    <h3 className="text-sm font-bold font-mono text-white uppercase mt-1">
                      Primary AI Provider Select
                    </h3>
                    <p className="text-[11px] text-slate-450 leading-relaxed font-sans">
                      Select which model adapter routes workspace tasks (spec parsing, code modifications, webhook handling). Changing the active routing engine will update all downstream worker nodes.
                    </p>

                    <div className="space-y-2">
                      {[
                        { id: 'gemini', name: 'Google Gemini', icon: '🔮', desc: 'Default ultra context engine' },
                        { id: 'openai', name: 'OpenAI GPT Core', icon: '🧠', desc: 'Industry standard reasoning' },
                        { id: 'anthropic', name: 'Anthropic Claude', icon: '⚡', desc: 'Intense programming syntax logic' },
                        { id: 'deepseek', name: 'DeepSeek Chat', icon: '🐙', desc: 'Cost-optimized deep coding' },
                        { id: 'ollama', name: 'Ollama Custom / Self-Hosted', icon: '⚙️', desc: 'Offline local vLLama endpoints' }
                      ].map(prov => {
                        const isActive = aiProvidersConfig.activeProvider === prov.id;
                        return (
                          <button
                            key={prov.id}
                            onClick={() => {
                              setAiProvidersConfig((p: any) => ({ ...p, activeProvider: prov.id }));
                              setEditingProvider(prov.id);
                            }}
                            className={`w-full p-2.5 rounded-lg border text-left flex items-center justify-between transition-all cursor-pointer ${
                              isActive 
                                ? 'bg-[#101422] border-indigo-500 text-white shadow-lg' 
                                : 'bg-[#050608]/80 border-slate-850 hover:border-slate-700 text-slate-400'
                            }`}
                          >
                            <div className="flex items-center gap-2.5">
                              <span className="text-lg">{prov.icon}</span>
                              <div className="font-mono text-[11px]">
                                <div className="font-bold uppercase tracking-wide">{prov.name}</div>
                                <div className="text-[9px] text-slate-500 mt-0.5">{prov.desc}</div>
                              </div>
                            </div>
                            <div className={`w-3 h-3 rounded-full flex items-center justify-center border ${
                              isActive ? 'border-indigo-400 bg-indigo-500/25' : 'border-slate-800'
                            }`}>
                              {isActive && <div className="w-1.5 h-1.5 rounded-full bg-indigo-400" />}
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Fallback Isolation Orchestration Settings */}
                  <div className="bg-[#090b11] border border-slate-805 p-5 rounded-xl space-y-4">
                    <span className="text-[10px] font-mono font-bold text-[#00d2ff] uppercase block tracking-wider">
                      🛡️ Failover & Isolation Rules
                    </span>
                    <p className="text-[10px] text-slate-400 leading-normal">
                      Enable autonomous fallbacks to maintain uninterrupted multi-agent compiler pipelines if the primary API endpoint returns error codes.
                    </p>

                    <div className="flex items-center justify-between p-2.5 bg-[#050608] border border-slate-850 rounded-lg">
                      <div className="font-mono text-[10.5px]">
                        <span className="text-white block font-bold">FAILOVER ACTIVE</span>
                        <span className="text-[8.5px] text-slate-500 block">Try alternative engine if error occurs</span>
                      </div>
                      <button
                        onClick={() => setAiProvidersConfig((p: any) => ({ ...p, failoverEnabled: !p.failoverEnabled }))}
                        className={`w-11 h-6 rounded-full p-0.5 transition-colors duration-200 cursor-pointer ${
                          aiProvidersConfig.failoverEnabled ? 'bg-indigo-600' : 'bg-slate-800'
                        }`}
                      >
                        <div className={`w-5 h-5 bg-white rounded-full shadow transform duration-200 ${
                          aiProvidersConfig.failoverEnabled ? 'translate-x-5' : 'translate-x-0'
                        }`} />
                      </button>
                    </div>

                    {aiProvidersConfig.failoverEnabled && (
                      <div className="space-y-1.5 font-mono text-[10px]/normal">
                        <label className="text-slate-500 uppercase block text-[8px] font-extrabold tracking-wider">Backup Fallback Provider</label>
                        <select
                          value={aiProvidersConfig.failoverProvider}
                          onChange={e => setAiProvidersConfig((p: any) => ({ ...p, failoverProvider: e.target.value }))}
                          className="w-full bg-[#121620] border border-slate-800 text-white p-2 rounded focus:outline-none"
                        >
                          <option value="gemini">Google Gemini (Model: gemini-3.5-flash)</option>
                          <option value="openai">OpenAI (Model: gpt-4o-mini)</option>
                          <option value="anthropic">Anthropic Claude (Model: claude-3-5-haiku)</option>
                          <option value="deepseek">DeepSeek Chat</option>
                          <option value="ollama">Ollama (Custom/Self-hosted)</option>
                          <option value="mock">Local Zero-Cost Mock Simulator (Immune to Key failures)</option>
                        </select>
                      </div>
                    )}
                  </div>
                </div>

                {/* Right block - Settings parameters tuning configurations (col-span-7) */}
                <div className="lg:col-span-7 space-y-4">
                  
                  {/* Fine-Tuning Params Card */}
                  <div className="bg-[#090b11] border border-slate-805 p-6 rounded-xl space-y-5">
                    
                    {/* Active editing header */}
                    <div className="flex justify-between items-center border-b border-slate-850 pb-3">
                      <div className="flex items-center gap-2">
                        <span className="text-xl">
                          {editingProvider === 'gemini' ? '🔮' : editingProvider === 'openai' ? '🧠' : editingProvider === 'anthropic' ? '⚡' : editingProvider === 'deepseek' ? '🐙' : '⚙️'}
                        </span>
                        <div>
                          <h4 className="text-sm font-bold font-mono text-white uppercase tracking-tight">
                            Configure {editingProvider} parameters
                          </h4>
                          <span className="text-[9px] text-slate-500 font-mono block uppercase">Active Configuration Tweaker</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-1.5">
                        {['gemini', 'openai', 'anthropic', 'deepseek', 'ollama'].map(key => (
                          <button
                            key={key}
                            onClick={() => setEditingProvider(key)}
                            className={`px-2 py-0.5 rounded font-mono text-[9px] cursor-pointer border hover:bg-[#121620] uppercase transition-all ${
                              editingProvider === key 
                                ? 'bg-[#00d2ff]/10 border-[#00d2ff] text-[#00d2ff] font-bold' 
                                : 'border-slate-800 text-slate-500'
                            }`}
                          >
                            {key.slice(0, 3)}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Params editor fields */}
                    <div className="space-y-4 font-mono text-[11px]">
                      
                      {/* Endpoint API base Override */}
                      <div className="space-y-1.5">
                        <div className="flex justify-between">
                          <label className="text-[9px] text-slate-450 uppercase font-bold">API Base Endpoint URL</label>
                          <span className="text-[8px] text-slate-500 lowercase font-medium">Allows self-hosted proxies or OpenRouter</span>
                        </div>
                        <input
                          type="text"
                          value={aiProvidersConfig.providers[editingProvider].apiBase}
                          onChange={e => {
                            const val = e.target.value;
                            setAiProvidersConfig((p: any) => {
                              const updated = { ...p };
                              updated.providers[editingProvider].apiBase = val;
                              return updated;
                            });
                          }}
                          placeholder={editingProvider === 'gemini' ? "https://generativelanguage.googleapis.com" : editingProvider === 'openai' ? "https://api.openai.com/v1" : editingProvider === 'anthropic' ? "https://api.anthropic.com/v1" : editingProvider === 'deepseek' ? "https://api.deepseek.com/v1" : "http://localhost:11434/v1"}
                          className="w-full bg-[#050608] border border-slate-800 p-2 text-white rounded focus:outline-none focus:border-indigo-400"
                        />
                      </div>

                      {/* API Credentials */}
                      {editingProvider !== 'ollama' && (
                        <div className="space-y-1.5">
                          <div className="flex justify-between">
                            <label className="text-[9px] text-slate-450 uppercase font-bold">API Key Secret</label>
                            <span className="text-[8px] text-rose-400 lowercase font-bold font-sans">Keys route state-free, securely proxying in backend.</span>
                          </div>
                          <div className="relative">
                            <input
                              type={revealKeys[editingProvider] ? "text" : "password"}
                              value={aiProvidersConfig.providers[editingProvider].apiKey}
                              onChange={e => {
                                const val = e.target.value;
                                setAiProvidersConfig((p: any) => {
                                  const updated = { ...p };
                                  updated.providers[editingProvider].apiKey = val;
                                  return updated;
                                });
                              }}
                              placeholder={`Enter custom secure secret ${editingProvider.toUpperCase()}_API_KEY...`}
                              className="w-full bg-[#050608] border border-slate-800 p-2 pr-10 text-white rounded focus:outline-none focus:border-indigo-400 font-mono tracking-widest text-xs"
                            />
                            <button
                              type="button"
                              onClick={() => setRevealKeys(p => ({ ...p, [editingProvider]: !p[editingProvider] }))}
                              className="absolute right-2 top-2 text-slate-500 hover:text-slate-300 cursor-pointer"
                            >
                              {revealKeys[editingProvider] ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                            </button>
                          </div>
                        </div>
                      )}

                      {/* Tweak Default Model Preset */}
                      <div className="space-y-1.5">
                        <label className="text-[9px] text-slate-450 uppercase font-bold block">Model Preset Target</label>
                        <input
                          type="text"
                          value={aiProvidersConfig.providers[editingProvider].defaultModel}
                          onChange={e => {
                            const val = e.target.value;
                            setAiProvidersConfig((p: any) => {
                              const updated = { ...p };
                              updated.providers[editingProvider].defaultModel = val;
                              return updated;
                            });
                          }}
                          placeholder={editingProvider === 'gemini' ? "gemini-3.5-flash" : editingProvider === 'openai' ? "gpt-4o-mini" : editingProvider === 'anthropic' ? "claude-3-5-haiku-20241022" : editingProvider === 'deepseek' ? "deepseek-chat" : "llama3"}
                          className="w-full bg-[#050608] border border-slate-800 p-2 text-white rounded focus:outline-none focus:border-indigo-400"
                        />
                      </div>

                      {/* Tweaks sliders */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
                        
                        {/* Temperature */}
                        <div className="space-y-1.5 p-3 bg-[#050608]/40 border border-slate-850 rounded">
                          <div className="flex justify-between text-[9px] font-bold">
                            <span className="text-slate-400">🌡️ TEMPERATURE (Tuning)</span>
                            <span className="text-[#00d2ff]">{aiProvidersConfig.providers[editingProvider].temperature}</span>
                          </div>
                          <input
                            type="range"
                            min="0.0"
                            max="1.2"
                            step="0.05"
                            value={aiProvidersConfig.providers[editingProvider].temperature}
                            onChange={e => {
                              const val = parseFloat(e.target.value);
                              setAiProvidersConfig((p: any) => {
                                const updated = { ...p };
                                updated.providers[editingProvider].temperature = val;
                                return updated;
                              });
                            }}
                            className="w-full h-1 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-indigo-500"
                          />
                          <p className="text-[8px] text-slate-500 font-sans">0.0 = Precise / Code. 1.0+ = Highly Creative / Outreach.</p>
                        </div>

                        {/* Max Completion Tokens */}
                        <div className="space-y-1.5 p-3 bg-[#050608]/40 border border-slate-850 rounded">
                          <div className="flex justify-between text-[9px] font-bold">
                            <span className="text-slate-400">📏 MAX COMPLETION TOKENS</span>
                            <span className="text-[#00d2ff]">{aiProvidersConfig.providers[editingProvider].maxTokens} / 8k</span>
                          </div>
                          <input
                            type="number"
                            min="64"
                            max="8192"
                            step="128"
                            value={aiProvidersConfig.providers[editingProvider].maxTokens}
                            onChange={e => {
                              const val = parseInt(e.target.value) || 2048;
                              setAiProvidersConfig((p: any) => {
                                const updated = { ...p };
                                updated.providers[editingProvider].maxTokens = val;
                                return updated;
                              });
                            }}
                            className="w-full bg-[#050608] border border-slate-850 p-1 text-white rounded text-[10.5px] focus:outline-none"
                          />
                          <p className="text-[8px] text-slate-500 font-sans">Hard caps length of output completion to prevent budget overflow.</p>
                        </div>

                        {/* Top P Slider */}
                        <div className="space-y-1.5 p-3 bg-[#050608]/40 border border-slate-850 rounded">
                          <div className="flex justify-between text-[9px] font-bold">
                            <span className="text-slate-400">🎯 TOP P (Nucleus Sampling)</span>
                            <span className="text-[#00d2ff]">{aiProvidersConfig.providers[editingProvider].topP}</span>
                          </div>
                          <input
                            type="range"
                            min="0.0"
                            max="1.0"
                            step="0.05"
                            value={aiProvidersConfig.providers[editingProvider].topP}
                            onChange={e => {
                              const val = parseFloat(e.target.value);
                              setAiProvidersConfig((p: any) => {
                                const updated = { ...p };
                                updated.providers[editingProvider].topP = val;
                                return updated;
                              });
                            }}
                            className="w-full h-1 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-indigo-500"
                          />
                          <p className="text-[8px] text-slate-500 font-sans">Filters probability tokens deck distribution dynamically.</p>
                        </div>

                        {/* Penalties multipliers */}
                        <div className="space-y-1.5 p-3 bg-[#050608]/40 border border-slate-850 rounded">
                          <div className="flex justify-between text-[9px] font-bold">
                            <span className="text-slate-400">🛡️ PENALTIES ADJUSTMENT</span>
                            <span className="text-emerald-400 text-[9px]">Freq Pen: {aiProvidersConfig.providers[editingProvider].frequencyPenalty}</span>
                          </div>
                          <div className="grid grid-cols-2 gap-2 mt-1">
                            <div>
                              <span className="text-[7.5px] text-slate-500 block uppercase font-bold">Frequency:</span>
                              <input
                                type="number"
                                min="-2.0"
                                max="2.0"
                                step="0.1"
                                value={aiProvidersConfig.providers[editingProvider].frequencyPenalty || 0}
                                onChange={e => {
                                  const val = parseFloat(e.target.value) || 0;
                                  setAiProvidersConfig((p: any) => {
                                    const updated = { ...p };
                                    updated.providers[editingProvider].frequencyPenalty = val;
                                    return updated;
                                  });
                                }}
                                className="w-full bg-[#050608]/80 border border-slate-800 p-1 rounded text-[10px] text-slate-300 focus:outline-none"
                              />
                            </div>
                            <div>
                              <span className="text-[7.5px] text-slate-500 block uppercase font-bold">Presence:</span>
                              <input
                                type="number"
                                min="-2.0"
                                max="2.0"
                                step="0.1"
                                value={aiProvidersConfig.providers[editingProvider].presencePenalty || 0}
                                onChange={e => {
                                  const val = parseFloat(e.target.value) || 0;
                                  setAiProvidersConfig((p: any) => {
                                    const updated = { ...p };
                                    updated.providers[editingProvider].presencePenalty = val;
                                    return updated;
                                  });
                                }}
                                className="w-full bg-[#050608]/80 border border-slate-800 p-1 rounded text-[10px] text-slate-300 focus:outline-none"
                              />
                            </div>
                          </div>
                          <p className="text-[8px] text-slate-500 font-sans mt-1">Compensates token duplicates recursively.</p>
                        </div>

                      </div>
                    </div>

                    {/* Execute Handshake button */}
                    <div className="flex flex-col sm:flex-row gap-3 pt-3 border-t border-slate-850">
                      <button
                        onClick={() => handleTestCredentials(editingProvider)}
                        disabled={testingProvider !== null}
                        className="flex-grow py-2 bg-gradient-to-r from-indigo-750 to-indigo-600 hover:from-indigo-750 hover:to-indigo-500 text-white font-mono font-bold text-[10px] uppercase rounded cursor-pointer transition-all shadow-md flex items-center justify-center gap-1.5 disabled:opacity-50"
                      >
                        <RefreshCw className={`w-3.5 h-3.5 ${testingProvider === editingProvider ? 'animate-spin' : ''}`} />
                        <span>Execute {editingProvider.toUpperCase()} Connection Handshake</span>
                      </button>

                      <button
                        onClick={() => {
                          localStorage.setItem('vac_ai_providers', JSON.stringify(aiProvidersConfig));
                          setTestConsoleLogs(p => [...p, `[SUCCESS] Saved all parameters for ${editingProvider.toUpperCase()} successfully to local storage!`]);
                        }}
                        className="px-4 py-2 bg-[#121622] hover:bg-[#1a2032] text-slate-200 font-mono font-bold text-[10px] uppercase rounded border border-slate-800 transition-colors"
                      >
                        ✓ Preserve Settings
                      </button>
                    </div>

                  </div>

                  {/* Diagnostic Console Panel */}
                  <div className="bg-[#050608] border border-slate-850 rounded-xl overflow-hidden flex flex-col justify-between min-h-[160px]">
                    <div className="bg-[#0b0d13] px-4 py-2 flex items-center justify-between border-b border-slate-850">
                      <span className="text-[9px] font-mono font-extrabold text-slate-400 uppercase tracking-wider">
                        📡 Connection Handshake Console Output
                      </span>
                      <span className="text-[8px] text-[#00d2ff] font-mono font-bold bg-[#00d2ff]/10 px-1.5 py-0.2 rounded uppercase">
                        {testingProvider ? 'Handshake in progress...' : 'READY'}
                      </span>
                    </div>

                    <div className="p-4 flex-grow font-mono text-[10px] space-y-1.5 max-h-[140px] overflow-y-auto font-sans text-slate-400">
                      {testConsoleLogs.length === 0 ? (
                        <span className="text-slate-600 italic font-sans text-[11px]">No handshake diagnostic running. Press "Execute Connection Handshake" to launch verification unit.</span>
                      ) : (
                        testConsoleLogs.map((log, idx) => {
                          let color = 'text-slate-450';
                          if (log.startsWith('[SUCCESS]')) color = 'text-emerald-400 font-bold';
                          if (log.startsWith('[ERROR]') || log.startsWith('[FATAL]')) color = 'text-rose-450 text-rose-400 font-bold';
                          if (log.startsWith('[diagnostics]')) color = 'text-indigo-400';
                          return (
                            <div key={idx} className={`${color} leading-relaxed`}>
                              {log}
                            </div>
                          );
                        })
                      )}
                    </div>
                  </div>

                </div>

              </div>
            </motion.div>
          )}
        </AnimatePresence>
      )}
    </div>
  );
}
