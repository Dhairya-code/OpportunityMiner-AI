/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { GoogleGenAI } from "@google/genai";
import { detectPainPoints } from "../skills/pain_detection.js";
import { MarketResearchOutput, PainDetectionOutput } from "../../types.js";

export class PainDetectionAgent {
  private ai: GoogleGenAI;

  constructor(ai: GoogleGenAI) {
    this.ai = ai;
  }

  /**
   * Evaluates market research to isolate the key pain points and unfulfilled needs.
   */
  public async execute(researchData: MarketResearchOutput): Promise<PainDetectionOutput> {
    console.log(`[PainDetectionAgent] Analyzing research data for acute user pain points...`);
    try {
      const result = await detectPainPoints(this.ai, researchData);
      console.log(`[PainDetectionAgent] Pain point analysis successfully completed.`);
      return result;
    } catch (error) {
      console.error(`[PainDetectionAgent] Error during pain detection:`, error);
      throw error;
    }
  }
}
