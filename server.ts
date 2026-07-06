/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import express from "express";
import path from "path";
import dotenv from "dotenv";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import { Orchestrator } from "./src/server/agents/Orchestrator.js";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Lazy-initialized Gemini client to prevent crashing on server boot if key is missing
let aiClient: GoogleGenAI | null = null;
function getGeminiAI(): GoogleGenAI {
  if (!aiClient) {
    const key = process.env.GEMINI_API_KEY;
    if (!key) {
      throw new Error("GEMINI_API_KEY environment variable is missing. Please add it via the Settings > Secrets menu.");
    }
    aiClient = new GoogleGenAI({
      apiKey: key,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });
  }
  return aiClient;
}

// 1. GET /health: Health Check endpoint
app.get("/health", (req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

// 2. GET /research/:niche: Run only the research agent
app.get("/research/:niche", async (req, res) => {
  try {
    const niche = decodeURIComponent(req.params.niche);
    if (!niche || niche.trim() === "") {
      res.status(400).json({ error: "Niche parameter is required." });
      return;
    }

    const ai = getGeminiAI();
    const orchestrator = new Orchestrator(ai);
    const resultState = await orchestrator.runResearch(niche);
    
    res.json(resultState);
  } catch (error: any) {
    console.error("Error in /research/:niche endpoint:", error);
    res.status(500).json({ error: error.message || "An error occurred during market research." });
  }
});

// 3. GET /opportunity/:niche: Run the full multi-agent pipeline
app.get("/opportunity/:niche", async (req, res) => {
  try {
    const niche = decodeURIComponent(req.params.niche);
    if (!niche || niche.trim() === "") {
      res.status(400).json({ error: "Niche parameter is required." });
      return;
    }

    const ai = getGeminiAI();
    const orchestrator = new Orchestrator(ai);
    const resultState = await orchestrator.runFullPipeline(niche);

    res.json(resultState);
  } catch (error: any) {
    console.error("Error in /opportunity/:niche endpoint:", error);
    res.status(500).json({ error: error.message || "An error occurred during the multi-agent execution pipeline." });
  }
});

// Setup Vite Dev Server / Static Hosting
async function setupVite() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
    console.log("Vite development middleware integrated.");
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
    console.log("Serving static files from dist/ in production.");
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`OpportunityMiner AI server running on http://0.0.0.0:${PORT}`);
  });
}

setupVite().catch((err) => {
  console.error("Failed to boot Express & Vite application:", err);
});
