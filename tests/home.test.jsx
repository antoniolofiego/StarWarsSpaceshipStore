import { render, screen } from '@testing-library/react';
import Home from '../pages';

describe('The home component', () => {
  it('renders the title', () => {
    render(<Home />);
    expect(screen.getByText('Star Wars Starship Store')).toBeInTheDocument();
  });

  it('renders a loading indicator when opened', () => {
    render(<Home />);
    expect(screen.getByText('Loading')).toBeInTheDocument();
  });

  it('renders ships', async () => {
    const { findByText } = render(<Home />);
    await new Promise(process.nextTick);

    const ship = await findByText('CR90 corvette');
    expect(ship).toBeInTheDocument();
  });
});
