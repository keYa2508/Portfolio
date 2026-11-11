"use client";

import React, { useRef, useState } from "react";
import {
  personalInfo,
  experienceData,
  projectsData,
  educationData,
  skillCategories,
} from "@/data/portfolioData";
import { playClickSound } from "@/lib/soundEffects";
import {
  X,
  Printer,
  Download,
  Mail,
  Phone,
  MapPin,
  Globe,
  CheckCircle2,
  Calendar,
  Briefcase,
  GraduationCap,
  Sparkles,
  ExternalLink,
  FileText,
} from "lucide-react";
import GithubIcon from "@/components/GithubIcon";

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ResumeModal({ isOpen, onClose }: ResumeModalProps) {
  const resumePrintRef = useRef<HTMLDivElement>(null);
  const [viewMode, setViewMode] = useState<"interactive" | "pdf">(
    "interactive",
  );
  const pdfUrl = "/resume.pdf";

  if (!isOpen) return null;

  const handlePrint = () => {
    playClickSound();

    // Create or reuse hidden iframe to print the actual PDF file
    let printIframe = document.getElementById(
      "pdf-print-iframe",
    ) as HTMLIFrameElement | null;
    if (!printIframe) {
      printIframe = document.createElement("iframe");
      printIframe.id = "pdf-print-iframe";
      printIframe.style.position = "fixed";
      printIframe.style.right = "0";
      printIframe.style.bottom = "0";
      printIframe.style.width = "0";
      printIframe.style.height = "0";
      printIframe.style.border = "none";
      document.body.appendChild(printIframe);
    }

    printIframe.src = pdfUrl;
    printIframe.onload = () => {
      try {
        printIframe?.contentWindow?.focus();
        printIframe?.contentWindow?.print();
      } catch {
        // Fallback: open directly in a new window to print
        const printWindow = window.open(pdfUrl, "_blank");
        if (printWindow) {
          printWindow.focus();
        }
      }
    };
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-4xl rounded-3xl bg-slate-900 border border-white/15 shadow-2xl overflow-hidden my-6 flex flex-col max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Toolbar */}
        <div className="p-4 sm:p-5 bg-slate-950 border-b border-white/10 flex flex-wrap items-center justify-between gap-3 print:hidden">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-cyan-400" />
              <span className="text-xs sm:text-sm font-bold text-white tracking-wide">
                Resume • Karthikeyan Manikandan
              </span>
            </div>

            {/* View Switcher Tabs */}
            <div className="flex p-0.5 rounded-xl bg-slate-900 border border-white/10 text-xs">
              <button
                onClick={() => {
                  playClickSound();
                  setViewMode("interactive");
                }}
                className={`px-3 py-1 rounded-lg font-medium transition-colors ${
                  viewMode === "interactive"
                    ? "bg-cyan-500 text-slate-950 font-bold"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                Structured View
              </button>
              <button
                onClick={() => {
                  playClickSound();
                  setViewMode("pdf");
                }}
                className={`px-3 py-1 rounded-lg font-medium transition-colors ${
                  viewMode === "pdf"
                    ? "bg-cyan-500 text-slate-950 font-bold"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                Original PDF
              </button>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Print Actual PDF Button */}
            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-semibold shadow-lg shadow-cyan-600/20 transition-colors"
              title="Print your PDF resume"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print PDF</span>
            </button>

            {/* Download Original PDF Button */}
            <a
              href={pdfUrl}
              download="resume.pdf"
              onClick={playClickSound}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white text-xs font-semibold border border-white/10 transition-colors"
              title="Download PDF to computer"
            >
              <Download className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Download</span>
            </a>

            {/* Open in New Window */}
            <a
              href={pdfUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={playClickSound}
              className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-colors"
              title="Open PDF in new tab"
            >
              <ExternalLink className="w-4 h-4" />
            </a>

            {/* Close Button */}
            <button
              onClick={() => {
                playClickSound();
                onClose();
              }}
              className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-colors"
              title="Close modal"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Content View: Original PDF Embed */}
        {viewMode === "pdf" ? (
          <div className="w-full h-[76vh] bg-slate-950 p-2 sm:p-4">
            <iframe
              src={`${pdfUrl}#toolbar=1&navpanes=0`}
              className="w-full h-full rounded-2xl border border-white/10 bg-white"
              title="Karthikeyan Manikandan Resume PDF"
            />
          </div>
        ) : (
          /* Content View: Structured Document */
          <div
            ref={resumePrintRef}
            className="p-6 sm:p-10 overflow-y-auto space-y-8 bg-slate-950 text-slate-200 print:bg-white print:text-black print:p-0 print:overflow-visible"
          >
            {/* Header */}
            <div className="border-b border-white/10 pb-6 print:border-black/20">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h1 className="text-3xl font-black text-white tracking-tight uppercase print:text-black">
                    {personalInfo.name}
                  </h1>
                  <p className="text-sm font-bold text-cyan-400 tracking-wider uppercase mt-1 print:text-blue-800">
                    {personalInfo.title}
                  </p>
                </div>

                {/* Contact meta */}
                <div className="text-xs text-slate-300 space-y-1 sm:text-right font-medium print:text-neutral-700">
                  <div className="flex items-center sm:justify-end gap-1.5">
                    <Mail className="w-3.5 h-3.5 text-cyan-400 print:text-neutral-800" />
                    <a href={`mailto:${personalInfo.email}`}>
                      {personalInfo.email}
                    </a>
                  </div>
                  <div className="flex items-center sm:justify-end gap-1.5">
                    <Phone className="w-3.5 h-3.5 text-emerald-400 print:text-neutral-800" />
                    <a href={`tel:${personalInfo.phone}`}>
                      {personalInfo.phoneFormatted}
                    </a>
                  </div>
                  <div className="flex items-center sm:justify-end gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-purple-400 print:text-neutral-800" />
                    <span>{personalInfo.location}</span>
                  </div>
                  <div className="flex items-center sm:justify-end gap-1.5">
                    <Globe className="w-3.5 h-3.5 text-sky-400 print:text-neutral-800" />
                    <span>{personalInfo.livePortfolio}</span>
                  </div>
                  <div className="flex items-center sm:justify-end gap-1.5">
                    <GithubIcon className="w-3.5 h-3.5 text-slate-300 print:text-neutral-800" />
                    <span>{personalInfo.github}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Professional Summary */}
            <div>
              <h2 className="text-xs font-bold uppercase tracking-widest text-cyan-400 border-b border-white/10 pb-1 mb-2.5 print:text-neutral-900 print:border-neutral-300">
                Executive Summary
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal print:text-neutral-800">
                {personalInfo.bio} {personalInfo.extendedBio}
              </p>
            </div>

            {/* Technical Skills */}
            <div>
              <h2 className="text-xs font-bold uppercase tracking-widest text-cyan-400 border-b border-white/10 pb-1 mb-3 print:text-neutral-900 print:border-neutral-300">
                Skills Matrix
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                {skillCategories.map((cat) => (
                  <div
                    key={cat.title}
                    className="p-2.5 rounded-xl bg-slate-900/60 border border-white/5 print:bg-neutral-50 print:border-neutral-200"
                  >
                    <span className="font-bold text-white print:text-black block mb-1">
                      {cat.title}:
                    </span>
                    <span className="text-slate-300 print:text-neutral-700">
                      {cat.skills.map((s) => s.name).join(", ")}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Work Experience */}
            <div>
              <h2 className="text-xs font-bold uppercase tracking-widest text-cyan-400 border-b border-white/10 pb-1 mb-4 print:text-neutral-900 print:border-neutral-300">
                Professional Work Experience
              </h2>
              <div className="space-y-5">
                {experienceData.map((exp) => (
                  <div key={exp.id} className="text-xs sm:text-sm">
                    <div className="flex flex-wrap items-center justify-between gap-1 mb-1">
                      <div>
                        <span className="font-bold text-white print:text-black text-sm">
                          {exp.role}
                        </span>{" "}
                        <span className="text-cyan-400 print:text-neutral-800 font-semibold">
                          • {exp.company}
                        </span>
                      </div>
                      <span className="text-xs font-mono text-slate-400 print:text-neutral-600">
                        {exp.period} | {exp.location}
                      </span>
                    </div>
                    <ul className="space-y-1.5 mt-2 pl-3 border-l-2 border-cyan-500/30 print:border-neutral-400">
                      {exp.achievements.map((item, i) => (
                        <li
                          key={i}
                          className="text-xs text-slate-300 print:text-neutral-800 leading-relaxed"
                        >
                          • {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            {/* Key Projects */}
            <div>
              <h2 className="text-xs font-bold uppercase tracking-widest text-cyan-400 border-b border-white/10 pb-1 mb-4 print:text-neutral-900 print:border-neutral-300">
                Key Production Projects
              </h2>
              <div className="space-y-4 text-xs">
                {projectsData.map((proj) => (
                  <div
                    key={proj.id}
                    className="p-3 rounded-xl bg-slate-900/40 border border-white/5 print:bg-neutral-50 print:border-neutral-200"
                  >
                    <div className="flex justify-between items-center mb-1">
                      <span className="font-bold text-white print:text-black">
                        {proj.title}
                      </span>
                      <span className="text-[10px] font-mono text-cyan-400 print:text-neutral-600">
                        {proj.category}
                      </span>
                    </div>
                    <p className="text-slate-300 print:text-neutral-800 mb-2 leading-relaxed">
                      {proj.description}
                    </p>
                    <div className="text-[11px] text-slate-400 print:text-neutral-600">
                      <span className="font-semibold text-slate-200 print:text-black">
                        Tech Stack:{" "}
                      </span>
                      {proj.tags.join(" • ")}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Education */}
            <div>
              <h2 className="text-xs font-bold uppercase tracking-widest text-cyan-400 border-b border-white/10 pb-1 mb-3 print:text-neutral-900 print:border-neutral-300">
                Education
              </h2>
              <div className="space-y-2 text-xs">
                {educationData.map((edu, idx) => (
                  <div
                    key={idx}
                    className="flex justify-between items-center py-1"
                  >
                    <div>
                      <span className="font-bold text-white print:text-black">
                        {edu.degree}
                      </span>
                      <div className="text-slate-400 print:text-neutral-600">
                        {edu.institution}
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="font-mono text-cyan-400 print:text-neutral-800 font-bold">
                        {edu.score}
                      </span>
                      <div className="text-[11px] text-slate-500 print:text-neutral-600">
                        {edu.period}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
