"use client";

import React from "react";
import { educationData } from "@/data/portfolioData";
import { GraduationCap, Award, Calendar, BookOpen, CheckCircle2 } from "lucide-react";

export default function Education() {
  return (
    <section id="education" className="py-24 relative overflow-hidden bg-slate-950/40">
      {/* Background radial glow */}
      <div className="absolute top-1/2 right-10 w-96 h-96 bg-indigo-500/10 rounded-full blur-[140px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-cyan-300 text-xs font-semibold uppercase tracking-wider mb-4 shadow-lg shadow-cyan-500/10">
            <GraduationCap className="w-3.5 h-3.5 text-cyan-400" />
            <span>Academic Background</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Education & <span className="gradient-text-cyan">Foundations</span>
          </h2>
          <p className="mt-4 text-slate-300 text-base sm:text-lg">
            Engineering foundation in systems, logic, circuits, and mathematics that power scalable
            software problem-solving.
          </p>
        </div>

        {/* Education Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {educationData.map((edu, idx) => (
            <div
              key={idx}
              className="rounded-3xl bg-slate-900/70 border border-white/10 hover:border-cyan-500/40 p-6 flex flex-col justify-between backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-cyan-500/10 group"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-4">
                  <div className="p-2.5 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400">
                    {idx === 0 ? (
                      <GraduationCap className="w-5 h-5" />
                    ) : (
                      <BookOpen className="w-5 h-5" />
                    )}
                  </div>
                  <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                    {edu.score}
                  </span>
                </div>

                <div className="flex items-center gap-1.5 text-xs text-slate-400 font-mono mb-2">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>{edu.period}</span>
                </div>

                <h3 className="text-base sm:text-lg font-bold text-white group-hover:text-cyan-300 transition-colors leading-snug">
                  {edu.degree}
                </h3>

                <p className="text-xs sm:text-sm text-cyan-400 font-medium mt-1">
                  {edu.institution}
                </p>

                <p className="text-xs text-slate-300 mt-4 leading-relaxed bg-white/[0.03] p-3 rounded-xl border border-white/5">
                  {edu.highlight}
                </p>
              </div>

              <div className="mt-6 pt-3 border-t border-white/5 flex items-center justify-between text-xs text-slate-400">
                <span className="flex items-center gap-1 text-emerald-400">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Verified
                </span>
                <span className="text-[11px] font-mono text-slate-500">Tamil Nadu, India</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

