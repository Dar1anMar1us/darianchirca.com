"use client";

import React, { useState, useRef, useEffect } from "react";

const aboutData = {
  name: "D4r1an",
  handle: "D4r1an",
  role: "SysAdmin & Cybersecurity Engineer",
  location: "RO",
  bio: "Specializing in building secure systems, penetration testing, and DevOps automation. Linux enthusiast, CTF player, and full-stack developer.",
  email: "hello@darianchirca.com",
};

const skillsData = [
  { name: "Penetration Testing & Auditing", category: "Security", level: 85 },
  { name: "Linux Administration (Debian, Ubuntu)", category: "Security", level: 90 },
  { name: "Network Security & Firewalls", category: "Security", level: 80 },
  { name: "Active Directory Attacks (Kerberos, ACL, DCSync)", category: "Security", level: 80 },
  { name: "OWASP Top 10 / Web Exploitation", category: "Security", level: 85 },
  { name: "OSINT & Recon Automation", category: "Security", level: 75 },
  { name: "HTB / CTF (AD, Linux, Web)", category: "Security", level: 80 },
  { name: "Terraform / IaC", category: "DevOps", level: 80 },
  { name: "Kubernetes (K8s)", category: "DevOps", level: 70 },
  { name: "CI/CD (GitHub Actions)", category: "DevOps", level: 85 },
  { name: "Docker & Containerization", category: "DevOps", level: 85 },
  { name: "Nginx / PM2 / Cloudflare", category: "DevOps", level: 85 },
  { name: "TypeScript / JavaScript", category: "Languages", level: 85 },
  { name: "Python", category: "Languages", level: 80 },
  { name: "Bash / Shell Scripting", category: "Languages", level: 90 },
  { name: "SQL (SQLite, PostgreSQL)", category: "Languages", level: 75 },
  { name: "NextJS / React", category: "Frameworks", level: 85 },
  { name: "Node.js / Express", category: "Frameworks", level: 80 },
  { name: "Tailwind CSS", category: "Frameworks", level: 85 },
  { name: "Playwright / Selenium", category: "Frameworks", level: 80 },
  { name: "Git / Advanced Workflows", category: "Tools", level: 90 },
  { name: "Wireshark / tcpdump", category: "Tools", level: 75 },
  { name: "Metasploit / BloodHound / Mimikatz", category: "Tools", level: 80 },
  { name: "Burp Suite", category: "Tools", level: 75 },
];

const experienceData = [
  {
    role: "SysAdmin & DevOps",
    company: "Freelance",
    period: "2023 - Prezent",
    description: [
      "Administrare servere Linux (Debian, Ubuntu) cu Nginx, fail2ban, UFW, Docker.",
      "Automatizare infrastructură cu Terraform și CI/CD pipelines.",
      "Dezvoltare și deploy aplicații full-stack cu NextJS, Node.js, PostgreSQL.",
      "Audit securitate pentru aplicații web și configurări firewall."
    ],
    skills: ["Linux", "Docker", "Terraform", "NextJS", "Nginx", "CI/CD"]
  },
  {
    role: "Cybersecurity Researcher",
    company: "HTB / CTF",
    period: "2022 - Prezent",
    description: [
      "Rezolvare boxe Hack The Box — Active Directory, Linux privesc, web exploitation.",
      "Studiu aprofundat al atacurilor Kerberos (AS-REP Roasting, Kerberoasting, DCSync).",
      "OSCP-style training: privilege escalation, port forwarding, tunneling.",
      "Automatizare recunoaștere cu Python și Bash scripting."
    ],
    skills: ["HTB", "AD", "Kerberos", "BloodHound", "Mimikatz", "Python"]
  },
  {
    role: "Web Developer",
    company: "Freelance",
    period: "2021 - 2023",
    description: [
      "Construcție site-uri și API-uri custom (NextJS, Express, SQLite/PostgreSQL).",
      "Implementare autentificare, baze de date, deploy pe VPS.",
      "Optimizare SEO, performanță și securitate (headers, CSP, CORS)."
    ],
    skills: ["NextJS", "Express", "SQL", "SEO", "Security Headers"]
  }
];

interface CommandLog {
  id: string;
  command: string;
  response: React.ReactNode;
  timestamp: string;
}

interface FullTerminalProps {
  onClose: () => void;
}

