import { StateGraph, START, END } from "@langchain/langgraph";
import { AgentState } from "./state.js";
import { researchNode, newsNode, riskNode, investmentNode, decisionNode } from "../agents/researcher.js";

// Initialize state graph
const workflow = new StateGraph(AgentState)
  .addNode("research", researchNode)
  .addNode("news", newsNode)
  .addNode("risks", riskNode)
  .addNode("investment", investmentNode)
  .addNode("decision_node", decisionNode)
  
  // Define progression edges
  .addEdge(START, "research")
  .addEdge("research", "news")
  .addEdge("news", "risks")
  .addEdge("risks", "investment")
  .addEdge("investment", "decision_node")
  .addEdge("decision_node", END);

// Compile the workflow graph
export const graph = workflow.compile();
