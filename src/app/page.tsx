import Image from "next/image";
import {
  ArrowUpRight,
  ExternalLink,
  GitBranch,
  Mail,
  MessageCircle,
  Trophy,
} from "lucide-react";
import { HeroSection } from "./components/hero-section";
import { PillNav } from "./components/pill-nav";
import { About } from "./components/about";
import { Achievements } from "./components/achievements";
import { Experiences } from "./components/experiences";
import { MoreProjects } from "./components/more-projects";
import { ProjectStack } from "./components/project-stack";
import { Testimonials } from "./components/testimonials";
import { Tools } from "./components/tools";

const assetBase = "/figma-assets";

const featuredProjects = [
  {
    name: "ShopeeLaku",
    file: "shopeelaku-automation.js",
    category: "Automation",
    description:
      "Built a centralized dropshipping automation platform that enables sellers to manage multiple stores, automate product listings, optimize pricing strategies, and track business performance from a single dashboard.",
    tags: ["NuxtJS", "Prisma", "Psql", "Python", "Docker", "Javascript"],
    accent: "from-[#f9fecd] via-[#e2f0ff] to-white",
    preview: `${assetBase}/featured-project-01.png`,
    previewSize: { width: 1395, height: 766 },
    previewBg: "#f9fecd",
    liveUrl: "#",
    repoUrl: "#",
  },
  {
    name: "Creditopia",
    file: "lending-ICP-creditopia.js",
    category: "Fullstack",
    description:
      "Built a decentralized lending ecosystem using ICP and smart contracts, enabling secure peer-to-peer financing, transparent transactions, and global capital access for SMEs.",
    tags: ["VueJS", "Rust", "Javascript", "Motoko"],
    accent: "from-[#e2f0ff] via-white to-[#f9fecd]",
    preview: `${assetBase}/featured-project-02.png`,
    previewSize: { width: 1395, height: 766 },
    previewBg: "#0f172a",
    liveUrl: "#",
    repoUrl: "#",
  },
  {
    name: "Redooceit",
    file: "redooceit-waste-management.js",
    category: "Fullstack",
    description:
      "Built an end-to-end circular waste management platform with IoT integration, real-time monitoring, and operational dashboards to improve waste processing efficiency and community participation.",
    tags: ["NextJS", "Golang", "Psql", "Redis", "Flutter"],
    accent: "from-white via-[#e2f0ff] to-[#f9fecd]",
    preview: `${assetBase}/featured-project-03.png`,
    previewSize: { width: 1395, height: 766 },
    previewBg: "#3ce0b0",
    liveUrl: "#",
    repoUrl: "#",
  },
];

const moreProjects = [
  {
    name: "Votergate",
    viewLabel: "Votergate",
    description:
      "Decentralized voting platform using blockchain and zero-knowledge proofs, enabling transparent elections, secure vote verification, and privacy-preserving vote counting.",
    logo: `${assetBase}/more-project-logo-01.png`,
    logoSize: { width: 306, height: 306 },
    hover: `${assetBase}/hover-votergate.png`,
    hoverSize: { width: 2210, height: 2026 },
    viewUrl: "#",
  },
  {
    name: "Taledotfun",
    viewLabel: "Taledotfun",
    description:
      "Built a Web3 storytelling platform on Solana that empowers creators to publish, monetize, and preserve cultural narratives through NFTs, smart contracts, and DAO governance.",
    logo: `${assetBase}/more-project-logo-02.png`,
    logoSize: { width: 280, height: 288 },
    hover: `${assetBase}/hover-talefun.png`,
    hoverSize: { width: 2623, height: 1865 },
    viewUrl: "#",
  },
  {
    name: "Tourease",
    viewLabel: "TourEase",
    description:
      "Travel planning platform that generates optimized routes and personalized itineraries, enabling travelers to discover attractions and maximize their time in a destination.",
    logo: `${assetBase}/more-project-logo-03.png`,
    logoSize: { width: 336, height: 336 },
    hover: `${assetBase}/hover-tourease.png`,
    hoverSize: { width: 2706, height: 1869 },
    viewUrl: "#",
  },
];

