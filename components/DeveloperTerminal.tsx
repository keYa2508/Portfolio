"use client";

import React, { useState, useRef, useEffect } from "react";
import { personalInfo, experienceData, coreCompetencies } from "@/data/portfolioData";
import { playClickSound, playPopSound, playSuccessSound } from "@/lib/soundEffects";
import confetti from "canvas-confetti";
import { Terminal, Send, Sparkles, CornerDownLeft } from "lucide-react";

interface TerminalLine {
  type: "input" | "output" | "system" | "success" | "error";
  text: string;
}

export default function DeveloperTerminal() {
  const [history, setHistory] = useState<TerminalLine[]>([
    {
      type: "system",
      text: "⚡ Karthik OS v3.8.0 (x86_64-linux-antigravity) — Type 'help' to inspect commands.",
    },
    {
      type: "output",
      text: "Candidate: Karthikeyan Manikandan | Full Stack & Mobile Engineer (React, RN, Socket.IO)",
    },
  ]);
  const [inputVal, setInputVal] = useState("");
  const terminalBottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    terminalBottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [history]);

  const handleCommand = (cmdStr: string) => {
    const trimmed = cmdStr.trim().toLowerCase();
    if (!trimmed) return;
    playClickSound();

    const newLines: TerminalLine[] = [{ type: "input", text: `$ ${cmdStr}` }];

    switch (trimmed) {
      case "help":
        newLines.push(
          { type: "system", text: "Available commands:" },
          { type: "output", text: "  bio         - Print executive professional summary" },
          { type: "output", text: "  stack       - Core technologies & mobile frameworks" },
          { type: "output", text: "  trading     - High-frequency trading & Socket.IO details" },
          { type: "output", text: "  experience  - Career timeline & companies" },
          { type: "output", text: "  contact     - Reach Karthik directly (Email/Phone)" },
          { type: "output", text: "  hire        - Transmit hire intent & launch celebration" },
          { type: "output", text: "  clear       - Clear the terminal screen" }
        );
        break;

      case "bio":
        newLines.push({
          type: "output",
          text: personalInfo.bio,
        });
        break;

      case "stack":
        newLines.push(
          { type: "success", text: "Frontend: React.js, Next.js, TypeScript, Tailwind CSS" },
          { type: "success", text: "Mobile: React Native, React Navigation, Turbo Modules, RN-FS" },
          { type: "success", text: "Real-Time: Socket.IO, WebSocket, Mitt Event Bus" },
          { type: "success", text: "Backend: Node.js, Express.js, Nest.js, Python, FastAPI" },
          { type: "success", text: "Database: MongoDB, PostgreSQL, SQL, Redis" }
        );
        break;

      case "trading":
        newLines.push(
          {
            type: "output",
            text: "1. Cryptocurrency Trading Mobile App (Pibase): Socket.IO, Redux Thunk, white-labeling.",
          },
          {
            type: "output",
            text: "2. Indian Stock Trading Platform (Iouring): Low-latency watchlist, sub-50ms tick render.",
          }
        );
        break;

      case "experience":
        experienceData.forEach((exp) => {
          newLines.push({
            type: "output",
            text: `• [${exp.period}] ${exp.role} @ ${exp.company}`,
          });
        });
        break;

      case "contact":
        newLines.push(
          { type: "output", text: `Email: ${personalInfo.email}` },
          { type: "output", text: `Phone: ${personalInfo.phoneFormatted}` },
          { type: "output", text: `GitHub: ${personalInfo.github}` },
          { type: "output", text: `Location: ${personalInfo.location}` }
        );
        break;

      case "hire":
        playSuccessSound();
        try {
          confetti({
            particleCount: 80,
            spread: 60,
            origin: { y: 0.7 },
          });
        } catch {
          // fallback
        }
        newLines.push({
          type: "success",
          text: "🎉 Thank you! Karthik is available for immediate hire & high-impact projects. Head to the contact section below to get in touch!",
        });
        break;

      case "clear":
        setHistory([]);
        setInputVal("");
        return;

      default:
        newLines.push({
          type: "error",
          text: `Command not found: '${trimmed}'. Type 'help' for command list.`,
        });
        break;
    }

    setHistory((prev) => [...prev, ...newLines]);
    setInputVal("");
  };

  return (
    <section className="py-20 relative overflow-hidden">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Container */}
        <div className="rounded-3xl bg-slate-950/90 border border-white/15 shadow-2xl overflow-hidden backdrop-blur-xl">
          {/* Header Bar */}
          <div className="px-5 py-3.5 bg-slate-900/90 border-b border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-red-500/80 inline-block" />
              <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block" />
              <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block" />
              <span className="ml-2 text-xs font-mono text-slate-400">karthik@portfolio-cli:~</span>
            </div>

            <div className="flex items-center gap-1.5 text-[11px] font-mono text-cyan-400">
              <Terminal className="w-3.5 h-3.5" />
              <span>Interactive Shell</span>
            </div>
          </div>

          {/* Quick preset buttons */}
          <div className="px-5 py-2.5 bg-slate-950 border-b border-white/5 flex flex-wrap gap-2 text-xs">
            <span className="text-slate-500 font-mono text-[11px] self-center">Quick Runs:</span>
            {["help", "stack", "trading", "experience", "hire"].map((c) => (
              <button
                key={c}
                onClick={() => handleCommand(c)}
                className="px-2.5 py-1 rounded bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-white/10 font-mono text-[11px] transition-colors"
              >
                ${c}
              </button>
            ))}
          </div>

          {/* Terminal Console Output */}
          <div className="p-5 font-mono text-xs sm:text-sm h-72 overflow-y-auto space-y-1.5 text-slate-300">
            {history.map((line, idx) => (
              <div
                key={idx}
                className={`${
                  line.type === "input"
                    ? "text-cyan-400 font-bold"
                    : line.type === "system"
                    ? "text-slate-500"
                    : line.type === "success"
                    ? "text-emerald-400 font-semibold"
                    : line.type === "error"
                    ? "text-red-400"
                    : "text-slate-300"
                }`}
              >
                {line.text}
              </div>
            ))}
            <div ref={terminalBottomRef} />
          </div>

          {/* Input Form */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleCommand(inputVal);
            }}
            className="p-3 bg-slate-900/60 border-t border-white/10 flex items-center gap-2"
          >
            <span className="text-cyan-400 font-mono text-sm pl-2">$</span>
            <input
              type="text"
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              placeholder="Type command (e.g. 'stack', 'trading', 'hire')..."
              className="flex-1 bg-transparent text-sm font-mono text-white placeholder-slate-500 focus:outline-none"
            />
            <button
              type="submit"
              className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
            >
              <CornerDownLeft className="w-4 h-4" />
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
