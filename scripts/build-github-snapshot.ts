/**
 * Build-time GitHub snapshot generator.
 *
 * Fetches Alfara's public repos (+ a README excerpt for the top ones) and writes
 * content/github-snapshot.json. This runs at BUILD time, never on the request
 * path — so GitHub's 60 req/hr unauthenticated limit never affects a visitor.
 *
 * Run:  pnpm snapshot
 * Re-run when repos change; commit the resulting JSON.
 */

import { writeFileSync } from "node:fs";
import { join } from "node:path";

const USER = "Nafidinara";
const TOP_N_READMES = 8;
const README_MAX_CHARS = 600;

type GithubRepo = {
  name: string;
  description?: string | null;
  language?: string | null;
  stars?: number;
  topics?: string[];
  readmeExcerpt?: string;
};

async function fetchRepos(): Promise<GithubRepo[]> {
  const res = await fetch(
    `https://api.github.com/users/${USER}/repos?per_page=100&sort=pushed`,
    { headers: { Accept: "application/vnd.github+json" } },
  );
  if (!res.ok) throw new Error(`GitHub repos fetch failed: ${res.status}`);
  const raw = (await res.json()) as Array<{
    name: string;
    description: string | null;
    language: string | null;
    stargazers_count: number;
    topics?: string[];
    fork: boolean;
    archived: boolean;
  }>;

  return raw
    .filter((r) => !r.fork && !r.archived)
    .map((r) => ({
      name: r.name,
      description: r.description,
      language: r.language,
      stars: r.stargazers_count,
      topics: r.topics ?? [],
    }));
}

async function fetchReadmeExcerpt(name: string): Promise<string | undefined> {
  const res = await fetch(`https://api.github.com/repos/${USER}/${name}/readme`, {
    headers: { Accept: "application/vnd.github.raw+json" },
  });
  if (!res.ok) return undefined;
  const text = await res.text();
  return text.replace(/\s+/g, " ").trim().slice(0, README_MAX_CHARS);
}

async function main() {
  const repos = await fetchRepos();
  const top = [...repos].sort((a, b) => (b.stars ?? 0) - (a.stars ?? 0)).slice(0, TOP_N_READMES);

  for (const repo of top) {
    repo.readmeExcerpt = await fetchReadmeExcerpt(repo.name);
  }

  const out = join(process.cwd(), "content", "github-snapshot.json");
  writeFileSync(out, `${JSON.stringify(repos, null, 2)}\n`, "utf8");
  console.log(`Wrote ${repos.length} repos → ${out}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
