import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { LanguageProvider } from '@/context/LanguageContext';
import LanguageToggle from '@/components/LanguageToggle';

const renderWithProviders = (component: React.ReactElement) => {
  return render(
    <LanguageProvider>
      {component}
    </LanguageProvider>
  );
};

describe('LanguageToggle Component', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('should render the language toggle button with current language', () => {
    renderWithProviders(<LanguageToggle />);
    
    // Should show Hungarian flag and name (default)
    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent('🇭🇺');
    expect(button).toHaveTextContent('Magyar');
  });

  it('should open dropdown when clicked', async () => {
    const user = userEvent.setup();
    renderWithProviders(<LanguageToggle />);
    
    const button = screen.getByRole('button');
    await user.click(button);
    
    // Should show all language options
    expect(screen.getByText('English')).toBeInTheDocument();
    expect(screen.getByText('Magyar')).toBeInTheDocument();
    expect(screen.getByText('Nederlands')).toBeInTheDocument();
  });

  it('should change language when option is selected', async () => {
    const user = userEvent.setup();
    renderWithProviders(<LanguageToggle />);
    
    // Open dropdown
    const button = screen.getByRole('button');
    await user.click(button);
    
    // Click English option
    const englishOption = screen.getByText('English');
    await user.click(englishOption);
    
    // Should update the button to show English
    await waitFor(() => {
      expect(button).toHaveTextContent('🇺🇸');
      expect(button).toHaveTextContent('English');
    });
  });

  it('should close dropdown when clicking outside', async () => {
    const user = userEvent.setup();
    renderWithProviders(
      <div>
        <LanguageToggle />
        <div data-testid="outside-element">Outside</div>
      </div>
    );
    
    // Open dropdown
    const button = screen.getByRole('button');
    await user.click(button);
    
    expect(screen.getByText('English')).toBeInTheDocument();
    
    // Click outside
    const outsideElement = screen.getByTestId('outside-element');
    await user.click(outsideElement);
    
    // Dropdown should close
    await waitFor(() => {
      expect(screen.queryByText('English')).not.toBeInTheDocument();
    });
  });

  it('should persist language choice in localStorage', async () => {
    const user = userEvent.setup();
    const mockSetItem = jest.fn();
    
    Object.defineProperty(window, 'localStorage', {
      value: {
        ...localStorage,
        setItem: mockSetItem,
      },
      writable: true,
    });
    
    renderWithProviders(<LanguageToggle />);
    
    // Open dropdown and select Dutch
    const button = screen.getByRole('button');
    await user.click(button);
    
    const dutchOption = screen.getByText('Nederlands');
    await user.click(dutchOption);
    
    await waitFor(() => {
      expect(mockSetItem).toHaveBeenCalledWith('nectr-language', 'nl');
    });
  });

  it('should handle keyboard navigation', async () => {
    const user = userEvent.setup();
    renderWithProviders(<LanguageToggle />);
    
    const button = screen.getByRole('button');
    
    // Focus the button and press Enter to open
    button.focus();
    await user.keyboard('{Enter}');
    
    expect(screen.getByText('English')).toBeInTheDocument();
    
    // Use arrow keys to navigate and Enter to select
    await user.keyboard('{ArrowDown}');
    await user.keyboard('{Enter}');
    
    // Should have selected the next option
    await waitFor(() => {
      expect(button).toHaveTextContent('🇺🇸');
    });
  });
});