const experiences = [
  {
    company: "World Wide",
    type: "Self Employed",
    role: "Freelance Software Engineer",
    date: "Jul 2020 - Present",
    logo: `${assetBase}/experience-logo-01.png`,
    bullets: [
      "Accumulated 4 years experience. Collaborated with more than 15 individuals and companies constructing websites, and services and enhancing the business processes.",
      "Implemented clean code using stacks such as Laravel, Nodejs, Expressjs, Flask, Typescript, Solidity, and Vuejs. 90% of customer reviews are satisfied.",
    ],
  },
  {
    company: "Redooce Indonesia",
    type: "Full Time",
    role: "Founder & Chief Executive Officer",
    date: "Mar 2023 - Nov 2025",
    logo: `${assetBase}/experience-logo-02.png`,
    bullets: [
      "As Founder & CEO, I lead Redooceit’s vision, product direction, business strategy, partnerships, and operations, building it from concept into an early-stage sustainability technology venture.",
      "Built Redooceit across 4 main service lines: waste management dashboard, project-based collaboration, event waste management, and sustainability partnership.",
      "Managed a team of 15+ members across product, business, branding, operations, and partnership.",
      "Supported waste management activities involving approximately 5000++ kg of waste, 3 events/projects, and 4 communities/TPS/partners.",
      "Explored strategic opportunities in TPS digitalization, waste traceability, ESG reporting, event waste management, and circular economy implementation.",
    ],
  },
  {
    company: "HARA",
    type: "Internship",
    role: "Blockchain Engineer",
    date: "Jul 2024 - Mar 2025",
    logo: `${assetBase}/experience-logo-03.png`,
    bullets: [
      "Accumulated 4 years experience. Collaborated with more than 15 individuals and companies constructing websites, and services and enhancing the business processes.",
      "Implemented clean code using stacks such as Laravel, Nodejs, Expressjs, Flask, Typescript, Solidity, and Vuejs. 90% of customer reviews are satisfied.",
    ],
  },
  {
    company: "Kecilin",
    type: "Full Time",
    role: "Backend Engineer",
    date: "Dec 2021 - Nov 2022",
    logo: `${assetBase}/experience-logo-04.png`,
    bullets: [
      "Developed and deployed a real-time dashboard monitoring system to manage and oversee 100+ CCTVs that running across Indonesia. Utilizing Express.js, Node.js, and MongoDB.",
      "Conducted to lead blockchain storage development to support Kecilin compression storage process, implemented at the internal team and 2 Kecilin.id clients. Constructed with Solidity, IPFS, Hardhat, and Nodejs.",
    ],
  },
  {
    company: "Telkom Indonesia",
    type: "Internship",
    role: "Backend Engineer",
    date: "Apr 2021 - Jul 2021",
    logo: `${assetBase}/experience-logo-05.png`,
    bullets: [
      "Coordinated and managed the documentation API of 2 products using Swagger and Postman. Spearheaded the adoption of scrum SDLC methodology, reduced time-to-market by 30%, and increased productivity by 40%.",
      "Facilitated lead engineer in refactoring product from Node Js to Typescript included added features, unit testing, and improved coverage above 85%.",
    ],
  },
];

