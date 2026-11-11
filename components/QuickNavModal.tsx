"use client";

import React, { useState, useEffect } from "react";
import { projectsData, personalInfo } from "@/data/portfolioData";
import { playClickSound } from "@/lib/soundEffects";
import {
  Search,
  X,
  FileText,
  Briefcase,
  Layers,
  Code2,
  Mail,
  Zap,
  GraduationCap,
  ExternalLink,
} from "lucide-react";

interface QuickNavModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenResume: () => void;
}

export default function QuickNavModal({ isOpen, onClose, onOpenResume }: QuickNavModalProps) {
  const [query, setQuery] = useState("");

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        onClose(); // toggle logic if needed
      } else if (e.key === "Escape") {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  if (!isOpen) return null;

  const quickActions = [
    {
      title: "View Official Resume / CV",
      category: "Documents",
      icon: <FileText className="w-4 h-4 text-cyan-400" />,
      action: () => {
        onClose();
        onOpenResume();
      },
    },
    {
      title: "Jump to Interactive Labs (Trading & AI)",
      category: "Navigation",
      icon: <Zap className="w-4 h-4 text-amber-400" />,
      href: "#labs",
    },
    {
      title: "Explore Featured Projects",
      category: "Navigation",
      icon: <Layers className="w-4 h-4 text-purple-400" />,
      href: "#projects",
    },
    {
      title: "View Work Experience & Timeline",
      category: "Navigation",
      icon: <Briefcase className="w-4 h-4 text-emerald-400" />,
      href: "#experience",
    },
    {
      title: "Review Skills Matrix & Competencies",
      category: "Navigation",
      icon: <Code2 className="w-4 h-4 text-sky-400" />,
      href: "#skills",
    },
    {
      title: "Academic Background & Education",
      category: "Navigation",
      icon: <GraduationCap className="w-4 h-4 text-pink-400" />,
      href: "#education",
    },
    {
      title: "Contact Karthikeyan (Email / WhatsApp)",
      category: "Contact",
      icon: <Mail className="w-4 h-4 text-red-400" />,
      href: "#contact",
    },
  ];

  const filteredActions = quickActions.filter(
    (item) =>
      query === "" ||
      item.title.toLowerCase().includes(query.toLowerCase()) ||
      item.category.toLowerCase().includes(query.toLowerCase())
  );

  const filteredProjects = projectsData.filter(
    (proj) =>
      query !== "" &&
      (proj.title.toLowerCase().includes(query.toLowerCase()) ||
        proj.tags.some((t) => t.toLowerCase().includes(query.toLowerCase())))
  );

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-150">
      <div
        className="w-full max-w-xl rounded-2xl bg-slate-900 border border-white/15 shadow-2xl overflow-hidden my-4"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div className="relative flex items-center border-b border-white/10 px-4 py-3.5 bg-slate-950">
          <Search className="w-5 h-5 text-cyan-400 mr-3 shrink-0" />
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Type a command, project, or section..."
            className="w-full bg-transparent text-sm text-white placeholder-slate-500 focus:outline-none"
          />
          <button
            onClick={() => {
              playClickSound();
              onClose();
            }}
            className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-white/5"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Results List */}
        <div className="max-h-80 overflow-y-auto p-3 space-y-1">
          {filteredActions.map((action, i) => (
            <div key={i}>
              {action.href ? (
                <a
                  href={action.href}
                  onClick={() => {
                    playClickSound();
                    onClose();
                  }}
                  className="flex items-center justify-between p-2.5 rounded-xl hover:bg-slate-800 text-slate-200 hover:text-white transition-colors text-xs font-medium group"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-1.5 rounded-lg bg-slate-950 border border-white/5">
                      {action.icon}
                    </div>
                    <span>{action.title}</span>
                  </div>
                  <span className="text-[10px] text-slate-500 font-mono group-hover:text-cyan-400">
                    {action.category}
                  </span>
                </a>
              ) : (
                <button
                  onClick={() => {
                    playClickSound();
                    action.action?.();
                  }}
                  className="w-full flex items-center justify-between p-2.5 rounded-xl hover:bg-slate-800 text-slate-200 hover:text-white transition-colors text-xs font-medium group"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-1.5 rounded-lg bg-slate-950 border border-white/5">
                      {action.icon}
                    </div>
                    <span>{action.title}</span>
                  </div>
                  <span className="text-[10px] text-slate-500 font-mono group-hover:text-cyan-400">
                    {action.category}
                  </span>
                </button>
              )}
            </div>
          ))}

          {/* Project Matches */}
          {filteredProjects.length > 0 && (
            <div className="pt-2 border-t border-white/10 mt-2">
              <p className="text-[10px] font-bold uppercase tracking-wider text-slate-500 px-2 py-1">
                Project Matches
              </p>
              {filteredProjects.map((p) => (
                <a
                  key={p.id}
                  href="#projects"
                  onClick={() => {
                    playClickSound();
                    onClose();
                  }}
                  className="flex items-center justify-between p-2 rounded-xl hover:bg-slate-800 text-slate-300 hover:text-white text-xs"
                >
                  <span>{p.title}</span>
                  <span className="text-[10px] text-cyan-400 font-mono">{p.category}</span>
                </a>
              ))}
            </div>
          )}
        </div>

        {/* Footer shortcuts helper */}
        <div className="p-3 bg-slate-950 border-t border-white/10 flex items-center justify-between text-[11px] text-slate-500">
          <span>Navigate with arrows or click</span>
          <span className="font-mono bg-white/5 px-2 py-0.5 rounded border border-white/10">ESC to close</span>
        </div>
      </div>
    </div>
  );
}

