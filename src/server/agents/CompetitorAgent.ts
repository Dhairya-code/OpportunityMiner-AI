/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { GoogleGenAI } from "@google/genai";
import { analyzeCompetitors } from "../skills/competitor_analysis.js";
import { MarketResearchOutput, CompetitorAnalysisOutput } from "../../types.js";

export class CompetitorAgent {
  private ai: GoogleGenAI;

  constructor(ai: GoogleGenAI) {
    this.ai = ai;
  }

  /**
   * Identifies major players, strengths, weaknesses, and market gaps.
   */
  public async execute(researchData: MarketResearchOutput): Promise<CompetitorAnalysisOutput> {
    console.log(`[CompetitorAgent] Assessing competitive landscape, players, and gaps...`);
    try {
      const result = await analyzeCompetitors(this.ai, researchData);
      console.log(`[CompetitorAgent] Competitor analysis successfully completed.`);
      return result;
    } catch (error) {
      console.error(`[CompetitorAgent] Error during competitor analysis:`, error);
      throw error;
    }
  }
}
