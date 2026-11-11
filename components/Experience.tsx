"use client";

import React, { useState } from "react";
import { experienceData, ExperienceItem } from "@/data/portfolioData";
import { playClickSound } from "@/lib/soundEffects";
import {
  Briefcase,
  Calendar,
  MapPin,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Sparkles,
  Building2,
  TrendingUp,
} from "lucide-react";

export default function Experience() {
  const [expandedId, setExpandedId] = useState<string | null>("iouring");

  const toggleExpand = (id: string) => {
    playClickSound();
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <section id="experience" className="py-24 relative overflow-hidden bg-slate-950/60">
      {/* Background glow lights */}
      <div className="absolute top-1/2 left-0 w-80 h-80 bg-blue-500/10 rounded-full blur-[140px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-cyan-300 text-xs font-semibold uppercase tracking-wider mb-4 shadow-lg shadow-cyan-500/10">
            <Briefcase className="w-3.5 h-3.5 text-cyan-400" />
            <span>Career Milestones</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Professional <span className="gradient-text-cyan">Experience</span>
          </h2>
          <p className="mt-4 text-slate-300 text-base sm:text-lg">
            3+ years engineering high-availability trading systems, enterprise automation tools, and
            mobile apps in Chennai&apos;s fast-paced tech ecosystems.
          </p>
        </div>

        {/* Timeline List */}
        <div className="relative max-w-4xl mx-auto">
          {/* Vertical timeline spine line */}
          <div className="absolute left-4 sm:left-8 top-6 bottom-6 w-0.5 bg-gradient-to-b from-cyan-500 via-indigo-500 to-slate-800" />

          <div className="space-y-8">
            {experienceData.map((exp, index) => {
              const isExpanded = expandedId === exp.id;
              const isLatest = index === 0;

              return (
                <div key={exp.id} className="relative pl-12 sm:pl-20 group">
                  {/* Timeline Node Dot */}
                  <div
                    className={`absolute left-2.5 sm:left-6.5 top-5 -translate-x-1/2 w-4 h-4 rounded-full border-2 transition-transform duration-300 group-hover:scale-125 ${
                      isLatest
                        ? "bg-cyan-400 border-cyan-300 shadow-lg shadow-cyan-500/50"
                        : "bg-slate-900 border-cyan-500/50 group-hover:border-cyan-400"
                    }`}
                  >
                    {isLatest && (
                      <span className="absolute -inset-1 rounded-full bg-cyan-400 animate-ping opacity-75" />
                    )}
                  </div>

                  {/* Card Container */}
                  <div
                    className={`rounded-3xl p-6 sm:p-7 border transition-all duration-300 ${
                      isExpanded
                        ? "bg-slate-900/90 border-cyan-500/40 shadow-2xl shadow-cyan-500/10"
                        : "bg-slate-900/50 border-white/10 hover:border-white/20 hover:bg-slate-900/70"
                    }`}
                  >
                    {/* Header Row */}
                    <div
                      className="cursor-pointer"
                      onClick={() => toggleExpand(exp.id)}
                    >
                      <div className="flex flex-wrap items-center justify-between gap-3 mb-2">
                        <div className="flex items-center gap-2">
                          <Building2 className="w-4 h-4 text-cyan-400 shrink-0" />
                          <h3 className="text-xl sm:text-2xl font-bold text-white group-hover:text-cyan-300 transition-colors">
                            {exp.company}
                          </h3>
                        </div>

                        <div className="flex items-center gap-2">
                          {isLatest && (
                            <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-[11px] font-semibold flex items-center gap-1">
                              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                              Latest Role
                            </span>
                          )}
                          <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-slate-300 flex items-center gap-1.5">
                            <Calendar className="w-3 h-3 text-slate-400" />
                            {exp.period}
                          </span>
                        </div>
                      </div>

                      <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-400 mb-3">
                        <span className="text-cyan-400 font-semibold text-sm">{exp.role}</span>
                        <span>•</span>
                        <span className="flex items-center gap-1">
                          <MapPin className="w-3 h-3" /> {exp.location}
                        </span>
                        <span>•</span>
                        <span className="text-slate-400">{exp.type}</span>
                      </div>

                      <p className="text-sm text-slate-300 leading-relaxed">{exp.description}</p>
                    </div>

                    {/* Expandable Section */}
                    {isExpanded && (
                      <div className="mt-6 pt-6 border-t border-white/10 space-y-4 animate-in fade-in duration-300">
                        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                          Key Responsibilities & Deliverables
                        </h4>
                        <ul className="space-y-2.5">
                          {exp.achievements.map((item, i) => (
                            <li
                              key={i}
                              className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-200 leading-relaxed"
                            >
                              <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>

                        <div className="pt-2">
                          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                            Technologies Deployed
                          </h4>
                          <div className="flex flex-wrap gap-2">
                            {exp.technologies.map((tech) => (
                              <span
                                key={tech}
                                className="px-3 py-1 rounded-lg text-xs font-medium bg-slate-800 text-cyan-300 border border-cyan-500/20"
                              >
                                {tech}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Toggle Button */}
                    <div className="mt-4 pt-3 flex justify-end">
                      <button
                        onClick={() => toggleExpand(exp.id)}
                        className="text-xs font-semibold text-slate-400 hover:text-white flex items-center gap-1 transition-colors"
                      >
                        <span>{isExpanded ? "Collapse Details" : "Expand Responsibilities"}</span>
                        {isExpanded ? (
                          <ChevronUp className="w-4 h-4" />
                        ) : (
                          <ChevronDown className="w-4 h-4" />
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

