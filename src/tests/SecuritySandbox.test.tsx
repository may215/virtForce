import { render, screen, fireEvent } from '@testing-library/react';
import { expect, test, describe, vi } from 'vitest';
import { SecuritySandbox } from '../components/SecuritySandbox';
import { INITIAL_TASKS } from '../mockData';

describe('SecuritySandbox', () => {
  test('renders the empty state when no tasks are HITL', () => {
    // Initial tasks may not be in HITL state, but let's mock one
    const tasks = [];
    render(<SecuritySandbox tasks={tasks} isSystemKilled={false} onApproveDeploy={vi.fn()} onRejectRetrain={vi.fn()} onGlobalKillReset={vi.fn()} onInitializeVenture={vi.fn()} />);
    expect(screen.getByText(/All Gates Secure/i)).toBeDefined();
  });

  test('renders a HITL task and allows approval', () => {
    const handleApprove = vi.fn();
    const mockTasks = [
      {
        ...INITIAL_TASKS[0],
        id: 'TASK-001',
        state: 'HITL' as const,
      }
    ];

    render(<SecuritySandbox tasks={mockTasks} isSystemKilled={false} onApproveDeploy={handleApprove} onRejectRetrain={vi.fn()} onGlobalKillReset={vi.fn()} onInitializeVenture={vi.fn()} />);
    
    expect(screen.getByText(/TASK-001/i)).toBeDefined();
    
    const approveBtn = screen.getByText('SECURE MERGE & RELEASE TO PROD');
    fireEvent.click(approveBtn);

    expect(handleApprove).toHaveBeenCalledWith('TASK-001');
  });

  test('allows rejecting with feedback', () => {
    const handleReject = vi.fn();
    const mockTasks = [
      {
        ...INITIAL_TASKS[0],
        id: 'TASK-001',
        state: 'HITL' as const,
      }
    ];

    render(<SecuritySandbox tasks={mockTasks} isSystemKilled={false} onRejectRetrain={handleReject} onApproveDeploy={vi.fn()} onGlobalKillReset={vi.fn()} onInitializeVenture={vi.fn()} />);
    
    // Type feedback
    const textarea = screen.getByPlaceholderText(/Provide feedback details/i);
    fireEvent.change(textarea, { target: { value: 'Fix the padding' } });

    const rejectBtn = screen.getByText('REJECT DEVELOPMENT & FEEDBACK');
    fireEvent.click(rejectBtn);

    expect(handleReject).toHaveBeenCalledWith('TASK-001', 'Fix the padding');
  });
});
