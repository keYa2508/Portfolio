"use client";

import React, { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import SpotlightCanvas from "@/components/SpotlightCanvas";
import InteractiveLabs from "@/components/InteractiveLabs";
import MobileAppShowcase from "@/components/MobileAppShowcase";
import Projects from "@/components/Projects";
import DeveloperTerminal from "@/components/DeveloperTerminal";
import Experience from "@/components/Experience";
import Skills from "@/components/Skills";
import Education from "@/components/Education";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import ResumeModal from "@/components/ResumeModal";
import QuickNavModal from "@/components/QuickNavModal";
import { playClickSound } from "@/lib/soundEffects";
import { Search } from "lucide-react";

export default function Home() {
  const [resumeOpen, setResumeOpen] = useState(false);
  const [quickNavOpen, setQuickNavOpen] = useState(false);
  const [accentColor, setAccentColor] = useState("cyan");

  // Keyboard shortcut for Cmd+K / Ctrl+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setQuickNavOpen((prev) => !prev);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-[#070a12] text-slate-100 relative selection:bg-cyan-500/30 selection:text-cyan-200">
      {/* Dynamic Cursor Spotlight & Floating Particle Field */}
      <SpotlightCanvas accentColor={accentColor} />

      {/* Top Navigation */}
      <Navbar
        onOpenResume={() => setResumeOpen(true)}
        accentColor={accentColor}
        setAccentColor={setAccentColor}
      />

      {/* Main Content Sections */}
      <main className="flex-1 relative z-10">
        {/* 1. Hero Section with 3D Tilt Portrait, Floating Orbits & Stats */}
        <Hero
          onOpenResume={() => setResumeOpen(true)}
          accentColor={accentColor}
        />

        {/* 2. Interactive Engineering Labs (Trading Stream Simulator & AI RAG Assistant) */}
        <InteractiveLabs />

        {/* 3. Interactive React Native Smartphone Simulator */}
        <MobileAppShowcase />

        {/* 4. Featured Production Projects & Case Studies */}
        <Projects />

        {/* 5. Interactive Developer Terminal CLI */}
        <DeveloperTerminal />

        {/* 6. Professional Work Experience Timeline */}
        <Experience />

        {/* 7. Comprehensive Skills & Frameworks Matrix */}
        <Skills />

        {/* 8. Education & Academic Foundations */}
        <Education />

        {/* 9. Interactive Contact Section & Confetti Form */}
        <Contact />
      </main>

      {/* Footer */}
      <Footer onOpenResume={() => setResumeOpen(true)} />

      {/* Floating Action Pill: Quick Search / Cmd+K Helper */}
      <div className="fixed bottom-5 right-5 z-40 flex items-center gap-2">
        <button
          onClick={() => {
            playClickSound();
            setQuickNavOpen(true);
          }}
          className="flex items-center gap-2 px-3.5 py-2 rounded-full bg-slate-900/90 border border-white/15 text-slate-300 hover:text-white hover:border-cyan-400 shadow-2xl backdrop-blur-xl transition-all duration-300 group hover:scale-105"
          title="Quick Navigation (Cmd+K)"
        >
          <Search className="w-3.5 h-3.5 text-cyan-400 group-hover:scale-110 transition-transform" />
          <span className="text-xs font-medium hidden sm:inline">Search & Jump</span>
          <kbd className="hidden sm:inline text-[10px] font-mono bg-white/10 px-1.5 py-0.5 rounded text-slate-400">
            ⌘K
          </kbd>
        </button>
      </div>

      {/* Interactive Resume View & Print Modal */}
      <ResumeModal
        isOpen={resumeOpen}
        onClose={() => setResumeOpen(false)}
      />

      {/* Quick Nav Command Menu */}
      <QuickNavModal
        isOpen={quickNavOpen}
        onClose={() => setQuickNavOpen(false)}
        onOpenResume={() => setResumeOpen(true)}
      />
    </div>
  );
}
