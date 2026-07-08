import { ChatOpenAI } from "@langchain/openai";
import dotenv from "dotenv";

dotenv.config();

const geminiApiKey = process.env.GEMINI_API_KEY;
const openRouterApiKey = process.env.OPENROUTER_API_KEY || process.env.OPENAI_API_KEY;

export const getLLM = (temperature = 0.2) => {
  if (geminiApiKey) {
    // Direct Google Gemini API via OpenAI-compatible endpoint (100% Free on Google AI Studio)
    return new ChatOpenAI({
      apiKey: geminiApiKey,
      modelName: "gemini-2.5-flash",
      temperature,
      maxTokens: 2048,
      configuration: {
        baseURL: "https://generativelanguage.googleapis.com/v1beta/openai/",
      },
    });
  }

  // Fallback to OpenRouter (either free or paid versions depending on key)
  return new ChatOpenAI({
    apiKey: openRouterApiKey || "dummy_key",
    openAIApiKey: openRouterApiKey || "dummy_key",
    modelName: "google/gemini-2.5-flash:free",
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
