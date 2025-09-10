"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

type TranslationObject = {
  [key: string]: string | TranslationObject;
  [key: number]: never; 
};

const translations: { [key in Language]: TranslationObject } = {
  en: {
    navigation: {
      title: "NECTR",
    },
    hero: {
      title: "Welcome to NECTR",
      subtitle:
        "Stake your NECTR tokens and earn rewards in a beautiful, modern DeFi platform. Experience the future of decentralized finance.",
    },
    dashboard: {
      balance: "NECTR Balance",
      staked: "Staked",
      pendingRewards: "Pending Rewards",
      stake: "Stake",
      unstake: "Unstake",
      claimRewards: "Claim Rewards",
      amount: "Amount",
      max: "MAX",
      refreshData: "Refresh Data",
    },
    wallet: {
      connect: "Connect Wallet",
      connected: "Connected",
      disconnect: "Disconnect",
    },
    language: {
      select: "Select Language",
      english: "English",
      hungarian: "Magyar",
      dutch: "Nederlands",
    },
  },
  hu: {
    navigation: {
      title: "NECTR",
    },
    hero: {
      title: "Üdvözöljük a NECTR-ben",
      subtitle:
        "Tételes NECTR tokeneket és szerezz jutalmakat egy gyönyörű, modern DeFi platformon. Tapasztald meg a decentralizált pénzügyek jövőjét.",
    },
    dashboard: {
      balance: "NECTR Egyenleg",
      staked: "Letétbe helyezett",
      pendingRewards: "Függő jutalmak",
      stake: "Letétbe helyezés",
      unstake: "Kivonás",
      claimRewards: "Jutalmak igénylése",
      amount: "Összeg",
      max: "MAX",
      refreshData: "Adatok frissítése",
    },
    wallet: {
      connect: "Pénztárca csatlakoztatása",
      connected: "Csatlakoztatva",
      disconnect: "Leválasztás",
    },
    language: {
      select: "Nyelv kiválasztása",
      english: "English",
      hungarian: "Magyar",
      dutch: "Nederlands",
    },
  },
  nl: {
    navigation: {
      title: "NECTR",
    },
    hero: {
      title: "Welkom bij NECTR",
      subtitle:
        "Stake je NECTR tokens en verdien beloningen op een prachtig, modern DeFi platform. Ervaar de toekomst van gedecentraliseerde financiën.",
    },
    dashboard: {
      balance: "NECTR Saldo",
      staked: "Gestaked",
      pendingRewards: "Wachtende beloningen",
      stake: "Staken",
      unstake: "Unstaken",
      claimRewards: "Beloningen claimen",
      amount: "Bedrag",
      max: "MAX",
      refreshData: "Gegevens vernieuwen",
    },
    wallet: {
      connect: "Wallet verbinden",
      connected: "Verbonden",
      disconnect: "Verbinding verbreken",
    },
    language: {
      select: "Selecteer taal",
      english: "English",
      hungarian: "Magyar",
      dutch: "Nederlands",
    },
  },
};

type Language = "en" | "hu" | "nl";
type TranslationKey = string;

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: TranslationKey) => string;
  languages: Array<{
    code: Language;
    name: string;
    flag: string;
  }>;
}

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined
);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>("hu");

  const languages = [
    { code: "en" as Language, name: "English", flag: "🇺🇸" },
    { code: "hu" as Language, name: "Magyar", flag: "🇭🇺" },
    { code: "nl" as Language, name: "Nederlands", flag: "🇳🇱" },
  ];

  // Load language from localStorage on mount
  useEffect(() => {
    const savedLanguage = localStorage.getItem("nectr-language") as Language;
    if (savedLanguage && ["en", "hu", "nl"].includes(savedLanguage)) {
      setLanguageState(savedLanguage);
    }
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem("nectr-language", lang);
    console.log("Language changed to:", lang);
  };

  const t = (key: TranslationKey): string => {
    const keys = key.split(".");
    let value: unknown = translations[language];

    for (const k of keys) {
      if (value && typeof value === "object" && k in value) {
        value = (value as TranslationObject)[k];
      } else {
        console.warn(
          `Translation missing for key: ${key} in language: ${language}`
        );
        return key; 
      }
    }

    return typeof value === "string" ? value : key;
  };

  const contextValue: LanguageContextType = {
    language,
    setLanguage,
    t,
    languages,
  };

  return (
    <LanguageContext.Provider value={contextValue}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
