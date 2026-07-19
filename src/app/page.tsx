import Image from "next/image";
import { ArrowRight, Mail } from "lucide-react";
import { FaLinkedinIn } from "react-icons/fa6";
import { SiGithub, SiInstagram } from "react-icons/si";
import { HeroSection } from "./components/hero-section";
import { PillNav } from "./components/pill-nav";
import { About } from "./components/about";
import { Achievements } from "./components/achievements";
import { Experiences } from "./components/experiences";
import { MoreProjects } from "./components/more-projects";
import { ProjectStack } from "./components/project-stack";
import { Testimonials } from "./components/testimonials";
import { Tools } from "./components/tools";
import { Blog } from "./components/blog";
import { sortedArticles } from "@/lib/blog-data";


const featuredProjects = [
  {
    name: "ShopeeLaku",
    file: "shopeelaku-automation.js",
    category: "Automation",
    description:
      "Dropshipping automation that runs multiple stores from one dashboard. Listings, pricing, and performance tracking happen automatically, so sellers spend minutes on work that used to eat whole days.",
    tags: ["NuxtJS", "Prisma", "Psql", "Python", "Docker", "Javascript"],
    accent: "from-[#f9fecd] via-[#e2f0ff] to-white",
    preview: `/projects/featured/shopeelaku.png`,
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
      "Peer-to-peer lending on the Internet Computer. Smart contracts handle the financing, every transaction lives on-chain, and SMEs get access to lenders far beyond their local banks.",
    tags: ["VueJS", "Rust", "Javascript", "Motoko"],
    accent: "from-[#e2f0ff] via-white to-[#f9fecd]",
    preview: `/projects/featured/creditopia.png`,
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
      "Circular waste management, end to end: IoT sensors feed real-time monitoring and operations dashboards, so communities process more waste with less guesswork.",
    tags: ["NextJS", "Golang", "Psql", "Redis", "Flutter"],
    accent: "from-white via-[#e2f0ff] to-[#f9fecd]",
    preview: `/projects/featured/redooceit.png`,
    previewSize: { width: 1395, height: 766 },
    previewBg: "#3ce0b0",
    liveUrl: "https://redooceit.com",
    repoUrl: "#",
  },
];

const moreProjects = [
  {
    name: "Votergate",
    viewLabel: "Votergate",
    description:
      "Voting on blockchain with zero-knowledge proofs: elections stay transparent, every vote is verifiable, and no ballot reveals who cast it.",
    logo: `/projects/logo/votergate.png`,
    logoSize: { width: 306, height: 306 },
    hover: `/projects/hover/votergate.png`,
    hoverSize: { width: 2210, height: 2026 },
    viewUrl: "#",
  },
  {
    name: "Taledotfun",
    viewLabel: "Taledotfun",
    description:
      "Web3 storytelling on Solana. Creators publish and get paid for cultural narratives through NFTs, smart contracts, and DAO governance.",
    logo: `/projects/logo/taledotfun.png`,
    logoSize: { width: 280, height: 288 },
    hover: `/projects/hover/taledotfun.png`,
    hoverSize: { width: 2623, height: 1865 },
    viewUrl: "#",
  },
  {
    name: "Tourease",
    viewLabel: "TourEase",
    description:
      "Travel planner that builds optimized routes and personal itineraries, so you see more of a destination in the time you have.",
    logo: `/projects/logo/tourease.png`,
    logoSize: { width: 336, height: 336 },
    hover: `/projects/hover/tourease.png`,
    hoverSize: { width: 2706, height: 1869 },
    viewUrl: "#",
  },
];

