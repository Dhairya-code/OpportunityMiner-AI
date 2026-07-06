/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { GoogleGenAI, Type } from "@google/genai";
import { MarketResearchOutput, PainDetectionOutput } from "../../types.js";

export async function detectPainPoints(
  ai: GoogleGenAI,
  researchData: MarketResearchOutput
): Promise<PainDetectionOutput> {
  const prompt = `Based on the following market research data, perform an intensive Customer Pain Point analysis.
Identify specific, recurring, and painful frustrations that actual buyers experience. Rate the severity of each pain point (1-10) and explain the unmet emotional or professional needs behind it.

Research Data:
${JSON.stringify(researchData, null, 2)}
`;

  const response = await ai.models.generateContent({
    model: "gemini-3.5-flash",
    contents: prompt,
    config: {
      systemInstruction: "You are a customer-experience researcher specializing in empathy-mapping and user frustration discovery. Your role is to uncover the deepest friction points, hidden workarounds, and unarticulated pains that users endure.",
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          painPoints: {
            type: Type.ARRAY,
            description: "A list of 3-5 major recurring user frustrations.",
            items: {
              type: Type.OBJECT,
              properties: {
                title: { type: Type.STRING, description: "A punchy, descriptive title for the pain point." },
                description: { type: Type.STRING, description: "Detailed description of when, why, and how this frustration occurs." },
                severity: { 
                  type: Type.STRING, 
                  enum: ["High", "Medium", "Low"],
                  description: "Categorical severity classification." 
                },
                severityScore: { 
                  type: Type.INTEGER, 
                  description: "Friction intensity score from 1 (mild annoyance) to 10 (critical blocker)." 
                },
                frequency: { type: Type.STRING, description: "How often this occurs (e.g., 'Daily', 'During onboarding', 'When generating reports')." },
                unmetNeed: { type: Type.STRING, description: "The underlying core need that is currently left completely unaddressed by market incumbents." },
              },
              required: ["title", "description", "severity", "severityScore", "frequency", "unmetNeed"],
            },
          },
          highestSeverityPain: {
            type: Type.STRING,
            description: "Identify which pain point has the absolute highest urgency/severity score, and explain why it is the most critical starting point.",
          },
          gapAnalysis: {
            type: Type.STRING,
            description: "A synthesis mapping out the structural gaps between what current competitors offer and what users actually need.",
          },
        },
        required: ["painPoints", "highestSeverityPain", "gapAnalysis"],
      },
    },
  });

  const text = response.text;
  if (!text) {
    throw new Error("Pain detection failed to generate content from Gemini.");
  }
  return JSON.parse(text) as PainDetectionOutput;
}
