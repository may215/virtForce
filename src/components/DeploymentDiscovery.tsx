import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Server, Cloud, Globe, Cpu, Database, Activity, Map, Network, ShieldCheck, HardDrive, Zap, Layers, Filter, RotateCcw } from 'lucide-react';

interface DeploymentNode {
  id: string;
  name: string;
  type: 'lb' | 'web' | 'api' | 'db' | 'cache' | 'worker' | 'queue';
  provider: 'aws' | 'gcp' | 'kubernetes';
  region: string;
  status: 'healthy' | 'degraded' | 'offline';
  cpu: number;
  memory: number;
  ip: string;
  uptime: string;
}

interface DeploymentDiscoveryProps {
  onTriggerRollback?: (nodeId: string, nodeName: string) => void;
}

const MOCK_NODES: DeploymentNode[] = [
  { id: 'lb-global', name: 'Global Edge Anycast', type: 'lb', provider: 'gcp', region: 'Global', status: 'healthy', cpu: 12, memory: 34, ip: '104.18.2.161', uptime: '99.99%' },
  { id: 'web-eu-1', name: 'Frontend Edge (EU-West)', type: 'web', provider: 'aws', region: 'eu-west-1', status: 'healthy', cpu: 45, memory: 60, ip: '10.0.1.14', uptime: '99.95%' },
  { id: 'web-us-1', name: 'Frontend Edge (US-East)', type: 'web', provider: 'aws', region: 'us-east-1', status: 'healthy', cpu: 30, memory: 55, ip: '10.1.1.22', uptime: '99.98%' },
  { id: 'api-eu-1', name: 'Core Services Gateway', type: 'api', provider: 'kubernetes', region: 'eu-west-1', status: 'healthy', cpu: 60, memory: 75, ip: '10.0.2.100', uptime: '99.90%' },
  { id: 'api-eu-2', name: 'Swarm Supervisor Node', type: 'api', provider: 'kubernetes', region: 'eu-west-1', status: 'degraded', cpu: 88, memory: 92, ip: '10.0.2.101', uptime: '98.50%' },
  { id: 'db-master', name: 'PostgreSQL Primary', type: 'db', provider: 'gcp', region: 'europe-west1', status: 'healthy', cpu: 40, memory: 85, ip: '10.0.3.50', uptime: '99.99%' },
  { id: 'db-replica', name: 'PostgreSQL Replica', type: 'db', provider: 'gcp', region: 'us-east4', status: 'healthy', cpu: 20, memory: 40, ip: '10.1.3.50', uptime: '99.99%' },
  { id: 'cache-eu-1', name: 'Redis Subpub Cluster', type: 'cache', provider: 'aws', region: 'eu-west-1', status: 'healthy', cpu: 15, memory: 65, ip: '10.0.4.10', uptime: '99.99%' },
  { id: 'worker-eu-1', name: 'AI Sandbox Worker Pool', type: 'worker', provider: 'kubernetes', region: 'eu-west-1', status: 'healthy', cpu: 95, memory: 98, ip: '10.0.5.20', uptime: '99.50%' },
];

