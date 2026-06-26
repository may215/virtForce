import { useState, useEffect, useRef, useCallback } from 'react';
import { Agent, Task, SwarmLog, SwarmStats, TaskState, AgentRole } from '../types';
import { INITIAL_AGENTS, INITIAL_TASKS, INITIAL_LOGS, SIMULATION_STEPS } from '../mockData';
import { generateDynamicSimulation } from '../utils/dynamicSimulation';

export function useSwarmSimulation() {
  const [agents, setAgents] = useState<Agent[]>(INITIAL_AGENTS);
  const [tasks, setTasks] = useState<Task[]>(INITIAL_TASKS);
  const [logs, setLogs] = useState<SwarmLog[]>(INITIAL_LOGS);
  const [stats, setStats] = useState<SwarmStats>({
    systemState: 'IDLE',
    totalBudgetUsed: 12.40,
    maxBudget: 250.00,
    tokenBurnRate: 0,
    cooldownCounter: 0
  });
  const [sandboxLogs, setSandboxLogs] = useState<string[]>([
    'SYSTEM DETACHED MODE: Decoupled Multi-Agent environment mapped.',
    'Container isolation validated: Sandbox environment idle.',
    'Initialized at Port 3000. Listening for build triggers...',
  ]);

  const [isSimulating, setIsSimulating] = useState(false);
  const [simulationSpeed, setSimulationSpeed] = useState(1);
  const [isSystemKilled, setIsSystemKilled] = useState(false);
  const [simulationSteps, setSimulationSteps] = useState(() => SIMULATION_STEPS);
  const [recentSreReportId, setRecentSreReportId] = useState<string | null>(null);

  const stepIndexRef = useRef(-1);
  const isLoadedRef = useRef(false);

  // Load backend state on mount
  useEffect(() => {
    fetch('/api/state')
      .then(res => res.json())
      .then(data => {
        if (data && data.agents) {
          setAgents(data.agents);
          setTasks(data.tasks);
          setLogs(data.logs);
          setStats(data.stats);
          setSandboxLogs(data.sandboxLogs);
        }
        isLoadedRef.current = true;
      })
      .catch(err => {
        console.error('Failed to load backend state, using initial mock data.', err);
        isLoadedRef.current = true;
      });
  }, []);

  // Sync state to backend API periodically when it changes
  useEffect(() => {
    if (!isLoadedRef.current) return;
    
    const timeout = setTimeout(() => {
      fetch('/api/state', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ agents, tasks, logs, stats, sandboxLogs })
      }).catch(err => console.error('Failed to persist backend state:', err));
    }, 1000);

    return () => clearTimeout(timeout);
  }, [agents, tasks, logs, stats, sandboxLogs]);

  useEffect(() => {
    if (!isSimulating || isSystemKilled) return;

    const tickMs = 6000 / simulationSpeed;

    const interval = setInterval(() => {
      stepIndexRef.current = (stepIndexRef.current + 1) % simulationSteps.length;
      const step = simulationSteps[stepIndexRef.current];

      if (step.targetState === 'HITL') {
        setIsSimulating(false);
        setStats(prev => ({ ...prev, systemState: 'IDLE', tokenBurnRate: 0 }));

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

        setAgents(prev => prev.map(a => ({
          ...a,
          status: a.id === 'CEO' ? 'ACTIVE' : 'SLEEPING',
          currentGoal: a.id === 'CEO' ? 'Awaiting Human-In-The-Loop authorization.' : 'Idling...'
        })));

        return;
      }

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
        return {
          ...a,
          status: a.status === 'CODE_RUNNING' ? 'CODE_RUNNING' : 'SLEEPING'
        };
      }));

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

      if (step.terminalOutput) {
        setSandboxLogs(prev => [
          ...prev,
          `$ Running sandbox verification checks on task ${step.taskId}...`,
          ...step.terminalOutput!.split('\n')
        ]);
      } else {
        setSandboxLogs(prev => [...prev, `$ [${step.activeAgent}] advanced queue status to: ${step.targetState}`]);
      }

      setStats(prev => ({
        ...prev,
        systemState: 'RUNNING',
        totalBudgetUsed: prev.totalBudgetUsed + step.costIncurred,
        tokenBurnRate: step.tokensUsed / 15
      }));

    }, tickMs);

    return () => clearInterval(interval);
  }, [isSimulating, simulationSpeed, isSystemKilled, simulationSteps]);

  const handleLaunchCustomProduct = (name: string, desc: string, provider: string, model: string, cb: () => void) => {
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
    stepIndexRef.current = -1;
    cb();
    setIsSimulating(true);
  };

  const handleInitializeVenture = (
    name: string, 
    pitch: string, 
    techStack: string, 
    focusMetric: string, 
    customBacklog: Task[],
    updatedAgents: Agent[],
    cb: () => void
  ) => {
    setIsSimulating(false);
    
    setTasks(customBacklog.map((t, idx) => ({ ...t, id: `TASK-10${idx + 1}` })));
    setAgents(updatedAgents.map(a => ({ ...a, status: 'SLEEPING', currentGoal: 'Analyzing venture requirements...' })));
    setLogs([{
      id: `startup-log-0`,
      timestamp: new Date().toLocaleTimeString(),
      agentId: 'CEO',
      level: 'INFO',
      message: `🚀 INITIALIZED VENTURE: ${name} | ${pitch}`,
      detail: `Tech Stack: ${techStack} | Target: ${focusMetric}`
    }]);
    setSandboxLogs([
      `$ mkdir ${name.toLowerCase().replace(/\s+/g, '-')}`,
      `$ cd ${name.toLowerCase().replace(/\s+/g, '-')}`,
      `$ git init`,
      `Initialized empty Git repository for ${name}.`
    ]);
    
    setStats({
      systemState: 'IDLE',
      totalBudgetUsed: 0.15,
      maxBudget: 250.00,
      tokenBurnRate: 0,
      cooldownCounter: 0
    });
    
    cb();
  };

  const handleApproveDeploy = (taskId: string, branch: string, cb?: () => void) => {
    setTasks(prev => prev.map(t => {
      if (t.id === taskId) {
        if (t.source === 'sre') {
          setRecentSreReportId(taskId);
        }
        return {
          ...t,
          state: 'MERGED',
          innerMonologue: {
            ...t.innerMonologue,
            CEO: `Approved deployment for ${taskId}. Code merged from ${branch}. Sandbox containers verified green.`
          } as Record<AgentRole, string>
        };
      }
      return t;
    }));

    setLogs(prev => [...prev, {
      id: `merge-log-${Date.now()}`,
      timestamp: new Date().toLocaleTimeString(),
      agentId: 'CEO',
      level: 'SUCCESS',
      message: `✅ MERGED AND DEPLOYED: Task ${taskId} via ${branch}.`,
      detail: 'Client signature verified. Sandbox environment torn down. Pushing to Cloud Run.'
    }]);

    setSandboxLogs(prev => [...prev, `$ git merge ${branch}`, `$ docker push container-registry.local/${branch}`, `SUCCESS: Deployed to production edge.`]);
    setStats(prev => ({ ...prev, systemState: 'RUNNING' }));
    if (cb) cb();
    setIsSimulating(true);
  };

  const handleRejectRetrain = (taskId: string, feedback: string) => {
    setTasks(prev => prev.map(t => {
      if (t.id === taskId) {
        return {
          ...t,
          state: 'DEV',
          description: `${t.description}\n\n[ADMIN FEEDBACK]: ${feedback}`,
          innerMonologue: {
            ...t.innerMonologue,
            DEV: `Feedback received: "${feedback}". Re-entering code edit loops to satisfy criteria.`
          } as Record<AgentRole, string>
        };
      }
      return t;
    }));

    setAgents(prev => prev.map(a => {
      if (a.id === 'DEV' || a.id === 'PM') {
        return { ...a, status: 'ACTIVE', currentGoal: 'Ingesting HITL feedback and re-planning approach.' };
      }
      return a;
    }));

    setLogs(prev => [...prev, {
      id: `reject-log-${Date.now()}`,
      timestamp: new Date().toLocaleTimeString(),
      agentId: 'CEO',
      level: 'ERROR',
      message: `⚠️ TASK REJECTED: ${taskId} sent back to DEV.`,
      detail: `Client provided feedback: ${feedback}`
    }]);

    setSandboxLogs(prev => [...prev, `$ ERROR: Deploy rejected. Commits reverted. Back to development branch.`]);
    setStats(prev => ({ ...prev, systemState: 'RUNNING' }));
    setIsSimulating(true);
  };

  const handleGlobalKillReset = () => {
    setIsSystemKilled(true);
    setIsSimulating(false);
    setStats(prev => ({ ...prev, systemState: 'CRITICAL' }));
    setSandboxLogs(prev => [...prev, `[SIGKILL] received. Terminating all background daemons...`, `Swarm killed.`]);
    setLogs(prev => [...prev, {
      id: `kill-log-${Date.now()}`,
      timestamp: new Date().toLocaleTimeString(),
      agentId: 'CEO',
      level: 'ERROR',
      message: `🛑 EMERGENCY STOP: All agent containers halted.`,
      detail: 'Manual killswitch engaged by client.'
    }]);
  };

  const handleMoveTask = (taskId: string, newState: TaskState) => {
    setTasks(prev => prev.map(t => t.id === taskId ? { ...t, state: newState } : t));
  };

  const handleAddTask = (title: string, desc: string, source: 'customer' | 'strategy' | 'internal' | 'sre') => {
    const taskId = `TASK-00${tasks.length + 1}`;
    const newTask: Task = {
      id: taskId,
      title,
      description: desc,
      state: 'FEEDBACK',
      source,
      assignedTo: 'PM',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      costAccumulated: 0,
      tokensUsed: 0
    };
    
    setTasks(prev => [newTask, ...prev]);
    setLogs(prev => [...prev, {
      id: `task-log-${Date.now()}`,
      timestamp: new Date().toLocaleTimeString(),
      agentId: 'PM',
      level: 'INFO',
      message: `📥 NEW INBOUND TICKET: [${source.toUpperCase()}] ${title}`,
      detail: `Triaging new request to backlog.`
    }]);
  };

  const handleTriggerRollback = (nodeId: string, nodeName: string, cb1: () => void, cb2: () => void) => {
    const taskId = `RB-${Math.floor(Math.random() * 10000) + 1000}`;
    const rollbackTask: Task = {
      id: taskId,
      title: `Emergency Rollback: ${nodeName}`,
      description: `SRE Incident: User triggered manual rollback for service ${nodeName} (${nodeId}). Reverting to previous stable deployment.`,
      state: 'BACKLOG',
      source: 'sre',
      assignedTo: 'DEV',
      githubBranch: `revert/${nodeId}-stable`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      costAccumulated: 0.12,
      tokensUsed: 1500,
      innerMonologue: {
        CEO: `Emergency rollback initiated for ${nodeName}. Handing off to DEV to execute reversion.`,
        DEV: `Locating previous stable container image hash for ${nodeId}... Initiating hot swap.`
      }
    };
    
    setTasks(prev => [rollbackTask, ...prev]);
    cb1();
    
    setTimeout(() => {
      setTasks(prev => prev.map(t => t.id === taskId ? { ...t, state: 'DEV' } : t));
    }, 1500);
    
    setTimeout(() => {
      setTasks(prev => prev.map(t => t.id === taskId ? { 
        ...t, 
        state: 'QA',
        terminalOutput: `> docker pull stable-image-${nodeId}\n> Initializing staging swap...\n> Smoke tests running... PASS.`
      } : t));
    }, 3500);
    
    setTimeout(() => {
      setTasks(prev => prev.map(t => t.id === taskId ? { ...t, state: 'HITL' } : t));
      cb2();
    }, 5500);
  };

  const handleResetSimulation = () => {
    setAgents(INITIAL_AGENTS);
    setTasks(INITIAL_TASKS);
    setLogs(INITIAL_LOGS);
    setStats({
      systemState: 'IDLE',
      totalBudgetUsed: 12.40,
      maxBudget: 250.00,
      tokenBurnRate: 0,
      cooldownCounter: 0
    });
    setSandboxLogs([
      'SYSTEM DETACHED MODE: Decoupled Multi-Agent environment mapped.',
      'Container isolation validated: Sandbox environment idle.',
      'Initialized at Port 3000. Listening for build triggers...',
    ]);
    setIsSystemKilled(false);
    setIsSimulating(false);
    setSimulationSteps(SIMULATION_STEPS);
    stepIndexRef.current = -1;
  };

  return {
    agents, setAgents,
    tasks, setTasks,
    logs, setLogs,
    stats, setStats,
    sandboxLogs, setSandboxLogs,
    isSimulating, setIsSimulating,
    simulationSpeed, setSimulationSpeed,
    isSystemKilled, setIsSystemKilled,
    simulationSteps, setSimulationSteps,
    recentSreReportId, setRecentSreReportId,
    handleLaunchCustomProduct,
    handleInitializeVenture,
    handleApproveDeploy,
    handleRejectRetrain,
    handleGlobalKillReset,
    handleMoveTask,
    handleAddTask,
    handleTriggerRollback,
    handleResetSimulation
  };
}
