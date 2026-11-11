"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { personalInfo } from "@/data/portfolioData";
import {
  playClickSound,
  toggleSound,
  isSoundEnabled,
} from "@/lib/soundEffects";
import {
  Menu,
  X,
  FileText,
  Volume2,
  VolumeX,
  Sparkles,
  Phone,
  Mail,
  ExternalLink,
} from "lucide-react";
import GithubIcon from "@/components/GithubIcon";

interface NavbarProps {
  onOpenResume: () => void;
  accentColor: string;
  setAccentColor: (color: string) => void;
}

export const accents = [
  {
    id: "cyan",
    name: "Cyan Cyber",
    primary: "#38bdf8",
    glow: "rgba(56, 189, 248, 0.4)",
  },
  {
    id: "emerald",
    name: "Emerald Pro",
    primary: "#10b981",
    glow: "rgba(16, 185, 129, 0.4)",
  },
  {
    id: "purple",
    name: "Violet Nebula",
    primary: "#a855f7",
    glow: "rgba(168, 85, 247, 0.4)",
  },
  {
    id: "amber",
    name: "Amber Gold",
    primary: "#f59e0b",
    glow: "rgba(245, 158, 11, 0.4)",
  },
];

export default function Navbar({
  onOpenResume,
  accentColor,
  setAccentColor,
}: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [soundActive, setSoundActive] = useState(true);
  const [paletteOpen, setPaletteOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSoundToggle = () => {
    const newState = toggleSound();
    setSoundActive(newState);
    if (newState) playClickSound();
  };

  const navLinks = [
    { label: "About", href: "#about" },
    { label: "Experience", href: "#experience" },
    { label: "Projects", href: "#projects" },
    { label: "Interactive Labs", href: "#labs" },
    { label: "Skills", href: "#skills" },
    { label: "Education", href: "#education" },
    { label: "Contact", href: "#contact" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#070a12]/85 backdrop-blur-xl border-b border-white/[0.08] shadow-2xl shadow-black/40 py-3"
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo & Status */}
          <a
            href="#about"
            onClick={playClickSound}
            className="flex items-center gap-3 group focus:outline-none"
          >
            <div className="relative w-10 h-10 rounded-xl overflow-hidden ring-2 ring-cyan-500/40 p-0.5 bg-gradient-to-tr from-cyan-500 to-indigo-500 transition-transform duration-300 group-hover:scale-105">
              <Image
                src="/profile.png"
                alt="Karthikeyan Manikandan"
                width={40}
                height={40}
                className="w-full h-full object-cover rounded-[10px]"
                priority
              />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-white tracking-tight group-hover:text-cyan-400 transition-colors">
                  Karthikeyan M.
                </span>
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
              </div>
              <p className="text-xs text-slate-400 hidden sm:block">
                Full Stack & Mobile Dev
              </p>
            </div>
          </a>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2 bg-slate-900/60 p-1.5 rounded-full border border-white/[0.08] backdrop-blur-md">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={playClickSound}
                className="px-3.5 py-1.5 text-xs font-medium text-slate-300 hover:text-white hover:bg-white/[0.08] rounded-full transition-all duration-200"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Right Action Tools */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Color Accent Switcher */}
            <div className="relative">
              <button
                onClick={() => {
                  playClickSound();
                  setPaletteOpen(!paletteOpen);
                }}
                title="Change theme accent"
                className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-white/[0.06] transition-colors border border-transparent hover:border-white/10"
              >
                <Sparkles className="w-4 h-4 text-cyan-400" />
              </button>

              {paletteOpen && (
                <div className="absolute right-0 mt-2 p-2 bg-slate-900 border border-slate-700/70 rounded-xl shadow-2xl flex flex-col gap-1 z-50 min-w-[150px]">
                  <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-400 px-2 py-1">
                    Glow Theme
                  </p>
                  {accents.map((acc) => (
                    <button
                      key={acc.id}
                      onClick={() => {
                        setAccentColor(acc.id);
                        setPaletteOpen(false);
                        playClickSound();
                      }}
                      className={`flex items-center gap-2 w-full px-2 py-1.5 rounded-lg text-xs transition-colors ${
                        accentColor === acc.id
                          ? "bg-white/15 text-white font-medium"
                          : "text-slate-300 hover:bg-white/5"
                      }`}
                    >
                      <span
                        className="w-3 h-3 rounded-full shadow-sm"
                        style={{ backgroundColor: acc.primary }}
                      />
                      <span>{acc.name}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Sound Toggle */}
            <button
              onClick={handleSoundToggle}
              title={
                soundActive
                  ? "Mute interactive audio"
                  : "Enable interactive audio"
              }
              className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-white/[0.06] transition-colors border border-transparent hover:border-white/10 hidden sm:flex"
            >
              {soundActive ? (
                <Volume2 className="w-4 h-4 text-emerald-400" />
              ) : (
                <VolumeX className="w-4 h-4 text-slate-500" />
              )}
            </button>

            {/* GitHub */}
            <a
              href={personalInfo.github}
              target="_blank"
              rel="noopener noreferrer"
              onClick={playClickSound}
              title="GitHub Profile"
              className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-white/[0.06] transition-colors border border-transparent hover:border-white/10"
            >
              <GithubIcon className="w-4 h-4" />
            </a>

            {/* Resume Button */}
            <button
              onClick={() => {
                playClickSound();
                onOpenResume();
              }}
              className="flex items-center gap-2 px-3.5 py-1.5 text-xs font-semibold text-white bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 rounded-full shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/40 transition-all duration-300 active:scale-95"
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Resume</span>
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => {
                playClickSound();
                setMobileMenuOpen(!mobileMenuOpen);
              }}
              className="p-2 text-slate-400 hover:text-white lg:hidden rounded-lg hover:bg-white/[0.06]"
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#0a0f1d] border-b border-white/10 px-6 py-6 mt-3 shadow-2xl animate-in slide-in-from-top duration-200">
          <div className="flex flex-col gap-2">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => {
                  playClickSound();
                  setMobileMenuOpen(false);
                }}
                className="px-4 py-2.5 rounded-lg text-sm font-medium text-slate-300 hover:text-white hover:bg-white/10 transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="mt-4 pt-4 border-t border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs text-slate-400">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Chennai, India</span>
            </div>
            <button
              onClick={() => {
                playClickSound();
                setMobileMenuOpen(false);
                onOpenResume();
              }}
              className="text-xs font-medium text-cyan-400 flex items-center gap-1 hover:underline"
            >
              <FileText className="w-3.5 h-3.5" />
              <span>View Full Resume</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
