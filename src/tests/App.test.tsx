import { render, screen, fireEvent, act } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import App from '../App';

describe('App', () => {
  it('renders the LandingPage by default', () => {
    render(<App />);
    expect(screen.getByText('Zero-Downtime Autonomous SRE')).toBeInTheDocument();
  });

  it('can open the dashboard, use the command palette, switch to map discovery', async () => {
    render(<App />);
    
    // Enter dashboard
    const launchBtn = screen.getByText('ORCHESTRATOR DEMO');
    await act(async () => {
      fireEvent.click(launchBtn);
    });
    
    // Switch to net-discovery
    const discoveryBtn = screen.getByText('net-discovery');
    await act(async () => {
      fireEvent.click(discoveryBtn);
    });
    
    expect(screen.getByText('System Discovery & Topology')).toBeInTheDocument();
    
    // Click scan button
    const scanBtn = screen.getByText('DISCOVER RESOURCES');
    await act(async () => {
      fireEvent.click(scanBtn);
    });
    
    expect(screen.getByText('SCANNING NETWORK...')).toBeInTheDocument();
  });
});
