import { render, screen, fireEvent } from '@testing-library/react';
import { expect, test, describe, vi } from 'vitest';
import { KanbanBoard } from '../components/KanbanBoard';
import { INITIAL_TASKS } from '../mockData';

describe('KanbanBoard', () => {
  test('renders columns and tasks', () => {
    render(<KanbanBoard tasks={INITIAL_TASKS} />);
    
    // Check columns
    expect(screen.getByText('BACKLOG QUEUE')).toBeDefined();
    expect(screen.getByText('ACTIVE DEV')).toBeDefined();
    expect(screen.getByText('QA & SANDBOX')).toBeDefined();
    
    // Check for a specific task from INITIAL_TASKS
    expect(screen.getByText(/checkout coupon/i)).toBeDefined();
  });

  test('can open add task modal', () => {
    render(<KanbanBoard tasks={[]} />);
    const addBtn = screen.getByText('+ CREATE NEW CUSTOMER TICKET (FEEDBACK)');
    fireEvent.click(addBtn);

    expect(screen.getByText('Initialize Inbound Feedback Ticket')).toBeDefined();
  });

  test('submitting a new task calls onAddTask', () => {
    const handleAddTask = vi.fn();
    render(<KanbanBoard tasks={[]} onAddTask={handleAddTask} />);
    
    const addBtn = screen.getByText('+ CREATE NEW CUSTOMER TICKET (FEEDBACK)');
    fireEvent.click(addBtn);

    const titleInput = screen.getByPlaceholderText('e.g. Broken links in billing tabs');
    const descInput = screen.getByPlaceholderText('Provide precise client-facing error feedback stack templates or request goals...');

    fireEvent.change(titleInput, { target: { value: 'New Integration' } });
    fireEvent.change(descInput, { target: { value: 'Integrate the new API' } });

    const submitBtn = screen.getByText('STAGE TICKET INTO SWARM QUEUE');
    fireEvent.click(submitBtn);

    expect(handleAddTask).toHaveBeenCalledWith('New Integration', 'Integrate the new API', 'customer');
  });
});
