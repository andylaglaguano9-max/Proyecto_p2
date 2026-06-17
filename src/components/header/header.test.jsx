import { render, screen } from '@testing-library/react';
import { BrowserRouter, MemoryRouter } from 'react-router-dom';
import { describe, it, expect, vi } from 'vitest';
import Header from './header';

describe('Header Component', () => {
  it('renders the header title via props', () => {
    render(
      <BrowserRouter>
        <Header title="EcoTest" />
      </BrowserRouter>
    );
    expect(screen.getByText(/EcoTest/i)).toBeInTheDocument();
  });

  it('renders navigation links depending on auth state', () => {
    const { rerender } = render(
      <MemoryRouter>
        <Header title="EcoMetrics" />
      </MemoryRouter>
    );
    expect(screen.getByText(/Inicio/i)).toBeInTheDocument();
    expect(screen.queryByText(/Calculadora/i)).not.toBeInTheDocument();
    expect(screen.getByText(/Iniciar Sesión/i)).toBeInTheDocument();

    // With user
    rerender(
      <MemoryRouter>
        <Header title="EcoMetrics" user={{ username: 'testuser' }} setAuth={vi.fn()} />
      </MemoryRouter>
    );
    expect(screen.getByText(/Calculadora/i)).toBeInTheDocument();
    expect(screen.getByText(/Hola, testuser/i)).toBeInTheDocument();
  });
});
