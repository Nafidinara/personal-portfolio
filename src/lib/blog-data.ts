// Blog content lives here as structured data so the /blogs list and article
// pages stay in sync and render with the same typography system as the homepage.
// Everything below is grounded in content/profile.md and resume.md — real work,
// real numbers. Do not invent facts here.

export type ArticleBlock =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "ul"; items: string[] }
  | { type: "ol"; items: string[] }
  | { type: "quote"; text: string }
  | { type: "code"; lang?: string; code: string }
  // Rich media blocks
  | { type: "image"; src: string; alt: string; caption?: string; width: number; height: number }
  | { type: "gif"; src: string; alt: string; caption?: string; label?: string }
  | { type: "video"; src: string; poster?: string; caption?: string }
  | { type: "gallery"; images: { src: string; alt: string; width: number; height: number }[]; caption?: string }
  | { type: "callout"; variant: "info" | "tip" | "warning" | "success"; title?: string; text: string }
  | { type: "stats"; items: { value: string; label: string }[] }
  | { type: "divider" };

// Topic glyph for the branded (image-less) cover fallback.
export type CoverGlyph = "lending" | "llm" | "chain" | "automation" | "ai" | "trophy";

export type Article = {
  slug: string;
  title: string;
  description: string;
  date: string; // human label, e.g. "May 2025"
  dateISO: string; // for <time> + sorting
  tag: string;
  accent: string; // gradient classes for the card wash + branded cover
  glyph: CoverGlyph; // motif used when there is no real cover photo
  coverImage?: string; // real screenshot/photo used as the cover, if one exists
  coverAlt?: string; // alt text for coverImage
  intro: string; // lead paragraph shown at the top of the article
  body: ArticleBlock[];
};

