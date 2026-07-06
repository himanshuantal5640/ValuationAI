# Valuation.AI - Smart AI Investment Research Platform

Valuation.AI is an institutional-grade, multi-stage equity research platform powered by an orchestrating cluster of specialized AI agents. The platform automates corporate analysis, news intelligence parsing, risk evaluation, and investment decision modeling, returning category-graded scores (out of 100) and structured SWOT dossiers in seconds.

---

## 🏗️ System Architecture

### Multi-Agent Pipeline Graph
Requests progress through a sequential, state-managed execution graph orchestrated via **LangGraph**:

```
[ Vite React SPA ]  ---(HTTP Proxy / Stream)--->  [ Node/Express API ]
                                                          ↓
[ START ] ➔ [ 1. Company Research Agent ] ➔ [ 2. News Intelligence Agent ]
                                                          ↓
[ END ] 🠔 [ 5. Decision Board Agent ] 🠔 [ 4. Investment Analyst Agent ] 🠔 [ 3. Risk Assessment Agent ]
```

1. **Company Research Agent**: Queries corporate profiles, products, and competitive moats.
2. **News Intelligence Agent**: Filters and summarizes news articles from the last 12-18 months, enforcing source attribution to prevent hallucinations.
3. **Risk Assessment Agent**: Builds competitor, financial, macroeconomic, and regulatory threat matrices.
4. **Investment Analyst Agent**: Synthesizes the aggregated dossiers and structures a 4-quadrant SWOT analysis.
5. **Decision Board Agent**: Determines mathematical category scores, generates transparent explanation commentaries, and writes a Warren Buffett value investing evaluation.

---

## 📈 Scoring Logic & Decision Rules

A mathematical scoring breakdown is computed out of **100 total points**:

| Category | Maximum Points | Description |
| :--- | :--- | :--- |
| **Market Position** | 20 | Corporate market share and industry scale |
| **Growth Potential** | 20 | Product expansion vectors and emerging markets |
| **Financial Health** | 20 | Profitability margins and capital structures |
| **Recent News Sentiment**| 15 | Negative/positive tone of recent news updates |
| **Competitive Advantage**| 15 | Durability of the economic moat (e.g., software lock-in) |
| **Risk Exposure** | 10 | Rationale for risk mitigation (Higher score = lower risk) |

### Recommendation Verdict Thresholds:
* **80 - 100**: 🟢 **Strong Invest** (High-conviction compounder)
* **60 - 79**: 🟢 **Invest** (Consistent growth asset)
* **40 - 59**: 🟡 **Watchlist** (High-potential options but elevated uncertainties)
* **0 - 39**: 🔴 **Pass** (Avoid or Hold pending margin restructuring)

---

## 🛠️ Tech Stack

* **Frontend**: React (Vite), Tailwind CSS v4, Framer Motion, Recharts, Lucide/React Icons, html2pdf.js.
* **Backend**: Node.js, Express, CORS, Dotenv.
* **AI & Orchestration**: LangChain.js, LangGraph.js, OpenRouter API (`google/gemini-2.5-flash`).
* **Web Search**: Tavily Search API.

---

## 🚀 Setup & Local Installation

### 1. Clone & Configure Keys
Open the backend directory and set up your variables:
```bash
# In c:\Users\Himanshu\Desktop\INISDEIIM\backend
cp .env.example .env
```
Populate the keys:
```env
PORT=5000
OPENROUTER_API_KEY=your_openrouter_api_key
TAVILY_API_KEY=your_tavily_search_key
```

### 2. Install & Start Backend
```bash
cd backend
npm install
npm start
```
The server will run on `http://localhost:5000`.

### 3. Install & Start Frontend
```bash
cd ../Frontend
npm install
npm run dev
```
Open your browser at `http://localhost:5173/`.

---

## 📡 API Documentation

### POST `/api/analyze`
* **Request**:
  ```json
  { "company": "Nvidia" }
  ```
* **Response**: Returns the fully computed decision object in JSON.

### GET `/api/analyze/stream`
* **Request**: `/api/analyze/stream?company=Nvidia`
* **Response**: Streams progress updates as NDJSON (JSON Lines):
  * `{"type": "status", "node": "research_start", "message": "..."}`
  * `{"type": "status", "node": "research_complete", "message": "..."}`
  * `{"type": "result", "data": { ... }}`
  * `{"type": "complete"}`

---

## ⚖️ Tradeoffs & Future Enhancements
* **Sequential Graph Chaining**: Using sequential node runs is robust and provides absolute state guarantees, though it takes ~15s to complete compared to parallelizing news and research. Future upgrades could execute Research & News nodes concurrently.
* **OpenRouter Model Choice**: Gemini 2.5 Flash provides exceptional speed and cost efficiency. For institutional deployment, the workflow can easily swap to `openai/gpt-4o` or `anthropic/claude-3-5-sonnet` inside `llm.js`.

---

## 🌐 Deployment Instructions

### Frontend (Vercel)
Vercel automatically detects the Vite config. Deploy directly:
```bash
cd Frontend
vercel
```

### Backend (Render)
Create a new Web Service on Render targeting the `backend/` folder.
* **Build Command**: `npm install`
* **Start Command**: `node server.js`
* Add your environment variables (`OPENROUTER_API_KEY`, `TAVILY_API_KEY`) under Render's dashboard.
