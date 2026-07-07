import axios from 'axios';

const API_BASE = import.meta.env.VITE_API_URL || '';
axios.defaults.baseURL = API_BASE;

// Login User
export const loginUser = async (email, password) => {
  const response = await axios.post('/api/auth/login', { email, password });
  return response.data;
};

// Signup User
export const signupUser = async (email, password, name) => {
  const response = await axios.post('/api/auth/signup', { email, password, name });
  return response.data;
};

// Fetch Search History from database
export const fetchHistory = async (userId) => {
  const response = await axios.get('/api/history', {
    headers: { 'x-user-id': userId }
  });
  return response.data;
};

// Synchronous POST request
export const analyzeCompanySync = async (company, userId = null) => {
  const headers = userId ? { 'x-user-id': userId } : {};
  const response = await axios.post('/api/analyze', { company }, { headers });
  return response.data;
};

// Streaming request parsing JSON Lines
export const analyzeCompanyStream = async (company, { onStatus, onResult, onError, onComplete, userId = null }) => {
  try {
    let url = `${API_BASE}/api/analyze/stream?company=${encodeURIComponent(company)}`;
    if (userId) {
      url += `&userId=${encodeURIComponent(userId)}`;
    }
    
    const response = await fetch(url);
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
