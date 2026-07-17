"use client";

import { useState, useEffect } from "react";
import FullTerminal from "./components/FullTerminal";

// ─── Data ─────────────────────────────────────────────────
const services = [
  {
    icon: "🔐",
    title: "Security & Pentesting",
    tagline: "find /var/www -type f -exec assess {} \\;",
    items: [
      "Web Application Pentesting (OWASP Top 10)",
      "Active Directory Security (Kerberos, ACL, DCSync)",
      "Network Pentesting & Pivoting",
      "Red Team / Adversary Simulation",
    ],
  },
  {
    icon: "🤖",
    title: "AI Agents & Automation",
    tagline: "python3 agent.py --mode autonomous",
    items: [
      "Custom AI Agent Development (Claude, Hermes, OpenAI)",
      "RAG Pipelines & Knowledge Retrieval",
      "Workflow Automation cu LLM-uri",
      "Prompt Engineering & Guardrails",
    ],
  },
  {
    icon: "🧪",
    title: "QA Automation",
    tagline: "npx playwright test --headed",
    items: [
      "End-to-End Testing (Playwright, Selenium, Cypress)",
      "API Testing & Load Testing (k6, Locust)",
      "CI/CD Pipeline Integration",
      "Test Strategy & Coverage Analysis",
    ],
  },
  {
    icon: "💻",
    title: "Full Stack Development",
    tagline: "next dev --turbo",
    items: [
      "NextJS / React Websites (SSG, SSR, PWA)",
      "Node.js APIs (Express, Fastify, GraphQL)",
      "Python Backend (FastAPI, Flask)",
      "DevOps: PM2, Docker, Nginx, CI/CD",
    ],
  },
];

const projects = [
  {
    title: "Bible API",
    desc: "REST API + full-text search + analytics cu hartă Leaflet. 570+ versete, SQLite, Express.",
    tags: ["Node.js", "SQLite", "Leaflet", "Express"],
    url: "https://bibliaortodoxa.org",
  },
  {
    title: "Pentesting Tools",
    desc: "Cheatsheet-uri AD, Kerberos, Windows recon. 40+ pagini de notițe tehnice.",
    tags: ["Active Directory", "Kerberos", "Mimikatz", "BloodHound"],
    url: "https://github.com/Dar1anMar1us/Pentesting-Tools",
  },
  {
    title: "HTB Writeups",
    desc: "Walkthroughs detaliate: Base, Sauna, Unified, Titan Gears, Markup și altele.",
    tags: ["HTB", "Privesc", "AD", "Web"],
    url: "https://github.com/Dar1anMar1us/Pentesting-Tools",
  },
];

const stats = [
  { value: "5+", label: "Mașini HTB" },
  { value: "3", label: "Proiecte Live" },
  { value: "∞", label: "Cafea" },
];

// ─── Components ───────────────────────────────────────────

function SectionWrapper({ id, children, className = "" }: { id: string; children: React.ReactNode; className?: string }) {
  return (
    <section id={id} className={`py-10 md:py-24 px-4 md:px-8 max-w-6xl mx-auto ${className}`}>
      {children}
    </section>
  );
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="font-mono text-accent text-lg md:text-xl mb-2 glow-text">
      $&nbsp;{children}
    </h2>
  );
}

function Badge({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-block px-2 py-0.5 text-xs font-mono border border-[var(--border)] text-accent-dim rounded mr-1.5 mb-1.5">
      {children}
    </span>
  );
}

