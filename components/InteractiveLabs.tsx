"use client";

import React, { useState, useEffect, useRef } from "react";
import { playClickSound, playPopSound } from "@/lib/soundEffects";
import { sampleQA } from "@/data/portfolioData";
import {
  TrendingUp,
  TrendingDown,
  Activity,
  Bot,
  Layers,
  Send,
  Sparkles,
  RefreshCw,
  Zap,
  Play,
  Pause,
  Cpu,
  ShieldCheck,
  CheckCircle2,
  Database,
  Smartphone,
  Server,
  Radio,
  FileCode,
} from "lucide-react";

// Mock initial ticker data
interface TickerPair {
  symbol: string;
  name: string;
  price: number;
  prevPrice: number;
  change24h: number;
  high24h: number;
  low24h: number;
  volume: string;
  type: "crypto" | "stock";
  history: number[];
}

const initialTickers: TickerPair[] = [
  {
    symbol: "BTC/USDT",
    name: "Bitcoin",
    price: 88450.2,
    prevPrice: 88450.2,
    change24h: 3.42,
    high24h: 89100.0,
    low24h: 85200.0,
    volume: "1.42B",
    type: "crypto",
    history: [85200, 86100, 85800, 87300, 86900, 88100, 88450],
  },
  {
    symbol: "NIFTY 50",
    name: "NSE India",
    price: 24350.8,
    prevPrice: 24350.8,
    change24h: 1.15,
    high24h: 24420.0,
    low24h: 24190.0,
    volume: "890M",
    type: "stock",
    history: [24190, 24220, 24280, 24250, 24310, 24350],
  },
  {
    symbol: "ETH/USDT",
    name: "Ethereum",
    price: 3245.5,
    prevPrice: 3245.5,
    change24h: -0.84,
    high24h: 3310.0,
    low24h: 3190.0,
    volume: "760M",
    type: "crypto",
    history: [3190, 3210, 3260, 3290, 3270, 3245.5],
  },
  {
    symbol: "BANKNIFTY",
    name: "NSE Bank",
    price: 51890.0,
    prevPrice: 51890.0,
    change24h: 1.82,
    high24h: 52100.0,
    low24h: 51200.0,
    volume: "640M",
    type: "stock",
    history: [51200, 51400, 51350, 51600, 51780, 51890],
  },
];

