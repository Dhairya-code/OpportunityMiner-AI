/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { GoogleGenAI, Type } from "@google/genai";
import { MarketResearchOutput, CompetitorAnalysisOutput } from "../../types.js";

export async function analyzeCompetitors(
  ai: GoogleGenAI,
  researchData: MarketResearchOutput
): Promise<CompetitorAnalysisOutput> {
  const prompt = `Perform a detailed Competitive Intelligence study for this niche.
Identify the primary competitors, categorize their strategic roles, evaluate their operational strengths & weaknesses, and outline explicit gaps in their coverage that a nimble startup can exploit.

Market Context & Players:
${JSON.stringify(researchData, null, 2)}
`;

  const response = await ai.models.generateContent({
    model: "gemini-3.5-flash",
    contents: prompt,
    config: {
      systemInstruction: "You are a corporate intelligence analyst and competitive strategist. Your expertise lies in teardowns of product portfolios, mapping competitor weaknesses, and identifying strategic gaps that allow new entrants to establish unassailable beachheads.",
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          competitors: {
            type: Type.ARRAY,
            description: "Detailed breakdown of the 3 main competitors (or standard product categories if no single company dominates).",
            items: {
              type: Type.OBJECT,
              properties: {
                name: { type: Type.STRING, description: "Competitor company or group name." },
                marketRole: { type: Type.STRING, description: "Their status in the market (e.g. 'Entrenched Monopolist', 'Legacy Giant', 'Fragmented Service providers')." },
                strengths: {
                  type: Type.ARRAY,
                  description: "What they do exceptionally well.",
                  items: { type: Type.STRING },
                },
                weaknesses: {
                  type: Type.ARRAY,
                  description: "Where they fail or what they ignore.",
                  items: { type: Type.STRING },
                },
                marketGaps: {
                  type: Type.ARRAY,
                  description: "The specific opportunities or underserved customers they leave exposed.",
                  items: { type: Type.STRING },
                },
              },
              required: ["name", "marketRole", "strengths", "weaknesses", "marketGaps"],
            },
          },
          moatStrategies: {
            type: Type.ARRAY,
            description: "List 3 high-leverage defensive moats a new startup can build (e.g. data network effects, high switching costs, developer ecosystem).",
            items: { type: Type.STRING },
          },
          differentiationFocus: {
            type: Type.STRING,
            description: "The single most potent vector of differentiation our proposed startup should focus on to attract the competitor's frustrated users.",
          },
        },
        required: ["competitors", "moatStrategies", "differentiationFocus"],
      },
    },
  });

  const text = response.text;
  if (!text) {
    throw new Error("Competitor analysis failed to generate content from Gemini.");
  }
  return JSON.parse(text) as CompetitorAnalysisOutput;
}