const experiences = [
  {
    company: "World Wide",
    type: "Self Employed",
    role: "Freelance Software Engineer",
    date: "Jan 2022 - Present",
    logo: `/experience/world-wide.png`,
    bullets: [
      "Four years of freelance work with 15+ individuals and companies, building websites, services, and the internal tools their businesses run on.",
      "Shipped clean, maintainable code across Laravel, Node.js, Express, Flask, TypeScript, Solidity, and Vue.js. 90% of client reviews came back positive.",
    ],
  },
  {
    company: "Redooce Indonesia",
    type: "Full Time",
    role: "Founder & Chief Executive Officer",
    date: "Mar 2023 - Nov 2025",
    logo: `/experience/redooce.png`,
    bullets: [
      "As Founder & CEO, I lead Redooceit’s vision, product direction, business strategy, partnerships, and operations, building it from concept into an early-stage sustainability technology venture.",
      "Built Redooceit across 4 main service lines: waste management dashboard, project-based collaboration, event waste management, and sustainability partnership.",
      "Managed a team of 15+ members across product, business, branding, operations, and partnership.",
      "Supported waste management activities covering 5,000+ kg of waste across 3 events and 4 community and TPS partners.",
      "Explored strategic opportunities in TPS digitalization, waste traceability, ESG reporting, event waste management, and circular economy implementation.",
    ],
  },
  {
    company: "HARA",
    type: "Internship",
    role: "Blockchain Engineer",
    date: "Aug 2024 - Feb 2025",
    logo: `/experience/hara.png`,
    bullets: [
      "Developed blockchain traceability solutions for a large enterprise client, making supply-chain data verifiable end to end.",
      "Benchmarked network performance across EVM and non-EVM platforms (Avalanche, Polygon, Hedera, Ripple) and evaluated Hyperledger frameworks for enterprise use.",
      "Performed security testing on smart contracts prior to deployment to the network.",
    ],
  },
  {
    company: "Kecilin",
    type: "Full Time",
    role: "Backend Engineer",
    date: "Jan 2022 - Nov 2022",
    logo: `/experience/kecilin.png`,
    bullets: [
      "Built and deployed a real-time dashboard that monitors 100+ CCTVs running across Indonesia, using Express.js, Node.js, and MongoDB.",
      "Led blockchain storage development for Kecilin's compression pipeline, rolled out to the internal team and 2 Kecilin.id clients. Built with Solidity, IPFS, Hardhat, and Node.js.",
    ],
  },
  {
    company: "Telkom Indonesia",
    type: "Internship",
    role: "Backend Engineer",
    date: "Apr 2021 - Jul 2021",
    logo: `/experience/telkom.png`,
    bullets: [
      "Managed API documentation for 2 products using Swagger and Postman. Drove the team's adoption of scrum, cutting time-to-market by 30% and lifting productivity by 40%.",
      "Worked with the lead engineer to refactor a product from Node.js to TypeScript, adding features and unit tests and raising coverage above 85%.",
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
      "Held by the Internet Computer Protocol (ICP) in August 2024 at Coinfest Asia, the largest blockchain festival in the region. A 48-hour onsite hackathon with more than 100 teams from around the world.",
      "The brief: solve a real traditional-finance problem with ICP’s on-chain technology, and deliver impact to end users, not just impress the judges. We built Creditopia, a peer-to-peer (P2P) lending platform on the Internet Computer that connects MSMEs with a global network of lenders, offering financing that’s secure, transparent, and efficient. Built with Rust, Motoko, JavaScript, and Vue.js.",
      "The most memorable part was competing alongside teammates from completely different backgrounds, different campuses, different jobs, while managing our energy across a full 48 hours and making big decisions under tight time pressure. **We finished in 1st place and won $3,000 in funding.**",
    ],
    images: ["/achievements/icp-01.jpeg", "/achievements/icp-02.jpeg"],
  },
  {
    id: "apicta",
    status: "MERIT",
    accent: "#f97316",
    subtitle: "Asia Pacific",
    title: "Asia Pacific ICT Alliance (APICTA) Awards",
    date: "Dec 2023",
    location: "International · Hong Kong",
    tags: ["Challenged 300+ teams", "16 APICTA economies", "Healthtech × machine learning"],
    project: {
      name: "Myoscope Alert · heart attack detection",
      techs: [
        { name: "Machine Learning", dot: "#22c55e" },
        { name: "Python", dot: "#ffd43b" },
        { name: "Signal Processing", dot: "#0ea5e9" },
      ],
    },
    description: [
      "APICTA is the Asia-Pacific region's 'ICT Oscars', initiated by 16 economies including Australia, China, Hong Kong, Japan, Singapore, and Indonesia. Teams from universities and industry across the region compete in front of international judging panels.",
      "We built Myoscope Alert: a myocardial infarction (heart attack) detection system that pairs a digital stethoscope with a machine learning model trained on 2,500 heartbeat signals, turning an affordable device into an early-warning tool.",
      "Competing against 300+ teams from different universities and industries across Asia Pacific, we brought home a **Merit award for Indonesia** in Hong Kong.",
    ],
    images: ["/achievements/apicta-01.jpg", "/achievements/apicta-02.jpeg"],
  },
  {
    id: "identik",
    status: "1st Runner Up",
    accent: "#14b8a6",
    subtitle: "KOMINFO",
    title: "IdenTIK - Indonesia Entrepreneur TIK",
    date: "Oct 2023",
    location: "National · Yogyakarta, Indonesia",
    tags: ["Contended with 190+ teams", "National ICT innovation", "Gateway to regional awards"],
    project: {
      name: "VoterGate · blockchain voting",
      techs: [
        { name: "NodeJS", dot: "#5fa04e" },
        { name: "Solidity", dot: "#0f172a" },
        { name: "Flutter", dot: "#02569b" },
      ],
    },
    description: [
      "IdenTIK (Indonesia Entrepreneur TIK), run by KOMINFO, grew out of the INAICTA and ID.UP programs: a national hunt for ICT products that can compete at the regional and international level.",
      "We entered VoterGate, a modern voting platform built for high security and scalability using blockchain and decentralized technology, so that elections become transparent, verifiable, and tamper-resistant.",
      "Contending with 190+ teams from different industries across Indonesia, VoterGate took **1st Runner Up nationally**.",
    ],
    images: ["/achievements/identik-01.jpeg", "/achievements/identik-02.jpeg"],
  },
];

