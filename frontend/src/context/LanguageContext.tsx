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
    features: {
      title: "Why Choose NECTR?",
      highRewards: {
        title: "High Rewards",
        description:
          "Earn up to 5% APY on your staked NECTR tokens with our optimized reward system.",
      },
      secure: {
        title: "Secure & Audited",
        description:
          "Built with OpenZeppelin contracts and comprehensive testing for maximum security.",
      },
      flexible: {
        title: "Flexible Staking",
        description:
          "Stake and unstake anytime with no lock-up periods. Your tokens, your choice.",
      },
    },
    faucet: {
      title: "Test Token Faucet",
      description: "Get 10,000 NECTR tokens for testing.",
      button: "Get 10,000 NECTR",
      requesting: "Requesting...",
      confirming: "Confirming...",
      processing: "Processing...",
      success: "Tokens sent successfully! Check your balance.",
      error: "Error",
      instructions: {
        connect: "• Connect your wallet first",
        network: "• Switch to Polygon Amoy testnet",
        gas: "• Make sure you have MATIC/POL for gas",
      },
    },
    news: {
      title: "Crypto News",
      loading: "Loading News...",
      filter: {
        all: "All News",
        defi: "DeFi",
        blockchain: "Blockchain",
      },
      updated: "News updates every 15 minutes",
    },
    social: {
      title: "Community & Updates",
      join: "Join Our Community",
      twitter: {
        title: "Follow on Twitter",
        description: "Latest updates & announcements",
      },
      telegram: {
        title: "Join Telegram",
        description: "Chat with the community",
      },
      discord: {
        title: "Join Discord",
        description: "Voice & text discussions",
      },
      loading: "Loading tweets...",
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
    features: {
      title: "Miért válaszd a NECTR-t?",
      highRewards: {
        title: "Magas jutalmak",
        description:
          "Szerezz akár 5% éves hozamot a letétbe helyezett NECTR tokenekre optimalizált jutalomrendszerünkkel.",
      },
      secure: {
        title: "Biztonságos és auditált",
        description:
          "OpenZeppelin szerződésekkel és átfogó teszteléssel készült a maximális biztonság érdekében.",
      },
      flexible: {
        title: "Rugalmas letétkezelés",
        description:
          "Letétbe helyezheted és kivonhatod bármikor, zárolási időszak nélkül. A tokenek a tieid.",
      },
    },
    faucet: {
      title: "Teszt Token Csap",
      description: "Szerezz 10,000 NECTR tokent teszteléshez.",
      button: "10,000 NECTR megszerzése",
      requesting: "Kérés...",
      confirming: "Megerősítés...",
      processing: "Feldolgozás...",
      success: "Tokenek sikeresen elküldve! Ellenőrizd az egyenleged.",
      error: "Hiba",
      instructions: {
        connect: "• Először csatlakoztasd a pénztárcád",
        network: "• Váltás Polygon Amoy tesztnetworkre",
        gas: "• Győződj meg róla, hogy van MATIC/POL a gázdíjhoz",
      },
    },
    news: {
      title: "Kripto hírek",
      loading: "Hírek betöltése...",
      filter: {
        all: "Összes hír",
        defi: "DeFi",
        blockchain: "Blockchain",
      },
      updated: "Hírek frissítése 15 percenként",
    },
    social: {
      title: "Közösség és frissítések",
      join: "Csatlakozz közösségünkhöz",
      twitter: {
        title: "Kövesd Twitteren",
        description: "Legfrissebb hírek és bejelentések",
      },
      telegram: {
        title: "Csatlakozz Telegramhoz",
        description: "Beszélgetés a közösséggel",
      },
      discord: {
        title: "Csatlakozz Discordhoz",
        description: "Hang- és szöveges beszélgetések",
      },
      loading: "Tweetek betöltése...",
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
    features: {
      title: "Waarom NECTR kiezen?",
      highRewards: {
        title: "Hoge beloningen",
        description:
          "Verdien tot 5% APY op je gestakede NECTR tokens met ons geoptimaliseerde beloningssysteem.",
      },
      secure: {
        title: "Veilig & geauditeerd",
        description:
          "Gebouwd met OpenZeppelin contracten en uitgebreide tests voor maximale veiligheid.",
      },
      flexible: {
        title: "Flexibel staken",
        description:
          "Stake en unstake op elk moment zonder lock-up periodes. Jouw tokens, jouw keuze.",
      },
    },
    faucet: {
      title: "Test Token Kraan",
      description: "Krijg 10,000 NECTR tokens voor testen.",
      button: "Krijg 10,000 NECTR",
      requesting: "Aanvragen...",
      confirming: "Bevestigen...",
      processing: "Verwerken...",
      success: "Tokens succesvol verzonden! Controleer je saldo.",
      error: "Fout",
      instructions: {
        connect: "• Verbind eerst je wallet",
        network: "• Schakel over naar Polygon Amoy testnet",
        gas: "• Zorg dat je MATIC/POL hebt voor gas",
      },
    },
    news: {
      title: "Crypto nieuws",
      loading: "Nieuws laden...",
      filter: {
        all: "Alle nieuws",
        defi: "DeFi",
        blockchain: "Blockchain",
      },
      updated: "Nieuws updates om de 15 minuten",
    },
    social: {
      title: "Gemeenschap & updates",
      join: "Doe mee met onze gemeenschap",
      twitter: {
        title: "Volg op Twitter",
        description: "Laatste updates & aankondigingen",
      },
      telegram: {
        title: "Join Telegram",
        description: "Chat met de gemeenschap",
      },
      discord: {
        title: "Join Discord",
        description: "Spraak & tekst discussies",
      },
      loading: "Tweets laden...",
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
