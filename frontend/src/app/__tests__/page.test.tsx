import React from "react";
import { render, screen } from "../test-utils";
import Home from "@/app/page";

// Mock the NECTR hooks
jest.mock("@/hooks/useNECTR", () => ({
  useNectrBalance: () => ({ data: BigInt(1000000000000000000) }), // 1 NECTR
  useStakedBalance: () => ({ data: BigInt(500000000000000000) }), // 0.5 NECTR
  usePendingRewards: () => ({ data: BigInt(100000000000000000) }), // 0.1 NECTR
  useStakeTokens: () => ({ stake: jest.fn(), isPending: false }),
  useUnstakeTokens: () => ({ unstake: jest.fn(), isPending: false }),
  useClaimRewards: () => ({ claimRewards: jest.fn(), isPending: false }),
  formatTokenAmount: (amount) => (amount ? "1.00" : "0.00"),
}));

describe("Home Page", () => {
  it("should render the main hero section", () => {
    render(<Home />);

    expect(screen.getByText("Welcome to NECTR")).toBeInTheDocument();
    expect(screen.getByText(/Stake your NECTR tokens/)).toBeInTheDocument();
  });

  it("should render language toggle component", () => {
    render(<Home />);

    expect(screen.getByRole("button")).toBeInTheDocument();
  });

  it("should render wallet connection section", () => {
    render(<Home />);

    // Should show connect wallet section when not connected
    expect(screen.getByText(/Connect your wallet/)).toBeInTheDocument();
  });

  it("should render staking dashboard when wallet is connected", () => {
    // Mock connected state
    const mockUseAccount = jest.requireMock("wagmi").useAccount;
    mockUseAccount.mockReturnValue({
      address: "0x1234567890123456789012345678901234567890",
      isConnected: true,
      isConnecting: false,
      isDisconnected: false,
    });

    render(<Home />);

    expect(screen.getByText("NECTR Balance")).toBeInTheDocument();
    expect(screen.getByText("Staked")).toBeInTheDocument();
    expect(screen.getByText("Pending Rewards")).toBeInTheDocument();
  });

  it("should render social media and news feeds", () => {
    render(<Home />);

    // These components should be rendered
    expect(screen.getByText(/Latest News/)).toBeInTheDocument();
    expect(screen.getByText(/Social Media/)).toBeInTheDocument();
  });

  it("should render test token faucet", () => {
    render(<Home />);

    expect(screen.getByText(/Test Token Faucet/)).toBeInTheDocument();
  });

  it("should have proper responsive layout classes", () => {
    const { container } = render(<Home />);

    // Check that main container has proper classes
    const mainContainer = container.querySelector(".min-h-screen");
    expect(mainContainer).toBeInTheDocument();
  });
});
