import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ShieldCheck, 
  Terminal, 
  MessageSquare, 
  Layers, 
  Zap, 
  Copy, 
  Check, 
  Github, 
  Play, 
  FileText, 
  GitBranch, 
  Cpu, 
  ChevronRight, 
  Star,
  Users,
  Compass,
  ArrowRight,
  Sparkles,
  Database
} from 'lucide-react';

interface LandingPageProps {
  onEnterDashboard: () => void;
  readmeText: string;
  architectureText: string;
  installText: string;
  dockerComposeText: string;
}

export function LandingPage({
  onEnterDashboard,
  readmeText,
  architectureText,
  installText,
  dockerComposeText
}: LandingPageProps) {
  const [copiedText, setCopiedText] = useState(false);
  const [activeDocTab, setActiveDocTab] = useState<'readme' | 'architecture' | 'install' | 'compose'>('readme');
  const [copiedDoc, setCopiedDoc] = useState(false);

  const quickstartCmd = `git clone https://github.com/virtforce/virtforce.git\ncd virtforce && cp .env.example .env\ndocker-compose up --build`;

  const handleCopyQuickstart = () => {
    navigator.clipboard.writeText(quickstartCmd);
    setCopiedText(true);
    setTimeout(() => setCopiedText(false), 2000);
  };

  const currentDocContent = () => {
    switch (activeDocTab) {
      case 'readme': return readmeText;
      case 'architecture': return architectureText;
      case 'install': return installText;
      case 'compose': return dockerComposeText;
      default: return readmeText;
    }
  };

  const currentDocFilename = () => {
    switch (activeDocTab) {
      case 'readme': return 'README.md';
      case 'architecture': return 'ARCHITECTURE.md';
      case 'install': return 'INSTALL.md';
      case 'compose': return 'docker-compose.yml';
      default: return 'README.md';
    }
  };

  const handleCopyDoc = () => {
    navigator.clipboard.writeText(currentDocContent());
    setCopiedDoc(true);
    setTimeout(() => setCopiedDoc(false), 2000);
  };

  return (
    <div className="bg-[#0b0d13] min-h-screen text-slate-100 selection:bg-blue-600/30 font-sans antialiased relative overflow-hidden">
      
      {/* Decorative ambient background glows */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-blue-900/10 rounded-full blur-[120px] pointer-events-none -translate-x-1/2" />
      <div className="absolute bottom-20 right-1/4 w-[600px] h-[600px] bg-purple-900/5 rounded-full blur-[150px] pointer-events-none translate-x-1/2" />

      {/* --- Global Promo Header --- */}
      <header className="border-b border-slate-900 bg-[#0c0e14]/95 backdrop-blur sticky top-0 z-50 px-4 py-3 sm:px-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          
          {/* Logo Brand */}
          <div className="flex items-center gap-2.5">
            <span className="text-xl">🛡️</span>
            <div>
              <div className="flex items-center gap-1.5 leading-none">
                <span className="font-mono text-xs font-black tracking-wider text-white uppercase">
                  virtForce
                </span>
                <span className="bg-blue-955 text-blue-400 border border-blue-900/60 text-[8px] font-mono px-1.5 py-0.2 rounded font-extrabold uppercase">
                  v2.5 Self-Host
                </span>
              </div>
              <p className="text-[10px] text-slate-500 font-mono mt-0.5">Secure Multi-Agent Containment</p>
            </div>
          </div>

          {/* Nav items */}
          <nav className="hidden md:flex items-center gap-6 text-xs font-mono text-slate-400 font-bold">
            <a href="#motivation" className="hover:text-white transition-colors">Why virtForce?</a>
            <a href="#features" className="hover:text-white transition-colors">Core Architecture</a>
            <a href="#documentation" className="hover:text-white transition-colors">Open Source Hub</a>
          </nav>

          {/* Header Action Gateways */}
          <div className="flex items-center gap-3">
            <a 
              href="https://github.com/virtforce/virtforce" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="flex items-center gap-1.5 bg-[#121620] hover:bg-[#181d2a] border border-slate-800 text-slate-350 text-[11px] font-mono font-bold px-3 py-1.5 rounded transition-all select-none"
            >
              <Github className="w-3.5 h-3.5 text-white" />
              <span>GitHub Star</span>
              <span className="text-slate-500 flex items-center gap-0.5 border-l border-slate-800 pl-1.5">
                <Star className="w-2.5 h-2.5 fill-amber-400 text-amber-400" />
                1.4k
              </span>
            </a>

            <button 
              onClick={onEnterDashboard}
              id="header-dashboard-launch-btn"
              className="px-3.5 py-1.5 bg-blue-600 hover:bg-blue-500 text-white text-[11px] font-mono font-bold rounded shadow-[0_0_15px_rgba(37,99,235,0.2)] hover:shadow-[0_0_20px_rgba(37,99,235,0.4)] cursor-pointer transition-all active:scale-98 flex items-center gap-1"
            >
              <Terminal className="w-3.5 h-3.5" />
              <span>ORCHESTRATOR DEMO</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>

        </div>
      </header>

      {/* --- HERO SECTION --- */}
      <section className="px-4 py-16 sm:px-6 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
        
        {/* Left column hero text */}
        <div className="lg:col-span-7 space-y-6">
          <div className="inline-flex items-center gap-1.5 bg-blue-955/20 border border-blue-900 px-2.5 py-1 rounded text-[10px] text-blue-400 font-mono font-bold tracking-wider uppercase">
            <Zap className="w-3 h-3 animate-pulse text-blue-400" />
            The Lightweight Alternative to OpenClaw
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white leading-[1.1] font-sans">
            Your Personal. <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400">Containerized.</span> <br />
            Secure AI Agent Swarm.
          </h1>

          <p className="text-sm text-slate-400 leading-relaxed max-w-xl">
            virtForce is a highly secure, offline-first multi-agent development swarm that compiles code, runs linters, and handles databases—entirely isolated in private, local Docker sandbox containers. Zero exposed api keys. Zero cloud lock-ins. Custom-built for single developers.
          </p>

          {/* Quickstart Command Widget */}
          <div className="space-y-2 max-w-lg">
            <span className="text-[10px] tracking-wider font-mono font-bold text-slate-500 uppercase block">🚀 Spin up local sandboxes in 3 lines:</span>
            <div className="bg-[#0e1117] border border-slate-800 rounded p-3 font-mono text-xs text-slate-300 relative group flex items-center justify-between shadow-2xl">
              <div className="overflow-x-auto pr-8 pr-12 select-text leading-relaxed whitespace-pre font-mono text-slate-200">
                {quickstartCmd}
              </div>
              <button
                type="button"
                onClick={handleCopyQuickstart}
                className="absolute right-3 p-1.5 bg-[#1a1f2c] text-slate-400 hover:text-white border border-slate-850 rounded hover:bg-slate-800 transition-colors cursor-pointer"
                title="Copy installation lines"
              >
                {copiedText ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              </button>
            </div>
          </div>

          {/* Action buttons CTAs */}
          <div className="flex flex-wrap items-center gap-3 pt-2">
            <button
              onClick={onEnterDashboard}
              id="hero-launch-dashboard-btn"
              className="px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white text-xs font-mono font-bold rounded shadow-[0_4px_20px_rgba(79,70,229,0.3)] hover:shadow-[0_4px_25px_rgba(79,70,229,0.5)] cursor-pointer transition-all active:scale-98 flex items-center gap-1.5 uppercase"
            >
              <Play className="w-4 h-4 fill-white" />
              Launch Live Terminal Sandbox
            </button>
            <a
              href="#documentation"
              className="px-5 py-3 bg-[#12151e] border border-slate-800 text-slate-300 hover:text-white text-xs font-mono font-bold rounded hover:bg-[#1a1e2b] transition-all flex items-center gap-1.5"
            >
              <FileText className="w-4 h-4" />
              Read System Docs
            </a>
          </div>
        </div>

        {/* Right column terminal illustration */}
        <div className="lg:col-span-5 relative">
          
          {/* Neon back glow frame */}
          <div className="absolute inset-0 bg-blue-500/5 blur-3xl rounded-xl" />

          {/* Realistic code workspace wrapper */}
          <div className="relative bg-[#0e1118]/90 border border-slate-800 rounded-xl shadow-2xl overflow-hidden font-mono text-[11px] leading-relaxed">
            
            {/* Window bar */}
            <div className="bg-[#0a0c10] px-4 py-2 flex items-center justify-between border-b border-slate-900">
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-rose-500" />
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
              </div>
              <span className="text-[9px] font-mono text-slate-500 uppercase tracking-widest font-extrabold">docker-compose logs</span>
              <span className="w-10" />
            </div>

            {/* Terminal Body content */}
            <div className="p-4 h-64 overflow-y-auto select-none space-y-1.5 text-slate-400">
              <div className="text-slate-500">Creating network &quot;virtforce_default&quot; with driver &quot;bridge&quot;</div>
              <div className="text-slate-500">Creating virtforce-container-dev ... <span className="text-emerald-400">done</span></div>
              <div className="text-slate-500">Creating virtforce-host-orchestrator ... <span className="text-emerald-400">done</span></div>
              <div className="text-blue-400">virtforce-host | [HOST SERVER] Active and listening at http://0.0.0.0:3000</div>
              <div className="text-blue-400">virtforce-host | [SECURE INIT] Active credentials verified: Sandbox keys locked in virtual environments.</div>
              <div className="text-indigo-400">virtforce-dev  | [SANDBOX] Running yarn install ... OK</div>
              <div className="text-indigo-400">virtforce-dev  | [SANDBOX] Spawning lint workspace compiler and vulnerability auditer.</div>
              <div className="text-emerald-400 animate-pulse">virtforce-host | [GATEWAY] WhatsApp webhook safely online on Port 10304!</div>
              <div className="text-emerald-400">virtforce-host | [SUBSCRIBE] Listening for commands on Telegram channel &quot;@virtForceBot&quot;...</div>
              <div className="text-slate-500 pt-2">$ _</div>
            </div>

            {/* Micro panel footer */}
            <div className="bg-[#0a0c10]/80 px-4 py-2 border-t border-slate-900 flex items-center justify-between text-[9px] text-slate-500 font-bold uppercase">
              <span>STATUS: SECURE ISOLATION V2</span>
              <span className="text-blue-400 font-mono">PORT 3000 - CONTAINER ACTIVE</span>
            </div>
          </div>
        </div>

      </section>

      {/* --- SECTION: THE MOTIVATION --- */}
      <section id="motivation" className="border-t border-b border-slate-900 bg-[#090b10] py-20 px-4 sm:px-6 relative z-10">
        <div className="max-w-7xl mx-auto space-y-12">
          
          {/* Header titles */}
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="text-[10px] tracking-widest font-mono font-bold text-blue-400 uppercase">THE CORE CRUSADE</span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Why Self-Host Multi-Agent Swarms?
            </h2>
            <p className="text-xs text-slate-400 leading-normal">
              Most generic AI co-pilots run everything inside remote, insecure cloud APIs. Once you deploy, you open high-privilege credentials and local keys to direct compromise. virtForce turns security upside down.
            </p>
          </div>

          {/* Use case columns - bento grid format */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Box 1 */}
            <div className="bg-[#0e1117] border border-slate-850 p-6 rounded-lg space-y-3 hover:border-slate-800 transition-colors">
              <div className="w-10 h-10 rounded bg-blue-950/40 border border-blue-900/60 flex items-center justify-center text-blue-400">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-bold text-white uppercase font-mono tracking-tight">Security By Containment</h3>
              <p className="text-xs text-slate-400 leading-relaxed font-sans">
                No third-party models or execution workers can download arbitrary web scripts or execute malicious terminal commands directly on your deployment node. Compilations operate inside isolated, throwaway containers.
              </p>
            </div>

            {/* Box 2 */}
            <div className="bg-[#0e1117] border border-slate-850 p-6 rounded-lg space-y-3 hover:border-slate-800 transition-colors">
              <div className="w-10 h-10 rounded bg-purple-950/40 border border-purple-900/60 flex items-center justify-center text-purple-400">
                <Users className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-bold text-white uppercase font-mono tracking-tight font-bold">Personalized Swarms</h3>
              <p className="text-xs text-slate-400 leading-relaxed font-sans">
                Not a bloated playground. Rather than multi-tenant remote software boards, virtForce provides a private, lightweight system dedicated to a single owner, executing tasks, staging branch pull requests, and verifying local files.
              </p>
            </div>

            {/* Box 3 */}
            <div className="bg-[#0e1117] border border-slate-850 p-6 rounded-lg space-y-3 hover:border-slate-800 transition-colors">
              <div className="w-10 h-10 rounded bg-indigo-950/40 border border-indigo-900/60 flex items-center justify-center text-indigo-400">
                <MessageSquare className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-bold text-white uppercase font-mono tracking-tight font-bold">Mobile Ops (Gateways)</h3>
              <p className="text-xs text-slate-400 leading-relaxed font-sans">
                Ditch heavy front-end portals on the go. Call your containers, consult stats, inspect compile results, or merge pull requests directly from your mobile device via securely signed WhatsApp or Telegram webhook messengers.
              </p>
            </div>

          </div>

          {/* Sub motivation note container */}
          <div className="bg-blue-950/10 border border-blue-900/40 max-w-4xl mx-auto rounded-lg p-5 flex flex-col sm:flex-row items-start sm:items-center gap-4 text-xs font-sans text-slate-300">
            <span className="text-2xl flex-shrink-0">🚀</span>
            <div className="space-y-1">
              <strong className="text-white">Built for Indie Hackers going to Production:</strong>
              <p className="text-slate-400 leading-normal">
                virtForce proves you don&apos;t need complex subscription frameworks or massive server bills to run an automated AI workforce. Install the self-contained container images, run your server on any $5/month host container, and manage the entire operations matrix securely.
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* --- SECTION: CORE FEATURES SPECIFICATIONS --- */}
      <section id="features" className="py-20 px-4 sm:px-6 max-w-7xl mx-auto relative z-10 space-y-12">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="text-[10px] tracking-widest font-mono font-bold text-blue-400 uppercase">FEATURES SPEC SHEET</span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Comprehensive Operational Features
          </h2>
          <p className="text-xs text-slate-400 leading-normal">
            Every feature is designed to trace back directly to local security, developer sovereignty, and zero-spend user acquisition.
          </p>
        </div>

        {/* Feature Bento Grid Row */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Card 0: Topological CAD Swarm Orchestration Canvas & Inspector */}
          <div className="lg:col-span-12 bg-[#0d1017] border border-slate-800 p-6 md:p-8 rounded-xl space-y-6 shadow-2xl relative overflow-hidden group hover:border-slate-700 transition-all">
            {/* Visual background gradient accents */}
            <div className="absolute top-0 right-0 w-80 h-80 bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -bottom-10 -left-10 w-80 h-80 bg-indigo-500/5 rounded-full blur-3xl pointer-events-none" />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              
              {/* Product value copy (col-span-5) */}
              <div className="lg:col-span-5 space-y-4">
                <span className="text-[9px] font-mono tracking-widest font-extrabold text-[#00d2ff] uppercase bg-[#00d2ff]/10 border border-[#00d2ff]/20 px-2 py-0.5 rounded">
                  INDUSTRY-LEADING ORCHESTRATION PRESET
                </span>
                <h3 className="text-xl md:text-2xl font-extrabold text-white tracking-tight uppercase font-mono">
                  Interactive CAD Swarm Canvas
                </h3>
                <p className="text-xs text-slate-400 font-sans leading-relaxed">
                  Unlike traditional platforms like <strong>SwarmClaw</strong> or <strong>ClawTeam</strong>, which only display non-interactive, read-only text lists or static logs, virtForce introduces an active <strong>Modular CAD Swarm Canvas</strong>.
                </p>
                <p className="text-xs text-slate-400 font-sans leading-relaxed">
                  This lets you physically reposition specialized agents (CEO Supervisor, Specs PM, Containerized Dev, Vulnerability QA, Secure DevOps Infrastructure, and Organic Growth Marketer), visualize data pathways, configure container parameters inside the live attributes inspector (RAM boundaries, socket ports, LLM presets), and execute simulated webhook signal pulses in real-time.
                </p>

                <div className="space-y-2 pt-2">
                  <div className="flex items-center gap-2 text-xs font-mono text-slate-350">
                    <span className="text-emerald-400">✔</span>
                    <span>Fully interactive drag-and-drop orchestration nodes</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs font-mono text-slate-350">
                    <span className="text-emerald-400">✔</span>
                    <span>Live container constraints inspector (RAM, Ports, Models)</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs font-mono text-slate-350">
                    <span className="text-emerald-400">✔</span>
                    <span>Real-time webhook impulse testing simulation</span>
                  </div>
                </div>

                <div className="pt-3">
                  <button 
                    onClick={onEnterDashboard}
                    className="px-4 py-2 bg-blue-600 hover:bg-blue-500 hover:text-white text-white font-mono font-bold text-xs rounded transition-all flex items-center gap-1.5 shadow-lg shadow-blue-900/40 cursor-pointer"
                  >
                    <Play className="w-3.5 h-3.5 fill-current" />
                    <span>Launch Sandbox Controls</span>
                  </button>
                </div>
              </div>

              {/* Graphic Mockup of Draggable CAD Canvas (col-span-7) */}
              <div className="lg:col-span-7 bg-[#07090d] border border-slate-850 rounded-lg p-4 relative shadow-inner flex flex-col justify-between h-[280px]">
                {/* Simulated workspace dots */}
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#131722_1px,transparent_1px),linear-gradient(to_bottom,#131722_1px,transparent_1px)] bg-[size:16px_16px] opacity-40 pointer-events-none" />

                {/* Micro dashboard stats */}
                <div className="relative z-10 flex items-center justify-between border-b border-slate-900 pb-2">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="text-[8px] font-mono text-slate-400 uppercase tracking-wide">Topology Preview Status: Stream Active</span>
                  </div>
                  <span className="text-[8px] font-mono text-blue-400 bg-blue-950/40 border border-blue-900/40 px-1.5 py-0.5 rounded uppercase">SIMULATED INTEGRITY</span>
                </div>

                {/* Animated graphic representation of connected circles */}
                <div className="relative flex-grow flex items-center justify-center p-4">
                  <svg className="w-full h-full max-h-[160px]" viewBox="0 0 500 130">
                    <defs>
                      <linearGradient id="gradientLine" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#ef4444" stopOpacity="0.2" />
                        <stop offset="50%" stopColor="#3b82f6" stopOpacity="0.8" />
                        <stop offset="100%" stopColor="#22c55e" stopOpacity="0.8" />
                      </linearGradient>
                    </defs>

                    {/* Connection wires */}
                    <path d="M 50 65 Q 130 25 210 65 T 370 40 T 450 65" fill="none" stroke="url(#gradientLine)" strokeWidth="2" strokeDasharray="5,5" className="animate-[flow-pulse_20s_linear_infinite]" />
                    <path d="M 450 65 Q 250 120 50 65" fill="none" stroke="#22c55e" strokeWidth="1" strokeDasharray="3,3" />

                    {/* Nodes with custom names and interactive looks */}
                    {[
                      { id: 'CEO', x: 50, y: 65, avatar: '🎯', label: 'Supervisor' },
                      { id: 'PM', x: 130, y: 40, avatar: '📋', label: 'Crew Specs' },
                      { id: 'DEV', x: 210, y: 65, avatar: '💻', label: 'OpenHands' },
                      { id: 'QA', x: 290, y: 90, avatar: '🛡️', label: 'Test Sandbox' },
                      { id: 'DEVOPS', x: 370, y: 40, avatar: '⚙️', label: 'GitOps Pipeline' },
                      { id: 'MKT', x: 450, y: 65, avatar: '✨', label: 'Ad Copy' }
                    ].map(node => (
                      <g key={node.id} className="cursor-default">
                        <circle cx={node.x} cy={node.y} r="18" fill="#0d1017" stroke="#3b82f6" strokeWidth="2" className="transition-transform hover:scale-110 duration-200" />
                        <text x={node.x} y={node.y + 4} textAnchor="middle" fontSize="11">{node.avatar}</text>
                        <text x={node.x} y={node.y + 26} textAnchor="middle" fontSize="8" fontFamily="monospace" fill="#aeacc8" fontWeight="bold">{node.id}</text>
                        <text x={node.x} y={node.y - 24} textAnchor="middle" fontSize="7" fontFamily="monospace" fill="#64748b">{node.label}</text>
                      </g>
                    ))}
                  </svg>

                  {/* Drag cursor indicator overlay */}
                  <div className="absolute top-1/2 left-[53%] -translate-x-1/2 -translate-y-1/2 bg-blue-500 text-white rounded-full p-1 shadow-lg border border-white animate-bounce pointer-events-none">
                    <span className="text-[10px] block leading-none">👆 Drag</span>
                  </div>
                </div>

                {/* Simulated parameter feedback list */}
                <div className="grid grid-cols-3 gap-2 border-t border-slate-900 pt-2 text-[8px] font-mono">
                  <div className="bg-[#0c0e14] p-1.5 rounded border border-slate-800">
                    <span className="text-slate-500 block uppercase">Orchestrator Mode</span>
                    <span className="text-[#00d2ff] font-bold">LangGraph Hierarchy</span>
                  </div>
                  <div className="bg-[#0c0e14] p-1.5 rounded border border-slate-800">
                    <span className="text-slate-500 block uppercase">Docker Protection</span>
                    <span className="text-emerald-400 font-bold">Iso V2 [Low, Med, High]</span>
                  </div>
                  <div className="bg-[#0c0e14] p-1.5 rounded border border-slate-800">
                    <span className="text-slate-500 block uppercase">Signal Testing</span>
                    <span className="text-purple-400 font-bold">Impulse Injection Ready</span>
                  </div>
                </div>

              </div>
            </div>
          </div>

          {/* Card 0A: Selective Web Ingress & Topological Influx Connection Graph */}
          <div className="lg:col-span-12 bg-[#090b11] border border-slate-800/70 p-6 md:p-8 rounded-xl space-y-6 shadow-2xl relative overflow-hidden group hover:border-[#00d2ff]/40 transition-all">
            {/* Visual background gradient accents */}
            <div className="absolute top-0 left-0 w-96 h-96 bg-[#00d2ff]/5 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -bottom-10 right-0 w-80 h-80 bg-purple-500/5 rounded-full blur-3xl pointer-events-none" />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              {/* Left Column Graphic Mockup of Topological Context Graph Node Ledger (col-span-7) */}
              <div className="lg:col-span-7 bg-[#050608] border border-slate-850 rounded-lg p-5 relative shadow-inner flex flex-col justify-between min-h-[300px]">
                {/* Simulated workspace dots */}
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#0e111a_1px,transparent_1px),linear-gradient(to_bottom,#0e111a_1px,transparent_1px)] bg-[size:18px_18px] opacity-55 pointer-events-none" />

                {/* Micro panel stats */}
                <div className="relative z-10 flex items-center justify-between border-b border-slate-900 pb-2">
                  <div className="flex items-center gap-1.5 font-mono text-[9px]">
                    <span className="p-0.5 px-1.5 rounded bg-emerald-950 text-emerald-400 border border-emerald-900/60 font-bold">SERIALIZER ACTIVE</span>
                    <span className="text-slate-500">Node Identifier: Ingress-V2-Crawler</span>
                  </div>
                  <span className="text-[8px] font-mono text-[#00d2ff] bg-[#00d2ff]/10 border border-[#00d2ff]/20 px-1.5 py-0.5 rounded uppercase font-bold">92.1% Token Save</span>
                </div>

                {/* Animated SVG relational context graph hierarchy exactly like Claude! */}
                <div className="relative flex-grow flex items-center justify-center py-6">
                  <svg className="w-full max-w-[480px] h-[160px] relative z-10" viewBox="0 0 500 160">
                    <defs>
                      <marker id="arrow-lp" viewBox="0 0 10 10" refX="22" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                        <path d="M 0 0 L 10 5 L 0 10 z" fill="#334155" />
                      </marker>
                      <marker id="arrow-active-lp" viewBox="0 0 10 10" refX="22" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                        <path d="M 0 0 L 10 5 L 0 10 z" fill="#00d2ff" />
                      </marker>
                    </defs>

                    {/* Connection wires */}
                    <line x1="50" y1="80" x2="160" y2="40" stroke="#00d2ff" strokeWidth="2" strokeDasharray="3,3" markerEnd="url(#arrow-active-lp)" />
                    <line x1="160" y1="40" x2="270" y2="80" stroke="#00d2ff" strokeWidth="2" markerEnd="url(#arrow-active-lp)" />
                    <line x1="270" y1="80" x2="410" y2="40" stroke="#00d2ff" strokeWidth="2" markerEnd="url(#arrow-active-lp)" />
                    <line x1="270" y1="80" x2="410" y2="120" stroke="#334155" strokeWidth="1.2" markerEnd="url(#arrow-lp)" />

                    {/* Nodes with custom names and interactive looks */}
                    {[
                      { id: 'HTML', x: 50, y: 80, name: 'index.html', label: 'HTML Ingress Engine', fill: '#0a0d14', stroke: '#1e293b', emoji: '🌐' },
                      { id: 'BOOT', x: 160, y: 40, name: 'main.tsx', label: 'Vite Bootstrap Target', fill: '#0a0d14', stroke: '#1e293b', emoji: '⚡' },
                      { id: 'CORE', x: 270, y: 80, name: 'App.tsx', label: 'App Shell Router', fill: '#141a24', stroke: '#00d2ff', emoji: '📦' },
                      { id: 'MAPS', x: 410, y: 40, name: 'MapboxRoute.tsx', label: 'GPS Coordinates API', fill: '#1b2332', stroke: '#00d2ff', emoji: '🗺️' },
                      { id: 'DBMS', x: 410, y: 120, name: 'TechnicianDb.ts', label: 'SQLite Persistence Layer', fill: '#0a0d14', stroke: '#1e293b', emoji: '💾' }
                    ].map(node => (
                      <g key={node.id}>
                        <circle cx={node.x} cy={node.y} r="15" fill={node.fill} stroke={node.stroke} strokeWidth="1.5" />
                        <text x={node.x} y={node.y + 3.5} textAnchor="middle" fontSize="10">{node.emoji}</text>
                        <text x={node.x} y={node.y + 22} textAnchor="middle" fontSize="8" fontFamily="monospace" fill="#e2e8f0" fontWeight="bold">{node.name}</text>
                        <text x={node.x} y={node.y - 18} textAnchor="middle" fontSize="7" fontFamily="monospace" fill="#475569">{node.id}</text>
                      </g>
                    ))}
                  </svg>
                </div>

                {/* Comparison Stats */}
                <div className="grid grid-cols-2 gap-3 border-t border-slate-900 pt-3 text-[9px] font-mono">
                  <div className="bg-[#090b10] p-2 rounded border border-slate-850/80">
                    <span className="text-rose-400 font-bold block uppercase mb-0.5">Cold Workspace Crawl:</span>
                    <span className="text-slate-400">~148K Tokens (Slow 25s parse)</span>
                  </div>
                  <div className="bg-[#090b10] p-2 rounded border border-slate-850/80">
                    <span className="text-emerald-400 font-bold block uppercase mb-0.5">virtForce Cache Match:</span>
                    <span className="text-white font-extrabold">~11.8K Tokens (Instant 0.1s run)</span>
                  </div>
                </div>
              </div>

              {/* Right Column Product value copy (col-span-5) */}
              <div className="lg:col-span-5 space-y-4">
                <span className="text-[9px] font-mono tracking-widest font-extrabold text-[#00d2ff] uppercase bg-[#00d2ff]/10 border border-[#00d2ff]/20 px-2 py-0.5 rounded">
                  CLAUDE-STYLE HIGHEST PERFORMANCE INITIALIZER
                </span>
                <h3 className="text-xl md:text-2xl font-extrabold text-white tracking-tight uppercase font-mono">
                  Topological Ingress Crawler
                </h3>
                <p className="text-xs text-slate-400 font-sans leading-relaxed">
                  Ready to let the virtForce self-contained swarm code on any other project (like a live operational tracking dashboard or retail payment pipeline)? 
                </p>
                <p className="text-xs text-slate-400 font-sans leading-relaxed">
                  Simply feed any domain URL, Docker webhook, or Git SSH credentials! Our <strong>Remote Ingress Crawler</strong> downloads public code blocks, parses operational frameworks, and converts the metadata into active agent developer backlogs.
                </p>
                <p className="text-xs text-slate-400 font-sans leading-relaxed">
                  By compiling directory structures into lightweight, serialized <strong>context-graphs</strong> (exactly like Claude’s topological memory maps), changes are tracked using fast delta hashes, bypassing slow repository walkthroughs on successive sessions to save more than <strong>$92.1% runtime LLM token expenses</strong>.
                </p>

                <div className="space-y-2 pt-1">
                  <div className="flex items-center gap-2 text-xs font-mono text-slate-350">
                    <span className="text-emerald-400">⚡</span>
                    <span>1-Click Project Ingestion via Crawl & Git Pipeling</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs font-mono text-slate-350">
                    <span className="text-emerald-400">⚡</span>
                    <span>92.1% Token savings via Claude-style serialization caching</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs font-mono text-slate-350">
                    <span className="text-emerald-400">⚡</span>
                    <span>Adaptive backlog generator for special apps/targets</span>
                  </div>
                </div>

                <div className="pt-2">
                  <button 
                    onClick={onEnterDashboard}
                    className="px-4 py-2 bg-gradient-to-r from-blue-600 to-[#00d2ff] hover:from-blue-500 hover:to-[#05dcff] text-white font-mono font-bold text-xs uppercase rounded cursor-pointer transition-all shadow-md flex items-center justify-center gap-1.5"
                  >
                    <ArrowRight className="w-3.5 h-3.5" />
                    <span>Try Ingress In Developer Sandbox</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Card 0B: Open-Source Multica Daemon Integration Companion */}
          <div className="lg:col-span-12 bg-[#090b11] border border-slate-800/70 p-6 md:p-8 rounded-xl space-y-6 shadow-2xl relative overflow-hidden group hover:border-indigo-500/40 transition-all">
            {/* Visual background gradient accents */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/5 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -bottom-10 left-0 w-80 h-80 bg-purple-500/5 rounded-full blur-3xl pointer-events-none" />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              {/* Left Column Product value copy (col-span-5) */}
              <div className="lg:col-span-5 space-y-4">
                <span className="text-[9px] font-mono tracking-widest font-extrabold text-indigo-400 bg-indigo-950/40 border border-indigo-900/60 px-2 py-0.5 rounded uppercase">
                  ACTIVE MULTICA TEAMMATE COOPERATION
                </span>
                <h3 className="text-xl md:text-2xl font-extrabold text-white tracking-tight uppercase font-mono">
                  Multica Daemon Sync
                </h3>
                <p className="text-xs text-slate-400 font-sans leading-relaxed">
                  Looking to run secure development agents directly in your native workspace or hook up model context protocols inside Cursor or Claude Desktop?
                </p>
                <p className="text-xs text-slate-400 font-sans leading-relaxed">
                  virtForce is now fully compatible with the open-source <strong>Multica</strong> platform! Connect to the background <code>multicad</code> daemon locally to fetch preset teammates, merge skills compound pathways, and execute CLI commands. 
                </p>
                <p className="text-xs text-slate-400 font-sans leading-relaxed">
                  Through the interactive virtForce control panel, you can supervise active local daemon teammates (CEO-Copilot, Code-Mutant, Aero-DevOps), execute integrated diagnostics, and inspect localized file persistence structures instantly.
                </p>

                <div className="space-y-2 pt-1">
                  <div className="flex items-center gap-2 text-xs font-mono text-slate-350">
                    <span className="text-indigo-400">🐙</span>
                    <span>Standard multicad daemon connection (localhost:5902)</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs font-mono text-slate-350">
                    <span className="text-indigo-400">🐙</span>
                    <span>Compound & recursive teammate skill-sets logic configuration</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs font-mono text-slate-350">
                    <span className="text-indigo-400">🐙</span>
                    <span>Cross-MCP ready (expose sandbox tools directly to Cursor & Claude)</span>
                  </div>
                </div>

                <div className="pt-2">
                  <button 
                    onClick={onEnterDashboard}
                    className="px-4 py-2 bg-gradient-to-r from-indigo-700 to-indigo-500 hover:from-indigo-600 hover:to-indigo-400 text-white font-mono font-bold text-xs uppercase rounded cursor-pointer transition-all shadow-md flex items-center justify-center gap-1.5"
                  >
                    <span>VIEW MULTICA DAEMON CONSOLE</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Right Column Graphic Mockup of Multica Sync deck (col-span-7) */}
              <div className="lg:col-span-7 bg-[#050608] border border-slate-850 rounded-lg p-5 relative shadow-inner flex flex-col justify-between min-h-[300px]">
                {/* Simulated workspace dots */}
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#0e111a_1px,transparent_1px),linear-gradient(to_bottom,#0e111a_1px,transparent_1px)] bg-[size:18px_18px] opacity-55 pointer-events-none" />

                {/* Header panel */}
                <div className="relative z-10 flex items-center justify-between border-b border-slate-900 pb-2">
                  <div className="flex items-center gap-1.5 font-mono text-[9px]">
                    <span className="p-0.5 px-1.5 rounded bg-indigo-950 text-indigo-400 border border-indigo-900/60 font-bold">MULTICAD CONNECTED</span>
                    <span className="text-slate-500">Daemon: localhost:5902</span>
                  </div>
                  <span className="text-[8px] font-mono text-emerald-400 bg-emerald-950/45 border border-emerald-900/65 px-1.5 py-0.5 rounded uppercase font-bold">3 ACTIVE WORKERS</span>
                </div>

                {/* Center visual: 3 loaded teammates & compound skill matrix */}
                <div className="relative z-10 my-4 grid grid-cols-1 sm:grid-cols-3 gap-2">
                  {[
                    { name: 'CEO-Copilot', role: 'Supervisor', accent: 'border-indigo-900/60', icon: '🎯' },
                    { name: 'Code-Mutant', role: 'Coder Agent', accent: 'border-emerald-900/60', icon: '💻' },
                    { name: 'Aero-DevOps', role: 'DevOps Build', accent: 'border-purple-900/60', icon: '⚙%' }
                  ].map((mate, i) => (
                    <div key={i} className={`bg-[#090b11] border ${mate.accent} p-3 rounded-lg text-center font-mono space-y-1`}>
                      <span className="text-xl block">{mate.icon === '⚙%' ? '⚙️' : mate.icon}</span>
                      <span className="text-[10px] text-white font-bold block">{mate.name}</span>
                      <span className="text-[8px] text-slate-500 uppercase block">{mate.role}</span>
                    </div>
                  ))}
                </div>

                {/* Simulated Terminal commands output */}
                <div className="relative z-10 bg-[#020305]/90 border border-slate-900 p-3 rounded font-mono text-[9.5px] text-slate-400 leading-normal space-y-1">
                  <div className="flex text-[#00d2ff]">
                    <span>$ multica sync-skills --virtforce</span>
                  </div>
                  <div className="text-indigo-400">
                    <span>[multicad] sync completed. Exposing skill: code_refiner (Type: MCP) - OK</span>
                  </div>
                  <div className="text-indigo-400">
                    <span>[multicad] sync completed. Exposing skill: ingress_crawler (Type: MCP) - OK</span>
                  </div>
                  <div className="text-emerald-400 font-bold">
                    <span>[SUCCESS] 2 secure virtForce developer tools hot-loaded inside Multica teammate database.</span>
                  </div>
                </div>

                {/* Footer status credits line */}
                <div className="relative z-10 flex items-center justify-between text-[8px] text-slate-500 font-mono italic pt-2 border-t border-slate-900 leading-none">
                  <span>* Config file ~/.multica/configs/teammates.json synchronized successfully.</span>
                </div>
              </div>
            </div>
          </div>

          {/* Card 0C: Self-Seeding Swarm Memory & Rules Compiler */}
          <div className="lg:col-span-12 bg-[#0a0d14] border border-slate-800/80 p-6 md:p-8 rounded-xl space-y-6 shadow-2xl relative overflow-hidden group hover:border-emerald-500/40 transition-all">
            {/* Visual background gradient accents */}
            <div className="absolute top-0 left-0 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -bottom-10 right-0 w-80 h-80 bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              
              {/* Left Column Product value copy (col-span-5) */}
              <div className="lg:col-span-5 space-y-4 text-left">
                <span className="text-[9px] font-mono tracking-widest font-extrabold text-emerald-400 bg-emerald-950/40 border border-emerald-900/60 px-2 py-0.5 rounded uppercase">
                  PERSISTENT SWARM MEMORY SYSTEM
                </span>
                <h3 className="text-xl md:text-2xl font-extrabold text-white tracking-tight uppercase font-mono">
                  Autonomous Self-Learning Skills
                </h3>
                <p className="text-xs text-slate-400 font-sans leading-relaxed">
                  Tired of telling your development agents the same configuration adjustments and style preferences over and over? virtForce now compiles and remembers your guidelines automatically!
                </p>
                <p className="text-xs text-slate-400 font-sans leading-relaxed">
                  Our system features a live <strong>Incremental Swarm Memory Matrix</strong> that captures your instructions, resolves conflicting rules, and compiles them into persistent <code>.json</code> schemas. These instructions are physically translated into active prompt instruction sets inside your local <code>AGENTS.md</code> file context.
                </p>
                <p className="text-xs text-slate-400 font-sans leading-relaxed">
                  Subsequent agent sessions instantly read these rule vectors to prevent regression or repetition, offering a true, dynamic, <strong>self-reinforcing workflow integration</strong>.
                </p>

                <div className="space-y-2 pt-1 font-mono text-[11px] text-slate-350">
                  <div className="flex items-center gap-2">
                    <span className="text-emerald-400">✔</span>
                    <span>Live feedback capture (auto-saves style preferences & api habits)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-emerald-400">✔</span>
                    <span>Full file persistence (synchronous updates in AGENTS.md for turn-agnoness)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-emerald-400">✔</span>
                    <span>Interactive controls (toggle, parameter tuning & prompt tweaking)</span>
                  </div>
                </div>

                <div className="pt-2">
                  <button 
                    onClick={onEnterDashboard}
                    className="px-4 py-2 bg-gradient-to-r from-emerald-600 to-teal-500 hover:from-emerald-500 hover:to-teal-400 text-white font-mono font-bold text-xs uppercase rounded cursor-pointer transition-all shadow-md flex items-center justify-center gap-1.5"
                  >
                    <span>COMPILE CUSTOM SKILL VECTORS</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Right Column Interactive Preview Card (col-span-7) */}
              <div className="lg:col-span-7 bg-[#05060a] border border-slate-850 rounded-lg p-5 relative shadow-inner flex flex-col justify-between min-h-[300px] text-left">
                {/* Dots background */}
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#0c1018_1px,transparent_1px),linear-gradient(to_bottom,#0c1018_1px,transparent_1px)] bg-[size:16px_16px] opacity-40 pointer-events-none" />

                {/* Header panel */}
                <div className="relative z-10 flex items-center justify-between border-b border-slate-900 pb-2">
                  <div className="flex items-center gap-1.5 font-mono text-[9px]">
                    <span className="p-0.5 px-1.5 rounded bg-emerald-950 text-emerald-400 border border-emerald-900/60 text-[8px] font-bold uppercase animate-pulse">MATRIX LINKED</span>
                    <span className="text-slate-500">Target File: /AGENTS.md (Hot Injected)</span>
                  </div>
                  <span className="text-[8px] font-mono text-emerald-400 bg-emerald-950/20 border border-emerald-900/40 px-1.5 py-0.5 rounded font-extrabold pb-0.5">ACTIVE PERSISTENCE</span>
                </div>

                {/* Interactive Simulation items */}
                <div className="relative z-10 my-4 space-y-2 block text-left">
                  <div className="bg-[#0b0d13] border border-emerald-950/65 p-2.5 rounded-lg flex items-start gap-2.5">
                    <div className="p-1.5 bg-emerald-950/30 border border-emerald-900/50 rounded-md text-emerald-400 text-xs font-mono">
                      🧠
                    </div>
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <strong className="text-xs text-white">Tailwind Primacy Protocol</strong>
                        <span className="text-[7px] bg-emerald-950 border border-emerald-900/40 text-emerald-400 px-1 rounded-sm uppercase tracking-wider font-semibold font-mono">CODING</span>
                      </div>
                      <p className="text-[10px] text-slate-400 font-sans leading-tight">
                        &quot;Always style components using inline Tailwind utility classes. Strict prohibition from writing custom CSS files...&quot;
                      </p>
                    </div>
                  </div>

                  <div className="bg-[#0b0d13] border border-blue-955/60 p-2.5 rounded-lg flex items-start gap-2.5 opacity-80">
                    <div className="p-1.5 bg-blue-955/30 border border-blue-900/50 rounded-md text-blue-400 text-xs font-mono">
                      🛡️
                    </div>
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <strong className="text-xs text-white">Absolute Path Deflection</strong>
                        <span className="text-[7px] bg-blue-950 border border-blue-900/40 text-blue-400 px-1 rounded-sm uppercase tracking-wider font-semibold font-mono font-mono">SAFETY</span>
                      </div>
                      <p className="text-[10px] text-slate-400 font-sans leading-tight">
                        &quot;Refuse workspace paths starting with root &quot;/&quot;. Only reference correct relative paths...&quot;
                      </p>
                    </div>
                  </div>
                </div>

                {/* Live Output Log Stream */}
                <div className="relative z-10 bg-[#020305]/95 border border-slate-900 rounded p-2.5 font-mono text-[9.5px] leading-relaxed text-slate-400 space-y-1 block text-left">
                  <div className="text-slate-500 flex items-center justify-between border-b border-slate-900 pb-1">
                    <span className="text-[8px] uppercase tracking-wide">Learned Guardrail Compiler Logs</span>
                    <span className="text-[8px] text-emerald-400">STATUS: RE-COMPILING SUCCESS</span>
                  </div>
                  <div className="text-slate-400">[HEURISTICS] Extracted pattern turn turns. Compiling...</div>
                  <div className="text-emerald-400 font-bold">[SUCCESS] Rebuilt AGENTS.md with 3 active dynamic system instructions. Exposing and feeding memory blocks to model.</div>
                </div>
              </div>

            </div>
          </div>

          {/* Card 1 - Bento Big Left */}
          <div className="lg:col-span-7 bg-[#0e1117] border border-slate-850 p-6 rounded-xl flex flex-col justify-between space-y-5">
            <div className="space-y-2">
              <div className="w-8 h-8 rounded bg-blue-950/50 border border-blue-900/60 flex items-center justify-center text-blue-400">
                <Layers className="w-4 h-4" />
              </div>
              <h3 className="text-base font-bold text-white uppercase font-mono">Strict Air-Gapped Sandboxing V2</h3>
              <p className="text-xs text-slate-400 font-sans leading-relaxed">
                Rather than executing code on the main backend router, virtForce spins up secure, disposable docker processes. When checking packages or running automated developer test scripts, the operations occur in a dedicated sandbox process limit. If a malicious dependency is detected, the container kills the process and alerts the dashboard immediately.
              </p>
            </div>

            <div className="bg-[#0a0c11] border border-slate-900 rounded p-3 font-mono text-[10px] text-slate-400 flex items-center justify-between">
              <span>Security Threat Fence status: <strong className="text-emerald-400">ACTIVE</strong></span>
              <span>Memory limit: <strong className="text-blue-400">128MB / Container</strong></span>
            </div>
          </div>

          {/* Card 2 - Bento Right Small */}
          <div className="lg:col-span-5 bg-[#0e1117] border border-slate-850 p-6 rounded-xl flex flex-col justify-between space-y-4">
            <div className="space-y-2">
              <div className="w-8 h-8 rounded bg-indigo-950/50 border border-indigo-900/60 flex items-center justify-center text-indigo-400">
                <GitBranch className="w-4 h-4" />
              </div>
              <h3 className="text-base font-bold text-white uppercase font-mono">HITL Change Control Board</h3>
              <p className="text-xs text-slate-400 font-sans leading-relaxed">
                No automatic merges or unvetted releases. Completed development branches are staged inside a secure pull request viewer. Developers inspect clean side-by-side git file deltas (additions/deletions) and can either approve with a single click or provide corrective text feedback to let the system automatically iterate.
              </p>
            </div>

            <button 
              onClick={onEnterDashboard}
              className="text-[10px] font-mono font-bold text-blue-400 hover:text-blue-300 transition-colors flex items-center gap-1.5 self-start cursor-pointer group"
            >
              Test HITL Review Console <ChevronRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>

          {/* Card 3 - Bento Bottom 3 Columns Left */}
          <div className="lg:col-span-4 bg-[#0e1117] border border-slate-850 p-6 rounded-xl space-y-3">
            <div className="w-8 h-8 rounded bg-rose-950/50 border border-rose-900/60 flex items-center justify-center text-rose-450 text-rose-400">
              <MessageSquare className="w-4 h-4" />
            </div>
            <h3 className="text-sm font-bold text-white uppercase font-mono">Secure Social Channels</h3>
            <p className="text-xs text-slate-400 font-sans leading-relaxed">
              Accept operational trigger payloads from Telegram and WhatsApp. Use customizable bot scripts to query budget spending variables, trigger code builds, or inspect log archives from anywhere.
            </p>
          </div>

          {/* Card 4 - Bento Bottom 3 Columns Center */}
          <div className="lg:col-span-4 bg-[#0e1117] border border-slate-850 p-6 rounded-xl space-y-3">
            <div className="w-8 h-8 rounded bg-amber-950/50 border border-amber-900/60 flex items-center justify-center text-amber-500">
              <Star className="w-4 h-4" />
            </div>
            <h3 className="text-sm font-bold text-white uppercase font-mono">Zero-Spend Launchpad</h3>
            <p className="text-xs text-slate-400 font-sans leading-relaxed">
              Features organic outreach templates, public waiting list setups, and social copywriting engines optimized to secure product retention and early developer adopters without advertising budgets.
            </p>
          </div>

          {/* Card 5 - Bento Bottom 3 Columns Right */}
          <div className="lg:col-span-4 bg-[#0e1117] border border-slate-850 p-6 rounded-xl space-y-3">
            <div className="w-8 h-8 rounded bg-emerald-950/50 border border-emerald-900/60 flex items-center justify-center text-emerald-400">
              <Cpu className="w-4 h-4" />
            </div>
            <h3 className="text-sm font-bold text-white uppercase font-mono">Self-Registering Extensions</h3>
            <p className="text-xs text-slate-400 font-sans leading-relaxed">
              Add individual skills or tools (e.g., Notion Synchronizers, Web Crawlers, Vulnerability Scanners) dynamic loaders during runtime to expand threat diagnostic coverage.
            </p>
          </div>

        </div>

      </section>

      {/* --- SECTION: COMPARATIVE EDGE (virtForce vs. ClawTeam & SwarmClaw) --- */}
      <section className="py-20 border-t border-slate-900 bg-[#080a0f] px-4 sm:px-6 relative z-10 animate-fade-in">
        <div className="max-w-7xl mx-auto space-y-12">
          
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="text-[10px] tracking-widest font-mono font-bold text-indigo-400 uppercase">THE COMPETITIVE AXIS</span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight text-center">
              The virtForce Advantage & Edge
            </h2>
            <p className="text-xs text-slate-400 leading-normal text-center">
              While projects like HKUDS/ClawTeam and SwarmClaw build generalized multi-tenant research environments, virtForce is explicitly tailored for local developer execution, rigorous sandbox containment, and low-cost deployment.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            {/* The Comparison Table */}
            <div className="lg:col-span-8 bg-[#0e1117] border border-slate-850 rounded-xl overflow-hidden shadow-2xl flex flex-col justify-between">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse text-xs font-mono">
                  <thead>
                    <tr className="bg-[#0a0c11] border-b border-slate-900 text-slate-400 font-bold">
                      <th className="p-4 uppercase tracking-wider text-[10px]">Capabilities</th>
                      <th className="p-4 uppercase tracking-wider text-[10px] text-indigo-400">virtForce Edge (Local / Indie)</th>
                      <th className="p-4 uppercase tracking-wider text-[10px] text-slate-500">ClawTeam / SwarmClaw (Research / Cloud)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-900 text-slate-305">
                    <tr className="hover:bg-slate-900/40 transition-colors">
                      <td className="p-4 font-bold text-white">Execution Isolation</td>
                      <td className="p-4 text-emerald-400 bg-emerald-950/10">Triple-layer secure container sandboxes (Low, Med, High-Nano)</td>
                      <td className="p-4 text-slate-500">Shared server nodes, raw process pools or multi-tenant database clusters</td>
                    </tr>
                    <tr className="hover:bg-slate-900/40 transition-colors">
                      <td className="p-4 font-bold text-white">Human-In-The-Loop</td>
                      <td className="p-4 text-emerald-400 bg-emerald-950/10">Integrated interactive Git Diff viewer with real feedback loops</td>
                      <td className="p-4 text-slate-500">Plain terminal stream block loggers with no staging approval steps</td>
                    </tr>
                    <tr className="hover:bg-slate-900/40 transition-colors">
                      <td className="p-4 font-bold text-white">Mobile Operations</td>
                      <td className="p-4 text-emerald-400 bg-emerald-950/10">Webhook social gateways (Telegram & WhatsApp webhooks)</td>
                      <td className="p-4 text-slate-500">Requires complex web interfaces or persistent browser logins</td>
                    </tr>
                    <tr className="hover:bg-slate-900/40 transition-colors">
                      <td className="p-4 font-bold text-white">Startup Launchpad</td>
                      <td className="p-4 text-emerald-400 bg-emerald-950/10">Outreach engine, budget simulators, and waiting lists</td>
                      <td className="p-4 text-slate-500">Strictly focused on coding pipelines or generic graph nodes</td>
                    </tr>
                    <tr className="hover:bg-slate-900/40 transition-colors">
                      <td className="p-4 font-bold text-white">Deployment Costs</td>
                      <td className="p-4 text-emerald-400 bg-emerald-950/10">Runs securely on a single $5/mo basic host VPS</td>
                      <td className="p-4 text-slate-500">Requires heavy database clusters or cloud service billing indices</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="p-4 bg-[#0a0c11] border-t border-slate-900 text-[10px] text-slate-500 font-bold flex flex-col sm:flex-row gap-2 items-center justify-between">
                <span>COMPARISON DATA COMPILED FOR SELF-HOSTERS & INDIE DEVELOPERS</span>
                <span className="text-indigo-400 uppercase">MIT Licensed Codebase</span>
              </div>
            </div>

            {/* Accent Side Card */}
            <div className="lg:col-span-4 bg-[#0e1117] border border-slate-850 p-6 rounded-xl flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <span className="text-[9px] font-mono tracking-wider font-extrabold text-indigo-400 uppercase bg-indigo-955/20 border border-indigo-900/60 px-2 py-0.5 rounded">Our Philosophy</span>
                <h3 className="text-base font-bold text-white font-mono uppercase tracking-wide">Developer Sovereignty</h3>
                <p className="text-xs text-slate-400 leading-relaxed font-sans">
                  Unlike academic or enterprise research frameworks that optimize for raw multi-agent graph densities (often adding immense overhead and cloud dependencies), <strong>virtForce</strong> is designed as a single-operator system. 
                </p>
                <p className="text-xs text-slate-400 leading-relaxed font-sans">
                  It prioritizes clean local execution and secure, isolated container lifecycles over heavy SaaS configurations. We believe that a developer running isolated containers with an automated, WhatsApp-queryable, zero-ad outreach mechanism can scale products with unmatched agility.
                </p>
              </div>
              <button 
                onClick={onEnterDashboard}
                className="w-full py-2.5 bg-[#141822] hover:bg-[#1a2130] border border-slate-800 hover:border-slate-700 text-slate-300 hover:text-white rounded text-xs font-mono font-bold transition-all cursor-pointer flex items-center justify-center gap-1.5"
              >
                <Terminal className="w-3.5 h-3.5 text-blue-400" />
                <span>Test Local Architecture</span>
                <ChevronRight className="w-3.5 h-3.5 text-slate-500" />
              </button>
            </div>
          </div>

        </div>
      </section>

      {/* --- SECTION: OPEN SOURCE DOCUMENTATION PORTAL --- */}
      <section id="documentation" className="border-t border-slate-900 bg-[#090b10] py-20 px-4 sm:px-6 relative z-10">
        <div className="max-w-7xl mx-auto space-y-8">
          
          {/* Header titles */}
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="text-[10px] tracking-widest font-mono font-bold text-blue-400 uppercase">INSTALLATION & USAGE</span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Interactive Open-Source Repository Hub
            </h2>
            <p className="text-xs text-slate-400 leading-normal">
              Inspect the critical project resources and instructions needed to build and operate virtForce sandboxes. Select any file tab to view its content or download locally.
            </p>
          </div>

          {/* File selector panel */}
          <div className="bg-[#0e1117] border border-slate-800 rounded-xl overflow-hidden shadow-2xl">
            
            {/* Header tab controller */}
            <div className="bg-[#0a0c11] border-b border-slate-900 p-2 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2.5">
              
              {/* File Names Tabs list */}
              <div className="flex flex-wrap items-center gap-1">
                {[
                  { id: 'readme', name: 'README.md', desc: 'Main repository landing page' },
                  { id: 'architecture', name: 'ARCHITECTURE.md', desc: 'Secure container topology' },
                  { id: 'install', name: 'INSTALL.md', desc: 'Vitals and guide setup' },
                  { id: 'compose', name: 'docker-compose.yml', desc: 'Sandbox containers spec' }
                ].map(tab => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveDocTab(tab.id as any)}
                    className={`px-3 py-1.5 rounded text-xs font-mono font-bold transition-all cursor-pointer flex items-center gap-1.5 border ${
                      activeDocTab === tab.id 
                        ? 'bg-[#141822] border-slate-750 text-white' 
                        : 'bg-transparent border-transparent text-slate-500 hover:text-slate-300'
                    }`}
                  >
                    <span>{tab.name}</span>
                  </button>
                ))}
              </div>

              {/* Action buttons copy */}
              <button
                onClick={handleCopyDoc}
                className="self-start sm:self-center flex items-center gap-1.5 bg-[#141924] hover:bg-[#1a2130] border border-slate-800 hover:border-slate-700 text-slate-300 hover:text-white px-3 py-1.5 rounded text-[10px] font-mono font-bold transition-all cursor-pointer"
              >
                {copiedDoc ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span>COPIED FILE TEXT</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>COPY {currentDocFilename()}</span>
                  </>
                )}
              </button>

            </div>

            {/* Document display screen */}
            <div className="p-4 sm:p-6 bg-[#07090d]/80 h-[380px] overflow-y-auto font-mono text-xs text-slate-350 select-text leading-relaxed whitespace-pre pr-5 scrollbar-thin scrollbar-thumb-slate-805">
              {currentDocContent()}
            </div>

            {/* Micro footer information */}
            <div className="bg-[#121620]/50 border-t border-slate-900 px-4 py-2 flex items-center justify-between text-[9px] text-slate-550 font-mono">
              <span>ACTIVE REPOS FILE: <strong className="text-white">{currentDocFilename()}</strong></span>
              <span>MARKDOWN PRESERVED FORMAT</span>
            </div>

          </div>

          {/* Action Call to enter the dashboard */}
          <div className="text-center pt-4">
            <button
              onClick={onEnterDashboard}
              id="docs-launch-terminal-btn"
              className="px-8 py-3.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white text-xs font-mono font-bold rounded shadow-[0_4px_25px_rgba(79,70,229,0.35)] hover:shadow-[0_4px_30px_rgba(79,70,229,0.55)] cursor-pointer transition-all active:scale-98 inline-flex items-center gap-2 uppercase tracking-wide"
            >
              <span>ENTER SECURE TELEMETRY LIVE TESTBED</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

        </div>
      </section>

      {/* --- REPOSITORY STATISTICS BANNER --- */}
      <section className="max-w-7xl mx-auto px-4 py-12 sm:px-6 grid grid-cols-2 lg:grid-cols-4 gap-6 text-center border-t border-slate-900 relative z-10">
        <div>
          <span className="text-2xl sm:text-3xl font-extrabold text-white font-mono block">1.4k+</span>
          <span className="text-[10px] text-slate-500 font-mono uppercase tracking-wider block mt-1">GitHub Stars</span>
        </div>
        <div>
          <span className="text-2xl sm:text-3xl font-extrabold text-white font-mono block">99.8%</span>
          <span className="text-[10px] text-slate-500 font-mono uppercase tracking-wider block mt-1">Docker Lint Pass Rate</span>
        </div>
        <div>
          <span className="text-2xl sm:text-3xl font-extrabold text-white font-mono block">4 Micro</span>
          <span className="text-[10px] text-slate-500 font-mono uppercase tracking-wider block mt-1">Isolated Containers</span>
        </div>
        <div>
          <span className="text-2xl sm:text-3xl font-extrabold text-white font-mono block">&lt; 180ms</span>
          <span className="text-[10px] text-slate-500 font-mono uppercase tracking-wider block mt-1">Average Response Latency</span>
        </div>
      </section>

      {/* --- FOOTER --- */}
      <footer className="border-t border-slate-950 bg-[#05060a] py-12 px-4 sm:px-6 text-center text-xs text-slate-500 relative z-10 font-mono">
        <div className="max-w-7xl mx-auto space-y-4">
          <div className="flex items-center justify-center gap-2">
            <span>🛡️</span>
            <span className="font-mono text-xs font-bold text-white uppercase tracking-wider">virtForce Secure Sandbox</span>
          </div>
          <p className="max-w-md mx-auto leading-relaxed text-[11px] text-slate-500 font-sans">
            virtForce is an open-source alternative to OpenClaw. Designed, built, and self-hosted with high visual layouts and strict container isolation boundaries. Released under the MIT License.
          </p>
          <div className="pt-2 text-[10px] text-slate-600">
            &copy; {new Date().getFullYear()} virtForce Inc. All rights reserved. Self-Hosted Server Online.
          </div>
        </div>
      </footer>

    </div>
  );
}
