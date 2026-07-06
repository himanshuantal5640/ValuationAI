import express from "express";
import { graph } from "../graph/workflow.js";
import { db } from "../services/db.js";

const router = express.Router();

// GET /api/history - Retrieve search history for the logged-in user
router.get("/history", (req, res) => {
  const userId = req.headers["x-user-id"];
  if (!userId) {
    return res.status(401).json({ error: "Unauthorized. Missing user ID." });
  }
  
  try {
    const history = db.searches.findByUser(userId);
    // Map db structure to frontend expected structure
    const mapped = history.map(item => ({
      ...item.resultJson,
      id: item.id,
      createdAt: item.createdAt
    }));
    return res.json(mapped);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

// POST /api/analyze - Standard REST JSON endpoint
router.post("/analyze", async (req, res) => {
  const { company } = req.body;
  const userId = req.headers["x-user-id"];
  
  if (!company) {
    return res.status(400).json({ error: "Company name is required." });
  }

  try {
    console.log(`Starting analysis for ${company}...`);
    const result = await graph.invoke({ company });
    if (result && result.decision) {
      if (userId) {
        db.searches.create(userId, company, result.decision);
      }
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
  const { company, userId } = req.query;
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
    console.log(`[Stream API] Starting graph stream for ${company} (User: ${userId || 'Anonymous'})`);
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
        
        // Cache result in database if user is authenticated
        if (userId) {
          try {
            db.searches.create(userId, company, chunk.decision_node.decision);
          } catch (e) {
            console.error("Failed to save search history:", e);
          }
        }
        
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
