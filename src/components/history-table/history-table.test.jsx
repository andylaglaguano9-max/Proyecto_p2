import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import HistoryTable from './history-table';

describe('HistoryTable Component', () => {
  it('renders empty message when history is empty', () => {
    render(<HistoryTable history={[]} />);
    expect(screen.getByText(/No hay cálculos registrados aún./i)).toBeInTheDocument();
  });

  it('renders table rows based on history data', () => {
    const mockHistory = [
      { id: '1', date: new Date().toISOString(), kwh: 100, gallons: 5, total_emissions: 89.4, trees_needed: 5 }
    ];
    render(<HistoryTable history={mockHistory} />);
    
    expect(screen.getByText('100')).toBeInTheDocument();
    expect(screen.getAllByText('5')[0]).toBeInTheDocument();
    expect(screen.getByText('89.4')).toBeInTheDocument();
  });
});
