import dotenv from "dotenv";

dotenv.config();

const tavilyApiKey = process.env.TAVILY_API_KEY;

export const searchTavily = async (query, searchDepth = "advanced") => {
  if (!tavilyApiKey) {
    console.warn("WARNING: TAVILY_API_KEY is not defined in the environment. Returning mock search warning.");
    return `[System Notice] Tavily search executed for query: "${query}". No Tavily API key is set, so real-time Web Search results are unavailable. Provide a TAVILY_API_KEY in the backend/.env file.`;
  }

  try {
    const response = await fetch("https://api.tavily.com/search", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        api_key: tavilyApiKey,
        query: query,
        search_depth: searchDepth,
        max_results: 5,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Tavily API status ${response.status}: ${errorText}`);
    }

    const data = await response.json();
    
    if (data.results && data.results.length > 0) {
      return data.results
        .map((r, i) => `[Result ${i+1}] Title: ${r.title}\nURL: ${r.url}\nContent: ${r.content}\n`)
        .join("\n---\n");
    }

    return "No search results found.";
  } catch (error) {
    console.error("Error fetching from Tavily:", error);
    return `Search query error: ${error.message}`;
  }
};
