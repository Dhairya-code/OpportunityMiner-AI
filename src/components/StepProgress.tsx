/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useState } from "react";
import { Loader2, CheckCircle2, Circle, AlertCircle } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface StepProgressProps {
  activeStep: number; // 0 to 7 (0: idle, 1: research, ..., 7: report, 8: done)
  isResearchOnly: boolean;
  niche: string;
}

interface AgentStep {
  id: number;
  name: string;
  role: string;
  logs: string[];
}

const AGENT_STEPS: AgentStep[] = [
  {
    id: 1,
    name: "ResearchAgent",
    role: "Conducting market volume research & demographic segmentation",
    logs: [
      "Querying global market database structures...",
      "Extracting TAM (Total Addressable Market) and forecast growth curves...",
      "Segmenting key customer segments by purchasing power...",
      "Analyzing baseline market products and structural issues..."
    ]
  },
  {
    id: 2,
    name: "PainDetectionAgent",
    role: "Mining friction indicators & unaddressed user pains",
    logs: [
      "Analyzing negative reviews and consumer complaints...",
      "Rating frustration severity index from 1 to 10...",
      "Categorizing unmet psychological and professional needs...",
      "Synthesizing product gaps left exposed by market giants..."
    ]
  },
  {
    id: 3,
    name: "TrendAgent",
    role: "Mapping industry trends & technological catalysts",
    logs: [
      "Scanning technological shifts and emerging platforms...",
      "Identifying exponential curves in adjacent spaces...",
      "Pinpointing future market greenfields over the next 24-36 months...",
      "Aligning macro-demographic demands with technology drivers..."
    ]
  },
  {
    id: 4,
    name: "CompetitorAgent",
    role: "Evaluating major incumbents & structural blindspots",
    logs: [
      "Compiling profiles for market leaders and emerging challengers...",
      "Performing portfolio tear-downs and pricing comparisons...",
      "Identifying strategic blindspots and product vulnerabilities...",
      "Designing high-leverage defensive moat vectors..."
    ]
  },
  {
    id: 5,
    name: "StartupGeneratorAgent",
    role: "Formulating business models, brands, & MVP roadmap",
    logs: [
      "Generating high-recall creative brand names and benefit taglines...",
      "Drafting optimal revenue models, pricing brackets, and tiers...",
      "Synthesizing lean, four-feature Minimum Viable Product roadmap...",
      "Drafting zero-cost go-to-market strategies for the first 100 users..."
    ]
  },
  {
    id: 6,
    name: "OpportunityScoreAgent",
    role: "Calculating viability margins & existential risks",
    logs: [
      "Evaluating TAM depth, buyer density, and competition index...",
      "Poking structural holes in the proposed business model...",
      "Calculating overall opportunity score from 0 to 100...",
      "Formulating risk mitigation policies for key vulnerabilities..."
    ]
  },
  {
    id: 7,
    name: "ReportAgent",
    role: "Compiling consolidated Investment Memorandum",
    logs: [
      "Consolidating state outputs into Markdown data matrices...",
      "Drafting executive investment memo prose...",
      "Constructing MVP checklist and competitive gap matrices...",
      "Polishing visual layout of final evaluation report..."
    ]
  }
];

export function StepProgress({ activeStep, isResearchOnly, niche }: StepProgressProps) {
  const [currentLogIndex, setCurrentLogIndex] = useState(0);

  // Filter steps if research-only
  const visibleSteps = isResearchOnly ? AGENT_STEPS.slice(0, 1) : AGENT_STEPS;
  const currentAgent = visibleSteps.find(step => step.id === activeStep);

  // Cycle through funny/professional logs for the active agent
  useEffect(() => {
    setCurrentLogIndex(0);
    const interval = setInterval(() => {
      setCurrentLogIndex(prev => (prev + 1) % 4);
    }, 2800);
    return () => clearInterval(interval);
  }, [activeStep]);

  return (
    <div className="w-full max-w-2xl mx-auto glass-panel p-8 rounded-2xl border border-white/10" id="step-progress-container">
      <div className="flex flex-col items-center mb-8 text-center">
        <Loader2 className="h-10 w-10 text-violet-500 animate-spin mb-4" id="step-progress-loader" />
        <h3 className="font-display text-xl font-semibold text-white mb-2" id="step-progress-title">
          Orchestrator Swarm Running
        </h3>
        <p className="text-gray-400 text-sm" id="step-progress-subtitle">
          Analyzing opportunity parameters for <span className="text-cyan-400 font-medium">"{niche}"</span>
        </p>
      </div>

      {/* Progress timeline */}
      <div className="space-y-4 mb-8" id="step-progress-timeline">
        {visibleSteps.map((step) => {
          const isCompleted = step.id < activeStep;
          const isActive = step.id === activeStep;
          
          return (
            <div 
              key={step.id} 
              className={`flex items-start gap-4 p-3 rounded-xl transition-all duration-300 ${
                isActive ? "bg-violet-950/20 border border-violet-900/30" : "bg-transparent border border-transparent"
              }`}
              id={`step-item-${step.id}`}
            >
              <div className="mt-1 flex-shrink-0" id={`step-status-${step.id}`}>
                {isCompleted ? (
                  <CheckCircle2 className="h-5 w-5 text-emerald-500" />
                ) : isActive ? (
                  <Loader2 className="h-5 w-5 text-violet-400 animate-spin" />
                ) : (
                  <Circle className="h-5 w-5 text-gray-600" />
                )}
              </div>

              <div className="flex-1" id={`step-meta-${step.id}`}>
                <div className="flex items-center gap-2">
                  <span className={`font-mono text-xs font-semibold ${
                    isActive ? "text-violet-400" : isCompleted ? "text-emerald-500" : "text-gray-500"
                  }`}>
                    {step.name}
                  </span>
                  {isActive && (
                    <span className="px-2 py-0.5 rounded text-[10px] bg-violet-400/10 text-violet-400 border border-violet-400/25 animate-pulse">
                      PROCESSING
                    </span>
                  )}
                </div>
                <p className={`text-xs mt-0.5 ${isActive ? "text-gray-200 font-medium" : "text-gray-400"}`}>
                  {step.role}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Live Log Stream Area */}
      <AnimatePresence mode="wait">
        {currentAgent && (
          <motion.div
            key={`${activeStep}-${currentLogIndex}`}
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            transition={{ duration: 0.25 }}
            className="p-4 rounded-xl bg-black/40 border border-white/5 font-mono text-xs text-cyan-400 flex items-center gap-3"
            id="step-live-log"
          >
            <span className="text-gray-500 flex-shrink-0 select-none">&gt;</span>
            <span className="truncate">{currentAgent.logs[currentLogIndex]}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
