import React, { Component, ErrorInfo, ReactNode } from 'react';
import { ShieldAlert, RefreshCw } from 'lucide-react';

interface Props {
  children?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
  }

  public handleReset = () => {
    this.setState({ hasError: false, error: null });
    // In a real app we might want to clear local storage if the error is persistence related
    // localStorage.clear();
    window.location.reload();
  };

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-[#111318] flex items-center justify-center p-4 text-white font-sans">
          <div className="bg-[#1a1d21] border border-rose-900/50 p-8 rounded-xl max-w-lg w-full text-center shadow-2xl">
            <div className="w-16 h-16 bg-rose-500/10 rounded-full flex items-center justify-center mx-auto mb-6 border border-rose-500/20">
              <ShieldAlert className="w-8 h-8 text-rose-500" />
            </div>
            <h1 className="text-xl font-bold font-mono text-white mb-2 uppercase tracking-wide">System Failure Detected</h1>
            <p className="text-slate-400 text-sm mb-6 bg-[#111318] p-4 rounded-md font-mono text-left overflow-x-auto border border-slate-800">
              {this.state.error?.message || 'An unexpected runtime error occurred.'}
            </p>
            <button 
              onClick={this.handleReset}
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-rose-600 hover:bg-rose-500 text-white rounded font-bold font-mono text-xs transition-colors shadow-lg shadow-rose-900/20"
            >
              <RefreshCw className="w-4 h-4" />
              REBOOT SYSTEM
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
