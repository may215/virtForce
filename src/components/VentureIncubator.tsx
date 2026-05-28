import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Rocket, 
  Layers, 
  Cpu, 
  TrendingUp, 
  MessageSquare, 
  Terminal, 
  CheckCircle2, 
  ChevronRight, 
  FileCode, 
  Flame, 
  Users, 
  Zap,
  Globe,
  Settings,
  CircleCheck,
  HelpCircle,
  TrendingDown,
  Gauge,
  Share2,
  Mail,
  Megaphone,
  Copy,
  Check,
  MousePointerClick
} from 'lucide-react';
import { Agent, Task, SwarmLog, AgentRole } from '../types';

interface VentureIncubatorProps {
  agents: Agent[];
  tasks: Task[];
  onInitializeVenture: (
    name: string, 
    pitch: string, 
    techStack: string, 
    focusMetric: string, 
    customBacklog: Task[],
    updatedAgents: Agent[]
  ) => void;
  logs: SwarmLog[];
}

export function VentureIncubator({
  agents,
  tasks,
  onInitializeVenture,
  logs
}: VentureIncubatorProps) {
  // Input states
  const [ventureName, setVentureName] = useState('');
  const [pitch, setPitch] = useState('');
  const [techStack, setTechStack] = useState('Next.js, FastAPI, PostgreSQL');
  const [focusMetric, setFocusMetric] = useState('Security & Code Reliability');
  const [companyInitialized, setCompanyInitialized] = useState(false);
  const [initializingStep, setInitializingStep] = useState(0);

  // Cost optimizer model settings
  const [modelType, setModelType] = useState<'premier' | 'standard' | 'frugal'>('standard');
  const [activeTab, setActiveTab] = useState<'launcher' | 'comms' | 'roi' | 'beta'>('launcher');

  // Beta tab states
  const [betaEmail, setBetaEmail] = useState('');
  const [betaSubmitted, setBetaSubmitted] = useState(false);
  const [copiedSection, setCopiedSection] = useState<'hn' | 'reddit' | 'email' | 'code' | null>(null);

  // Live GenAI copywriting and forecast states
  const [aiHN, setAiHN] = useState<string | null>(null);
  const [loadingHN, setLoadingHN] = useState(false);
  const [aiReddit, setAiReddit] = useState<string | null>(null);
  const [loadingReddit, setLoadingReddit] = useState(false);
  const [aiEmail, setAiEmail] = useState<string | null>(null);
  const [loadingEmail, setLoadingEmail] = useState(false);

  // Live Swarm forecast values
  const [aiForecast, setAiForecast] = useState<{
    launchTimeline: number;
    scannedVulnerabilities: number;
    betaUsers: number;
    roiMultiplier: string;
    socialChannel: string;
    executiveSummary: string;
  } | null>(null);
  const [loadingForecast, setLoadingForecast] = useState(false);

  // Fetch copywriting function
  const fetchCopywriting = async (platform: 'HackerNews' | 'Reddit' | 'Email', setCopy: (v: string) => void, setLoading: (b: boolean) => void) => {
    setLoading(true);
    try {
      const savedProviders = localStorage.getItem('vac_ai_providers');
      const aiConfig = savedProviders ? JSON.parse(savedProviders) : null;
      const res = await fetch('/api/gemini/copywriting', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          platform,
          ventureName: ventureName || 'MySaaS Startup',
          description: pitch || 'A secure software tool built for the next generation.',
          targetAudience: focusMetric,
          techStack,
          aiConfig
        })
      });
      const data = await res.json();
      setCopy(data.copy);
    } catch (e) {
      console.error(e);
      setCopy('Error contact peer nodes to compile candidate copywriting lists.');
    } finally {
      setLoading(false);
    }
  };

  // Fetch ROI forecast simulator
  const fetchForecast = async () => {
    setLoadingForecast(true);
    try {
      const savedProviders = localStorage.getItem('vac_ai_providers');
      const aiConfig = savedProviders ? JSON.parse(savedProviders) : null;
      const res = await fetch('/api/incubator/forecast', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          mode: modelType.toUpperCase(),
          budget: modelType === 'premier' ? '500' : modelType === 'standard' ? '250' : '50',
          metric: focusMetric,
          techStack,
          aiConfig
        })
      });
      const data = await res.json();
      setAiForecast(data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoadingForecast(false);
    }
  };

  const handleCopyText = (text: string, section: 'hn' | 'reddit' | 'email' | 'code') => {
    navigator.clipboard.writeText(text);
    setCopiedSection(section);
    setTimeout(() => setCopiedSection(null), 2000);
  };

  // Intercepted Chat Dialog logs
  const [interComms, setInterComms] = useState<{
    id: string;
    from: AgentRole;
    to: AgentRole;
    message: string;
    timestamp: string;
  }[]>([
    {
      id: 'ic-1',
      from: 'CEO',
      to: 'PM',
      message: 'Director-CEO-1 initiating product roadmap assessment. Please check customer feedback streams.',
      timestamp: '11:02 AM'
    },
    {
      id: 'ic-2',
      from: 'PM',
      to: 'DEV',
      message: 'Product-Specs-2: Preparing custom markdown spec sheet for the checkout coupon validation fix. Stand by for code branch checkout.',
      timestamp: '11:05 AM'
    },
    {
      id: 'ic-3',
      from: 'DEV',
      to: 'QA',
      message: 'Engineer-Dev-3: Deployed hotfix into Sandbox #4. Jest validation test suites staged for linter compilation.',
      timestamp: '11:15 AM'
    }
  ]);

  // Handle addition of new intercomms during simulation ticks
  useEffect(() => {
    const chatPoll = setInterval(() => {
      const activeAg = agents.find(a => a.status === 'ACTIVE' || a.status === 'CODE_RUNNING');
      if (activeAg) {
        // Generate a contextual inter-comms intercept
        let from: AgentRole = activeAg.id;
        let to: AgentRole = 'CEO';
        let msg = '';

        if (from === 'CEO') {
          to = 'PM';
          msg = `Let's streamline developer velocity on active sprint backlogs. Please prioritize core specifications.`;
        } else if (from === 'PM') {
          to = 'DEV';
          msg = `Drafted full technical specifications. Submitting custom parameters to engineers for feature execution.`;
        } else if (from === 'DEV') {
          to = 'QA';
          msg = `Sandbox linter checks are pass-ready. Staging build candidate to DevOps runner.`;
        } else if (from === 'QA') {
          to = 'CEO';
          msg = `DevOps tests completed successfully with zero leaks. Requesting final HITL supervisor signing.`;
        } else if (from === 'MKT') {
          to = 'SALES';
          msg = `Product bulletin pushed to global mailing lists! Optimizing conversion pitches for inbound leads.`;
        } else {
          to = 'CEO';
          msg = `Triaged inbound ticket anomalies. Formulating telemetry summaries for system backlog prioritization.`;
        }

        const now = new Date();
        const timestamp = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

        setInterComms(prev => [
          ...prev.slice(-15),
          {
            id: `ic-${Date.now()}`,
            from,
            to,
            message: msg,
            timestamp
          }
        ]);
      }
    }, 8000);

    return () => clearInterval(chatPoll);
  }, [agents]);

  // Standard pre-rolled SaaS setups
  const presets = [
    {
      name: 'OmniPet',
      pitch: 'A smart dashboard tracking pet vital signs, diet tracking, and automated recurring dry food replenishment.',
      techStack: 'React, Django, PostgreSQL, Docker',
      focus: 'Real-time Vital Alert Latency & User Checkout Convenience'
    },
    {
      name: 'CodeGuard Sentinel',
      pitch: 'Continuous AI security and automated dependency scanning with zero-false-positive multi-file dependency isolation.',
      techStack: 'Vue.js, Go, Redis, WebAssembly',
      focus: 'Ultra-fast Linter Scanning & Compliance Gating'
    },
    {
      name: 'VibeFlow Ambient',
      pitch: 'Interactive acoustic canvas that synthesizes neuro-soundscapes tailored to developer heart rates and keyboard telemetry.',
      techStack: 'Svelte, Node.js, Web Audio API, Tailwind',
      focus: 'Sound Wave Playback & Low CPU Rendering'
    }
  ];

  const handleApplyPreset = (idx: number) => {
    const p = presets[idx];
    setVentureName(p.name);
    setPitch(p.pitch);
    setTechStack(p.techStack);
    setFocusMetric(p.focus);
  };

  const startVentureSwarm = async () => {
    if (!ventureName.trim() || !pitch.trim()) return;

    setCompanyInitialized(true);
    setInitializingStep(1);

    // Dynamic countdown delay simulation of company launching
    for (let s = 1; s <= 4; s++) {
      await new Promise(resolve => setTimeout(resolve, 850));
      setInitializingStep(s + 1);
    }

    // Prepare custom dynamic backlog task queue structured specifically on user inputs
    const cleanName = ventureName.trim();
    const task_1_id = `TASK-${cleanName.toUpperCase().substring(0, 3)}-001`;
    const task_2_id = `TASK-${cleanName.toUpperCase().substring(0, 3)}-002`;
    const task_3_id = `TASK-${cleanName.toUpperCase().substring(0, 3)}-003`;

    const customBacklog: Task[] = [
      {
        id: task_1_id,
        title: `Initialize primary setup architecture for ${cleanName}`,
        description: `Setup basic file structures, configure static Tailwind layouts, build initial mockup for the main screen, and verify module imports conform to ${techStack}.`,
        state: 'SPEC',
        source: 'strategy',
        assignedTo: 'DEV',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        costAccumulated: 0.15,
        tokensUsed: 14000,
        specDoc: `### PM Specification: Core Architecture of ${cleanName}\n\n#### Venture Pitch:\n${pitch}\n\n#### Technical Requirements:\n1. Integrate standard CSS styling using dynamic Tailwind utility tags.\n2. Conforms to framework choice: ${techStack}.\n3. Setup basic mock layouts showing secondary telemetry targets.\n\n#### Focus Performance Goal:\nMaintain low load speed and optimize for: ${focusMetric}.`,
        innerMonologue: {
          CEO: `This is the genesis task for our brand new venture: ${cleanName}. PM agent, outline the fundamental design and architectural objectives.`,
          PM: `Staged the layout boundaries. The focus of ${cleanName} is heavily emphasizing: ${focusMetric}. Directing Engineers to build standard React nodes.`,
        }
      },
      {
        id: task_2_id,
        title: `Design performance-oriented telemetry indicators for focus: ${focusMetric}`,
        description: `Build responsive diagnostic widgets displaying crucial telemetry parameters. Ensure layouts scale gracefully across browser viewports and avoid high CPU re-render loops.`,
        state: 'BACKLOG',
        source: 'internal',
        assignedTo: 'PM',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        costAccumulated: 0,
        tokensUsed: 0,
        innerMonologue: {}
      },
      {
        id: task_3_id,
        title: `Create interactive landing documentation and user enrollment workflow`,
        description: `Engage potential registrars through responsive enrollment screens. Build lightweight customer databases and setup email template marketing loops for launch campaigns.`,
        state: 'FEEDBACK',
        source: 'customer',
        assignedTo: 'SUPPORT',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        costAccumulated: 0,
        tokensUsed: 0,
        innerMonologue: {}
      }
    ];

    // Realignment of agent models and goals
    const updatedAgents: Agent[] = agents.map(agent => {
      let updatedGoal = '';
      let updatedDescription = agent.description;
      let backstory = agent.backstory;

      switch(agent.id) {
        case 'CEO':
          updatedGoal = `Directing high-level routing loops for the new SaaS company ${cleanName}. Monitor budget usage targets.`;
          updatedDescription = `Directs strategic roadmap alignment for ${cleanName}. Schedules workflows, compiles milestone structures and automates supervisor task handoffs.`;
          backstory = `A master strategic model trained on high-performance venture scaling algorithms for ${cleanName}. Refutes redundant API loops.`;
          break;
        case 'PM':
          updatedGoal = `Grooming specification parameters for ${cleanName} prioritizing ${focusMetric}.`;
          updatedDescription = `Formulates concise product metrics, structures markdown spec sheets, and optimizes user workflows for ${cleanName}.`;
          backstory = `Detailed software product metrics specialist. Passionate about ensuring early user engagement for ${cleanName} utilizing ${techStack}.`;
          break;
        case 'DEV':
          updatedGoal = `Writing highly modular typescript files for ${cleanName} using components configured on ${techStack}.`;
          updatedDescription = `Writes clean, performant, type-safe backend and UI elements mapping specifications for ${cleanName}.`;
          backstory = `Lead engineer compiler. Crafts optimized early-returned algorithms satisfying the primary target: ${focusMetric}.`;
          break;
        case 'QA':
          updatedGoal = `Evaluating code linter integrity and sandbox package setups for the ${cleanName} workspace repo.`;
          updatedDescription = `Secures code compile gates. Operates isolated node containers to assess vulnerabilities and test regressions.`;
          break;
        case 'MKT':
          updatedGoal = `Drafting launch newsletters and media announcements for the ${cleanName} public debut.`;
          updatedDescription = `Designs benefit-forward content structures. Engengenders user enthusiasm through descriptive bulletins for ${cleanName}.`;
          break;
        case 'SALES':
          updatedGoal = `Architecting custom Enterprise service agreements with target clients of ${cleanName}.`;
          updatedDescription = `Qualifies user registrations and calculates prospective subscription conversions for ${cleanName}.`;
          break;
        case 'SUPPORT':
          updatedGoal = `Triaging inbound diagnostic reports and telemetry anomalies from early users of ${cleanName}.`;
          updatedDescription = `Resolves edge case exceptions and aggregates customer telemetry dumps into actionable PM backlogs.`;
          break;
      }

      return {
        ...agent,
        currentGoal: updatedGoal,
        description: updatedDescription,
        backstory,
        costSpent: 0, // Reset individual spent on new venture
        totalTokens: 0, // Reset tokens count
        prsMerged: 0,
        // Override model types on cost settings choice
        model: modelType === 'premier' 
          ? 'gemini-3.1-pro-preview' 
          : modelType === 'frugal' 
          ? 'gemini-3.1-flash-lite' 
          : 'gemini-3.5-flash'
      };
    });

    // Fire callback back to app context to initialize the new venture
    onInitializeVenture(
      cleanName,
      pitch,
      techStack,
      focusMetric,
      customBacklog,
      updatedAgents
    );

    // Inject immediate start comms logs
    const now = new Date();
    const ts = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    setInterComms([
      {
        id: 'new-v-1',
        from: 'CEO',
        to: 'PM',
        message: `🚨 GLOBAL VENTURE DISPATCH: Booting ${cleanName}! PM, please analyze: "${pitch}" and draft specs immediately.`,
        timestamp: ts
      },
      {
        id: 'new-v-2',
        from: 'PM',
        to: 'DEV',
        message: `On it, Chief! Grooming the initial architectural spec. Standardizing tech stack Choice: ${techStack}. Focusing on: ${focusMetric}.`,
        timestamp: ts
      }
    ]);

    setTimeout(() => {
      setCompanyInitialized(false);
      setInitializingStep(0);
      setActiveTab('comms');
    }, 1000);
  };

  return (
    <div className="space-y-4 antialiased selection:bg-blue-500/20">
      
      {/* Dynamic Sub Tabs Navigation bar */}
      <div className="bg-bg-density-card border border-slate-800 rounded p-1.5 flex items-center justify-between text-[11px] font-mono font-bold">
        <div className="flex items-center gap-1.5">
          {[
            { id: 'launcher', name: '🛸 Swarm Venture Launcher', icon: Rocket },
            { id: 'comms', name: '💬 Live Inter-Agent Comms Intercept', icon: MessageSquare },
            { id: 'roi', name: '📊 Swarm ROI & Economic Forecasts', icon: TrendingUp },
            { id: 'beta', name: '🌱 Zero-Budget Beta Launchpad', icon: Share2 }
          ].map(tab => {
            const Icon = tab.icon;
            const isSel = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded transition-all cursor-pointer ${
                  isSel 
                    ? 'bg-blue-955/40 text-blue-400 border border-blue-900/40' 
                    : 'text-slate-450 hover:text-white'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.name}</span>
              </button>
            );
          })}
        </div>
        
        <div className="text-[10px] text-slate-500 bg-[#0f1115] border border-slate-800/80 px-2 py-1 rounded">
          VENTURE LAB MODULE: <strong className="text-emerald-400 uppercase">ACTIVE</strong>
        </div>
      </div>

      {/* Tab Area Viewports */}
      <AnimatePresence mode="wait">
        {activeTab === 'launcher' && (
          <motion.div
            key="launcher"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="grid grid-cols-1 lg:grid-cols-3 gap-4"
          >
            {/* Left Col: Setup Form */}
            <div className="lg:col-span-2 bg-bg-density-card border border-slate-800 rounded p-4 space-y-4 flex flex-col justify-between">
              <div className="space-y-4">
                <div className="border-b border-slate-850 pb-2">
                  <h3 className="text-xs font-bold text-white uppercase tracking-tight font-mono flex items-center gap-2">
                    <Layers className="w-4 h-4 text-purple-400" />
                    Bespoke SaaS Swarm Parameters Ingestion
                  </h3>
                  <p className="text-[10px] text-slate-450 mt-0.5">Define your custom product idea. Once initialized, the entire 7-agent swarm instantly re-aligns to design, develop, test, and market your custom software.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-[9px] font-mono text-slate-450 uppercase tracking-widest block font-extrabold">Venture Blueprint Name</label>
                    <input 
                      type="text"
                      placeholder="e.g. HealthTracker AI"
                      value={ventureName}
                      onChange={e => setVentureName(e.target.value)}
                      className="w-full bg-[#12151a] border border-slate-800 rounded p-2.5 text-white text-[11px] font-mono focus:outline-none focus:border-blue-900 focus:ring-1 focus:ring-blue-950"
                      disabled={companyInitialized}
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[9px] font-mono text-slate-450 uppercase tracking-widest block font-extrabold">Technology Code Stack</label>
                    <input 
                      type="text"
                      placeholder="e.g. Next.js, FastAPI, PostgreSQL"
                      value={techStack}
                      onChange={e => setTechStack(e.target.value)}
                      className="w-full bg-[#12151a] border border-slate-800 rounded p-2.5 text-white text-[11px] font-mono focus:outline-none focus:border-blue-900 focus:ring-1 focus:ring-blue-950"
                      disabled={companyInitialized}
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[9px] font-mono text-slate-450 uppercase tracking-widest block font-extrabold">Venture Pitch & Value Statement</label>
                  <textarea 
                    rows={3}
                    placeholder="e.g. An automated platform that tracks metrics for local dental clinics and sends automated sms recalls to clients to secure peak booking metrics."
                    value={pitch}
                    onChange={e => setPitch(e.target.value)}
                    className="w-full bg-[#12151a] border border-slate-800 rounded p-2.5 text-white text-[11px] font-mono focus:outline-none focus:border-blue-900 focus:ring-1 focus:ring-blue-950 leading-relaxed"
                    disabled={companyInitialized}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-[9px] font-mono text-slate-450 uppercase tracking-widest block font-extrabold">Primary QA / Performance Target KPI</label>
                    <input 
                      type="text"
                      placeholder="e.g. Low database latency, strict JWT tokens authentication"
                      value={focusMetric}
                      onChange={e => setFocusMetric(e.target.value)}
                      className="w-full bg-[#12151a] border border-slate-800 rounded p-2.5 text-white text-[11px] font-mono focus:outline-none focus:border-blue-900 focus:ring-1 focus:ring-blue-950"
                      disabled={companyInitialized}
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[9px] font-mono text-slate-450 uppercase tracking-widest block font-extrabold">Swarm Cognitive Cost Engine</label>
                    <div className="grid grid-cols-3 gap-2">
                      {[
                        { id: 'premier', name: 'PRO-PREVIEW', desc: 'gemini-3.1-pro' },
                        { id: 'standard', name: 'BALANCED', desc: 'gemini-3.5-flash' },
                        { id: 'frugal', name: 'FLASH LITE', desc: 'gemini-3.1-lite' }
                      ].map(opt => {
                        const isSel = modelType === opt.id;
                        return (
                          <button
                            key={opt.id}
                            type="button"
                            onClick={() => setModelType(opt.id as any)}
                            className={`p-2 rounded border text-left cursor-pointer transition-all ${
                              isSel 
                                ? 'bg-blue-950/20 border-blue-900 text-white' 
                                : 'bg-[#12151a] border-slate-800 text-slate-500 hover:text-slate-350 hover:bg-[#161a22]'
                            }`}
                          >
                            <span className="font-mono font-bold text-[9px] block">{opt.name}</span>
                            <span className="text-[8px] text-slate-400 block">{opt.desc}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>

              {/* Launcher Submit or Active Loader */}
              <div className="mt-6 pt-4 border-t border-slate-850 flex items-center justify-between">
                <div className="space-y-0.5">
                  <span className="text-[8px] font-mono text-amber-500 block uppercase font-bold animate-pulse">● Sandbox Safeguards Active</span>
                  <span className="text-[9px] text-slate-500 leading-none">This setup automatically clears old cached logs and tasks to host standard clean sprint routines.</span>
                </div>

                {companyInitialized ? (
                  <div className="flex items-center gap-3">
                    <div className="w-4 h-4 rounded-full border-2 border-slate-800 border-t-blue-500 animate-spin" />
                    <span className="text-[10px] font-mono text-blue-450 text-blue-400 font-bold uppercase">
                      {initializingStep === 1 && 'Ingesting parameters...'}
                      {initializingStep === 2 && 'CEO Supervisor generating route keys...'}
                      {initializingStep === 3 && 'PM drafting backlog specs...'}
                      {initializingStep === 4 && 'Launching Air-gapped workspace...'}
                      {initializingStep === 5 && 'SWARM STANDBY!'}
                    </span>
                  </div>
                ) : (
                  <button
                    onClick={startVentureSwarm}
                    disabled={!ventureName.trim() || !pitch.trim()}
                    id="trigger-venture-launch-btn"
                    className="px-5 py-2.5 bg-blue-600 hover:bg-blue-500 disabled:bg-slate-800 disabled:text-slate-600 font-mono font-bold text-white rounded text-[10px] flex items-center gap-2 cursor-pointer shadow-md shadow-blue-950/40 transition-colors"
                  >
                    <Rocket className="w-4 h-4 text-white animate-bounce" />
                    INITIALIZE ENTERPRISE CO-SWARM
                  </button>
                )}
              </div>
            </div>

            {/* Right Col: Venture Blueprint presets */}
            <div className="bg-[#0f1115] border border-slate-800 rounded p-4 space-y-3.5">
              <div>
                <h3 className="text-xs font-bold text-white uppercase tracking-tight font-mono flex items-center gap-1.5">
                  <Zap className="w-4 h-4 text-amber-400" />
                  SaaS Idea Templates & Presets
                </h3>
                <p className="text-[9px] text-slate-500 mt-1">Struggle with brainstorming? Choose one of our optimized multi-agent business blueprints below to see a realistic simulation of multi-faceted production steps.</p>
              </div>

              <div className="space-y-2.5">
                {presets.map((p, idx) => (
                  <button
                    key={p.name}
                    onClick={() => handleApplyPreset(idx)}
                    className="w-full text-left p-2.5 rounded border border-slate-850 bg-[#12151a] hover:bg-[#16191f] hover:border-slate-705 group transition-all text-xs flex flex-col justify-between cursor-pointer space-y-1"
                  >
                    <div className="flex items-center justify-between w-full">
                      <strong className="text-white group-hover:text-blue-400 font-mono text-[11px]">{p.name}</strong>
                      <span className="text-[8px] bg-slate-900 border border-slate-800 text-slate-450 px-1 py-0.2 rounded font-mono font-bold uppercase">Template</span>
                    </div>
                    <p className="text-[10px] text-slate-400 line-clamp-2 leading-relaxed font-sans">{p.pitch}</p>
                    <div className="flex items-center gap-2 pt-1 text-[8px] font-mono text-slate-550 border-t border-slate-850/60 w-full mt-1 justify-between">
                      <span>Stack: <strong className="text-slate-400">{p.techStack}</strong></span>
                      <ChevronRight className="w-3 h-3 text-slate-600 group-hover:text-blue-400 transition-colors" />
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {activeTab === 'comms' && (
          <motion.div
            key="comms"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="bg-bg-density-card border border-slate-800 rounded p-4 space-y-4"
          >
            {/* Real-time intercepted comms view */}
            <div className="border-b border-slate-850 pb-2 flex items-center justify-between">
              <div>
                <span className="text-[8px] font-mono text-blue-400 font-bold uppercase tracking-widest block">TELEMETRY SECURE INTERCEPT GATEWAY</span>
                <h3 className="text-xs font-bold text-white uppercase tracking-tight font-mono mt-0.5">
                  Inter-Departmental Messaging Node Feed
                </h3>
              </div>
              <span className="text-[9px] font-mono bg-blue-950/40 text-blue-400 border border-blue-900/40 px-2 py-0.5 rounded font-bold uppercase">
                Active Wiretapping Link
              </span>
            </div>

            <div className="bg-[#07090c] border border-slate-850 rounded p-3 h-96 overflow-y-auto space-y-3 font-mono text-[11px] scrollbar-thin scrollbar-thumb-slate-805 pr-2">
              {interComms.map((chat, idx) => {
                const colors = {
                  CEO: 'text-rose-400 bg-rose-950/10 border-rose-950',
                  PM: 'text-amber-400 bg-amber-950/10 border-amber-950',
                  DEV: 'text-blue-400 bg-blue-950/10 border-blue-950',
                  QA: 'text-cyan-400 bg-cyan-950/10 border-cyan-950',
                  MKT: 'text-purple-400 bg-purple-950/10 border-[#4c1d95]/40',
                  SALES: 'text-indigo-400 bg-indigo-950/10 border-[#1e1b4b]',
                  SUPPORT: 'text-emerald-400 bg-emerald-950/10 border-[#064e3b]',
                };

                return (
                  <motion.div
                    key={chat.id}
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="p-2.5 rounded border border-slate-850/60 bg-[#121516]/20 relative flex flex-col sm:flex-row sm:items-start gap-2.5 hover:bg-[#12151a]/60 transition-colors"
                  >
                    <div className="flex items-center gap-1.5 sm:flex-col sm:items-start min-w-[125px]">
                      <span className="text-[8px] text-slate-505 font-bold">{chat.timestamp}</span>
                      <div className={`px-2 py-0.5 rounded border text-[10px] font-extrabold uppercase ${colors[chat.from]}`}>
                        {chat.from}
                      </div>
                      <ChevronRight className="w-3.5 h-3.5 text-slate-650 hidden sm:block rotate-90 self-center" />
                      <div className={`px-2 py-0.5 rounded border text-[9px] font-extrabold uppercase text-slate-500 border-slate-805 bg-slate-900/40`}>
                        {chat.to}
                      </div>
                    </div>
                    
                    <div className="flex-1 text-slate-300 leading-relaxed font-mono whitespace-pre-wrap pl-1.5 border-l border-slate-800">
                      {chat.message}
                    </div>
                  </motion.div>
                );
              })}
              {interComms.length === 0 && (
                <div className="text-slate-500 italic text-center py-20 font-mono">
                  No inter-agent messages intercepted. Start code compilation loops to wake up agent threads.
                </div>
              )}
            </div>

            <div className="p-3 bg-bg-density-sidebar border border-slate-800 rounded font-mono text-[9px] leading-relaxed text-slate-450 text-slate-400">
              💡 **Context Insight**: While standard LLM orchestrations often hide intermediary communications, our platform intercepts agent-to-agent feedback loops. This allows human developers to understand *why* certain designs or architectures are staged, leading to maximum operational transparency.
            </div>
          </motion.div>
        )}

        {activeTab === 'roi' && (
          <motion.div
            key="roi"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="grid grid-cols-1 lg:grid-cols-3 gap-4"
          >
            {/* Left Column: Cost-Efficiency Analytics and charts */}
            <div className="lg:col-span-2 bg-bg-density-card border border-slate-800 rounded p-4 space-y-4">
              <div className="border-b border-slate-850 pb-2">
                <span className="text-[8px] font-mono text-purple-400 font-bold uppercase tracking-widest block">COST SAVINGS FORECAST MODULE</span>
                <h3 className="text-xs font-bold text-white uppercase tracking-tight font-mono mt-0.5">
                  Swarm Token Budget Trajectory Optimization
                </h3>
              </div>

              {/* Dynamic SVG Spark Area charts */}
              <div className="bg-[#07090c] border border-slate-850 rounded p-4 space-y-3 relative">
                <div className="flex justify-between items-center text-[10px] font-mono">
                  <span className="text-slate-400 font-bold">ACCUMULATED SPEND PROJECTION ($)</span>
                  <span className="text-emerald-400 font-bold flex items-center gap-0.5">
                    <TrendingDown className="w-3.5 h-3.5" />
                    -84% COST CUT BY gemini-3.1-flash-lite Choice
                  </span>
                </div>

                <div className="h-44 w-full relative">
                  {/* Customized SVG Grid & Area curve line */}
                  <svg className="w-full h-full" viewBox="0 0 500 150" preserveAspectRatio="none">
                    <defs>
                      <linearGradient id="optBg" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.15" />
                        <stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />
                      </linearGradient>
                      <linearGradient id="proBg" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#ef4444" stopOpacity="0.1" />
                        <stop offset="100%" stopColor="#ef4444" stopOpacity="0" />
                      </linearGradient>
                    </defs>
                    
                    {/* Grid lines */}
                    <line x1="50" y1="0" x2="50" y2="130" stroke="#1c2128" strokeWidth="1" strokeDasharray="4 4" />
                    <line x1="160" y1="0" x2="160" y2="130" stroke="#1c2128" strokeWidth="1" strokeDasharray="4 4" />
                    <line x1="270" y1="0" x2="270" y2="130" stroke="#1c2128" strokeWidth="1" strokeDasharray="4 4" />
                    <line x1="380" y1="0" x2="380" y2="130" stroke="#1c2128" strokeWidth="1" strokeDasharray="4 4" />
                    
                    {/* Baseline Horizontal */}
                    <line x1="0" y1="130" x2="500" y2="130" stroke="#1e293b" strokeWidth="1.5" />

                    {/* Pro-Preview line (Red) */}
                    <path 
                      d="M 0 130 C 100 120, 200 90, 300 45 C 400 20, 450 10, 500 5" 
                      fill="none" 
                      stroke="#f43f5e" 
                      strokeWidth="2.5" 
                      strokeDasharray="4 2"
                    />
                    
                    {/* Premier Pro Gradient Shadow area */}
                    <path 
                      d="M 0 130 C 100 120, 200 90, 300 45 C 400 20, 450 10, 500 5 L 500 130 Z" 
                      fill="url(#proBg)"
                    />

                    {/* Balanced Standard flash line (Blue) */}
                    <path 
                      d="M 0 130 C 120 128, 200 115, 300 105 C 400 90, 450 75, 500 60" 
                      fill="none" 
                      stroke="#3b82f6" 
                      strokeWidth="3.5" 
                    />
                    
                    <path 
                      d="M 0 130 C 120 128, 200 115, 300 105 C 400 90, 450 75, 500 60 L 500 130 Z" 
                      fill="url(#optBg)"
                    />

                    {/* Data Points */}
                    <circle cx="300" cy="105" r="4.5" fill="#3b82f6" />
                    <circle cx="300" cy="45" r="4.5" fill="#f43f5e" />
                  </svg>
                  
                  {/* Chart UI overlay tags */}
                  <div className="absolute top-2 right-4 text-[8px] font-mono text-rose-400 font-semibold uppercase bg-slate-900 border border-slate-805 px-1 py-0.2 rounded">
                    PRO-PREVIEW OPTION: RED LINE (EST. SPRINT COST $82)
                  </div>
                  <div className="absolute top-10 right-4 text-[8px] font-mono text-blue-400 font-semibold uppercase bg-slate-900 border border-slate-805 px-1 py-0.2 rounded">
                    LITE BALANCED OPTION: BLUE LINE (EST. SPRINT COST $12.40)
                  </div>
                  <div className="absolute bottom-1.5 left-2 text-[8px] font-mono text-slate-500">
                    DAY 1 (BOOT)
                  </div>
                  <div className="absolute bottom-1.5 left-1/2 -translate-x-1/2 text-[8px] font-mono text-slate-500">
                    DAY 15 (STAGING SPECS)
                  </div>
                  <div className="absolute bottom-1.5 right-2 text-[8px] font-mono text-slate-500">
                    DAY 30 (MERGE PROD)
                  </div>
                </div>
              </div>

              {/* Economic KPI blocks */}
              <div className="space-y-4">
                <div className="flex items-center justify-between bg-slate-900/60 border border-slate-800 p-3 rounded">
                  <div className="space-y-0.5">
                    <span className="text-[9px] font-mono text-blue-400 font-bold uppercase tracking-wider block">Gemini Swarm Simulator Model</span>
                    <p className="text-[10px] text-slate-400 font-sans">Calculate real economic impact forecasts for active tech stacks and metrics.</p>
                  </div>
                  <button
                    onClick={fetchForecast}
                    disabled={loadingForecast}
                    className="px-3 py-1.5 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 disabled:opacity-50 text-white font-mono font-bold text-[9px] uppercase rounded shadow cursor-pointer transition-all"
                  >
                    {loadingForecast ? 'Simulating swarm variables...' : '✨ Run AI Feasibility Model'}
                  </button>
                </div>

                {aiForecast ? (
                  <motion.div 
                    initial={{ opacity: 0, y: 5 }} 
                    animate={{ opacity: 1, y: 0 }} 
                    className="grid grid-cols-1 sm:grid-cols-3 gap-3"
                  >
                    <div className="bg-[#12151a] border border-slate-855 rounded p-3 text-center space-y-1">
                      <span className="text-[8px] text-slate-550 block font-mono font-bold tracking-wider uppercase">Projected Launch Timeline</span>
                      <div className="text-sm font-bold font-mono text-emerald-400">{aiForecast.launchTimeline} Days</div>
                      <span className="text-[8px] text-slate-500 font-mono">Until deployment candidate is secure</span>
                    </div>

                    <div className="bg-[#12151a] border border-slate-855 rounded p-3 text-center space-y-1">
                      <span className="text-[8px] text-slate-550 block font-mono font-bold tracking-wider uppercase font-bold">Projected Beta Acquisitions</span>
                      <div className="text-sm font-bold font-mono text-white">{aiForecast.betaUsers} Testers</div>
                      <span className="text-[8px] text-slate-500 font-mono">Dynamic channel: {aiForecast.socialChannel}</span>
                    </div>

                    <div className="bg-[#12151a] border border-slate-855 rounded p-3 text-center space-y-1">
                      <span className="text-[8px] text-slate-550 block font-mono font-bold tracking-wider uppercase font-bold">Feasibility ROI Multiplier</span>
                      <div className="text-sm font-bold font-mono text-blue-400">{aiForecast.roiMultiplier}</div>
                      <span className="text-[8px] text-slate-500 font-mono">{aiForecast.scannedVulnerabilities} threat vectors pre-scanned</span>
                    </div>

                    <div className="sm:col-span-3 bg-[#111219] border border-indigo-950 rounded p-3 font-mono text-[10px] text-indigo-300 leading-normal">
                      <strong>🤖 AI Forecast Summary:</strong> {aiForecast.executiveSummary}
                    </div>
                  </motion.div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div className="bg-[#12151a] border border-slate-855 rounded p-3 text-center space-y-1 opacity-70">
                      <span className="text-[8px] text-slate-550 block font-mono font-bold tracking-wider uppercase">Projected Launch Timeline</span>
                      <div className="text-sm font-bold font-mono text-slate-400">5 Days</div>
                      <span className="text-[8px] text-slate-500 font-mono">Staging compilation speed</span>
                    </div>

                    <div className="bg-[#12151a] border border-slate-855 rounded p-3 text-center space-y-1 opacity-70">
                      <span className="text-[8px] text-slate-550 block font-mono font-bold tracking-wider uppercase">Projected Beta Acquisitions</span>
                      <div className="text-sm font-bold font-mono text-slate-400">320 Users</div>
                      <span className="text-[8px] text-slate-500 font-mono">Estimated via organic channels</span>
                    </div>

                    <div className="bg-[#12151a] border border-slate-855 rounded p-3 text-center space-y-1 opacity-70">
                      <span className="text-[8px] text-slate-550 block font-mono font-bold tracking-wider uppercase">Feasibility ROI Multiplier</span>
                      <div className="text-sm font-bold font-mono text-slate-400">4.5x</div>
                      <span className="text-[8px] text-slate-500 font-mono">Based on sandboxed validation</span>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Right Column: Custom operational metric gauges */}
            <div className="bg-[#0f1115] border border-slate-800 rounded p-4 space-y-4">
              <div>
                <h3 className="text-xs font-bold text-white uppercase tracking-tight font-mono flex items-center gap-1.5">
                  <Gauge className="w-4 h-4 text-purple-450 text-purple-400" />
                  Performance SLA SLAs
                </h3>
                <p className="text-[9px] text-slate-550 mt-1">Operational standards compiled in real-time from active container compilations.</p>
              </div>

              <div className="space-y-4">
                {[
                  { name: 'Support SLA Response Latency', value: '45.2 seconds', percent: 98, color: 'bg-emerald-500' },
                  { name: 'DevOps Build Pass Rate', value: '96.2%', percent: 96, color: 'bg-emerald-500' },
                  { name: 'Staged-to-Merged Transition Speed', value: '4.8 mins', percent: 88, color: 'bg-blue-500' },
                  { name: 'Budget Guardrails Compliance', value: '100% Secure', percent: 100, color: 'bg-sky-500' }
                ].map(sla => (
                  <div key={sla.name} className="space-y-1 font-mono text-[9px]">
                    <div className="flex justify-between text-slate-400">
                      <span>{sla.name}</span>
                      <strong className="text-white">{sla.value}</strong>
                    </div>
                    <div className="w-full h-1.5 bg-[#12151a] rounded-full overflow-hidden border border-slate-850/60">
                      <div className={`h-full ${sla.color}`} style={{ width: `${sla.percent}%` }} />
                    </div>
                  </div>
                ))}
              </div>

              <div className="p-3 border border-[#3b82f6]/20 bg-[#12151a] rounded text-[9px] text-slate-400 font-mono leading-relaxed space-y-1">
                <span className="font-bold text-blue-400 block uppercase">💡 BUDGET HEADSHRINK WARNING</span>
                <p>
                  Setting the engine to **PRO-PREVIEW** triggers maximum model parameters and higher precision specs doc markdown formatting, but uses approximately **16x more budget** than standard balanced cycles. Use carefully!
                </p>
              </div>
            </div>
          </motion.div>
        )}

        {activeTab === 'beta' && (
          <motion.div
            key="beta"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="space-y-4"
          >
            {/* Top overview panel */}
            <div className="bg-[#0f1115] border border-slate-800 rounded p-4 space-y-3">
              <div className="border-b border-slate-850 pb-2 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                <div>
                  <span className="text-[8px] font-mono text-emerald-400 font-bold uppercase tracking-widest block font-extrabold">Zero-Cost Growth Engineering</span>
                  <h3 className="text-sm font-bold text-white uppercase tracking-tight font-mono mt-0.5 flex items-center gap-1.5">
                    <Megaphone className="w-4 h-4 text-emerald-400" />
                    SaaS Micro-Budget Beta Tester Ingestion Playbook
                  </h3>
                </div>
                <div className="text-[10px] bg-emerald-950/20 text-emerald-400 border border-emerald-9a0/40 border-emerald-800 px-2 py-1 rounded font-mono font-bold uppercase">
                  ACTIVE VENTURE: <strong className="text-white">{ventureName.trim() || 'MySaaS'}</strong>
                </div>
              </div>

              <p className="text-[11px] text-slate-400 leading-relaxed max-w-4xl">
                When you have zero budget, paid ads are a trap. Instead, your best strategy is <strong className="text-white">organic target outreach</strong> and <strong className="text-white">community-led distribution</strong>. Below are personalized copy templates designed by our **Growth Marketer (MKT)** and **Sales** agents based on your active venture idea, along with high-relevance directories to secure your first 10-50 users.
              </p>
            </div>

            {/* Main Interactive Workspaces */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
              
              {/* Left Column: Targeted Outreach Copy Generators */}
              <div className="lg:col-span-2 bg-[#0d1013] border border-slate-800 rounded p-4 space-y-4 flex flex-col justify-between">
                <div>
                  <h4 className="text-xs font-bold text-white uppercase tracking-tight font-mono flex items-center gap-1.5 pb-2 border-b border-slate-850">
                    <FileCode className="w-4 h-4 text-blue-400" />
                    AI-Powered Copy Engine & Outreach Blueprints
                  </h4>

                  {/* Copy Sections */}
                  <div className="space-y-4 mt-3">
                    
                    {/* Copy Piece 1: HackerNews */}
                    <div className="space-y-1.5 font-mono text-[11px]">
                      <div className="flex items-center justify-between text-[#a0aec0]">
                        <span className="font-bold flex items-center gap-1"><span className="text-orange-500 font-bold">Y</span> HackerNews &quot;Show HN&quot; Copy Outline</span>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => fetchCopywriting('HackerNews', setAiHN, setLoadingHN)}
                            disabled={loadingHN}
                            className="px-2 py-1 bg-blue-950/40 hover:bg-blue-900/40 border border-blue-900/60 rounded text-[9px] text-blue-400 font-bold flex items-center gap-1 cursor-pointer transition-all disabled:opacity-50 animate-pulse"
                          >
                            {loadingHN ? 'Optimizing Copy...' : '✨ Generate with Gemini'}
                          </button>
                          <button
                            onClick={() => handleCopyText(aiHN || `Show HN: ${ventureName.trim() || 'MySaaS'} – ${pitch.trim() || 'Awesome new platform.'}\n\nHey HN,\n\nI always found myself wasting hours on ${pitch.toLowerCase().includes('automated') ? 'manually organizing and tracking workflows' : 'this exact manual coordination'}. I wanted a simple tool that did one thing well, so I built ${ventureName.trim() || 'MySaaS'} over the past few weeks.\n\nIt is built using: ${techStack}.\n\nI am ready for early beta testers! It is completely free during this beta testing period. Please check it out and let me know:\n1. What is the single biggest UX bottleneck you ran into?\n2. Does this solve a workflow problem you actually experience?\n\nLink: https://example.com/beta\n\nThanks!`, 'hn')}
                            className="px-2 py-1 bg-slate-900 border border-slate-800 hover:border-slate-700 rounded text-[9px] text-[#4299e1] font-bold flex items-center gap-1 cursor-pointer transition-all"
                          >
                            {copiedSection === 'hn' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                            {copiedSection === 'hn' ? 'Copied!' : 'Copy Template'}
                          </button>
                        </div>
                      </div>
                      
                      {aiHN ? (
                        <div className="bg-[#05060b] border border-blue-900/60 rounded p-2.5 text-blue-300 font-mono text-[10px] leading-relaxed whitespace-pre-wrap select-all max-h-48 overflow-y-auto">
                          {aiHN}
                        </div>
                      ) : (
                        <div className="bg-[#07090c] border border-slate-850 rounded p-2.5 text-slate-300 font-mono text-[10px] leading-relaxed whitespace-pre-wrap select-all">
                          <strong>Title:</strong> Show HN: {ventureName.trim() || 'MySaaS'} – {pitch.trim() || 'Awesome SaaS tool.'}
                          <br /><br />
                          Hey HN,
                          <br /><br />
                          I always found myself wasting hours on {pitch.toLowerCase().includes('automated') ? 'manually organizing and tracking workflows' : 'this exact manual coordination'}. I wanted a simple tool that did one thing well, so I built <strong>{ventureName.trim() || 'MySaaS'}</strong> over the past few weeks.
                          <br /><br />
                          It is built using: <span className="text-blue-400">{techStack}</span>.
                          <br /><br />
                          I am ready for early beta testers! It is completely free during this beta testing period. Please check it out and let me know:
                          <br />
                          1. What is the single biggest UX bottleneck you ran into?
                          <br />
                          2. Does this solve a workflow problem you actually experience?
                          <br /><br />
                          Link: https://example.com/beta
                          <br /><br />
                          Thanks!
                        </div>
                      )}
                    </div>

                    {/* Copy Piece 2: Reddit */}
                    <div className="space-y-1.5 font-mono text-[11px]">
                      <div className="flex items-center justify-between text-[#a0aec0]">
                        <span className="font-bold flex items-center gap-1"><span className="text-[#ff4500] font-bold">r/</span> Reddit Storytelling/Feedback Template</span>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => fetchCopywriting('Reddit', setAiReddit, setLoadingReddit)}
                            disabled={loadingReddit}
                            className="px-2 py-1 bg-blue-950/40 hover:bg-blue-900/40 border border-blue-900/60 rounded text-[9px] text-blue-400 font-bold flex items-center gap-1 cursor-pointer transition-all disabled:opacity-50"
                          >
                            {loadingReddit ? 'Compiling Reddit...' : '✨ Generate with Gemini'}
                          </button>
                          <button
                            onClick={() => handleCopyText(aiReddit || `Title: I built a simple tool to solve ${pitch.split('.')[0].substring(0, 60).toLowerCase()} (no ads, looking for honest testers)\n\nHey all,\n\nI was frustrated with existing options because they are either highly bloated or extremely expensive. To scratch my own itch, I built ${ventureName.trim() || 'MySaaS'}.\n\nHere's what it does: ${pitch.trim() || 'Awesome utility.'}\n\nIf anyone is currently struggling with this flow, I would love your brutally honest feedback on the workflow. I'm keeping it 100% free for beta testers.\n\nNo strings attached – just looking to see if this actually saves other people time or if I should pivot.\n\nCheck it out here: https://example.com/beta\n\nLet me know what you think in the comments!`, 'reddit')}
                            className="px-2 py-1 bg-slate-900 border border-slate-800 hover:border-slate-700 rounded text-[9px] text-[#4299e1] font-bold flex items-center gap-1 cursor-pointer transition-all"
                          >
                            {copiedSection === 'reddit' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                            {copiedSection === 'reddit' ? 'Copied!' : 'Copy Template'}
                          </button>
                        </div>
                      </div>

                      {aiReddit ? (
                        <div className="bg-[#05060b] border border-blue-900/60 rounded p-2.5 text-blue-300 font-mono text-[10px] leading-relaxed whitespace-pre-wrap select-all max-h-48 overflow-y-auto">
                          {aiReddit}
                        </div>
                      ) : (
                        <div className="bg-[#07090c] border border-slate-850 rounded p-2.5 text-slate-300 font-mono text-[10px] leading-relaxed whitespace-pre-wrap select-all">
                          <strong>Subreddits to post:</strong> r/sideproject, r/indiehackers, r/saas, r/entrepreneur
                          <br />
                          <strong>Title:</strong> I built a simple tool to solve {pitch.split('.')[0].substring(0, 60).toLowerCase()} (no ads, looking for honest testers)
                          <br /><br />
                          Hey all,
                          <br /><br />
                          I was frustrated with existing options because they are either highly bloated or extremely expensive. To scratch my own itch, I built <strong>{ventureName.trim() || 'MySaaS'}</strong>.
                          <br /><br />
                          Here's what it does: {pitch.trim() || 'Awesome utility.'}
                          <br /><br />
                          If anyone is currently struggling with this flow, I would love your brutally honest feedback on the workflow. I'm keeping it 100% free for beta testers.
                          <br /><br />
                          No strings attached – just looking to see if this actually saves other people time or if I should pivot.
                          <br /><br />
                          Check it out here: https://example.com/beta
                          <br /><br />
                          Let me know what you think in the comments!
                        </div>
                      )}
                    </div>

                    {/* Copy Piece 3: Outbox email */}
                    <div className="space-y-1.5 font-mono text-[11px]">
                      <div className="flex items-center justify-between text-[#a0aec0]">
                        <span className="font-bold flex items-center gap-1"><Mail className="w-3.5 h-3.5 text-emerald-500" /> Outbound Low-friction Email / LinkedIn Script</span>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => fetchCopywriting('Email', setAiEmail, setLoadingEmail)}
                            disabled={loadingEmail}
                            className="px-2 py-1 bg-blue-950/40 hover:bg-blue-900/40 border border-blue-900/60 rounded text-[9px] text-blue-400 font-bold flex items-center gap-1 cursor-pointer transition-all disabled:opacity-50"
                          >
                            {loadingEmail ? 'Polishing Script...' : '✨ Generate with Gemini'}
                          </button>
                          <button
                            onClick={() => handleCopyText(aiEmail || `Subject: Quick question about ${ventureName.trim() || 'MySaaS'} for your team?\n\nHi {{First Name}},\n\nI saw you are specializing in operations at {{Company}}. I promise to make this extremely brief.\n\nI recently built ${ventureName.trim() || 'MySaaS'} to solve a common headache:\n"${pitch.trim() || 'Awesome utility.'}"\n\nWe're currently enrolling a tiny cohort of 10-15 beta testers to try it for free and help us refine our core engine.\n\nWould you be open to a 5-minute chat, or perhaps just a link to click and play around with? If not, no worries at all!\n\nBest,\n{{Your Name}}`, 'email')}
                            className="px-2 py-1 bg-slate-900 border border-slate-800 hover:border-slate-700 rounded text-[9px] text-[#4299e1] font-bold flex items-center gap-1 cursor-pointer transition-all"
                          >
                            {copiedSection === 'email' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                            {copiedSection === 'email' ? 'Copied!' : 'Copy Template'}
                          </button>
                        </div>
                      </div>

                      {aiEmail ? (
                        <div className="bg-[#05060b] border border-blue-900/60 rounded p-2.5 text-blue-300 font-mono text-[10px] leading-relaxed whitespace-pre-wrap select-all max-h-48 overflow-y-auto">
                          {aiEmail}
                        </div>
                      ) : (
                        <div className="bg-[#07090c] border border-slate-850 rounded p-2.5 text-slate-300 font-mono text-[10px] leading-relaxed whitespace-pre-wrap select-all">
                          <strong>Subject:</strong> Quick question about {ventureName.trim() || 'MySaaS'} for your team?
                          <br /><br />
                          Hi &#123;&#123;First Name&#125;&#125;,
                          <br /><br />
                          I saw you are specializing in operations at &#123;&#123;Company&#125;&#125;. I promise to make this extremely brief.
                          <br /><br />
                          I recently built <strong>{ventureName.trim() || 'MySaaS'}</strong> to solve a common headache:
                          <br />
                          <i>&quot;{pitch.trim() || 'Awesome utility.'}&quot;</i>
                          <br /><br />
                          We&apos;re currently enrolling a tiny cohort of 10-15 beta testers to try it for free and help us refine our core engine.
                          <br /><br />
                          Would you be open to a 5-minute chat, or perhaps just a link to click and play around with? If not, no worries at all!
                          <br /><br />
                          Best,
                          <br />
                          &#123;&#123;Your Name&#125;&#125;
                        </div>
                      )}
                    </div>

                  </div>
                </div>

                <div className="p-3 bg-slate-900 border border-slate-850 rounded font-mono text-[9px] text-[#718096] leading-relaxed mt-4">
                  💡 **Growth Hacker Pro-Tip**: When sending outbound messages, do NOT ask for a sale immediately. Ask for **honest feedback** or **permission to share a link**. When users participate in shaping a product, they acquire a strong psychological ownership and are 10x more likely to convert into paid long-term advocates.
                </div>
              </div>

              {/* Right Column: Free Directories & Interactive Waitlist Embed Generator */}
              <div className="space-y-4">
                
                {/* Free Acquisition Directories */}
                <div className="bg-[#0f1115] border border-slate-800 rounded p-4 space-y-3.5">
                  <div>
                    <h4 className="text-xs font-bold text-white uppercase tracking-tight font-mono flex items-center gap-1.5">
                      <Globe className="w-4 h-4 text-emerald-400" />
                      Zero-Budget Ingestion Channels
                    </h4>
                    <p className="text-[9px] text-slate-505 mt-0.5">Where to locate high-relevance testers today for zero spend.</p>
                  </div>

                  <div className="space-y-2">
                    {[
                      { name: 'BetaList', cost: 'Free', audience: 'Early adopters', tip: 'Takes ~2 weeks for free review, great for pre-launch subscriber list building.' },
                      { name: 'HackerNews (Show HN)', cost: 'Free', audience: 'Engineers & founders', tip: 'Post on mid-weekday morning. Focus on the raw tech stack and design transparency.' },
                      { name: 'IndieHackers Product Log', cost: 'Free', audience: 'Indie developers', tip: 'Write a weekly transparent diary tracing how you build this SaaS to generate inbound traffic.' },
                      { name: 'Target Subreddits', cost: 'Free', audience: 'Niche specific users', tip: 'Search for groups already complaining about problems solved by your value statement.' },
                      { name: 'Twitter / X Outbound', cost: 'Free', audience: 'Tech community', tip: 'Search for keywords like "wish there was a tool for..." or "tool that automates..." and reply directly.' }
                    ].map(chan => (
                      <div key={chan.name} className="p-2.5 rounded border border-[#1e232b] bg-[#12151a] space-y-1 font-mono text-[10px]">
                        <div className="flex justify-between items-center text-white">
                          <strong className="text-emerald-400">{chan.name}</strong>
                          <span className="text-[8px] border border-slate-800 bg-[#0f1115] text-slate-400 px-1 py-0.2 rounded font-extrabold">{chan.cost}</span>
                        </div>
                        <p className="text-[9px] text-slate-400 leading-tight"><strong>Audience:</strong> {chan.audience}</p>
                        <p className="text-[9px] text-slate-500 italic leading-tight">{chan.tip}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Interactive Embed widget generator */}
                <div className="bg-[#0f1115] border border-slate-800 rounded p-4 space-y-3">
                  <div>
                    <h4 className="text-xs font-bold text-white uppercase tracking-tight font-mono flex items-center gap-1.5">
                      <Terminal className="w-4 h-4 text-purple-450 text-purple-400" />
                      Embeddable Beta Registration Form
                    </h4>
                    <p className="text-[9px] text-slate-500 mt-0.5">Test the signup flow in-app, then copy the pure code directly into your code branch.</p>
                  </div>

                  {/* Interactive form preview */}
                  <div className="bg-[#0a0d11] border border-[#14181f] rounded p-4 text-center space-y-3">
                    <span className="text-[8px] font-mono font-bold text-slate-500 block uppercase tracking-widest">🚨 Live Workspace Preview</span>
                    
                    <div className="space-y-3 p-3 bg-[#11161d] border border-slate-800/85 rounded shadow">
                      <h5 className="text-[11px] font-bold text-white font-mono uppercase">Join the {ventureName.trim() || 'MySaaS'} Beta</h5>
                      <p className="text-[9px] text-slate-400 leading-tight select-none">Enter your business email. Early-invite beta slots are completely free forever.</p>
                      
                      {!betaSubmitted ? (
                        <form
                          onSubmit={(e) => {
                            e.preventDefault();
                            if (betaEmail.trim()) setBetaSubmitted(true);
                          }}
                          className="flex flex-col gap-2 pt-1"
                        >
                          <input
                            type="email"
                            placeholder="Enter your email"
                            value={betaEmail}
                            onChange={(e) => setBetaEmail(e.target.value)}
                            className="bg-[#0c0f13] border border-slate-800 text-white p-2 rounded text-[10px] font-mono focus:outline-none focus:border-emerald-500"
                            required
                          />
                          <button
                            type="submit"
                            className="bg-emerald-600 hover:bg-emerald-500 text-white font-mono font-bold text-[9px] uppercase px-3 py-1.5 rounded cursor-pointer transition-colors"
                          >
                            Secure Free Invitation
                          </button>
                        </form>
                      ) : (
                        <div className="p-2.5 bg-emerald-950/20 border border-emerald-950 rounded text-emerald-400 text-[10px] font-mono font-bold">
                          🚀 Success! added {betaEmail} to queue.
                          <button
                            onClick={() => {
                              setBetaSubmitted(false);
                              setBetaEmail('');
                            }}
                            className="block mx-auto mt-1.5 text-[8px] text-[#4299e1] hover:underline cursor-pointer"
                          >
                            Reset Form Simulator
                          </button>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Code export action button */}
                  <button
                    onClick={() => handleCopyText(`import React, { useState } from 'react';\n\nexport default function BetaSignup() {\n  const [email, setEmail] = useState('');\n  const [submitted, setSubmitted] = useState(false);\n\n  const handleSubmit = (e) => {\n    e.preventDefault();\n    if (email) {\n      // Replace with your real submission/database backend logic\n      setSubmitted(true);\n    }\n  };\n\n  return (\n    <div className="max-w-md mx-auto p-6 bg-slate-900 border border-slate-800 rounded-lg shadow-xl text-center space-y-4 font-sans">\n      <h3 className="text-lg font-bold text-white">Join the ${ventureName.trim() || 'MySaaS'} Beta</h3>\n      <p className="text-xs text-slate-400">Be the first to know when we launch. Free early access forever.</p>\n      {!submitted ? (\n        <form onSubmit={handleSubmit} className="flex gap-2">\n          <input \n            type="email" \n            placeholder="Enter your email" \n            value={email} \n            onChange={e => setEmail(e.target.value)} \n            required \n            className="flex-1 px-3 py-2 bg-slate-950 border border-slate-800 text-white rounded text-sm focus:outline-none focus:border-emerald-500" \n          />\n          <button type="submit" className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded text-sm transition-colors">\n            Get Access\n          </button>\n        </form>\n      ) : (\n        <div className="p-3 bg-emerald-950/20 border border-emerald-900 rounded text-emerald-400 text-sm font-semibold">\n          🚀 Success! You have been added to the queue.\n        </div>\n      )}\n    </div>\n  );\n}`, 'code')}
                    id="copy-signup-react-code-btn"
                    className="w-full text-center py-2.5 bg-blue-600 hover:bg-blue-500 hover:text-white rounded border border-blue-700 hover:border-blue-500 font-mono text-[10px] text-white font-bold flex items-center justify-center gap-1.5 cursor-pointer transition-all"
                  >
                    {copiedSection === 'code' ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    {copiedSection === 'code' ? 'JSX Code Copied!' : 'Copy React Landing Component Code'}
                  </button>
                </div>

              </div>

            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
