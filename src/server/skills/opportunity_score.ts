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
  StartupGeneratorOutput, 
  OpportunityScoreOutput 
} from "../../types.js";

export async function computeOpportunityScore(
  ai: GoogleGenAI,
  research: MarketResearchOutput,
  pains: PainDetectionOutput,
  trends: TrendAnalysisOutput,
  competitors: CompetitorAnalysisOutput,
  startup: StartupGeneratorOutput
): Promise<OpportunityScoreOutput> {
  const prompt = `Critically evaluate and score the opportunity of the proposed startup business concept.
Be highly analytical and realistic—do not just hand out perfect scores. Assess potential risks and provide actionable risk mitigation strategies.

Market Size context:
${JSON.stringify(research, null, 2)}

User Pain points:
${JSON.stringify(pains, null, 2)}

Market Trends:
${JSON.stringify(trends, null, 2)}

Competitor Landscapes:
${JSON.stringify(competitors, null, 2)}

Startup Proposed Concept:
${JSON.stringify(startup, null, 2)}
`;

  const response = await ai.models.generateContent({
    model: "gemini-3.5-flash",
    contents: prompt,
    config: {
      systemInstruction: "You are an eagle-eyed Venture Capital (VC) General Partner. Your job is to poke holes in investment pitches, perform deep risk assessment, and score potential investments objectively to find the absolute diamonds in the rough.",
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          scores: {
            type: Type.OBJECT,
            properties: {
              marketSize: { type: Type.INTEGER, description: "Score from 0 to 100 based on scale, growth rate, and TAM depth." },
              competition: { type: Type.INTEGER, description: "Score from 0 to 100 (where 100 is low competition/highly open space, and 0 is heavily entrenched oligopoly)." },
              difficulty: { type: Type.INTEGER, description: "Score from 0 to 100 (where 100 means very easy to launch/low tech barrier, and 0 is extremely difficult regulatory/deeptech)." },
              revenuePotential: { type: Type.INTEGER, description: "Score from 0 to 100 based on margins, pricing power, and scaleability." },
              virality: { type: Type.INTEGER, description: "Score from 0 to 100 based on inherent product referral loops, word-of-mouth strength, and organic channels." },
            },
            required: ["marketSize", "competition", "difficulty", "revenuePotential", "virality"],
          },
          overallScore: { 
            type: Type.INTEGER, 
            description: "The calculated weighted overall rating out of 100. Be strict and objective." 
          },
          scoreJustification: { 
            type: Type.STRING, 
            description: "A detailed breakdown of how you arrived at this overall score, highlighting both massive positives and major headwinds." 
          },
          riskAssessment: {
            type: Type.ARRAY,
            description: "List 3 high-impact risks that could kill this business, along with highly specific, non-obvious mitigation strategies for each.",
            items: {
              type: Type.OBJECT,
              properties: {
                risk: { type: Type.STRING, description: "Description of the existential threat." },
                mitigation: { type: Type.STRING, description: "How the startup should proactively defuse or mitigate this threat." },
              },
              required: ["risk", "mitigation"],
            },
          },
        },
        required: ["scores", "overallScore", "scoreJustification", "riskAssessment"],
      },
    },
  });

  const text = response.text;
  if (!text) {
    throw new Error("Opportunity scoring failed to generate content from Gemini.");
  }
  return JSON.parse(text) as OpportunityScoreOutput;
}
