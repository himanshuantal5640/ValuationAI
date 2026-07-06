# Valuation.AI - Smart AI Investment Research Platform

Valuation.AI is an institutional-grade, multi-stage equity research platform powered by an orchestrating cluster of specialized AI agents. The platform automates corporate analysis, news intelligence parsing, risk evaluation, and investment decision modeling, returning category-graded scores (out of 100) and structured SWOT dossiers in seconds.

---

## Overview
Valuation.AI allows users to enter a company name (e.g., Nvidia, Tesla, Apple) and receive a comprehensive, real-time AI-generated investment recommendation. Rather than relying on a single, generic LLM prompt, the system deploys a state-managed orchestrator to pipeline requests sequentially across 5 specialized agents. 

The frontend shows a live execution log of the active agent node (Researching ➔ News Gathering ➔ Risk Analysis ➔ SWOT Synthesis ➔ Decision Modeling) and renders a glassmorphic dashboard featuring:
- **Decision Verdict**: Dynamic grading (**Strong Invest**, **Invest**, **Watchlist**, or **Pass**) represented by customized neon-glowing gauges.
- **SWOT Quadrants**: 4-panel analysis grid breaking down internal factors and external drivers.
- **Attribution Timeline**: Verified news events complete with publisher sources, dates, and summaries to prevent hallucinations.
- **Explainability Panel**: Granular explanations of the assigned score and risk weights.
- **Value Investor Perspective**: A Warren Buffett-style value thesis checking corporate moats and margins of safety.
- **SaaS Sidebar & PDF Exporter**: High-fidelity PDF downloads and a persistent navigation panel storing LocalStorage analysis logs.

---

## How to Run It

### 1. Set Up Environment Keys
Navigate to the `backend/` directory and configure the environment:
```bash
cd backend
cp .env.example .env
```
Open `backend/.env` and input your API keys:
```env
PORT=5000
OPENROUTER_API_KEY=your_openrouter_api_key
TAVILY_API_KEY=your_tavily_search_key
```
*Note: OpenRouter is used for the LLM pipeline (`google/gemini-2.5-flash`) and Tavily is used for real-time web search capability.*

### 2. Start the Backend Server
```bash
cd backend
npm install
npm start
```
The server will boot on `http://localhost:5000`.

### 3. Start the Frontend Application
In a separate terminal window, open the frontend directory:
```bash
cd Frontend
npm install
npm run dev
```
Open `http://localhost:5173/` in your browser.

---

## How It Works

### Multi-Agent Pipeline Graph
Requests progress through a sequential, state-managed execution graph built using **LangGraph.js** and **LangChain.js**:

```
[ Vite React SPA ]  ---(HTTP Proxy / Stream)--->  [ Node/Express API ]
                                                          ↓
[ START ] ➔ [ 1. Company Research Agent ] ➔ [ 2. News Intelligence Agent ]
                                                          ↓
[ END ] 🠔 [ 5. Decision Board Agent ] 🠔 [ 4. Investment Analyst Agent ] 🠔 [ 3. Risk Assessment Agent ]
```

1. **Company Research Agent**: Queries corporate profiles, products, business models, and competitive moats using Tavily.
2. **News Intelligence Agent**: Filters and summarizes news articles from the last 12-18 months, enforcing source attribution to prevent hallucinations.
3. **Risk Assessment Agent**: Builds competitor, financial, macroeconomic, and regulatory threat matrices.
4. **Investment Analyst Agent**: Synthesizes the dossiers and compiles a structured 4-quadrant SWOT matrix.
5. **Decision Board Agent**: Determines category scores (out of 100 total), generates transparent rationales, and writes a Warren Buffett value-investing thesis.

### Real-Time Streaming
Instead of keeping the user waiting for a single long HTTP request, the backend router `/api/analyze/stream` flushes updates in real-time as NDJSON (JSON Lines) chunks. The client reads the stream using the browser's native `ReadableStream` reader, ticking off completed nodes and logging active text outputs in the UI.

---

## Key Decisions & Trade-Offs

### 1. Sequential Chaining vs. Parallel Processing
- **Decision**: Chained the agents sequentially: `Research ➔ News ➔ Risks ➔ SWOT ➔ Decision`.
- **Trade-Off**: Chaining takes ~12-15 seconds to execute because each agent awaits the output of the prior node. However, this ensures absolute context integrity (e.g., the Risk Agent evaluates the *actual* news collected by the News Agent, and the Decision Agent scores the *actual* SWOT compiled by the Analyst). 

