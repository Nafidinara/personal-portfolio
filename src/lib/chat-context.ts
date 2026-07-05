import { readFileSync } from "node:fs";
import { join } from "node:path";

/**
 * Grounding-context assembly for the Ask Alfara chat.
 *
 * M1 stuffs the whole corpus into the system prompt (no retrieval — the corpus
 * fits a context window). Sources:
 *   - resume.md                     (repo root)
 *   - content/profile.md            (canonical facts Alfara writes)
 *   - content/github-snapshot.json  (cached at build time, not fetched per request)
 *
 * The pure `assembleContext` is unit-tested without touching the filesystem;
 * `getChatContext` reads + caches at cold start.
 */

export type GithubRepo = {
  name: string;
  description?: string | null;
  language?: string | null;
  stars?: number;
  topics?: string[];
  readmeExcerpt?: string;
};

export type ContextSources = {
  resume: string | null;
  profile: string | null;
  github: GithubRepo[] | null;
};

function section(title: string, body: string): string {
  return `### ${title}\n${body.trim()}`;
}

function formatGithub(repos: GithubRepo[]): string {
  return repos
    .map((r) => {
      const meta = [r.language, r.topics?.join(", "), r.stars ? `${r.stars}★` : null]
        .filter(Boolean)
        .join(" · ");
      const lines = [`- ${r.name}${meta ? ` (${meta})` : ""}`];
      if (r.description) lines.push(`  ${r.description}`);
      if (r.readmeExcerpt) lines.push(`  ${r.readmeExcerpt.trim()}`);
      return lines.join("\n");
    })
    .join("\n");
}

/** Pure assembly — no I/O. Returns "" only if every source is empty. */
export function assembleContext(sources: ContextSources): string {
  const parts: string[] = [];
  if (sources.resume) parts.push(section("RESUME (resume.md)", sources.resume));
  if (sources.profile) parts.push(section("PROFILE (profile.md — canonical facts)", sources.profile));
  if (sources.github && sources.github.length > 0) {
    parts.push(section("GITHUB (public repos, cached snapshot)", formatGithub(sources.github)));
  }
  return parts.join("\n\n");
}

function readOptional(path: string): string | null {
  try {
    return readFileSync(path, "utf8");
  } catch {
    return null;
  }
}

let cache: string | null = null;

export function getChatContext(): string {
  if (cache !== null) return cache;

  const root = process.cwd();
  const resume = readOptional(join(root, "resume.md"));
  const profile = readOptional(join(root, "content", "profile.md"));
  const snapshotRaw = readOptional(join(root, "content", "github-snapshot.json"));

  let github: GithubRepo[] | null = null;
  if (snapshotRaw) {
    try {
      github = JSON.parse(snapshotRaw) as GithubRepo[];
    } catch {
      console.warn("[chat-context] github-snapshot.json is not valid JSON — skipping");
    }
  }

  if (!profile) {
    // Degrade at runtime rather than 500. profile.md is the canonical source;
    // its absence should be caught in CI/build, not by a visitor.
    console.warn("[chat-context] content/profile.md missing — grounding is incomplete");
  }

  cache = assembleContext({ resume, profile, github });
  return cache;
}

/** Test hook: clear the memoized context. */
export function resetChatContextCache() {
  cache = null;
}
