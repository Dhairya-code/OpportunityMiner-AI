/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { GoogleGenAI, Type } from "@google/genai";
import { 
  MarketResearchOutput, 
  PainDetectionOutput, 
  TrendAnalysisOutput, 
  CompetitorAnalysisOutput, 
  StartupGeneratorOutput 
} from "../../types.js";

export async function generateStartupConcept(
  ai: GoogleGenAI,
  research: MarketResearchOutput,
  pains: PainDetectionOutput,
  trends: TrendAnalysisOutput,
  competitors: CompetitorAnalysisOutput
): Promise<StartupGeneratorOutput> {
  const prompt = `Synthesize all the market intelligence gathered so far to formulate a blockbuster startup business concept.
Create a highly compelling brand, a distinct brand identity, and a clear product roadmap to capture market share.

Market Research:
${JSON.stringify(research, null, 2)}

Customer Pain Points:
${JSON.stringify(pains, null, 2)}

Industry Trends:
${JSON.stringify(trends, null, 2)}

Competitive Landscapes:
${JSON.stringify(competitors, null, 2)}
`;

  const response = await ai.models.generateContent({
    model: "gemini-3.5-flash",
    contents: prompt,
    config: {
      systemInstruction: "You are a world-class venture builder, startup accelerator director, and entrepreneur-in-residence. You design highly scaleable business models and define lean MVP product specs that maximize speed-to-market while delivering irresistible customer value.",
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          startupName: { type: Type.STRING, description: "A highly creative, memorable, and modern brand name for the proposed startup." },
          tagline: { type: Type.STRING, description: "A punchy, benefit-driven tagline (one line)." },
          problem: { type: Type.STRING, description: "The single most acute problem the startup is solving, phrased with extreme clarity." },
          solution: { type: Type.STRING, description: "The core product solution, explaining exactly how it solves the problem." },
          targetAudience: { type: Type.STRING, description: "The specific beachhead customer group that will be targeted on Day 1." },
          businessModel: { type: Type.STRING, description: "High-level operational business model description (e.g. B2B SaaS, Managed Marketplace, API-first)." },
          revenueModel: { type: Type.STRING, description: "How the company will make money (subscriptions, transaction fees, usage-based licensing, etc.)." },
          pricing: { type: Type.STRING, description: "Proposed pricing structure (pricing tiers, starting price, or free tier specifications)." },
          goToMarket: {
            type: Type.ARRAY,
            description: "3-4 explicit growth-hacks or marketing strategies to acquire the first 100 paying customers.",
            items: { type: Type.STRING },
          },
          mvpFeatures: {
            type: Type.ARRAY,
            description: "Exactly 4 core features that must be built in the MVP to achieve product-market fit.",
            items: {
              type: Type.OBJECT,
              properties: {
                feature: { type: Type.STRING, description: "A clear, customer-facing feature name." },
                complexity: { 
                  type: Type.STRING, 
                  enum: ["Low", "Medium", "High"],
                  description: "Implementation difficulty." 
                },
                description: { type: Type.STRING, description: "How this feature functions and solves a corresponding user pain point." },
              },
              required: ["feature", "complexity", "description"],
            },
          },
          usp: { type: Type.STRING, description: "The company's Unique Selling Proposition: why customers will crawl over broken glass to buy this over existing options." },
        },
        required: [
          "startupName", 
          "tagline", 
          "problem", 
          "solution", 
          "targetAudience", 
          "businessModel", 
          "revenueModel", 
          "pricing", 
          "goToMarket", 
          "mvpFeatures", 
          "usp"
        ],
      },
    },
  });

  const text = response.text;
  if (!text) {
    throw new Error("Startup generation failed to generate content from Gemini.");
  }
  return JSON.parse(text) as StartupGeneratorOutput;
}
