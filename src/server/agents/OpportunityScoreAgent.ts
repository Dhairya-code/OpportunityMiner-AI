/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { GoogleGenAI } from "@google/genai";
import { computeOpportunityScore } from "../skills/opportunity_score.js";
import { 
  MarketResearchOutput, 
  PainDetectionOutput, 
  TrendAnalysisOutput, 
  CompetitorAnalysisOutput, 
  StartupGeneratorOutput, 
  OpportunityScoreOutput 
} from "../../types.js";

export class OpportunityScoreAgent {
  private ai: GoogleGenAI;

  constructor(ai: GoogleGenAI) {
    this.ai = ai;
  }

  /**
   * Scores the opportunity objectively and identifies risks.
   */
  public async execute(
    research: MarketResearchOutput,
    pains: PainDetectionOutput,
    trends: TrendAnalysisOutput,
    competitors: CompetitorAnalysisOutput,
    startup: StartupGeneratorOutput
  ): Promise<OpportunityScoreOutput> {
    console.log(`[OpportunityScoreAgent] Evaluating business viability and risk metrics...`);
    try {
      const result = await computeOpportunityScore(this.ai, research, pains, trends, competitors, startup);
      console.log(`[OpportunityScoreAgent] Opportunity score evaluation successfully completed.`);
      return result;
    } catch (error) {
      console.error(`[OpportunityScoreAgent] Error during opportunity scoring:`, error);
      throw error;
    }
  }
}
