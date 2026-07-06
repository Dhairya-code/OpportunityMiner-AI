/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { 
  TrendingUp, 
  Users, 
  AlertTriangle, 
  Layers, 
  Target, 
  DollarSign, 
  CheckCircle, 
  Zap,
  TrendingDown,
  Briefcase,
  ShieldAlert,
  ArrowRight
} from "lucide-react";
import { PipelineState } from "../types.js";

interface InteractiveDashboardProps {
  state: PipelineState;
}

export function InteractiveDashboard({ state }: InteractiveDashboardProps) {
  const isResearchOnly = !state.startup;

  if (isResearchOnly) {
    const res = state.research;
    if (!res) return null;

    return (
      <div className="space-y-8" id="research-dashboard">
        {/* Market Summary Header */}
        <div className="glass-panel-glow p-8 rounded-2xl border border-violet-900/30">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
            <div>
              <span className="font-mono text-xs text-violet-400 font-semibold uppercase tracking-wider">
                CORE ANALYSIS: {state.niche}
              </span>
              <h2 className="font-display text-3xl font-bold text-white mt-1">
                Market Research Report
              </h2>
            </div>
            <div className="flex gap-4">
              <div className="p-4 rounded-xl bg-black/40 border border-white/5 text-center min-w-[120px]">
                <div className="text-xs text-gray-400 font-medium">Est. Market Size</div>
                <div className="text-lg font-bold text-cyan-400 font-display mt-1">{res.marketSize}</div>
              </div>
              <div className="p-4 rounded-xl bg-black/40 border border-white/5 text-center min-w-[120px]">
                <div className="text-xs text-gray-400 font-medium">Growth Rate</div>
                <div className="text-lg font-bold text-violet-400 font-display mt-1">{res.growthRate}</div>
              </div>
            </div>
          </div>
          <p className="text-gray-300 leading-relaxed text-sm md:text-base">
            {res.summary}
          </p>
        </div>

        {/* Customer Segments & Macro Problems */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left: Customer Segments */}
          <div className="glass-panel p-6 rounded-2xl border border-white/8 space-y-6">
            <h3 className="font-display text-lg font-semibold text-white flex items-center gap-2">
              <Users className="h-5 w-5 text-cyan-400" />
              Target Customer Segments
            </h3>
            <div className="space-y-4">
              {res.customerSegments.map((seg, i) => (
                <div key={i} className="p-4 rounded-xl bg-white/5 border border-white/5 space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="font-semibold text-white text-sm">{seg.name}</span>
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono font-semibold bg-cyan-400/10 text-cyan-400">
                      {seg.sizePercent}% share
                    </span>
                  </div>
                  <p className="text-xs text-gray-300 leading-relaxed">{seg.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Macro Problems */}
          <div className="glass-panel p-6 rounded-2xl border border-white/8 space-y-6">
            <h3 className="font-display text-lg font-semibold text-white flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-amber-400" />
              Macro Friction Points
            </h3>
            <div className="space-y-3">
              {res.problems.map((prob, i) => (
                <div key={i} className="flex items-start gap-3 p-3 rounded-xl bg-amber-500/5 border border-amber-500/10">
                  <div className="h-5 w-5 rounded-full bg-amber-500/10 text-amber-400 flex items-center justify-center font-mono text-xs font-bold mt-0.5">
                    {i + 1}
                  </div>
                  <p className="text-xs text-gray-200 font-medium leading-relaxed mt-0.5">{prob}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Incumbents / Current Products Matrix */}
        <div className="glass-panel p-6 rounded-2xl border border-white/8">
          <h3 className="font-display text-lg font-semibold text-white flex items-center gap-2 mb-6">
            <Layers className="h-5 w-5 text-violet-400" />
            Existing Market Solutions
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {res.currentProducts.map((prod, i) => (
              <div key={i} className="p-5 rounded-xl bg-black/20 border border-white/5 space-y-4">
                <div>
                  <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-violet-400/10 text-violet-400">
                    {prod.marketShare}
                  </span>
                  <h4 className="font-display font-bold text-white text-base mt-2">{prod.name}</h4>
                </div>
                <div className="space-y-2 text-xs">
                  <div>
                    <span className="text-emerald-400 font-medium font-mono uppercase text-[9px] tracking-wider">Pros / User Delight:</span>
                    <p className="text-gray-300 mt-0.5 leading-relaxed">{prod.pros}</p>
                  </div>
                  <div>
                    <span className="text-rose-400 font-medium font-mono uppercase text-[9px] tracking-wider">Cons / Core Friction:</span>
                    <p className="text-gray-300 mt-0.5 leading-relaxed">{prod.cons}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Full Multi-Agent Dashboard
  const { research, pains, trends, competitors, startup, score } = state;
  if (!research || !pains || !trends || !competitors || !startup || !score) return null;

  return (
    <div className="space-y-8" id="opportunity-dashboard">
      {/* 1. GP Score Metric & Strategic Pitch */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        {/* Left: Overall GP Score Dial */}
        <div className="xl:col-span-1 glass-panel-glow p-8 rounded-2xl border border-violet-900/30 flex flex-col justify-between items-center text-center">
          <div className="w-full">
            <span className="font-mono text-xs text-violet-400 font-semibold uppercase tracking-wider">
              GP INVESTMENT INDEX
            </span>
            <h3 className="font-display text-lg font-semibold text-white mt-1">Opportunity Rating</h3>
          </div>

          {/* Radial Gauge */}
          <div className="relative my-6 flex items-center justify-center">
            <svg className="w-40 h-40 transform -rotate-90">
              {/* Outer ring */}
              <circle
                cx="80"
                cy="80"
                r="68"
                className="stroke-slate-800"
                strokeWidth="10"
                fill="transparent"
              />
              {/* Progress ring */}
              <circle
                cx="80"
                cy="80"
                r="68"
                className="stroke-violet-500"
                strokeWidth="10"
                fill="transparent"
                strokeDasharray={`${2 * Math.PI * 68}`}
                strokeDashoffset={`${2 * Math.PI * 68 * (1 - score.overallScore / 100)}`}
                strokeLinecap="round"
              />
            </svg>
            <div className="absolute flex flex-col items-center">
              <span className="font-display text-5xl font-extrabold text-white leading-none">
                {score.overallScore}
              </span>
              <span className="text-[10px] font-mono text-gray-400 tracking-widest uppercase mt-1">
                OUT OF 100
              </span>
            </div>
          </div>

          <div className="w-full">
            <p className="text-xs text-gray-300 italic mb-4 leading-relaxed px-2">
              "{score.scoreJustification}"
            </p>
            {/* Score breakdown metrics */}
            <div className="grid grid-cols-2 gap-2 text-left font-mono text-[10px]">
              <div className="p-2 rounded bg-black/30 border border-white/5 flex justify-between">
                <span className="text-gray-400">MARKET SIZE:</span>
                <span className="text-cyan-400 font-bold">{score.scores.marketSize}/100</span>
              </div>
              <div className="p-2 rounded bg-black/30 border border-white/5 flex justify-between">
                <span className="text-gray-400">COMPETITION:</span>
                <span className="text-emerald-400 font-bold">{score.scores.competition}/100</span>
              </div>
              <div className="p-2 rounded bg-black/30 border border-white/5 flex justify-between">
                <span className="text-gray-400">DIFFICULTY:</span>
                <span className="text-amber-400 font-bold">{score.scores.difficulty}/100</span>
              </div>
              <div className="p-2 rounded bg-black/30 border border-white/5 flex justify-between">
                <span className="text-gray-400">REVENUE POT.:</span>
                <span className="text-fuchsia-400 font-bold">{score.scores.revenuePotential}/100</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Startup Brand Formulation Pitch */}
        <div className="xl:col-span-2 glass-panel p-8 rounded-2xl border border-white/8 flex flex-col justify-between space-y-6">
          <div>
            <span className="font-mono text-xs text-cyan-400 font-semibold uppercase tracking-wider">
              Startup Formulation Agent
            </span>
            <div className="flex items-baseline gap-3 mt-1">
              <h2 className="font-display text-3xl font-extrabold text-white">
                {startup.startupName}
              </h2>
              <span className="text-sm text-gray-400 font-medium italic border-l border-white/10 pl-3">
                {startup.tagline}
              </span>
            </div>
          </div>

          {/* Problem vs Solution */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-4 rounded-xl bg-rose-500/5 border border-rose-500/10 space-y-1">
              <div className="text-[10px] font-mono font-bold text-rose-400 uppercase tracking-widest">
                Target Problem
              </div>
              <p className="text-xs text-gray-200 leading-relaxed font-medium">
                {startup.problem}
              </p>
            </div>
            <div className="p-4 rounded-xl bg-emerald-500/5 border border-emerald-500/10 space-y-1">
              <div className="text-[10px] font-mono font-bold text-emerald-400 uppercase tracking-widest">
                Core Solution
              </div>
              <p className="text-xs text-gray-200 leading-relaxed font-medium">
                {startup.solution}
              </p>
            </div>
          </div>

          {/* Moat / USP */}
          <div className="p-4 rounded-xl bg-violet-600/10 border border-violet-500/20 flex gap-3 items-start">
            <Zap className="h-5 w-5 text-violet-400 flex-shrink-0 mt-0.5" />
            <div>
              <div className="text-[10px] font-mono font-bold text-violet-400 uppercase tracking-widest">
                Unique Selling Proposition (USP)
              </div>
              <p className="text-xs text-gray-300 leading-relaxed mt-1">
                {startup.usp}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Detected Pain Points & Trends */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Pain points */}
        <div className="glass-panel p-6 rounded-2xl border border-white/8 space-y-6">
          <h3 className="font-display text-lg font-semibold text-white flex items-center gap-2">
            <ShieldAlert className="h-5 w-5 text-rose-400" />
            Pain Point Discovery Miner
          </h3>
          <div className="space-y-4">
            {pains.painPoints.map((pain, i) => (
              <div key={i} className="p-4 rounded-xl bg-white/5 border border-white/5 space-y-3">
                <div className="flex justify-between items-center">
                  <span className="font-bold text-sm text-white">{pain.title}</span>
                  <div className="flex gap-2">
                    <span className="px-2 py-0.5 rounded text-[9px] font-mono bg-white/5 text-gray-400 border border-white/5">
                      {pain.frequency}
                    </span>
                    <span className={`px-2 py-0.5 rounded text-[9px] font-mono font-bold border ${
                      pain.severity === "High" 
                        ? "bg-rose-500/10 text-rose-400 border-rose-500/20" 
                        : pain.severity === "Medium"
                        ? "bg-amber-500/10 text-amber-400 border-amber-500/20"
                        : "bg-yellow-500/10 text-yellow-400 border-yellow-500/20"
                    }`}>
                      Score {pain.severityScore}/10
                    </span>
                  </div>
                </div>
                <p className="text-xs text-gray-300 leading-relaxed">{pain.description}</p>
                <div className="text-[10px] font-mono border-t border-white/5 pt-2 flex gap-1">
                  <span className="text-cyan-400 font-semibold">Unmet Need:</span>
                  <span className="text-gray-400">{pain.unmetNeed}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Trends & Tech */}
        <div className="glass-panel p-6 rounded-2xl border border-white/8 space-y-6">
          <h3 className="font-display text-lg font-semibold text-white flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-cyan-400" />
            Tech Catalyst & Trends
          </h3>
          
          <div className="space-y-4">
            {trends.trends.map((trend, i) => (
              <div key={i} className="p-4 rounded-xl bg-black/20 border border-white/5 space-y-1">
                <div className="flex justify-between items-center">
                  <span className="font-bold text-sm text-white">{trend.name}</span>
                  <span className={`px-2 py-0.5 rounded text-[9px] font-mono font-bold ${
                    trend.growthIndicator === "Exploding" 
                      ? "bg-fuchsia-500/10 text-fuchsia-400 border border-fuchsia-500/20" 
                      : "bg-cyan-500/10 text-cyan-400 border border-cyan-500/20"
                  }`}>
                    {trend.growthIndicator}
                  </span>
                </div>
                <p className="text-xs text-gray-300 leading-relaxed">{trend.description}</p>
                <div className="text-[10px] font-mono text-gray-500 pt-1">
                  Driver: {trend.driver}
                </div>
              </div>
            ))}
          </div>

          {/* Emerging Tech blocks */}
          <div className="p-4 rounded-xl bg-cyan-500/5 border border-cyan-500/10 space-y-2">
            <div className="text-[10px] font-mono font-bold text-cyan-400 uppercase tracking-widest">
              Weaponized Emerging Tech
            </div>
            <div className="flex flex-wrap gap-2">
              {trends.emergingTechnologies.map((tech, i) => (
                <span key={i} className="px-2.5 py-1 rounded bg-black/40 border border-white/5 font-mono text-[10px] text-gray-300">
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 3. Competitor teardowns & Gaps */}
      <div className="glass-panel p-6 rounded-2xl border border-white/8">
        <h3 className="font-display text-lg font-semibold text-white flex items-center gap-2 mb-6">
          <Briefcase className="h-5 w-5 text-violet-400" />
          Competitor Intellectual Vulnerability Matrix
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {competitors.competitors.map((comp, i) => (
            <div key={i} className="p-5 rounded-xl bg-black/30 border border-white/5 flex flex-col justify-between">
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <h4 className="font-display font-bold text-white text-base">{comp.name}</h4>
                  <span className="text-[9px] font-mono font-bold px-2 py-0.5 rounded bg-violet-400/10 text-violet-400">
                    {comp.marketRole}
                  </span>
                </div>

                <div className="space-y-3 text-[11px]">
                  <div>
                    <span className="text-emerald-400 font-semibold font-mono uppercase text-[9px] tracking-wider">Strengths:</span>
                    <ul className="list-disc list-inside text-gray-300 mt-1 space-y-1">
                      {comp.strengths.slice(0, 2).map((s, idx) => <li key={idx} className="truncate">{s}</li>)}
                    </ul>
                  </div>
                  <div>
                    <span className="text-rose-400 font-semibold font-mono uppercase text-[9px] tracking-wider">Weaknesses:</span>
                    <ul className="list-disc list-inside text-gray-300 mt-1 space-y-1">
                      {comp.weaknesses.slice(0, 2).map((w, idx) => <li key={idx} className="truncate">{w}</li>)}
                    </ul>
                  </div>
                  <div>
                    <span className="text-cyan-400 font-semibold font-mono uppercase text-[9px] tracking-wider">Underserved Gaps:</span>
                    <ul className="list-disc list-inside text-gray-300 mt-1 space-y-1">
                      {comp.marketGaps.slice(0, 2).map((g, idx) => <li key={idx} className="truncate">{g}</li>)}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 4. MVP Spec Product Roadmap & Commercial parameters */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* MVP Roadmaps */}
        <div className="glass-panel p-6 rounded-2xl border border-white/8 space-y-6">
          <h3 className="font-display text-lg font-semibold text-white flex items-center gap-2">
            <Layers className="h-5 w-5 text-cyan-400" />
            MVP Core Product Specification
          </h3>
          <div className="space-y-4">
            {startup.mvpFeatures.map((feat, i) => (
              <div key={i} className="p-4 rounded-xl bg-white/5 border border-white/5 space-y-2">
                <div className="flex justify-between items-center">
                  <span className="font-bold text-sm text-white flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-emerald-500" />
                    {feat.feature}
                  </span>
                  <span className={`px-2 py-0.5 rounded text-[9px] font-mono font-bold ${
                    feat.complexity === "High" 
                      ? "bg-rose-500/10 text-rose-400" 
                      : feat.complexity === "Medium"
                      ? "bg-amber-500/10 text-amber-400"
                      : "bg-emerald-500/10 text-emerald-400"
                  }`}>
                    {feat.complexity} complexity
                  </span>
                </div>
                <p className="text-xs text-gray-300 leading-relaxed">{feat.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Commercial Model & Go-To-Market */}
        <div className="glass-panel p-6 rounded-2xl border border-white/8 flex flex-col justify-between space-y-6">
          <div>
            <h3 className="font-display text-lg font-semibold text-white flex items-center gap-2 mb-4">
              <DollarSign className="h-5 w-5 text-violet-400" />
              Strategic Commercial Model
            </h3>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-black/20 border border-white/5">
                <div className="text-[10px] font-mono text-gray-400 font-bold uppercase tracking-wider">Business Model</div>
                <div className="text-sm font-semibold text-white mt-1">{startup.businessModel}</div>
              </div>
              <div className="p-4 rounded-xl bg-black/20 border border-white/5">
                <div className="text-[10px] font-mono text-gray-400 font-bold uppercase tracking-wider">Revenue Model</div>
                <div className="text-sm font-semibold text-white mt-1">{startup.revenueModel}</div>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-black/20 border border-white/5 mt-4">
              <div className="text-[10px] font-mono text-gray-400 font-bold uppercase tracking-wider">Target Pricing Structure</div>
              <div className="text-sm font-semibold text-cyan-400 mt-1">{startup.pricing}</div>
            </div>
          </div>

          {/* Go To Market strategies list */}
          <div className="space-y-3">
            <div className="text-[10px] font-mono font-bold text-violet-400 uppercase tracking-widest">
              GTM Checklist: First 100 Customers
            </div>
            <div className="space-y-2">
              {startup.goToMarket.map((hack, i) => (
                <div key={i} className="flex gap-2 items-center text-xs text-gray-300">
                  <ArrowRight className="h-4 w-4 text-violet-400 flex-shrink-0" />
                  <span>{hack}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 5. Existential Risks & Mitigations */}
      <div className="glass-panel p-6 rounded-2xl border border-white/8 space-y-4">
        <h3 className="font-display text-lg font-semibold text-white flex items-center gap-2">
          <AlertTriangle className="h-5 w-5 text-amber-400" />
           existential Risks & GP Mitigation Policies
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {score.riskAssessment.map((risk, i) => (
            <div key={i} className="p-4 rounded-xl bg-amber-500/5 border border-amber-500/10 space-y-2 flex flex-col justify-between">
              <div>
                <span className="text-[9px] font-mono font-bold text-amber-400 tracking-wider">RISK {i + 1}</span>
                <h4 className="text-xs font-bold text-white mt-1 leading-relaxed">{risk.risk}</h4>
              </div>
              <p className="text-[11px] text-gray-400 leading-relaxed border-t border-white/5 pt-2 mt-2 italic">
                <span className="text-emerald-400 font-semibold font-mono not-italic block text-[9px] uppercase tracking-wider mb-1">Mitigation Plan:</span>
                {risk.mitigation}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
