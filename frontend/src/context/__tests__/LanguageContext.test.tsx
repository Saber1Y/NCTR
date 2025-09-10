import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { LanguageProvider, useLanguage } from "@/context/LanguageContext";

// Test component to use the language context
const TestComponent = () => {
  const { language, setLanguage, t } = useLanguage();

  return (
    <div>
      <div data-testid="current-language">{language}</div>
      <div data-testid="translation">{t("hero.title")}</div>
      <button onClick={() => setLanguage("hu")} data-testid="change-to-hu">
        Change to Hungarian
      </button>
      <button onClick={() => setLanguage("nl")} data-testid="change-to-nl">
        Change to Dutch
      </button>
      <button onClick={() => setLanguage("en")} data-testid="change-to-en">
        Change to English
      </button>
    </div>
  );
};

describe("LanguageContext", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("should render with default language (English)", () => {
    render(
      <LanguageProvider>
        <TestComponent />
      </LanguageProvider>
    );

    expect(screen.getByTestId("current-language")).toHaveTextContent("en");
    expect(screen.getByTestId("translation")).toHaveTextContent(
      "Welcome to NECTR"
    );
  });

  it("should change language to Hungarian", () => {
    render(
      <LanguageProvider>
        <TestComponent />
      </LanguageProvider>
    );

    fireEvent.click(screen.getByTestId("change-to-hu"));

    expect(screen.getByTestId("current-language")).toHaveTextContent("hu");
    expect(screen.getByTestId("translation")).toHaveTextContent(
      "Üdvözöljük a NECTR-ben"
    );
  });

  it("should change language to Dutch", () => {
    render(
      <LanguageProvider>
        <TestComponent />
      </LanguageProvider>
    );

    fireEvent.click(screen.getByTestId("change-to-nl"));

    expect(screen.getByTestId("current-language")).toHaveTextContent("nl");
    expect(screen.getByTestId("translation")).toHaveTextContent(
      "Welkom bij NECTR"
    );
  });

  it("should persist language selection in localStorage", () => {
    render(
      <LanguageProvider>
        <TestComponent />
      </LanguageProvider>
    );

    fireEvent.click(screen.getByTestId("change-to-hu"));

    expect(localStorage.setItem).toHaveBeenCalledWith("nectr-language", "hu");
  });

  it("should load language from localStorage on mount", () => {
    localStorage.getItem = jest.fn().mockReturnValue("nl");

    render(
      <LanguageProvider>
        <TestComponent />
      </LanguageProvider>
    );

    expect(screen.getByTestId("current-language")).toHaveTextContent("nl");
  });

  it("should return key if translation is missing", () => {
    const TestComponentWithMissingKey = () => {
      const { t } = useLanguage();
      return <div data-testid="missing-translation">{t("missing.key")}</div>;
    };

    render(
      <LanguageProvider>
        <TestComponentWithMissingKey />
      </LanguageProvider>
    );

    expect(screen.getByTestId("missing-translation")).toHaveTextContent(
      "missing.key"
    );
  });
});