// ─── Main Page ────────────────────────────────────────────
export default function Home() {
  const [visibleSections, setVisibleSections] = useState<Set<string>>(new Set(["hero"]));
  const [prompt, setPrompt] = useState("");
  const [tooltip, setTooltip] = useState<string | null>(null);
  const [showFullTerminal, setShowFullTerminal] = useState(false);

  useEffect(() => {
    if (tooltip) {
      const t = setTimeout(() => setTooltip(null), 3000);
      return () => clearTimeout(t);
    }
  }, [tooltip]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleSections((prev) => new Set(prev).add(entry.target.id));
          }
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll("section[id]").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const handleCommand = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && prompt.trim()) {
      const cmd = prompt.trim().toLowerCase();
      if (cmd === "run") {
        setPrompt("");
        setShowFullTerminal(true);
        return;
      }
      setTooltip("403 Forbidden - sudo d4r1an: command not found in reality.txt");
      setPrompt("");
    }
  };
        return (
    <main>
      {/* ── Navbar ── */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[var(--bg-primary)]/90 backdrop-blur border-b border-[var(--border)]">
        <div className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between">
          <a href="#hero" className="font-mono text-accent text-sm hover:brightness-125 transition">
            <span className="text-text-dim">d4r1an</span>@<span className="text-accent">site</span>:~$ <span className="cursor-blink">_</span>
          </a>
          <div className="hidden md:flex gap-6">
            {[
              { label: "cat Despre", href: "#about" },
              { label: "ls Servicii", href: "#services" },
              { label: "tree Portofoliu", href: "#portfolio" },
              { label: "nano Contact", href: "#contact" },
            ].map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="font-mono text-sm text-text-dim hover:text-accent transition"
              >
                $ {item.label}
              </a>
            ))}
          </div>
          {/* Mobile menu button */}
          <a
            href="#contact"
            className="md:hidden font-mono text-xs text-accent border border-accent/30 px-3 py-1 rounded hover:bg-accent/10 transition"
          >
            Hire Me
          </a>
        </div>
      </nav>

      {/* ── Hero ── */}
      <section id="hero" className="pt-18 md:pt-32 px-4 md:px-8 max-w-6xl mx-auto flex flex-col justify-center">
        <div className="relative">
          {/* Matrix drops */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20">
            {Array.from({ length: 8 }).map((_, i) => (
              <div
                key={i}
                className="matrix-column"
                style={{
                  left: `${12.5 * i}%`,
                  animationDelay: `${i * 1.2}s`,
                  animationDuration: `${7 + i * 0.5}s`,
                }}
              >
                {String.fromCharCode(0x30A0 + Math.floor(Math.random() * 96))}
              </div>
            ))}
          </div>

          <div className="relative z-10">
            <p className="font-mono text-sm text-accent-dim mb-2">
              <span className="text-text-dim">d4r1an@site</span>:~$ <span className="text-accent">./start.sh --profile</span>
            </p>
            <h1 className="font-mono text-4xl md:text-6xl font-bold mb-4 leading-tight">
              <span className="text-text-dim">D4r1an<span className="text-accent">.</span></span>
              <br />
              <span className="text-accent glow-text">Ethical Hacker</span>
              <br />
              <span className="text-text">&amp; Developer</span>
            </h1>
            <p className="font-mono text-base md:text-lg text-text-dim max-w-2xl mb-8">
              Pentesting • AI Agents • QA Automation • Full Stack<br />
              <span className="text-accent-dim text-sm">
                "root@darianchirca:~# apt-get install security"
              </span>
            </p>
            <div className="flex flex-wrap gap-4">
              <a
                href="#services"
                className="font-mono text-sm px-6 py-3 border border-accent text-accent rounded hover:bg-accent/10 transition glow"
              >
                [ Servicii ]
              </a>
              <a
                href="#contact"
                className="font-mono text-sm px-6 py-3 bg-accent/10 border border-accent/30 text-accent rounded hover:bg-accent/20 transition"
              >
                [ Hire Me ]
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── About ── */}
      <SectionWrapper id="about">
        <SectionTitle>cat /home/d4r1an/README.md</SectionTitle>
        <div className="grid md:grid-cols-3 gap-8 mt-8">
          <div className="md:col-span-2 space-y-4">
            <p className="text-text-dim leading-relaxed">
              Salut! Sunt D4r1an, pasionat de securitate cibernetică, automation și development.
              Lucrez cu CLI-ul de acasă, caut vulnerabilități în aplicații și Active Directory,
              construiesc agenți AI autonomi și scriu teste end-to-end care prind bug-uri înainte să ajungă în producție.
            </p>
            <p className="text-text-dim leading-relaxed">
              Pe HTB am rezolvat mașini de la Windows AD pînă la Linux pwn, iar în timpul liber
              contribui la comunitatea tech din România cu writeups și tool-uri open-source.
            </p>
            <div className="flex flex-wrap mt-4">
              {["NextJS", "Python", "Node.js", "TypeScript", "Playwright", "Docker", "Bash", "Kali"].map((t) => (
                <Badge key={t}>{t}</Badge>
              ))}
            </div>
          </div>
          <div className="bg-[var(--bg-card)] border border-[var(--border)] rounded-lg p-4 font-mono text-xs leading-relaxed">
            <p className="text-accent-dim mb-2"># whoami</p>
            <p className="text-text-dim">OS: D4r1an/v1.0 x86_64</p>
            <p className="text-text-dim">Kernel: Ethical Hacking</p>
            <p className="text-text-dim">Uptime: 26 years</p>
            <p className="text-text-dim">Shell: /bin/curiosity</p>
            <p className="text-accent mt-3">$ <span className="cursor-blink">_</span></p>
          </div>
        </div>
      </SectionWrapper>

      {/* ── Stats Counter ── */}
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-3 gap-4 py-8 border-y border-[var(--border)]">
          {stats.map((s) => (
            <div key={s.label} className="text-center">
              <div className="font-mono text-2xl md:text-3xl text-accent glow-text">{s.value}</div>
              <div className="font-mono text-xs text-text-dim mt-1">{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Services ── */}
      <SectionWrapper id="services">
        <SectionTitle>ls -la Services/</SectionTitle>
        <p className="text-text-dim text-sm font-mono mt-2 mb-8">
          total 4 — fiecare dosar e o poveste
        </p>
        <div className="grid md:grid-cols-2 gap-6">
          {services.map((svc) => (
            <div key={svc.title} className="service-card rounded-xl p-4 md:p-6">
              <div className="flex items-start gap-4">
                <span className="text-2xl">{svc.icon}</span>
                <div className="flex-1 min-w-0">
                  <h3 className="font-mono text-accent text-lg mb-1">{svc.title}</h3>
                  <p className="font-mono text-xs text-text-dim mb-4">{svc.tagline}</p>
                  <ul className="space-y-2">
                    {svc.items.map((item) => (
                      <li key={item} className="text-sm text-text-dim flex items-start gap-2">
                        <span className="text-accent-dim mt-1 shrink-0">→</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </SectionWrapper>

      {/* ── Portfolio ── */}
      <SectionWrapper id="portfolio">
        <SectionTitle>tree -L 2 Portfolio/</SectionTitle>
        <p className="text-text-dim text-sm font-mono mt-2 mb-8">
          Proiecte cu care mă mîndresc
        </p>
        <div className="grid md:grid-cols-3 gap-6">
          {projects.map((p) => (
            <a
              key={p.title}
              href={p.url}
              target="_blank"
              rel="noopener noreferrer"
              className="service-card rounded-xl p-3 md:p-5 block"
            >
              <h3 className="font-mono text-accent text-base mb-2">{p.title}</h3>
              <p className="text-sm text-text-dim mb-4 leading-relaxed">{p.desc}</p>
              <div className="flex flex-wrap">
                {p.tags.map((t) => (
                  <Badge key={t}>{t}</Badge>
                ))}
              </div>
            </a>
          ))}
        </div>
      </SectionWrapper>

      {/* ── Contact ── */}
      <SectionWrapper id="contact" className="pb-32">
        <SectionTitle>nano Contact.md</SectionTitle>
        <p className="text-text-dim text-sm font-mono mt-2 mb-8">
          # Have a project? Let&apos;s talk
        </p>
        <div className="max-w-lg">
          <div className="bg-[var(--bg-card)] border border-[var(--border)] rounded-xl p-6">
            <p className="font-mono text-xs text-accent-dim mb-4">
              $ echo &quot;Salut! Aș vrea să...&quot; &gt; /dev/null
            </p>
            <form
              action="/api/contact"
              method="POST"
              className="space-y-4"
            >
              <input
                type="text"
                name="name"
                placeholder="Numele tău"
                className="w-full bg-[var(--bg-primary)] border border-[var(--border)] rounded-lg px-4 py-3 text-sm text-text font-mono focus:outline-none focus:border-accent transition"
                required
              />
              <input
                type="email"
                name="email"
                placeholder="email@exemplu.ro"
                className="w-full bg-[var(--bg-primary)] border border-[var(--border)] rounded-lg px-4 py-3 text-sm text-text font-mono focus:outline-none focus:border-accent transition"
                required
              />
              <textarea
                name="message"
                rows={4}
                placeholder="Mesajul tău..."
                className="w-full bg-[var(--bg-primary)] border border-[var(--border)] rounded-lg px-4 py-3 text-sm text-text font-mono focus:outline-none focus:border-accent transition resize-none"
                required
              />
              <button
                type="submit"
                className="w-full font-mono text-sm px-6 py-3 border border-accent text-accent rounded hover:bg-accent/10 transition glow"
              >
                $ ./send-message.sh
              </button>
            </form>
            <div className="flex justify-center gap-4 mt-4">
              <a
                href="https://www.linkedin.com/in/d4r1an/"
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-xs text-text-dim hover:text-accent transition border border-[var(--border)] px-3 py-1.5 rounded hover:border-accent/30"
              >
                $ cat linkedin.txt
              </a>
            </div>
            <p className="font-mono text-xs text-text-dim mt-4 text-center">
              d4r1an@site:~$ nc -lvp 1337
              <br />
              <span className="text-accent-dim">— just kidding, send a message above ☝️</span>
            </p>
          </div>
        </div>
      </SectionWrapper>

      {/* ── Footer ── */}
      <footer className="border-t border-[var(--border)] py-6 text-center">
        <p className="font-mono text-xs text-text-dim">
          <span className="text-accent">d4r1an@site</span>:~$ exit 0
        </p>
        <p className="font-mono text-xs text-text-dim mt-1">
          © {new Date().getFullYear()} D4r1an • <span className="text-accent-dim">#built-from-scratch</span>
        </p>
      </footer>

      {/* ── Terminal input (floating) ── */}
      <div className="fixed bottom-4 left-4 right-4 md:left-auto md:right-8 md:bottom-8 md:w-80 z-50">
        <div className="bg-[var(--bg-card)]/90 backdrop-blur border border-[var(--border)] rounded-lg p-3">
          <p className="font-mono text-[10px] text-accent-dim mb-1">d4r1an@site:~$</p>
          <input
            type="text"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            onKeyDown={handleCommand}
            placeholder="scrie 'run' pentru terminal..."
            className="w-full bg-transparent border-none outline-none font-mono text-xs text-accent placeholder:text-text-dim/30"
          />
        </div>
      </div>
      {/* Tooltip 403 */}
      {tooltip && (
        <div className="fixed bottom-4 right-4 z-[9999]">
          <div className="bg-red-900/60 border border-red-500/30 rounded-lg px-4 py-3 shadow-[0_0_20px_rgba(255,0,0,0.12)]">
            <p className="font-mono text-xs text-red-400">
              <span className="text-red-300">[403]</span> {tooltip}
            </p>
          </div>
        </div>
      )}
      {showFullTerminal && <FullTerminal onClose={() => setShowFullTerminal(false)} />}
    </main>
  );
}
