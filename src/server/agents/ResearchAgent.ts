/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { GoogleGenAI } from "@google/genai";
import { performMarketResearch } from "../skills/market_research.js";
import { MarketResearchOutput } from "../../types.js";

export class ResearchAgent {
  private ai: GoogleGenAI;

  constructor(ai: GoogleGenAI) {
    this.ai = ai;
  }

  /**
   * Researches the market niche, size, customer segments, current products, and baseline problems.
   */
  public async execute(niche: string): Promise<MarketResearchOutput> {
    console.log(`[ResearchAgent] Starting intensive market research on niche: "${niche}"...`);
    try {
      const result = await performMarketResearch(this.ai, niche);
      console.log(`[ResearchAgent] Market research successfully completed.`);
      return result;
    } catch (error) {
      console.error(`[ResearchAgent] Error during market research:`, error);
      throw error;
    }
  }
}