### 2. Token Ceiling Cap (`maxTokens: 2048`)
- **Decision**: Explicitly limited the LLM completions to `2048` max tokens inside `backend/services/llm.js`.
- **Trade-Off**: By default, the LangChain OpenAI driver requests the model's maximum window size (65,535 tokens). OpenRouter checks if a key has enough funds to cover this worst-case token size. For users with low balances or free tiers, this throws a `402 Payment Required` block. Restricting `maxTokens` to `2048` reduces the required credit check threshold, letting the server run seamlessly on free and low-credit keys.

### 3. PDF Generation: html2canvas-pro Override
- **Decision**: Replaced `html2pdf.js` with `html2canvas-pro` + `jspdf` directly in [Frontend/src/pages/Dashboard.jsx](file:///c:/Users/Himanshu/Desktop/INISDEIIM/Frontend/src/pages/Dashboard.jsx).
- **Trade-Off**: Tailwind CSS v4 compiles utility classes to modern `oklch()` color codes by default. Standard canvas libraries crash when trying to parse `oklch` strings inside style rules. Moving to `html2canvas-pro` (which natively parses modern CSS color specs) resolves this, ensuring high-fidelity dashboard screenshots are generated without style loss or crashes.

---

## Example Runs

Below is the structured output format returned by the Decision agent:

```json
{
  "company": "Nvidia",
  "recommendation": "Strong Invest",
  "scores": {
    "marketPosition": 19,
    "growthPotential": 18,
    "financialHealth": 17,
    "newsSentiment": 14,
    "competitiveAdvantage": 15,
    "riskExposure": 9,
    "total": 92
  },
  "overview": "Nvidia Corporation is the global pioneer of GPU-accelerated computing, dominating the enterprise deep learning and artificial intelligence hardware space...",
  "swot": {
    "strengths": [
      "Unrivaled 85-90% market share in AI training and inferencing chips.",
      "Deep developer dependency through the proprietary CUDA programming library."
    ],
    "weaknesses": [
      "High revenue dependency on a small group of cloud service providers."
    ],
    "opportunities": [
      "Explosion of autonomous robotics and edge-computing applications."
    ],
    "threats": [
      "US government export bans restricting sales to primary Asian markets."
    ]
  },
  "news": [
    {
      "title": "Nvidia Blackwell GPU production hits full capacity",
      "summary": "Nvidia reports Blackwell architectures are booked out for several quarters due to hyperscaler demand.",
      "source": "Bloomberg Finance",
      "date": "February 2026"
    }
  ],
  "reasoning": "Nvidia presents a clear, high-conviction Strong Invest. Its compute supremacy combined with its massive CUDA software moat forms a technological monopoly...",
  "whyDecision": {
    "scoreRationale": "Awarded near-perfect scores for market share (19) and competitive moat (15), offset by a minor risk markdown for supply chain vendor concentration.",
    "recommendationRationale": "Strong Invest is generated because the total score of 92 exceeds the 80 threshold.",
    "risksRationale": "Hardware supply chain single-source risks (TSMC) are monitored but offset by Nvidia's long-term pre-purchasing agreements."
  },
  "buffettPerspective": "Warren Buffett would admire Nvidia's incredible economic moat and software lock-in via CUDA, which acts like a toll bridge on AI traffic. However, he would likely Pass on investing due to the rapid technological change in semiconductors and the difficulty of predicting cash flows 10 years out... (AI-generated evaluation, not financial advice)."
}
```

---

## What You Would Improve with More Time

1. **Parallel Graph Branching**: Modify the LangGraph definition to run the `Research Agent` and `News Agent` in parallel, combining their state channels in a subsequent compiler node. This would reduce analysis latency by ~35%.
2. **Retrieval-Augmented Generation (RAG)**: Connect the agents to a vector database loaded with SEC filings (10-K, 10-Q reports). This would supplement public web results with structured corporate disclosure data.
3. **Advanced Charting**: Integrate financial charts mapping the company's historical stock price, P/E ratios, and revenue growth.
4. **Agent-to-Agent Debate**: Introduce a peer-review node where a "Bear Agent" and "Bull Agent" debate the company's prospects before the Decision Board Agent locks in the final score.
5. **LLM Development Transcript**: To review the full thought process and chat logs between the developer and AI assistant during the construction of this app, check out [AI_CHAT_LOGS.md](file:///c:/Users/Himanshu/Desktop/INISDEIIM/AI_CHAT_LOGS.md).
