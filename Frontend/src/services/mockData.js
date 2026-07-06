export const MOCK_HISTORY = [
  {
    company: "Nvidia",
    recommendation: "Strong Invest",
    scores: {
      marketPosition: 19,
      growthPotential: 18,
      financialHealth: 17,
      newsSentiment: 14,
      competitiveAdvantage: 15,
      riskExposure: 9, // low exposure -> 9/10
      total: 92
    },
    overview: "Nvidia Corporation is the global pioneer of GPU-accelerated computing, dominating the enterprise deep learning and artificial intelligence hardware space. Through its Blackwell architectures and custom networks, the firm powers the vast majority of hyperscaler AI inference clusters globally.",
    swot: {
      strengths: [
        "Unrivaled 85-90% market share in AI training and inferencing chips.",
        "Deep developer dependency through the proprietary CUDA programming library.",
        "Exceptional pricing power delivering gross profit margins over 75%."
      ],
      weaknesses: [
        "High revenue dependency on a small group of cloud service providers.",
        "Vulnerability to GPU supply limits due to advanced packaging reliance on TSMC.",
        "Extremely high valuation ratios pricing in near-perfect execution."
      ],
      opportunities: [
        "Explosion of autonomous robotics and edge-computing applications.",
        "Expansion of sovereign AI computing projects funded by national governments.",
        "Growth in custom chip design integration using advanced packaging."
      ],
      threats: [
        "US government export bans restricting sales to primary Asian markets.",
        "In-house silicon development by major clients like Google, AWS, and Microsoft.",
        "Aggressive competitive chip developments by AMD and tech startups."
      ]
    },
    news: [
      {
        title: "Nvidia Blackwell GPU production hits full capacity",
        summary: "Nvidia reports Blackwell architectures are booked out for several quarters due to hyperscaler demand.",
        source: "Bloomberg Finance",
        date: "February 2026"
      },
      {
        title: "Collaboration with Mercedes-Benz on DRIVE Thor architecture",
        summary: "Strategic deployment of in-car autonomous computers on Mercedes vehicle lineups starting 2026.",
        source: "Automotive News",
        date: "Q4 2025"
      },
      {
        title: "Record quarterly revenue increases by 150% YoY",
        summary: "Data Center division drives historic revenue growth beat, exceeding street forecasts.",
        source: "Reuters",
        date: "January 2026"
      }
    ],
    reasoning: "Nvidia presents a clear, high-conviction Strong Invest. Its semiconductor design dominance combined with its massive CUDA software moat represents a technological monopoly that competitors cannot easily disrupt. While the valuation is premium, its near-monopoly on generative AI infrastructure yields exceptional operating margins and returns on capital.",
    whyDecision: {
      scoreRationale: "Calculated 92/100 by awarding near-perfect scores for market share (19) and competitive moat (15), offset by a minor risk markdown for supply chain vendor concentration.",
      recommendationRationale: "Strong Invest is generated because the total score of 92 exceeds the 80 threshold, supported by outstanding return on equity metrics.",
      risksRationale: "Hardware supply chain single-source risks (TSMC) are monitored but offset by Nvidia's long-term pre-purchasing agreements."
    },
    buffettPerspective: "Warren Buffett would admire Nvidia's incredible economic moat and software lock-in via CUDA, which acts like a toll bridge on AI traffic. However, he would likely Pass on investing due to the rapid technological change in semiconductors and the difficulty of predicting cash flows 10 years out. Value investing principles warn against paying a high premium in rapidly changing sectors. (AI-generated evaluation, not financial advice)."
  },
  {
    company: "Tesla",
    recommendation: "Watchlist",
    scores: {
      marketPosition: 15,
      growthPotential: 14,
      financialHealth: 13,
      newsSentiment: 8,
      competitiveAdvantage: 11,
      riskExposure: 4, // high exposure -> 4/10
      total: 55
    },
    overview: "Tesla, Inc. designs, builds, and leases fully electric vehicles, utility-scale battery energy storage systems (Megapacks), and solar installations. It is expanding heavily into robotics, vision-based full self-driving networks, and centralized AI supercomputing clusters.",
    swot: {
      strengths: [
        "Unparalleled manufacturing scale and global brand cachet in electric vehicles.",
        "High-margin stationary energy storage division experiencing rapid grid adoption.",
        "Immense real-world telemetry dataset for training FSD neural nets."
      ],
      weaknesses: [
        "Core automotive margins eroding due to continuous price adjustments.",
        "Slowing customer EV replacement rates in saturated primary markets.",
        "High reliance on Key Man dependency around CEO Elon Musk."
      ],
      opportunities: [
        "Licensing FSD vision technology to legacy passenger automotive makers.",
        "Scaling autonomous robotaxi networks and dedicated robot fleets.",
        "Scaling humanoid Optimus robots across industrial operations."
      ],
      threats: [
        "Increasing competitive low-cost EV offerings from Chinese makers like BYD.",
        "Regulatory investigations into vision-only driver assistance systems.",
        "Prolonged delays in autonomous software validation and commercialization."
      ]
    },
    news: [
      {
        title: "Regulators open investigation on camera-based FSD systems",
        summary: "Inquiries launched following safety reports regarding camera performance under severe weather anomalies.",
        source: "Wall Street Journal",
        date: "March 2026"
      },
      {
        title: "Tesla battery storage deployments double year-over-year",
        summary: "Megapack installations drive record profits for the Tesla Energy division, offsetting EV margin hits.",
        source: "CNBC",
        date: "Q4 2025"
      },
      {
        title: "Sequential delivery numbers register marginal decline",
        summary: "Logistics upgrades and factory refurbishments lead to temporary production volumes contraction.",
        source: "TechCrunch",
        date: "Recent"
      }
    ],
    reasoning: "Tesla is graded as a Watchlist asset. Although its energy division is showing outstanding growth and FSD represents a high-potential option, its core automotive business is facing systemic margin compression due to global oversupply and intense Chinese competition. A wait-and-see stance is recommended until automotive margins stabilize or FSD licensing revenue materializes.",
    whyDecision: {
      scoreRationale: "The score is placed at 55/100 due to automotive margin compression (financial health 13/20) and high risk exposure regarding FSD regulatory hurdles (4/10).",
      recommendationRationale: "Watchlist verdict is chosen because the score falls inside the 40-59 boundary, reflecting high execution uncertainty despite technological potential.",
      risksRationale: "Antitrust and driver assist safety audits present critical regulatory headwinds that could impact consumer sentiment in the near term."
    },
    buffettPerspective: "Warren Buffett would admire Tesla's brand power and clean sheet manufacturing design. However, he would likely Pass because Tesla operates in the highly capital-intensive automotive industry, which historically lacks high moats and long-term pricing power. Furthermore, Buffett avoids investing in visionary leaders where future cash flows depend on unproven technological breakthroughs like autonomous robotaxis. (AI-generated evaluation, not financial advice)."
  },
  {
    company: "Apple",
    recommendation: "Invest",
    scores: {
      marketPosition: 18,
      growthPotential: 14,
      financialHealth: 19,
      newsSentiment: 11,
      competitiveAdvantage: 13,
      riskExposure: 7, // moderate risk -> 7/10
      total: 78
    },
    overview: "Apple Inc. designs, produces, and markets premium consumer tech products, including iPhones, Mac computers, iPads, and wearables. Its ecosystem ecosystem lock-in supports a high-margin services segment, with growth driven by Apple Intelligence integration.",
    swot: {
      strengths: [
        "Unrivaled brand loyalty with a global active installation base of 2.2B+ devices.",
        "High-margin recurring revenue stream from App Store, iCloud, and Apple Pay.",
        "Massive free cash flow supporting massive share buybacks and dividends."
      ],
      weaknesses: [
        "iPhone sales represent over 50% of revenue, exposing product concentration risk.",
        "App Store ecosystem facing regulatory pressure on fee percentages.",
        "Longer hardware upgrade cycles as consumer devices reach maturity."
      ],
      opportunities: [
        "Apple Intelligence prompting a multi-year iPhone upgrade cycle.",
        "Expansion of health-monitoring integrations in wearable electronics.",
        "Scaling payment processing and financial services inside Apple Wallet."
      ],
      threats: [
        "Antitrust lawsuits filed by US DOJ and European regulatory authorities.",
        "Supply chain disruptions in geographic hubs across Southeast Asia.",
        "Slow customer adoption of Apple Intelligence features in international territories."
      ]
    },
    news: [
      {
        title: "Apple Intelligence rolls out in multiple European languages",
        summary: "Feature launches expand to several major European regions to boost overseas iPhone upgrades.",
        source: "TechCrunch",
        date: "January 2026"
      },
      {
        title: "Services division registers record quarterly revenue margins",
        summary: "App Store fee challenges are offset by high subscription growth across Music, Pay and Arcade.",
        source: "Financial Times",
        date: "Q4 2025"
      },
      {
        title: "DOJ antitrust case enters preliminary hearing phase",
        summary: "Legal arguments begin over whether Apple maintains a smartphone monopoly through ecosystem restrictions.",
        source: "Bloomberg Law",
        date: "Recent"
      }
    ],
    reasoning: "Apple is graded as an Invest. Its massive cash generation capabilities, pristine balance sheet, and sticky ecosystem provide an outstanding defensive floor. The rollout of Apple Intelligence is likely to trigger a hardware upgrade cycle, which, along with services growth, makes Apple a solid long-term compounder.",
    whyDecision: {
      scoreRationale: "The score is calculated at 78/100, driven by excellent financial health (19/20) and market position (18/20), with minor deductions for growth rates and antitrust risks.",
      recommendationRationale: "Invest recommendation is assigned as the score falls within the 60-79 threshold, representing a lower-risk compounding investment.",
      risksRationale: "Antitrust litigation is a threat to services margins, but Apple's strong user ecosystem makes severe customer churn unlikely."
    },
    buffettPerspective: "Apple is one of Warren Buffett's largest and most favored holdings. He views the iPhone not just as a technology product, but as an indispensable consumer utility. He loves Apple's immense ecosystem moat, its customer retention power (people would rather give up their cars than their iPhones), and its highly shareholder-friendly management that repurchases billions in shares. (AI-generated evaluation, not financial advice)."
  }
];
