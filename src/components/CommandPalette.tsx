import React, { useState, useEffect, useRef } from 'react';
import { Search, Command, ArrowRight, CornerDownLeft, ShieldX, Play, Pause, RefreshCw, User, Layout, Kanban, Terminal, Shield, Sparkles, Home } from 'lucide-react';

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectAction: (actionId: string) => void;
  isSimulating: boolean;
  isSystemKilled: boolean;
}

export function CommandPalette({ isOpen, onClose, onSelectAction, isSimulating, isSystemKilled }: CommandPaletteProps) {
  const [search, setSearch] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const actions = [
    {
      id: 'go-dashboard',
      name: 'Draggable Swarm CAD Canvas',
      category: 'Navigation',
      desc: 'Topological visual representation of agent supervisor branches',
      icon: <Layout className="w-4 h-4 text-indigo-400" />,
      shortcut: 'Alt + 1'
    },
    {
      id: 'go-kanban',
      name: 'Scrum Backlog Board',
      category: 'Navigation',
      desc: 'Active developmental tasks, epic user stories, and Kanban pipeline',
      icon: <Kanban className="w-4 h-4 text-emerald-400" />,
      shortcut: 'Alt + 2'
    },
    {
      id: 'go-logs',
      name: 'AI Cog Logs & Parameters Explorer',
      category: 'Navigation',
      desc: 'Inspect neural LLM prompts, agent models, and weights tuning',
      icon: <Terminal className="w-4 h-4 text-blue-400" />,
      shortcut: 'Alt + 3'
    },
    {
      id: 'go-gates',
      name: 'Sandbox Security Isolation Chamber',
      category: 'Navigation',
      desc: 'Review side-by-side git diff pull requests and webhook payloads',
      icon: <Shield className="w-4 h-4 text-rose-400" />,
      shortcut: 'Alt + 4'
    },
    {
      id: 'go-incubator',
      name: 'Venture & Organic Marketing Incubator',
      category: 'Navigation',
      desc: 'Manage micro-budgets, auto-generate SEO waitlists and copy sheets',
      icon: <Sparkles className="w-4 h-4 text-amber-400" />,
      shortcut: 'Alt + 5'
    },
    {
      id: 'toggle-landing',
      name: 'Toggle Landing Homepage',
      category: 'Navigation',
      desc: 'Switch between the immersive homepage and the OS dashboard panels',
      icon: <Home className="w-4 h-4 text-violet-400" />,
      shortcut: 'Alt + L'
    },
    {
      id: 'toggle-simulation',
      name: isSimulating ? 'Pause Swarm Simulation' : 'Launch Swarm Simulation Loop',
      category: 'Operations',
      desc: 'Trigger or halt standard cron communication heartbeats across supervisor nodes',
      icon: isSimulating ? <Pause className="w-4 h-4 text-amber-500 animate-pulse" /> : <Play className="w-4 h-4 text-emerald-400" />,
      shortcut: 'Ctrl + Enter'
    },
    {
      id: 'toggle-kill',
      name: isSystemKilled ? 'Power-On & Reset Swarm' : 'EMERGENCY SWARM SHUTDOWN',
      category: 'Operations',
      desc: 'Instantly cut container context power bounds and freeze sandbox isolates',
      icon: <ShieldX className={`w-4 h-4 ${isSystemKilled ? 'text-emerald-450' : 'text-rose-500 animate-pulse'}`} />,
      shortcut: 'Alt + X'
    },
    {
      id: 'inspect-ceo',
      name: 'Inspect Agent: CEO (Orchestrator)',
      category: 'Agent Memory',
      desc: 'View active parameters, LLM model state, and logs for CEO',
      icon: <User className="w-4 h-4 text-slate-300" />,
      shortcut: 'Shift + C'
    },
    {
      id: 'inspect-pm',
      name: 'Inspect Agent: Product Manager',
      category: 'Agent Memory',
      desc: 'View active parameters, LLM model state, and logs for PM',
      icon: <User className="w-4 h-4 text-indigo-300" />,
      shortcut: 'Shift + P'
    },
    {
      id: 'inspect-dev',
      name: 'Inspect Agent: Developer (Coder)',
      category: 'Agent Memory',
      desc: 'View active parameters, LLM model state, and logs for DEV',
      icon: <User className="w-4 h-4 text-emerald-300" />,
      shortcut: 'Shift + D'
    },
    {
      id: 'inspect-qa',
      name: 'Inspect Agent: QA Security Auditor',
      category: 'Agent Memory',
      desc: 'View active parameters, LLM model state, and logs for QA',
      icon: <User className="w-4 h-4 text-rose-300" />,
      shortcut: 'Shift + Q'
    },
    {
      id: 'inspect-mkt',
      name: 'Inspect Agent: Growth Marketer',
      category: 'Agent Memory',
      desc: 'View active parameters, LLM model state, and logs for Growth Marketer',
      icon: <User className="w-4 h-4 text-amber-300" />,
      shortcut: 'Shift + M'
    }
  ];

  const filtered = actions.filter(act => 
    act.name.toLowerCase().includes(search.toLowerCase()) ||
    act.category.toLowerCase().includes(search.toLowerCase()) ||
    act.desc.toLowerCase().includes(search.toLowerCase())
  );

  useEffect(() => {
    if (isOpen) {
      setSearch('');
      setSelectedIndex(0);
      setTimeout(() => inputRef.current?.focus(), 50);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;

      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex(prev => (prev + 1) % Math.max(1, filtered.length));
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex(prev => (prev - 1 + filtered.length) % Math.max(1, filtered.length));
      } else if (e.key === 'Enter') {
        e.preventDefault();
        if (filtered[selectedIndex]) {
          onSelectAction(filtered[selectedIndex].id);
        }
      } else if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, filtered, selectedIndex, onSelectAction, onClose]);

  // Handle click outside to close
  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div 
      onClick={handleBackdropClick}
      className="fixed inset-0 z-50 bg-[#020408]/85 backdrop-blur-sm flex items-start justify-center pt-[10vh] px-4 animate-fade-in"
      id="command-palette-backdrop"
    >
      <div 
        ref={containerRef}
        className="w-full max-w-xl bg-[#090b11] border border-slate-800 rounded-xl shadow-2xl shadow-indigo-500/10 flex flex-col overflow-hidden max-h-[80vh] md:max-h-[600px] animate-scale-up"
        id="command-palette-modal"
      >
        {/* Search header bar */}
        <div className="flex items-center gap-3 px-4 py-3.5 border-b border-slate-850 bg-[#07080d]/90 font-mono">
          <Search className="w-5 h-5 text-indigo-400 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            className="flex-1 bg-transparent text-white border-none outline-none text-xs placeholder-slate-600 focus:ring-0 leading-none h-6 pb-0.5 text-left block"
            placeholder="Search swarm command, dashboards, actions, or inspect agents..."
            value={search}
            onChange={e => {
              setSearch(e.target.value);
              setSelectedIndex(0);
            }}
          />
          <span className="text-[9px] bg-slate-900 border border-slate-800 px-1.5 py-0.5 rounded leading-none text-slate-500 tracking-wider">
            ESC TO CANCEL
          </span>
        </div>

        {/* Categories / Option rows */}
        <div className="flex-1 overflow-y-auto p-2 space-y-2 scrollbar-thin scrollbar-thumb-slate-800 max-h-[400px]">
          {filtered.length === 0 ? (
            <div className="py-8 text-center text-slate-500 font-mono text-[11px] space-y-1 block">
              <ShieldX className="w-6 h-6 text-slate-700 mx-auto opacity-60 mb-1" />
              <div>No neural commands match &quot;<span className="text-amber-400">{search}</span>&quot;</div>
              <span className="text-[9px] text-slate-650 block">Try entering generic terms like &quot;sand&quot;, &quot;logs&quot;, or &quot;ceo&quot;.</span>
            </div>
          ) : (
            Object.entries(
              filtered.reduce((acc, act) => {
                if (!acc[act.category]) acc[act.category] = [];
                acc[act.category].push(act);
                return acc;
              }, {} as Record<string, typeof actions>)
            ).map(([category, items]) => {
              // Calculate cumulative relative index for arrow-key mapping across categories
              return (
                <div key={category} className="space-y-1">
                  <div className="px-3 py-1 text-[8px] font-mono tracking-widest text-[#00d2ff] uppercase font-bold bg-[#0a0f18]/30 rounded">
                    {category}
                  </div>
                  <div className="space-y-0.5">
                    {items.map((item) => {
                      // Get the dynamic unified index of this item in the filtered array
                      const itemUnifiedIndex = filtered.findIndex(f => f.id === item.id);
                      const isSelected = itemUnifiedIndex === selectedIndex;

                      return (
                        <button
                          key={item.id}
                          onClick={() => onSelectAction(item.id)}
                          onMouseEnter={() => setSelectedIndex(itemUnifiedIndex)}
                          className={`w-full p-2.5 rounded-lg border text-left flex items-start justify-between gap-3 transition-all cursor-pointer ${
                            isSelected 
                              ? 'bg-[#121626] border-indigo-600/70 text-white' 
                              : 'bg-transparent border-transparent text-slate-400 hover:text-slate-200'
                          }`}
                        >
                          <div className="flex items-center gap-3 min-w-0">
                            <span className={`p-1.5 rounded-md ${isSelected ? 'bg-indigo-950/50 border border-indigo-805' : 'bg-[#0b0c10] border border-slate-900'} shrink-0`}>
                              {item.icon}
                            </span>
                            <div className="font-mono text-[11px] truncate block">
                              <div className={`font-bold uppercase tracking-wide leading-tight ${isSelected ? 'text-white' : 'text-slate-350'}`}>
                                {item.name}
                              </div>
                              <div className="text-[9px] text-slate-500 mt-0.5 truncate leading-normal" title={item.desc}>
                                {item.desc}
                              </div>
                            </div>
                          </div>
                          
                          <div className="flex items-center gap-1.5 shrink-0 font-mono text-[9px]/none pt-0.5">
                            {isSelected ? (
                              <span className="text-indigo-400 flex items-center gap-0.5 text-[8.5px] font-bold bg-[#1d1f33]/60 px-1 rounded-sm border border-indigo-900/40">
                                ENTER <CornerDownLeft className="w-2.5 h-2.5" />
                              </span>
                            ) : (
                              <span className="text-slate-600 bg-[#0d0f15] border border-slate-900 px-1 rounded-sm uppercase font-semibold">
                                {item.shortcut}
                              </span>
                            )}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Footer shortcuts helper view */}
        <div className="px-4 py-2 border-t border-slate-850 bg-[#05060a]/90 flex flex-wrap justify-between items-center text-[9px] text-slate-500 font-mono gap-y-1">
          <div className="flex gap-3">
            <span className="flex items-center gap-0.5"><Command className="w-2.5 h-2.5" /> + K to close</span>
            <span>•</span>
            <span>↑↓ Arrow keys to navigate</span>
            <span>•</span>
            <span>Alt + [1-5] to quick jump tabs</span>
          </div>
          <div className="text-[8px] uppercase tracking-wider text-slate-600 font-semibold md:ml-auto">
            active cognitive compliance shell v2.0
          </div>
        </div>
      </div>
    </div>
  );
}
