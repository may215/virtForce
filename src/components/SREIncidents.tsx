import React, { useState, useEffect, useRef } from 'react';
import { Incident } from '../types';
import Markdown from 'react-markdown';
import { INITIAL_INCIDENTS } from '../mockData';
import { Play, BarChart2 } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';

const INCIDENT_IMPACT_DATA = [
  { day: 'Mon', criticalAlerts: 4, avgResolutionTime: 45 },
  { day: 'Tue', criticalAlerts: 7, avgResolutionTime: 52 },
  { day: 'Wed', criticalAlerts: 2, avgResolutionTime: 20 },
  { day: 'Thu', criticalAlerts: 8, avgResolutionTime: 65 },
  { day: 'Fri', criticalAlerts: 3, avgResolutionTime: 30 },
  { day: 'Sat', criticalAlerts: 1, avgResolutionTime: 15 },
  { day: 'Sun', criticalAlerts: 5, avgResolutionTime: 40 }
];

interface SREIncidentsProps {
  autoStartSimulation?: boolean;
}

export const SREIncidents: React.FC<SREIncidentsProps> = ({ autoStartSimulation }) => {
  const [incidents, setIncidents] = useState<Incident[]>(INITIAL_INCIDENTS);
  const [selectedIncidentId, setSelectedIncidentId] = useState<string | null>(incidents[0]?.id || null);
  const [isSimulating, setIsSimulating] = useState(false);
  const simulationStarted = useRef(false);

  const selectedIncident = incidents.find((inc) => inc.id === selectedIncidentId);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (autoStartSimulation && !simulationStarted.current && !isSimulating) {
      simulationStarted.current = true;
      // Slight delay to allow UI to render first
      setTimeout(() => triggerSimulation(), 500);
    }
  }, [autoStartSimulation, isSimulating]);

  // Listen for incoming Sentry webhooks via SSE
  useEffect(() => {
    const eventSource = new EventSource('/api/events');
    eventSource.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        if (data.type === 'sentry_alert') {
          triggerSimulation(data.title, data.desc);
        }
      } catch (err) {
        console.error('Error parsing SSE event:', err);
      }
    };
    return () => eventSource.close();
  }, []);

  // Auto scroll to bottom of details view when things update
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [selectedIncident]);

  const getStatusColor = (status: Incident['status']) => {
    switch (status) {
      case 'INVESTIGATING': return 'text-orange-400 bg-orange-950/40 border-orange-900/60';
      case 'REPRODUCING': return 'text-blue-400 bg-blue-950/40 border-blue-900/60';
      case 'FIXING': return 'text-purple-400 bg-purple-950/40 border-purple-900/60';
      case 'VALIDATING': return 'text-indigo-400 bg-indigo-950/40 border-indigo-900/60';
      case 'RESOLVED': return 'text-emerald-400 bg-emerald-950/40 border-emerald-900/60';
      default: return 'text-slate-400 bg-slate-900 border-slate-700';
    }
  };

  const getSeverityColor = (severity: Incident['severity']) => {
    switch (severity) {
      case 'SEV-1': return 'text-red-400 bg-red-950/40 border-red-900/60';
      case 'SEV-2': return 'text-orange-400 bg-orange-950/40 border-orange-900/60';
      case 'SEV-3': return 'text-yellow-400 bg-yellow-950/40 border-yellow-900/60';
      default: return 'text-slate-400 bg-slate-900 border-slate-700';
    }
  };

  const triggerSimulation = (customTitle?: string, customDesc?: string) => {
    if (isSimulating) return;
    setIsSimulating(true);

    const newIncidentId = `INC-${Math.floor(Math.random() * 10000) + 1000}`;
    const newIncident: Incident = {
      id: newIncidentId,
      status: 'INVESTIGATING',
      severity: 'SEV-1',
      source: 'Sentry Webhook',
      title: customTitle || 'Uncaught TypeError: Cannot read properties of undefined (reading \'user\')',
      stackTrace: customDesc ? `Incoming webhook payload received...\nParsing Sentry payload...\n${customDesc}` : `Incoming webhook payload received...\nParsing Sentry payload...`,
      createdAt: new Date().toISOString()
    };

    setIncidents(prev => [newIncident, ...prev]);
    setSelectedIncidentId(newIncidentId);

    let step = 0;
    const interval = setInterval(() => {
      step++;
      setIncidents(prev => prev.map(inc => {
        if (inc.id !== newIncidentId) return inc;
        let nextInc = { ...inc };

        if (step === 1) {
          nextInc.stackTrace += `\nTypeError: Cannot read properties of undefined (reading 'user')\n    at UserProfile (/app/src/components/UserProfile.tsx:42:15)\n    at renderWithHooks (/app/node_modules/react-dom/cjs/react-dom.development.js:15486:18)\n    at updateFunctionComponent (/app/node_modules/react-dom/cjs/react-dom.development.js:19617:20)`;
        } else if (step === 2) {
          nextInc.status = 'REPRODUCING';
          nextInc.stackTrace += `\n\n[Swarm Alert] Waking up CEO agent...`;
        } else if (step === 3) {
          nextInc.stackTrace += `\n[CEO] Assigning bug to DEV and QA agents...`;
          nextInc.terminalOutput = `> docker run -d --name isolate_qa virtforce/sandbox:latest\n> Container started: b34a8f192`;
        } else if (step === 4) {
          nextInc.terminalOutput += `\n> Pushing exact state from git commit 8a93b22...`;
          nextInc.terminalOutput += `\n> Applying Sentry session replay context...`;
        } else if (step === 5) {
          nextInc.terminalOutput += `\n> QA Agent: Running reproduction script...`;
          nextInc.terminalOutput += `\n> CRASH VERIFIED: Reproducible in sandbox.`;
          nextInc.status = 'FIXING';
        } else if (step === 6) {
          nextInc.terminalOutput += `\n> DEV Agent: Analyzing stack trace...`;
          nextInc.terminalOutput += `\n> DEV Agent: The \`user\` object is null when the session expires prematurely. Adding optional chaining and fallback states.`;
          nextInc.fixDiff = {
            file: 'src/components/UserProfile.tsx',
            deletions: ['<div className="user-name">{user.profile.name}</div>'],
            additions: ['<div className="user-name">{user?.profile?.name || "Guest"}</div>']
          };
        } else if (step === 7) {
          nextInc.status = 'VALIDATING';
          nextInc.terminalOutput += `\n> DEV Agent: Patch applied. Handoff to QA.`;
          nextInc.terminalOutput += `\n> QA Agent: Executing Jest test suite...`;
        } else if (step === 8) {
          nextInc.terminalOutput += `\n> PASS src/components/UserProfile.test.tsx`;
          nextInc.terminalOutput += `\n> PASS src/tests/integration/auth.test.ts`;
          nextInc.terminalOutput += `\n> 142 tests passed in 4.2s.`;
        } else if (step === 9) {
          nextInc.status = 'RESOLVED';
          nextInc.terminalOutput += `\n> DEVOPS Agent: Triggering hotfix deployment (v1.2.1)... DONE`;
          nextInc.report = `## Incident Summary\n\n- **Root Cause**: The \`UserProfile\` component was accessing \`user.profile\` without checking if \`user\` was null, leading to a crash on expired sessions.\n- **Fix Applied**: Added optional chaining (\`user?.profile?.name\`) and a fallback string ("Guest").\n- **Validation**: 142 regression tests passed in the isolated sandbox.\n- **Resolution**: Hotfix automatically deployed via CI pipeline.\n\n_This entire resolution was handled autonomously by virtForce._`;
          clearInterval(interval);
          setIsSimulating(false);
        }

        return nextInc;
      }));
    }, 1500);
  };

  return (
    <div className="flex h-full text-slate-300">
      {/* Incidents List (Left Panel) */}
      <div className="w-80 border-r border-slate-800/80 bg-[#19171d] flex flex-col overflow-hidden">
        <div className="p-4 border-b border-slate-800/80 bg-[#12151f] flex justify-between items-center">
          <div>
            <h2 className="text-sm font-bold text-white uppercase font-mono tracking-wider">Active Incidents</h2>
            <p className="text-xs text-slate-500 mt-1">SRE Autonomous Defense</p>
          </div>
          <button 
            onClick={triggerSimulation}
            disabled={isSimulating}
            className={`p-1.5 rounded-full border border-indigo-900/60 bg-indigo-950/40 text-indigo-400 hover:bg-indigo-900/60 transition-colors shadow-sm ${isSimulating ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
            title="Simulate incoming Sentry webhook"
          >
            <Play className={`w-3.5 h-3.5 fill-current ${isSimulating ? 'animate-pulse' : ''}`} />
          </button>
        </div>
        <div className="flex-1 overflow-y-auto">
          <button
            onClick={() => setSelectedIncidentId(null)}
            className={`w-full text-left p-4 border-b border-slate-800/50 hover:bg-slate-800/20 transition-all flex items-center gap-3 ${selectedIncidentId === null ? 'bg-[#1164A3] border-l-2 border-l-blue-400' : 'border-l-2 border-l-transparent'}`}
          >
            <BarChart2 className="w-5 h-5 text-blue-400" />
            <div>
              <div className="text-xs font-bold text-white">Impact Dashboard</div>
              <div className="text-[10px] text-slate-500 font-mono">Overview & Metrics</div>
            </div>
          </button>
          
          {incidents.map((incident) => (
            <button
              key={incident.id}
              onClick={() => setSelectedIncidentId(incident.id)}
              className={`w-full text-left p-4 border-b border-slate-800/50 hover:bg-slate-800/20 transition-all ${selectedIncidentId === incident.id ? 'bg-[#1164A3] border-l-2 border-l-red-500' : 'border-l-2 border-l-transparent'}`}
            >
              <div className="flex justify-between items-start mb-2">
                <span className="font-mono text-xs font-bold text-slate-200">{incident.id}</span>
                <span className={`text-[9px] font-mono font-bold px-1.5 py-0.5 rounded border uppercase ${getSeverityColor(incident.severity)}`}>
                  {incident.severity}
                </span>
              </div>
              <h3 className="text-xs font-bold text-white mb-2 line-clamp-2 leading-tight">{incident.title}</h3>
              <div className="flex justify-between items-center text-[10px] font-mono">
                <span className="text-slate-500">{incident.source}</span>
                <span className={`px-1.5 py-0.5 rounded border uppercase font-bold ${getStatusColor(incident.status)}`}>
                  {incident.status}
                </span>
              </div>
            </button>
          ))}
        </div>

        {/* Integration Setup Panel */}
        <div className="p-4 border-t border-slate-800/80 bg-[#0e111a]">
          <h3 className="text-xs font-bold text-white uppercase font-mono mb-3 text-red-400 border-b border-red-900/30 pb-2">Integrations</h3>
          
          <div className="space-y-4">
            <div>
              <div className="text-[10px] font-bold text-slate-400 mb-1">Sentry Webhook URL</div>
              <div className="bg-black border border-slate-800 p-2 rounded flex items-center justify-between group cursor-pointer hover:border-slate-600">
                <span className="font-mono text-[9px] text-emerald-400 truncate">https://api.virtforce.app/hooks/sentry/a9x2b...</span>
                <span className="text-[9px] text-slate-500 group-hover:text-slate-300">COPY</span>
              </div>
            </div>
            
            <div>
              <div className="text-[10px] font-bold text-slate-400 mb-1">Custom SDK Init</div>
              <div className="bg-[#222529] border border-slate-800 p-2 rounded text-[9px] font-mono text-slate-400 overflow-x-auto">
<pre><code>{`import { VirtForceSRE } from '@virtforce/sdk';

VirtForceSRE.init({
  projectId: 'prj_xyz',
  apiKey: process.env.VF_KEY
});`}</code></pre>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Incident Details (Right Panel) */}
      <div className="flex-1 flex flex-col bg-[#222529] overflow-hidden">
        {selectedIncident ? (
          <>
            <div className="p-6 border-b border-slate-800/80 bg-[#0a0c12]">
              <div className="flex items-center gap-3 mb-4">
                <h1 className="text-xl font-bold text-white font-mono tracking-tight">{selectedIncident.id}</h1>
                <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded border uppercase ${getSeverityColor(selectedIncident.severity)}`}>
                  {selectedIncident.severity}
                </span>
                <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded border uppercase ${getStatusColor(selectedIncident.status)}`}>
                  STATUS: {selectedIncident.status}
                </span>
                <span className="text-xs text-slate-500 ml-auto font-mono">{new Date(selectedIncident.createdAt).toLocaleString()}</span>
              </div>
              <h2 className="text-lg text-slate-200 mb-4">{selectedIncident.title}</h2>
              <div className="flex items-center gap-2 text-xs font-mono text-slate-400 bg-[#12151f] p-2 rounded border border-slate-800 inline-flex">
                <span className="text-slate-500">Source:</span>
                <span className="text-white">{selectedIncident.source}</span>
              </div>
            </div>

            <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-8 scroll-smooth">
              {/* Stack Trace */}
              <div className="space-y-2">
                <h3 className="text-xs font-bold text-white uppercase font-mono tracking-widest text-red-400">Crash Stack Trace</h3>
                <div className="bg-[#1a0f0f] border border-red-900/30 p-4 rounded-lg font-mono text-xs text-red-300 overflow-x-auto">
                  <pre><code>{selectedIncident.stackTrace}</code></pre>
                </div>
              </div>

              {/* Swarm Actions */}
              {selectedIncident.status === 'RESOLVED' && selectedIncident.report && (
                <div className="space-y-4">
                  <h3 className="text-xs font-bold text-white uppercase font-mono tracking-widest text-emerald-400">Post-Mortem & Swarm Report</h3>
                  <div className="bg-[#0b1016] border border-slate-800 p-6 rounded-lg text-sm text-slate-300">
                    <div className="markdown-body font-sans text-sm">
                      <Markdown>{selectedIncident.report}</Markdown>
                    </div>
                  </div>
                </div>
              )}

              {/* Code Diff */}
              {selectedIncident.fixDiff && (
                <div className="space-y-2">
                  <h3 className="text-xs font-bold text-white uppercase font-mono tracking-widest text-blue-400">Applied Sandbox Hotfix</h3>
                  <div className="bg-[#090b10] border border-slate-800 rounded-lg overflow-hidden font-mono text-xs">
                    <div className="bg-[#12151f] border-b border-slate-800 p-2 text-slate-400">
                      {selectedIncident.fixDiff.file}
                    </div>
                    <div className="p-4 overflow-x-auto space-y-1">
                      {selectedIncident.fixDiff.deletions.map((line, i) => (
                        <div key={`del-${i}`} className="text-red-400 bg-red-950/20 px-2 py-0.5 rounded flex whitespace-pre">
                          <span className="text-red-500/50 mr-4 select-none">-</span>{line}
                        </div>
                      ))}
                      {selectedIncident.fixDiff.additions.map((line, i) => (
                        <div key={`add-${i}`} className="text-emerald-400 bg-emerald-950/20 px-2 py-0.5 rounded flex whitespace-pre">
                          <span className="text-emerald-500/50 mr-4 select-none">+</span>{line}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Terminal Logs */}
              {selectedIncident.terminalOutput && (
                <div className="space-y-2 pb-8">
                  <h3 className="text-xs font-bold text-white uppercase font-mono tracking-widest text-slate-400">Sandbox CI/CD Verification Logs</h3>
                  <div className="bg-black border border-slate-800 p-4 rounded-lg font-mono text-[11px] text-slate-400 overflow-x-auto">
                    <pre><code>{selectedIncident.terminalOutput}</code></pre>
                  </div>
                </div>
              )}
            </div>
          </>
        ) : (
          <div className="flex flex-col h-full overflow-y-auto p-6 bg-[#1a1d24]">
            <h2 className="text-xl font-bold text-white font-mono mb-6">SRE Incident Impact Dashboard</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
              {/* Chart 1: Resolution Time */}
              <div className="bg-[#12151f] border border-slate-800 p-4 rounded-lg shadow-sm">
                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4">Historical Resolution Time (mins)</h3>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={INCIDENT_IMPACT_DATA} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                      <defs>
                        <linearGradient id="colorRes" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#818cf8" stopOpacity={0.8}/>
                          <stop offset="95%" stopColor="#818cf8" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
                      <XAxis dataKey="day" stroke="#64748b" fontSize={10} tickLine={false} axisLine={false} />
                      <YAxis stroke="#64748b" fontSize={10} tickLine={false} axisLine={false} />
                      <Tooltip contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #334155', fontSize: '12px' }} />
                      <Area type="monotone" dataKey="avgResolutionTime" stroke="#818cf8" fillOpacity={1} fill="url(#colorRes)" />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>
              
              {/* Chart 2: Alert Frequency */}
              <div className="bg-[#12151f] border border-slate-800 p-4 rounded-lg shadow-sm">
                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4">Critical Alerts Frequency</h3>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={INCIDENT_IMPACT_DATA} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
                      <XAxis dataKey="day" stroke="#64748b" fontSize={10} tickLine={false} axisLine={false} />
                      <YAxis stroke="#64748b" fontSize={10} tickLine={false} axisLine={false} />
                      <Tooltip contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #334155', fontSize: '12px' }} cursor={{ fill: '#1e293b' }} />
                      <Bar dataKey="criticalAlerts" fill="#f43f5e" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
            
            <div className="bg-[#12151f] border border-slate-800 p-6 rounded-lg text-sm text-slate-300">
              <h3 className="text-sm font-bold text-white mb-2">Automated Incident Defense</h3>
              <p className="text-slate-400 mb-4">
                The SRE swarm automatically catches exceptions, provisions an isolated sandbox, reproduces the trace, and applies a patch. The impact of the autonomous SRE team has reduced manual on-call burden by over 80%.
              </p>
              <ul className="list-disc list-inside space-y-2 text-xs font-mono text-slate-500">
                <li>Webhook integration active: listening for Sentry events on /api/webhooks/sentry</li>
                <li>Zero-downtime regression test pipeline initialized</li>
                <li>Container sandboxes provisioned on demand</li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
