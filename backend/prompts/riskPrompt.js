export const riskPrompt = (company, researchData, newsData) => `You are a risk management analyst. Assess the risks facing "${company}" using these dossiers:

Company Dossier:
${researchData}

News Dossier:
${newsData}

Analyze and structure the major threats covering:
1. Competition Risk (Rivals, price wars, tech disruption)
2. Market/Macroeconomic Risk (Inflation, interest rates, consumer spending, currency)
3. Regulatory/Legal Risk (Antitrust, privacy laws, trade restrictions)
4. Financial/Operational Risk (Debt leverage, supply chain bottleneck, margin pressure)

List critical red flags that could devalue the investment.`;
