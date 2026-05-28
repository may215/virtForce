export type AgentRole = 'CEO' | 'PM' | 'DEV' | 'QA' | 'MKT' | 'SALES' | 'SUPPORT' | 'DEVOPS';

export interface Agent {
  id: AgentRole;
  name: string;
  avatar: string;
  roleTitle: string;
  description: string;
  status: 'ACTIVE' | 'SLEEPING' | 'CODE_RUNNING' | 'STUCK';
  currentGoal: string;
  totalTokens: number;
  costSpent: number;
  prsMerged: number;
  // Configuration parameters
  model: string;
  temperature: number;
  maxTokens: number;
  systemInstruction: string;
  backstory?: string;
  verbosity?: boolean;
  tools?: string[];
}

export type TaskState = 'FEEDBACK' | 'BACKLOG' | 'SPEC' | 'DEV' | 'QA' | 'HITL' | 'MERGED';

export interface Task {
  id: string;
  title: string;
  description: string;
  state: TaskState;
  source: 'customer' | 'strategy' | 'internal';
  assignedTo?: AgentRole;
  githubBranch?: string;
  specDoc?: string;
  codeDiff?: {
    file: string;
    additions: string[];
    deletions: string[];
  };
  innerMonologue?: Partial<Record<AgentRole, string>>;
  terminalOutput?: string;
  costAccumulated: number;
  tokensUsed: number;
  createdAt: string;
  updatedAt: string;
}

export interface SwarmLog {
  id: string;
  timestamp: string;
  agentId: AgentRole;
  level: 'THOUGHT' | 'TOOL_CALL' | 'INFO' | 'SUCCESS' | 'ERROR';
  message: string;
  detail?: string;
}

export interface SwarmStats {
  systemState: 'RUNNING' | 'PAUSED' | 'IDLE' | 'CRITICAL';
  totalBudgetUsed: number;
  maxBudget: number;
  tokenBurnRate: number; // tokens/second
  cooldownCounter: number; // QA fail count
}

export interface SimulationStep {
  taskId: string;
  targetState: TaskState;
  activeAgent: AgentRole;
  agentGoal: string;
  logMessage: string;
  logDetail?: string;
  logLevel: 'THOUGHT' | 'TOOL_CALL' | 'INFO' | 'SUCCESS' | 'ERROR';
  specUpdate?: string;
  diffUpdate?: {
    file: string;
    additions: string[];
    deletions: string[];
  };
  terminalOutput?: string;
  costIncurred: number;
  tokensUsed: number;
  monologue: string;
}