export const articles: Article[] = [
  {
    slug: "inside-creditopia-onchain-lending-anatomy",
    glyph: "lending",
    coverImage: "/projects/featured/creditopia.png",
    coverAlt: "The Creditopia peer-to-peer lending dashboard",
    title: "Inside Creditopia: The Anatomy of an On-Chain Lending App",
    description:
      "A visual teardown of the P2P lending platform that won Chain Fusion — the lending loop, the smart-contract core, the demo, and the numbers behind it. Screenshots, diagrams, code, and video.",
    date: "July 2025",
    dateISO: "2025-07-15",
    tag: "Blockchain",
    accent: "from-[#e2f0ff] via-[#f9fecd] to-white",
    intro:
      "Creditopia is the peer-to-peer lending platform my team built on the Internet Computer — and the one that took first place at the Chain Fusion Hacker House. I already wrote the story of the 48 hours. This one is the teardown: the actual shape of the product, told in pictures, a diagram, code, and a clip of it running.",
    body: [
      { type: "h2", text: "What we actually shipped" },
      {
        type: "p",
        text: "Creditopia connects small businesses that need capital with a global pool of lenders, and puts the smart contract in the middle so neither side has to trust the other. Here is the product itself — the dashboard a borrower sees when they open a financing request.",
      },
      {
        type: "image",
        src: "/projects/featured/creditopia.png",
        alt: "The Creditopia lending dashboard showing an active financing request",
        caption: "The borrower dashboard. Every figure on this screen is read straight from on-chain state, not a cached database.",
        width: 1395,
        height: 766,
      },
      {
        type: "callout",
        variant: "info",
        title: "The core idea in one sentence",
        text: "Traditional P2P lending needs a trusted platform in the middle. Creditopia replaces that platform with a smart contract, so the *rules* are trusted instead of a *company*.",
      },
      { type: "h2", text: "The lending loop" },
      {
        type: "p",
        text: "The whole app is one loop: a request flows in from an SME, the contract escrows and matches it, and funding flows back from lenders. Drawn out, it looks like this — and it never stops moving.",
      },
      {
        type: "gif",
        src: "/blog/creditopia-loop.svg",
        alt: "Animated diagram: an SME request flows into a smart contract, funding flows back from a lender",
        label: "LIVE DIAGRAM",
        caption: "Request in, funding back. The contract is the middleman no one has to trust.",
      },
      { type: "h2", text: "The contract, in code" },
      {
        type: "p",
        text: "Because we built on ICP, the lending logic lives in a canister written in Motoko. The heart of it is small — a request is created, funded by lenders, and only released once it is fully backed. Simplified, the funding path reads like this:",
      },
      {
        type: "code",
        lang: "motoko",
        code: `public shared({ caller }) func fundRequest(id : RequestId, amount : Nat) : async Result<(), Text> {
  switch (requests.get(id)) {
    case null { #err("request not found") };
    case (?req) {
      if (req.status != #open) return #err("request is not open");
      if (req.funded + amount > req.target) return #err("over-funds target");

      // Record the lender's stake on-chain, then advance state.
      let updated = { req with funded = req.funded + amount };
      ledger.credit(caller, id, amount);
      requests.put(id, updated);

      if (updated.funded == req.target) { await release(id) };
      #ok(())
    };
  };
};`,
      },
      {
        type: "callout",
        variant: "warning",
        title: "Why the checks come first",
        text: "On an append-only ledger there is no undo. Every guard clause runs *before* a single token moves — a bug here is not a rollback, it is a permanent public record of the mistake.",
      },
      { type: "h2", text: "The result" },
      {
        type: "p",
        text: "We took it on stage at Coinfest Asia in Bali and ran the full loop live. The numbers, for the record:",
      },
      {
        type: "stats",
        items: [
          { value: "1st", label: "Place, out of 100+ teams" },
          { value: "48h", label: "From empty repo to demo" },
          { value: "$3,000", label: "Developer grant won" },
          { value: "4", label: "Stacks: Motoko · Rust · JS · Vue" },
        ],
      },
      {
        type: "gallery",
        images: [
          { src: "/achievements/icp-01.jpeg", alt: "The team presenting Creditopia at the Chain Fusion Hacker House", width: 1200, height: 900 },
          { src: "/achievements/icp-02.jpeg", alt: "On stage receiving the Chain Fusion award", width: 1200, height: 900 },
        ],
        caption: "Left: pitching the lending loop to the judges. Right: the part that made the 48 sleepless hours worth it.",
      },
      {
        type: "quote",
        text: "The demo path is the product. Everything else is scaffolding you can throw away after the judges leave.",
      },
      { type: "h2", text: "See it move" },
      {
        type: "p",
        text: "Screens and diagrams only go so far. Here is a short capture of the dashboard itself — the same build we demoed.",
      },
      {
        type: "video",
        src: "/blog/creditopia-demo.mp4",
        poster: "/blog/creditopia-poster.jpg",
        caption: "A walkthrough of the Creditopia borrower dashboard. Muted, loops.",
      },
      { type: "divider" },
      { type: "h2", text: "If you want to build one" },
      {
        type: "ol",
        items: [
          "Model the state machine first — open, funded, released — and make illegal transitions impossible, not just unlikely.",
          "Put every validation before any state change. On-chain, order is safety.",
          "Read balances from the chain, not a mirror database, or your UI will lie the moment they drift.",
          "Protect the one loop that has to work, and cut everything that does not serve it.",
        ],
      },
      {
        type: "p",
        text: "That is the whole app, start to finish. Want the story of the 48 hours that produced it? That is in the companion post — read on below.",
      },
    ],
  },
  {
    slug: "llm-conversational-recommender-crypto-portfolios",
    glyph: "llm",
    title: "An LLM-Based Conversational Recommender for Long-Term Crypto Portfolios",
    description:
      "How I built and published a conversational recommender that personalizes long-term cryptocurrency portfolios, and what a language model actually adds on top of the numbers. Presented at IEEE ICoICT 2025.",
    date: "May 2025",
    dateISO: "2025-05-01",
    tag: "AI / Research",
    accent: "from-[#e2f0ff] via-white to-[#f9fecd]",
    intro:
      "This was my undergraduate thesis at Telkom University, and it ended up published at IEEE ICoICT 2025. The premise was simple to say and hard to do: most crypto portfolio tools either dump raw metrics on you or hand you a black-box allocation. I wanted a system you could actually talk to about a long-term portfolio, and that could explain itself in plain language.",
    body: [
      { type: "h2", text: "The problem with most portfolio tools" },
      {
        type: "p",
        text: "Retail crypto advice tends to live at two extremes. On one side you have dashboards full of indicators that assume you already know what a Sharpe ratio is. On the other you have apps that give you a single recommended allocation and no reason to trust it. Neither respects that a long-term investor has a risk tolerance, a time horizon, and questions that change over time.",
      },
      {
        type: "p",
        text: "A **long-term** portfolio makes the explanation problem worse, not better. You are asking someone to hold through drawdowns for months or years. If the system cannot articulate *why* an asset is in the basket, the first red candle will make them abandon the plan.",
      },
      { type: "h2", text: "The architecture" },
      {
        type: "p",
        text: "The core idea was to separate the numbers from the conversation. A quantitative layer produces candidate allocations grounded in historical data. A language model sits on top as the interface — it reads the user's stated goals, queries the quantitative layer, and turns the result into a recommendation the user can interrogate.",
      },
      {
        type: "ul",
        items: [
          "A data layer pulling long-horizon price and market data for the candidate assets.",
          "A scoring stage that ranks and weights assets against the user's risk profile and horizon.",
          "A conversational layer, driven by an LLM, that grounds its answers in the scoring output instead of free-associating from training data.",
          "A guardrail that keeps the model from inventing prices or promising returns it cannot support.",
        ],
      },
      {
        type: "p",
        text: "That last point is the whole game. A language model left to its own devices will happily hallucinate a confident price target. Grounding every claim in the quantitative layer is what turns a chatbot into a recommender you can defend in a paper.",
      },
      { type: "h2", text: "What the LLM actually adds" },
      {
        type: "p",
        text: "The temptation is to think the model *is* the recommender. It is not. The allocation logic could run without it. What the model adds is the part humans actually struggle with: translating a vague intent (\"I want something steady I can hold for two years\") into constraints the scoring layer understands, and translating the scoring layer's output back into language a non-quant can act on.",
      },
      {
        type: "quote",
        text: "The model is the negotiator between a human's fuzzy goals and a system's precise numbers. It is not the source of truth — it is the translator.",
      },
      { type: "h2", text: "Lessons that carried over" },
      {
        type: "p",
        text: "This project is the reason the rest of my LLM work looks the way it does. The Ask Alfara chat on this very site follows the same rule: the model never states a fact that is not grounded in a source I control. Grounding is not a nice-to-have you bolt on at the end. It is the architecture.",
      },
      {
        type: "ol",
        items: [
          "Decide what the model is allowed to know before you write a single prompt.",
          "Keep the deterministic logic deterministic — do not push math into the model.",
          "Make the model explain, not decide, wherever a wrong decision is expensive.",
        ],
      },
      {
        type: "p",
        text: "The paper is public if you want the formal version: doi.org/10.1109/ICoICT66265.2025.11193014.",
      },
    ],
  },
  {
    slug: "evm-vs-non-evm-enterprise-traceability",
    glyph: "chain",
    title: "EVM vs Non-EVM for Enterprise Traceability: What I Learned at HARA",
    description:
      "Benchmarking Avalanche, Polygon, Hedera, and Ripple against Hyperledger for a real enterprise supply-chain traceability system, and where each one actually breaks under enterprise constraints.",
    date: "February 2025",
    dateISO: "2025-02-01",
    tag: "Blockchain",
    accent: "from-[#f9fecd] via-[#e2f0ff] to-white",
    intro:
      "At HARA I built blockchain traceability for a large enterprise client and spent a good chunk of the internship benchmarking chains against each other. The question sounds academic — EVM or non-EVM? — but for a company that wants supply-chain data verifiable end to end, the answer decides cost, latency, and who they have to trust.",
    body: [
      { type: "h2", text: "Traceability is a boring, unforgiving use case" },
      {
        type: "p",
        text: "Nobody is trading tokens here. The job is to write an append-only record every time a physical thing changes hands, and to let anyone downstream verify that record without trusting the party who wrote it. That sounds like a natural fit for a blockchain, and it is — but enterprise traceability punishes the exact things public chains are bad at: unpredictable fees, variable finality, and throughput ceilings.",
      },
      { type: "h2", text: "What I actually benchmarked" },
      {
        type: "p",
        text: "The comparison ran across EVM and non-EVM platforms — Avalanche, Polygon, Hedera, and Ripple — plus Hyperledger frameworks for the permissioned case. The metrics that mattered to the client were not the ones crypto Twitter argues about.",
      },
      {
        type: "ul",
        items: [
          "Finality time under sustained write load, not the best-case number in the docs.",
          "Cost per write, and — more importantly — how *predictable* that cost is when the public network gets busy.",
          "Throughput headroom before latency degrades.",
          "Operational trust: who runs the validators, and does the client have to care?",
        ],
      },
      { type: "h2", text: "Where each family breaks" },
      {
        type: "p",
        text: "**EVM public chains** (Polygon, Avalanche) give you the richest tooling and the biggest developer pool, which matters more than people admit — you can hire for it. The break point is fee volatility. A traceability system writes constantly, and a client will not accept a per-write cost that triples because something unrelated is congesting the network.",
      },
      {
        type: "p",
        text: "**Purpose-built non-EVM chains** like Hedera trade some of that ecosystem for predictable fees and fast finality, which is exactly what a write-heavy audit trail wants. The cost is a smaller talent pool and more bespoke integration work.",
      },
      {
        type: "p",
        text: "**Permissioned Hyperledger** removes the fee question entirely and gives you throughput, because you control the validators. But you have just reintroduced the trust problem the client came to blockchain to solve — now *they* run the network, so verification is only as trustworthy as their governance.",
      },
      {
        type: "quote",
        text: "There is no winner. There is only the chain whose failure mode your client can live with.",
      },
      { type: "h2", text: "The decision framework I ended up with" },
      {
        type: "ol",
        items: [
          "If external parties must verify without trusting you, you need a public chain — accept the fee volatility and design around it.",
          "If verification stays inside a consortium of known parties, permissioned wins on cost and throughput.",
          "If you need public verifiability *and* predictable cost, a purpose-built non-EVM chain is the compromise — budget for the extra integration work.",
        ],
      },
      {
        type: "p",
        text: "Before any of this ships, the contracts get security tested. I ran that testing prior to deployment, because on an append-only system a bug is not a bug — it is a permanent, public record of your mistake.",
      },
    ],
  },
  {
    slug: "shopeelaku-automating-products-at-scale",
    glyph: "automation",
    coverImage: "/projects/featured/shopeelaku.png",
    coverAlt: "The ShopeeLaku multi-store automation dashboard",
    title: "Automating 10,000+ Products Across 30 Stores: Architecture Notes",
    description:
      "The queue-driven design behind ShopeeLaku's dropshipping automation, and why days of manual product management collapsed into minutes.",
    date: "June 2025",
    dateISO: "2025-06-01",
    tag: "Automation",
    accent: "from-white via-[#e2f0ff] to-[#f9fecd]",
    intro:
      "ShopeeLaku is a dropshipping automation tool that runs many stores from one dashboard. Listings, pricing, and performance tracking happen on their own, so a seller spends minutes on work that used to eat entire days. The interesting part is not the UI — it is the queue underneath it.",
    body: [
      { type: "h2", text: "The work that does not scale by hand" },
      {
        type: "p",
        text: "A dropshipper's day job is repetitive and enormous: pull products from a source, rewrite listings, set prices with a margin, push them to a marketplace, then keep all of that in sync as source prices and stock move. One store is tedious. Thirty stores with thousands of products each is impossible to do by hand, and the manual version is where the mistakes live.",
      },
      { type: "h2", text: "Why a queue, not a loop" },
      {
        type: "p",
        text: "The naive version is a big loop: for each store, for each product, call the marketplace API. It works in a demo and dies in production. Marketplaces rate-limit you, calls fail intermittently, and a single loop means one slow store blocks every other store behind it.",
      },
      {
        type: "p",
        text: "So the core is a **job queue**. Every unit of work — sync one product, reprice one listing, refresh one store's stats — is a job. Workers pull jobs and run them concurrently, with retries and backoff baked in. The dashboard just enqueues intent; the workers do the slow, failure-prone talking to the outside world.",
      },
      {
        type: "ul",
        items: [
          "Each store's work runs independently, so a slow or rate-limited store never blocks the others.",
          "Failed jobs retry with backoff instead of aborting a whole run.",
          "Throughput scales by adding workers, not by rewriting the logic.",
          "The dashboard stays instant because it never waits on a marketplace API — it just drops jobs on the queue.",
        ],
      },
      { type: "h2", text: "The stack" },
      {
        type: "p",
        text: "NuxtJS for the dashboard, Prisma over PostgreSQL for state, Python workers for the heavy integration jobs, all wrapped in Docker so the whole thing runs the same on my machine as in production. Nothing exotic — the leverage comes from the shape of the system, not the brand names in it.",
      },
      {
        type: "quote",
        text: "Days of manual product management collapsed into minutes. Not because the code was clever, but because the work stopped being sequential.",
      },
      { type: "h2", text: "What I would tell anyone building marketplace automation" },
      {
        type: "ol",
        items: [
          "Treat every external API call as something that will fail, and design the retry before the happy path.",
          "Isolate tenants (stores) so one bad actor's rate limit is not everyone's outage.",
          "Keep the UI off the critical path — enqueue intent, report status, never block a click on a third-party API.",
        ],
      },
    ],
  },
  {
    slug: "building-ask-alfara-grounded-llm-chat",
    glyph: "ai",
    title: "Building Ask Alfara: A Grounded, Provider-Agnostic LLM Chat",
    description:
      "The chat on this site is a production LLM app I built end to end — Next.js route handler, Vercel AI SDK v7, OpenRouter, Upstash rate limiting, streaming. Here is how it stays grounded and cheap.",
    date: "July 2025",
    dateISO: "2025-07-01",
    tag: "AI / LLM",
    accent: "from-[#e2f0ff] via-[#f9fecd] to-white",
    intro:
      "If you have used the chat in the header of this site, you have used the thing this post is about. Ask Alfara answers questions about me and my work. It is small on purpose, but it is a real production LLM app, and it is built on the same principle as my research: the model is never allowed to make things up.",
    body: [
      { type: "h2", text: "The one rule" },
      {
        type: "p",
        text: "There is a single canonical profile file that is the source of truth. The model grounds every answer in that file. If a fact is not in the profile or my resume, the correct answer is \"I don't have that detail\" plus a pointer to contact me — not a confident guess. A portfolio chatbot that invents a client or a skill is worse than no chatbot at all.",
      },
      { type: "h2", text: "Provider-agnostic on purpose" },
      {
        type: "p",
        text: "The app talks to models through an OpenAI-compatible layer over OpenRouter, using the Vercel AI SDK. That means the underlying model is a config value, not a rewrite. If a better or cheaper model shows up next month, I change a string. I have been burned before by pipelines welded to one vendor's SDK, so now I default to provider-agnostic from day one.",
      },
      {
        type: "ul",
        items: [
          "A Next.js App Router route handler owns the server side — no separate backend to deploy.",
          "The Vercel AI SDK handles streaming so answers appear token by token instead of after an awkward pause.",
          "OpenRouter abstracts the provider, so switching models is a config change.",
          "Upstash gives me rate limiting at the edge, because a public LLM endpoint without a rate limit is just a way to donate money to a token bill.",
        ],
      },
      { type: "h2", text: "Streaming is a UX decision, not a technical one" },
      {
        type: "p",
        text: "Server-sent events stream the response as it generates. This is not about speed — the total time is similar. It is about the feeling of the thing. A blank box for four seconds reads as broken. The same four seconds with text flowing reads as thinking. For a chat that represents me, that difference matters.",
      },
      {
        type: "quote",
        text: "Rate limiting and grounding are not features you add later. On a public endpoint that speaks for you, they are the first two things you build.",
      },
      { type: "h2", text: "Why this pattern travels" },
      {
        type: "p",
        text: "Swap the profile file for a product's docs and you have a support assistant. Swap it for internal runbooks and you have an ops helper. The bones — grounded context, provider-agnostic model, streaming, rate limiting — are the same bones every serious LLM feature needs. This chat is a deliberately small proof of a pattern I ship at real scale.",
      },
    ],
  },
  {
    slug: "winning-chain-fusion-hackathon-creditopia",
    glyph: "trophy",
    coverImage: "/achievements/icp-01.jpeg",
    coverAlt: "The team presenting Creditopia at the Chain Fusion Hacker House",
    title: "48 Hours, 100+ Teams, One P2P Lending App: Winning Chain Fusion with Creditopia",
    description:
      "What it actually takes to win a 48-hour international hackathon — the technical bet on ICP, the scope discipline, and the decisions we made at hour 30 that mattered more than the code.",
    date: "August 2024",
    dateISO: "2024-08-01",
    tag: "Blockchain",
    accent: "from-[#f9fecd] via-white to-[#e2f0ff]",
    intro:
      "The Chain Fusion Hacker House was a 48-hour onsite hackathon at Coinfest Asia in Bali, run by the Internet Computer Protocol, with more than 100 teams from around the world. We built Creditopia, a peer-to-peer lending platform on ICP, and finished first — with a $3,000 grant. This is the honest version of how.",
    body: [
      { type: "h2", text: "The brief that filtered out most teams" },
      {
        type: "p",
        text: "The prompt was not \"build something cool with ICP.\" It was: solve a real traditional-finance problem, and deliver impact to end users — not just impress the judges. That framing quietly eliminates half the field, because it rewards teams who can name a real user and punishes teams who lead with technology.",
      },
      {
        type: "p",
        text: "We picked SME financing. Small businesses that banks find too small or too risky, and lenders who would fund them if they could reach them safely. Creditopia is the bridge: peer-to-peer lending on the Internet Computer, where the smart contracts handle the financing and every transaction lives on-chain.",
      },
      { type: "h2", text: "Why ICP, and what it cost us" },
      {
        type: "p",
        text: "Building on the Internet Computer meant Motoko and Rust for the canisters, with JavaScript and Vue.js on the front. The upside is that a lot of the app can live fully on-chain. The cost is that the toolchain is less traveled than EVM — fewer StackOverflow answers at 3 a.m. That trade is fine when the whole point is to show what the platform can do.",
      },
      { type: "h2", text: "The decisions that actually won it" },
      {
        type: "p",
        text: "The code mattered less than three decisions we made under pressure:",
      },
      {
        type: "ol",
        items: [
          "Scope down, hard. We shipped the lending loop end to end rather than five half-features. A judge can forgive a missing feature; they cannot forgive a demo that breaks.",
          "Protect the demo path. By hour 30 we stopped adding and started hardening the exact flow we would show on stage.",
          "Manage energy like a resource. Forty-eight hours is a stamina problem disguised as a coding problem. We rotated who slept so the team was never fully down.",
        ],
      },
      {
        type: "quote",
        text: "The most memorable part was competing alongside teammates from completely different backgrounds and campuses, making big decisions under real time pressure. The win was almost a side effect of getting those decisions right.",
      },
      { type: "h2", text: "What a hackathon teaches that a job cannot" },
      {
        type: "p",
        text: "Compressing a real product into 48 hours forces a clarity you rarely get otherwise: what is the one loop that has to work, and what can you cut without lying about what you built? I take that instinct into every client project now. Most software does not need more features. It needs the core loop to be undeniable.",
      },
      {
        type: "p",
        text: "Creditopia finished first out of 100+ teams and raised a $3,000 developer grant. But the transferable win was the discipline — and I have leaned on it in every build since.",
      },
    ],
  },
];

const WORDS_PER_MINUTE = 200;

export function readingTime(article: Article): number {
  const text = [
    article.intro,
    ...article.body.map((block) => {
      if (block.type === "ul" || block.type === "ol") return block.items.join(" ");
      if (block.type === "code") return block.code;
      if (block.type === "p" || block.type === "h2" || block.type === "quote") return block.text;
      if (block.type === "callout") return `${block.title ?? ""} ${block.text}`;
      return ""; // media blocks (image/gif/video/gallery/stats/divider) — no prose to count
    }),
  ].join(" ");
  const words = text.trim().split(/\s+/).length;
  return Math.max(1, Math.round(words / WORDS_PER_MINUTE));
}

export function getArticle(slug: string): Article | undefined {
  return articles.find((article) => article.slug === slug);
}

export const sortedArticles: Article[] = [...articles].sort((a, b) =>
  b.dateISO.localeCompare(a.dateISO),
);
