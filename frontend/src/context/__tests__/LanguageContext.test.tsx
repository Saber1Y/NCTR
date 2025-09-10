import { render, screen, fireEvent } from '@testing-library/react';
import { LanguageProvider, useLanguage } from '../LanguageContext';

// Test component that uses the language context
function TestComponent() {
  const { language, setLanguage, t } = useLanguage();
  
  return (
    <div>
      <span data-testid="current-language">{language}</span>
      <span data-testid="hero-title">{t('hero.title')}</span>
      <button onClick={() => setLanguage('en')} data-testid="set-en">
        English
      </button>
      <button onClick={() => setLanguage('hu')} data-testid="set-hu">
        Hungarian
      </button>
      <button onClick={() => setLanguage('nl')} data-testid="set-nl">
        Dutch
      </button>
    </div>
  );
}

describe('LanguageContext', () => {
  const renderWithProvider = () => {
    return render(
      <LanguageProvider>
        <TestComponent />
      </LanguageProvider>
    );
  };

  test('should start with Hungarian as default language', () => {
    renderWithProvider();
    
    expect(screen.getByTestId('current-language')).toHaveTextContent('hu');
    expect(screen.getByTestId('hero-title')).toHaveTextContent('Üdvözöljük a NECTR-ben');
  });

  test('should change language when setLanguage is called', () => {
    renderWithProvider();
    
    // Change to English
    fireEvent.click(screen.getByTestId('set-en'));
    
    expect(screen.getByTestId('current-language')).toHaveTextContent('en');
    expect(screen.getByTestId('hero-title')).toHaveTextContent('Welcome to NECTR');
  });

  test('should change to Dutch correctly', () => {
    renderWithProvider();
    
    // Change to Dutch
    fireEvent.click(screen.getByTestId('set-nl'));
    
    expect(screen.getByTestId('current-language')).toHaveTextContent('nl');
    expect(screen.getByTestId('hero-title')).toHaveTextContent('Welkom bij NECTR');
  });
});
