import React, { useState, useRef } from 'react';
import { Agent, SwarmLog, SwarmStats } from '../types';
import { motion } from 'motion/react';
import { 
  Activity, Circle, DollarSign, Cpu, Play, Pause, RotateCcw, 
  MessageSquare, Terminal, Eye, Settings, Shield, Sliders, Zap, 
  CheckCircle2, RefreshCw, Layers, SlidersHorizontal, Info, Hammer, Compass
} from 'lucide-react';

interface HQCoreProps {
  agents: Agent[];
  logs: SwarmLog[];
  stats: SwarmStats;
  isSimulating: boolean;
  simulationSpeed: number;
  onToggleSimulation: () => void;
  onResetSimulation: () => void;
  onSetSpeed: (speed: number) => void;
  onSelectAgent: (agentId: string) => void;
}

export function HQCore({
  agents,
  logs,
  stats,
  isSimulating,
  simulationSpeed,
  onToggleSimulation,
  onResetSimulation,
  onSetSpeed,
  onSelectAgent,
}: HQCoreProps) {
  // Summary calculations
  const totalCost = agents.reduce((sum, a) => sum + a.costSpent, 0) + stats.totalBudgetUsed;
  const activeCount = agents.filter(a => a.status === 'ACTIVE' || a.status === 'CODE_RUNNING').length;
  const mergedCount = agents.reduce((sum, a) => sum + a.prsMerged, 0);

  return (
    <div className="space-y-4">
      {/* Simulation Master Controller */}
      <div className="bg-bg-density-card border border-slate-800 rounded p-3 flex flex-col md:flex-row md:items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="relative">
            <span className="absolute flex h-3 w-3">
              <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${stats.systemState === 'RUNNING' ? 'bg-emerald-400' : 'bg-amber-400'}`}></span>
              <span className={`relative inline-flex rounded-full h-3 w-3 ${stats.systemState === 'RUNNING' ? 'bg-emerald-500' : 'bg-amber-500'}`}></span>
            </span>
            <div className={`w-7 h-7 rounded-sm flex items-center justify-center border ${stats.systemState === 'RUNNING' ? 'border-emerald-500/30 text-emerald-400' : 'border-amber-500/30 text-amber-500'}`}>
              <Activity className="w-3.5 h-3.5" />
            </div>
          </div>
          <div>
            <h2 className="text-xs font-bold text-white uppercase tracking-wider font-mono">Swarm Ops Orchestrator</h2>
            <p className="text-[10px] text-slate-400">
              System: <span className={`font-semibold ${stats.systemState === 'RUNNING' ? 'text-emerald-400' : 'text-amber-400'}`}>{stats.systemState}</span>
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {/* Controls button */}
          <button
            onClick={onToggleSimulation}
            id="toggle-sim-btn"
            className={`flex items-center gap-2 px-3 py-1.5 rounded text-[10px] font-bold font-mono border cursor-pointer transition-colors duration-200 ${
              isSimulating
                ? 'bg-amber-550/10 hover:bg-amber-500/20 text-text-amber-300 border-amber-500/30'
                : 'bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-300 border-emerald-500/30'
            }`}
          >
            {isSimulating ? <Pause className="w-3 h-3" /> : <Play className="w-3 h-3" />}
            {isSimulating ? 'HALT CYCLE' : 'RESUME CYCLE'}
          </button>

          <button
            onClick={onResetSimulation}
            id="reset-sim-btn"
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded text-[10px] font-bold font-mono text-slate-300 hover:text-white bg-[#1c2128] border border-slate-800 hover:bg-[#222830] cursor-pointer transition-all duration-200"
          >
            <RotateCcw className="w-3 h-3" />
            RESET
          </button>

          {/* Speed selectors */}
          <div className="flex bg-[#12151a] p-0.5 rounded border border-slate-800 gap-1">
            {([1, 2, 5] as const).map(speed => (
              <button
                key={speed}
                id={`speed-${speed}x-btn`}
                onClick={() => onSetSpeed(speed)}
                className={`px-2 py-1 text-[9px] font-mono rounded font-bold transition-all ${
                  simulationSpeed === speed
                    ? 'bg-slate-850 text-white border border-slate-705 bg-slate-800'
                    : 'text-slate-500 hover:text-slate-300'
                }`}
              >
                {speed}x
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Metrics Widgets */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
        <div className="bg-bg-density-card border border-slate-800 rounded p-3 flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-[9px] font-mono font-bold tracking-widest uppercase text-slate-500">OPERATIONAL SPENT</span>
            <div className="text-lg font-bold font-mono text-emerald-400">${totalCost.toFixed(3)}</div>
            <div className="text-[9px] text-slate-550">Ceiling: ${stats.maxBudget.toFixed(2)}</div>
          </div>
          <div className="p-2 bg-emerald-550/10 text-emerald-400">
            <DollarSign className="w-4 h-4" />
          </div>
        </div>

        <div className="bg-bg-density-card border border-slate-800 rounded p-3 flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-[9px] font-mono font-bold tracking-widest uppercase text-slate-500">ACTIVE WORKERS</span>
            <div className="text-lg font-bold font-mono text-white">{activeCount} <span className="text-[11px] text-slate-500">/ {agents.length}</span></div>
            <div className="text-[9px] text-slate-550">CoT Thread Instances</div>
          </div>
          <div className="p-2 bg-blue-550/10 text-blue-400">
            <Cpu className="w-4 h-4" />
          </div>
        </div>

        <div className="bg-bg-density-card border border-slate-800 rounded p-3 flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-[9px] font-mono font-bold tracking-widest uppercase text-slate-500">TOKEN BURN RATE</span>
            <div className="text-lg font-bold font-mono text-purple-400">{(stats.tokenBurnRate * simulationSpeed).toFixed(0)} <span className="text-[11px] text-slate-550">t/s</span></div>
            <div className="text-[9px] text-slate-555">Optimized Context</div>
          </div>
          <div className="p-2 bg-purple-550/10 text-purple-400">
            <Activity className="w-4 h-4" />
          </div>
        </div>

        <div className="bg-bg-density-card border border-slate-800 rounded p-3 flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-[9px] font-mono font-bold tracking-widest uppercase text-slate-500">DEPLOYED PR DELTAS</span>
            <div className="text-lg font-bold font-mono text-sky-450 text-sky-400">{mergedCount}</div>
            <div className="text-[9px] text-slate-550">CDN releases live</div>
          </div>
          <div className="p-2 bg-sky-550/10 text-sky-400">
            <Terminal className="w-4 h-4" />
          </div>
        </div>
      </div>

      {/* --- SECTION: DRAGGABLE CAD SWARM ORCHESTRATION CANVAS & INSPECTOR --- */}
      {(() => {
        // Draggable CAD orchestration node state representation
        const [canvasNodes, setCanvasNodes] = useState([
          { id: 'CEO', label: 'CEO (Supervisor)', role: 'Orchestration Router', framework: 'LangGraph Supervisor', avatar: '🎯', x: 55, y: 65, model: 'Gemini 2.5 Pro (Ultra Context)', memory: '256 MB', port: 10301, isolation: 'MEDIUM', description: 'Orchestrates the entire swarm flow, matches tasks with specialized workers, and manages budget bounds.' },
          { id: 'PM', label: 'PM (Planner)', role: 'Specs & Backlog Grooming', framework: 'CrewAI Specifications Worker', avatar: '📋', x: 165, y: 45, model: 'Gemini 3.5 Flash (Default)', memory: '128 MB', port: 10302, isolation: 'LOW', description: 'Grooms features, drafts detail specifications, and schedules sub-task lists inside the Kanban Backlog.' },
          { id: 'DEV', label: 'DEV (Workspace Coder)', role: 'Secure Code Developer', framework: 'OpenHands Safe Container', avatar: '💻', x: 275, y: 65, model: 'Gemini 2.5 Pro (Precision)', memory: '512 MB', port: 10303, isolation: 'HIGH_NANO', description: 'Writes robust modular application files inside secure, air-gapped container sandboxes and runs compile targets.' },
          { id: 'QA', label: 'QA (Regression Test)', role: 'Vulnerability Auditor', framework: 'Automated Vitest Sandbox', avatar: '🛡️', x: 385, y: 85, model: 'Gemini 3.5 Flash (Fast)', memory: '256 MB', port: 10304, isolation: 'HIGH_NANO', description: 'Coordinates automated regression checks, inspects packages security, and tracks active build compiler issues.' },
          { id: 'DEVOPS', label: 'DEVOPS (Infra Ops)', role: 'Air-gapped Pipeline Build', framework: 'Docker & GCP Pipeline Sandbox', avatar: '⚙️', x: 495, y: 45, model: 'Gemini 3.5 Flash (Fast)', memory: '384 MB', port: 10307, isolation: 'HIGH_NANO', description: 'Configures secure virtual containment pipelines, schedules Docker-compose instances, compiles artifacts, and audits ports.' },
          { id: 'HITL', label: 'HITL (Approval Gate)', role: 'Differential Sandbox Gate', framework: 'Security Sandbox Gate', avatar: '🔒', x: 605, y: 65, model: 'Manual Operator Bypass', memory: 'Null (Human Operator)', port: 10305, isolation: 'SECURE_LOCK', description: 'Awaits master operator input or manual differential signoff before merging code pull requests to production.' },
          { id: 'MKT', label: 'MKT (Promoter)', role: 'Organic Outreach Copywriter', framework: 'CrewAI Copywriter', avatar: '✨', x: 715, y: 65, model: 'Gemini 3.5 Flash (Fast)', memory: '128 MB', port: 10306, isolation: 'LOW', description: 'Deploys outreach scripts, monitors social Telegram gateways, and coordinates landing page messaging filters.' }
        ]);

        const [selectedNodeId, setSelectedNodeId] = useState<string>('CEO');
        const [draggedNodeId, setDraggedNodeId] = useState<string | null>(null);
        const [pulseParticle, setPulseParticle] = useState<{ active: boolean; x: number; y: number; progress: number } | null>(null);
        const svgRef = useRef<SVGSVGElement | null>(null);

        const startDrag = (e: React.MouseEvent | React.TouchEvent, nodeId: string) => {
          e.preventDefault();
          e.stopPropagation();
          setDraggedNodeId(nodeId);
        };

        const handleDrag = (e: React.MouseEvent<SVGSVGElement> | React.TouchEvent<SVGSVGElement>) => {
          if (!draggedNodeId || !svgRef.current) return;
          const rect = svgRef.current.getBoundingClientRect();
          
          let clientX = 0;
          let clientY = 0;
          if ('touches' in e) {
            if (e.touches.length === 0) return;
            clientX = e.touches[0].clientX;
            clientY = e.touches[0].clientY;
          } else {
            clientX = e.clientX;
            clientY = e.clientY;
          }
          
          // Map to 800x130 coordinate viewport
          const viewBoxWidth = 800;
          const viewBoxHeight = 130;
          const x = ((clientX - rect.left) / rect.width) * viewBoxWidth;
          const y = ((clientY - rect.top) / rect.height) * viewBoxHeight;
          
          // Constrains bounding boxes
          const boundedX = Math.max(30, Math.min(770, x));
          const boundedY = Math.max(25, Math.min(105, y));
          
          setCanvasNodes(prev => prev.map(n => n.id === draggedNodeId ? { ...n, x: boundedX, y: boundedY } : n));
        };

        const endDrag = () => {
          setDraggedNodeId(null);
        };

        const triggerPulseSim = (startId: string) => {
          const currentIdx = canvasNodes.findIndex(n => n.id === startId);
          if (currentIdx === -1) return;
          
          const endIdx = (currentIdx + 1) % canvasNodes.length;
          const startNode = canvasNodes[currentIdx];
          const endNode = canvasNodes[endIdx];
          
          let currentPct = 0;
          const interval = setInterval(() => {
            currentPct += 4;
            if (currentPct > 100) {
              clearInterval(interval);
              setPulseParticle(null);
            } else {
              const x = startNode.x + (endNode.x - startNode.x) * (currentPct / 100);
              const y = startNode.y + (endNode.y - startNode.y) * (currentPct / 100);
              setPulseParticle({ active: true, x, y, progress: currentPct });
            }
          }, 15);
        };

        // Determine system flags based on actual simulation status
        const activeAg = agents.find(a => a.status === 'ACTIVE' || a.status === 'CODE_RUNNING');
        const activeId = activeAg?.id;
        const isHITLActive = !isSimulating && logs.length > 0 && logs[logs.length - 1].message.includes('[HITL PAUSED]');
        const isRecentReject = logs.some((l, idx) => idx > logs.length - 4 && l.message.includes('MERGE DEFERRED'));
        const isRecentComplete = logs.some((l, idx) => idx > logs.length - 3 && l.message.includes('FEATURE MERGE SUCCESSFUL'));

        // Extract selected node details to edit
        const selectedNode = canvasNodes.find(n => n.id === selectedNodeId) || canvasNodes[0];

        const handleUpdateModel = (model: string) => {
          setCanvasNodes(prev => prev.map(n => n.id === selectedNodeId ? { ...n, model } : n));
        };

        const handleUpdateIsolation = (isolation: string) => {
          setCanvasNodes(prev => prev.map(n => n.id === selectedNodeId ? { ...n, isolation } : n));
        };

        const handleUpdateMemory = (memory: string) => {
          setCanvasNodes(prev => prev.map(n => n.id === selectedNodeId ? { ...n, memory } : n));
        };

        const handleUpdatePort = (port: number) => {
          setCanvasNodes(prev => prev.map(n => n.id === selectedNodeId ? { ...n, port } : n));
        };

        // Resolve connection wire coordinates dynamically based on drag positions
        const getNodeCoords = (id: string) => {
          const matched = canvasNodes.find(n => n.id === id);
          return matched ? { x: matched.x, y: matched.y } : { x: 0, y: 0 };
        };

        return (
          <div className="bg-bg-density-card border border-slate-800 rounded p-4 space-y-4">
            
            {/* Header with Title & Live Stats */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-850 pb-3">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-[9px] font-mono font-bold tracking-widest text-[#00d2ff] uppercase bg-[#00d2ff]/10 border border-[#00d2ff]/20 px-2 py-0.5 rounded">SWARM INTERACTIVE CAD CANVAS</span>
                  <span className="text-[10px] bg-emerald-950/40 text-emerald-400 border border-emerald-900/45 px-1.5 py-0.2 rounded font-mono font-bold uppercase tracking-wider animate-pulse">Better than SwarmClaw v2</span>
                </div>
                <h3 className="text-xs font-bold text-white uppercase tracking-tight font-mono mt-1">
                  Dynamic Micro-Agent Execution Topology & Container Configurator 
                </h3>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[9px] bg-[#12151a] border border-slate-800 text-slate-400 px-2 py-0.5 rounded font-mono">
                  GRAPH ROUTE: <strong className={isSimulating ? 'text-emerald-400' : 'text-amber-400'}>{isSimulating ? 'STREAMING' : 'STANDBY'}</strong>
                </span>
                <span className="text-[9px] bg-indigo-950/40 text-indigo-400 border border-indigo-900/60 font-mono font-bold px-2.5 py-0.5 rounded">
                  Drag Nodes to Arrange Wires
                </span>
              </div>
            </div>

            {/* Split Screen Container (Interactive Canvas vs. Properties Inspector Panel) */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
              
              {/* LEFT VIEW: Interactive SVG Node Sandbox (lg:col-span-8) */}
              <div className="lg:col-span-8 relative">
                <div 
                  className="bg-[#0b0d11] border border-slate-850/80 rounded-lg p-3 relative select-none overflow-x-hidden min-h-[190px] flex items-center justify-center cursor-crosshair group shadow-inner"
                  onMouseLeave={endDrag}
                >
                  
                  {/* Subtle Grid Network Background Line Indicators */}
                  <div className="absolute inset-0 bg-[linear-gradient(to_right,#161a22_1px,transparent_1px),linear-gradient(to_bottom,#161a22_1px,transparent_1px)] bg-[size:24px_24px] opacity-40 pointer-events-none" />

                  {/* Canvas Instructions */}
                  <div className="absolute top-2 left-2 text-[8px] font-mono text-slate-500 bg-[#07080a] border border-slate-900 rounded px-1.5 py-0.5 flex items-center gap-1.5 pointer-events-none">
                    <Compass className="w-3 h-3 text-indigo-400 animate-spin" style={{ animationDuration: '6s' }} />
                    <span>DRAG CIRCLES TO DYNAMICALLY FLOW SIGNAL CHANNELS</span>
                  </div>

                  {/* Animated Webhook Label */}
                  {pulseParticle && (
                    <div className="absolute right-2 top-2 bg-emerald-950/80 border border-emerald-900/80 text-emerald-400 text-[8px] font-mono px-2 py-0.5 rounded flex items-center gap-1.5 pointer-events-none">
                      <Zap className="w-2.5 h-2.5 animate-bounce" />
                      <span>SIMULATING PORT HOPPING: {pulseParticle.progress}%</span>
                    </div>
                  )}

                  {/* SVG Canvas Workspace */}
                  <svg 
                    ref={svgRef}
                    className="w-full h-[155px] relative z-10" 
                    viewBox="0 0 800 130"
                    onMouseMove={handleDrag}
                    onMouseUp={endDrag}
                    onTouchMove={handleDrag}
                    onTouchEnd={endDrag}
                  >
                    <defs>
                      <linearGradient id="glowEffect" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#1e293b" />
                        <stop offset="50%" stopColor="#00d2ff" stopOpacity="0.8" />
                        <stop offset="100%" stopColor="#1e293b" />
                      </linearGradient>
                      <radialGradient id="nodeActiveSphere" cx="50%" cy="50%" r="50%">
                        <stop offset="0%" stopColor="#00d2ff" stopOpacity="0.5" />
                        <stop offset="100%" stopColor="#00d2ff" stopOpacity="0" />
                      </radialGradient>
                      <radialGradient id="hitlLockedSphere" cx="50%" cy="50%" r="50%">
                        <stop offset="0%" stopColor="#ef4444" stopOpacity="0.5" />
                        <stop offset="100%" stopColor="#ef4444" stopOpacity="0" />
                      </radialGradient>
                    </defs>

                    {/* CSS animations for signal dashes & wave pulses */}
                    <style>{`
                      @keyframes flow-wire {
                        to {
                          stroke-dashoffset: -24;
                        }
                      }
                      .canvas-wire-active {
                        stroke-dasharray: 6, 4;
                        animation: flow-wire 1s linear infinite;
                      }
                    `}</style>

                    {/* DYNAMIC PIPELINE WIRES (EDGES CONNECTED TO ACTUAL DRAGGED COORDINATES) */}
                    
                    {/* CEO -> PM */}
                    {(() => {
                      const c1 = getNodeCoords('CEO'), c2 = getNodeCoords('PM');
                      return (
                        <line 
                          x1={c1.x} y1={c1.y} x2={c2.x} y2={c2.y} 
                          className={activeId === 'PM' ? "canvas-wire-active" : ""} 
                          stroke={activeId === 'PM' ? "#00d2ff" : "#1e293b"} 
                          strokeWidth={activeId === 'PM' ? "2" : "1.2"} 
                        />
                      );
                    })()}

                    {/* PM -> DEV */}
                    {(() => {
                      const c1 = getNodeCoords('PM'), c2 = getNodeCoords('DEV');
                      return (
                        <line 
                          x1={c1.x} y1={c1.y} x2={c2.x} y2={c2.y} 
                          className={activeId === 'DEV' ? "canvas-wire-active" : ""} 
                          stroke={activeId === 'DEV' ? "#00d2ff" : "#1e293b"} 
                          strokeWidth={activeId === 'DEV' ? "2" : "1.2"} 
                        />
                      );
                    })()}

                    {/* DEV -> QA */}
                    {(() => {
                      const c1 = getNodeCoords('DEV'), c2 = getNodeCoords('QA');
                      return (
                        <line 
                          x1={c1.x} y1={c1.y} x2={c2.x} y2={c2.y} 
                          className={activeId === 'QA' ? "canvas-wire-active" : ""} 
                          stroke={activeId === 'QA' ? "#00d2ff" : "#1e293b"} 
                          strokeWidth={activeId === 'QA' ? "2" : "1.2"} 
                        />
                      );
                    })()}

                    {/* QA -> DEVOPS */}
                    {(() => {
                      const c1 = getNodeCoords('QA'), c2 = getNodeCoords('DEVOPS');
                      return (
                        <line 
                          x1={c1.x} y1={c1.y} x2={c2.x} y2={c2.y} 
                          className={activeId === 'DEVOPS' ? "canvas-wire-active" : ""} 
                          stroke={activeId === 'DEVOPS' ? "#00d2ff" : "#1e293b"} 
                          strokeWidth={activeId === 'DEVOPS' ? "2" : "1.2"} 
                        />
                      );
                    })()}

                    {/* DEVOPS -> HITL */}
                    {(() => {
                      const c1 = getNodeCoords('DEVOPS'), c2 = getNodeCoords('HITL');
                      return (
                        <line 
                          x1={c1.x} y1={c1.y} x2={c2.x} y2={c2.y} 
                          className={isHITLActive ? "canvas-wire-active" : ""} 
                          stroke={isHITLActive ? "#ef4444" : "#1e293b"} 
                          strokeWidth={isHITLActive ? "2.2" : "1.2"} 
                        />
                      );
                    })()}

                    {/* HITL -> MKT */}
                    {(() => {
                      const c1 = getNodeCoords('HITL'), c2 = getNodeCoords('MKT');
                      return (
                        <line 
                          x1={c1.x} y1={c1.y} x2={c2.x} y2={c2.y} 
                          className={activeId === 'MKT' ? "canvas-wire-active" : ""} 
                          stroke={activeId === 'MKT' ? "#22c55e" : "#1e293b"} 
                          strokeWidth={activeId === 'MKT' ? "2" : "1.2"} 
                        />
                      );
                    })()}

                    {/* BEZIER FEEDBACK LOOPS (BEND AUTOMATICALLY AS NODES DRAG) */}
                    
                    {/* HITL -> DEV (Retrain or Reject branch cycle path loop) */}
                    {(() => {
                      const c1 = getNodeCoords('HITL'), c2 = getNodeCoords('DEV');
                      const controlX = (c1.x + c2.x) / 2;
                      const controlY = Math.max(c1.y, c2.y) + 38;
                      const pathString = `M ${c1.x} ${c1.y} Q ${controlX} ${controlY} ${c2.x} ${c2.y}`;
                      return (
                        <path 
                          d={pathString}
                          fill="none" 
                          className={isRecentReject ? "canvas-wire-active" : ""} 
                          stroke={isRecentReject ? "#ef4444" : "#1f1d2b"} 
                          strokeWidth={isRecentReject ? "2" : "1"} 
                        />
                      );
                    })()}

                    {/* MKT -> CEO (Release cycle back to planning root loop) */}
                    {(() => {
                      const c1 = getNodeCoords('MKT'), c2 = getNodeCoords('CEO');
                      const controlX = (c1.x + c2.x) / 2;
                      const controlY = Math.min(c1.y, c2.y) - 38;
                      const pathString = `M ${c1.x} ${c1.y} Q ${controlX} ${controlY} ${c2.x} ${c2.y}`;
                      return (
                        <path 
                          d={pathString}
                          fill="none" 
                          className={isRecentComplete ? "canvas-wire-active" : ""} 
                          stroke={isRecentComplete ? "#22c55e" : "#161b24"} 
                          strokeWidth={isRecentComplete ? "2" : "1"} 
                        />
                      );
                    })()}

                    {/* SHADOW SPHERES FOR ACTIVE HIGHLIGHTS */}
                    {canvasNodes.map(node => {
                      const isActive = activeId === node.id || (node.id === 'HITL' && isHITLActive);
                      if (!isActive) return null;
                      return (
                        <circle 
                          key={`canvas-glow-${node.id}`} 
                          cx={node.x} 
                          cy={node.y} 
                          r="31" 
                          fill={node.id === 'HITL' ? "url(#hitlLockedSphere)" : "url(#nodeActiveSphere)"} 
                        />
                      );
                    })}

                    {/* ACTIVE SIMULATION IMPULSE PARTICLE WAVE */}
                    {pulseParticle?.active && (
                      <circle 
                        cx={pulseParticle.x} 
                        cy={pulseParticle.y} 
                        r="6.5" 
                        fill="#00d2ff" 
                        className="animate-ping"
                        stroke="#ffffff"
                        strokeWidth="1.5"
                      />
                    )}

                    {/* INTERACTIVE WORKER NODE OBJECTS */}
                    {canvasNodes.map(node => {
                      const isSelected = selectedNodeId === node.id;
                      const isNodeWorkerRunning = activeId === node.id;
                      const isHITLWaiting = node.id === 'HITL' && isHITLActive;

                      return (
                        <g 
                          key={`cad-node-${node.id}`}
                          className="cursor-pointer group select-none"
                          onClick={() => setSelectedNodeId(node.id)}
                          onMouseDown={(e) => startDrag(e, node.id)}
                          onTouchStart={(e) => startDrag(e, node.id)}
                        >
                          {/* Inner container shield */}
                          <circle 
                            cx={node.x} 
                            cy={node.y} 
                            r="21.5" 
                            className="transition-all duration-200"
                            fill={isSelected ? "#161a24" : "#0e1117"} 
                            stroke={
                              isSelected 
                                ? '#00d2ff' 
                                : isHITLWaiting 
                                  ? '#ef4444' 
                                  : isNodeWorkerRunning 
                                    ? '#00d2ff' 
                                    : '#1e293b'
                            } 
                            strokeWidth={isSelected ? '2.5' : isNodeWorkerRunning || isHITLWaiting ? '2' : '1.2'} 
                          />
                          
                          {/* Avatar icon */}
                          <text 
                            x={node.x} 
                            y={node.y + 4.5} 
                            textAnchor="middle" 
                            fontSize="13" 
                            className="pointer-events-none select-none"
                          >
                            {node.avatar}
                          </text>

                          {/* Top Tag identifier */}
                          <text 
                            x={node.x} 
                            y={node.y - 28} 
                            textAnchor="middle" 
                            fontSize="7.5" 
                            fontFamily="monospace"
                            fontWeight="bold"
                            fill={isSelected ? '#00d2ff' : '#475569'}
                            className="pointer-events-none select-none uppercase tracking-wider font-semibold"
                          >
                            {node.framework}
                          </text>

                          {/* Node label */}
                          <text 
                            x={node.x} 
                            y={node.y + 36} 
                            textAnchor="middle" 
                            fontSize="9" 
                            fontFamily="monospace" 
                            fontWeight="bold"
                            fill={isSelected ? '#ffffff' : '#64748b'}
                            className="pointer-events-none select-none"
                          >
                            {node.id}
                          </text>
                        </g>
                      );
                    })}
                  </svg>
                </div>

                {/* Legend loop badges */}
                <div className="flex flex-col sm:flex-row justify-between gap-2 mt-2">
                  <div className="text-[8px] font-mono text-emerald-400 bg-emerald-950/20 border border-emerald-900/40 p-1 rounded inline-flex items-center gap-1">
                    <span className="animate-spin" style={{ animationDuration: '4s' }}>🔄</span> 
                    <span>LangGraph Feed loop: MKT ➔ CEO Route [PROD MERGE RELEASES]</span>
                  </div>

                  <div className="text-[8px] font-mono text-rose-400 bg-rose-950/20 border border-rose-900/40 p-1 rounded inline-flex items-center gap-1">
                    <span>⚠️</span> 
                    <span>Error Retrain loop: HITL ➔ DEV Workspace [DIFF FAILURE CORRECTION]</span>
                  </div>
                </div>
              </div>

              {/* RIGHT VIEW: Properties CAD Inspector (lg:col-span-4) */}
              <div className="lg:col-span-4 bg-[#0e121a] border border-slate-800 rounded-lg p-3.5 flex flex-col justify-between space-y-3.5 shadow-lg relative overflow-hidden">
                
                {/* Visual Corner Deco */}
                <div className="absolute top-0 right-0 w-16 h-16 bg-[#00d2ff]/5 rounded-full blur-xl pointer-events-none" />

                {/* Inspector Header */}
                <div className="space-y-1 border-b border-slate-850 pb-2.5">
                  <div className="flex items-center gap-1.5 text-slate-500 text-[8px] font-mono uppercase font-bold tracking-widest">
                    <SlidersHorizontal className="w-2.5 h-2.5 text-[#00d2ff]" />
                    <span>Attributes Inspector</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded bg-[#161b24] border border-slate-800 flex items-center justify-center text-sm shadow-inner">
                      {selectedNode.avatar}
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-white tracking-widest uppercase font-mono">{selectedNode.label}</h4>
                      <span className="text-[9px] font-mono text-slate-400">{selectedNode.role}</span>
                    </div>
                  </div>
                </div>

                {/* Parameter settings body */}
                <div className="space-y-2.5 text-xs text-slate-350">
                  
                  {/* Scope description text block */}
                  <p className="text-[10px] leading-relaxed text-slate-400 bg-[#090b10] border border-slate-880/60 p-2 rounded">
                    {selectedNode.description}
                  </p>

                  {/* LLM Model preset tier */}
                  <div className="space-y-1">
                    <label className="text-[8px] font-mono text-slate-500 font-bold uppercase tracking-wider block">Llm model engine preset</label>
                    <select 
                      value={selectedNode.model} 
                      onChange={(e) => handleUpdateModel(e.target.value)}
                      className="w-full bg-[#121620] border border-slate-805 text-[10px] text-white p-1 rounded font-mono font-bold focus:outline-none focus:border-[#00d2ff] transition-colors"
                    >
                      <option value="Gemini 2.5 Pro (Ultra Context)">Gemini 2.5 Pro (Ultra Context)</option>
                      <option value="Gemini 2.5 Pro (Precision)">Gemini 2.5 Pro (Precision)</option>
                      <option value="Gemini 3.5 Flash (Default)">Gemini 3.5 Flash (Default)</option>
                      <option value="Gemini 3.5 Flash (Fast)">Gemini 3.5 Flash (Fast)</option>
                      <option value="Manual Operator Approval">Manual Operator Bypass Mode</option>
                    </select>
                  </div>

                  {/* Sandbox Isolation level selection */}
                  <div className="space-y-1">
                    <label className="text-[8px] font-mono text-slate-500 font-bold uppercase tracking-wider block">Container isolation boundary</label>
                    <div className="grid grid-cols-3 gap-1.5 font-mono text-[9px] font-bold">
                      {['LOW', 'MEDIUM', 'HIGH_NANO'].map(lvl => (
                        <button
                          key={lvl}
                          onClick={() => handleUpdateIsolation(lvl)}
                          className={`py-1 rounded text-center border uppercase transition-colors ${
                            selectedNode.isolation === lvl
                              ? 'bg-indigo-950/40 text-indigo-400 border-indigo-700/60 font-black'
                              : 'bg-[#121620] border-slate-800 text-slate-500 hover:text-slate-300'
                          }`}
                        >
                          {lvl}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Dual columns for Virtual Port and Memory allotment sliders */}
                  <div className="grid grid-cols-2 gap-2">
                    <div className="space-y-1">
                      <label className="text-[8px] font-mono text-slate-500 font-bold uppercase tracking-wider block">Socket port mapping</label>
                      <input 
                        type="number" 
                        value={selectedNode.port}
                        onChange={(e) => handleUpdatePort(parseInt(e.target.value) || 10300)}
                        className="w-full bg-[#121620] border border-slate-805 text-[10px] text-white p-1 rounded font-mono text-center font-bold focus:outline-none focus:border-[#00d2ff] transition-colors"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[8px] font-mono text-slate-500 font-bold uppercase tracking-wider block">RAM Allotment Limit</label>
                      <select 
                        value={selectedNode.memory}
                        onChange={(e) => handleUpdateMemory(e.target.value)}
                        className="w-full bg-[#121620] border border-slate-805 text-[10px] text-white p-1 rounded font-mono text-center font-bold focus:outline-none"
                      >
                        <option value="64 MB">64 MB RAM</option>
                        <option value="128 MB">128 MB RAM</option>
                        <option value="256 MB">256 MB RAM</option>
                        <option value="512 MB">512 MB RAM</option>
                        <option value="Null (Operator)">Uncapped RAM</option>
                      </select>
                    </div>
                  </div>

                </div>

                {/* Impulse visual tester triggers */}
                <div className="pt-2 border-t border-slate-850 flex items-center justify-between gap-2.5">
                  <div className="text-[8px] font-mono text-slate-500">
                    Host socket: <strong className="text-slate-400">0.0.0.0:{selectedNode.port}</strong>
                  </div>
                  <button
                    onClick={() => triggerPulseSim(selectedNodeId)}
                    className="px-2.5 py-1.5 bg-[#121620] hover:bg-[#162031] border border-slate-800 hover:border-[#00d2ff] rounded text-[9px] font-bold font-mono text-slate-350 hover:text-white flex items-center gap-1 cursor-pointer transition-all shrink-0"
                    title="Propagate Simulated Webhook Impulse along coordinates"
                  >
                    <Zap className="w-2.5 h-2.5 text-[#00d2ff]" />
                    <span>IMPULSE TEST</span>
                  </button>
                </div>

              </div>

            </div>

            {/* Bottom Help block */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-[10px] font-mono leading-relaxed text-slate-400 bg-[#12151a]/60 border border-slate-800/40 rounded p-2.5">
              <div className="flex items-start gap-1.5">
                <span className="text-blue-400 font-bold">1. Draggable Elements</span>
                <span>Each supervisor router is represented as an interactive node that can be moved arbitrarily to optimize topological overview.</span>
              </div>
              <div className="flex items-start gap-1.5">
                <span className="text-purple-400 font-bold">2. Live Attributes Editor</span>
                <span>Define exact model parameters, customized ports maps, and isolation layers to lock containers safely.</span>
              </div>
              <div className="flex items-start gap-1.5">
                <span className="text-[#00d2ff] font-bold">3. Sandbox Security Isolation</span>
                <span>Simulate system signals via continuous port hops. Container sandboxing protects code compilation and testing sequences.</span>
              </div>
            </div>

          </div>
        );
      })()}

      {/* Agents Bento Grid */}
      <div className="space-y-3">
        <h3 className="text-[10px] font-mono font-bold tracking-widest uppercase text-slate-500 flex items-center gap-1.5 italic">
          <Circle className="w-1.5 h-1.5 text-blue-500 fill-blue-500" />
          Virtual Organization Workforce Alignment
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
          {agents.map((agent) => {
            const statusColors = {
              ACTIVE: 'bg-emerald-500/10 text-emerald-400 border-emerald-555/20 text-[9px]',
              SLEEPING: 'bg-slate-800/40 text-slate-500 border-slate-800/80 text-[9px]',
              CODE_RUNNING: 'bg-blue-500/10 text-blue-400 border-blue-555/20 text-[9px]',
              STUCK: 'bg-rose-500/10 text-rose-400 border-rose-555/20 text-[9px]'
            };

            const statusLabels = {
              ACTIVE: 'ACTIVE (THINKING)',
              SLEEPING: 'IDLE (STANDBY)',
              CODE_RUNNING: 'COMPILING / TEST',
              STUCK: 'BLOCKED / STANDBY'
            };

            return (
              <motion.div
                key={agent.id}
                id={`agent-card-${agent.id}`}
                layout
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                className={`border rounded p-3 flex flex-col justify-between hover:border-slate-700 transition-all duration-300 relative overflow-hidden group ${
                  agent.status === 'ACTIVE' || agent.status === 'CODE_RUNNING' ? 'border-blue-900/40 bg-[#16191f] shadow-[0_0_12px_rgba(59,130,246,0.05)]' : 'border-slate-800 bg-[#12151a]'
                }`}
              >
                {/* Dynamic activity glow */}
                {(agent.status === 'ACTIVE' || agent.status === 'CODE_RUNNING') && (
                  <div className="absolute top-0 right-0 w-24 h-24 bg-blue-505/5 rounded-full blur-2xl -mr-8 -mt-8 pointer-events-none group-hover:bg-blue-500/10 transition-all duration-300" />
                )}

                <div className="space-y-2.5">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded bg-[#16191f] border border-slate-850 flex items-center justify-center text-base shadow-inner">
                        {agent.avatar}
                      </div>
                      <div>
                        <h4 className="text-xs font-bold text-white tracking-tight">{agent.roleTitle}</h4>
                        <span className="text-[9px] font-mono text-slate-500 uppercase block">{agent.name}</span>
                      </div>
                    </div>
                  </div>

                  <p className="text-[11px] text-slate-400 line-clamp-2 min-h-[1.75rem] leading-relaxed">
                    {agent.description}
                  </p>

                  <div className="bg-[#0f1115] border border-slate-800/60 rounded p-2 space-y-0.5">
                    <span className="text-[8px] font-mono text-blue-400 uppercase tracking-wider font-bold block">CURRENT INSTRUCTION</span>
                    <span className="text-[10px] font-mono text-slate-350 block line-clamp-2 leading-relaxed min-h-[1.5rem]">
                      {agent.currentGoal}
                    </span>
                  </div>
                </div>

                <div className="mt-3 pt-2 border-t border-slate-800/80 space-y-2">
                  <div className="flex items-center justify-between text-[10px] font-mono text-slate-500">
                    <span>Spent: <strong className="text-slate-300">${agent.costSpent.toFixed(3)}</strong></span>
                    <span>Tokens: <strong className="text-slate-300">{(agent.totalTokens / 1000).toFixed(0)}k</strong></span>
                  </div>

                  <div className="flex items-center gap-1.5 justify-between">
                    <span className={`text-[9px] py-0.5 font-mono font-bold px-1.5 rounded border uppercase ${statusColors[agent.status]}`}>
                      ● {statusLabels[agent.status]}
                    </span>

                    <button
                      onClick={() => onSelectAgent(agent.id)}
                      id={`explore-agent-btn-${agent.id}`}
                      title="Inspect Monologues & Settings"
                      className="p-1 px-2 text-[9px] bg-[#1c2128] border border-slate-800 text-slate-400 hover:text-white hover:border-slate-705 rounded font-mono inline-flex items-center gap-1 cursor-pointer transition-colors duration-200"
                    >
                      <MessageSquare className="w-2.5 h-2.5" />
                      COGNITION
                    </button>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Live Logs Channel */}
      <div className="bg-[#12151a] border border-slate-850 rounded overflow-hidden flex flex-col h-72">
        <div className="bg-[#1c2128] px-3 py-1.5 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Terminal className="w-3.5 h-3.5 text-blue-400" />
            <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-300">Swarms Event Streaming Pipeline (PostgreSQL Log Lake)</span>
          </div>
          <span className="text-[9px] bg-green-900/40 text-green-400 px-1.5 py-0.5 rounded font-mono border border-green-800 uppercase animate-pulse">
            LIVE MONITOR
          </span>
        </div>

        <div className="p-2 overflow-y-auto font-mono text-[11px] space-y-2 flex-1 select-text scrollbar-thin scrollbar-thumb-slate-800">
          {logs.slice().reverse().map((log) => {
            const levelColors = {
              THOUGHT: 'text-purple-400 border-purple-900/30 bg-purple-950/10',
              TOOL_CALL: 'text-blue-400 border-blue-900/30 bg-blue-950/10',
              INFO: 'text-slate-400 border-slate-800 bg-slate-900/10',
              SUCCESS: 'text-emerald-400 border-emerald-900/30 bg-emerald-950/10',
              ERROR: 'text-rose-400 border-rose-900/30 bg-rose-950/10'
            };

            const levelPrefixes = {
              THOUGHT: 'COGNITION / THOUGHT',
              TOOL_CALL: 'TOOL INVOCATION',
              INFO: 'SYSTEM LOG',
              SUCCESS: 'DELIVERABLE ACHIEVED',
              ERROR: 'DISCREPANCY DETECTED'
            };

            return (
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                key={log.id}
                className={`p-2 border rounded ${levelColors[log.level]} transition-colors flex flex-col sm:flex-row sm:items-start justify-between gap-1`}
              >
                <div>
                  <div className="flex flex-wrap items-center gap-1.5 mb-1 text-[9px]">
                    <span className="text-slate-500 font-bold">{log.timestamp}</span>
                    <span className="text-slate-500 font-bold">|</span>
                    <span className="text-blue-400 font-bold">[{log.agentId}]</span>
                    <span className="text-slate-500 font-bold">|</span>
                    <span className="font-bold uppercase tracking-wide">{levelPrefixes[log.level]}</span>
                  </div>
                  <div className="text-slate-305 text-[11px] font-medium leading-relaxed">{log.message}</div>
                  {log.detail && (
                    <div className="text-[9px] text-slate-500 mt-1 pl-2 border-l border-slate-800 break-words leading-relaxed max-w-full">
                      {log.detail}
                    </div>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
