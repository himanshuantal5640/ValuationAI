import express from "express";
import { graph } from "../graph/workflow.js";

const router = express.Router();

// POST /api/analyze - Standard REST JSON endpoint
router.post("/analyze", async (req, res) => {
  const { company } = req.body;
  if (!company) {
    return res.status(400).json({ error: "Company name is required." });
  }

  try {
    console.log(`Starting analysis for ${company}...`);
    const result = await graph.invoke({ company });
    if (result && result.decision) {
      return res.json(result.decision);
    } else {
      return res.status(500).json({ error: "Failed to generate decision.", state: result });
    }
  } catch (error) {
    console.error("Analysis failed:", error);
    return res.status(500).json({ error: error.message });
  }
});

// GET /api/analyze/stream - Streaming JSON Lines endpoint
router.get("/analyze/stream", async (req, res) => {
  const { company } = req.query;
  if (!company) {
    res.status(400).write(JSON.stringify({ type: "error", error: "Company name is required." }) + "\n");
    return res.end();
  }

  // Setup streaming headers
  res.writeHead(200, {
    "Content-Type": "application/x-ndjson",
    "Cache-Control": "no-cache",
    "Connection": "keep-alive",
  });

  const sendChunk = (type, payload = {}) => {
    res.write(JSON.stringify({ type, ...payload }) + "\n");
  };

  try {
    console.log(`[Stream API] Starting graph stream for ${company}`);
    sendChunk("status", { node: "research_start", message: "Researching Company Overview, Business Model & Market Position..." });

    const stream = await graph.stream({ company });
    
    for await (const chunk of stream) {
      if (chunk.research) {
        sendChunk("status", { 
          node: "research_complete", 
          message: "✓ Research Completed. Gathering latest news, announcements, and events..." 
        });
      } else if (chunk.news) {
        sendChunk("status", { 
          node: "news_complete", 
          message: "✓ News Collection Completed. Conducting risk analysis across competition and financial sectors..." 
        });
      } else if (chunk.risks) {
        sendChunk("status", { 
          node: "risks_complete", 
          message: "✓ Risk Evaluation Completed. Chaining investment analyst for SWOT formulation..." 
        });
      } else if (chunk.investment) {
        sendChunk("status", { 
          node: "investment_complete", 
          message: "✓ SWOT & Analyst view generated. Evaluating final scores, recommendation and Buffet perspectives..." 
        });
      } else if (chunk.decision_node) {
        sendChunk("status", { 
          node: "decision_complete", 
          message: "✓ Investment Decision Generated." 
        });
        sendChunk("result", { data: chunk.decision_node.decision });
      }
    }

    sendChunk("complete", { message: "Workflow finished." });
    res.end();
  } catch (error) {
    console.error("[Stream API Error]", error);
    sendChunk("error", { error: error.message });
    res.end();
  }
});

export default router;
