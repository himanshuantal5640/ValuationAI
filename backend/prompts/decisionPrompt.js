export const decisionPrompt = (company, researchData, newsData, riskData, investmentData) => `You are the Managing Director & Chief Investment Officer. Make a final investment decision for "${company}".

Review all compiled dossiers:
1. Overview & Moat:
${researchData}
2. News Updates:
${newsData}
3. Risk Assessments:
${riskData}
4. SWOT & Analyst View:
${investmentData}

TASK:
1. Assign Category Scores (out of 100 total):
   - Market Position (Max 20)
   - Growth Potential (Max 20)
   - Financial Health (Max 20)
   - Recent News Sentiment (Max 15)
   - Competitive Advantage (Max 15)
   - Risk Exposure (Max 10) - score reflects how well the company mitigates risk (e.g. 10/10 means low risk exposure, 2/10 means high risk).
   Compute the Total Score as the sum of these category scores.
   
2. Decide the Recommendation Verdict based on the Total Score:
   - 80 to 100: "Strong Invest"
   - 60 to 79: "Invest"
   - 40 to 59: "Watchlist"
   - 0 to 39: "Pass"

3. Provide SWOT Analysis lists (from the SWOT/Analyst dossier).
4. Provide structured News Citations (containing title, summary, source, date).
5. Provide a Warren Buffett Value Investing Perspective: Evaluate the company through the lens of a value investor (moats, margin of safety, capital allocation, management trust). Clearly note it is AI-generated and not financial advice.
6. Provide "Why this decision?" comments explaining the score, recommendation, and risk rationale.

You MUST respond with a single JSON object. Do not include markdown code blocks (such as \`\`\`json) or intro/outro text outside the JSON. The output must strictly parse with JSON.parse.

Expected JSON Structure:
{
  "company": "${company}",
  "recommendation": "Strong Invest" | "Invest" | "Watchlist" | "Pass",
  "scores": {
    "marketPosition": <integer 0-20>,
    "growthPotential": <integer 0-20>,
    "financialHealth": <integer 0-20>,
    "newsSentiment": <integer 0-15>,
    "competitiveAdvantage": <integer 0-15>,
    "riskExposure": <integer 0-10>,
    "total": <sum of above>
  },
  "overview": "<brief executive summary, 2-3 sentences>",
  "swot": {
    "strengths": ["...", "...", "..."],
    "weaknesses": ["...", "...", "..."],
    "opportunities": ["...", "...", "..."],
    "threats": ["...", "...", "..."]
  },
  "news": [
    {
      "title": "<headline>",
      "summary": "<brief summary>",
      "source": "<source name>",
      "date": "<publication date>"
    }
  ],
  "reasoning": "<final CIO reasoning paragraph>",
  "whyDecision": {
    "scoreRationale": "<explanation of score selection>",
    "recommendationRationale": "<explanation of recommendation selection>",
    "risksRationale": "<explanation of risk prioritization>"
  },
  "buffettPerspective": "<Warren Buffett perspective essay, 3-4 sentences, ending with a disclaimer that this is AI generated and not financial advice.>"
}`;
