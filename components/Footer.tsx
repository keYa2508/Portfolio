"use client";

import React from "react";
import Image from "next/image";
import { personalInfo } from "@/data/portfolioData";
import { playClickSound } from "@/lib/soundEffects";
import {
  ArrowUp,
  Mail,
  Phone,
  Heart,
  Sparkles,
  ExternalLink,
} from "lucide-react";
import GithubIcon from "@/components/GithubIcon";

export default function Footer({ onOpenResume }: { onOpenResume: () => void }) {
  const scrollToTop = () => {
    playClickSound();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="border-t border-white/10 bg-[#050810] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          {/* Brand Info */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <div className="relative w-10 h-10 rounded-xl overflow-hidden ring-2 ring-cyan-500/40 p-0.5 bg-gradient-to-tr from-cyan-500 to-indigo-500">
                <Image
                  src="/karthik.jpg"
                  alt="Karthikeyan Manikandan"
                  width={40}
                  height={40}
                  className="w-full h-full object-cover rounded-[10px]"
                />
              </div>
              <div>
                <h3 className="font-bold text-white text-base">Karthikeyan Manikandan</h3>
                <p className="text-xs text-cyan-400 font-medium">Full Stack & Mobile Developer</p>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-slate-400 max-w-sm leading-relaxed">
              Crafting high-performance real-time trading interfaces, enterprise ERP platforms, and
              scalable mobile applications with React Native and modern web technologies.
            </p>

            <div className="flex items-center gap-2 text-xs text-emerald-400">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Available for Full-Time Roles & Consulting</span>
            </div>
          </div>

          {/* Quick Navigation Links */}
          <div className="md:col-span-4 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300">
              Quick Navigation
            </h4>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <a
                href="#about"
                onClick={playClickSound}
                className="text-slate-400 hover:text-cyan-400 transition-colors"
              >
                About Me
              </a>
              <a
                href="#experience"
                onClick={playClickSound}
                className="text-slate-400 hover:text-cyan-400 transition-colors"
              >
                Experience
              </a>
              <a
                href="#projects"
                onClick={playClickSound}
                className="text-slate-400 hover:text-cyan-400 transition-colors"
              >
                Projects
              </a>
              <a
                href="#labs"
                onClick={playClickSound}
                className="text-slate-400 hover:text-cyan-400 transition-colors"
              >
                Interactive Labs
              </a>
              <a
                href="#skills"
                onClick={playClickSound}
                className="text-slate-400 hover:text-cyan-400 transition-colors"
              >
                Skills Matrix
              </a>
              <a
                href="#education"
                onClick={playClickSound}
                className="text-slate-400 hover:text-cyan-400 transition-colors"
              >
                Education
              </a>
              <a
                href="#contact"
                onClick={playClickSound}
                className="text-slate-400 hover:text-cyan-400 transition-colors"
              >
                Get in Touch
              </a>
              <button
                onClick={() => {
                  playClickSound();
                  onOpenResume();
                }}
                className="text-cyan-400 hover:underline text-left font-medium"
              >
                View Full CV
              </button>
            </div>
          </div>

          {/* Connect & Social */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300">
              Direct Channels
            </h4>
            <div className="space-y-2 text-xs text-slate-400">
              <a
                href={`mailto:${personalInfo.email}`}
                onClick={playClickSound}
                className="flex items-center gap-2 hover:text-white transition-colors"
              >
                <Mail className="w-3.5 h-3.5 text-cyan-400" />
                <span className="truncate">{personalInfo.email}</span>
              </a>
              <a
                href={`tel:${personalInfo.phone}`}
                onClick={playClickSound}
                className="flex items-center gap-2 hover:text-white transition-colors"
              >
                <Phone className="w-3.5 h-3.5 text-emerald-400" />
                <span>{personalInfo.phoneFormatted}</span>
              </a>
              <a
                href={personalInfo.github}
                target="_blank"
                rel="noopener noreferrer"
                onClick={playClickSound}
                className="flex items-center gap-2 hover:text-white transition-colors"
              >
                <GithubIcon className="w-3.5 h-3.5 text-purple-400" />
                <span>github.com/keYa2508</span>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom row */}
        <div className="mt-12 pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>
            © 2026 Karthikeyan Manikandan. All rights reserved.
          </p>

          <div className="flex items-center gap-4">
            <span className="text-[11px] text-slate-500">
              Engineered with Next.js, React 19 & Tailwind CSS
            </span>
            <button
              onClick={scrollToTop}
              className="p-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white border border-white/10 transition-colors flex items-center gap-1.5"
              title="Back to Top"
            >
              <ArrowUp className="w-4 h-4" />
              <span className="text-[11px] font-semibold">Top</span>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