const achievements = [
  {
    id: "icp",
    status: "WINNER",
    accent: "#2388ff",
    subtitle: "Internet Computer Protocol",
    title: "Chain Fusion Hacker House Hackathon",
    date: "Aug 2024",
    location: "International · Bali, Indonesia",
    tags: ["Beat 100+ teams", "Digital Innovation Track", "Selection for ASEAN Digital Award"],
    project: {
      name: "Creditopia P2P lending",
      techs: [
        { name: "Rust", dot: "#ce4e2e" },
        { name: "ICP", dot: "#8b5cf6" },
        { name: "Solana", dot: "#7c3aed" },
      ],
    },
    description: [
      "Held by the Internet Computer Protocol (ICP) in August 2024 at Coinfest Asia — the largest blockchain festival in Asia. A 48-hour onsite hackathon with more than 100 teams from around the world.",
      "We solve a real traditional-finance problem using ICP’s on-chain technology and the solution had to deliver impact directly to end users, not just impress the judges. We built Creditopia, a peer-to-peer (P2P) lending platform on the Internet Computer that connects MSMEs with a global network of lenders, offering financing that’s secure, transparent, and efficient. Built with Rust, Motoko, JavaScript, and Vue.js.",
      "The most memorable part was competing alongside a team from completely different backgrounds — different campuses, different jobs — while managing our energy across a full 48 hours and making big decisions under tight time pressure. **We finished in 1st place and won $3,000 in funding.**",
    ],
    images: ["", ""],
  },
  {
    id: "apicta",
    status: "MERIT",
    accent: "#f97316",
    subtitle: "ASEAN",
    title: "Asia Pacific ICT Alliance (APICTA) Awards",
    date: "Dec 2023",
    location: "International · Hongkong",
    tags: ["International finalist", "Regional product showcase", "Startup innovation"],
    project: {
      name: "Creditopia P2P lending",
      techs: [
        { name: "Rust", dot: "#ce4e2e" },
        { name: "ICP", dot: "#8b5cf6" },
        { name: "Solana", dot: "#7c3aed" },
      ],
    },
    description: [
      "Placeholder — replace with APICTA award context and event summary.",
      "Placeholder — replace with product details, judging criteria, and outcomes.",
      "Placeholder — replace with reflection or key result.",
    ],
    images: ["", ""],
  },
  {
    id: "identik",
    status: "1st Runner Up",
    accent: "#14b8a6",
    subtitle: "ASEAN",
    title: "IdenTIK - Indonesia Entrepreneur TIK",
    date: "Oct 2023",
    location: "National · Yogyakarta, Indonesia",
    tags: ["Beat 100+ teams", "Digital Innovation Track", "Selection for ASEAN Digital Award"],
    project: {
      name: "Creditopia P2P lending",
      techs: [
        { name: "Rust", dot: "#ce4e2e" },
        { name: "ICP", dot: "#8b5cf6" },
        { name: "Solana", dot: "#7c3aed" },
      ],
    },
    description: [
      "Placeholder — replace with IdenTIK context and event summary.",
      "Placeholder — replace with product details and judging criteria.",
      "Placeholder — replace with reflection or key result.",
    ],
    images: ["", ""],
  },
];

const blogPosts = Array.from({ length: 3 }, (_, index) => ({
  title: "Baked-in Brilliance: Reranking Meets RL with mxbai-rerank-v2",
  description:
    "Second-generation reranking models using reinforcement learning, supporting 100+ languages with up to 32k token context.",
  date: "24 June, 2025",
  key: index,
}));

const contacts = [
  ["EMAIL", "nafidinara@gmail.com", Mail],
  ["LINKEDIN", "linkedin.com/in/nafidinara", ExternalLink],
  ["GITHUB", "github.com/nafidinara", GitBranch],
  ["TWITTER", "x.com/nafidinara", MessageCircle],
] as const;

function AvatarLogo({ small = false }: { small?: boolean }) {
  const size = small ? 120 : 169;

  return (
    <Image
      src={`${assetBase}/hero-avatar.png`}
      alt={small ? "" : "Alfara profile portrait"}
      width={338}
      height={338}
      priority={!small}
      className={`rounded-full object-cover shadow-[0_28px_80px_rgba(0,68,167,0.16)] ${
        small ? "h-[120px] w-[120px]" : "h-[169px] w-[169px]"
      }`}
      sizes={`${size}px`}
    />
  );
}

