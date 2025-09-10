import React from "react";
import { render, screen, fireEvent } from "../test-utils";
import Home from "@/app/page";

describe("Integration Tests", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("should change language and update content throughout the app", async () => {
    render(<Home />);

    // Initially in English
    expect(screen.getByText("Welcome to NECTR")).toBeInTheDocument();
    expect(screen.getByText("EN")).toBeInTheDocument();

    // Open language dropdown
    const languageButton = screen.getByRole("button");
    fireEvent.click(languageButton);

    // Click Hungarian
    const hungarianOption = screen.getByText("Magyar");
    fireEvent.click(hungarianOption);

    // Content should change to Hungarian
    expect(screen.getByText("Üdvözöljük a NECTR-ben")).toBeInTheDocument();
    expect(screen.getByText("HU")).toBeInTheDocument();
  });

  it("should persist language selection across component re-renders", () => {
    // Mock localStorage to return Hungarian
    localStorage.getItem = jest.fn().mockReturnValue("hu");

    render(<Home />);

    // Should start in Hungarian
    expect(screen.getByText("Üdvözöljük a NECTR-ben")).toBeInTheDocument();
    expect(screen.getByText("HU")).toBeInTheDocument();
  });

  it("should handle wallet connection state changes", () => {
    const mockUseAccount = jest.requireMock("wagmi").useAccount;

    // Start disconnected
    mockUseAccount.mockReturnValue({
      address: undefined,
      isConnected: false,
      isConnecting: false,
      isDisconnected: true,
    });

    const { rerender } = render(<Home />);

    // Should show connect wallet message
    expect(screen.getByText(/Connect your wallet/)).toBeInTheDocument();

    // Simulate connection
    mockUseAccount.mockReturnValue({
      address: "0x1234567890123456789012345678901234567890",
      isConnected: true,
      isConnecting: false,
      isDisconnected: false,
    });

    rerender(<Home />);

    // Should now show dashboard
    expect(screen.getByText("NECTR Balance")).toBeInTheDocument();
  });

  it("should display proper loading states", () => {
    const mockUseAccount = jest.requireMock("wagmi").useAccount;

    // Simulate connecting state
    mockUseAccount.mockReturnValue({
      address: undefined,
      isConnected: false,
      isConnecting: true,
      isDisconnected: false,
    });

    render(<Home />);

    // Should show appropriate loading state
    expect(screen.getByText(/Connecting/)).toBeInTheDocument();
  });
});
