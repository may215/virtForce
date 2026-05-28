import { useState, useEffect, useRef } from 'react';
import { Agent, Task, SwarmLog, SwarmStats, TaskState, AgentRole } from './types';
import { INITIAL_AGENTS, INITIAL_TASKS, INITIAL_LOGS, SIMULATION_STEPS } from './mockData';
import { HQCore } from './components/HQCore';
import { KanbanBoard } from './components/KanbanBoard';
import { LogsExplorer } from './components/LogsExplorer';
import { SecuritySandbox } from './components/SecuritySandbox';
import { VentureIncubator } from './components/VentureIncubator';
import { LandingPage } from './components/LandingPage';
import { CommandPalette } from './components/CommandPalette';
import { generateDynamicSimulation } from './utils/dynamicSimulation';
import { Activity, Circle, Terminal, ShieldAlert, Sparkles, Home } from 'lucide-react';

export default function App() {
  // --- Landing page & Open Source documentation content states ---
  const [showLanding, setShowLanding] = useState(true);
  const [isPaletteOpen, setIsPaletteOpen] = useState(false);
  const [docReadme, setDocReadme] = useState('');
  const [docArchitecture, setDocArchitecture] = useState('');
  const [docInstall, setDocInstall] = useState('');
  const [docCompose, setDocCompose] = useState('');

  useEffect(() => {
    async function fetchOSDocs() {
      try {
        const [r, a, i, d] = await Promise.all([
          fetch('/README.md').then(res => res.text()).catch(() => ''),
          fetch('/ARCHITECTURE.md').then(res => res.text()).catch(() => ''),
          fetch('/INSTALL.md').then(res => res.text()).catch(() => ''),
          fetch('/docker-compose.yml').then(res => res.text()).catch(() => ''),
        ]);
        setDocReadme(r || '# virtForce OS\nSecure containerized AI agent swarms.');
        setDocArchitecture(a || '# System Architecture\nIsolated sandbox container loops.');
        setDocInstall(i || '# Installation Blueprint\nRequires Docker and GCP credentials.');
        setDocCompose(d || 'version: "3.8"\nservices:\n  orchestrator:\n    image: virtforce/core');
      } catch (err) {
        console.error('Failed to load markdown files:', err);
      }
    }
    fetchOSDocs();
  }, []);

  // --- Persistent State Handlers ---
  const [agents, setAgents] = useState<Agent[]>(() => {
    const saved = localStorage.getItem('vac_agents');
    return saved ? JSON.parse(saved) : INITIAL_AGENTS;
  });

  const [tasks, setTasks] = useState<Task[]>(() => {
    const saved = localStorage.getItem('vac_tasks');
    return saved ? JSON.parse(saved) : INITIAL_TASKS;
  });

  const [logs, setLogs] = useState<SwarmLog[]>(() => {
    const saved = localStorage.getItem('vac_logs');
    return saved ? JSON.parse(saved) : INITIAL_LOGS;
  });

  const [stats, setStats] = useState<SwarmStats>(() => {
    const saved = localStorage.getItem('vac_stats');
    return saved ? JSON.parse(saved) : {
      systemState: 'IDLE',
      totalBudgetUsed: 12.40, // Base starting budget spent as in requirement header
      maxBudget: 250.00,
      tokenBurnRate: 0,
      cooldownCounter: 0
    };
  });

  const [sandboxLogs, setSandboxLogs] = useState<string[]>(() => {
    const saved = localStorage.getItem('vac_sandbox_logs');
    return saved ? JSON.parse(saved) : [
      'SYSTEM DETACHED MODE: Decoupled Multi-Agent environment mapped.',
      'Container isolation validated: Sandbox environment idle.',
      'Initialized at Port 3000. Listening for build triggers...',
    ];
  });

  const [isSimulating, setIsSimulating] = useState(false);
  const [simulationSpeed, setSimulationSpeed] = useState(1);
  const [activeTab, setActiveTab] = useState<'hq' | 'kanban' | 'logs' | 'gates' | 'incubator'>('hq');
  const [selectedAgentId, setSelectedAgentId] = useState<AgentRole>('CEO');
  const [isSystemKilled, setIsSystemKilled] = useState(false);
  const [simulationSteps, setSimulationSteps] = useState(() => SIMULATION_STEPS);

  const handleLaunchCustomProduct = (name: string, desc: string, provider: string, model: string) => {
    // Generate tasks, steps, initial system logs, and sandboxed Docker container startup parameters
    const result = generateDynamicSimulation(name, desc, provider, model);

    setIsSimulating(false);
    setTasks(result.tasks);
    setAgents(prev => prev.map(a => ({
      ...a,
      status: 'SLEEPING',
      currentGoal: `Bootstrapping container dependencies for ${name}`,
      costSpent: 0,
      totalTokens: 0,
    })));
    setLogs(result.logs);
    setSandboxLogs(result.sandboxLogs);
    setSimulationSteps(result.steps);
    
    // Reset interval sequence pointer
    stepIndexRef.current = -1;

    // Transition to visual headquarters canvas and turn simulation ON
    setActiveTab('hq');
    setShowLanding(false);
    setIsSimulating(true);
  };

  // Use ref to keep track of simulation step pointer without re-creating interval
  const stepIndexRef = useRef(-1);

  // Sync state to local storage on adjustments
  useEffect(() => {
    localStorage.setItem('vac_agents', JSON.stringify(agents));
  }, [agents]);

  useEffect(() => {
    localStorage.setItem('vac_tasks', JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    localStorage.setItem('vac_logs', JSON.stringify(logs));
  }, [logs]);

  useEffect(() => {
    localStorage.setItem('vac_stats', JSON.stringify(stats));
  }, [stats]);

  useEffect(() => {
    localStorage.setItem('vac_sandbox_logs', JSON.stringify(sandboxLogs));
  }, [sandboxLogs]);

  const handlePaletteAction = (actionId: string) => {
    setIsPaletteOpen(false);
    switch (actionId) {
      case 'go-dashboard':
        setActiveTab('hq');
        setShowLanding(false);
        break;
      case 'go-kanban':
        setActiveTab('kanban');
        setShowLanding(false);
        break;
      case 'go-logs':
        setActiveTab('logs');
        setShowLanding(false);
        break;
      case 'go-gates':
        setActiveTab('gates');
        setShowLanding(false);
        break;
      case 'go-incubator':
        setActiveTab('incubator');
        setShowLanding(false);
        break;
      case 'toggle-landing':
        setShowLanding(prev => !prev);
        break;
      case 'toggle-simulation':
        setIsSimulating(prev => !prev);
        break;
      case 'toggle-kill':
        setIsSystemKilled(prev => !prev);
        break;
      case 'inspect-ceo':
        setSelectedAgentId('CEO');
        setActiveTab('logs');
        setShowLanding(false);
        break;
      case 'inspect-pm':
        setSelectedAgentId('PM');
        setActiveTab('logs');
        setShowLanding(false);
        break;
      case 'inspect-dev':
        setSelectedAgentId('DEV');
        setActiveTab('logs');
        setShowLanding(false);
        break;
      case 'inspect-qa':
        setSelectedAgentId('QA');
        setActiveTab('logs');
        setShowLanding(false);
        break;
      case 'inspect-mkt':
        setSelectedAgentId('MKT');
        setActiveTab('logs');
        setShowLanding(false);
        break;
      default:
        break;
    }
  };

  // --- Global Keyboard Shortcuts ---
  useEffect(() => {
    const handleGlobalShortcuts = (e: KeyboardEvent) => {
      const activeEl = document.activeElement;
      const isInputFocused = activeEl && (
        activeEl.tagName === 'INPUT' || 
        activeEl.tagName === 'TEXTAREA' || 
        activeEl.hasAttribute('contenteditable')
      );

      // Ctrl + Enter: Toggle simulation cycle
      if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
        e.preventDefault();
        setIsSimulating(prev => !prev);
        return;
      }

      // Ctrl + K: Toggle command palette
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsPaletteOpen(prev => !prev);
        return;
      }

      // Alt modifier shortcuts (always allowed to prevent clash with text inputs)
      if (e.altKey) {
        if (e.key === '1') {
          e.preventDefault();
          setActiveTab('hq');
          setShowLanding(false);
        } else if (e.key === '2') {
          e.preventDefault();
          setActiveTab('kanban');
          setShowLanding(false);
        } else if (e.key === '3') {
          e.preventDefault();
          setActiveTab('logs');
          setShowLanding(false);
        } else if (e.key === '4') {
          e.preventDefault();
          setActiveTab('gates');
          setShowLanding(false);
        } else if (e.key === '5') {
          e.preventDefault();
          setActiveTab('incubator');
          setShowLanding(false);
        } else if (e.key.toLowerCase() === 'l') {
          e.preventDefault();
          setShowLanding(prev => !prev);
        } else if (e.key.toLowerCase() === 'x') {
          e.preventDefault();
          setIsSystemKilled(prev => !prev);
        }
        return;
      }

      // Single-key/Shift shortcuts are blocked inside focus input states
      if (isInputFocused) return;

      if (e.shiftKey) {
        const keyLower = e.key.toLowerCase();
        if (keyLower === 'c') {
          e.preventDefault();
          setSelectedAgentId('CEO');
          setActiveTab('logs');
          setShowLanding(false);
        } else if (keyLower === 'p') {
          e.preventDefault();
          setSelectedAgentId('PM');
          setActiveTab('logs');
          setShowLanding(false);
        } else if (keyLower === 'd') {
          e.preventDefault();
          setSelectedAgentId('DEV');
          setActiveTab('logs');
          setShowLanding(false);
        } else if (keyLower === 'q') {
          e.preventDefault();
          setSelectedAgentId('QA');
          setActiveTab('logs');
          setShowLanding(false);
        } else if (keyLower === 'm') {
          e.preventDefault();
          setSelectedAgentId('MKT');
          setActiveTab('logs');
          setShowLanding(false);
        }
      }
    };

    window.addEventListener('keydown', handleGlobalShortcuts);
    return () => window.removeEventListener('keydown', handleGlobalShortcuts);
  }, []);

  // --- Simulation Running Tick ---
  useEffect(() => {
    if (!isSimulating || isSystemKilled) return;

    const tickMs = 6000 / simulationSpeed; // Dynamic tick rate

    const interval = setInterval(() => {
      // Advance step pointer
      stepIndexRef.current = (stepIndexRef.current + 1) % simulationSteps.length;
      const step = simulationSteps[stepIndexRef.current];

      // If the next target state requires human merge gates (HITL state)
      if (step.targetState === 'HITL') {
        // Suspend simulation drive
        setIsSimulating(false);
        setStats(prev => ({ ...prev, systemState: 'IDLE', tokenBurnRate: 0 }));

        // Append log and sandboxed logs
        const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
        const logId = `system-log-${Date.now()}`;

        const gateLog: SwarmLog = {
          id: logId,
          timestamp,
          agentId: 'CEO',
          level: 'INFO',
          message: `🔒 [HITL PAUSED] Task "${tasks[0]?.title}" is staged for administrator manual review.`,
          detail: 'Review Sandbox code diff and submit permission controls in the Security Sandbox.'
        };

        setLogs(prev => [...prev, gateLog]);
        setSandboxLogs(prev => [
          ...prev,
          `$ git checkout -b feature/sandbox-${step.taskId}`,
          `$ npm run build --staging`,
          `STAGE COMPLETED: Staged release details awaiting client-supervisor merge authority.`,
        ]);

        // Transition task to HITL block
        setTasks(prev => prev.map(t => {
          if (t.id === step.taskId) {
            return {
              ...t,
              state: 'HITL',
              githubBranch: 'feature/coupon-sanitize',
              codeDiff: step.diffUpdate || t.codeDiff,
              terminalOutput: step.terminalOutput || t.terminalOutput,
              innerMonologue: {
                ...t.innerMonologue,
                [step.activeAgent]: step.monologue
              } as Record<AgentRole, string>
            };
          }
          return t;
        }));

        // Put active agents to standby
        setAgents(prev => prev.map(a => ({
          ...a,
          status: a.id === 'CEO' ? 'ACTIVE' : 'SLEEPING',
          currentGoal: a.id === 'CEO' ? 'Awaiting Human-In-The-Loop authorization.' : 'Idling...'
        })));

        return;
      }

      // Proactively handle standard transitions
      setTasks(prev => prev.map(t => {
        if (t.id === step.taskId) {
          const currentMonologues = t.innerMonologue || {};
          return {
            ...t,
            state: step.targetState,
            specDoc: step.specUpdate || t.specDoc,
            codeDiff: step.diffUpdate || t.codeDiff,
            terminalOutput: step.terminalOutput || t.terminalOutput,
            costAccumulated: t.costAccumulated + step.costIncurred,
            tokensUsed: t.tokensUsed + step.tokensUsed,
            updatedAt: new Date().toISOString(),
            innerMonologue: {
              ...currentMonologues,
              [step.activeAgent]: step.monologue
            } as Record<AgentRole, string>
          };
        }
        return t;
      }));

      // Adjust Agent metrics
      setAgents(prev => prev.map(a => {
        if (a.id === step.activeAgent) {
          return {
            ...a,
            status: step.targetState === 'QA' ? 'CODE_RUNNING' : 'ACTIVE',
            currentGoal: step.agentGoal,
            totalTokens: a.totalTokens + step.tokensUsed,
            costSpent: a.costSpent + step.costIncurred,
          };
        }
        // Set others to idle
        return {
          ...a,
          status: a.status === 'CODE_RUNNING' ? 'CODE_RUNNING' : 'SLEEPING'
        };
      }));

      // Adjust logs
      const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
      const newLog: SwarmLog = {
        id: `sim-log-${Date.now()}`,
        timestamp,
        agentId: step.activeAgent,
        level: step.logLevel,
        message: step.logMessage,
        detail: step.logDetail || step.monologue
      };
      setLogs(prev => [...prev, newLog]);

      // Sandbox compilation update logs
      if (step.terminalOutput) {
        setSandboxLogs(prev => [
          ...prev,
          `$ Running sandbox verification checks on task ${step.taskId}...`,
          ...step.terminalOutput!.split('\n')
        ]);
      } else {
        setSandboxLogs(prev => [...prev, `$ [${step.activeAgent}] advanced queue status to: ${step.targetState}`]);
      }

      // Global Stats
      setStats(prev => ({
        ...prev,
        systemState: 'RUNNING',
        totalBudgetUsed: prev.totalBudgetUsed + step.costIncurred,
        tokenBurnRate: step.tokensUsed / 15
      }));

    }, tickMs);

    return () => clearInterval(interval);
  }, [isSimulating, simulationSpeed, isSystemKilled, simulationSteps]);

  // --- Swarm Actions Inputs ---

  const handleInitializeVenture = (
    name: string, 
    pitch: string, 
    techStack: string, 
    focusMetric: string, 
    customBacklog: Task[],
    updatedAgents: Agent[]
  ) => {
    setIsSimulating(false);
    setTasks(customBacklog);
    setAgents(updatedAgents);
    setSandboxLogs([
      `SWARM RE-CHOREOGRAPHY ALIGNED: Booting "${name}" workspace...`,
      `Mapping software environments: ${techStack}`,
      `Configuring telemetry objective quality gates: ${focusMetric}`,
      `Virtual air-gapped container sandboxes configured. Swarm online.`,
    ]);

    const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
    const bootstrapLog: SwarmLog = {
      id: `system-startup-${Date.now()}`,
      timestamp,
      agentId: 'CEO',
      level: 'SUCCESS',
      message: `🛸 SWARM VENTURE RE-ALIGNED SUCCESSFULLY: Launched ${name}!`,
      detail: `Integrated tech stack: ${techStack}. Product focus: ${focusMetric}`
    };

    setLogs([bootstrapLog]);
    setStats({
      systemState: 'RUNNING',
      totalBudgetUsed: 0.15, // genesis spec grooming spent
      maxBudget: 250.00,
      tokenBurnRate: 350,
      cooldownCounter: 0
    });

    stepIndexRef.current = -1;
    setActiveTab('hq');
  };

  // Handle human-in-the-loop validation approvals (Approve & Deploy)
  const handleApproveDeploy = (taskId: string) => {
    // Increment stats and mark task deployed
    setTasks(prev => prev.map(t => {
      if (t.id === taskId) {
        return {
          ...t,
          state: 'MERGED',
          updatedAt: new Date().toISOString()
        };
      }
      return t;
    }));

    // Trigger growth marketing event
    const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });

    const deployLog: SwarmLog = {
      id: `prod-deploy-${Date.now()}`,
      timestamp,
      agentId: 'QA',
      level: 'SUCCESS',
      message: `🚀 FEATURE MERGE SUCCESSFUL: Branch feature/coupon-sanitize successfully launched in PROD!`,
      detail: 'Secure deployment sequence completed. No regressions mapped.'
    };

    const marketingLog: SwarmLog = {
      id: `mkt-bulletin-${Date.now()}`,
      timestamp,
      agentId: 'MKT',
      level: 'SUCCESS',
      message: `🎨 Marketing Agent generated release bulletins for ${taskId}`,
      detail: 'Pushed mobile workspace checkout notices: Safer, fault-tolerant payment inputs.'
    };

    setLogs(prev => [...prev, deployLog, marketingLog]);
    setSandboxLogs(prev => [
      ...prev,
      `$ git checkout main`,
      `$ git merge feature/sandbox-${taskId} --ff-only`,
      `$ docker-compose push live-server-cl9`,
      `PROD DELTA INGESTED SUCCESSFULLY. CDN purge completed.`,
    ]);

    // Update Marketing metrics & agent standby statuses
    setAgents(prev => prev.map(a => {
      if (a.id === 'MKT') {
        return {
          ...a,
          prsMerged: a.prsMerged + 1,
          status: 'ACTIVE',
          currentGoal: 'Promoting task deployment metrics. Drafting social releases.',
          totalTokens: a.totalTokens + 4000,
          costSpent: a.costSpent + 0.05
        };
      }
      return { ...a, status: 'SLEEPING', currentGoal: 'Standby mode...' };
    }));

    // Resume standard simulating cycles
    setIsSimulating(true);
    setStats(prev => ({
      ...prev,
      systemState: 'RUNNING',
      totalBudgetUsed: prev.totalBudgetUsed + 0.05
    }));
  };

  // Handle manual critique-retrain input feedbacks
  const handleRejectRetrain = (taskId: string, userFeedback: string) => {
    // Send task back to dev branch
    setTasks(prev => prev.map(t => {
      if (t.id === taskId) {
        return {
          ...t,
          state: 'DEV',
          updatedAt: new Date().toISOString()
        };
      }
      return t;
    }));

    const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });

    const rejectLog: SwarmLog = {
      id: `user-critique-${Date.now()}`,
      timestamp,
      agentId: 'DEV',
      level: 'ERROR',
      message: `⚖️ MERGE DEFERRED BY COMMANDER: Re-training DEV agent.`,
      detail: `Correction notes: "${userFeedback}"`
    };

    setLogs(prev => [...prev, rejectLog]);
    setSandboxLogs(prev => [
      ...prev,
      `$ PULL REQUEST DEFERRED BY MANUAL HITL GATEKEEPER`,
      `$ feed-back ingested: "${userFeedback}"`,
      `$ reverting branch feature/sandbox-${taskId} back to DEV. Refactoring...`
    ]);

    // Wake up DEV and sleep QA
    setAgents(prev => prev.map(a => {
      if (a.id === 'DEV') {
        return {
          ...a,
          status: 'ACTIVE',
          currentGoal: `Ingesting manual gate review directives: ${userFeedback}`,
          totalTokens: a.totalTokens + 1500,
          costSpent: a.costSpent + 0.03
        };
      }
      return { ...a, status: 'SLEEPING' };
    }));

    // Temporarily re-activate simulation to auto-generate the adjusted fix (loops back safely)
    setTimeout(() => {
      setIsSimulating(true);
    }, 1500);
  };

  const handleGlobalKillReset = () => {
    if (isSystemKilled) {
      setIsSystemKilled(false);
      setStats(prev => ({ ...prev, systemState: 'IDLE' }));
      const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
      setLogs(prev => [...prev, {
        id: `system-unsuspended-${Date.now()}`,
        timestamp,
        agentId: 'CEO',
        level: 'INFO',
        message: 'System suspension lifted. Swarm orchestration parameters restored.'
      }]);
    } else {
      setIsSystemKilled(true);
      setIsSimulating(false);
      setStats(prev => ({ ...prev, systemState: 'CRITICAL', tokenBurnRate: 0 }));
      const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
      setLogs(prev => [...prev, {
        id: `system-suspended-${Date.now()}`,
        timestamp,
        agentId: 'CEO',
        level: 'ERROR',
        message: '🚨 GLOBAL EMERGENCY SHUTDOWN SUSPENDED WORKFLOWS!'
      }]);
    }
  };

  const handleAddTask = (title: string, desc: string, source: 'customer' | 'strategy' | 'internal') => {
    const taskId = `TASK-00${tasks.length + 1}`;
    const newTask: Task = {
      id: taskId,
      title,
      description: desc,
      state: 'FEEDBACK',
      source,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      costAccumulated: 0,
      tokensUsed: 0,
      innerMonologue: {}
    };

    setTasks(prev => [newTask, ...prev]);

    const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
    setLogs(prev => [...prev, {
      id: `user-ticket-${Date.now()}`,
      timestamp,
      agentId: 'SUPPORT',
      level: 'INFO',
      message: `🔔 New inbound triage ticket: Submitting ${taskId} into task backlog queue...`,
      detail: title
    }]);
  };

  const handleResetSimulation = () => {
    localStorage.removeItem('vac_agents');
    localStorage.removeItem('vac_tasks');
    localStorage.removeItem('vac_logs');
    localStorage.removeItem('vac_stats');
    localStorage.removeItem('vac_sandbox_logs');
    setAgents(INITIAL_AGENTS);
    setTasks(INITIAL_TASKS);
    setLogs(INITIAL_LOGS);
    setSandboxLogs([
      'SYSTEM DETACHED MODE: Decoupled Multi-Agent environment mapped.',
      'Container isolation validated: Sandbox environment idle.',
      'Initialized at Port 3000. Listening for build triggers...',
    ]);
    setStats({
      systemState: 'IDLE',
      totalBudgetUsed: 12.40,
      maxBudget: 250.00,
      tokenBurnRate: 0,
      cooldownCounter: 0
    });
    setIsSimulating(false);
    setIsSystemKilled(false);
    stepIndexRef.current = -1;
  };

  if (showLanding) {
    return (
      <LandingPage
        onEnterDashboard={() => setShowLanding(false)}
        readmeText={docReadme}
        architectureText={docArchitecture}
        installText={docInstall}
        dockerComposeText={docCompose}
      />
    );
  }

  return (
    <div className="min-h-screen bg-bg-density-dark text-slate-300 flex flex-col font-sans select-none pb-8 selection:bg-indigo-505/30 selection:text-white">
      {/* Upper Navigation Rail */}
      <header className="border-b border-slate-800 bg-bg-density-card sticky top-0 z-45">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-12 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-6 h-6 bg-blue-650 rounded flex items-center justify-center font-bold text-white text-xs bg-blue-600">
              V
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xs font-bold uppercase tracking-tight text-white font-mono">
                  SWARM: DETACHED-VENTURE-COMPANY
                </h1>
                <span className="text-[9px] uppercase font-mono px-1.5 py-0.5 rounded bg-blue-900/40 text-blue-400 border border-blue-800 font-bold">
                  v1.2-STABLE
                </span>
              </div>
            </div>
          </div>

          {/* Sub menu tabs */}
          <nav className="hidden md:flex bg-[#12151a] p-1 border border-slate-800 rounded text-[10px] font-mono font-bold">
            <button
              onClick={() => setActiveTab('hq')}
              className={`px-3 py-1 rounded transition-colors cursor-pointer ${
                activeTab === 'hq' ? 'bg-bg-density-tab text-white border border-slate-800/80 shadow' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              📊 Telemetry HQ
            </button>
            <button
              onClick={() => setActiveTab('incubator')}
              className={`px-3 py-1 rounded transition-colors cursor-pointer ${
                activeTab === 'incubator' ? 'bg-bg-density-tab text-white border border-slate-800/80 shadow' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              🛸 Venture Incubator
            </button>
            <button
              onClick={() => setActiveTab('kanban')}
              className={`px-3 py-1 rounded transition-colors cursor-pointer ${
                activeTab === 'kanban' ? 'bg-bg-density-tab text-white border border-slate-800/80 shadow' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              📋 Kanban Board
            </button>
            <button
              onClick={() => setActiveTab('logs')}
              className={`px-3 py-1 rounded transition-colors cursor-pointer ${
                activeTab === 'logs' ? 'bg-bg-density-tab text-white border border-slate-800/80 shadow' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              🧠 Cog Explorer
            </button>
            <button
              onClick={() => setActiveTab('gates')}
              className={`px-3 py-1 rounded transition-colors cursor-pointer relative ${
                activeTab === 'gates' ? 'bg-bg-density-tab text-white border border-slate-800/80 shadow' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              🛡️ Sandbox Gate
              {tasks.filter(t => t.state === 'HITL').length > 0 && (
                <span className="absolute top-1 right-1 w-1.5 h-1.5 rounded-full bg-rose-500 animate-ping" />
              )}
            </button>
          </nav>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowLanding(true)}
              className="px-2.5 py-1 bg-[#161a22] border border-slate-800 hover:border-slate-700 hover:bg-[#1c222e] rounded text-[9px] text-[#4299e1] font-mono font-bold flex items-center gap-1 cursor-pointer transition-all"
            >
              <Home className="w-3 h-3 text-blue-400" />
              Open Source Landing & Docs
            </button>
            
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)] animate-pulse"></div>
              <span className="text-[10px] font-medium text-slate-300">SYSTEM ACTIVE</span>
            </div>
            <div className="text-right text-[10px] font-mono text-slate-500 hidden sm:block">
              2026-MAY-27 13:39:56 UTC
            </div>
          </div>
        </div>
      </header>

      {/* Main dashboard screens viewport layout */}
      <main className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 mt-6 flex-1">
        {/* Mobile Tabs navigation segments */}
        <div className="flex md:hidden bg-bg-density-sidebar border border-slate-850 rounded p-1 mb-4 font-mono text-[9px] font-bold justify-between">
          <button
            onClick={() => setActiveTab('hq')}
            className={`px-2 py-1 rounded flex-1 text-center cursor-pointer transition-all ${activeTab === 'hq' ? 'bg-bg-density-tab text-white border border-slate-800/80 shadow' : 'text-slate-450 text-slate-400 hover:text-white'}`}
          >
            📊 HQ
          </button>
          <button
            onClick={() => setActiveTab('incubator')}
            className={`px-2 py-1 rounded flex-1 text-center cursor-pointer transition-all ${activeTab === 'incubator' ? 'bg-bg-density-tab text-white border border-slate-800/80 shadow' : 'text-slate-450 text-slate-400 hover:text-white'}`}
          >
            🛸 Venture
          </button>
          <button
            onClick={() => setActiveTab('kanban')}
            className={`px-2 py-1 rounded flex-1 text-center cursor-pointer transition-all ${activeTab === 'kanban' ? 'bg-bg-density-tab text-white border border-slate-800/80 shadow' : 'text-slate-450 text-slate-400 hover:text-white'}`}
          >
            📋 Backlog
          </button>
          <button
            onClick={() => setActiveTab('logs')}
            className={`px-2 py-1 rounded flex-1 text-center cursor-pointer transition-all ${activeTab === 'logs' ? 'bg-bg-density-tab text-white border border-slate-800/80 shadow' : 'text-slate-450 text-slate-400 hover:text-white'}`}
          >
            🧠 AI Cog
          </button>
          <button
            onClick={() => setActiveTab('gates')}
            className={`px-2 py-1 rounded flex-1 text-center cursor-pointer transition-all relative ${activeTab === 'gates' ? 'bg-bg-density-tab text-white border border-slate-800/80 shadow' : 'text-slate-450 text-slate-400 hover:text-white'}`}
          >
            🛡️ Sandbox
            {tasks.filter(t => t.state === 'HITL').length > 0 && (
              <span className="absolute top-1 right-1 w-1.5 h-1.5 rounded-full bg-rose-500 animate-ping" />
            )}
          </button>
        </div>

        {/* Viewport render router */}
        {activeTab === 'hq' && (
          <HQCore
            agents={agents}
            logs={logs}
            stats={stats}
            isSimulating={isSimulating}
            simulationSpeed={simulationSpeed}
            onToggleSimulation={() => setIsSimulating(!isSimulating)}
            onResetSimulation={handleResetSimulation}
            onSetSpeed={setSimulationSpeed}
            onSelectAgent={(agentId) => {
              setSelectedAgentId(agentId as AgentRole);
              setActiveTab('logs');
            }}
            onLaunchCustomSimulation={handleLaunchCustomProduct}
          />
        )}

        {activeTab === 'incubator' && (
          <VentureIncubator
            agents={agents}
            tasks={tasks}
            onInitializeVenture={handleInitializeVenture}
            logs={logs}
          />
        )}

        {activeTab === 'kanban' && (
          <KanbanBoard
            tasks={tasks}
            onAddTask={handleAddTask}
          />
        )}

        {activeTab === 'logs' && (
          <LogsExplorer
            agents={agents}
            onUpdateAgentConfig={(id, conf) => {
              setAgents(prev => prev.map(a => (a.id === id ? { ...a, ...conf } : a)));
            }}
            selectedAgentId={selectedAgentId}
            onSelectAgent={setSelectedAgentId}
            sandboxLogs={sandboxLogs}
          />
        )}

        {activeTab === 'gates' && (
          <SecuritySandbox
            tasks={tasks}
            onApproveDeploy={handleApproveDeploy}
            onRejectRetrain={handleRejectRetrain}
            onGlobalKillReset={handleGlobalKillReset}
            isSystemKilled={isSystemKilled}
            onInitializeVenture={handleInitializeVenture}
          />
        )}
      </main>

      <CommandPalette
        isOpen={isPaletteOpen}
        onClose={() => setIsPaletteOpen(false)}
        onSelectAction={handlePaletteAction}
        isSimulating={isSimulating}
        isSystemKilled={isSystemKilled}
      />
    </div>
  );
}
