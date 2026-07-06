# OpportunityMiner AI 🚀
### Kaggle "5-Day AI Agents: Intensive Vibe Coding" Capstone Project

An investment-grade multi-agent AI research and formulation platform designed to discover, evaluate, and detail high-potential startup opportunities in any given market niche. Built with a full-stack architecture powered by **Vite/React**, **Node.js/Express**, and the modern **Google Gemini API (@google/genai SDK)**.

---

## 📖 Table of Contents
1. [Project Overview](#project-overview)
2. [Multi-Agent Architecture](#multi-agent-architecture)
3. [Agent Responsibilities](#agent-responsibilities)
4. [Tech Stack](#tech-stack)
5. [Installation & Setup](#installation--setup)
6. [How to Run](#how-to-run)
7. [Screenshots](#screenshots)
8. [Future Improvements](#future-improvements)

---

## 🎯 Project Overview
OpportunityMiner AI completely automates the process of finding startup concepts. Instead of spending weeks manually reading reviews, scouting competitors, evaluating market sizing models, and mapping technical trends, you simply type in a niche (e.g. "underwater drone maintenance" or "automated dental bill audits") and let a specialized swarm of AI agents do the work.

In seconds, the pipeline discovers key segments, scores paint point severity, highlights major technology triggers, analyzes the moat strategies of competitors, formulates a cohesive business model, scores the final opportunity out of 100, and drafts a beautifully-structured Markdown Investment Memorandum.

---

## 🧠 Multi-Agent Architecture
```
                         [Niche Input]
                               │
                        ┌──────▼──────┐
                        │ Orchestrator│
                        └──────┬──────┘
                               │ (Sequential Pipeline)
     ┌─────────────────────────┼─────────────────────────┐
     │ 1                       │ 2                       │ 3
┌────▼─────────┐          ┌────▼─────────┐          ┌────▼─────────┐
│ResearchAgent │─────────>│ PainAgent    │─────────>│ TrendAgent   │
└──────────────┘          └──────────────┘          └────┬─────────┘
                                                         │
     ┌───────────────────────────────────────────────────┘
     │ 4                       │ 5                       │ 6
┌────▼─────────┐          ┌────▼─────────┐          ┌────▼─────────┐
│CompetitorAg. │─────────>│ StartupGen.  │─────────>│ ScoreAgent   │
└──────────────┘          └──────────────┘          └────┬─────────┘
                                                         │
                                                         │ 7
                                                    ┌────▼─────────┐
                                                    │ ReportAgent  │
                                                    └────┬─────────┘
                                                         │
                                               [Markdown Memo & UI]
```

The system employs a strict, sequential pipeline. The output of each step is validated and fed directly into the context of the next step, ensuring cohesive compounding intelligence.

---

## 🛡️ Agent Responsibilities

1. **Research Agent (`ResearchAgent`)**: Conducts market sizing analysis (TAM, CAGR), maps out primary buyer persona segments, identifies current classes of offerings, and highlights baseline problems.
2. **Pain Detection Agent (`PainDetectionAgent`)**: Teases out real customer frustrations, scores friction severity from 1-10, maps when/how pain occurs, and isolating unarticulated human or business needs.
3. **Trend Agent (`TrendAgent`)**: Uncovers macro trends, emerging technologies (AI, WASM, edge devices, etc.), growing demands, and strategic greenfield opportunities.
4. **Competitor Agent (`CompetitorAgent`)**: Maps the major market incumbents, lists their strengths, analyzes their deep structural weaknesses, and discovers unaddressed gaps in coverage.
5. **Startup Generator Agent (`StartupGeneratorAgent`)**: Integrates previous insights to design a brand name, benefit tagline, Day 1 target beachhead audience, pricing strategies, go-to-market channels, a lean 4-feature MVP, and an unassailable USP.
6. **Opportunity Score Agent (`OpportunityScoreAgent`)**: Evaluates opportunity viability on a strict scale (Market Size, Competition, Difficulty, Revenue Potential, Virality), computes an overall GP score, and creates rigorous risk assessments.
7. **Report Agent (`ReportAgent`)**: Harmonizes the state into an exhaustive, polished, investor-grade Markdown report.

---

## ⚙️ Tech Stack
- **Frontend:** React 19, Tailwind CSS v4, Motion (for smooth layout transitions and step progress animations), Lucide React.
- **Backend:** Node.js, Express (Express v4), tsx, esbuild (for self-contained production builds).
- **AI Core:** Google Gemini API via the official, state-of-the-art `@google/genai` TypeScript SDK (utilizing `gemini-3.5-flash` for lighting fast structured and reasoning tasks).

---

## 💾 Installation & Setup

### Prerequisites
- Node.js (v18 or higher recommended)
- Google Gemini API Key (get one from Google AI Studio)

### Steps
1. **Clone or unzip the workspace files:**
   ```bash
   cd OpportunityMiner-AI
   ```
2. **Install all dependencies:**
   ```bash
   npm install
   ```
3. **Set up Environment Variables:**
   Create a `.env` file in the root directory and append your Gemini API Key:
   ```env
   GEMINI_API_KEY="your-gemini-api-key"
   PORT=3000
   ```

---

## 🏃 How to Run

### Run in Development Mode
To boot up the Express backend and Vite frontend concurrently with active watching:
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your web browser.

### Run in Production Mode
Compile both React static assets and the Express server, and launch the unified distribution:
```bash
npm run build
npm run start
```

---

## 📸 Screenshots (Placeholders)
- *Home Landing Page:* A glassmorphic dark theme centering a single search box, visual action buttons, and live instructions.
- *Active Processing Swarm:* Smooth animations tracking the individual agents as they "wake up", think, and record state.
- *Visual Business Dashboard:* Gauges representing scores, interactive grids for MVP features, and a markdown editor panel.

---

## 🔮 Future Improvements
- **Multi-Agent Branching:** Support parallel non-linear agent tasks (e.g. running Trend analysis and Competitor analysis simultaneously) to optimize latency.
- **Live Search Grounding:** Integrate Google Search Grounding (`googleSearch: {}` tool) inside the Research and Competitor Agents to pull live real-time funding announcements and product launches.
- **User Personas Simulations:** Allow spinning up simulated AI agents acting as the identified customer segments to do synthetic user-interview testing on the generated MVP.
