import "@testing-library/jest-dom";
import { TextEncoder, TextDecoder } from "util";

// Polyfills for Node.js environment
global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;

// Mock localStorage
const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
};

Object.defineProperty(window, "localStorage", {
  value: localStorageMock,
});

// Reset localStorage mock before each test
beforeEach(() => {
  localStorageMock.getItem.mockClear();
  localStorageMock.setItem.mockClear();
  localStorageMock.removeItem.mockClear();
  localStorageMock.clear.mockClear();
});

// Mock Next.js router
jest.mock("next/navigation", () => ({
  useRouter() {
    return {
      push: jest.fn(),
      replace: jest.fn(),
      prefetch: jest.fn(),
      back: jest.fn(),
      forward: jest.fn(),
      refresh: jest.fn(),
    };
  },
  usePathname() {
    return "/";
  },
  useSearchParams() {
    return new URLSearchParams();
  },
}));

// Mock Wagmi hooks
jest.mock("wagmi", () => ({
  useAccount: () => ({
    address: "0x1234567890123456789012345678901234567890",
    isConnected: false,
    isConnecting: false,
    isDisconnected: true,
  }),
  useConnect: () => ({
    connect: jest.fn(),
    connectors: [],
    isLoading: false,
    pendingConnector: null,
  }),
  useDisconnect: () => ({
    disconnect: jest.fn(),
  }),
  useNetwork: () => ({
    chain: { id: 1, name: "Ethereum" },
  }),
  useSwitchNetwork: () => ({
    switchNetwork: jest.fn(),
  }),
}));

// Mock AppKit
jest.mock("@reown/appkit-adapter-wagmi", () => ({
  createAppKit: jest.fn(),
  WagmiAdapter: jest.fn(),
}));

// Mock NECTR hooks
jest.mock("@/hooks/useNECTR", () => ({
  useNectrBalance: () => ({ data: BigInt(1000000000000000000) }), // 1 NECTR
  useStakedBalance: () => ({ data: BigInt(500000000000000000) }), // 0.5 NECTR
  usePendingRewards: () => ({ data: BigInt(100000000000000000) }), // 0.1 NECTR
  useStakeTokens: () => ({
    stake: jest.fn(),
    isPending: false,
  }),
  useUnstakeTokens: () => ({
    unstake: jest.fn(),
    isPending: false,
  }),
  useClaimRewards: () => ({
    claimRewards: jest.fn(),
    isPending: false,
  }),
  formatTokenAmount: (amount) => (amount ? "1.0" : "0.0"),
}));


jest.mock("framer-motion", () => ({
  motion: {
    div: "div",
    span: "span",
    button: "button",
  },
  AnimatePresence: ({ children }) => children,
}));


global.localStorage = localStorageMock;


Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: jest.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(),
    removeListener: jest.fn(),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});
