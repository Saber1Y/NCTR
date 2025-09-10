import "@testing-library/jest-dom";
import { TextEncoder, TextDecoder } from "util";

// Polyfills for Node.js environment
Object.assign(global, { TextDecoder, TextEncoder });

// Mock localStorage
const createLocalStorageMock = () => {
  let store: Record<string, string> = {};

  return {
    getItem: jest.fn((key: string) => store[key] || null),
    setItem: jest.fn((key: string, value: string) => {
      store[key] = value.toString();
    }),
    removeItem: jest.fn((key: string) => {
      delete store[key];
    }),
    clear: jest.fn(() => {
      store = {};
    }),
    get length() {
      return Object.keys(store).length;
    },
    key: jest.fn((index: number) => {
      const keys = Object.keys(store);
      return keys[index] || null;
    }),
  };
};

const localStorageMock = createLocalStorageMock();

Object.defineProperty(window, "localStorage", {
  value: localStorageMock,
  writable: true,
});

Object.defineProperty(global, "localStorage", {
  value: localStorageMock,
  writable: true,
});

// Reset localStorage before each test
beforeEach(() => {
  localStorageMock.clear();
  jest.clearAllMocks();
});

// Mock Next.js router
jest.mock("next/navigation", () => ({
  useRouter: () => ({
    push: jest.fn(),
    replace: jest.fn(),
    back: jest.fn(),
    forward: jest.fn(),
    refresh: jest.fn(),
    prefetch: jest.fn(),
  }),
  usePathname: () => "/",
  useSearchParams: () => new URLSearchParams(),
}));

// Mock Wagmi hooks
jest.mock("wagmi", () => ({
  useAccount: () => ({
    address: "0x1234567890123456789012345678901234567890" as `0x${string}`,
    isConnected: false,
    isConnecting: false,
    isDisconnected: true,
    isReconnecting: false,
    status: "disconnected" as const,
  }),
  useConnect: () => ({
    connect: jest.fn(),
    connectors: [],
    isLoading: false,
    isPending: false,
    isSuccess: false,
    isError: false,
    error: null,
  }),
  useDisconnect: () => ({
    disconnect: jest.fn(),
    isPending: false,
  }),
  useChainId: () => 1,
  useConfig: () => ({}),
  useReadContract: () => ({
    data: undefined,
    isError: false,
    isLoading: false,
    isSuccess: false,
    error: null,
  }),
  useWriteContract: () => ({
    writeContract: jest.fn(),
    data: undefined,
    isPending: false,
    isSuccess: false,
    isError: false,
    error: null,
  }),
  useWaitForTransactionReceipt: () => ({
    isLoading: false,
    isSuccess: false,
    isError: false,
    data: undefined,
  }),
}));

// Mock AppKit
jest.mock("@reown/appkit/react", () => ({
  useAppKit: () => ({
    open: jest.fn(),
    close: jest.fn(),
  }),
  useAppKitAccount: () => ({
    address: undefined,
    isConnected: false,
    caipAddress: undefined,
    status: "disconnected",
  }),
  useAppKitNetwork: () => ({
    chainId: 1,
    caipNetworkId: "eip155:1",
  }),
}));

// Mock NECTR hooks
jest.mock("@/hooks/useNECTR", () => ({
  useNectrBalance: () => ({
    data: BigInt("1000000000000000000"), // 1 NECTR
    isLoading: false,
    isError: false,
    error: null,
  }),
  useStakedBalance: () => ({
    data: BigInt("500000000000000000"), // 0.5 NECTR
    isLoading: false,
    isError: false,
    error: null,
  }),
  usePendingRewards: () => ({
    data: BigInt("100000000000000000"), // 0.1 NECTR
    isLoading: false,
    isError: false,
    error: null,
  }),
  useStakeTokens: () => ({
    stake: jest.fn(),
    isPending: false,
    isSuccess: false,
    isError: false,
    error: null,
  }),
  useUnstakeTokens: () => ({
    unstake: jest.fn(),
    isPending: false,
    isSuccess: false,
    isError: false,
    error: null,
  }),
  useClaimRewards: () => ({
    claimRewards: jest.fn(),
    isPending: false,
    isSuccess: false,
    isError: false,
    error: null,
  }),
  formatTokenAmount: (amount?: bigint) => {
    if (!amount) return "0.00";
    return (Number(amount) / 1e18).toFixed(2);
  },
}));

// Mock framer-motion
jest.mock("framer-motion", () => ({
  motion: {
    div: "div",
    span: "span",
    h1: "h1",
    h2: "h2",
    p: "p",
    button: "button",
  },
  AnimatePresence: ({ children }: { children: React.ReactNode }) => children,
}));

// Mock Meteors component
jest.mock("@/components/ui/meteors", () => ({
  Meteors: () => null,
}));

// Suppress console warnings in tests
const originalConsoleWarn = console.warn;
const originalConsoleError = console.error;

beforeAll(() => {
  console.warn = (...args: unknown[]) => {
    if (
      typeof args[0] === "string" &&
      args[0].includes("Translation missing")
    ) {
      return;
    }
    originalConsoleWarn(...args);
  };

  console.error = (...args: unknown[]) => {
    if (
      typeof args[0] === "string" &&
      (args[0].includes("Warning: ReactDOM.render is deprecated") ||
        args[0].includes("Warning: React.createElement"))
    ) {
      return;
    }
    originalConsoleError(...args);
  };
});

afterAll(() => {
  console.warn = originalConsoleWarn;
  console.error = originalConsoleError;
});
