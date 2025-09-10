"use client";

import { LanguageProvider } from "@/context/LanguageContext";
import ContextProvider from "@/context";
import { ReactNode } from "react";

export function ClientProviders({ children }: { children: ReactNode }) {
  return (
    <LanguageProvider>
      <ContextProvider cookies={null}>{children}</ContextProvider>
    </LanguageProvider>
  );
}
