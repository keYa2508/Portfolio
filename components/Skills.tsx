"use client";

import React, { useState } from "react";
import { skillCategories, coreCompetencies } from "@/data/portfolioData";
import { playClickSound } from "@/lib/soundEffects";
import {
  Code2,
  Sparkles,
  Smartphone,
  Server,
  Zap,
  Globe,
  Terminal,
  Search,
  CheckCircle,
  Cpu,
} from "lucide-react";

export default function Skills() {
  const [filterQuery, setFilterQuery] = useState("");
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  const iconMap: Record<string, React.ReactNode> = {
    Layout: <Code2 className="w-5 h-5 text-cyan-400" />,
    Smartphone: <Smartphone className="w-5 h-5 text-sky-400" />,
    Server: <Server className="w-5 h-5 text-indigo-400" />,
    Zap: <Zap className="w-5 h-5 text-amber-400" />,
    Globe: <Globe className="w-5 h-5 text-emerald-400" />,
    Terminal: <Terminal className="w-5 h-5 text-purple-400" />,
  };

  return (
    <section id="skills" className="py-24 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-[140px] pointer-events-none -z-10" />
      <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-[140px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-cyan-300 text-xs font-semibold uppercase tracking-wider mb-4 shadow-lg shadow-cyan-500/10">
            <Cpu className="w-3.5 h-3.5 text-cyan-400" />
            <span>Technical Mastery</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Skills & <span className="gradient-text-cyan">Ecosystem</span>
          </h2>
          <p className="mt-4 text-slate-300 text-base sm:text-lg">
            A comprehensive overview of the modern frontend, mobile, real-time backend, and third-party
            frameworks I leverage to deliver production-grade applications.
          </p>

          {/* Quick Skill Search */}
          <div className="mt-6 max-w-md mx-auto relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={filterQuery}
              onChange={(e) => setFilterQuery(e.target.value)}
              placeholder="Filter skills (e.g. React Native, Socket.IO, TypeScript)..."
              className="w-full bg-slate-900/80 border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-all"
            />
          </div>
        </div>

        {/* Core Competencies Carousel / Pills */}
        <div className="mb-14 p-6 rounded-3xl bg-slate-900/50 border border-white/10 backdrop-blur-xl">
          <div className="flex items-center gap-2 mb-4">
            <Sparkles className="w-4 h-4 text-cyan-400" />
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-300">
              Core Engineering Competencies
            </h3>
          </div>
          <div className="flex flex-wrap gap-2.5">
            {coreCompetencies.map((comp, idx) => (
              <span
                key={idx}
                className="px-3.5 py-1.5 rounded-xl bg-slate-800/80 border border-cyan-500/20 text-xs font-semibold text-slate-200 hover:text-white hover:border-cyan-400 transition-all duration-200"
              >
                ✓ {comp}
              </span>
            ))}
          </div>
        </div>

        {/* Skills Grid by Category */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skillCategories.map((category) => {
            const visibleSkills = category.skills.filter(
              (s) =>
                filterQuery === "" ||
                s.name.toLowerCase().includes(filterQuery.toLowerCase()) ||
                s.tag.toLowerCase().includes(filterQuery.toLowerCase())
            );

            if (filterQuery !== "" && visibleSkills.length === 0) return null;

            return (
              <div
                key={category.title}
                className="rounded-3xl bg-slate-900/60 border border-white/10 hover:border-cyan-500/30 p-6 backdrop-blur-xl transition-all duration-300 hover:shadow-2xl hover:shadow-cyan-500/5 flex flex-col justify-between"
              >
                <div>
                  {/* Category Header */}
                  <div className="flex items-center gap-3 pb-4 mb-5 border-b border-white/10">
                    <div className="p-2.5 rounded-xl bg-slate-800 border border-white/10">
                      {iconMap[category.iconName] || <Code2 className="w-5 h-5 text-cyan-400" />}
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-white tracking-tight">
                        {category.title}
                      </h3>
                      <span className="text-[11px] text-slate-400 font-mono">
                        {visibleSkills.length} Technologies
                      </span>
                    </div>
                  </div>

                  {/* Skills List */}
                  <div className="space-y-3.5">
                    {visibleSkills.map((skill) => (
                      <div key={skill.name} className="group">
                        <div className="flex items-center justify-between text-xs mb-1">
                          <span className="font-semibold text-slate-200 group-hover:text-cyan-300 transition-colors">
                            {skill.name}
                          </span>
                          <span className="text-[10px] font-mono text-slate-400 bg-white/5 px-2 py-0.5 rounded">
                            {skill.tag}
                          </span>
                        </div>

                        {/* Progress Bar */}
                        <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full transition-all duration-500 group-hover:from-cyan-400 group-hover:to-indigo-400"
                            style={{ width: `${skill.level}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-6 pt-3 border-t border-white/5 text-[11px] text-slate-500 flex justify-between items-center">
                  <span>Production Tested</span>
                  <span className="text-cyan-400 font-mono">3+ Yrs Exp</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

