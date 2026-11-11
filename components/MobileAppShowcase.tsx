"use client";

import React, { useState, useEffect } from "react";
import { playClickSound, playPopSound } from "@/lib/soundEffects";
import {
  Smartphone,
  TrendingUp,
  MapPin,
  Phone,
  BookOpen,
  Wifi,
  Battery,
  Sparkles,
  ArrowUpRight,
  ShieldCheck,
  CheckCircle,
  Download,
} from "lucide-react";

export default function MobileAppShowcase() {
  const [activeScreen, setActiveScreen] = useState<"crypto" | "erp" | "school">("crypto");
  const [cryptoPrice, setCryptoPrice] = useState(88450.2);
  const [isCalling, setIsCalling] = useState(false);
  const [downloadedBook, setDownloadedBook] = useState(false);

  // Subtle live price fluctuation inside the phone
  useEffect(() => {
    const interval = setInterval(() => {
      setCryptoPrice((prev) => {
        const delta = (Math.random() - 0.49) * 45;
        return Number((prev + delta).toFixed(2));
      });
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-24 relative overflow-hidden bg-gradient-to-b from-[#070b14] via-[#090e1c] to-[#070b14]">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-96 h-96 bg-cyan-500/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Context & Screen Selectors */}
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-cyan-300 text-xs font-semibold uppercase tracking-wider shadow-lg shadow-cyan-500/10">
              <Smartphone className="w-3.5 h-3.5 text-cyan-400" />
              <span>Cross-Platform Mobile Mastery</span>
            </div>

            <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
              Interactive <span className="gradient-text-cyan">React Native</span> Phone Simulator
            </h2>

            <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
              Karthikeyan specializes in production React Native engineering: Turbo Modules, native
              bridging, Socket.IO duplex streams, background GPS geolocation, and offline filesystem
              caching.
            </p>

            {/* Screen Selector Tabs */}
            <div className="space-y-3 pt-2">
              <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Select an Application Flavor to Preview:
              </p>

              {/* Tab 1: Crypto */}
              <button
                onClick={() => {
                  playClickSound();
                  setActiveScreen("crypto");
                }}
                className={`w-full p-4 rounded-2xl border text-left transition-all duration-200 flex items-center justify-between ${
                  activeScreen === "crypto"
                    ? "bg-slate-800/90 border-cyan-400 shadow-xl shadow-cyan-500/10"
                    : "bg-slate-900/40 border-white/10 hover:border-white/20 hover:bg-slate-900/70"
                }`}
              >
                <div className="flex items-center gap-3.5">
                  <div className="p-2.5 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400">
                    <TrendingUp className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white">Crypto Trading Exchange App</h4>
                    <p className="text-xs text-slate-400">
                      Sub-second Socket.IO order stream & white-label theming (Pibase)
                    </p>
                  </div>
                </div>
                <ArrowUpRight className="w-4 h-4 text-cyan-400" />
              </button>

              {/* Tab 2: ERP */}
              <button
                onClick={() => {
                  playClickSound();
                  setActiveScreen("erp");
                }}
                className={`w-full p-4 rounded-2xl border text-left transition-all duration-200 flex items-center justify-between ${
                  activeScreen === "erp"
                    ? "bg-slate-800/90 border-emerald-400 shadow-xl shadow-emerald-500/10"
                    : "bg-slate-900/40 border-white/10 hover:border-white/20 hover:bg-slate-900/70"
                }`}
              >
                <div className="flex items-center gap-3.5">
                  <div className="p-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white">ERP Field Agent & VoIP Suite</h4>
                    <p className="text-xs text-slate-400">
                      Live GPS geolocation, in-app dialer & Meta Ads integration (Micromen)
                    </p>
                  </div>
                </div>
                <ArrowUpRight className="w-4 h-4 text-emerald-400" />
              </button>

              {/* Tab 3: School */}
              <button
                onClick={() => {
                  playClickSound();
                  setActiveScreen("school");
                }}
                className={`w-full p-4 rounded-2xl border text-left transition-all duration-200 flex items-center justify-between ${
                  activeScreen === "school"
                    ? "bg-slate-800/90 border-purple-400 shadow-xl shadow-purple-500/10"
                    : "bg-slate-900/40 border-white/10 hover:border-white/20 hover:bg-slate-900/70"
                }`}
              >
                <div className="flex items-center gap-3.5">
                  <div className="p-2.5 rounded-xl bg-purple-500/10 border border-purple-500/30 text-purple-400">
                    <BookOpen className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white">School Learning Ecosystem</h4>
                    <p className="text-xs text-slate-400">
                      Offline digital book storage (RN-FS), attendance & WebView
                    </p>
                  </div>
                </div>
                <ArrowUpRight className="w-4 h-4 text-purple-400" />
              </button>
            </div>
          </div>

          {/* Right Column: Realistic iPhone Smartphone Frame */}
          <div className="lg:col-span-6 flex justify-center">
            <div className="relative w-[300px] sm:w-[330px] h-[620px] rounded-[50px] p-3.5 bg-gradient-to-b from-slate-700 via-slate-800 to-slate-900 shadow-2xl shadow-cyan-500/20 border-4 border-slate-700 select-none">
              {/* Dynamic Island / Top Notch */}
              <div className="absolute top-5 left-1/2 -translate-x-1/2 w-28 h-5 bg-black rounded-full z-30 flex items-center justify-between px-3">
                <span className="w-2.5 h-2.5 rounded-full bg-slate-900" />
                <span className="w-2 h-2 rounded-full bg-cyan-900" />
              </div>

              {/* Phone Inner Screen Display */}
              <div className="relative w-full h-full rounded-[38px] overflow-hidden bg-[#0c101c] flex flex-col justify-between text-white font-sans border border-white/5">
                {/* Status Bar */}
                <div className="pt-3 px-6 pb-2 flex items-center justify-between text-[11px] font-semibold text-slate-400 z-20">
                  <span>9:41</span>
                  <div className="flex items-center gap-1.5">
                    <Wifi className="w-3 h-3 text-slate-300" />
                    <Battery className="w-3.5 h-3.5 text-slate-300" />
                  </div>
                </div>

                {/* ======================================================= */}
                {/* SCREEN CONTENT: CRYPTO */}
                {/* ======================================================= */}
                {activeScreen === "crypto" && (
                  <div className="p-4 flex-1 flex flex-col justify-between animate-in fade-in duration-300">
                    <div>
                      {/* App Header */}
                      <div className="flex items-center justify-between mt-2 mb-4">
                        <div>
                          <span className="text-[10px] text-cyan-400 font-mono font-bold uppercase">
                            Crypto Stream Native
                          </span>
                          <h5 className="text-sm font-bold text-white">BTC / USDT Perpetual</h5>
                        </div>
                        <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 text-[10px] font-mono">
                          LIVE
                        </span>
                      </div>

                      {/* Main Price Box */}
                      <div className="p-3.5 rounded-2xl bg-slate-900/90 border border-white/10 text-center">
                        <span className="text-2xl font-black text-white font-mono block">
                          ${cryptoPrice.toLocaleString()}
                        </span>
                        <span className="text-xs text-emerald-400 font-mono font-bold">
                          +3.84% (24h)
                        </span>
                      </div>

                      {/* Mini Candlestick Simulation */}
                      <div className="mt-4 p-3 rounded-2xl bg-slate-900/50 border border-white/5">
                        <div className="flex justify-between text-[10px] text-slate-400 mb-2 font-mono">
                          <span>1m</span>
                          <span className="text-cyan-400 font-bold">15m</span>
                          <span>1h</span>
                          <span>1D</span>
                        </div>
                        <div className="h-20 flex items-end justify-between gap-1.5 px-1">
                          {[38, 55, 42, 68, 75, 60, 82, 90, 84, 96].map((h, i) => (
                            <div
                              key={i}
                              className={`w-full rounded-t transition-all duration-300 ${
                                i % 3 === 0 ? "bg-red-400/80" : "bg-emerald-400/80"
                              }`}
                              style={{ height: `${h}%` }}
                            />
                          ))}
                        </div>
                      </div>

                      {/* Quick Market Stats */}
                      <div className="grid grid-cols-2 gap-2 mt-3 text-[10px] font-mono">
                        <div className="p-2 rounded-xl bg-slate-900/70 border border-white/5">
                          <span className="text-slate-500 block">24H High</span>
                          <span className="text-slate-200 font-bold">$89,120.0</span>
                        </div>
                        <div className="p-2 rounded-xl bg-slate-900/70 border border-white/5">
                          <span className="text-slate-500 block">24H Low</span>
                          <span className="text-slate-200 font-bold">$85,210.0</span>
                        </div>
                      </div>
                    </div>

                    {/* Trade Buttons */}
                    <div className="grid grid-cols-2 gap-2 mt-3">
                      <button
                        onClick={() => {
                          playPopSound();
                        }}
                        className="py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs uppercase tracking-wider transition-all active:scale-95"
                      >
                        Buy Long
                      </button>
                      <button
                        onClick={() => {
                          playPopSound();
                        }}
                        className="py-2.5 rounded-xl bg-red-500 hover:bg-red-400 text-white font-bold text-xs uppercase tracking-wider transition-all active:scale-95"
                      >
                        Sell Short
                      </button>
                    </div>
                  </div>
                )}

                {/* ======================================================= */}
                {/* SCREEN CONTENT: ERP FIELD */}
                {/* ======================================================= */}
                {activeScreen === "erp" && (
                  <div className="p-4 flex-1 flex flex-col justify-between animate-in fade-in duration-300">
                    <div>
                      <div className="flex items-center justify-between mt-2 mb-3">
                        <div>
                          <span className="text-[10px] text-emerald-400 font-mono font-bold uppercase">
                            ERP Field Ops
                          </span>
                          <h5 className="text-sm font-bold text-white">Agent Live Tracking</h5>
                        </div>
                        <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 text-[10px] font-mono">
                          GPS ON
                        </span>
                      </div>

                      {/* Simulated Radar Map */}
                      <div className="h-32 rounded-2xl bg-slate-900/90 border border-emerald-500/30 p-3 relative overflow-hidden flex flex-col justify-between">
                        <div className="absolute inset-0 bg-radial from-emerald-500/10 via-transparent to-transparent pointer-events-none" />
                        <div className="flex items-center gap-1.5 text-[10px] text-emerald-300 font-semibold">
                          <MapPin className="w-3.5 h-3.5 animate-bounce text-emerald-400" />
                          <span>Chennai Hub - Zone 4</span>
                        </div>

                        {/* Location Ping */}
                        <div className="flex items-center justify-center my-auto">
                          <div className="relative">
                            <span className="animate-ping absolute -inset-2 rounded-full bg-emerald-400 opacity-60" />
                            <div className="w-5 h-5 rounded-full bg-emerald-500 border-2 border-white flex items-center justify-center shadow-lg">
                              <span className="w-2 h-2 rounded-full bg-white" />
                            </div>
                          </div>
                        </div>

                        <div className="text-[9px] text-slate-400 font-mono flex justify-between">
                          <span>Accuracy: 4.2m</span>
                          <span>Speed: 24 km/h</span>
                        </div>
                      </div>

                      {/* Lead Notification Card */}
                      <div className="mt-3 p-3 rounded-xl bg-slate-900/80 border border-white/10 text-xs">
                        <div className="flex items-center justify-between mb-1">
                          <span className="font-bold text-white text-[11px]">
                            New WhatsApp Inbound
                          </span>
                          <span className="text-[9px] text-emerald-400 font-mono">Just Now</span>
                        </div>
                        <p className="text-[10px] text-slate-300">
                          Lead from Meta Ads: &ldquo;Interested in Enterprise Plan&rdquo;
                        </p>
                      </div>

                      {/* In-app dialer status */}
                      <div className="mt-3 p-2.5 rounded-xl bg-slate-900/60 border border-white/5 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Phone className="w-3.5 h-3.5 text-cyan-400" />
                          <span className="text-[10px] text-slate-300 font-medium">
                            VoIP Recording Active
                          </span>
                        </div>
                        <span className="text-[9px] text-slate-500 font-mono">Exotel API</span>
                      </div>
                    </div>

                    <button
                      onClick={() => {
                        playClickSound();
                        setIsCalling(!isCalling);
                      }}
                      className={`w-full py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider transition-all active:scale-95 flex items-center justify-center gap-1.5 ${
                        isCalling
                          ? "bg-red-500 hover:bg-red-600 text-white"
                          : "bg-emerald-500 hover:bg-emerald-400 text-slate-950"
                      }`}
                    >
                      <Phone className="w-3.5 h-3.5" />
                      <span>{isCalling ? "End Call (Recording Saved)" : "Simulate In-App Call"}</span>
                    </button>
                  </div>
                )}

                {/* ======================================================= */}
                {/* SCREEN CONTENT: SCHOOL APP */}
                {/* ======================================================= */}
                {activeScreen === "school" && (
                  <div className="p-4 flex-1 flex flex-col justify-between animate-in fade-in duration-300">
                    <div>
                      <div className="flex items-center justify-between mt-2 mb-3">
                        <div>
                          <span className="text-[10px] text-purple-400 font-mono font-bold uppercase">
                            School App
                          </span>
                          <h5 className="text-sm font-bold text-white">Student Portal</h5>
                        </div>
                        <span className="px-2 py-0.5 rounded-full bg-purple-500/20 text-purple-300 text-[10px] font-mono">
                          94% Attendance
                        </span>
                      </div>

                      {/* Digital Book Cache Card */}
                      <div className="p-3.5 rounded-2xl bg-slate-900/90 border border-purple-500/30">
                        <div className="flex items-center gap-2 mb-2">
                          <BookOpen className="w-4 h-4 text-purple-400" />
                          <span className="text-xs font-bold text-white">
                            Digital Learning Materials
                          </span>
                        </div>
                        <p className="text-[10px] text-slate-300 leading-relaxed mb-3">
                          Cached locally via React Native FS for offline reading without internet.
                        </p>

                        <button
                          onClick={() => {
                            playPopSound();
                            setDownloadedBook(!downloadedBook);
                          }}
                          className={`w-full py-2 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors ${
                            downloadedBook
                              ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30"
                              : "bg-purple-600 hover:bg-purple-500 text-white"
                          }`}
                        >
                          {downloadedBook ? (
                            <>
                              <CheckCircle className="w-3.5 h-3.5" />
                              <span>Downloaded & Cached</span>
                            </>
                          ) : (
                            <>
                              <Download className="w-3.5 h-3.5" />
                              <span>Download Syllabus (RN-FS)</span>
                            </>
                          )}
                        </button>
                      </div>

                      {/* Examination Card */}
                      <div className="mt-3 p-3 rounded-xl bg-slate-900/70 border border-white/5">
                        <div className="flex justify-between items-center text-xs mb-1">
                          <span className="font-semibold text-slate-200">Term 2 Examination</span>
                          <span className="text-[10px] text-cyan-400 font-mono">Grade A+</span>
                        </div>
                        <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
                          <div className="h-full bg-cyan-400 rounded-full w-[92%]" />
                        </div>
                      </div>
                    </div>

                    <div className="p-2 rounded-xl bg-slate-950 border border-white/5 text-[10px] text-slate-400 text-center font-mono">
                      Redux Centralized State • WebView Integration
                    </div>
                  </div>
                )}

                {/* Bottom Home Indicator Bar */}
                <div className="pb-2 pt-1 flex justify-center">
                  <div className="w-32 h-1 bg-white/30 rounded-full" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
