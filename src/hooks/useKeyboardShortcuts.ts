import { useEffect } from 'react';

export function useKeyboardShortcuts(
  setIsSimulating: React.Dispatch<React.SetStateAction<boolean>>,
  setIsPaletteOpen: React.Dispatch<React.SetStateAction<boolean>>,
  setActiveTab: React.Dispatch<React.SetStateAction<'hq' | 'kanban' | 'logs' | 'gates' | 'incubator' | 'sre' | 'discovery'>>,
  setShowLanding: React.Dispatch<React.SetStateAction<boolean>>,
  setIsSystemKilled: React.Dispatch<React.SetStateAction<boolean>>,
  setSelectedAgentId: React.Dispatch<React.SetStateAction<any>>
) {
  useEffect(() => {
    const handleGlobalShortcuts = (e: KeyboardEvent) => {
      const activeEl = document.activeElement;
      const isInputFocused = activeEl && (
        activeEl.tagName === 'INPUT' || 
        activeEl.tagName === 'TEXTAREA' || 
        activeEl.hasAttribute('contenteditable')
      );

      // Ctrl + Enter: Toggle simulation cycle
      if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
        e.preventDefault();
        setIsSimulating(prev => !prev);
        return;
      }

      // Ctrl + K: Toggle command palette
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsPaletteOpen(prev => !prev);
        return;
      }

      // Alt modifier shortcuts
      if (e.altKey) {
        if (e.key === '1') {
          e.preventDefault();
          setActiveTab('hq');
          setShowLanding(false);
        } else if (e.key === '2') {
          e.preventDefault();
          setActiveTab('kanban');
          setShowLanding(false);
        } else if (e.key === '3') {
          e.preventDefault();
          setActiveTab('logs');
          setShowLanding(false);
        } else if (e.key === '4') {
          e.preventDefault();
          setActiveTab('gates');
          setShowLanding(false);
        } else if (e.key === '5') {
          e.preventDefault();
          setActiveTab('incubator');
          setShowLanding(false);
        } else if (e.key.toLowerCase() === 'l') {
          e.preventDefault();
          setShowLanding(prev => !prev);
        } else if (e.key.toLowerCase() === 'x') {
          e.preventDefault();
          setIsSystemKilled(prev => !prev);
        }
        return;
      }

      if (isInputFocused) return;

      if (e.shiftKey) {
        const keyLower = e.key.toLowerCase();
        if (keyLower === 'c') {
          e.preventDefault();
          setSelectedAgentId('CEO');
          setActiveTab('logs');
          setShowLanding(false);
        } else if (keyLower === 'p') {
          e.preventDefault();
          setSelectedAgentId('PM');
          setActiveTab('logs');
          setShowLanding(false);
        } else if (keyLower === 'd') {
          e.preventDefault();
          setSelectedAgentId('DEV');
          setActiveTab('logs');
          setShowLanding(false);
        } else if (keyLower === 'q') {
          e.preventDefault();
          setSelectedAgentId('QA');
          setActiveTab('logs');
          setShowLanding(false);
        } else if (keyLower === 'm') {
          e.preventDefault();
          setSelectedAgentId('MKT');
          setActiveTab('logs');
          setShowLanding(false);
        }
      }
    };

    window.addEventListener('keydown', handleGlobalShortcuts);
    return () => window.removeEventListener('keydown', handleGlobalShortcuts);
  }, [setIsSimulating, setIsPaletteOpen, setActiveTab, setShowLanding, setIsSystemKilled, setSelectedAgentId]);
}