function SectionHeading({ eyebrow, children }: { eyebrow?: string; children: React.ReactNode }) {
  return (
    <div className="max-w-[704px]">
      {eyebrow ? (
        <p className="mb-5 font-mono text-[20px] font-bold tracking-[-0.01em] text-[#0044a7]">
          {eyebrow}
        </p>
      ) : null}
      <h2 className="text-[34px] leading-[1.14] tracking-[-0.02em] text-[#09090b] sm:text-[40px] sm:leading-[1.2]">
        {children}
      </h2>
    </div>
  );
}

function ProjectsSection() {
  return (
    <section id="projects" className="relative">
      <ProjectStack projects={featuredProjects} />
      <div className="relative mx-auto mt-20 max-w-[960px] border-t-[4px] border-[#e2f0ff] px-4 pt-10 text-center sm:px-6 lg:px-0">
        <p className="mx-auto -mt-[66px] w-fit bg-[#fafdff] px-8 text-[24px] tracking-[-0.03em] text-[#71717b]">
          More Projects
        </p>
        <MoreProjects projects={moreProjects} />
      </div>
    </section>
  );
}

function ExperiencesSection() {
  return (
    <section id="experiences" className="mx-auto mt-[300px] max-w-[960px] px-4 sm:px-6 lg:px-0">
      <h2 className="sr-only">Experiences</h2>
      <SectionHeading eyebrow="EXPERIENCE">
        Five years of shipping — from a national telco to my own funded startup.
      </SectionHeading>
      <Experiences experiences={experiences} />
    </section>
  );
}

function ToolsSection() {
  return (
    <section id="tools" className="mx-auto mt-[220px] max-w-[960px] px-4 sm:px-6 lg:px-0">
      <h2 className="sr-only">Tools</h2>
      <Tools />
    </section>
  );
}

function AchievementsSection() {
  return (
    <section id="achievements" className="mx-auto mt-[220px] max-w-[960px] px-4 sm:px-6 lg:px-0">
      <h2 className="sr-only">Achievements</h2>
      <SectionHeading eyebrow="ACHIEVEMENTS">
        Five years of shipping — from a national telco to my own funded startup.
      </SectionHeading>
      <Achievements items={achievements} />
    </section>
  );
}

function AboutSection() {
  return (
    <section id="about" className="mx-auto mt-[220px] max-w-[960px] px-4 sm:px-6 lg:px-0">
      <p className="mb-4 font-mono text-[16px] font-bold tracking-[-0.01em] text-[#0044a7]">
        ABOUT
      </p>
      <About />
    </section>
  );
}

function WordsSection() {
  return (
    <section id="words" className="mx-auto mt-[220px] max-w-[960px] px-4 sm:px-6 lg:px-0">
      <div className="mx-auto max-w-[720px] text-center">
        <p className="mb-4 font-mono text-[16px] font-bold tracking-[-0.01em] text-[#0044a7]">
          WORDS
        </p>
        <h2 className="font-hanken text-[30px] font-semibold leading-[1.14] tracking-[-0.02em] text-[#09090b] sm:text-[34px]">
          What people say once we’ve actually shipped together.
        </h2>
      </div>
      <Testimonials />
    </section>
  );
}

