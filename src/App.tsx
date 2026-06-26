import { useState } from 'react';
import { AgentRole } from './types';
import { HQCore } from './components/HQCore';
import { KanbanBoard } from './components/KanbanBoard';
import { LogsExplorer } from './components/LogsExplorer';
import { SecuritySandbox } from './components/SecuritySandbox';
import { VentureIncubator } from './components/VentureIncubator';
import { LandingPage } from './components/LandingPage';
import { CommandPalette } from './components/CommandPalette';
import { Activity, Circle, Terminal, ShieldAlert, Sparkles, Home, Search, Network, X } from 'lucide-react';
import { SREIncidents } from './components/SREIncidents';
import { DeploymentDiscovery } from './components/DeploymentDiscovery';
import { IncidentReporter } from './components/IncidentReporter';
import { useSwarmSimulation } from './hooks/useSwarmSimulation';
import { useKeyboardShortcuts } from './hooks/useKeyboardShortcuts';
import { useDocs } from './hooks/useDocs';

export default function App() {
  const [showLanding, setShowLanding] = useState(true);
  const [isPaletteOpen, setIsPaletteOpen] = useState(false);
  const [autoStartSreSimulation, setAutoStartSreSimulation] = useState(false);
  const [activeTab, setActiveTab] = useState<'hq' | 'kanban' | 'logs' | 'gates' | 'incubator' | 'sre' | 'discovery'>('hq');
  const [selectedAgentId, setSelectedAgentId] = useState<AgentRole>('CEO');

  const { docReadme, docArchitecture, docInstall, docCompose } = useDocs();

  const {
    agents, setAgents,
    tasks, setTasks,
    logs, setLogs,
    stats, setStats,
    sandboxLogs, setSandboxLogs,
    isSimulating, setIsSimulating,
    simulationSpeed, setSimulationSpeed,
    isSystemKilled, setIsSystemKilled,
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
  } = useSwarmSimulation();

  useKeyboardShortcuts(
    setIsSimulating,
    setIsPaletteOpen,
    setActiveTab,
    setShowLanding,
    setIsSystemKilled,
    setSelectedAgentId
  );

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

  if (showLanding) {
    return (
      <LandingPage 
        onEnterDashboard={(tabId) => {
          if (tabId === 'sre') {
            setAutoStartSreSimulation(true);
            setActiveTab('sre');
          } else {
            setActiveTab('hq');
          }
          setShowLanding(false);
        }} 
        readmeText={docReadme}
        architectureText={docArchitecture}
        installText={docInstall}
        dockerComposeText={docCompose}
      />
    );
  }

  return (
    <div className="flex h-screen bg-[#111318] text-white overflow-hidden font-sans">
      <nav className="w-16 md:w-64 bg-[#1a1d21] border-r border-slate-800 flex flex-col justify-between flex-shrink-0 transition-all z-20">
        <div>
          <div className="h-16 flex items-center justify-center md:justify-start md:px-4 border-b border-slate-800">
            <div className="w-8 h-8 rounded bg-indigo-500 flex items-center justify-center font-bold text-white shadow-lg shrink-0">vF</div>
            <span className="hidden md:block font-bold text-slate-100 ml-3 tracking-wide">Production SRE</span>
          </div>
          
          {/* Header Search Integration (Cmd+K) */}
          <div className="p-3 hidden md:block">
            <button
              onClick={() => setIsPaletteOpen(true)}
              className="w-full bg-[#111318] hover:bg-[#222529] border border-slate-800 text-slate-400 text-xs px-3 py-2 rounded flex justify-between items-center transition-colors cursor-pointer"
            >
              <div className="flex items-center gap-2">
                <Search className="w-4 h-4 text-slate-500" />
                <span>Jump to...</span>
              </div>
              <span className="font-mono bg-slate-800 px-1.5 rounded text-[10px] text-slate-300 border border-slate-700">Cmd K</span>
            </button>
          </div>

          <div className="p-2 md:p-3 space-y-1">
            <button
              onClick={() => setActiveTab('hq')}
              className={`w-full text-left px-3 py-1.5 rounded cursor-pointer transition-colors flex items-center ${
                activeTab === 'hq' ? 'bg-[#222529] text-white border border-slate-700/50' : 'text-slate-400 hover:bg-[#222529]'
              }`}
            >
              <Home className="w-4 h-4 md:mr-3 mx-auto" />
              <span className="hidden md:block">Headquarters</span>
            </button>
            <button
              onClick={() => setActiveTab('kanban')}
              className={`w-full text-left px-3 py-1.5 rounded cursor-pointer transition-colors flex items-center justify-between ${
                activeTab === 'kanban' ? 'bg-[#222529] text-white border border-slate-700/50' : 'text-slate-400 hover:bg-[#222529]'
              }`}
            >
              <div className="flex items-center">
                <Activity className="w-4 h-4 md:mr-3 mx-auto" />
                <span className="hidden md:block">Active Board</span>
              </div>
              {tasks.filter(t => t.state === 'FEEDBACK' || t.state === 'QA').length > 0 && (
                <span className="hidden md:flex w-5 h-5 rounded-full bg-indigo-500/20 text-indigo-400 text-xs items-center justify-center font-bold">
                  {tasks.filter(t => t.state === 'FEEDBACK' || t.state === 'QA').length}
                </span>
              )}
            </button>
            <button
              onClick={() => setActiveTab('incubator')}
              className={`w-full text-left px-3 py-1.5 rounded cursor-pointer transition-colors flex items-center ${
                activeTab === 'incubator' ? 'bg-[#222529] text-white border border-slate-700/50' : 'text-slate-400 hover:bg-[#222529]'
              }`}
            >
              <Sparkles className="w-4 h-4 md:mr-3 mx-auto" />
              <span className="hidden md:block">Venture Incubator</span>
            </button>
            <button
              onClick={() => setActiveTab('logs')}
              className={`w-full text-left px-3 py-1.5 rounded cursor-pointer transition-colors flex items-center ${
                activeTab === 'logs' ? 'bg-[#222529] text-white border border-slate-700/50' : 'text-slate-400 hover:bg-[#222529]'
              }`}
            >
              <Terminal className="w-4 h-4 md:mr-3 mx-auto" />
              <span className="hidden md:block">Swarm Matrix</span>
            </button>
          </div>
          
          <div className="mt-4 px-2 md:px-3 text-xs font-mono text-slate-500 hidden md:block">
            SECURITY ZONES
          </div>
          <div className="p-2 md:p-3 space-y-1 mt-1">
            <button
              onClick={() => setActiveTab('gates')}
              className={`w-full text-left px-3 py-1.5 rounded cursor-pointer transition-colors flex items-center justify-between ${
                activeTab === 'gates' ? 'bg-[#1164A3] text-white' : 'text-slate-400 hover:bg-[#222529]'
              }`}
            >
              <div className="flex items-center gap-2"><span>#</span> <span className="hidden md:block">sandbox-gate</span></div>
              {tasks.filter(t => t.state === 'HITL').length > 0 && (
                <span className="hidden md:flex w-4 h-4 rounded-full bg-rose-500 text-white text-[10px] items-center justify-center font-bold">!</span>
              )}
            </button>
            <button
              onClick={() => setActiveTab('sre')}
              className={`w-full text-left px-3 py-1.5 rounded cursor-pointer transition-colors flex items-center justify-between group ${
                activeTab === 'sre' ? 'bg-amber-900/40 text-amber-500 border border-amber-900/50' : 'text-slate-400 hover:bg-[#222529]'
              }`}
            >
              <div className="flex items-center gap-2">
                <ShieldAlert className={`w-4 h-4 ${activeTab === 'sre' ? 'text-amber-500' : 'text-slate-500 group-hover:text-slate-400'}`} /> 
                <span className="hidden md:block">SRE Incidents</span>
              </div>
            </button>
            <button
              onClick={() => setActiveTab('discovery')}
              className={`w-full text-left px-3 py-1.5 rounded cursor-pointer transition-colors flex items-center justify-between group ${
                activeTab === 'discovery' ? 'bg-indigo-900/40 text-indigo-400 border border-indigo-900/50' : 'text-slate-400 hover:bg-[#222529]'
              }`}
            >
              <div className="flex items-center gap-2">
                <Network className={`w-4 h-4 ${activeTab === 'discovery' ? 'text-indigo-400' : 'text-slate-500 group-hover:text-slate-400'}`} /> 
                <span className="hidden md:block">net-discovery</span>
              </div>
            </button>
          </div>
        </div>

        <div className="p-4 border-t border-slate-800 hidden md:block">
          <div className="flex items-center justify-between text-xs text-slate-500">
            <span className="font-mono">v4.1.7 [Edge]</span>
            <span className="flex items-center gap-1"><Circle className="w-2 h-2 fill-emerald-500 text-emerald-500" /> ON</span>
          </div>
        </div>
      </nav>

      <main className="flex-1 flex flex-col min-w-0 bg-[#12151f] relative">
        <header className="h-14 border-b border-slate-800 flex items-center justify-between px-4 md:px-6 bg-[#1a1d21] shrink-0 sticky top-0 z-10">
          <div className="flex items-center gap-3">
            <h1 className="font-bold text-white text-lg font-mono flex items-center gap-2">
              {activeTab === 'hq' && 'HQ: Command Center'}
              {activeTab === 'kanban' && 'Task Pipeline'}
              {activeTab === 'logs' && 'Matrix Viewer'}
              {activeTab === 'gates' && 'Sandbox / Merge Gates'}
              {activeTab === 'incubator' && 'Venture Incubator'}
              {activeTab === 'sre' && 'SRE / Incident Defense'}
              {activeTab === 'discovery' && 'Topology / Discovery'}
            </h1>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="flex items-center bg-[#111318] rounded-md border border-slate-800 p-1 hidden lg:flex">
              <button
                onClick={() => setSimulationSpeed(0.5)}
                className={`px-3 py-1 rounded text-xs font-mono font-bold transition-colors cursor-pointer ${simulationSpeed === 0.5 ? 'bg-slate-800 text-white' : 'text-slate-500 hover:text-slate-300'}`}
              >
                0.5x
              </button>
              <button
                onClick={() => setSimulationSpeed(1)}
                className={`px-3 py-1 rounded text-xs font-mono font-bold transition-colors cursor-pointer ${simulationSpeed === 1 ? 'bg-slate-800 text-white' : 'text-slate-500 hover:text-slate-300'}`}
              >
                1.0x
              </button>
              <button
                onClick={() => setSimulationSpeed(2)}
                className={`px-3 py-1 rounded text-xs font-mono font-bold transition-colors cursor-pointer ${simulationSpeed === 2 ? 'bg-slate-800 text-white' : 'text-slate-500 hover:text-slate-300'}`}
              >
                2.0x
              </button>
            </div>

            <button
              onClick={() => setIsSimulating(!isSimulating)}
              disabled={isSystemKilled}
              className={`px-4 py-1.5 rounded font-bold text-xs font-mono flex items-center gap-2 transition-colors cursor-pointer ${
                isSystemKilled ? 'bg-slate-800 text-slate-500 cursor-not-allowed opacity-50' :
                isSimulating 
                  ? 'bg-amber-500/10 text-amber-500 border border-amber-500/20 hover:bg-amber-500/20' 
                  : 'bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 hover:bg-emerald-500/20'
              }`}
            >
              <Activity className={`w-3.5 h-3.5 ${isSimulating ? 'animate-pulse' : ''}`} />
              {isSystemKilled ? 'KILLED' : isSimulating ? 'PAUSE SWARM' : 'RESUME SWARM'}
            </button>
          </div>
        </header>

        {/* Mobile Navigation Pills */}
        <div className="md:hidden bg-[#1a1d21] border-b border-slate-800 p-2 overflow-x-auto shrink-0 flex items-center gap-2 scrollbar-hide">
          <button
            onClick={() => setActiveTab('hq')}
            className={`px-2 py-1 rounded whitespace-nowrap text-xs font-bold transition-colors cursor-pointer ${activeTab === 'hq' ? 'bg-[#222529] text-white' : 'text-slate-400'}`}
          >
            HQ
          </button>
          <button
            onClick={() => setActiveTab('kanban')}
            className={`px-2 py-1 rounded whitespace-nowrap text-xs font-bold transition-colors cursor-pointer relative ${activeTab === 'kanban' ? 'bg-[#222529] text-white' : 'text-slate-400'}`}
          >
            Board
            {tasks.filter(t => t.state === 'FEEDBACK' || t.state === 'QA').length > 0 && (
              <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-indigo-500"></span>
            )}
          </button>
          <button
            onClick={() => setActiveTab('logs')}
            className={`px-2 py-1 rounded whitespace-nowrap text-xs font-bold transition-colors cursor-pointer ${activeTab === 'logs' ? 'bg-[#222529] text-white' : 'text-slate-400'}`}
          >
            Logs
          </button>
          <button
            onClick={() => setActiveTab('gates')}
            className={`px-2 py-1 rounded flex-1 text-center cursor-pointer transition-all relative ${activeTab === 'gates' ? 'bg-[#1164A3] text-white border border-slate-800/80 shadow' : 'text-slate-450 text-slate-400 hover:text-white'}`}
          >
            🛡️ Sandbox
            {tasks.filter(t => t.state === 'HITL').length > 0 && (
              <span className="absolute top-1 right-1 w-1.5 h-1.5 rounded-full bg-rose-500 animate-ping" />
            )}
          </button>
          <button
            onClick={() => setActiveTab('sre')}
            className={`px-2 py-1 flex-1 text-center rounded whitespace-nowrap text-xs font-bold transition-colors cursor-pointer flex items-center justify-center gap-1 ${activeTab === 'sre' ? 'bg-amber-900/40 text-amber-500 border border-amber-900/50' : 'text-slate-400'}`}
          >
            🔥 SRE
          </button>
          <button
            onClick={() => setActiveTab('discovery')}
            className={`px-2 py-1 flex-1 text-center rounded whitespace-nowrap text-xs font-bold transition-colors cursor-pointer flex items-center justify-center gap-1 ${activeTab === 'discovery' ? 'bg-indigo-900/40 text-indigo-400 border border-indigo-900/50' : 'text-slate-400'}`}
          >
            🌐 Discovery
          </button>
        </div>

        <div className="flex-1 overflow-hidden relative">
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
            onSelectAgent={(id) => { setSelectedAgentId(id as any); setActiveTab('logs'); }}
          />
        )}

        {activeTab === 'incubator' && (
          <VentureIncubator
            agents={agents}
            tasks={tasks}
            onInitializeVenture={(name, pitch, tech, metric, back, ag) => {
              handleInitializeVenture(name, pitch, tech, metric, back, ag, () => {
                setActiveTab('hq');
                setShowLanding(false);
                setIsSimulating(true);
              });
            }}
            logs={logs}
          />
        )}

        {activeTab === 'kanban' && (
          <KanbanBoard
            tasks={tasks}
            logs={logs}
            onAddTask={handleAddTask}
          />
        )}

        {activeTab === 'logs' && (
          <LogsExplorer 
            logs={logs} 
            agents={agents} 
            tasks={tasks}
            sandboxLogs={sandboxLogs}
            selectedAgentId={selectedAgentId}
            onSelectAgent={(id) => setSelectedAgentId(id as any)}
            onUpdateAgentConfig={(id, updates) => setAgents(prev => prev.map(a => a.id === id ? { ...a, ...updates } : a))}
          />
        )}

        {activeTab === 'gates' && (
          <SecuritySandbox
            tasks={tasks}
            onApproveDeploy={(id) => handleApproveDeploy(id, 'main', () => { setActiveTab('hq'); })}
            onRejectRetrain={handleRejectRetrain}
            onGlobalKillReset={handleGlobalKillReset}
            isSystemKilled={isSystemKilled}
            onInitializeVenture={(name, pitch, tech, metric, back, ag) => {
              handleInitializeVenture(name, pitch, tech, metric, back, ag, () => {
                setActiveTab('hq');
                setShowLanding(false);
                setIsSimulating(true);
              });
            }}
          />
        )}

        {activeTab === 'sre' && (
          <SREIncidents autoStartSimulation={autoStartSreSimulation} />
        )}

        {activeTab === 'discovery' && (
          <DeploymentDiscovery onTriggerRollback={(id, name) => handleTriggerRollback(id, name, () => {
            setActiveTab('kanban');
          }, () => {
            setActiveTab('gates');
          })} />
        )}
          </div>
      </main>

      {/* SRE Incident Reporter Modal popup when a task hits MERGED */}
      {recentSreReportId && (
        <div className="fixed inset-0 bg-[#000000]/80 backdrop-blur-sm flex items-center justify-center p-4 z-[100]">
          <div className="bg-[#19171d] border border-emerald-900/60 rounded-xl max-w-4xl w-full overflow-hidden shadow-[0_0_40px_rgba(16,185,129,0.1)] flex flex-col max-h-[90vh]">
            <div className="flex justify-between items-center p-4 border-b border-slate-800 bg-[#12151f]">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-emerald-500/10 flex items-center justify-center border border-emerald-500/30">
                  <ShieldAlert className="w-4 h-4 text-emerald-400" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white uppercase tracking-wider font-mono">Incident Post-Mortem Generated</h3>
                  <p className="text-xs text-slate-500 font-mono">Autonomous SRE Resolution Confirmed</p>
                </div>
              </div>
              <button onClick={() => setRecentSreReportId(null)} className="text-slate-500 hover:text-white transition-colors cursor-pointer">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-4 overflow-y-auto custom-scrollbar flex-1">
              {(() => {
                const task = tasks.find(t => t.id === recentSreReportId);
                return task ? <IncidentReporter task={task} logs={logs} /> : null;
              })()}
            </div>
          </div>
        </div>
      )}

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
