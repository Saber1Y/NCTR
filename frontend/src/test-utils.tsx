import React from "react";
import { render, RenderOptions } from "@testing-library/react";
import { LanguageProvider } from "@/context/LanguageContext";

// Mock of ClientProviders to avoid complex provider setup in tests
const MockProviders = ({ children }: { children: React.ReactNode }) => {
  return <LanguageProvider>{children}</LanguageProvider>;
};

const customRender = (
  ui: React.ReactElement,
  options?: Omit<RenderOptions, "wrapper">
) => render(ui, { wrapper: MockProviders, ...options });

export * from "@testing-library/react";
export { customRender as render };
