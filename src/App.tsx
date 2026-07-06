/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import { 
  Search, 
  Sparkles, 
  LayoutDashboard, 
  FileText, 
  RefreshCw, 
  ArrowRight, 
  AlertCircle,
  HelpCircle
} from "lucide-react";
import { BackgroundGlow } from "./components/BackgroundGlow.jsx";
import { StepProgress } from "./components/StepProgress.jsx";
import { InteractiveDashboard } from "./components/InteractiveDashboard.jsx";
import { MarkdownReport } from "./components/MarkdownReport.jsx";
import { PipelineState } from "./types.js";

const PRESETS = [
  "Underwater drone hull cleaning subscription",
  "Generative AI automated dental bill audits",
  "WASM-based real-time localized video editor",
  "Decentralized carbon credits for shipping fleets"
];

export default function App() {
  const [niche, setNiche] = useState("");
  const [loading, setLoading] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
  const [isResearchOnly, setIsResearchOnly] = useState(false);
  const [pipelineState, setPipelineState] = useState<PipelineState | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<"visual" | "report">("visual");

  // Run the sequential pipeline API calls
  const handleAnalyze = async (selectedNiche: string, researchOnly: boolean) => {
    if (!selectedNiche.trim()) return;
    
    setNiche(selectedNiche);
    setLoading(true);
    setIsResearchOnly(researchOnly);
    setError(null);
    setPipelineState(null);
    setActiveStep(1);

    // Dynamic step simulator to track agent progress organically
    let simInterval: NodeJS.Timeout;
    const maxSteps = researchOnly ? 1 : 7;
    
    simInterval = setInterval(() => {
      setActiveStep(prev => {
        if (prev < maxSteps) {
          return prev + 1;
        } else {
          clearInterval(simInterval);
          return prev;
        }
      });
    }, 2800);

    try {
      const endpoint = researchOnly 
        ? `/research/${encodeURIComponent(selectedNiche)}`
        : `/opportunity/${encodeURIComponent(selectedNiche)}`;

      const response = await fetch(endpoint);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Execution failed. Check server logs.");
      }

      // Complete simulation and store state
      clearInterval(simInterval);
      setActiveStep(8); // Enter complete view
      setPipelineState(data);
      setActiveTab(researchOnly ? "visual" : "visual");
    } catch (err: any) {
      clearInterval(simInterval);
      setError(err.message || "A network error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const resetSearch = () => {
    setPipelineState(null);
    setActiveStep(0);
    setError(null);
  };

  return (
    <div className="min-h-screen flex flex-col justify-between py-6 px-4 md:px-8 relative" id="app-root">
      <BackgroundGlow />

      {/* Header (Hidden when printing to protect document look) */}
      <header className="w-full max-w-7xl mx-auto flex justify-between items-center mb-8 no-print" id="app-header">
        <div className="flex items-center gap-3">
          <div className="h-9 w-9 rounded-xl bg-gradient-to-tr from-violet-600 to-cyan-400 flex items-center justify-center shadow-lg shadow-violet-500/20">
            <Sparkles className="h-5 w-5 text-white" />
          </div>
          <div>
            <h1 className="font-display font-bold text-lg text-white leading-none tracking-tight">
              OpportunityMiner AI
            </h1>
            <span className="text-[10px] font-mono text-gray-400 tracking-wider">
              KAGGLE CAPSTONE AGENT SWARM
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/5" id="header-status">
          <span className={`h-2 w-2 rounded-full ${loading ? "bg-amber-400 animate-pulse" : "bg-emerald-500"}`} />
          <span className="font-mono text-[10px] font-bold text-gray-300">
            {loading ? "SWARM: ENGAGED" : "SWARM: STANDBY"}
          </span>
        </div>
      </header>

      {/* Main Container */}
      <main className="flex-1 w-full max-w-7xl mx-auto flex items-center justify-center" id="app-main">
        {/* 1. INITIAL LANDING VIEW */}
        {activeStep === 0 && (
          <div className="w-full max-w-3xl text-center space-y-8 py-12" id="landing-view">
            <div className="space-y-4">
              <span className="px-3 py-1 rounded-full bg-violet-500/10 text-violet-400 border border-violet-500/20 font-mono text-xs font-semibold">
                Multi-Agent Intelligence Platform
              </span>
              <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.1]">
                Mine Startup Gaps in <br />
                <span className="bg-gradient-to-r from-violet-400 via-fuchsia-400 to-cyan-400 bg-clip-text text-transparent">
                  Any Industry Niche
                </span>
              </h2>
              <p className="text-gray-400 text-sm md:text-base max-w-xl mx-auto leading-relaxed">
                Unlock VC-grade opportunity formulation. Type in an unmapped niche and watch a specialized pipeline of AI agents detail pain points, map emerging tech catalysts, dissect incumbents, and draft complete startup models.
              </p>
            </div>

            {/* Glowing Search Box Container */}
            <div className="glass-panel p-2 rounded-2xl border border-white/10 max-w-2xl mx-auto shadow-2xl shadow-black/40" id="search-box">
              <div className="flex flex-col sm:flex-row gap-2">
                <div className="flex-1 relative flex items-center">
                  <Search className="absolute left-4 h-5 w-5 text-gray-500" />
                  <input
                    type="text"
                    value={niche}
                    onChange={(e) => setNiche(e.target.value)}
                    placeholder="Enter an industry niche (e.g., 'underwater hull cleaning')..."
                    className="w-full pl-12 pr-4 py-3 bg-transparent text-white placeholder-gray-500 border-none rounded-xl focus:outline-none focus:ring-0 text-sm md:text-base"
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && niche.trim()) {
                        handleAnalyze(niche, false);
                      }
                    }}
                  />
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleAnalyze(niche, true)}
                    disabled={!niche.trim()}
                    className="flex-1 sm:flex-none px-4 py-3 rounded-xl bg-white/5 hover:bg-white/10 text-gray-300 font-mono text-xs font-semibold border border-white/10 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                  >
                    Research Only
                  </button>
                  <button
                    onClick={() => handleAnalyze(niche, false)}
                    disabled={!niche.trim()}
                    className="flex-1 sm:flex-none px-6 py-3 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white font-mono text-xs font-bold disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg shadow-violet-500/20"
                  >
                    Mine Concept
                  </button>
                </div>
              </div>
            </div>

            {/* Presets Grid */}
            <div className="space-y-3" id="presets-container">
              <span className="font-mono text-[10px] font-bold text-gray-500 tracking-wider uppercase">
                Explore Emerging Greenfield Samples
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-2xl mx-auto">
                {PRESETS.map((preset, i) => (
                  <button
                    key={i}
                    onClick={() => {
                      setNiche(preset);
                      handleAnalyze(preset, false);
                    }}
                    className="p-4 rounded-xl glass-panel hover:bg-white/5 border border-white/5 text-left transition-all group flex items-center justify-between"
                  >
                    <span className="text-xs text-gray-300 font-medium group-hover:text-white truncate pr-2">
                      {preset}
                    </span>
                    <ArrowRight className="h-4 w-4 text-gray-500 group-hover:text-cyan-400 group-hover:translate-x-1 transition-all flex-shrink-0" />
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* 2. LOADING PROGRESS VIEW */}
        {activeStep > 0 && activeStep < 8 && !error && (
          <div className="py-12 w-full" id="loading-view">
            <StepProgress 
              activeStep={activeStep} 
              isResearchOnly={isResearchOnly} 
              niche={niche} 
            />
          </div>
        )}

        {/* 3. ERROR FALLBACK */}
        {error && (
          <div className="w-full max-w-md mx-auto glass-panel p-8 rounded-2xl border border-rose-500/20 text-center space-y-4 shadow-xl" id="error-fallback">
            <AlertCircle className="h-12 w-12 text-rose-500 mx-auto" />
            <h3 className="font-display text-lg font-bold text-white">Pipeline Execution Halted</h3>
            <p className="text-gray-300 text-xs leading-relaxed">{error}</p>
            <button
              onClick={resetSearch}
              className="px-5 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-white font-mono text-xs border border-white/10 transition-all inline-flex items-center gap-2"
            >
              <RefreshCw className="h-3.5 w-3.5" />
              Reset Workspace
            </button>
          </div>
        )}

        {/* 4. RESULTS DASHBOARD VIEW */}
        {activeStep === 8 && pipelineState && !error && (
          <div className="w-full space-y-8 py-4" id="results-view">
            {/* Top Navigation Bar (Hidden on print) */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-[#0d1222]/80 backdrop-blur-xl border border-white/5 p-4 rounded-2xl no-print" id="dashboard-navbar">
              <div>
                <span className="font-mono text-[10px] text-gray-500 font-bold uppercase tracking-wider">
                  OPPORTUNITY PLATFORM RESULTS
                </span>
                <h3 className="font-display text-xl font-bold text-white truncate">
                  Niche: <span className="text-cyan-400">"{niche}"</span>
                </h3>
              </div>

              <div className="flex items-center gap-2">
                {/* Tab buttons */}
                <div className="flex rounded-lg bg-black/40 p-1 border border-white/5">
                  <button
                    onClick={() => setActiveTab("visual")}
                    className={`flex items-center gap-2 px-3 py-1.5 rounded-md font-mono text-xs font-semibold transition-all ${
                      activeTab === "visual"
                        ? "bg-violet-600 text-white shadow"
                        : "text-gray-400 hover:text-white"
                    }`}
                  >
                    <LayoutDashboard className="h-3.5 w-3.5" />
                    VC Deck
                  </button>
                  {!isResearchOnly && (
                    <button
                      onClick={() => setActiveTab("report")}
                      className={`flex items-center gap-2 px-3 py-1.5 rounded-md font-mono text-xs font-semibold transition-all ${
                        activeTab === "report"
                          ? "bg-violet-600 text-white shadow"
                          : "text-gray-400 hover:text-white"
                      }`}
                    >
                      <FileText className="h-3.5 w-3.5" />
                      Investment Memo
                    </button>
                  )}
                </div>

                {/* Back / Search another */}
                <button
                  onClick={resetSearch}
                  className="px-4 py-2.5 rounded-lg bg-white/5 hover:bg-white/10 text-white font-mono text-xs font-semibold border border-white/10 transition-all flex items-center gap-2"
                >
                  <RefreshCw className="h-3.5 w-3.5" />
                  Analyze New
                </button>
              </div>
            </div>

            {/* Dashboard Workspace */}
            <div id="dashboard-workspace">
              {activeTab === "visual" ? (
                <InteractiveDashboard state={pipelineState} />
              ) : (
                <MarkdownReport markdown={pipelineState.report || ""} niche={niche} />
              )}
            </div>
          </div>
        )}
      </main>

      {/* Footer (Hidden when printing to protect document look) */}
      <footer className="w-full max-w-7xl mx-auto border-t border-white/5 pt-6 mt-12 text-center text-[10px] font-mono text-gray-500 flex flex-col sm:flex-row justify-between items-center gap-4 no-print" id="app-footer-bar">
        <div>
          &copy; 2026 OpportunityMiner AI. All rights reserved.
        </div>
        <div className="flex items-center gap-2">
          <span>Swarm Engine v1.4.2</span>
          <span className="text-gray-700">|</span>
          <a href="#how" className="hover:text-gray-400 transition-colors inline-flex items-center gap-1">
            <HelpCircle className="h-3.5 w-3.5" />
            Vibe Coding Thesis
          </a>
        </div>
      </footer>
    </div>
  );
}
