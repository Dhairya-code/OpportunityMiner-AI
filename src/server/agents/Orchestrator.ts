/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { GoogleGenAI } from "@google/genai";
import { ResearchAgent } from "./ResearchAgent.js";
import { PainDetectionAgent } from "./PainDetectionAgent.js";
import { TrendAgent } from "./TrendAgent.js";
import { CompetitorAgent } from "./CompetitorAgent.js";
import { StartupGeneratorAgent } from "./StartupGeneratorAgent.js";
import { OpportunityScoreAgent } from "./OpportunityScoreAgent.js";
import { ReportAgent } from "./ReportAgent.js";
import { PipelineState } from "../../types.js";

export class Orchestrator {
  private ai: GoogleGenAI;
  private researchAgent: ResearchAgent;
  private painDetectionAgent: PainDetectionAgent;
  private trendAgent: TrendAgent;
  private competitorAgent: CompetitorAgent;
  private startupGeneratorAgent: StartupGeneratorAgent;
  private opportunityScoreAgent: OpportunityScoreAgent;
  private reportAgent: ReportAgent;

  constructor(ai: GoogleGenAI) {
    this.ai = ai;
    this.researchAgent = new ResearchAgent(ai);
    this.painDetectionAgent = new PainDetectionAgent(ai);
    this.trendAgent = new TrendAgent(ai);
    this.competitorAgent = new CompetitorAgent(ai);
    this.startupGeneratorAgent = new StartupGeneratorAgent(ai);
    this.opportunityScoreAgent = new OpportunityScoreAgent(ai);
    this.reportAgent = new ReportAgent(ai);
  }

  /**
   * Run only the research phase.
   */
  public async runResearch(niche: string): Promise<PipelineState> {
    console.log(`[Orchestrator] Initiating research-only workflow for niche: "${niche}"`);
    const state: PipelineState = { niche };
    
    // Step 1: Research
    state.research = await this.researchAgent.execute(niche);
    
    // Generate a simple report for research only
    state.report = `# Market Research Report: ${niche}\n\n## Executive Summary\n${state.research.summary}\n\n## Market Dimensions\n- **Market Size:** ${state.research.marketSize}\n- **Growth Trajectory:** ${state.research.growthRate}\n\n## Key Customer Segments\n${state.research.customerSegments.map(s => `### ${s.name} (${s.sizePercent}%)\n${s.description}`).join('\n\n')}\n\n## Competitive Framework\n${state.research.currentProducts.map(p => `### ${p.name} (Position: ${p.marketShare})\n- **Strengths/Pros:** ${p.pros}\n- **Weaknesses/Cons:** ${p.cons}`).join('\n\n')}\n\n## Identified Macro Obstacles\n${state.research.problems.map(p => `- ${p}`).join('\n')}`;

    return state;
  }

  /**
   * Run the full pipeline in sequence, passing the state from one agent to the next.
   */
  public async runFullPipeline(niche: string): Promise<PipelineState> {
    console.log(`[Orchestrator] Initiating full multi-agent pipeline for niche: "${niche}"`);
    const state: PipelineState = { niche };

    // Step 1: Market Research
    state.research = await this.researchAgent.execute(niche);

    // Step 2: Pain Detection
    state.pains = await this.painDetectionAgent.execute(state.research);

    // Step 3: Trend & Technology Analysis
    state.trends = await this.trendAgent.execute(state.research, state.pains);

    // Step 4: Competitive Intelligence
    state.competitors = await this.competitorAgent.execute(state.research);

    // Step 5: Startup Concept Formulation
    state.startup = await this.startupGeneratorAgent.execute(
      state.research,
      state.pains,
      state.trends,
      state.competitors
    );

    // Step 6: Opportunity Scoring & Risk Mitigation
    state.score = await this.opportunityScoreAgent.execute(
      state.research,
      state.pains,
      state.trends,
      state.competitors,
      state.startup
    );

    // Step 7: Combine and Formulate Markdown Memo
    state.report = await this.reportAgent.execute(state);

    console.log(`[Orchestrator] Full multi-agent pipeline completed successfully!`);
    return state;
  }
}
