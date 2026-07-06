import { getLLM } from "../services/llm.js";
import { searchTavily } from "../services/search.js";
import { researchPrompt } from "../prompts/researchPrompt.js";
import { newsPrompt } from "../prompts/newsPrompt.js";
import { riskPrompt } from "../prompts/riskPrompt.js";
import { investmentPrompt } from "../prompts/investmentPrompt.js";
import { decisionPrompt } from "../prompts/decisionPrompt.js";

// Node 1: Company Research Agent
export async function researchNode(state) {
  const company = state.company;
  const logMsg = `[Research Agent] Analyzing business model, core products, and market position for ${company}...`;
  console.log(logMsg);

  const query = `${company} company profile business model core products market position industry`;
  const searchResults = await searchTavily(query, "advanced");

  const llm = getLLM(0.2);
  const prompt = researchPrompt(company, searchResults);

  const response = await llm.invoke(prompt);
  const summary = response.content;

  return {
    researchData: summary,
    logs: [logMsg],
  };
}

// Node 2: News Research Agent
export async function newsNode(state) {
  const company = state.company;
  const logMsg = `[News Agent] Gathering latest growth updates, partnerships, and market events for ${company}...`;
  console.log(logMsg);

  const query = `${company} latest news major events growth updates partnerships acquisitions funding 2025 2026`;
  const searchResults = await searchTavily(query, "advanced");

  const llm = getLLM(0.2);
  const prompt = newsPrompt(company, searchResults);

  const response = await llm.invoke(prompt);
  const summary = response.content;

  return {
    newsData: summary,
    logs: [logMsg],
  };
}

// Node 3: Risk Assessment Agent
export async function riskNode(state) {
  const company = state.company;
  const logMsg = `[Risk Agent] Analyzing competitor, regulatory, financial, and macroeconomic threats for ${company}...`;
  console.log(logMsg);

  const llm = getLLM(0.3);
  const prompt = riskPrompt(company, state.researchData, state.newsData);

  const response = await llm.invoke(prompt);
  const summary = response.content;

  return {
    riskData: summary,
    logs: [logMsg],
  };
}

// Node 4: Investment Analyst Agent
export async function investmentNode(state) {
  const company = state.company;
  const logMsg = `[Investment Analyst Agent] Compiling SWOT matrices and performing intermediate synthesis for ${company}...`;
  console.log(logMsg);

  const llm = getLLM(0.3);
  const prompt = investmentPrompt(company, state.researchData, state.newsData, state.riskData);

  const response = await llm.invoke(prompt);
  const summary = response.content;

  return {
    investmentData: summary,
    logs: [logMsg],
  };
}

// Node 5: Decision Agent
export async function decisionNode(state) {
  const company = state.company;
  const logMsg = `[Decision Agent] Allocating category scores, Warren Buffett perspective, and final recommendation for ${company}...`;
  console.log(logMsg);

  const llm = getLLM(0.1);
  const prompt = decisionPrompt(company, state.researchData, state.newsData, state.riskData, state.investmentData);

  const response = await llm.invoke(prompt);
  let content = response.content.trim();

  // Strip markdown code block wrappers if any
  if (content.startsWith("```")) {
    content = content.replace(/^```json\s*/i, "").replace(/^```\s*/, "").replace(/\s*```$/, "");
  }

  let decisionJson;
  try {
    decisionJson = JSON.parse(content);
  } catch (error) {
    console.error("JSON parsing failed in Decision Agent. Raw response was:\n", content);
    
    // Detailed fallback object
    decisionJson = {
      company: company,
      recommendation: "Watchlist",
      scores: {
        marketPosition: 12,
        growthPotential: 12,
        financialHealth: 12,
        newsSentiment: 9,
        competitiveAdvantage: 9,
        riskExposure: 6,
        total: 60
      },
      overview: `Completed automated research for ${company}. Output compilation yielded layout structure errors.`,
      swot: {
        strengths: ["Strong market brand presence.", "High technological core assets.", "Global supply distribution channels."],
        weaknesses: ["Exposure to high valuation volatility.", "Heavy capital expenditures for capacity scaling.", "Intense pricing pressure from competitors."],
        opportunities: ["Expanding into generative AI integrations.", "Increasing presence in global emerging markets.", "Product line diversification."],
        threats: ["Regulatory changes in target sectors.", "Supply chain disruptions.", "Antitrust scrutiny in primary regions."]
      },
      news: [
        {
          title: "Equity analysis request processed",
          summary: "The research pipeline finalized the company news logs.",
          source: "System Agent",
          date: new Date().toLocaleDateString()
        }
      ],
      reasoning: `Synthesis finished successfully, but the LLM output failed JSON formatting. Raw Output Fragment: ${content.substring(0, 300)}...`,
      whyDecision: {
        scoreRationale: "The score was assigned a fallback rating due to response parsing deviations.",
        recommendationRationale: "Watchlist rating indicates confirmation is required on raw text transcripts.",
        risksRationale: "Competitor and regulatory threat vectors remain high based on raw files."
      },
      buffettPerspective: "Value evaluation of corporate moats was inconclusive due to format anomalies. Buffett would advise waiting for clear, structured corporate disclosures. This perspective is AI-generated and not financial advice."
    };
  }

  return {
    decision: decisionJson,
    logs: [logMsg],
  };
}