const blogPosts = sortedArticles.slice(0, 3).map((article) => ({
  title: article.title,
  description: article.description,
  date: article.date,
  url: `/blogs/${article.slug}`,
}));

const contacts = [
  ["EMAIL", "nafidinara@gmail.com", Mail, "mailto:nafidinara@gmail.com?subject=Project%20inquiry"],
  ["LINKEDIN", "linkedin.com/in/alfarand", FaLinkedinIn, "https://www.linkedin.com/in/alfarand/"],
  ["GITHUB", "github.com/nafidinara", SiGithub, "https://github.com/nafidinara"],
  ["INSTAGRAM", "instagram.com/alfaraaa.nd", SiInstagram, "https://www.instagram.com/alfaraaa.nd/"],
] as const;

function AvatarLogo({ small = false }: { small?: boolean }) {
  const size = small ? 120 : 169;

  return (
    <Image
      src={`/avatar/profile.png`}
      alt={small ? "" : "Alfara profile portrait"}
      width={338}
      height={338}
      priority={!small}
      className={`object-contain drop-shadow-[0_28px_80px_rgba(0,68,167,0.16)] ${
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
        Five years of shipping, from a national telco to my own funded startup.
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
        Proof under pressure: international hackathon wins and awards, judged against 100+ teams.
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
      <SectionHeading eyebrow="BLOG">
        Notes I write down so I don&apos;t pay for the same lesson twice.
      </SectionHeading>
      <Blog posts={blogPosts} />
      <a
        className="focus-ring mt-10 inline-flex h-12 items-center justify-center gap-2 rounded-full border border-[#bfcfe6] bg-white px-7 font-hanken text-[16px] font-semibold text-[#09090b] shadow-[0_12px_36px_rgba(0,68,167,0.05)] transition-colors hover:border-[#0044a7] hover:text-[#0044a7]"
        href="/blogs"
      >
        Read all articles
        <ArrowRight size={18} />
      </a>
    </section>
  );
}

function ContactSection() {
  return (
    <section id="contact" className="mx-auto mt-[280px] max-w-[960px] px-4 pb-28 text-center sm:px-6 lg:px-0">
      <div className="mx-auto flex max-w-[654px] flex-col items-center">
        <AvatarLogo small />
        <h2 className="mt-9 font-hanken text-[42px] font-bold tracking-[-0.05em] text-[#09090b]">Have a project in mind?</h2>
        <p className="mt-5 text-[20px] leading-[1.4] text-[#52525c]">
          Tell me what you’re building and where you’re stuck. I usually reply within minutes, and
          I’m reachable 24/7. The only time I go quiet is when I’m asleep or in the shower. Even if
          we don’t end up working together, you’ll leave with a clearer plan.
        </p>
        <a className="focus-ring mt-8 inline-flex h-14 items-center justify-center rounded-full border border-[#005fc6] bg-[#007aff] px-8 font-hanken text-[20px] font-semibold text-white shadow-[inset_0_1px_0_#8cc2ff,0_12px_32px_rgba(0,122,255,0.25)]" href="mailto:nafidinara@gmail.com?subject=Project%20inquiry&body=Hi%20Alfara%2C%0A%0AWhat%20I%27m%20building%3A%20%0AWhere%20I%27m%20stuck%3A%20%0ATimeline%3A%20%0A">
          Send Me Your Project
        </a>
      </div>
      <div className="mt-20 grid gap-5 sm:grid-cols-2">
        {contacts.map(([label, value, Icon, href]) => (
          <a className="focus-ring flex min-h-[104px] items-center gap-5 rounded-[20px] border border-[#bfcfe6] bg-white p-6 text-left shadow-[0_12px_36px_rgba(0,68,167,0.05)]" href={href} key={label} rel={label === "EMAIL" ? undefined : "noopener noreferrer"} target={label === "EMAIL" ? undefined : "_blank"}>
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
        <span>WITA (UTC+8)</span>
        <span>Bali, Indonesia</span>
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