export default function InteractiveLabs() {
  const [activeTab, setActiveTab] = useState<"trading" | "ai" | "architecture">("trading");

  // Trading Lab State
  const [tickers, setTickers] = useState<TickerPair[]>(initialTickers);
  const [selectedSymbol, setSelectedSymbol] = useState("BTC/USDT");
  const [isLiveStreaming, setIsLiveStreaming] = useState(true);
  const [hftMode, setHftMode] = useState(false);
  const [lastTickDirection, setLastTickDirection] = useState<Record<string, "up" | "down" | "neutral">>({});

  // Simulated order book
  const [orderBook, setOrderBook] = useState({
    bids: [
      { price: 88448.5, size: 0.85, total: 0.85 },
      { price: 88445.0, size: 1.42, total: 2.27 },
      { price: 88440.0, size: 2.15, total: 4.42 },
      { price: 88435.5, size: 0.94, total: 5.36 },
    ],
    asks: [
      { price: 88452.0, size: 0.65, total: 0.65 },
      { price: 88455.5, size: 1.12, total: 1.77 },
      { price: 88460.0, size: 2.84, total: 4.61 },
      { price: 88465.0, size: 3.1, total: 7.71 },
    ],
  });

  // AI Chat Lab State
  const [chatMessages, setChatMessages] = useState<
    { role: "user" | "assistant"; text: string; sources?: string[] }[]
  >([
    {
      role: "assistant",
      text: "👋 Welcome! I am Karthik's AI Portfolio Assistant, trained on his resume, projects, and tech stack. Click any topic below or ask me anything directly!",
      sources: ["Portfolio Knowledge Base v1.0"],
    },
  ]);
  const [chatInput, setChatInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const chatBottomRef = useRef<HTMLDivElement>(null);

  // Architecture Visualizer State
  const [activeArch, setActiveArch] = useState<"trading" | "erp" | "rag">("trading");

  // Real-time trading simulation loop
  useEffect(() => {
    if (!isLiveStreaming) return;
    const intervalTime = hftMode ? 600 : 1600;

    const interval = setInterval(() => {
      setTickers((prev) =>
        prev.map((ticker) => {
          const delta = (Math.random() - 0.49) * (ticker.price * 0.0018);
          const newPrice = Number((ticker.price + delta).toFixed(2));
          const direction = newPrice >= ticker.price ? "up" : "down";

          setLastTickDirection((prevDir) => ({
            ...prevDir,
            [ticker.symbol]: direction,
          }));

          const updatedHistory = [...ticker.history.slice(-8), newPrice];

          return {
            ...ticker,
            prevPrice: ticker.price,
            price: newPrice,
            change24h: Number((ticker.change24h + (delta / ticker.price) * 100).toFixed(2)),
            high24h: Math.max(ticker.high24h, newPrice),
            low24h: Math.min(ticker.low24h, newPrice),
            history: updatedHistory,
          };
        })
      );

      // Randomly update order book slightly
      setOrderBook((prev) => ({
        bids: prev.bids.map((b) => ({
          ...b,
          size: Number((b.size + (Math.random() - 0.5) * 0.2).toFixed(2)),
        })),
        asks: prev.asks.map((a) => ({
          ...a,
          size: Number((a.size + (Math.random() - 0.5) * 0.2).toFixed(2)),
        })),
      }));
    }, intervalTime);

    return () => clearInterval(interval);
  }, [isLiveStreaming, hftMode]);

  // AI Chat Handler
  const handleAskQuestion = (question: string) => {
    if (!question.trim() || isTyping) return;
    playClickSound();

    const userMsg = { role: "user" as const, text: question };
    setChatMessages((prev) => [...prev, userMsg]);
    setChatInput("");
    setIsTyping(true);

    // Find best match or default answer
    const qLower = question.toLowerCase();
    let matchedAnswer = sampleQA.find((item) =>
      qLower.split(" ").some((word) => word.length > 3 && item.q.toLowerCase().includes(word))
    );

    if (!matchedAnswer) {
      if (qLower.includes("hire") || qLower.includes("contact") || qLower.includes("phone") || qLower.includes("email")) {
        matchedAnswer = sampleQA[4];
      } else if (qLower.includes("trading") || qLower.includes("crypto") || qLower.includes("stock")) {
        matchedAnswer = sampleQA[1];
      } else if (qLower.includes("erp") || qLower.includes("micromen") || qLower.includes("whatsapp")) {
        matchedAnswer = sampleQA[2];
      } else if (qLower.includes("ai") || qLower.includes("rag") || qLower.includes("python") || qLower.includes("fastapi")) {
        matchedAnswer = sampleQA[3];
      } else {
        matchedAnswer = sampleQA[0];
      }
    }

    // Stream out response simulation
    setTimeout(() => {
      setChatMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          text: matchedAnswer!.a,
          sources: ["Karthikeyan_Resume.pdf", "Projects & Experience Catalog", "Verified 2026"],
        },
      ]);
      setIsTyping(false);
      playPopSound();
    }, 700);
  };

  useEffect(() => {
    chatBottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatMessages, isTyping]);

  const currentTicker = tickers.find((t) => t.symbol === selectedSymbol) || tickers[0];

  return (
    <section id="labs" className="py-24 relative overflow-hidden bg-[#070b14]">
      {/* Background radial ambient lights */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 bg-cyan-500/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-cyan-300 text-xs font-semibold uppercase tracking-wider mb-4 shadow-lg shadow-cyan-500/10">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span>Interactive Engineering Labs</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Test Drive My <span className="gradient-text-cyan">Real-Time</span> &{" "}
            <span className="text-white">AI Systems</span>
          </h2>
          <p className="mt-4 text-slate-300 text-base sm:text-lg">
            Instead of just reading static text, experience the actual domain architectures I build:
            high-frequency socket streaming, AI RAG retrieval, and scalable full-stack pipelines.
          </p>
        </div>

        {/* Labs Tab Navigation */}
        <div className="flex justify-center mb-8">
          <div className="flex p-1.5 rounded-2xl bg-slate-900/80 border border-white/10 backdrop-blur-xl shadow-xl max-w-full overflow-x-auto">
            <button
              onClick={() => {
                playClickSound();
                setActiveTab("trading");
              }}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all whitespace-nowrap ${
                activeTab === "trading"
                  ? "bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg shadow-cyan-500/25"
                  : "text-slate-400 hover:text-white hover:bg-white/5"
              }`}
            >
              <Activity className="w-4 h-4" />
              <span>Real-Time Trading Stream</span>
            </button>

            <button
              onClick={() => {
                playClickSound();
                setActiveTab("ai");
              }}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all whitespace-nowrap ${
                activeTab === "ai"
                  ? "bg-gradient-to-r from-purple-500 to-indigo-600 text-white shadow-lg shadow-purple-500/25"
                  : "text-slate-400 hover:text-white hover:bg-white/5"
              }`}
            >
              <Bot className="w-4 h-4" />
              <span>Ask Karthik&apos;s AI (RAG)</span>
            </button>

            <button
              onClick={() => {
                playClickSound();
                setActiveTab("architecture");
              }}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all whitespace-nowrap ${
                activeTab === "architecture"
                  ? "bg-gradient-to-r from-emerald-500 to-teal-600 text-white shadow-lg shadow-emerald-500/25"
                  : "text-slate-400 hover:text-white hover:bg-white/5"
              }`}
            >
              <Layers className="w-4 h-4" />
              <span>System Architectures</span>
            </button>
          </div>
        </div>

        {/* ============================================================== */}
        {/* TAB 1: REAL-TIME TRADING & MARKET TICKER STREAM */}
        {/* ============================================================== */}
        {activeTab === "trading" && (
          <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/60 border border-cyan-500/20 backdrop-blur-2xl shadow-2xl relative">
            {/* Top Toolbar */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/10">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400">
                  <Activity className="w-5 h-5 animate-pulse" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-lg font-bold text-white">Live Market Feed Simulator</h3>
                    <span className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 text-[10px] font-mono border border-emerald-500/30">
                      <Radio className="w-2.5 h-2.5 animate-ping" />
                      SOCKET.IO CONNECTED
                    </span>
                  </div>
                  <p className="text-xs text-slate-400">
                    Engineered from Karthik&apos;s real-time trading engines at Pibase & Iouring
                  </p>
                </div>
              </div>

              {/* Simulation Controls */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    playClickSound();
                    setHftMode(!hftMode);
                  }}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors flex items-center gap-1.5 ${
                    hftMode
                      ? "bg-amber-500/20 border-amber-500/50 text-amber-300"
                      : "bg-slate-800 border-white/10 text-slate-300 hover:border-white/20"
                  }`}
                >
                  <Zap className="w-3.5 h-3.5 text-amber-400" />
                  <span>{hftMode ? "HFT Mode (600ms)" : "Normal (1600ms)"}</span>
                </button>

                <button
                  onClick={() => {
                    playClickSound();
                    setIsLiveStreaming(!isLiveStreaming);
                  }}
                  className={`p-2 rounded-lg border text-xs flex items-center gap-1 transition-colors ${
                    isLiveStreaming
                      ? "bg-red-500/10 border-red-500/30 text-red-300 hover:bg-red-500/20"
                      : "bg-emerald-500/10 border-emerald-500/30 text-emerald-300 hover:bg-emerald-500/20"
                  }`}
                  title={isLiveStreaming ? "Pause Feed" : "Resume Feed"}
                >
                  {isLiveStreaming ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Asset Selector Badges */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 my-6">
              {tickers.map((ticker) => {
                const isSelected = ticker.symbol === selectedSymbol;
                const isUp = ticker.change24h >= 0;
                const tickDir = lastTickDirection[ticker.symbol];

                return (
                  <button
                    key={ticker.symbol}
                    onClick={() => {
                      playClickSound();
                      setSelectedSymbol(ticker.symbol);
                    }}
                    className={`p-3.5 rounded-2xl text-left border transition-all duration-200 relative overflow-hidden ${
                      isSelected
                        ? "bg-slate-800/90 border-cyan-400/60 shadow-lg shadow-cyan-500/10 ring-1 ring-cyan-400/30"
                        : "bg-slate-900/40 border-white/5 hover:border-white/20 hover:bg-slate-800/40"
                    }`}
                  >
                    {/* Tick flash highlight bar */}
                    {tickDir && (
                      <div
                        className={`absolute top-0 left-0 right-0 h-0.5 transition-opacity duration-300 ${
                          tickDir === "up" ? "bg-emerald-400 opacity-100" : "bg-red-400 opacity-100"
                        }`}
                      />
                    )}

                    <div className="flex items-center justify-between mb-1">
                      <span className="font-bold text-sm text-white">{ticker.symbol}</span>
                      <span
                        className={`text-xs font-mono font-medium flex items-center ${
                          isUp ? "text-emerald-400" : "text-red-400"
                        }`}
                      >
                        {isUp ? "+" : ""}
                        {ticker.change24h}%
                      </span>
                    </div>

                    <div className="flex items-baseline justify-between mt-1">
                      <span className="text-base font-extrabold text-slate-100 font-mono">
                        ${ticker.price.toLocaleString()}
                      </span>
                      <span className="text-[10px] text-slate-400">{ticker.name}</span>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Main Active Asset Display & Mini Order Book */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
              {/* Chart & Detail Column */}
              <div className="lg:col-span-8 p-6 rounded-2xl bg-slate-950/70 border border-white/10 flex flex-col justify-between">
                <div>
                  <div className="flex flex-wrap items-center justify-between gap-4">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-2xl font-extrabold text-white">
                          {currentTicker.symbol}
                        </span>
                        <span className="text-xs px-2 py-0.5 rounded bg-slate-800 text-slate-300 font-medium">
                          {currentTicker.name}
                        </span>
                      </div>
                      <div className="flex items-center gap-3 mt-1">
                        <span className="text-3xl font-black text-cyan-300 font-mono">
                          ${currentTicker.price.toLocaleString()}
                        </span>
                        <span
                          className={`flex items-center gap-1 text-sm font-bold font-mono px-2 py-0.5 rounded ${
                            currentTicker.change24h >= 0
                              ? "bg-emerald-500/20 text-emerald-400"
                              : "bg-red-500/20 text-red-400"
                          }`}
                        >
                          {currentTicker.change24h >= 0 ? (
                            <TrendingUp className="w-4 h-4" />
                          ) : (
                            <TrendingDown className="w-4 h-4" />
                          )}
                          {currentTicker.change24h}%
                        </span>
                      </div>
                    </div>

                    <div className="flex gap-4 text-xs font-mono">
                      <div>
                        <div className="text-slate-500">24H HIGH</div>
                        <div className="text-slate-200 font-bold">
                          ${currentTicker.high24h.toLocaleString()}
                        </div>
                      </div>
                      <div>
                        <div className="text-slate-500">24H LOW</div>
                        <div className="text-slate-200 font-bold">
                          ${currentTicker.low24h.toLocaleString()}
                        </div>
                      </div>
                      <div>
                        <div className="text-slate-500">VOLUME</div>
                        <div className="text-slate-200 font-bold">{currentTicker.volume}</div>
                      </div>
                    </div>
                  </div>

                  {/* SVG Sparkline Chart */}
                  <div className="mt-8 h-40 w-full relative flex items-end">
                    <svg className="w-full h-full overflow-visible" preserveAspectRatio="none">
                      <defs>
                        <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.4" />
                          <stop offset="100%" stopColor="#38bdf8" stopOpacity="0.0" />
                        </linearGradient>
                      </defs>

                      {/* Sparkline Polyline */}
                      {(() => {
                        const history = currentTicker.history;
                        const min = Math.min(...history);
                        const max = Math.max(...history);
                        const range = max - min || 1;
                        const points = history
                          .map((val, idx) => {
                            const x = (idx / (history.length - 1)) * 100;
                            const y = 90 - ((val - min) / range) * 80;
                            return `${x}%,${y}%`;
                          })
                          .join(" ");

                        return (
                          <>
                            <polyline
                              fill="none"
                              stroke="#38bdf8"
                              strokeWidth="2.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              points={points}
                            />
                          </>
                        );
                      })()}
                    </svg>

                    <div className="absolute top-2 right-2 text-[10px] text-cyan-400 font-mono flex items-center gap-1 bg-slate-900/80 px-2 py-0.5 rounded border border-cyan-500/20">
                      <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
                      Live Virtual Tick Stream
                    </div>
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-white/5 flex flex-wrap items-center justify-between text-xs text-slate-400">
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-emerald-400" />
                    <span>Redux Thunk Asynchronous State • Mitt Event Bus Telemetry</span>
                  </div>
                  <span className="font-mono text-cyan-400">Sub-second Latency Sync</span>
                </div>
              </div>

              {/* Order Book Column */}
              <div className="lg:col-span-4 p-5 rounded-2xl bg-slate-950/70 border border-white/10 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between pb-3 border-b border-white/10">
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-300">
                      Simulated Order Book
                    </span>
                    <span className="text-[10px] font-mono text-slate-400">Real-Time Depth</span>
                  </div>

                  <div className="grid grid-cols-3 text-[10px] font-semibold text-slate-500 py-2 border-b border-white/5">
                    <span>PRICE</span>
                    <span className="text-right">SIZE</span>
                    <span className="text-right">TOTAL</span>
                  </div>

                  {/* Asks (Sell Orders - Red) */}
                  <div className="space-y-1 py-1 font-mono text-xs">
                    {orderBook.asks.map((ask, idx) => (
                      <div key={idx} className="grid grid-cols-3 text-red-400 relative py-0.5">
                        <span className="font-semibold">${ask.price.toFixed(1)}</span>
                        <span className="text-right text-slate-300">{ask.size}</span>
                        <span className="text-right text-slate-500">{ask.total.toFixed(2)}</span>
                        <div
                          className="absolute inset-y-0 right-0 bg-red-500/10 pointer-events-none rounded"
                          style={{ width: `${Math.min(100, ask.size * 30)}%` }}
                        />
                      </div>
                    ))}
                  </div>

                  {/* Mid Market Spread */}
                  <div className="py-2 my-1 border-y border-white/10 text-center font-mono text-xs text-cyan-300 font-bold bg-slate-900/50 rounded">
                    Spread: $3.50 (0.004%)
                  </div>

                  {/* Bids (Buy Orders - Green) */}
                  <div className="space-y-1 py-1 font-mono text-xs">
                    {orderBook.bids.map((bid, idx) => (
                      <div key={idx} className="grid grid-cols-3 text-emerald-400 relative py-0.5">
                        <span className="font-semibold">${bid.price.toFixed(1)}</span>
                        <span className="text-right text-slate-300">{bid.size}</span>
                        <span className="text-right text-slate-500">{bid.total.toFixed(2)}</span>
                        <div
                          className="absolute inset-y-0 right-0 bg-emerald-500/10 pointer-events-none rounded"
                          style={{ width: `${Math.min(100, bid.size * 30)}%` }}
                        />
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-white/5 text-[11px] text-slate-400">
                  White-label multi-tenant theming & WebSocket reconnect recovery tested.
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ============================================================== */}
        {/* TAB 2: ASK KARTHIK'S AI (RAG KNOWLEDGE ASSISTANT) */}
        {/* ============================================================== */}
        {activeTab === "ai" && (
          <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/60 border border-purple-500/20 backdrop-blur-2xl shadow-2xl relative">
            <div className="flex items-center justify-between pb-6 border-b border-white/10">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-purple-500/10 border border-purple-500/30 text-purple-400">
                  <Bot className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white">Ask Karthik&apos;s AI Assistant</h3>
                  <p className="text-xs text-slate-400">
                    Live demo simulating Karthik&apos;s AI RAG Chatbot architecture (Python, FastAPI, Vector Search)
                  </p>
                </div>
              </div>
              <div className="hidden sm:flex items-center gap-2 text-xs font-mono text-purple-400 bg-purple-950/40 px-3 py-1 rounded-full border border-purple-500/30">
                <Cpu className="w-3.5 h-3.5" />
                <span>Vector Semantic Match: Active</span>
              </div>
            </div>

            {/* Quick Suggestion Chips */}
            <div className="my-5">
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2.5">
                Suggested Recruiter Inquiries (Click to Ask):
              </p>
              <div className="flex flex-wrap gap-2">
                {[
                  "What trading platform features has Karthik built?",
                  "What is his experience with React Native and mobile?",
                  "Tell me about his ERP & marketing automation work.",
                  "Does Karthik know GenAI and Python?",
                  "How to get in touch with Karthik?",
                ].map((qText, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleAskQuestion(qText)}
                    className="px-3 py-1.5 rounded-lg text-xs font-medium bg-slate-800/80 hover:bg-purple-900/30 border border-white/10 hover:border-purple-400/40 text-slate-300 hover:text-white transition-colors"
                  >
                    {qText}
                  </button>
                ))}
              </div>
            </div>

            {/* Chat Messages Container */}
            <div className="h-80 overflow-y-auto space-y-4 p-4 rounded-2xl bg-slate-950/80 border border-white/10 my-4">
              {chatMessages.map((msg, idx) => (
                <div
                  key={idx}
                  className={`flex flex-col ${
                    msg.role === "user" ? "items-end" : "items-start"
                  }`}
                >
                  <div
                    className={`max-w-[85%] sm:max-w-[75%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                      msg.role === "user"
                        ? "bg-purple-600 text-white rounded-tr-none shadow-lg shadow-purple-600/20"
                        : "bg-slate-900 border border-white/10 text-slate-200 rounded-tl-none"
                    }`}
                  >
                    <p>{msg.text}</p>

                    {msg.sources && (
                      <div className="mt-2.5 pt-2 border-t border-white/10 flex flex-wrap gap-1.5 items-center">
                        <span className="text-[10px] text-purple-300 font-semibold uppercase">
                          Context Sources:
                        </span>
                        {msg.sources.map((src, sIdx) => (
                          <span
                            key={sIdx}
                            className="text-[10px] bg-white/5 border border-white/10 px-2 py-0.5 rounded text-slate-400 font-mono"
                          >
                            {src}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}

              {isTyping && (
                <div className="flex items-center gap-2 p-3 rounded-2xl bg-slate-900 border border-white/10 text-purple-400 text-xs w-fit">
                  <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                  <span>Searching vector embeddings & generating response...</span>
                </div>
              )}
              <div ref={chatBottomRef} />
            </div>

            {/* Chat Input Field */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleAskQuestion(chatInput);
              }}
              className="flex items-center gap-2"
            >
              <input
                type="text"
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                placeholder="Ask about Karthik's skills, companies, stack, or experience..."
                className="flex-1 bg-slate-950 border border-white/15 focus:border-purple-400 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-purple-400 transition-all"
              />
              <button
                type="submit"
                disabled={!chatInput.trim() || isTyping}
                className="p-3 bg-purple-600 hover:bg-purple-500 disabled:opacity-40 disabled:hover:bg-purple-600 text-white rounded-xl shadow-lg shadow-purple-600/25 transition-all"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        )}

        {/* ============================================================== */}
        {/* TAB 3: SYSTEM ARCHITECTURES VISUALIZER */}
        {/* ============================================================== */}
        {activeTab === "architecture" && (
          <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/60 border border-emerald-500/20 backdrop-blur-2xl shadow-2xl relative">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/10">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400">
                  <Layers className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white">System Architecture Blueprints</h3>
                  <p className="text-xs text-slate-400">
                    Real architectural workflows designed & implemented by Karthikeyan
                  </p>
                </div>
              </div>

              {/* Sub Architecture Selector */}
              <div className="flex p-1 rounded-xl bg-slate-950 border border-white/10">
                <button
                  onClick={() => {
                    playClickSound();
                    setActiveArch("trading");
                  }}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                    activeArch === "trading"
                      ? "bg-emerald-500 text-slate-950 font-bold"
                      : "text-slate-400 hover:text-white"
                  }`}
                >
                  Trading Engine
                </button>
                <button
                  onClick={() => {
                    playClickSound();
                    setActiveArch("erp");
                  }}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                    activeArch === "erp"
                      ? "bg-emerald-500 text-slate-950 font-bold"
                      : "text-slate-400 hover:text-white"
                  }`}
                >
                  Enterprise ERP
                </button>
                <button
                  onClick={() => {
                    playClickSound();
                    setActiveArch("rag");
                  }}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                    activeArch === "rag"
                      ? "bg-emerald-500 text-slate-950 font-bold"
                      : "text-slate-400 hover:text-white"
                  }`}
                >
                  AI RAG Pipeline
                </button>
              </div>
            </div>

            {/* Architecture Diagrams */}
            <div className="my-8">
              {activeArch === "trading" && (
                <div className="space-y-6">
                  <div className="p-4 rounded-xl bg-slate-950/80 border border-emerald-500/30 text-xs text-emerald-300">
                    <span className="font-bold">Domain:</span> High-Frequency Trading & Cryptocurrency Streaming (Pibase Solutions & Iouring)
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4 relative">
                    {/* Node 1 */}
                    <div className="p-5 rounded-2xl bg-slate-950 border border-cyan-500/40 text-center relative group">
                      <Smartphone className="w-8 h-8 text-cyan-400 mx-auto mb-2" />
                      <div className="font-bold text-white text-sm">React Native Client</div>
                      <p className="text-xs text-slate-400 mt-1">
                        White-label theming, memoized order book render & Redux Thunk
                      </p>
                      <span className="inline-block mt-3 px-2 py-0.5 rounded text-[10px] bg-cyan-500/10 text-cyan-300 font-mono">
                        60 FPS Native UI
                      </span>
                    </div>

                    {/* Node 2 */}
                    <div className="p-5 rounded-2xl bg-slate-950 border border-emerald-500/40 text-center relative group">
                      <Zap className="w-8 h-8 text-emerald-400 mx-auto mb-2 animate-bounce" />
                      <div className="font-bold text-white text-sm">Socket.IO & Event Bus</div>
                      <p className="text-xs text-slate-400 mt-1">
                        Bi-directional duplex stream with Mitt Event Bus decouple
                      </p>
                      <span className="inline-block mt-3 px-2 py-0.5 rounded text-[10px] bg-emerald-500/10 text-emerald-300 font-mono">
                        &lt;50ms Latency
                      </span>
                    </div>

                    {/* Node 3 */}
                    <div className="p-5 rounded-2xl bg-slate-950 border border-purple-500/40 text-center relative group">
                      <Server className="w-8 h-8 text-purple-400 mx-auto mb-2" />
                      <div className="font-bold text-white text-sm">Redis Pub/Sub & Cache</div>
                      <p className="text-xs text-slate-400 mt-1">
                        High throughput tick aggregation & state synchronization
                      </p>
                      <span className="inline-block mt-3 px-2 py-0.5 rounded text-[10px] bg-purple-500/10 text-purple-300 font-mono">
                        100k+ Events/min
                      </span>
                    </div>

                    {/* Node 4 */}
                    <div className="p-5 rounded-2xl bg-slate-950 border border-amber-500/40 text-center relative group">
                      <Database className="w-8 h-8 text-amber-400 mx-auto mb-2" />
                      <div className="font-bold text-white text-sm">REST & Order Engine</div>
                      <p className="text-xs text-slate-400 mt-1">
                        Trade order execution, portfolio ledger & PostgreSQL logs
                      </p>
                      <span className="inline-block mt-3 px-2 py-0.5 rounded text-[10px] bg-amber-500/10 text-amber-300 font-mono">
                        ACID Compliant
                      </span>
                    </div>
                  </div>
                </div>
              )}

              {activeArch === "erp" && (
                <div className="space-y-6">
                  <div className="p-4 rounded-xl bg-slate-950/80 border border-emerald-500/30 text-xs text-emerald-300">
                    <span className="font-bold">Domain:</span> Enterprise ERP & Omnichannel Marketing Automation (Micromen Software)
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div className="p-5 rounded-2xl bg-slate-950 border border-cyan-500/40 text-center">
                      <Smartphone className="w-8 h-8 text-cyan-400 mx-auto mb-2" />
                      <div className="font-bold text-white text-sm">Field App & Web Portal</div>
                      <p className="text-xs text-slate-400 mt-1">
                        React.js admin dashboard + React Native field tracking app
                      </p>
                      <span className="inline-block mt-3 px-2 py-0.5 rounded text-[10px] bg-cyan-500/10 text-cyan-300 font-mono">
                        Live GPS + VoIP
                      </span>
                    </div>

                    <div className="p-5 rounded-2xl bg-slate-950 border border-emerald-500/40 text-center">
                      <Radio className="w-8 h-8 text-emerald-400 mx-auto mb-2" />
                      <div className="font-bold text-white text-sm">Omnichannel Webhooks</div>
                      <p className="text-xs text-slate-400 mt-1">
                        Meta Ads API, WhatsApp Business API & Instagram Graph API
                      </p>
                      <span className="inline-block mt-3 px-2 py-0.5 rounded text-[10px] bg-emerald-500/10 text-emerald-300 font-mono">
                        Automated Leads
                      </span>
                    </div>

                    <div className="p-5 rounded-2xl bg-slate-950 border border-indigo-500/40 text-center">
                      <Server className="w-8 h-8 text-indigo-400 mx-auto mb-2" />
                      <div className="font-bold text-white text-sm">ASP.NET Core Engine</div>
                      <p className="text-xs text-slate-400 mt-1">
                        Workflow dispatcher, push notifications, VoIP recording & Zoom API
                      </p>
                      <span className="inline-block mt-3 px-2 py-0.5 rounded text-[10px] bg-indigo-500/10 text-indigo-300 font-mono">
                        Enterprise APIs
                      </span>
                    </div>

                    <div className="p-5 rounded-2xl bg-slate-950 border border-teal-500/40 text-center">
                      <FileCode className="w-8 h-8 text-teal-400 mx-auto mb-2" />
                      <div className="font-bold text-white text-sm">Report & Analytics</div>
                      <p className="text-xs text-slate-400 mt-1">
                        High-fidelity automated PDF invoices, Excel telemetry & SQL logs
                      </p>
                      <span className="inline-block mt-3 px-2 py-0.5 rounded text-[10px] bg-teal-500/10 text-teal-300 font-mono">
                        Instant Export
                      </span>
                    </div>
                  </div>
                </div>
              )}

              {activeArch === "rag" && (
                <div className="space-y-6">
                  <div className="p-4 rounded-xl bg-slate-950/80 border border-emerald-500/30 text-xs text-emerald-300">
                    <span className="font-bold">Domain:</span> Retrieval-Augmented Generation Knowledge Pipeline
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div className="p-5 rounded-2xl bg-slate-950 border border-purple-500/40 text-center">
                      <FileCode className="w-8 h-8 text-purple-400 mx-auto mb-2" />
                      <div className="font-bold text-white text-sm">Document Ingestion</div>
                      <p className="text-xs text-slate-400 mt-1">
                        PDF/Text extraction & recursive semantic chunking
                      </p>
                      <span className="inline-block mt-3 px-2 py-0.5 rounded text-[10px] bg-purple-500/10 text-purple-300 font-mono">
                        Clean Chunks
                      </span>
                    </div>

                    <div className="p-5 rounded-2xl bg-slate-950 border border-cyan-500/40 text-center">
                      <Cpu className="w-8 h-8 text-cyan-400 mx-auto mb-2" />
                      <div className="font-bold text-white text-sm">Vector Embeddings</div>
                      <p className="text-xs text-slate-400 mt-1">
                        High-dimensional cosine similarity indexing & storage
                      </p>
                      <span className="inline-block mt-3 px-2 py-0.5 rounded text-[10px] bg-cyan-500/10 text-cyan-300 font-mono">
                        &lt;800ms Retrieval
                      </span>
                    </div>

                    <div className="p-5 rounded-2xl bg-slate-950 border border-emerald-500/40 text-center">
                      <Server className="w-8 h-8 text-emerald-400 mx-auto mb-2" />
                      <div className="font-bold text-white text-sm">FastAPI Inference</div>
                      <p className="text-xs text-slate-400 mt-1">
                        Context synthesis, prompt engineering & hallucination guardrails
                      </p>
                      <span className="inline-block mt-3 px-2 py-0.5 rounded text-[10px] bg-emerald-500/10 text-emerald-300 font-mono">
                        Asynchronous I/O
                      </span>
                    </div>

                    <div className="p-5 rounded-2xl bg-slate-950 border border-pink-500/40 text-center">
                      <Bot className="w-8 h-8 text-pink-400 mx-auto mb-2" />
                      <div className="font-bold text-white text-sm">React.js UI Stream</div>
                      <p className="text-xs text-slate-400 mt-1">
                        Token-by-token streaming response with explicit citation tags
                      </p>
                      <span className="inline-block mt-3 px-2 py-0.5 rounded text-[10px] bg-pink-500/10 text-pink-300 font-mono">
                        Zero Hallucinations
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