function BlogSection() {
  return (
    <section id="blog" className="mx-auto mt-[300px] max-w-[960px] px-4 sm:px-6 lg:px-0">
      <h2 className="sr-only">Blog</h2>
      <SectionHeading eyebrow="BLOG">Writing about AI, engineering, and product lessons from the field.</SectionHeading>
      <div className="mt-12 space-y-0 overflow-hidden rounded-[24px] border border-[#bfcfe6] bg-white">
        {blogPosts.map((post) => (
          <article className="flex min-h-[190px] flex-col justify-between border-b border-[#dae9f8] p-7 last:border-b-0 sm:flex-row sm:items-center sm:gap-12" key={post.key}>
            <div>
              <p className="mb-3 font-mono text-sm font-semibold text-[#71717b]">{post.date}</p>
              <h3 className="max-w-[620px] font-hanken text-[26px] font-semibold tracking-[-0.04em] text-[#09090b]">{post.title}</h3>
              <p className="mt-3 max-w-[650px] leading-[1.45] text-[#52525c]">{post.description}</p>
            </div>
            <a className="focus-ring mt-5 inline-flex shrink-0 items-center gap-2 rounded-full border border-[#bfcfe6] px-5 py-3 font-hanken font-semibold text-[#0044a7] sm:mt-0" href="#contact">
              Read Blog <ArrowUpRight size={16} />
            </a>
          </article>
        ))}
      </div>
    </section>
  );
}

function ContactSection() {
  return (
    <section id="contact" className="mx-auto mt-[280px] max-w-[960px] px-4 pb-28 text-center sm:px-6 lg:px-0">
      <div className="mx-auto flex max-w-[654px] flex-col items-center">
        <AvatarLogo small />
        <h2 className="mt-9 font-hanken text-[42px] font-bold tracking-[-0.05em] text-[#09090b]">Start a conversation</h2>
        <p className="mt-5 text-[20px] leading-[1.4] text-[#52525c]">
          Open for chat and conversation for building something great together. I’m always open to new
          interesting opportunities and collaboration
        </p>
        <a className="focus-ring mt-8 inline-flex h-14 items-center justify-center rounded-full border border-[#005fc6] bg-[#007aff] px-8 font-hanken text-[20px] font-semibold text-white shadow-[inset_0_1px_0_#8cc2ff,0_12px_32px_rgba(0,122,255,0.25)]" href="mailto:nafidinara@gmail.com">
          Start Conversation
        </a>
      </div>
      <div className="mt-20 grid gap-5 sm:grid-cols-2">
        {contacts.map(([label, value, Icon]) => (
          <a className="focus-ring flex min-h-[104px] items-center gap-5 rounded-[20px] border border-[#bfcfe6] bg-white p-6 text-left shadow-[0_12px_36px_rgba(0,68,167,0.05)]" href={label === "EMAIL" ? `mailto:${value}` : "#"} key={label}>
            <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-[#e2f0ff] text-[#0044a7]"><Icon size={22} /></span>
            <span>
              <span className="block font-mono text-sm font-bold text-[#0044a7]">{label}</span>
              <span className="mt-1 block font-hanken text-[20px] font-semibold tracking-[-0.03em] text-[#09090b]">{value}</span>
            </span>
          </a>
        ))}
      </div>
      <footer className="mt-20 flex flex-col gap-3 border-t border-[#bfcfe6] pt-8 text-[16px] text-[#71717b] sm:flex-row sm:items-center sm:justify-between">
        <span>2026</span>
        <span>Alfara Nafi Dinara</span>
        <span>UTC+7</span>
        <span>Jakarta, Indonesia</span>
      </footer>
    </section>
  );
}

export default function Home() {
  return (
    <main className="relative">
      <div className="hero-abstract pointer-events-none absolute left-1/2 top-0 -z-0 h-[1120px] w-[1920px] -translate-x-1/2" />
      <div className="pointer-events-none absolute left-1/2 top-[1140px] -z-0 h-[420px] w-[420px] -translate-x-[760px] rounded-full bg-[#e2f0ff]/70 blur-3xl" />
      <div className="pointer-events-none absolute right-[-140px] top-[2980px] -z-0 h-[520px] w-[520px] rounded-full bg-[#f9fecd]/80 blur-3xl" />
      <div className="relative z-10">
        <HeroSection />
        <PillNav />
        <ProjectsSection />
        <ExperiencesSection />
        <ToolsSection />
        <AchievementsSection />
        <WordsSection />
        <AboutSection />
        <BlogSection />
        <ContactSection />
      </div>
    </main>
  );
}
