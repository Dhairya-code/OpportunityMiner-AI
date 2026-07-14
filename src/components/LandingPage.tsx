/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import { 
  Search, 
  Sparkles, 
  ArrowRight, 
  Shield, 
  Zap, 
  Database, 
  Network, 
  Cpu, 
  Layers, 
  Terminal, 
  ChevronDown, 
  CheckCircle, 
  TrendingUp, 
  Target, 
  LineChart, 
  BookOpen,
  HelpCircle,
  Clock,
  Briefcase
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface LandingPageProps {
  niche: string;
  setNiche: (val: string) => void;
  onAnalyze: (niche: string, isResearchOnly: boolean) => void;
  presets: string[];
}

interface SwarmNode {
  name: string;
  role: string;
  icon: React.ReactNode;
  detail: string;
}

export function LandingPage({ niche, setNiche, onAnalyze, presets }: LandingPageProps) {
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [simNiche, setSimNiche] = useState("AI-powered commercial real-estate HVAC optimization");
  const [simLogs, setSimLogs] = useState<string[]>([]);
  const [isSimulating, setIsSimulating] = useState(false);
  const [simStep, setSimStep] = useState(0);

  // FAQ Data
  const faqs = [
    {
      q: "What is the Sequential Swarm design pattern?",
      a: "Instead of a single unstructured prompt, OpportunityMiner leverages a pipeline of dedicated specialist agents. Each agent receives structured JSON state from the previous one, deepens the analysis, adds context-specific validations, and passes it forward. This prevents hallucinations and yields investment-grade depth."
    },
    {
      q: "What is the difference between 'Research Only' and 'Full Mine'?",
      a: "'Research Only' triggers the ResearchAgent to perform immediate landscape mapping, scoping TAM, and industry segmentation in seconds. 'Full Mine' activates the entire 7-agent sequential swarm to construct complete MVP specs, competitor teardowns, and printable investment memos."
    },
    {
      q: "Can I download or print the final Strategic Memo?",
      a: "Yes! The platform generates fully formatted Markdown reports conforming to standardized venture capital investment memos. You can copy the raw markdown, download it as a .md file, or use the print command to export a beautifully formatted PDF directly."
    },
    {
      q: "How does the system evaluate and score opportunities?",
      a: "The OpportunityScoreAgent runs a composite validation matrix covering market velocity, entry friction, incumbent defensive depth, and technical feasibility, outputting an objective 0-100 score with risk mitigation protocols."
    }
  ];

  // Swarm Pipeline Node configurations
  const swarmNodes: SwarmNode[] = [
    {
      name: "ResearchAgent",
      role: "TAM & SEGMENTATION",
      icon: <Database className="h-5 w-5 text-cyan-400" />,
      detail: "Mines market indicators, estimates total addressable market bounds, and segments initial buyers."
    },
    {
      name: "PainDetectionAgent",
      role: "FRICTION DETECTION",
      icon: <Target className="h-5 w-5 text-rose-400" />,
      detail: "Identifies recurring professional frustrations, workflow bottlenecks, and high-cost pain indices."
    },
    {
      name: "TrendAgent",
      role: "CATALYST ALIGNMENT",
      icon: <TrendingUp className="h-5 w-5 text-emerald-400" />,
      detail: "Overlays emerging technological shifts (WASM, Edge AI, Decentralized networks) onto traditional gaps."
    },
    {
      name: "CompetitorAgent",
      role: "INCUMBENT VULNERABILITY",
      icon: <Shield className="h-5 w-5 text-amber-400" />,
      detail: "Audits major market players, identifies rigid architectures, and designs high-leverage defensive moats."
    },
    {
      name: "StartupGeneratorAgent",
      role: "MVP & BRAND ARCHITECT",
      icon: <Cpu className="h-5 w-5 text-violet-400" />,
      detail: "Synthesizes modern brand architectures, crafts core features, and builds 100-day GTM roadmaps."
    },
    {
      name: "OpportunityScoreAgent",
      role: "VIABILITY SCORE ENGINE",
      icon: <LineChart className="h-5 w-5 text-fuchsia-400" />,
      detail: "Computes structural greenlight signals, charts entry barrier matrices, and details exit pathways."
    },
    {
      name: "ReportAgent",
      role: "MEMO COMPILER",
      icon: <Layers className="h-5 w-5 text-blue-400" />,
      detail: "Assembles all agent outputs into a standardized, beautifully rendered strategic VC Investment Memo."
    }
  ];

  // Simulation timeline loop
  useEffect(() => {
    if (!isSimulating) return;

    const steps = [
      { agent: "ResearchAgent", msg: "🔍 Querying sector reports and macro market volume..." },
      { agent: "ResearchAgent", msg: "📊 Est. TAM: $1.4B. CAGRs averaging 18.2% over next 5 years." },
      { agent: "PainDetectionAgent", msg: "⚡ Mapping 4 high-frequency field complaints..." },
      { agent: "PainDetectionAgent", msg: "🔥 Friction Identified: Extreme latency in legacy software integrations." },
      { agent: "TrendAgent", msg: "🚀 Aligning catalyst: WASM local storage caching and client-side compilation." },
      { agent: "CompetitorAgent", msg: "🛡️ Evaluating competitors: Honeywell & Trane (SaaS interfaces built circa 2014)." },
      { agent: "StartupGeneratorAgent", msg: "💡 Proposed concept: 'AeroSync AI' with real-time browser telemetry." },
      { agent: "OpportunityScoreAgent", msg: "📈 Composite validation complete. Score: 87/100 (HIGH GREENLIGHT SIGNAL)." },
      { agent: "ReportAgent", msg: "📝 Formatting strategic memorandum. Ready for executive review." }
    ];

    if (simStep < steps.length) {
      const timeout = setTimeout(() => {
        setSimLogs(prev => [...prev, `[${steps[simStep].agent}] ${steps[simStep].msg}`]);
        setSimStep(prev => prev + 1);
      }, 1500);
      return () => clearTimeout(timeout);
    } else {
      setIsSimulating(false);
    }
  }, [isSimulating, simStep]);

  const startSimulation = () => {
    setSimLogs([]);
    setSimStep(0);
    setIsSimulating(true);
  };

  return (
    <div className="w-full space-y-24 py-12" id="landing-container">
      
      {/* SECTION 1: HERO CONTAINER & SWARM TERMINAL */}
      <section className="text-center space-y-10 max-w-4xl mx-auto px-4" id="hero-section">
        {/* Release Pill */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-500/10 text-violet-400 border border-violet-500/20 font-mono text-xs font-semibold animate-fade-in" id="hero-release-badge">
          <Sparkles className="h-3.5 w-3.5 text-cyan-400 animate-pulse" />
          <span>Swarm Engine v1.4.2 Released</span>
        </div>

        {/* Master Copy */}
        <div className="space-y-6">
          <h2 className="font-display text-4xl md:text-5xl lg:text-7xl font-extrabold text-white tracking-tight leading-[1.08]">
            Mine Startup Gaps in <br />
            <span className="bg-gradient-to-r from-violet-400 via-fuchsia-400 to-cyan-400 bg-clip-text text-transparent">
              Any Industry Niche
            </span>
          </h2>
          <p className="text-gray-400 text-sm md:text-lg max-w-2xl mx-auto leading-relaxed">
            Unlock professional VC-grade opportunity formulation instantly. Type in any unmapped industry, and watch a specialized swarm of sequential AI agents detail pain points, map emerging catalysts, dissect incumbents, and compile complete startup models.
          </p>
        </div>

        {/* The Core Swarm Terminal (Input Box with Glowing Overlay) */}
        <div className="relative max-w-2xl mx-auto" id="terminal-wrapper">
          <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-violet-600 to-cyan-500 opacity-20 blur-xl group-hover:opacity-30 transition duration-1000 group-hover:duration-200" />
          
          <div className="relative glass-panel p-2.5 rounded-2xl border border-white/10 shadow-2xl bg-[#090d16]/90" id="swarm-terminal">
            <div className="flex flex-col sm:flex-row gap-2">
              <div className="flex-1 relative flex items-center">
                <Search className="absolute left-4 h-5 w-5 text-gray-500" />
                <input
                  type="text"
                  value={niche}
                  onChange={(e) => setNiche(e.target.value)}
                  placeholder="Enter an industry niche (e.g., 'underwater hull cleaning')..."
                  className="w-full pl-12 pr-4 py-3.5 bg-transparent text-white placeholder-gray-500 border-none rounded-xl focus:outline-none focus:ring-0 text-sm md:text-base font-sans"
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && niche.trim()) {
                      onAnalyze(niche, false);
                    }
                  }}
                  id="search-input-field"
                />
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => onAnalyze(niche, true)}
                  disabled={!niche.trim()}
                  className="flex-1 sm:flex-none px-4 py-3.5 rounded-xl bg-white/5 hover:bg-white/10 text-gray-300 font-mono text-xs font-semibold border border-white/10 disabled:opacity-50 disabled:cursor-not-allowed transition-all active:scale-[0.98]"
                  title="Run only the ResearchAgent (Fast, TAM oriented)"
                  id="btn-research-only"
                >
                  Research Only
                </button>
                <button
                  onClick={() => onAnalyze(niche, false)}
                  disabled={!niche.trim()}
                  className="flex-1 sm:flex-none px-6 py-3.5 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white font-mono text-xs font-bold disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg shadow-violet-500/20 active:scale-[0.98]"
                  id="btn-mine-concept"
                >
                  Mine Concept
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Preset Targets */}
        <div className="space-y-4" id="presets-container">
          <span className="font-mono text-[10px] font-bold text-gray-500 tracking-wider uppercase">
            OR EXPLORE EMERGING GREENFIELD SAMPLES
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-2xl mx-auto">
            {presets.map((preset, i) => (
              <button
                key={i}
                onClick={() => {
                  setNiche(preset);
                  onAnalyze(preset, false);
                }}
                className="p-4 rounded-xl glass-panel hover:bg-white/5 border border-white/5 text-left transition-all group flex items-center justify-between bg-white/[0.01] hover:border-violet-500/30"
                id={`preset-button-${i}`}
              >
                <div className="flex items-center gap-3 truncate">
                  <span className="h-2 w-2 rounded-full bg-violet-500 group-hover:bg-cyan-400 group-hover:scale-125 transition-all" />
                  <span className="text-xs text-gray-300 font-medium group-hover:text-white truncate">
                    {preset}
                  </span>
                </div>
                <ArrowRight className="h-4 w-4 text-gray-500 group-hover:text-cyan-400 group-hover:translate-x-1 transition-all flex-shrink-0" />
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 2: THE MULTI-AGENT PIPELINE MAP */}
      <section className="space-y-12 px-4" id="pipeline-map-section">
        <div className="text-center space-y-4 max-w-2xl mx-auto">
          <h3 className="font-display text-2xl md:text-3xl font-bold text-white">
            The Multi-Agent Orchestration Swarm
          </h3>
          <p className="text-gray-400 text-xs md:text-sm">
            OpportunityMiner orchestrates a pipeline of 7 specialized AI agents, passing semantic context from research to strategic report generation.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 max-w-6xl mx-auto" id="swarm-nodes-grid">
          {swarmNodes.map((node, i) => (
            <div 
              key={i} 
              className="p-5 rounded-2xl glass-panel border border-white/5 space-y-4 relative overflow-hidden bg-white/[0.01] hover:border-white/10 transition-all group"
              id={`swarm-node-${i}`}
            >
              {/* Index Badge */}
              <span className="absolute top-4 right-4 font-mono text-[10px] text-gray-600 font-semibold">
                NODE_0{i + 1}
              </span>
              
              <div className="flex items-center gap-3">
                <div className="h-9 w-9 rounded-lg bg-white/5 flex items-center justify-center group-hover:bg-white/10 transition-colors">
                  {node.icon}
                </div>
                <div>
                  <h4 className="font-mono text-xs font-bold text-white">
                    {node.name}
                  </h4>
                  <span className="text-[9px] font-mono font-bold text-gray-500 uppercase tracking-wider">
                    {node.role}
                  </span>
                </div>
              </div>

              <p className="text-gray-400 text-xs leading-relaxed">
                {node.detail}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 3: BENTO GRID FEATURES */}
      <section className="space-y-12 px-4" id="bento-features-section">
        <div className="text-center space-y-4 max-w-2xl mx-auto">
          <h3 className="font-display text-2xl md:text-3xl font-bold text-white">
            Architected for Institutional-Grade Strategy
          </h3>
          <p className="text-gray-400 text-xs md:text-sm">
            Crafted to replace months of speculative research with analytical precision.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto" id="bento-grid">
          {/* Card 1: Interactive Dashboard */}
          <div className="md:col-span-2 p-6 rounded-2xl glass-panel border border-white/5 bg-gradient-to-br from-violet-950/10 to-transparent flex flex-col justify-between space-y-6" id="bento-card-dashboard">
            <div className="space-y-2">
              <span className="text-[10px] font-mono font-bold text-violet-400 tracking-wider uppercase">01 / IMMERSIVE INTERACTION</span>
              <h4 className="font-display text-xl font-bold text-white">Interactive Swarm Dashboard</h4>
              <p className="text-gray-400 text-xs leading-relaxed max-w-xl">
                Explore a polished command deck detailing problem parameters, competitor vulnerability matrix, pricing tiers, and customized MVP specifications. Perfect for slide-deck synthesis and pitching.
              </p>
            </div>
            <div className="rounded-xl border border-white/10 bg-black/40 p-4 font-mono text-[11px] text-gray-400 space-y-2 select-none" id="dashboard-preview-mock">
              <div className="flex justify-between items-center border-b border-white/5 pb-2">
                <span className="text-white font-bold">● TAM & GREENLIGHT SCORE</span>
                <span className="text-cyan-400">89 / 100</span>
              </div>
              <div className="grid grid-cols-3 gap-2 text-center text-[10px]">
                <div className="p-2 bg-white/5 rounded border border-white/5">
                  <span className="block text-gray-500 font-bold">TAM</span>
                  <span className="text-white font-semibold">$1.4B</span>
                </div>
                <div className="p-2 bg-white/5 rounded border border-white/5">
                  <span className="block text-gray-500 font-bold">CAGR</span>
                  <span className="text-emerald-400 font-semibold">18.2%</span>
                </div>
                <div className="p-2 bg-white/5 rounded border border-white/5">
                  <span className="block text-gray-500 font-bold">RISK</span>
                  <span className="text-amber-400 font-semibold">LOW</span>
                </div>
              </div>
            </div>
          </div>

          {/* Card 2: Strategic Moat Mapping */}
          <div className="p-6 rounded-2xl glass-panel border border-white/5 flex flex-col justify-between space-y-6 bg-white/[0.01]" id="bento-card-moat">
            <div className="space-y-2">
              <span className="text-[10px] font-mono font-bold text-emerald-400 tracking-wider uppercase">02 / COMPETITIVE LANDSCAPE</span>
              <h4 className="font-display text-xl font-bold text-white">Moat Engineering</h4>
              <p className="text-gray-400 text-xs leading-relaxed">
                Identify soft architectural openings in established incumbents. Formulate structural, capital-efficient defensibility strategies including distribution hacks.
              </p>
            </div>
            <div className="flex items-center gap-3 p-3 rounded-xl bg-emerald-500/5 border border-emerald-500/10 text-emerald-400 text-xs" id="moat-success-pill">
              <CheckCircle className="h-5 w-5 flex-shrink-0" />
              <span>Defensibility verified via CompetitorAgent Swarm.</span>
            </div>
          </div>

          {/* Card 3: Standardized Memo Export */}
          <div className="p-6 rounded-2xl glass-panel border border-white/5 flex flex-col justify-between space-y-6 bg-white/[0.01]" id="bento-card-memo">
            <div className="space-y-2">
              <span className="text-[10px] font-mono font-bold text-cyan-400 tracking-wider uppercase">03 / EXPORTS</span>
              <h4 className="font-display text-xl font-bold text-white">Investment Memo Drafting</h4>
              <p className="text-gray-400 text-xs leading-relaxed">
                Get a fully structured Markdown memorandum compiled for investment partners. Includes target metrics, market analysis, competitor lists, and tech stack plans.
              </p>
            </div>
            <div className="flex justify-between items-center text-[10px] font-mono text-gray-500 border-t border-white/5 pt-4" id="export-mock-footer">
              <span>PDF EXPORT</span>
              <span>MARKDOWN COPIED</span>
            </div>
          </div>

          {/* Card 4: GTM Blueprints */}
          <div className="md:col-span-2 p-6 rounded-2xl glass-panel border border-white/5 bg-gradient-to-bl from-cyan-950/10 to-transparent flex flex-col justify-between space-y-6" id="bento-card-gtm">
            <div className="space-y-2">
              <span className="text-[10px] font-mono font-bold text-fuchsia-400 tracking-wider uppercase">04 / EXECUTION MATRIX</span>
              <h4 className="font-display text-xl font-bold text-white">100-Day Go-To-Market Blueprint</h4>
              <p className="text-gray-400 text-xs leading-relaxed max-w-xl">
                Skip the blank page. The StartupGeneratorAgent drafts customized step-by-step launch tasks for getting your first 100 passionate pilot users without spending capital.
              </p>
            </div>
            <div className="space-y-1.5" id="gtm-tasks-preview">
              <div className="flex items-center gap-2.5 text-xs text-gray-300">
                <span className="h-1.5 w-1.5 rounded-full bg-cyan-400" />
                <span>Days 1-15: Open-source local telemetry server to build engineering developer lists</span>
              </div>
              <div className="flex items-center gap-2.5 text-xs text-gray-300">
                <span className="h-1.5 w-1.5 rounded-full bg-cyan-400" />
                <span>Days 16-45: Conduct direct customer pain interviews with fleet technical officers</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 4: LIVE SWARM LOGS SIMULATOR */}
      <section className="max-w-4xl mx-auto px-4" id="simulation-playground-section">
        <div className="glass-panel p-6 md:p-8 rounded-2xl border border-white/10 space-y-6 bg-[#090e1a]">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-white/5 pb-6">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <Terminal className="h-5 w-5 text-violet-400" />
                <h4 className="font-display font-bold text-white text-lg">Swarm Terminal Simulator</h4>
              </div>
              <p className="text-gray-400 text-xs">
                Simulate a live swarm analysis cycle for real-world niche concepts.
              </p>
            </div>
            <button
              onClick={startSimulation}
              disabled={isSimulating}
              className="px-4 py-2 rounded-lg bg-violet-600 hover:bg-violet-500 disabled:opacity-50 text-white font-mono text-xs font-bold transition-all flex items-center gap-2 shadow-lg shadow-violet-500/20 active:scale-95"
              id="simulate-trigger-btn"
            >
              <Zap className="h-3.5 w-3.5" />
              {isSimulating ? "Swarm Executing..." : "Run Simulated Swarm"}
            </button>
          </div>

          {/* Interactive target picker */}
          <div className="flex items-center gap-3 text-xs text-gray-400 bg-black/30 p-3 rounded-lg border border-white/5">
            <span className="font-mono text-[10px] text-gray-500 uppercase font-bold">TARGET:</span>
            <input 
              type="text" 
              value={simNiche}
              onChange={(e) => setSimNiche(e.target.value)}
              disabled={isSimulating}
              className="flex-1 bg-transparent text-white focus:outline-none focus:ring-0 text-xs border-none p-0"
              placeholder="e.g., HVAC automation..."
            />
          </div>

          {/* CLI Logs Window */}
          <div className="bg-black/50 border border-white/5 rounded-xl p-4 font-mono text-[11px] md:text-xs text-cyan-400 h-64 overflow-y-auto space-y-2 leading-relaxed" id="simulation-logs-viewport">
            {simLogs.length === 0 ? (
              <div className="h-full flex items-center justify-center text-gray-500 text-center flex-col gap-2">
                <Clock className="h-6 w-6 text-gray-600" />
                <span>Click 'Run Simulated Swarm' to watch active agents pass structured metadata.</span>
              </div>
            ) : (
              <div className="space-y-1">
                {simLogs.map((log, index) => (
                  <div key={index} className="flex items-start gap-2">
                    <span className="text-violet-500 select-none">&gt;&gt;</span>
                    <span>{log}</span>
                  </div>
                ))}
                {isSimulating && (
                  <div className="flex items-center gap-2 text-violet-400 animate-pulse mt-3 font-semibold text-[10px]">
                    <span className="h-1.5 w-1.5 rounded-full bg-violet-400 animate-ping" />
                    <span>ORCHESTRATOR PASSING STATE MATRIX...</span>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* SECTION 5: FAQs */}
      <section className="max-w-3xl mx-auto px-4 space-y-8" id="faq-section">
        <div className="text-center space-y-2">
          <BookOpen className="h-6 w-6 text-cyan-400 mx-auto" />
          <h3 className="font-display text-2xl font-bold text-white">Frequently Asked Questions</h3>
          <p className="text-gray-400 text-xs">Everything you need to know about our multi-agent methodology.</p>
        </div>

        <div className="space-y-4" id="faq-accordions">
          {faqs.map((faq, index) => {
            const isOpen = activeFaq === index;
            return (
              <div 
                key={index} 
                className="border border-white/5 rounded-xl glass-panel overflow-hidden transition-colors"
                id={`faq-item-${index}`}
              >
                <button
                  onClick={() => setActiveFaq(isOpen ? null : index)}
                  className="w-full px-5 py-4 flex justify-between items-center text-left text-white hover:bg-white/[0.02] transition-colors"
                >
                  <span className="font-display text-sm md:text-base font-semibold">{faq.q}</span>
                  <ChevronDown className={`h-4 w-4 text-gray-400 transition-transform duration-300 ${isOpen ? "rotate-180 text-violet-400" : ""}`} />
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                    >
                      <div className="px-5 pb-5 pt-1 text-xs md:text-sm text-gray-400 leading-relaxed border-t border-white/5">
                        {faq.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </section>

      {/* SECTION 6: METHODOLOGY CALLOUT */}
      <section className="text-center max-w-2xl mx-auto px-4 py-8" id="thesis-callout">
        <div className="glass-panel p-6 rounded-2xl border border-violet-500/10 bg-violet-950/5 flex flex-col items-center gap-4">
          <HelpCircle className="h-6 w-6 text-violet-400" />
          <h4 className="font-display text-base font-bold text-white">Vibe Coding Thesis</h4>
          <p className="text-gray-400 text-xs leading-relaxed">
            Designed as a prototype showcase for sequential LLM execution patterns, demonstrating that modular agent swarms achieve 10x higher validation fidelity than flat, single-prompt chat windows.
          </p>
        </div>
      </section>

    </div>
  );
}
