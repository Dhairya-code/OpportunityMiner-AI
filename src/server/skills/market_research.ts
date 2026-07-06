/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { GoogleGenAI, Type } from "@google/genai";
import { MarketResearchOutput } from "../../types.js";

export async function performMarketResearch(
  ai: GoogleGenAI,
  niche: string
): Promise<MarketResearchOutput> {
  const prompt = `Conduct a comprehensive, professional market research study on the following niche: "${niche}".
Provide granular, realistic, and highly actionable analysis of the market size, growth rate, key customer segments (with realistic percentage estimates), currently existing products/services, their pros & cons, and main friction points. Ensure your assessments are tailored specifically to this niche.`;

  const response = await ai.models.generateContent({
    model: "gemini-3.5-flash",
    contents: prompt,
    config: {
      systemInstruction: "You are an elite Silicon Valley venture capital research associate. You conduct meticulous, data-driven market analyses that identify underlying patterns and hidden market dynamics.",
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          marketSize: {
            type: Type.STRING,
            description: "The current estimated global or relevant market size (e.g., '$15.4 Billion in 2025').",
          },
          growthRate: {
            type: Type.STRING,
            description: "The projected compound annual growth rate (e.g., '14.2% CAGR from 2025 to 2032').",
          },
          customerSegments: {
            type: Type.ARRAY,
            description: "The primary buyer personas or target groups in this niche.",
            items: {
              type: Type.OBJECT,
              properties: {
                name: { type: Type.STRING, description: "Name of the buyer persona or group." },
                description: { type: Type.STRING, description: "Core motivations, challenges, and characteristics of this segment." },
                sizePercent: { type: Type.INTEGER, description: "Percentage of the total market this segment represents (e.g., 35)." },
              },
              required: ["name", "description", "sizePercent"],
            },
          },
          currentProducts: {
            type: Type.ARRAY,
            description: "The major existing products or classes of products currently serving this market.",
            items: {
              type: Type.OBJECT,
              properties: {
                name: { type: Type.STRING, description: "Product name or product category." },
                marketShare: { type: Type.STRING, description: "Market share description (e.g., 'Dominant leader', 'Emerging', 'Fragmented')." },
                pros: { type: Type.STRING, description: "What users like about it." },
                cons: { type: Type.STRING, description: "Major complaints, missing features, or friction." },
              },
              required: ["name", "marketShare", "pros", "cons"],
            },
          },
          problems: {
            type: Type.ARRAY,
            description: "List of the top 3-5 macro problems currently hindering this market.",
            items: { type: Type.STRING },
          },
          summary: {
            type: Type.STRING,
            description: "A professional executive summary of the research findings (1-2 paragraphs).",
          },
        },
        required: ["marketSize", "growthRate", "customerSegments", "currentProducts", "problems", "summary"],
      },
    },
  });

  const text = response.text;
  if (!text) {
    throw new Error("Market research failed to generate content from Gemini.");
  }
  return JSON.parse(text) as MarketResearchOutput;
}
