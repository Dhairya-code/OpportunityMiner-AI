/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { GoogleGenAI } from "@google/genai";
import { formatOpportunityReport } from "../skills/report_formatter.js";
import { PipelineState } from "../../types.js";

export class ReportAgent {
  private ai: GoogleGenAI;

  constructor(ai: GoogleGenAI) {
    this.ai = ai;
  }

  /**
   * Compiles the full multi-agent state into a highly structured and elegant investment report.
   */
  public async execute(state: PipelineState): Promise<string> {
    console.log(`[ReportAgent] Preparing professional Markdown evaluation report...`);
    try {
      const result = await formatOpportunityReport(this.ai, state);
      console.log(`[ReportAgent] Report formatting successfully completed.`);
      return result;
    } catch (error) {
      console.error(`[ReportAgent] Error during report generation:`, error);
      throw error;
    }
  }
}