export const DeploymentDiscovery: React.FC<DeploymentDiscoveryProps> = ({ onTriggerRollback }) => {
  const [nodes, setNodes] = useState(MOCK_NODES);
  const [selectedNode, setSelectedNode] = useState<DeploymentNode | null>(nodes[0]);
  const [isScanning, setIsScanning] = useState(false);
  const [activeProvider, setActiveProvider] = useState<'all' | 'aws' | 'gcp' | 'kubernetes'>('all');

  const handleScan = () => {
    setIsScanning(true);
    // Simulate network discovery scan
    setTimeout(() => {
      setNodes(prev => [...prev].map(n => ({
        ...n,
        cpu: Math.min(100, Math.max(0, n.cpu + (Math.random() * 20 - 10))),
        memory: Math.min(100, Math.max(0, n.memory + (Math.random() * 10 - 5)))
      })));
      setIsScanning(false);
    }, 2000);
  };

  const getStatusColor = (status: string) => {
    if (status === 'healthy') return 'text-emerald-400 bg-emerald-400/10 border-emerald-400/20';
    if (status === 'degraded') return 'text-amber-400 bg-amber-400/10 border-amber-400/20';
    return 'text-rose-400 bg-rose-400/10 border-rose-400/20';
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'lb': return <Globe className="w-5 h-5" />;
      case 'web': return <Layers className="w-5 h-5" />;
      case 'api': return <Network className="w-5 h-5" />;
      case 'db': return <Database className="w-5 h-5" />;
      case 'cache': return <Zap className="w-5 h-5" />;
      case 'worker': return <Cpu className="w-5 h-5" />;
      default: return <Server className="w-5 h-5" />;
    }
  };

  const getProviderBadge = (provider: string) => {
    switch (provider) {
      case 'aws': return <span className="bg-[#FF9900]/20 text-[#FF9900] border border-[#FF9900]/30 px-1.5 py-0.5 rounded text-[8px] font-bold uppercase tracking-wider">AWS</span>;
      case 'gcp': return <span className="bg-[#4285F4]/20 text-[#4285F4] border border-[#4285F4]/30 px-1.5 py-0.5 rounded text-[8px] font-bold uppercase tracking-wider">GCP</span>;
      case 'kubernetes': return <span className="bg-[#326CE5]/20 text-[#326CE5] border border-[#326CE5]/30 px-1.5 py-0.5 rounded text-[8px] font-bold uppercase tracking-wider">K8S</span>;
      default: return null;
    }
  };

  const filteredNodes = activeProvider === 'all' ? nodes : nodes.filter(n => n.provider === activeProvider);

  return (
    <div className="flex flex-col h-full bg-[#1a1d21] text-slate-300">
      {/* Header */}
      <div className="p-4 border-b border-slate-800 bg-[#222529] flex flex-col md:flex-row md:justify-between md:items-center gap-4">
        <div>
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <Cloud className="w-5 h-5 text-indigo-400" /> System Discovery & Topology
          </h2>
          <p className="text-xs text-slate-400 mt-1">Real-time infrastructure mapping across AWS, GCP, and Kubernetes deployments</p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex bg-[#1a1d21] border border-slate-800 rounded p-1 font-mono text-[10px]">
            <button onClick={() => setActiveProvider('all')} className={`px-3 py-1 rounded transition-colors cursor-pointer ${activeProvider === 'all' ? 'bg-indigo-600/20 text-indigo-400' : 'text-slate-400 hover:text-white'}`}>ALL</button>
            <button onClick={() => setActiveProvider('aws')} className={`px-3 py-1 rounded transition-colors cursor-pointer ${activeProvider === 'aws' ? 'bg-[#FF9900]/20 text-[#FF9900]' : 'text-slate-400 hover:text-white'}`}>AWS</button>
            <button onClick={() => setActiveProvider('gcp')} className={`px-3 py-1 rounded transition-colors cursor-pointer ${activeProvider === 'gcp' ? 'bg-[#4285F4]/20 text-[#4285F4]' : 'text-slate-400 hover:text-white'}`}>GCP</button>
            <button onClick={() => setActiveProvider('kubernetes')} className={`px-3 py-1 rounded transition-colors cursor-pointer ${activeProvider === 'kubernetes' ? 'bg-[#326CE5]/20 text-[#326CE5]' : 'text-slate-400 hover:text-white'}`}>K8S</button>
          </div>
          <button
            onClick={handleScan}
            disabled={isScanning}
            className={`px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-mono font-bold rounded shadow-lg transition-all flex items-center gap-2 ${isScanning ? 'opacity-70 cursor-not-allowed' : 'cursor-pointer'}`}
          >
            <Activity className={`w-4 h-4 ${isScanning ? 'animate-spin' : ''}`} />
            {isScanning ? 'SCANNING NETWORK...' : 'DISCOVER RESOURCES'}
          </button>
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Network Map / Grid */}
        <div className="flex-1 p-6 overflow-y-auto">
          <div className="mb-6">
            <h3 className="text-sm font-mono font-bold text-slate-400 uppercase tracking-widest border-b border-slate-800 pb-2 mb-4">Global Network Edge</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredNodes.filter(n => ['lb', 'web'].includes(n.type)).map(node => (
                <NodeCard key={node.id} node={node} selected={selectedNode?.id === node.id} onClick={() => setSelectedNode(node)} getTypeIcon={getTypeIcon} getStatusColor={getStatusColor} getProviderBadge={getProviderBadge} />
              ))}
              {filteredNodes.filter(n => ['lb', 'web'].includes(n.type)).length === 0 && <div className="text-xs text-slate-500 font-mono col-span-full">No active resources in this tier.</div>}
            </div>
          </div>

          <div className="mb-6">
            <h3 className="text-sm font-mono font-bold text-slate-400 uppercase tracking-widest border-b border-slate-800 pb-2 mb-4">Application Services</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredNodes.filter(n => ['api', 'worker'].includes(n.type)).map(node => (
                <NodeCard key={node.id} node={node} selected={selectedNode?.id === node.id} onClick={() => setSelectedNode(node)} getTypeIcon={getTypeIcon} getStatusColor={getStatusColor} getProviderBadge={getProviderBadge} />
              ))}
              {filteredNodes.filter(n => ['api', 'worker'].includes(n.type)).length === 0 && <div className="text-xs text-slate-500 font-mono col-span-full">No active resources in this tier.</div>}
            </div>
          </div>

          <div className="mb-6">
            <h3 className="text-sm font-mono font-bold text-slate-400 uppercase tracking-widest border-b border-slate-800 pb-2 mb-4">Data Persistence</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredNodes.filter(n => ['db', 'cache'].includes(n.type)).map(node => (
                <NodeCard key={node.id} node={node} selected={selectedNode?.id === node.id} onClick={() => setSelectedNode(node)} getTypeIcon={getTypeIcon} getStatusColor={getStatusColor} getProviderBadge={getProviderBadge} />
              ))}
              {filteredNodes.filter(n => ['db', 'cache'].includes(n.type)).length === 0 && <div className="text-xs text-slate-500 font-mono col-span-full">No active resources in this tier.</div>}
            </div>
          </div>
        </div>

        {/* Node Inspector Sidebar */}
        {selectedNode && (
          <div className="w-80 border-l border-slate-800 bg-[#222529] p-4 flex flex-col overflow-y-auto">
            <div className="flex items-center gap-3 mb-6">
              <div className={`p-3 rounded-lg border ${getStatusColor(selectedNode.status)}`}>
                {getTypeIcon(selectedNode.type)}
              </div>
              <div>
                <h3 className="text-base font-bold text-white leading-tight">{selectedNode.name}</h3>
                <div className="flex items-center gap-2 mt-1">
                  <div className="text-xs font-mono text-slate-500">{selectedNode.id}</div>
                  {getProviderBadge(selectedNode.provider)}
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <h4 className="text-[10px] uppercase tracking-widest text-slate-500 font-bold mb-2">Properties</h4>
                <div className="space-y-2 text-xs font-mono">
                  <div className="flex justify-between border-b border-slate-800/50 pb-1">
                    <span className="text-slate-400">Status</span>
                    <span className={`px-1.5 py-0.5 rounded text-[9px] uppercase font-bold border ${getStatusColor(selectedNode.status)}`}>
                      {selectedNode.status}
                    </span>
                  </div>
                  <div className="flex justify-between border-b border-slate-800/50 pb-1">
                    <span className="text-slate-400">Region</span>
                    <span className="text-indigo-300 flex items-center gap-1"><Map className="w-3 h-3" /> {selectedNode.region}</span>
                  </div>
                  <div className="flex justify-between border-b border-slate-800/50 pb-1">
                    <span className="text-slate-400">Provider</span>
                    <span className="text-white capitalize">{selectedNode.provider}</span>
                  </div>
                  <div className="flex justify-between border-b border-slate-800/50 pb-1">
                    <span className="text-slate-400">Internal IP</span>
                    <span className="text-white">{selectedNode.ip}</span>
                  </div>
                  <div className="flex justify-between border-b border-slate-800/50 pb-1">
                    <span className="text-slate-400">Uptime</span>
                    <span className="text-emerald-400">{selectedNode.uptime}</span>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="text-[10px] uppercase tracking-widest text-slate-500 font-bold mb-2">Live Metrics</h4>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-xs font-mono mb-1">
                      <span className="text-slate-400">CPU Usage</span>
                      <span className={selectedNode.cpu > 80 ? 'text-rose-400' : 'text-emerald-400'}>{selectedNode.cpu.toFixed(1)}%</span>
                    </div>
                    <div className="h-1.5 bg-slate-800 rounded-full overflow-hidden">
                      <div className={`h-full ${selectedNode.cpu > 80 ? 'bg-rose-500' : 'bg-emerald-500'}`} style={{ width: `${selectedNode.cpu}%` }} />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-xs font-mono mb-1">
                      <span className="text-slate-400">Memory Allocation</span>
                      <span className={selectedNode.memory > 85 ? 'text-amber-400' : 'text-blue-400'}>{selectedNode.memory.toFixed(1)}%</span>
                    </div>
                    <div className="h-1.5 bg-slate-800 rounded-full overflow-hidden">
                      <div className={`h-full ${selectedNode.memory > 85 ? 'bg-amber-500' : 'bg-blue-500'}`} style={{ width: `${selectedNode.memory}%` }} />
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-800 space-y-2">
                <button className="w-full py-2 bg-[#2a2d32] hover:bg-[#32363c] border border-slate-700 rounded text-xs font-bold text-white transition-colors flex items-center justify-center gap-2 cursor-pointer">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" /> Run Security Audit
                </button>
                <button 
                  onClick={() => onTriggerRollback?.(selectedNode.id, selectedNode.name)}
                  className="w-full py-2 bg-rose-900/20 hover:bg-rose-900/40 border border-rose-800/50 rounded text-xs font-bold text-rose-400 transition-colors flex items-center justify-center gap-2 cursor-pointer"
                >
                  <RotateCcw className="w-4 h-4" /> Trigger Service Rollback
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const NodeCard = ({ node, selected, onClick, getTypeIcon, getStatusColor, getProviderBadge }: { node: DeploymentNode, selected: boolean, onClick: () => void, getTypeIcon: (type: string) => React.ReactNode, getStatusColor: (status: string) => string, getProviderBadge: (provider: string) => React.ReactNode }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      onClick={onClick}
      className={`p-4 rounded-xl border cursor-pointer transition-all ${
        selected 
          ? 'bg-[#2a2d35] border-indigo-500/50 shadow-[0_0_15px_rgba(99,102,241,0.1)]' 
          : 'bg-[#222529] border-slate-800 hover:border-slate-600 hover:bg-[#26292d]'
      }`}
    >
      <div className="flex justify-between items-start mb-3">
        <div className={`p-2 rounded-md border flex items-center gap-2 ${getStatusColor(node.status)}`}>
          {getTypeIcon(node.type)}
        </div>
        <div className="flex flex-col items-end gap-1.5">
          <div className={`px-1.5 py-0.5 rounded text-[9px] uppercase font-bold tracking-wider border ${getStatusColor(node.status)}`}>
            {node.status}
          </div>
          {getProviderBadge(node.provider)}
        </div>
      </div>
      <h4 className="text-sm font-bold text-white leading-tight mb-1">{node.name}</h4>
      <div className="text-[10px] font-mono text-slate-500 mb-3">{node.ip} • {node.region}</div>
      
      <div className="flex gap-4">
        <div className="flex-1">
          <div className="text-[9px] text-slate-500 font-mono mb-1">CPU</div>
          <div className="h-1 bg-slate-800 rounded-full overflow-hidden">
            <div className={`h-full ${node.cpu > 80 ? 'bg-rose-500' : 'bg-emerald-500'}`} style={{ width: `${node.cpu}%` }} />
          </div>
        </div>
        <div className="flex-1">
          <div className="text-[9px] text-slate-500 font-mono mb-1">MEM</div>
          <div className="h-1 bg-slate-800 rounded-full overflow-hidden">
            <div className={`h-full ${node.memory > 85 ? 'bg-amber-500' : 'bg-blue-500'}`} style={{ width: `${node.memory}%` }} />
          </div>
        </div>
      </div>
    </motion.div>
  );
};

