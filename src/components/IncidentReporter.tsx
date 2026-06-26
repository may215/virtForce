import React from 'react';
import { Task, SwarmLog } from '../types';

interface IncidentReporterProps {
  task: Task;
  logs: SwarmLog[];
}

export const IncidentReporter: React.FC<IncidentReporterProps> = ({ task, logs }) => {
  const taskLogs = logs.filter(l => l.message.includes(task.title) || l.detail?.includes(task.id) || l.message.includes(task.id));

  const report = {
    incidentId: task.id,
    title: task.title,
    status: 'RESOLVED',
    resolutionState: task.state,
    timeline: {
      startedAt: task.createdAt,
      resolvedAt: task.updatedAt,
    },
    rootCauseAnalysis: task.description,
    agentInterventions: taskLogs.map(l => ({
      timestamp: l.timestamp,
      agent: l.agentId,
      action: l.message,
      detail: l.detail
    })),
    resolutionDetails: {
      branch: task.githubBranch,
      specDoc: task.specDoc,
      diff: task.codeDiff,
      terminalLogs: task.terminalOutput,
      cost: task.costAccumulated,
      tokens: task.tokensUsed
    }
  };

  return (
    <div className="bg-[#12151f] p-4 rounded-xl border border-emerald-900/50 mt-4 font-mono text-xs overflow-x-auto text-emerald-400">
      <div className="flex items-center gap-2 mb-3 border-b border-emerald-900/50 pb-2">
        <span className="bg-emerald-900/40 text-emerald-400 px-2 py-0.5 rounded text-[10px] uppercase font-bold tracking-wider">Automated Incident JSON Report</span>
        <span className="text-slate-400">Generated upon MERGED</span>
      </div>
      <pre className="whitespace-pre-wrap">{JSON.stringify(report, null, 2)}</pre>
    </div>
  );
};
