/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface MarketResearchOutput {
  marketSize: string;
  growthRate: string;
  customerSegments: {
    name: string;
    description: string;
    sizePercent: number;
  }[];
  currentProducts: {
    name: string;
    marketShare: string;
    pros: string;
    cons: string;
  }[];
  problems: string[];
  summary: string;
}

export interface PainPoint {
  title: string;
  description: string;
  severity: "High" | "Medium" | "Low";
  severityScore: number; // 1 to 10
  frequency: string;
  unmetNeed: string;
}

export interface PainDetectionOutput {
  painPoints: PainPoint[];
  highestSeverityPain: string;
  gapAnalysis: string;
}

export interface Trend {
  name: string;
  description: string;
  growthIndicator: "Rising" | "Stable" | "Exploding";
  driver: string;
}

export interface TrendAnalysisOutput {
  trends: Trend[];
  emergingTechnologies: string[];
  growingDemands: string[];
  futureOpportunities: string[];
}

export interface Competitor {
  name: string;
  marketRole: string; // e.g. Leader, Challenger, Niche
  strengths: string[];
  weaknesses: string[];
  marketGaps: string[];
}

export interface CompetitorAnalysisOutput {
  competitors: Competitor[];
  moatStrategies: string[];
  differentiationFocus: string;
}

export interface MVPFeature {
  feature: string;
  complexity: "Low" | "Medium" | "High";
  description: string;
}

export interface StartupGeneratorOutput {
  startupName: string;
  tagline: string;
  problem: string;
  solution: string;
  targetAudience: string;
  businessModel: string;
  revenueModel: string;
  pricing: string;
  goToMarket: string[];
  mvpFeatures: MVPFeature[];
  usp: string;
}

export interface ScoreBreakdown {
  marketSize: number; // 0-100
  competition: number; // 0-100
  difficulty: number; // 0-100
  revenuePotential: number; // 0-100
  virality: number; // 0-100
}

export interface RiskAssessment {
  risk: string;
  mitigation: string;
}

export interface OpportunityScoreOutput {
  scores: ScoreBreakdown;
  overallScore: number; // 0-100
  scoreJustification: string;
  riskAssessment: RiskAssessment[];
}

export interface PipelineState {
  niche: string;
  research?: MarketResearchOutput;
  pains?: PainDetectionOutput;
  trends?: TrendAnalysisOutput;
  competitors?: CompetitorAnalysisOutput;
  startup?: StartupGeneratorOutput;
  score?: OpportunityScoreOutput;
  report?: string;
}
