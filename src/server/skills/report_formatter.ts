/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { GoogleGenAI } from "@google/genai";
import { PipelineState } from "../../types.js";

export async function formatOpportunityReport(
  ai: GoogleGenAI,
  state: PipelineState
): Promise<string> {
  const prompt = `You are a world-class startup consultant and analyst. Take the entire multi-agent state data for the niche "${state.niche}" and compile it into an exceptionally thorough, highly detailed, and beautifully structured investment-grade report in Markdown.

The report should be long, fully articulated, and contain no shortcuts, summaries, or placeholders. Maintain an elegant, professional, and strategic tone. Make heavy use of tables, bullet points, checklists, and visual section headers.

Full Pipeline Data:
${JSON.stringify(state, null, 2)}
`;

  const systemInstruction = `You are a Senior Venture Analyst. You produce rigorous, meticulously detailed investment memos and business analyses. Your reports feature crisp prose, beautifully aligned Markdown tables, clear bullet structures, and actionable insights. Do not omit any details—provide fully-developed sections for each category.`;

  const response = await ai.models.generateContent({
    model: "gemini-3.5-flash",
    contents: prompt,
    config: {
      systemInstruction,
    },
  });

  const text = response.text;
  if (!text) {
    throw new Error("Report generation failed.");
  }
  return text;
}
