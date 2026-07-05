import { describe, expect, it } from "vitest";

import { assembleContext } from "./chat-context";

describe("assembleContext", () => {
  it("includes every provided source under a labeled section", () => {
    const out = assembleContext({
      resume: "Alfara Nafi Dinara, full-stack developer.",
      profile: "Open to freelance projects.",
      github: [{ name: "creditopia", language: "Rust", description: "P2P lending on ICP" }],
    });

    expect(out).toContain("RESUME (resume.md)");
    expect(out).toContain("full-stack developer");
    expect(out).toContain("PROFILE (profile.md — canonical facts)");
    expect(out).toContain("Open to freelance");
    expect(out).toContain("GITHUB (public repos, cached snapshot)");
    expect(out).toContain("creditopia");
    expect(out).toContain("P2P lending on ICP");
  });

  it("degrades gracefully when the github snapshot is missing", () => {
    const out = assembleContext({
      resume: "resume text",
      profile: "profile text",
      github: null,
    });

    expect(out).toContain("resume text");
    expect(out).toContain("profile text");
    expect(out).not.toContain("GITHUB");
  });

  it("returns an empty string when no source is present", () => {
    expect(assembleContext({ resume: null, profile: null, github: null })).toBe("");
  });

  it("formats repo metadata (language, topics, stars) compactly", () => {
    const out = assembleContext({
      resume: null,
      profile: null,
      github: [{ name: "votergate", language: "Solidity", topics: ["blockchain"], stars: 12 }],
    });

    expect(out).toContain("votergate");
    expect(out).toContain("Solidity");
    expect(out).toContain("blockchain");
    expect(out).toContain("12★");
  });
});
