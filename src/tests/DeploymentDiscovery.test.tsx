import { render, screen, fireEvent } from '@testing-library/react';
import { expect, test, describe, vi } from 'vitest';
import { DeploymentDiscovery } from '../components/DeploymentDiscovery';

describe('DeploymentDiscovery', () => {
  test('renders the discovery dashboard and nodes', () => {
    render(<DeploymentDiscovery />);
    expect(screen.getAllByText('Global Edge Anycast')).toBeDefined();
    expect(screen.getAllByText('Frontend Edge (EU-West)')).toBeDefined();
  });

  test('can filter by provider', () => {
    render(<DeploymentDiscovery />);
    const awsFilters = screen.getAllByText('AWS');
    // Assuming the first one is the filter button
    fireEvent.click(awsFilters[0]);
    // After clicking AWS, we should still see the AWS node
    expect(screen.getAllByText('Frontend Edge (EU-West)')).toBeDefined();
  });

  test('can select a node and view details', () => {
    render(<DeploymentDiscovery />);
    const nodes = screen.getAllByText('Frontend Edge (EU-West)');
    fireEvent.click(nodes[0]);
    
    // Should display details about the node in the right panel
    expect(screen.getByText('10.0.1.14')).toBeDefined();
  });

  test('can trigger rollback', () => {
    const handleRollback = vi.fn();
    render(<DeploymentDiscovery onTriggerRollback={handleRollback} />);
    
    const nodes = screen.getAllByText('Frontend Edge (EU-West)');
    fireEvent.click(nodes[0]);

    const rollbackBtn = screen.getByText(/Trigger Service Rollback/i);
    fireEvent.click(rollbackBtn);

    expect(handleRollback).toHaveBeenCalledTimes(1);
    expect(handleRollback).toHaveBeenCalledWith('web-eu-1', 'Frontend Edge (EU-West)');
  });
});
