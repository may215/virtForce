import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { CommandPalette } from './CommandPalette';

describe('CommandPalette', () => {
  it('renders correctly when open', () => {
    const handleClose = vi.fn();
    const handleSelectAction = vi.fn();
    
    render(
      <CommandPalette 
        isOpen={true} 
        onClose={handleClose} 
        onSelectAction={handleSelectAction} 
        isSimulating={false} 
        isSystemKilled={false} 
      />
    );
    
    expect(screen.getByPlaceholderText('Search swarm command, dashboards, actions, or inspect agents...')).toBeInTheDocument();
  });

  it('does not render when closed', () => {
    const handleClose = vi.fn();
    const handleSelectAction = vi.fn();
    
    const { container } = render(
      <CommandPalette 
        isOpen={false} 
        onClose={handleClose} 
        onSelectAction={handleSelectAction} 
        isSimulating={false} 
        isSystemKilled={false} 
      />
    );
    
    expect(container.firstChild).toBeNull();
  });
});
