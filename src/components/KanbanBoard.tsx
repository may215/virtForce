import React, { useState } from 'react';
import { Task, TaskState } from '../types';
import { motion, AnimatePresence } from 'motion/react';
import { Calendar, DollarSign, BookOpen, AlertCircle, Sparkles, CheckCircle2, RefreshCw, Layers } from 'lucide-react';

interface KanbanBoardProps {
  tasks: Task[];
  onMoveTask?: (taskId: string, newState: TaskState) => void;
  onAddTask?: (title: string, desc: string, source: 'customer' | 'strategy' | 'internal') => void;
}

export function KanbanBoard({ tasks, onMoveTask, onAddTask }: KanbanBoardProps) {
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newDesc, setNewDesc] = useState('');
  const [newSource, setNewSource] = useState<'customer' | 'strategy' | 'internal'>('customer');

  const COLUMNS: { id: TaskState; title: string; color: string; desc: string }[] = [
    { id: 'FEEDBACK', title: 'TRIAGE BUG', color: 'border-t-rose-500 bg-rose-500/5', desc: 'Raw customer issues' },
    { id: 'BACKLOG', title: 'BACKLOG QUEUE', color: 'border-t-amber-500 bg-amber-500/5', desc: 'PM groomed tickets' },
    { id: 'SPEC', title: 'PM SPECS', color: 'border-t-purple-500 bg-purple-500/5', desc: 'Approved markdown specs' },
    { id: 'DEV', title: 'ACTIVE DEV', color: 'border-t-blue-500 bg-blue-500/5', desc: 'Building code branches' },
    { id: 'QA', title: 'QA & SANDBOX', color: 'border-t-cyan-500 bg-cyan-500/5', desc: 'Test suite checks' },
    { id: 'HITL', title: 'AWAITING GATE', color: 'border-t-indigo-500 bg-indigo-550/5 border border-indigo-500/30 shadow-[0_0_8px_rgba(99,102,241,0.1)]', desc: 'Deploy lock gate' },
    { id: 'MERGED', title: 'DEPLOYED PRODUCTION', color: 'border-t-emerald-500 bg-emerald-500/5', desc: 'Released live' },
  ];

  const handleCreateTaskSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;
    if (onAddTask) {
      onAddTask(newTitle, newDesc, newSource);
    }
    setNewTitle('');
    setNewDesc('');
    setNewSource('customer');
    setShowAddModal(false);
  };

  return (
    <div className="space-y-4">
      {/* Header operations bar */}
      <div className="flex items-center justify-between border border-slate-800 bg-bg-density-card p-3 rounded">
        <div>
          <h2 className="text-xs font-bold text-white flex items-center gap-1.5 uppercase font-mono tracking-tight">
            <Layers className="w-4 h-4 text-blue-550 text-blue-400" />
            VIRTUAL VENTURE PIPELINE (TASK KANBAN)
          </h2>
          <p className="text-[10px] text-slate-400">Track and advance tickets dynamically across multi-agent divisions.</p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          id="trigger-add-task-btn"
          className="px-3 py-1.5 bg-blue-600 hover:bg-blue-500 text-white text-[10px] font-mono font-bold rounded shadow-md transition-colors duration-205 cursor-pointer"
        >
          + CREATE NEW CUSTOMER TICKET (FEEDBACK)
        </button>
      </div>

      {/* Grid columns */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-7 gap-2.5 overflow-x-auto pb-4 select-none min-h-[480px]">
        {COLUMNS.map(col => {
          const colTasks = tasks.filter(t => t.state === col.id);

          return (
            <div
              key={col.id}
              className={`bg-bg-density-sidebar border border-slate-850 rounded p-2.5 flex flex-col justify-start h-full min-w-[170px] border-t-2 ${col.color}`}
            >
              <div className="mb-2.5 space-y-0.5">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono font-bold text-slate-250 uppercase tracking-wider">{col.title}</span>
                  <span className="text-[9px] font-mono font-bold bg-[#0f1115] border border-slate-800 text-slate-400 px-1.5 rounded">
                    {colTasks.length}
                  </span>
                </div>
                <p className="text-[9px] text-slate-500 font-mono italic">{col.desc}</p>
              </div>

              <div className="space-y-2 flex-1 h-full overflow-y-auto">
                {colTasks.length === 0 ? (
                  <div className="border border-dashed border-slate-800/40 rounded p-4 text-center text-[9px] font-mono text-slate-600">
                    Empty Queue
                  </div>
                ) : (
                  colTasks.map(task => {
                    const sourceLabels = {
                      customer: 'Support Block',
                      strategy: 'PM Initiative',
                      internal: 'Refactor',
                    };

                    const sourceColors = {
                      customer: 'text-rose-400 border-rose-900/40 bg-rose-950/10',
                      strategy: 'text-purple-400 border-purple-900/40 bg-purple-950/10',
                      internal: 'text-slate-400 border-slate-800 bg-slate-900/10',
                    };

                    return (
                      <motion.div
                        key={task.id}
                        layoutId={`task-card-${task.id}`}
                        onClick={() => setSelectedTask(task)}
                        id={`task-card-click-${task.id}`}
                        className={`bg-[#16191f] border border-slate-850 hover:border-slate-700 hover:bg-[#1c2128] rounded p-2.5 space-y-2 cursor-pointer transition-all duration-150 relative group overflow-hidden ${
                          task.state === 'HITL' ? 'border-indigo-500/50 shadow-[0_0_8px_rgba(99,102,241,0.15)] bg-[#12151a]' : ''
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-[8px] font-mono text-slate-500 font-extrabold">{task.id}</span>
                          <span className={`text-[8px] px-1 py-0.5 rounded font-mono border uppercase font-bold tracking-wider ${sourceColors[task.source]}`}>
                            {sourceLabels[task.source]}
                          </span>
                        </div>

                        <h4 className="text-[11px] font-semibold text-slate-300 group-hover:text-blue-400 leading-snug transition-colors line-clamp-2">
                          {task.title}
                        </h4>

                        <div className="flex items-center justify-between text-[9px] font-mono text-slate-500 pt-1.5 border-t border-slate-800/60">
                          <span className="flex items-center gap-0.5">
                            <DollarSign className="w-2.5 h-2.5 text-emerald-555 text-emerald-400" />
                            ${task.costAccumulated.toFixed(2)}
                          </span>
                          <span>Logs: {Object.keys(task.innerMonologue || {}).length}</span>
                        </div>
                      </motion.div>
                    );
                  })
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Task full-screener inspector modal */}
      <AnimatePresence>
        {selectedTask && (
          <div className="fixed inset-0 bg-[#000000]/70 backdrop-blur-sm flex items-center justify-center p-4 z-50">
            <motion.div
              layoutId={`task-card-${selectedTask.id}`}
              className="bg-bg-density-card border border-slate-800 rounded max-w-2xl w-full overflow-hidden flex flex-col shadow-2xl"
            >
              <div className="bg-bg-density-tab px-4 py-2.5 border-b border-slate-800 flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono text-slate-500 font-bold">{selectedTask.id}</span>
                    <span className="text-[9px] font-mono px-1.5 py-0.5 bg-blue-900/40 text-blue-400 border border-blue-800 rounded">
                      {selectedTask.state}
                    </span>
                  </div>
                  <h3 className="text-xs font-bold text-white mt-1 uppercase tracking-tight font-mono">{selectedTask.title}</h3>
                </div>
                <button
                  onClick={() => setSelectedTask(null)}
                  className="p-1 px-2.5 bg-[#12151a] hover:bg-[#16191f] text-[10px] font-mono rounded text-slate-300 border border-slate-800 transition-colors"
                >
                  CLOSE
                </button>
              </div>

              <div className="p-4 space-y-4 overflow-y-auto max-h-[75vh]">
                <div className="space-y-1">
                  <h4 className="text-[9px] font-mono tracking-wider text-slate-505 uppercase font-bold text-slate-500">FEEDBACK STATEMENT / DESCRIPTION</h4>
                  <p className="text-[11px] text-slate-300 leading-relaxed font-sans">{selectedTask.description}</p>
                </div>

                <div className="grid grid-cols-2 gap-3 pb-3 border-b border-slate-800/60 text-[10px] font-mono">
                  <div className="bg-bg-density-sidebar p-2 border border-slate-800 rounded">
                    <span className="text-[8px] text-slate-500 font-bold block">ACCUMULATED SPEND</span>
                    <strong className="text-emerald-400 text-xs mt-0.5 block">${selectedTask.costAccumulated.toFixed(3)}</strong>
                  </div>
                  <div className="bg-bg-density-sidebar p-2 border border-slate-800 rounded">
                    <span className="text-[8px] text-slate-500 font-bold block">CONTEXT BURNT</span>
                    <strong className="text-blue-400 text-xs mt-0.5 block">{selectedTask.tokensUsed.toLocaleString()} tokens</strong>
                  </div>
                </div>

                {/* Markdown Spec */}
                <div className="space-y-1.5">
                  <div className="flex items-center gap-1 text-[9px] font-mono tracking-wider text-slate-500 uppercase font-bold">
                    <BookOpen className="w-3 h-3 text-blue-400" />
                    Product Manager Specifications (.md schema)
                  </div>
                  {selectedTask.specDoc ? (
                    <pre className="bg-[#12151a] p-3 border border-slate-850 rounded text-[10px] text-slate-300 font-mono whitespace-pre-wrap leading-relaxed">
                      {selectedTask.specDoc}
                    </pre>
                  ) : (
                    <div className="bg-[#12151a]/30 border border-dashed border-slate-850 rounded p-4 text-center text-[10px] font-mono text-slate-500 italic">
                      Specifications sheet not yet generated. The Task must advance past BACKLOG to the SPEC stage.
                    </div>
                  )}
                </div>

                {/* Agent Inner Thoughts logs mapped to this task */}
                <div className="space-y-2">
                  <span className="text-[9px] font-mono tracking-wider text-slate-500 uppercase font-bold block">
                    Swarm Inner Cognition Monologues
                  </span>
                  <div className="space-y-1.5">
                    {Object.entries(selectedTask.innerMonologue || {}).length > 0 ? (
                      Object.entries(selectedTask.innerMonologue || {}).map(([agent, thought]) => (
                        <div key={agent} className="bg-[#12151a] border border-slate-850 rounded p-2.5 text-[10px]">
                          <div className="flex items-center gap-1.5 mb-1 bg-[#16191f] px-2 py-0.5 rounded border border-slate-800 max-w-fit">
                            <span className="text-[9px]">🧠</span>
                            <span className="font-mono font-bold text-purple-400">[{agent} AGENT]</span>
                          </div>
                          <p className="text-slate-400 leading-relaxed font-mono italic">"{thought}"</p>
                        </div>
                      ))
                    ) : (
                      <div className="text-center text-[10px] font-mono text-slate-500 border border-dashed border-slate-850 p-3 rounded">
                        No agent monologues currently logged for this ticket.
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Manual customer feedback creator modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-[#000000]/70 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-bg-density-card border border-slate-850 rounded max-w-md w-full overflow-hidden p-4 shadow-2xl space-y-3"
          >
            <div className="flex justify-between items-center pb-2 border-b border-slate-800">
              <h3 className="text-xs font-bold text-white flex items-center gap-1.5 font-mono uppercase">
                <Sparkles className="w-3.5 h-3.5 text-blue-400" />
                Initialize Inbound Feedback Ticket
              </h3>
              <button
                onClick={() => setShowAddModal(false)}
                className="text-[10px] font-mono text-slate-400 hover:text-white"
              >
                Cancel
              </button>
            </div>

            <form onSubmit={handleCreateTaskSubmit} className="space-y-3">
              <div className="space-y-1">
                <label className="text-[8px] font-mono tracking-wider text-slate-500 uppercase block font-bold">Ticket Header / Title</label>
                <input
                  type="text"
                  placeholder="e.g. Broken links in billing tabs"
                  value={newTitle}
                  onChange={e => setNewTitle(e.target.value)}
                  className="w-full bg-[#12151a] border border-slate-800 rounded p-2 text-white text-[10px] font-mono focus:outline-none focus:border-blue-500"
                  required
                />
              </div>

              <div className="space-y-1">
                <label className="text-[8px] font-mono tracking-wider text-slate-500 uppercase block font-bold">Issue Description Details</label>
                <textarea
                  placeholder="Provide precise client-facing error feedback stack templates or request goals..."
                  rows={3}
                  value={newDesc}
                  onChange={e => setNewDesc(e.target.value)}
                  className="w-full bg-[#12151a] border border-slate-800 rounded p-2 text-white text-[10px] font-mono focus:outline-none focus:border-blue-500"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[8px] font-mono tracking-wider text-slate-500 uppercase block font-bold">Feedback Trigger Division</label>
                <select
                  value={newSource}
                  onChange={e => setNewSource(e.target.value as any)}
                  className="w-full bg-[#12151a] border border-slate-800 rounded p-2 text-white text-[10px] font-mono focus:outline-none focus:border-blue-500"
                >
                  <option value="customer">🚨 Support Bug Report (SUPPORT)</option>
                  <option value="strategy">💡 Business Strategic Objective (CEO / PM)</option>
                  <option value="internal">⚙️ Systems Integration Refactoring (DEV / QA)</option>
                </select>
              </div>

              <button
                type="submit"
                id="submit-feedback-btn"
                className="w-full py-2 bg-blue-600 hover:bg-blue-500 text-white text-[10px] font-mono rounded shadow-md font-bold cursor-pointer transition-colors duration-200"
              >
                STAGE TICKET INTO SWARM QUEUE
              </button>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  );
}
