/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { GoogleGenAI, Type } from "@google/genai";
import { MarketResearchOutput, PainDetectionOutput, TrendAnalysisOutput } from "../../types.js";

export async function analyzeTrends(
  ai: GoogleGenAI,
  researchData: MarketResearchOutput,
  painData: PainDetectionOutput
): Promise<TrendAnalysisOutput> {
  const prompt = `Perform an industry Trend and Tech Analysis for this niche.
Evaluate the primary technological, regulatory, or demographic shifts that are transforming this space. Highlight how emerging technologies (AI, WebAssembly, edge computing, etc.) intersect with identified customer pain points to create massive windows of opportunity.

Market Context:
${JSON.stringify(researchData, null, 2)}

User Pain Points:
${JSON.stringify(painData, null, 2)}
`;

  const response = await ai.models.generateContent({
    model: "gemini-3.5-flash",
    contents: prompt,
    config: {
      systemInstruction: "You are a seasoned technology strategist and futurist. You specialize in pattern recognition, exponential curves, and identifying structural inflections where technology breakthroughs meet unmet human needs.",
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          trends: {
            type: Type.ARRAY,
            description: "Top 3-4 industry trends shaping this niche.",
            items: {
              type: Type.OBJECT,
              properties: {
                name: { type: Type.STRING, description: "Name of the macro trend." },
                description: { type: Type.STRING, description: "What the trend is and how it manifests." },
                growthIndicator: { 
                  type: Type.STRING, 
                  enum: ["Rising", "Stable", "Exploding"],
                  description: "Trajectory of this trend." 
                },
                driver: { type: Type.STRING, description: "The underlying force driving this trend (e.g. 'Remote work shifts', 'Hardware advancements')." },
              },
              required: ["name", "description", "growthIndicator", "driver"],
            },
          },
          emergingTechnologies: {
            type: Type.ARRAY,
            description: "List of 3-4 emerging technologies that can be weaponized in this niche to build a structural moat.",
            items: { type: Type.STRING },
          },
          growingDemands: {
            type: Type.ARRAY,
            description: "List of 3-4 customer demands that are rapidly increasing in volume or intensity.",
            items: { type: Type.STRING },
          },
          futureOpportunities: {
            type: Type.ARRAY,
            description: "Identify 2-3 specific greenfield opportunities arising in this niche over the next 24-36 months.",
            items: { type: Type.STRING },
          },
        },
        required: ["trends", "emergingTechnologies", "growingDemands", "futureOpportunities"],
      },
    },
  });

  const text = response.text;
  if (!text) {
    throw new Error("Trend analysis failed to generate content from Gemini.");
  }
  return JSON.parse(text) as TrendAnalysisOutput;
}
