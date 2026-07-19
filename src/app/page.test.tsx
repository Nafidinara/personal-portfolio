import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import Home from "./page";

describe("portfolio homepage", () => {
  it("renders the Figma portfolio hero and main sections", () => {
    render(<Home />);

    expect(screen.getByRole("img", { name: /Alfara profile portrait/i })).toBeInTheDocument();
    expect(screen.getByRole("img", { name: /ShopeeLaku project preview/i })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /Alfara Nafi Dinara/i })).toBeInTheDocument();
    expect(screen.getByRole("navigation", { name: /Primary/i })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /ShopeeLaku/i })).toBeInTheDocument();
    // Exact match: a blog card title also contains "Creditopia", so match the project heading only.
    expect(screen.getByRole("heading", { name: "Creditopia" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /Redooceit/i })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /Experiences/i })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /Achievements/i })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /Blog/i })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /Have a project in mind\?/i })).toBeInTheDocument();
    expect(document.body.innerHTML).not.toContain("work-copy-node-379-12366-full-frame.png");
  });

  it("updates the active floating navigation item when clicked", () => {
    render(<Home />);

    const homeLink = screen.getByRole("link", { name: "Home" });
    const contactLink = screen.getByRole("link", { name: "Contact" });

    expect(homeLink).toHaveAttribute("aria-current", "page");

    fireEvent.click(contactLink);

    expect(contactLink).toHaveAttribute("aria-current", "page");
    expect(homeLink).not.toHaveAttribute("aria-current");
  });

  it("opens the Ask Alfara sidebar when a suggestion chip is clicked", async () => {
    const { container } = render(<Home />);

    fireEvent.click(screen.getByRole("button", { name: "Who is Alfara?" }));

    await waitFor(() => {
      expect(container.querySelector('[aria-label="Ask Alfara chat"]')).not.toBeNull();
    });
  });

  it("renders layered patterned hero background details", () => {
    const { container } = render(<Home />);

    expect(container.querySelector(".hero-pattern-field")).toBeInTheDocument();
    expect(container.querySelector(".hero-depth-lines")).toBeInTheDocument();
    expect(container.querySelector(".hero-glow-rings")).toBeInTheDocument();
  });

  it("renders the header avatar without an added circular border", () => {
    render(<Home />);

    const avatar = screen.getByRole("img", { name: /Alfara profile portrait/i });

    expect(avatar).toHaveAttribute("src", expect.stringContaining("avatar%2Fprofile.png"));
    expect(avatar.className).not.toContain("rounded-full");
    expect(avatar.className).not.toContain("border");
  });

  it("reveals interactive role chips and hover avatar on hero avatar hover", async () => {
    render(<Home />);

    fireEvent.mouseOver(screen.getByRole("button", { name: /Alfara profile portrait/i }));

    await waitFor(() => {
      expect(screen.getAllByRole("img", { name: /Alfara profile portrait/i })).toEqual(
        expect.arrayContaining([expect.objectContaining({ src: expect.stringContaining("avatar%2Fprofile-hover.png") })]),
      );
    });
    expect(screen.getAllByRole("button", { name: /Software Engineer/i }).length).toBeGreaterThan(0);
    expect(screen.getAllByRole("button", { name: /AI Automation Builder/i }).length).toBeGreaterThan(0);
    expect(screen.getAllByRole("button", { name: /Blockchain Engineer/i }).length).toBeGreaterThan(0);
    expect(screen.getAllByRole("button", { name: /Startup Life/i }).length).toBeGreaterThan(0);
    expect(document.body.innerHTML).not.toContain("public/reference/");
  });
});
