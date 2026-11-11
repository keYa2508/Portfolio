"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { personalInfo, stats } from "@/data/portfolioData";
import { playClickSound } from "@/lib/soundEffects";
import {
  ArrowRight,
  Code2,
  Sparkles,
  Zap,
  Smartphone,
  Server,
  Bot,
  Terminal,
  MapPin,
  Mail,
  Phone,
  CheckCircle2,
  Download,
} from "lucide-react";

interface HeroProps {
  onOpenResume: () => void;
  accentColor: string;
}

const rotatingRoles = [
  "Full Stack Developer",
  "React Native Mobile Specialist",
  "Real-Time Trading Systems Engineer",
  "AI RAG & Automation Builder",
];

export default function Hero({ onOpenResume, accentColor }: HeroProps) {
  const [roleIndex, setRoleIndex] = useState(0);
  const [tiltStyle, setTiltStyle] = useState({ transform: "" });
  const photoCardRef = useRef<HTMLDivElement>(null);

  // Rotating roles interval
  useEffect(() => {
    const interval = setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % rotatingRoles.length);
    }, 3200);
    return () => clearInterval(interval);
  }, []);

  // 3D Tilt interactive effect on mouse move
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!photoCardRef.current) return;
    const rect = photoCardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -12;
    const rotateY = ((x - centerX) / centerX) * 12;

    setTiltStyle({
      transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`,
    });
  };

  const handleMouseLeave = () => {
    setTiltStyle({
      transform: "perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)",
    });
  };

  return (
    <section
      id="about"
      className="relative min-h-[92vh] pt-32 pb-20 flex flex-col justify-center overflow-hidden bg-grid-pattern"
    >
      {/* Background ambient lighting glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-tr from-cyan-500/10 via-blue-600/15 to-purple-600/10 rounded-full blur-[140px] pointer-events-none -z-10 animate-pulse-glow" />
      <div className="absolute top-1/3 left-10 w-72 h-72 bg-emerald-500/10 rounded-full blur-[100px] pointer-events-none -z-10" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-purple-500/10 rounded-full blur-[120px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Headline & Bio */}
          <div className="lg:col-span-7 flex flex-col items-start space-y-6">
            {/* Status Pill */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/80 border border-emerald-500/30 backdrop-blur-md shadow-lg shadow-emerald-500/5">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span className="text-xs font-semibold tracking-wide text-emerald-300">
                Available for New Opportunities • Chennai, India
              </span>
            </div>

            {/* Main Greeting & Name */}
            <div className="space-y-2">
              <p className="text-sm font-semibold tracking-widest text-cyan-400 uppercase">
                Hello, I&apos;m
              </p>
              <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white leading-[1.1]">
                {personalInfo.name}
              </h1>
              {/* Dynamic Typewriter / Rotating Badge */}
              <div className="flex items-center gap-2 pt-2 min-h-[44px]">
                <span className="text-xl sm:text-2xl font-bold text-slate-400">I build as a</span>
                <span className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-cyan-400 via-sky-300 to-indigo-400 bg-clip-text text-transparent underline decoration-cyan-500/40 underline-offset-4 animate-in fade-in duration-500 key={roleIndex}">
                  {rotatingRoles[roleIndex]}
                </span>
              </div>
            </div>

            {/* Impact Pitch */}
            <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl font-normal">
              Full Stack & Cross-Platform Engineer with{" "}
              <span className="text-white font-semibold">3+ years of experience</span> developing
              high-frequency <span className="text-cyan-300 font-medium">cryptocurrency & Indian stock trading platforms</span>,
              enterprise <span className="text-indigo-300 font-medium">ERP & marketing automation platforms</span>,
              and intelligent <span className="text-emerald-300 font-medium">AI RAG chatbots</span>.
            </p>

            {/* Contact Micro-pills */}
            <div className="flex flex-wrap gap-2.5 pt-1 text-xs text-slate-300">
              <a
                href={`mailto:${personalInfo.email}`}
                onClick={playClickSound}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900/60 border border-white/10 hover:border-cyan-400/40 hover:text-white transition-colors"
              >
                <Mail className="w-3.5 h-3.5 text-cyan-400" />
                <span>{personalInfo.email}</span>
              </a>
              <a
                href={`tel:${personalInfo.phone}`}
                onClick={playClickSound}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900/60 border border-white/10 hover:border-emerald-400/40 hover:text-white transition-colors"
              >
                <Phone className="w-3.5 h-3.5 text-emerald-400" />
                <span>{personalInfo.phoneFormatted}</span>
              </a>
              <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900/60 border border-white/10 text-slate-400">
                <MapPin className="w-3.5 h-3.5 text-purple-400" />
                <span>Chennai, India</span>
              </span>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center gap-3.5 pt-3">
              <a
                href="#projects"
                onClick={playClickSound}
                className="flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm text-white bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 shadow-xl shadow-cyan-500/25 hover:shadow-cyan-500/40 transition-all duration-300 active:scale-95 group"
              >
                <span>View Projects</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </a>

              <a
                href="#labs"
                onClick={playClickSound}
                className="flex items-center gap-2 px-5 py-3 rounded-xl font-semibold text-sm text-slate-200 bg-slate-900/80 hover:bg-slate-800 border border-cyan-500/30 hover:border-cyan-400/60 shadow-lg shadow-black/40 transition-all duration-300 active:scale-95 group"
              >
                <Zap className="w-4 h-4 text-cyan-400 group-hover:scale-110 transition-transform" />
                <span>Interactive Labs</span>
              </a>

              <button
                onClick={() => {
                  playClickSound();
                  onOpenResume();
                }}
                className="flex items-center gap-2 px-5 py-3 rounded-xl font-medium text-sm text-slate-300 bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 hover:border-white/20 transition-all duration-300 active:scale-95"
              >
                <Download className="w-4 h-4 text-slate-400" />
                <span>Resume CV</span>
              </button>
            </div>
          </div>

          {/* Right Column: 3D Holographic Portrait Card & Orbitals */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <div
              ref={photoCardRef}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              style={{
                ...tiltStyle,
                transition: "transform 0.15s ease-out",
              }}
              className="relative w-full max-w-[380px] sm:max-w-[420px] aspect-[4/5] rounded-3xl p-3 bg-gradient-to-b from-white/10 via-white/[0.04] to-transparent border border-white/15 shadow-2xl shadow-cyan-500/10 cursor-pointer select-none group"
            >
              {/* Outer decorative glowing ring */}
              <div className="absolute -inset-1 rounded-[28px] bg-gradient-to-r from-cyan-500/30 via-indigo-500/20 to-purple-500/30 blur-xl opacity-70 group-hover:opacity-100 transition-opacity duration-500 -z-10" />

              {/* Photo Container */}
              <div className="relative w-full h-full rounded-2xl overflow-hidden bg-slate-950 border border-white/10 flex flex-col justify-end">
                <Image
                  src="/karthik.jpg"
                  alt="Karthikeyan Manikandan"
                  fill
                  className="object-cover object-center filter saturate-[1.05] contrast-[1.02] group-hover:scale-105 transition-transform duration-700 ease-out"
                  priority
                />

                {/* Gradient vignette at bottom */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#070a12] via-[#070a12]/30 to-transparent pointer-events-none" />

                {/* Bottom Overlay Card Info */}
                <div className="relative z-10 p-5 backdrop-blur-md bg-slate-950/70 border-t border-white/10 rounded-b-2xl">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-lg font-bold text-white tracking-tight">
                        Karthikeyan Manikandan
                      </h3>
                      <p className="text-xs text-cyan-400 font-medium">
                        Full Stack & Mobile Engineer
                      </p>
                    </div>
                    <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-[11px] text-emerald-300 font-medium">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      <span>Ready to Deploy</span>
                    </div>
                  </div>

                  <div className="mt-3 flex items-center justify-between text-xs text-slate-400 pt-2 border-t border-white/5">
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-cyan-400" /> Chennai, India
                    </span>
                    <span className="text-slate-300 font-mono">React • React Native</span>
                  </div>
                </div>
              </div>

              {/* Floating Orbit Tech Badges */}
              {/* Badge 1: Top Right - React Native */}
              <div className="absolute -top-4 -right-4 px-3 py-1.5 rounded-xl bg-slate-900/95 border border-cyan-400/40 shadow-xl shadow-cyan-500/20 backdrop-blur-md flex items-center gap-2 animate-float">
                <Smartphone className="w-4 h-4 text-cyan-400" />
                <span className="text-xs font-semibold text-white">React Native</span>
              </div>

              {/* Badge 2: Mid Left - Socket.IO */}
              <div
                className="absolute top-1/3 -left-6 px-3 py-1.5 rounded-xl bg-slate-900/95 border border-emerald-400/40 shadow-xl shadow-emerald-500/20 backdrop-blur-md flex items-center gap-2 animate-float"
                style={{ animationDelay: "1.5s" }}
              >
                <Zap className="w-4 h-4 text-emerald-400" />
                <span className="text-xs font-semibold text-white">Socket.IO & Ticker</span>
              </div>

              {/* Badge 3: Bottom Left - AI RAG */}
              <div
                className="absolute bottom-16 -left-4 px-3 py-1.5 rounded-xl bg-slate-900/95 border border-purple-400/40 shadow-xl shadow-purple-500/20 backdrop-blur-md flex items-center gap-2 animate-float"
                style={{ animationDelay: "2.5s" }}
              >
                <Bot className="w-4 h-4 text-purple-400" />
                <span className="text-xs font-semibold text-white">AI RAG & FastAPI</span>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Counter Bar */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 p-6 rounded-2xl bg-slate-900/40 border border-white/[0.08] backdrop-blur-xl shadow-2xl">
          {stats.map((stat, i) => (
            <div
              key={i}
              className="flex flex-col items-center sm:items-start text-center sm:text-left px-3 py-2 border-r last:border-r-0 border-white/5"
            >
              <div className="text-2xl sm:text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white via-cyan-200 to-cyan-400">
                {stat.value}
              </div>
              <div className="text-xs sm:text-sm font-semibold text-slate-200 mt-0.5">
                {stat.label}
              </div>
              <div className="text-[11px] text-slate-400">{stat.subtext}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
