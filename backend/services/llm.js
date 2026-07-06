import { ChatOpenAI } from "@langchain/openai";
import dotenv from "dotenv";

dotenv.config();

const openRouterApiKey = process.env.OPENROUTER_API_KEY;

export const getLLM = (temperature = 0.2) => {
  return new ChatOpenAI({
    openAIApiKey: openRouterApiKey || "dummy_key",
    modelName: "google/gemini-2.5-flash",
    temperature,
    maxTokens: 2048, // Limit maximum tokens to prevent 402 credit balance blocks
    configuration: {
      baseURL: "https://openrouter.ai/api/v1",
      defaultHeaders: {
        "HTTP-Referer": "http://localhost:3000",
        "X-Title": "AI Investment Research Agent",
      },
    },
  });
};
