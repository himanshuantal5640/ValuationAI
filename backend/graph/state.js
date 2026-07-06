import { Annotation } from "@langchain/langgraph";

export const AgentState = Annotation.Root({
  company: Annotation(),
  researchData: Annotation(),
  newsData: Annotation(),
  riskData: Annotation(),
  investmentData: Annotation(),
  decision: Annotation(),
  logs: Annotation({
    reducer: (x, y) => x.concat(y),
    default: () => [],
  }),
});
