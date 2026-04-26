import axios from 'axios';

const WEBHOOK_URL = import.meta.env.VITE_WEBHOOK_URL || 'http://localhost:5678/webhook/fake-news';

export async function analyzeNews(text) {
  try {
    const response = await axios.post(WEBHOOK_URL, { news: text }, {
      headers: {
        'Content-Type': 'application/json'
      }
    });

    const data = response.data;
    const raw = Array.isArray(data) ? data[0] : data;
    
    if (!raw || typeof raw !== 'object') {
      throw new Error('Invalid data received from backend.');
    }

    return raw;
  } catch (error) {
    if (error.response) {
      throw new Error(`Server error — status ${error.response.status}`);
    } else if (error.request) {
      throw new Error('No response received from the server.');
    } else {
      throw new Error(error.message || 'Error configuring the analysis request.');
    }
  }
}
