import axios from 'axios';

// Synchronous POST request
export const analyzeCompanySync = async (company) => {
  const response = await axios.post('/api/analyze', { company });
  return response.data;
};

// Streaming request parsing JSON Lines
export const analyzeCompanyStream = async (company, { onStatus, onResult, onError, onComplete }) => {
  try {
    const response = await fetch(`/api/analyze/stream?company=${encodeURIComponent(company)}`);
    if (!response.ok) {
      throw new Error(`Server returned error: ${response.status} ${response.statusText}`);
    }

    const reader = response.body.getReader();
    const decoder = new TextDecoder("utf-8");
    let buffer = "";

    while (true) {
      const { value, done } = await reader.read();
      if (done) {
        break;
      }

      buffer += decoder.decode(value, { stream: true });
      const lines = buffer.split("\n");
      
      // Save trailing incomplete line to buffer
      buffer = lines.pop() || "";

      for (const line of lines) {
        const trimmed = line.trim();
        if (!trimmed) continue;

        try {
          const chunk = JSON.parse(trimmed);
          if (chunk.type === "status") {
            onStatus({
              node: chunk.node,
              message: chunk.message
            });
          } else if (chunk.type === "result") {
            onResult(chunk.data);
          } else if (chunk.type === "error") {
            onError(new Error(chunk.error));
          } else if (chunk.type === "complete") {
            onComplete();
          }
        } catch (err) {
          console.warn("Could not parse line chunk:", trimmed, err);
        }
      }
    }
  } catch (error) {
    onError(error);
  }
};
