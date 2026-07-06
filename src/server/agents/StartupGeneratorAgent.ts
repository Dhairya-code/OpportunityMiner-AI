/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { GoogleGenAI } from "@google/genai";
import { generateStartupConcept } from "../skills/startup_generator.js";
import { 
  MarketResearchOutput, 
  PainDetectionOutput, 
  TrendAnalysisOutput, 
  CompetitorAnalysisOutput, 
  StartupGeneratorOutput 
} from "../../types.js";

export class StartupGeneratorAgent {
  private ai: GoogleGenAI;

  constructor(ai: GoogleGenAI) {
    this.ai = ai;
  }

  /**
   * Generates a fully-fledged startup solution based on research, pains, trends, and competitors.
   */
  public async execute(
    research: MarketResearchOutput,
    pains: PainDetectionOutput,
    trends: TrendAnalysisOutput,
    competitors: CompetitorAnalysisOutput
  ): Promise<StartupGeneratorOutput> {
    console.log(`[StartupGeneratorAgent] Formulating blockbuster business model and brand identity...`);
    try {
      const result = await generateStartupConcept(this.ai, research, pains, trends, competitors);
      console.log(`[StartupGeneratorAgent] Startup concept successfully synthesized.`);
      return result;
    } catch (error) {
      console.error(`[StartupGeneratorAgent] Error during startup generation:`, error);
      throw error;
    }
  }
}
