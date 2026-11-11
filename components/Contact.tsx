"use client";

import React, { useState } from "react";
import confetti from "canvas-confetti";
import { personalInfo } from "@/data/portfolioData";
import { playClickSound, playSuccessSound } from "@/lib/soundEffects";
import {
  Mail,
  Phone,
  MapPin,
  Send,
  Check,
  Copy,
  MessageSquare,
  Sparkles,
  ArrowRight,
  ExternalLink,
  AlertCircle,
  Loader2,
} from "lucide-react";
import GithubIcon from "@/components/GithubIcon";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "Full-Time Role Inquiry",
    message: "",
  });

  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleCopyEmail = () => {
    playClickSound();
    navigator.clipboard.writeText(personalInfo.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  const handleCopyPhone = () => {
    playClickSound();
    navigator.clipboard.writeText(personalInfo.phone);
    setCopiedPhone(true);
    setTimeout(() => setCopiedPhone(false), 2500);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setIsSubmitting(true);
    setErrorMessage(null);
    playClickSound();

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.message || "Failed to send message. Please try again.");
      }

      setSubmitted(true);
      playSuccessSound();

      // Confetti burst
      try {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 },
          colors: ["#38bdf8", "#818cf8", "#34d399", "#f43f5e"],
        });
      } catch {
        // Fallback
      }
    } catch (err: unknown) {
      const error = err as Error;
      setErrorMessage(error.message || "Something went wrong sending your message.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-24 relative overflow-hidden">
      {/* Background glow lights */}
      <div className="absolute top-1/3 left-1/3 w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-[160px] pointer-events-none -z-10" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-purple-500/10 rounded-full blur-[140px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-cyan-300 text-xs font-semibold uppercase tracking-wider mb-4 shadow-lg shadow-cyan-500/10">
            <MessageSquare className="w-3.5 h-3.5 text-cyan-400" />
            <span>Get In Touch</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Let&apos;s Build Something <span className="gradient-text-cyan">Remarkable</span>
          </h2>
          <p className="mt-4 text-slate-300 text-base sm:text-lg">
            Whether you are looking to hire a Full Stack & Mobile Engineer, need a high-frequency
            real-time engine, or want to collaborate on AI RAG apps, my inbox is open!
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Direct Info Cards & Quick Reach */}
          <div className="lg:col-span-5 space-y-4">
            {/* Email Card */}
            <div className="p-6 rounded-3xl bg-slate-900/70 border border-white/10 hover:border-cyan-500/40 backdrop-blur-xl transition-all duration-300 group">
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-center gap-3.5">
                  <div className="p-3 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 group-hover:scale-110 transition-transform">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs font-medium text-slate-400">Direct Email</p>
                    <a
                      href={`mailto:${personalInfo.email}`}
                      className="text-sm sm:text-base font-bold text-white hover:text-cyan-400 transition-colors break-all"
                    >
                      {personalInfo.email}
                    </a>
                  </div>
                </div>

                <button
                  onClick={handleCopyEmail}
                  className="p-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors border border-white/5"
                  title="Copy email to clipboard"
                >
                  {copiedEmail ? (
                    <Check className="w-4 h-4 text-emerald-400" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>

            {/* Phone & WhatsApp Card */}
            <div className="p-6 rounded-3xl bg-slate-900/70 border border-white/10 hover:border-emerald-500/40 backdrop-blur-xl transition-all duration-300 group">
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-center gap-3.5">
                  <div className="p-3 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 group-hover:scale-110 transition-transform">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs font-medium text-slate-400">Phone & WhatsApp</p>
                    <a
                      href={`tel:${personalInfo.phone}`}
                      className="text-sm sm:text-base font-bold text-white hover:text-emerald-400 transition-colors"
                    >
                      {personalInfo.phoneFormatted}
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-1.5">
                  <button
                    onClick={handleCopyPhone}
                    className="p-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors border border-white/5"
                    title="Copy phone to clipboard"
                  >
                    {copiedPhone ? (
                      <Check className="w-4 h-4 text-emerald-400" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </button>
                  <a
                    href="https://wa.me/918072647772"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={playClickSound}
                    className="p-2.5 rounded-xl bg-emerald-600/30 hover:bg-emerald-600 text-emerald-300 hover:text-white transition-colors border border-emerald-500/30"
                    title="Chat on WhatsApp"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>

            {/* Location & Relocation Card */}
            <div className="p-6 rounded-3xl bg-slate-900/70 border border-white/10 backdrop-blur-xl">
              <div className="flex items-center gap-3.5">
                <div className="p-3 rounded-2xl bg-purple-500/10 border border-purple-500/20 text-purple-400">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs font-medium text-slate-400">Location & Availability</p>
                  <p className="text-sm font-bold text-white">Chennai, Tamil Nadu, India</p>
                  <p className="text-xs text-emerald-400 mt-0.5">
                    Open to Remote, Hybrid & Relocation
                  </p>
                </div>
              </div>
            </div>

            {/* GitHub & Portfolio */}
            <div className="p-6 rounded-3xl bg-slate-900/70 border border-white/10 backdrop-blur-xl">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3.5">
                  <div className="p-3 rounded-2xl bg-slate-800 border border-white/10 text-white">
                    <GithubIcon className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs font-medium text-slate-400">GitHub Profile</p>
                    <p className="text-sm font-bold text-white">github.com/keYa2508</p>
                  </div>
                </div>

                <a
                  href={personalInfo.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={playClickSound}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-white bg-slate-800 hover:bg-slate-700 border border-white/10 transition-colors flex items-center gap-1.5"
                >
                  <span>Visit</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Message Form */}
          <div className="lg:col-span-7 p-6 sm:p-8 rounded-3xl bg-slate-900/80 border border-white/10 backdrop-blur-2xl shadow-2xl relative">
            {submitted ? (
              <div className="py-12 text-center space-y-4 animate-in fade-in duration-300">
                <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mx-auto">
                  <Check className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold text-white">Message Sent Successfully!</h3>
                <p className="text-slate-300 text-sm max-w-md mx-auto leading-relaxed">
                  Thank you for reaching out, <span className="text-white font-semibold">{formData.name}</span>.
                  Karthikeyan will review your message and get back to you within 24 hours at{" "}
                  <span className="text-cyan-400 font-mono">{formData.email}</span>.
                </p>
                <button
                  onClick={() => {
                    playClickSound();
                    setSubmitted(false);
                    setFormData({
                      name: "",
                      email: "",
                      subject: "Full-Time Role Inquiry",
                      message: "",
                    });
                  }}
                  className="mt-4 px-6 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-white border border-white/10 transition-colors"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="flex items-center gap-2 mb-2">
                  <Sparkles className="w-4 h-4 text-cyan-400" />
                  <h3 className="text-lg font-bold text-white">Send Direct Message</h3>
                </div>

                {/* Inquiry Type Chips */}
                <div>
                  <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                    Inquiry Intent
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                    {[
                      "Full-Time Role Inquiry",
                      "React Native Project",
                      "Consulting / Contract",
                    ].map((subj) => (
                      <button
                        type="button"
                        key={subj}
                        onClick={() => {
                          playClickSound();
                          setFormData({ ...formData, subject: subj });
                        }}
                        className={`px-3 py-2 rounded-xl text-xs font-semibold border transition-all text-center ${
                          formData.subject === subj
                            ? "bg-cyan-500 text-slate-950 font-bold border-cyan-400 shadow-md shadow-cyan-500/20"
                            : "bg-slate-950/60 border-white/10 text-slate-400 hover:text-white hover:border-white/20"
                        }`}
                      >
                        {subj}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Name & Email Inputs */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-400 mb-1.5">
                      Your Name <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Satya Nadella / Hiring Lead"
                      className="w-full bg-slate-950 border border-white/10 focus:border-cyan-400 rounded-xl px-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-cyan-400 transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-400 mb-1.5">
                      Your Email <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="e.g. recruiter@company.com"
                      className="w-full bg-slate-950 border border-white/10 focus:border-cyan-400 rounded-xl px-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-cyan-400 transition-all"
                    />
                  </div>
                </div>

                {/* Message TextArea */}
                <div>
                  <label className="block text-xs font-semibold text-slate-400 mb-1.5">
                    Message Details <span className="text-red-400">*</span>
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Tell me about your team, tech stack, position, or project timeline..."
                    className="w-full bg-slate-950 border border-white/10 focus:border-cyan-400 rounded-xl px-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-cyan-400 transition-all resize-none"
                  />
                </div>

                {/* Error Banner */}
                {errorMessage && (
                  <div className="p-3.5 rounded-xl bg-red-500/15 border border-red-500/30 text-red-300 text-xs flex items-center gap-2.5 animate-in fade-in">
                    <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
                    <span>{errorMessage}</span>
                  </div>
                )}

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3.5 rounded-xl font-bold text-xs uppercase tracking-wider text-white bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 shadow-xl shadow-cyan-500/25 transition-all duration-300 active:scale-98 flex items-center justify-center gap-2 disabled:opacity-60 cursor-pointer disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Sending via Nodemailer...</span>
                    </>
                  ) : (
                    <>
                      <span>Transmit Message</span>
                      <Send className="w-4 h-4" />
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
