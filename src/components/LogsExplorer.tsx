import React, { useState, useEffect, useRef } from 'react';
import { 
  Bot, 
  Terminal, 
  Send, 
  Sliders, 
  Cpu, 
  Check, 
  Folder, 
  FileCode, 
  FileText, 
  FileJson, 
  RefreshCw, 
  AlertTriangle,
  Sparkles,
  Layers,
  HelpCircle
} from 'lucide-react';
import { Agent, SwarmLog, Task } from '../types';

interface LogsExplorerProps {
  selectedAgentId: string;
  onSelectAgent: (id: string | null) => void;
  agents: Agent[];
  onUpdateAgentConfig?: (agentId: string, updates: Partial<Agent>) => void;
  sandboxLogs?: string[];
  logs?: SwarmLog[];
  tasks?: Task[];
}

export function LogsExplorer({
  selectedAgentId,
  onSelectAgent,
  agents,
  onUpdateAgentConfig,
  sandboxLogs = [],
  logs = [],
  tasks = []
}: LogsExplorerProps) {
  const [activeSubTab, setActiveSubTab] = useState<'monologue' | 'chat' | 'config' | 'openhands'>('monologue');
  const [chatInput, setChatInput] = useState('');
  const [chatMessages, setChatMessages] = useState<Record<string, { role: 'user' | 'agent'; text: string; timestamp: string }[]>>({});
  const [isChatTyping, setIsChatTyping] = useState(false);
  
  // Custom CrewAI Config weights
  const [model, setModel] = useState('gemini-3.5-flash');
  const [temp, setTemp] = useState(0.2);
  const [maxT, setMaxT] = useState(4096);
  const [verbosity, setVerbosity] = useState(true);
  const [backstory, setBackstory] = useState('');
  const [tools, setTools] = useState<string[]>([]);
  const [sysInst, setSysInst] = useState('');
  const [isSaved, setIsSaved] = useState(false);

  // OpenHands IDE State
  const [selectedFileName, setSelectedFileName] = useState<string>('CheckoutScreen.tsx');

  const activeAgent = agents.find(a => a.id === selectedAgentId) || agents[0];
  const activeAgentLogs = logs.filter(l => l.agentId === activeAgent.id);
  const activeAgentTasks = tasks.filter(t => t.assignedTo === activeAgent.id);

  const chatEndRef = useRef<HTMLDivElement>(null);
  const monologueEndRef = useRef<HTMLDivElement>(null);
  const terminalEndRef = useRef<HTMLDivElement>(null);

  // Sync state with active agent config
  useEffect(() => {
    if (activeAgent) {
      setModel(activeAgent.model || 'gemini-3.5-flash');
      setTemp(activeAgent.temperature ?? 0.2);
      setMaxT(activeAgent.maxTokens ?? 4096);
      setVerbosity(activeAgent.verbosity !== false);
      setBackstory(activeAgent.backstory || `${activeAgent.id} specializes in executing enterprise workflows with highest density telemetry.`);
      setTools(activeAgent.tools || ['GitHub API Client', 'Brave Search Engine']);
      setSysInst(activeAgent.systemInstruction || `You are ${activeAgent.name}. Adhere strictly to strict high density guidelines.`);
      setIsSaved(false);
    }
  }, [activeAgent]);



  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatMessages, isChatTyping]);

  useEffect(() => {
    monologueEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [activeAgentLogs]);

  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [sandboxLogs]);

  const handleSaveConfig = () => {
    onUpdateAgentConfig(activeAgent.id, {
      model,
      temperature: temp,
      maxTokens: maxT,
      verbosity,
      backstory,
      tools,
      systemInstruction: sysInst
    });
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  const handleSendChat = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim()) return;

    const userMsg = {
      role: 'user' as const,
      text: chatInput,
      timestamp: new Date().toLocaleTimeString()
    };

    setChatMessages(prev => ({
      ...prev,
      [activeAgent.id]: [...(prev[activeAgent.id] || []), userMsg]
    }));
    setChatInput('');
    setIsChatTyping(true);

    // Simulate Agent response
    setTimeout(() => {
      const responses = [
        `Understood. I am cross-referencing your request with the LangGraph state. Initiating automatic refactoring on active task branches.`,
        `Analyzing target checkout files with Gemini. I have prepared an OpenHands sandbox task to test these validation limits.`,
        `Directives logged in SRE workspace. Adjusting CrewAI cooperative weights for maximum operation speed. Let's verify the build outputs next.`
      ];
      const agentMsg = {
        role: 'agent' as const,
        text: responses[Math.floor(Math.random() * responses.length)],
        timestamp: new Date().toLocaleTimeString()
      };
      setChatMessages(prev => ({
        ...prev,
        [activeAgent.id]: [...(prev[activeAgent.id] || []), agentMsg]
      }));
      setIsChatTyping(false);
    }, 1500);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 p-4 antialiased">
      {/* Left Column: Swarm agent select rail */}
      <div className="md:col-span-1 bg-[#222529] border border-slate-800 rounded p-3 space-y-3">
        <div className="flex items-center gap-1.5 border-b border-slate-850 pb-2">
          <Bot className="w-4 h-4 text-blue-400" />
          <span className="text-[10px] font-mono font-bold tracking-wider uppercase text-slate-300">SWARM HIERARCHY</span>
        </div>
        <div className="space-y-1.5 max-h-[480px] overflow-y-auto pr-1">
          {agents.map(ag => {
            const isSelected = ag.id === selectedAgentId;
            return (
              <button
                key={ag.id}
                onClick={() => onSelectAgent(ag.id)}
                className={`w-full text-left p-2 rounded border transition-all cursor-pointer flex items-center justify-between group ${
                  isSelected 
                    ? 'bg-blue-950/20 border-blue-900 text-white' 
                    : 'bg-[#19171d] border-slate-850 hover:bg-[#222529] text-slate-400'
                }`}
              >
                <div className="space-y-0.5 min-w-0 flex-1">
                  <div className="flex items-center gap-1.5">
                    <span className="font-mono text-xs font-bold truncate">{ag.name}</span>
                    <span className="text-[8px] bg-[#1a1d24] text-slate-400 px-1 py-0.2 rounded font-mono border border-slate-800 uppercase">
                      {ag.roleTitle}
                    </span>
                  </div>
                  <p className="text-[9px] text-slate-500 truncate">{ag.model}</p>
                </div>
                <span className={`w-1.5 h-1.5 rounded-full ${
                  ag.status === 'ACTIVE' 
                    ? 'bg-emerald-400 animate-pulse' 
                    : ag.status === 'CODE_RUNNING' 
                      ? 'bg-[#00d2ff] animate-pulse' 
                      : 'bg-slate-500'
                }`} />
              </button>
            );
          })}
        </div>
      </div>

      {/* Right Column: Custom Agent Cockpit Tab Controllers */}
      <div className="md:col-span-3 bg-[#222529] border border-slate-800 rounded flex flex-col overflow-hidden min-h-[500px]">
        {/* Sub tabs picker */}
        <div className="bg-[#1164A3] border-b border-slate-850 flex flex-wrap items-center justify-between text-[10px] p-1 gap-1">
          <div className="flex items-center gap-1">
            {[
              { id: 'monologue', name: 'AGENT ANALYTICS & INTERNALS', icon: Layers },
              { id: 'openhands', name: 'OPENHANDS WORKSPACE IDE', icon: Terminal },
              { id: 'chat', name: 'LIVE CO-COMMAND CHAT', icon: Send },
              { id: 'config', name: 'CREWAI COOPERATIVE WEIGHTS', icon: Sliders }
            ].map(tab => {
              const Icon = tab.icon;
              const isSel = activeSubTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveSubTab(tab.id as any)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded font-mono transition-colors font-bold uppercase cursor-pointer ${
                    isSel 
                      ? 'bg-blue-950/40 text-blue-400 border border-blue-900/40' 
                      : 'text-slate-450 hover:text-white'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{tab.name}</span>
                </button>
              );
            })}
          </div>
          <div className="flex items-center gap-2 px-2 py-1 bg-[#19171d] border border-slate-800 rounded font-mono text-[9px] text-slate-400">
            ACTIVE TARGET: <strong className="text-white uppercase">{activeAgent.id}</strong>
          </div>
        </div>

        {/* Tab view contents */}
        <div className="flex-1 p-4 flex flex-col bg-[#07090c]/40">
          {activeSubTab === 'monologue' && (
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 flex-1">
              {/* Agent Active Logs Console */}
              <div className="lg:col-span-3 flex flex-col bg-[#07090c] border border-slate-850 rounded p-3 min-h-[300px] overflow-hidden">
                <div className="flex items-center justify-between border-b border-slate-850 pb-1.5 mb-2">
                  <span className="text-[9px] font-mono text-slate-400 font-bold uppercase">Chain-of-Thought Live Reasonings Stream</span>
                  <span className="text-[8px] font-mono px-1.5 py-0.2 bg-emerald-950/20 text-emerald-400 rounded uppercase">JSON Streaming</span>
                </div>
                
                <div className="flex-1 overflow-y-auto space-y-2 select-text font-mono text-[10px] leading-relaxed max-h-[340px] scrollbar-thin scrollbar-thumb-slate-800 pr-1">
                  {activeAgentLogs.map((log, index) => (
                    <div 
                      key={index} 
                      className={`p-2 rounded border transition-colors ${
                        log.level === 'TOOL_CALL' 
                          ? 'bg-blue-950/10 border-blue-900/20 text-blue-300' 
                          : log.level === 'ERROR' 
                            ? 'bg-rose-950/10 border-rose-900/20 text-rose-300' 
                            : 'bg-[#19171d] border-slate-850 text-slate-350'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1 text-[8px] text-slate-500 font-bold border-b border-slate-850/40 pb-0.5">
                        <span className="uppercase text-slate-400 font-semibold">[AGENT REASONING FRAME]</span>
                        <span>{log.timestamp}</span>
                      </div>
                      <p className="whitespace-pre-wrap">{log.message}</p>
                    </div>
                  ))}
                  {activeAgentLogs.length === 0 && (
                    <div className="text-slate-550 italic text-center py-12">
                      No active stream records recorded. Start the simulation above to initiate agent routines.
                    </div>
                  )}
                  <div ref={monologueEndRef} />
                </div>
              </div>

              {/* Tasks & Associated Context metadata */}
              <div className="lg:col-span-2 space-y-4">
                <div className="bg-[#1a1d21] border border-slate-850 rounded p-3">
                  <div className="flex items-center gap-1 border-b border-slate-850 pb-1.5 mb-2.5">
                    <span className="text-[9px] font-mono font-bold tracking-wider uppercase text-slate-400">Assigned Operational Backlog</span>
                  </div>
                  <div className="space-y-2 max-h-[220px] overflow-y-auto pr-1">
                    {activeAgentTasks.map(task => (
                      <div key={task.id} className="p-2 rounded bg-[#19171d] border border-slate-805 space-y-1">
                        <div className="flex items-center justify-between text-[8px] font-mono">
                          <span className="text-blue-400 font-bold">TASK-{task.id}</span>
                          <span className={`px-1 py-0.2 rounded font-bold ${
                            task.state === 'MERGED' 
                              ? 'bg-emerald-950 text-emerald-400' 
                              : task.state === 'QA' || task.state === 'HITL' || task.state === 'DEV'
                                ? 'bg-amber-950 text-amber-500' 
                                : 'bg-slate-800 text-slate-400'
                          }`}>
                            {task.state}
                          </span>
                        </div>
                        <h4 className="text-[10px] font-bold text-slate-300 font-mono truncate">{task.title}</h4>
                        <div className="flex items-center justify-between text-[8px] font-mono text-slate-500">
                          <span>Source: <span className="text-[#00d2ff] uppercase font-semibold">{task.source}</span></span>
                          <span>Budget Spent: ${task.costAccumulated.toFixed(2)}</span>
                        </div>
                      </div>
                    ))}
                    {activeAgentTasks.length === 0 && (
                      <div className="text-slate-550 italic text-center py-6 text-[10px] font-mono">
                        No active queue issues assigned.
                      </div>
                    )}
                  </div>
                </div>

                <div className="bg-[#1a1d21] border border-slate-850 rounded p-3 space-y-2 font-mono text-[9px] leading-relaxed text-slate-400">
                  <div className="flex items-center gap-1 text-slate-300 font-bold uppercase pb-1 border-b border-slate-850">
                    <HelpCircle className="w-3 h-3 text-emerald-400" />
                    <span>CrewAI Context Engine</span>
                  </div>
                  <p>
                    CrewAI cooperative execution allows agents to hand off task operations dynamically using backstories, tools, and direct feedback loops.
                  </p>
                </div>
              </div>
            </div>
          )}

          {activeSubTab === 'openhands' && (
            <div className="flex flex-col flex-1 h-[420px] gap-3">
              <div className="grid grid-cols-1 md:grid-cols-4 border border-slate-850 rounded overflow-hidden flex-1 select-none">
                {/* Left Side: Virtual Sandbox File Explorer */}
                <div className="md:col-span-1 bg-[#1a1d21] border-r border-slate-850 p-3 space-y-2 text-[10px] font-mono">
                  <div className="text-[8px] font-bold text-slate-500 uppercase flex items-center gap-1 pb-1.5 border-b border-slate-850">
                    <Folder className="w-3 h-3 text-amber-500" />
                    <span>WORKSPACE REPO ROOT</span>
                  </div>
                  <div className="space-y-1">
                    <div className="text-slate-500 pl-1 uppercase font-bold text-[8px] tracking-wider mb-1">Files Changed by Sandbox:</div>
                    <div className="space-y-0.5">
                      {[
                        { name: 'CheckoutScreen.tsx', icon: FileCode },
                        { name: 'instructions.md', icon: FileText },
                        { name: 'package.json', icon: FileJson },
                        { name: 'server.ts', icon: FileCode }
                      ].map(f => {
                        const Icon = f.icon;
                        const isSel = selectedFileName === f.name;
                        return (
                          <button
                            key={f.name}
                            onClick={() => setSelectedFileName(f.name)}
                            className={`w-full flex items-center gap-1.5 text-left p-1 rounded hover:bg-[#222529]/50 cursor-pointer transition-all ${
                              isSel ? 'bg-[#222529] text-white font-bold' : 'text-slate-400'
                            }`}
                          >
                            <Icon className={`w-3 h-3 ${isSel ? 'text-[#00d2ff]' : 'text-slate-500'}`} />
                            <span className="truncate">{f.name}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>

                {/* Right Side: Virtual IDE Editor View */}
                <div className="md:col-span-3 flex flex-col bg-[#07090c] overflow-hidden min-h-[300px]">
                  {/* Editor headers tabs */}
                  <div className="bg-[#1a1d21] border-b border-slate-850 px-3 py-1 flex items-center justify-between">
                    <div className="flex items-center gap-1 px-1 py-0.5 bg-[#07090c] border border-slate-850 border-b-0 text-[10px] font-mono text-white font-bold">
                      <FileCode className="w-3 h-3 text-[#00d2ff]" />
                      <span>{selectedFileName}</span>
                    </div>
                    <span className="text-[8px] font-mono text-slate-500 uppercase font-semibold">OpenHands Sandbox Editor</span>
                  </div>

                  {/* Code viewport container */}
                  <div className="p-3 font-mono text-[10px] leading-relaxed select-text overflow-y-auto max-h-[290px] flex-1 scrollbar-thin scrollbar-thumb-slate-800">
                    {(() => {
                      if (selectedFileName === 'CheckoutScreen.tsx') {
                        return (
                          <pre className="text-slate-350">
                            <div>{"1: import React, { useState } from 'react';"}</div>
                            <div>{"2: "}</div>
                            <div className="text-emerald-400 bg-emerald-950/20 px-1 py-0.5 rounded border-l-2 border-emerald-500 my-0.5">
                              {"+ // OpenHands Safe Code Refactoring Commit - Protected coupon trim handler"}
                            </div>
                            <div className="text-emerald-400 bg-emerald-950/20 px-1 py-0.5 rounded border-l-2 border-emerald-500 my-0.5">
                              {"+ export function validateCoupon(code: string = \"\"): { percentage: number } | null {"}
                            </div>
                            <div className="text-emerald-450 pl-4 text-emerald-400 font-semibold my-0.5">
                              {"+   const cleaned = code.trim().toUpperCase();"}
                            </div>
                            <div className="text-emerald-450 pl-4 text-emerald-400 font-semibold my-0.5">
                              {"+   if (cleaned === \"WELCOME10\") return { percentage: 10 };"}
                            </div>
                            <div className="text-emerald-450 pl-4 text-[#22c55e] font-semibold my-0.5">
                              {"+   if (cleaned === \"SUMMER20\") return { percentage: 20 };"}
                            </div>
                            <div className="text-emerald-450 pl-4 text-emerald-300 my-0.5">
                              {"+   return null;"}
                            </div>
                            <div className="text-emerald-450 text-[#10b981] my-0.5">
                              {"+ }"}
                            </div>
                            <div className="text-rose-450 line-through text-rose-400/70 bg-rose-950/10 px-1 py-0.5 rounded border-l-2 border-rose-500/50 my-0.5 font-semibold">
                              {"- export function validateCoupon(code) {"}
                            </div>
                            <div className="text-rose-450 line-through text-rose-400/70 bg-rose-950/10 px-1 py-0.5 rounded border-l-2 border-rose-500/50 my-0.5">
                              {"-   // Legacies: crashed on empty fields"}
                            </div>
                            <div className="text-rose-450 line-through text-rose-400/70 bg-rose-950/10 px-1 py-0.5 rounded border-l-2 border-rose-500/50 my-0.5">
                              {"-   const item = database.getCoupon(code);"}
                            </div>
                            <div className="text-rose-450 line-through text-rose-400/70 bg-rose-950/10 px-1 py-0.5 rounded border-l-2 border-rose-500/50 my-0.5">
                              {"-   return { percentage: item.percentage };"}
                            </div>
                            <div className="text-rose-450 line-through text-rose-400/70 bg-rose-950/10 px-1 py-0.5 rounded border-l-2 border-rose-500/50 my-0.5 font-semibold">
                              {"- }"}
                            </div>
                            <div>{"3: "}</div>
                            <div>{"4: export default function Checkout() {"}</div>
                            <div>{"5:   const [couponCode, setCouponCode] = useState('');"}</div>
                            <div>{"6:   const [discount, setDiscount] = useState<number | null>(null);"}</div>
                            <div>{"7: "}</div>
                            <div>{"8:   const handleApply = () => {"}</div>
                            <div>{"9:     const res = validateCoupon(couponCode);"}</div>
                            <div>{"10:    if (res) {"}</div>
                            <div>{"11:      setDiscount(res.percentage);"}</div>
                            <div>{"12:    } else {"}</div>
                            <div>{"13:      setDiscount(null);"}</div>
                            <div>{"14:    }"}</div>
                            <div>{"15:  };"}</div>
                            <div>{"16: "}</div>
                            <div>{"17:  return <div className=\"checkout-screen\">Secure Checkout Card</div>;"}</div>
                            <div>{"18: }"}</div>
                          </pre>
                        );
                      }
                      
                      if (selectedFileName === 'instructions.md') {
                        return (
                          <pre className="text-slate-400 leading-normal white-space-pre-wrap">
                            <div className="text-blue-400 font-bold font-sans text-xs mb-1"># Autonomous SaaS Product Operations Swarm Framework</div>
                            <div></div>
                            <div>This systems company operates the entire SaaS product pipeline using coordinate frameworks:</div>
                            <div></div>
                            <div className="text-white font-bold">1. LangGraph Pipeline Execution</div>
                            <div className="pl-4 text-slate-400">- Orchestrates cyclic agent step updates (CEO Supervisor routing)</div>
                            <div className="pl-4 text-slate-400">- Recovers gracefully from linter or compilation errors with back-routing paths</div>
                            <div></div>
                            <div className="text-white font-bold">2. CrewAI Agent Cooperatives</div>
                            <div className="pl-4 text-slate-400">- Powers customized role definitions, backstories, and operational limits</div>
                            <div className="pl-4 text-slate-400">- Connects specialized automation tools (e.g., Jira Ticketing API, Brave Research, Slack Webhook)</div>
                            <div></div>
                            <div className="text-white font-bold">3. OpenHands Integrated Developer</div>
                            <div className="pl-4 text-slate-400">- Boots sandboxed workspace containers to deploy git branches and execute automated testing</div>
                          </pre>
                        );
                      }

                      if (selectedFileName === 'package.json') {
                        return (
                          <pre className="text-amber-300">
                            <div>{"{"}</div>
                            <div className="pl-4">{"\"name\": \"autonomous-saas-company\","}</div>
                            <div className="pl-4">{"\"version\": \"1.2.0-stable\","}</div>
                            <div className="pl-4">{"\"private\": true,"}</div>
                            <div className="pl-4 font-bold">{"\"dependencies\": {"}</div>
                            <div className="pl-8">{"\"@google/genai\": \"^2.4.0\","}</div>
                            <div className="pl-8">{"\"express\": \"^4.21.2\","}</div>
                            <div className="pl-8">{"\"motion\": \"^12.23.24\","}</div>
                            <div className="pl-8">{"\"react\": \"^19.0.1\","}</div>
                            <div className="pl-8">{"\"lucide-react\": \"^0.546.0\""}</div>
                            <div className="pl-4">{"},"}</div>
                            <div className="pl-4 font-bold">{"\"devDependencies\": {"}</div>
                            <div className="pl-8">{"\"esbuild\": \"^0.25.0\","}</div>
                            <div className="pl-8">{"\"typescript\": \"~5.8.2\","}</div>
                            <div className="pl-8">{"\"vite\": \"^6.2.3\""}</div>
                            <div className="pl-4">{"}"}</div>
                            <div>{"}"}</div>
                          </pre>
                        );
                      }

                      if (selectedFileName === 'server.ts') {
                        return (
                          <pre className="text-slate-350">
                            <div>{"import express from 'express';"}</div>
                            <div>{"import path from 'path';"}</div>
                            <div>{"import { createServer as createViteServer } from 'vite';"}</div>
                            <div></div>
                            <div>{"const app = express();"}</div>
                            <div>{"const PORT = 3000;"}</div>
                            <div></div>
                            <div>{"// LangGraph state logs API endpoint"}</div>
                            <div>{"app.get('/api/telemetry', (req, res) => {"}</div>
                            <div className="pl-4">{"res.json({ status: 'ok', supervisor: 'CEO' });"}</div>
                            <div>{"});"}</div>
                            <div></div>
                            <div>{"async function start() {"}</div>
                            <div className="pl-4">{"const vite = await createViteServer({"}</div>
                            <div className="pl-8">{"server: { middlewareMode: true },"}</div>
                            <div className="pl-8">{"appType: 'spa'"}</div>
                            <div className="pl-4">{"});"}</div>
                            <div className="pl-4">{"app.use(vite.middlewares);"}</div>
                            <div className="pl-4">{"app.listen(PORT, '0.0.0.0', () => {"}</div>
                            <div className="pl-8">{"console.log(\"OpenHands Container server running on Port 3000\");"}</div>
                            <div className="pl-4 font-semibold">{"});"}</div>
                            <div>{"}"}</div>
                            <div>{"start();"}</div>
                          </pre>
                        );
                      }

                      return <div className="text-slate-500">No active file context. Select a directory item on the left tree panel.</div>;
                    })()}
                  </div>
                </div>
              </div>

              {/* Mini Terminal inside the thinker view */}
              <div className="flex flex-col h-44 bg-[#121016] border border-slate-850 rounded overflow-hidden">
                <div className="bg-[#1164A3] px-3 py-1.5 border-b border-slate-855 flex items-center gap-2 text-[9px] font-mono text-slate-400">
                  <Terminal className="w-2.5 h-2.5 text-[#00d2ff]" />
                  <span>OpenHands Air-Gapped Sandbox Terminal Session Output</span>
                </div>
                <div className="p-2 font-mono text-[10px] text-slate-300 overflow-y-auto flex-1 select-text bg-[#1a1d21]/80 scrollbar-thin scrollbar-thumb-slate-800">
                  {sandboxLogs.map((log, i) => (
                    <div key={i} className="whitespace-pre-wrap leading-relaxed">
                      {log}
                    </div>
                  ))}
                  <div ref={terminalEndRef} />
                </div>
              </div>
            </div>
          )}

          {activeSubTab === 'chat' && (
            <div className="flex flex-col flex-1 h-[400px]">
              {/* Messages feed */}
              <div className="flex-1 overflow-y-auto p-1 space-y-2.5 mb-3 max-h-[280px]">
                {(chatMessages[selectedAgentId] || []).map((msg, idx) => (
                  <div
                    key={idx}
                    className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'}`}
                  >
                    <div className="flex items-center gap-1.5 mb-0.5">
                      <span className="text-[8px] font-mono text-slate-500">{msg.timestamp}</span>
                      <span className="text-[8px] font-mono text-blue-400 font-bold uppercase">
                        {msg.role === 'user' ? '[CO COMMANDER]' : `[${selectedAgentId} AGENT]`}
                      </span>
                    </div>
                    <div
                      className={`max-w-md p-2 rounded text-[11px] leading-relaxed font-mono ${
                        msg.role === 'user'
                          ? 'bg-blue-600 border border-blue-500 text-white rounded-tr-none'
                          : 'bg-[#19171d] border border-slate-850 text-slate-300 rounded-tl-none'
                      }`}
                    >
                      {msg.text}
                    </div>
                  </div>
                ))}
                {isChatTyping && (
                  <div className="flex flex-col items-start animate-pulse">
                    <span className="text-[8px] font-mono text-slate-500 mb-0.5">Agent is formulating thought stream...</span>
                    <div className="bg-[#19171d] border border-slate-850 p-2 rounded text-[11px] text-slate-500 font-mono italic">
                      Formulating response metrics...
                    </div>
                  </div>
                )}
                <div ref={chatEndRef} />
              </div>

              {/* Chat Input form */}
              <form onSubmit={handleSendChat} className="flex gap-1.5">
                <input
                  type="text"
                  placeholder={`Consult directly with ${activeAgent.id} on goals...`}
                  value={chatInput}
                  onChange={e => setChatInput(e.target.value)}
                  className="flex-1 bg-[#19171d] border border-slate-805 rounded px-2.5 py-1.5 text-white text-[11px] font-mono focus:outline-none focus:border-blue-500"
                />
                <button
                  type="submit"
                  id="send-chat-explorer-btn"
                  className="p-1 px-3 bg-blue-600 hover:bg-blue-500 rounded text-white transition-colors cursor-pointer"
                >
                  <Send className="w-3.5 h-3.5" />
                </button>
              </form>
            </div>
          )}

          {activeSubTab === 'config' && (
            <div className="space-y-4 flex-1 flex flex-col justify-between">
              <div className="space-y-3.5 max-h-[320px] overflow-y-auto pr-1">
                {/* Visual CrewAI Config header */}
                <div className="flex items-center gap-2 border-b border-slate-850 pb-2">
                  <Cpu className="w-4 h-4 text-purple-400" />
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-300">CrewAI Cooperative Weight Customizer Override</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <div className="space-y-1">
                    <label className="text-[8px] font-mono text-slate-500 uppercase tracking-wider block font-bold">Inference LLM Model</label>
                    <select
                      value={model}
                      onChange={e => setModel(e.target.value)}
                      className="w-full bg-[#19171d] border border-slate-800 rounded p-1.5 text-slate-200 text-[10px] font-mono focus:outline-none focus:border-slate-700"
                    >
                      <option value="gemini-3.5-flash">gemini-3.5-flash</option>
                      <option value="gemini-3.1-pro-preview">gemini-3.1-pro-preview</option>
                      <option value="gemini-3.1-flash-lite">gemini-3.1-flash-lite</option>
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[8px] font-mono text-slate-500 uppercase tracking-wider block font-bold">Inference randomness (Temp)</label>
                    <div className="flex items-center gap-2">
                      <input
                        type="range"
                        min="0"
                        max="1"
                        step="0.05"
                        value={temp}
                        onChange={e => setTemp(parseFloat(e.target.value))}
                        className="w-full h-1 bg-slate-800 rounded cursor-pointer accent-blue-500"
                      />
                      <span className="text-[10px] font-mono font-bold text-slate-300 w-8 text-right">{temp.toFixed(2)}</span>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <div className="space-y-1">
                    <label className="text-[8px] font-mono text-slate-500 uppercase tracking-wider block font-bold">Max Output limit tokens</label>
                    <div className="flex items-center gap-2">
                      <input
                        type="range"
                        min="512"
                        max="8192"
                        step="256"
                        value={maxT}
                        onChange={e => setMaxT(parseInt(e.target.value))}
                        className="w-full h-1 bg-slate-800 rounded cursor-pointer accent-blue-500"
                      />
                      <span className="text-[10px] font-mono font-bold text-slate-300 w-12 text-right">{maxT}</span>
                    </div>
                  </div>

                  <div className="space-y-1 flex flex-col justify-center">
                    <label className="text-[8px] font-mono text-slate-500 uppercase tracking-wider block font-bold mb-1">Agent Console Verbosity</label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input 
                        type="checkbox" 
                        checked={verbosity} 
                        onChange={e => setVerbosity(e.target.checked)} 
                        className="w-3.5 h-3.5 rounded bg-slate-800 border-slate-700 text-blue-600 focus:ring-0 cursor-pointer accent-blue-500"
                      />
                      <span className="text-[10px] font-mono text-slate-300">Enable verbose step-by-step reasoning outputs</span>
                    </label>
                  </div>
                </div>

                {/* Backstory */}
                <div className="space-y-1">
                  <label className="text-[8px] font-mono text-slate-500 uppercase tracking-wider block font-bold">CrewAI Cooperative Agent Backstory</label>
                  <textarea
                    rows={2}
                    value={backstory}
                    onChange={e => setBackstory(e.target.value)}
                    placeholder="E.g., An expert SRE agent with deep caffeine addictions..."
                    className="w-full bg-[#19171d] border border-slate-805 rounded p-2 text-slate-300 text-[10px] font-mono focus:outline-none focus:border-slate-700 leading-normal"
                  />
                </div>

                {/* Custom Tools checkboxes */}
                <div className="space-y-2">
                  <label className="text-[8px] font-mono text-slate-500 uppercase tracking-wider block font-bold">Associated Autonomous Task Tools</label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
                    {[
                      'GitHub API Client',
                      'Live Sandbox Terminal shell_exec',
                      'Brave Search Engine',
                      'Jira Service Desk Bridge',
                      'Slack Webhooks Controller',
                      'PostgreSQL Schemas Triage Engine'
                    ].map(tool => {
                      const isChecked = tools.includes(tool);
                      return (
                        <label 
                          key={tool} 
                          className={`flex items-center gap-2 p-1.5 rounded border text-[10px] font-mono cursor-pointer transition-colors ${
                            isChecked 
                              ? 'bg-blue-950/20 border-blue-900/40 text-blue-300' 
                              : 'bg-[#19171d] border-slate-850 hover:bg-[#222529]/40 text-slate-400'
                          }`}
                        >
                          <input 
                            type="checkbox"
                            checked={isChecked}
                            onChange={() => {
                              if (isChecked) {
                                setTools(prev => prev.filter(t => t !== tool));
                              } else {
                                setTools(prev => [...prev, tool]);
                              }
                            }}
                            className="w-3 h-3 text-blue-600 cursor-pointer accent-blue-500"
                          />
                          <span>{tool}</span>
                        </label>
                      );
                    })}
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-[8px] font-mono text-slate-500 uppercase tracking-wider block font-bold">System Identity Directives (System Instruction)</label>
                  <textarea
                    rows={2.5}
                    value={sysInst}
                    onChange={e => setSysInst(e.target.value)}
                    className="w-full bg-[#19171d] border border-slate-805 rounded p-2 text-slate-300 text-[10px] font-mono focus:outline-none focus:border-slate-700 leading-relaxed"
                  />
                </div>
              </div>

              {/* Save Settings confirmation */}
              <div className="flex items-center gap-2.5 border-t border-slate-800 pt-2.5 bg-transparent">
                <button
                  onClick={handleSaveConfig}
                  id="save-agent-config-btn"
                  className="px-3 py-1.5 bg-blue-600 hover:bg-blue-500 text-white text-[10px] font-mono font-bold rounded transition-colors cursor-pointer flex items-center gap-1.5"
                >
                  {isSaved ? <Check className="w-3 h-3" /> : <Sliders className="w-3 h-3" />}
                  {isSaved ? 'CREW WEIGHTS DEPLOYED' : 'COMMIT AGENT WEIGHTS'}
                </button>
                {isSaved && (
                  <span className="text-[10px] font-mono text-emerald-400 font-bold">CrewAI Agent weights committed into Local Cache!</span>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
