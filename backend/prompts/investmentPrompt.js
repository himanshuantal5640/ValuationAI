export const investmentPrompt = (company, researchData, newsData, riskData) => `You are a senior investment analyst. Synthesize the research, news, and risk dossiers for "${company}":

Research:
${researchData}

News:
${newsData}

Risks:
${riskData}

Perform a SWOT Analysis. List 3 key items for each category:
- Strengths (Internal advantages)
- Weaknesses (Internal limitations)
- Opportunities (External growth prospects)
- Threats (External risks)

Provide an intermediate synthesis of the investment appeal of the company.`;
