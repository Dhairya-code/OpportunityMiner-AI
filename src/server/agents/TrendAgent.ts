/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { GoogleGenAI } from "@google/genai";
import { analyzeTrends } from "../skills/trend_analysis.js";
import { MarketResearchOutput, PainDetectionOutput, TrendAnalysisOutput } from "../../types.js";

export class TrendAgent {
  private ai: GoogleGenAI;

  constructor(ai: GoogleGenAI) {
    this.ai = ai;
  }

  /**
   * Tracks industry trends, emerging technologies, and rising demands in this niche.
   */
  public async execute(
    researchData: MarketResearchOutput,
    painData: PainDetectionOutput
  ): Promise<TrendAnalysisOutput> {
    console.log(`[TrendAgent] Starting trend, demand, and technological alignment study...`);
    try {
      const result = await analyzeTrends(this.ai, researchData, painData);
      console.log(`[TrendAgent] Trend analysis successfully completed.`);
      return result;
    } catch (error) {
      console.error(`[TrendAgent] Error during trend analysis:`, error);
      throw error;
    }
  }
}
