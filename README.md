# CREDIFY - Truth, Verified by AI 🕵️‍♂️🤖

A production-level AI Fake News Detector web application. CREDIFY is a clean, futuristic, high-end SaaS tool designed to analyze news headlines and articles using a hybrid AI decision engine.

![Credify Screenshot](https://via.placeholder.com/1200x600.png?text=Credify+Dashboard)

## 🚀 Features

- **Dark Premium UI**: Glassmorphism design with neon gradients and floating orb backgrounds.
- **Real-Time News Validation**: Post news headlines or full article content to your AI backend and get instant verdicts.
- **Comprehensive Dashboard**: Displays Confidence Score (Progress Bar), Credibility Score (Circular Recharts Gauge), Sentiment Analysis, and top related fact-checking sources.
- **AI Reasoning Panel**: Line-by-line breakdown explaining exactly why the AI reached its verdict.
- **Fact-Check Articles**: Hover-animated cards with verified source badges pointing to real credibility links.
- **Performance Optimized**: Skeleton loading UI, lazy-loaded images, and debounced input processing.
- **History Panel**: Stores your latest searches locally during the session.

## 🛠️ Tech Stack

- **Frontend Framework**: React 19 + Vite 8
- **Styling**: Tailwind CSS v4 + Custom Radix-style Components
- **Animations**: Framer Motion
- **Data Visualization**: Recharts
- **API Client**: Axios
- **Icons**: Lucide React

## 📦 Getting Started

### 1. Clone & Install Dependencies

```bash
git clone https://github.com/yourusername/credify.git
cd credify
npm install
```

### 2. Configure Environment Variables

Copy the example environment file and add your backend webhook URL:

```bash
cp .env.example .env
```

Ensure `.env` contains:
```env
VITE_WEBHOOK_URL=http://localhost:5678/webhook/fake-news
```

### 3. Run Development Server

```bash
npm run dev
```

Your app will be available at `http://localhost:5173`.

## 🔌 API Integration

CREDIFY expects the backend to accept a `POST` request with the following JSON body:

```json
{
  "news": "Your article text or headline here..."
}
```

Expected JSON response:

```json
{
  "news": "...",
  "verdict": "Real" | "Fake" | "Suspicious",
  "confidence": 95,
  "sentiment": "Negative",
  "intensity": "High",
  "credibility_score": 88,
  "reasons": [
    "High similarity with verified news outlets.",
    "Multiple contradicting statements found across verified sources."
  ],
  "top_articles": [
    {
      "title": "Article Title",
      "source": "Source Name",
      "link": "https://example.com",
      "image": "https://example.com/image.jpg"
    }
  ],
  "disclaimer": "⚠️ This is an AI-based prediction and may not be 100% accurate."
}
```

## 🌐 Deployment (Vercel)

This project is Vercel-ready. Simply import your repository into Vercel and set your environment variables:

1. **Framework Preset**: Vite
2. **Build Command**: `npm run build`
3. **Output Directory**: `dist`
4. Add `VITE_WEBHOOK_URL` in the Vercel Environment Variables settings.

A `vercel.json` file is already included to handle SPA routing.