export default function FullTerminal({ onClose }: FullTerminalProps) {
  const [history, setHistory] = useState<CommandLog[]>([
    {
      id: "init",
      command: "system_init",
      response: (
        <div className="space-y-2">
          <p className="text-[#6b7280] font-mono text-xs">LOG: Initializing d4r1an terminal...</p>
          <p className="text-[#00ff41] font-medium">Bine ai venit la d4r1an@site shell v1.0</p>
          <p className="text-xs text-[#6b7280]">
            Tastează <span className="text-[#e0e0e0] font-semibold underline decoration-dashed">help</span> pentru comenzi sau apasă pe butoane.
          </p>
        </div>
      ),
      timestamp: new Date().toLocaleTimeString(),
    }
  ]);
  const [inputValue, setInputValue] = useState("");
  const [cmdHistory, setCmdHistory] = useState<string[]>([]);
  const [historyIdx, setHistoryIdx] = useState(-1);
  const endRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [history]);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const submit = (cmdText: string) => {
    const trimmed = cmdText.trim().toLowerCase();
    if (!trimmed) return;

    const updatedHistory = [cmdText, ...cmdHistory];
    setCmdHistory(updatedHistory);
    setHistoryIdx(-1);

    let response: React.ReactNode;

    switch (trimmed) {
      case "help":
        response = (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-[#e0e0e0] py-1 font-mono text-xs">
            <div>
              <p className="text-[#00ff41] font-bold mb-1">=== COMENZI ===</p>
              <ul className="space-y-1">
                <li><span className="text-white font-medium">about</span> — Despre mine</li>
                <li><span className="text-white font-medium">skills</span> — Skill-uri & procentaje</li>
                <li><span className="text-white font-medium">experience</span> — Experiență profesională</li>
                <li><span className="text-white font-medium">contact</span> — Contactează-mă</li>
              </ul>
            </div>
            <div>
              <p className="text-[#00ff41] font-bold mb-1">=== UTILITARE ===</p>
              <ul className="space-y-1">
                <li><span className="text-white font-medium">clear</span> — Șterge istoricul</li>
                <li><span className="text-white font-medium">gui</span> — Închide terminalul</li>
                <li><span className="text-white font-medium">help</span> — Ajutor (asta vezi acum)</li>
                <li><span className="text-white font-medium">whoami</span> — Cine ești tu?</li>
              </ul>
            </div>
          </div>
        );
        break;

      case "about":
        response = (
          <div className="space-y-2 text-[#e0e0e0] font-mono text-xs max-w-2xl border-l border-[#1a1a2e] pl-3">
            <p className="text-[#00ff41] text-sm font-bold">{aboutData.name}</p>
            <p className="text-[#6b7280] italic">{aboutData.role}</p>
            <p className="leading-relaxed mt-1 text-[#e0e0e0]">{aboutData.bio}</p>
          </div>
        );
        break;

      case "skills":
        const categories = [...new Set(skillsData.map(s => s.category))];
        response = (
          <div className="space-y-4 font-mono text-xs max-w-xl">
            <p className="text-[#00ff41] font-bold">SKILL METRICS:</p>
            {categories.map(cat => (
              <div key={cat} className="space-y-2">
                <p className="text-[#00cc33] text-[10px] uppercase tracking-wider">[{cat}]</p>
                {skillsData.filter(s => s.category === cat).map((skill, i) => (
                  <div key={i} className="space-y-1">
                    <div className="flex justify-between text-[#6b7280]">
                      <span>{skill.name}</span>
                      <span className="text-[#00ff41]">{skill.level}%</span>
                    </div>
                    <div className="w-full bg-[#0a0a0f] h-1.5 rounded overflow-hidden border border-[#1a1a2e]">
                      <div className="bg-[#00ff41] h-full rounded transition-all" style={{ width: `${skill.level}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        );
        break;

      case "experience":
        response = (
          <div className="space-y-4 font-mono text-xs max-w-2xl">
            <p className="text-[#00ff41] font-bold">EXPERIENCE TIMELINE:</p>
            {experienceData.map((exp, i) => (
              <div key={i} className="border-l border-[#1a1a2e] pl-3 py-1 space-y-1.5">
                <div className="flex flex-col md:flex-row md:justify-between">
                  <span className="text-white font-bold">{exp.role}</span>
                  <span className="text-[#6b7280]">{exp.period}</span>
                </div>
                <p className="text-[#00cc33] font-medium text-[11px]">{exp.company}</p>
                <ul className="list-disc list-inside space-y-1 text-[#6b7280] leading-relaxed text-[11px]">
                  {exp.description.map((desc, dIdx) => (
                    <li key={dIdx}>{desc}</li>
                  ))}
                </ul>
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {exp.skills.map(s => (
                    <span key={s} className="text-[10px] bg-[#0a0a0f] text-[#6b7280] px-1.5 py-0.5 rounded border border-[#1a1a2e]">{s}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        );
        break;

      case "contact":
        response = (
          <div className="space-y-2 text-[#e0e0e0] font-mono text-xs max-w-md">
            <p className="text-[#00ff41] font-bold">CONTACT:</p>
            <div className="space-y-1 text-[#6b7280]">
              <p>Email: <a href={`mailto:${aboutData.email}`} className="text-white hover:text-[#00ff41] hover:underline">{aboutData.email}</a></p>
              <p>LinkedIn: <a href="https://www.linkedin.com/in/d4r1an/" target="_blank" rel="noopener noreferrer" className="text-white hover:text-[#00ff41] hover:underline">linkedin.com/in/d4r1an</a></p>
              <p className="mt-2 text-[10px] italic">sau completează formularul de contact pe site</p>
            </div>
          </div>
        );
        break;

      case "whoami":
        response = (
          <p className="text-[#e0e0e0] font-mono text-xs">
            d4r1an — SysAdmin & Cybersecurity Engineer. Linux, DevOps, HTB. <span className="text-[#00ff41]">#built-from-scratch</span>
          </p>
        );
        break;

      case "gui":
      case "return":
        onClose();
        setInputValue("");
        return;

      case "clear":
        setHistory([]);
        setInputValue("");
        return;

      default:
        response = (
          <p className="text-red-400 font-mono text-xs">
            Comandă nerecunoscută: '<span className="font-bold">{trimmed}</span>'. Tastează <span className="underline cursor-pointer text-[#00ff41]" onClick={() => submit("help")}>help</span> pentru comenzi.
          </p>
        );
    }

    setHistory(prev => [...prev, {
      id: Math.random().toString(),
      command: cmdText,
      response,
      timestamp: new Date().toLocaleTimeString(),
    }]);
    setInputValue("");
  };

  const handleKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") submit(inputValue);
    else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (!cmdHistory.length) return;
      const next = historyIdx + 1;
      if (next < cmdHistory.length) {
        setHistoryIdx(next);
        setInputValue(cmdHistory[next]);
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      const next = historyIdx - 1;
      if (next >= 0) {
        setHistoryIdx(next);
        setInputValue(cmdHistory[next]);
      } else {
        setHistoryIdx(-1);
        setInputValue("");
      }
    }
  };

  const quickCmds = ["about", "skills", "experience", "contact", "gui"];

  return (
    <div className="fixed inset-0 z-[9998] flex items-center justify-center bg-black/80 backdrop-blur-sm" onClick={onClose}>
      <div 
        className="w-full max-w-3xl mx-4 bg-black border border-[#1a1a2e] rounded-xl shadow-[0_0_60px_rgba(0,255,65,0.08)] flex flex-col h-[80vh] max-h-[700px] overflow-hidden"
        onClick={e => e.stopPropagation()}
      >
        {/* Title Bar */}
        <div className="bg-[#0a0a0f] px-4 py-3 border-b border-[#1a1a2e] flex justify-between items-center shrink-0">
          <div className="flex items-center gap-2">
            <div className="flex gap-1.5">
              <span className="w-3 h-3 rounded-full bg-red-500/30 border border-red-500/40" />
              <span className="w-3 h-3 rounded-full bg-yellow-500/30 border border-yellow-500/40" />
              <span className="w-3 h-3 rounded-full bg-[#00ff41]/30 border border-[#00ff41]/40" />
            </div>
            <span className="text-[#6b7280] font-mono text-xs ml-2">d4r1an@site:~</span>
          </div>
          <button onClick={onClose} className="text-[#6b7280] hover:text-[#00ff41] font-mono text-xs border border-[#1a1a2e] px-2 py-0.5 rounded hover:border-[#00ff41]/30 transition">✕ Close</button>
        </div>

        {/* Quick Commands */}
        <div className="bg-[#0a0a0f]/60 px-4 py-2 border-b border-[#1a1a2e]/50 flex flex-wrap gap-2 items-center text-xs text-[#6b7280] font-mono shrink-0">
          <span className="text-[10px] uppercase tracking-wider text-[#6b7280] font-bold">Quick:</span>
          {quickCmds.map(cmd => (
            <button
              key={cmd}
              onClick={(e) => { e.stopPropagation(); submit(cmd); }}
              className="bg-[#0a0a0f]/60 hover:bg-[#1a1a2e] border border-[#1a1a2e]/40 text-[#6b7280] hover:text-white px-2 py-0.5 rounded text-[11px] font-mono transition-all"
            >
              {cmd}
            </button>
          ))}
          <button onClick={() => setHistory([])} className="ml-auto text-[10px] text-[#6b7280] hover:text-[#00ff41]/60 uppercase tracking-wider">[clear]</button>
        </div>

        {/* Output */}
        <div className="flex-1 p-4 overflow-y-auto space-y-4 font-mono text-xs">
          {history.map(item => (
            <div key={item.id} className="space-y-1.5">
              {item.command !== "system_init" && (
                <div className="flex items-start gap-1 text-[#00ff41]">
                  <span className="text-[#6b7280] font-bold shrink-0">d4r1an@site:~$</span>
                  <span className="text-white break-all">{item.command}</span>
                  <span className="ml-auto text-[10px] text-[#1a1a2e] shrink-0">{item.timestamp}</span>
                </div>
              )}
              <div className="pl-1 text-[#e0e0e0]">{item.response}</div>
            </div>
          ))}
          <div ref={endRef} />
        </div>

        {/* Input */}
        <div className="p-3 bg-[#0a0a0f] border-t border-[#1a1a2e] flex items-center gap-2 shrink-0">
          <span className="text-[#6b7280] font-bold font-mono text-xs pl-1">d4r1an@site:~$</span>
          <input
            ref={inputRef}
            type="text"
            value={inputValue}
            onChange={e => setInputValue(e.target.value)}
            onKeyDown={handleKey}
            placeholder="scrie 'help'..."
            className="flex-1 bg-transparent border-0 outline-none p-0 text-white font-mono text-xs caret-[#00ff41] placeholder-[#1a1a2e]"
            spellCheck={false}
            autoComplete="off"
          />
        </div>
      </div>
    </div>
  );
}
