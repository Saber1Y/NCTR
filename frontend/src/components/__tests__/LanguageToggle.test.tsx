import React from "react";
import { render, screen, fireEvent } from "../test-utils";
import userEvent from "@testing-library/user-event";
import LanguageToggle from "@/components/LanguageToggle";

describe("LanguageToggle", () => {
  it("should render the language toggle button", () => {
    render(<LanguageToggle />);

    expect(screen.getByRole("button")).toBeInTheDocument();
    expect(screen.getByText("EN")).toBeInTheDocument();
  });

  it("should open dropdown when clicked", async () => {
    const user = userEvent.setup();
    render(<LanguageToggle />);

    const button = screen.getByRole("button");
    await user.click(button);

    expect(screen.getByText("English")).toBeInTheDocument();
    expect(screen.getByText("Magyar")).toBeInTheDocument();
    expect(screen.getByText("Nederlands")).toBeInTheDocument();
  });

  it("should change language when option is selected", async () => {
    const user = userEvent.setup();
    render(<LanguageToggle />);

    // Open dropdown
    const button = screen.getByRole("button");
    await user.click(button);

    // Click Hungarian option
    const hungarianOption = screen.getByText("Magyar");
    await user.click(hungarianOption);

    // Check that button text changed to HU
    expect(screen.getByText("HU")).toBeInTheDocument();
  });

  it("should close dropdown when clicking outside", async () => {
    const user = userEvent.setup();
    render(
      <div>
        <LanguageToggle />
        <div data-testid="outside">Outside element</div>
      </div>
    );

    // Open dropdown
    const button = screen.getByRole("button");
    await user.click(button);

    expect(screen.getByText("English")).toBeInTheDocument();

    // Click outside
    const outsideElement = screen.getByTestId("outside");
    await user.click(outsideElement);

    // Dropdown should be closed (English option should not be visible)
    expect(screen.queryByText("English")).not.toBeInTheDocument();
  });

  it("should display correct flag and code for each language", async () => {
    const user = userEvent.setup();
    render(<LanguageToggle />);

    const button = screen.getByRole("button");
    await user.click(button);

    // Check all language options are present with correct flags
    expect(screen.getByText("🇺🇸")).toBeInTheDocument();
    expect(screen.getByText("🇭🇺")).toBeInTheDocument();
    expect(screen.getByText("🇳🇱")).toBeInTheDocument();
  });
});
