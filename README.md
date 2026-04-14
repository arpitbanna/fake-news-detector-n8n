# 🔍 AI Fake News Detector

An AI-powered web application that analyzes news articles and headlines for authenticity, credibility, and sentiment. Built with React and powered by an n8n AI backend workflow.

![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-8-646CFF?logo=vite&logoColor=white)
![License](https://img.shields.io/badge/License-MIT-green)

---

## ✨ Features

- **AI-Powered Analysis** — Detects fake news using AI models via an n8n backend workflow
- **Verdict & Confidence** — Clear REAL / FAKE verdict with a confidence percentage
- **Sentiment Analysis** — Identifies emotional tone and intensity of the article
- **Credibility Score** — Rates source credibility on a 0–10 scale
- **Detailed Explanations** — Provides categorized reasons for the verdict
- **Responsive Design** — Glassmorphic dark UI that works on all screen sizes
- **Error Handling** — Graceful error states with retry functionality

---

## 🛠️ Tech Stack

| Layer      | Technology           |
| ---------- | -------------------- |
| Frontend   | React 19, CSS Modules |
| Bundler    | Vite 8               |
| Backend    | n8n Webhook + AI     |
| Deployment | Vercel               |

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** ≥ 18
- **npm** ≥ 9
- An **n8n** instance with the fake-news analysis workflow running

### Installation

```bash
# Clone the repository
git clone https://github.com/<your-username>/fake-news-detector.git
cd fake-news-detector

# Install dependencies
npm install

# Create environment file
cp .env.example .env
```

### Configuration

Edit `.env` with your backend webhook URL:

```env
VITE_WEBHOOK_URL=http://localhost:5678/webhook-test/fake-news
```

> For production, replace with your deployed n8n webhook endpoint.

### Development

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Production Build

```bash
npm run build
npm run preview
```

---

## 🌐 Deploy to Vercel

1. Push this repo to GitHub
2. Go to [vercel.com/new](https://vercel.com/new) and import the repository
3. Set the **Root Directory** to `./` (or `fake-news-detector` if monorepo)
4. Add the environment variable:
   - `VITE_WEBHOOK_URL` → your production n8n webhook URL
5. Click **Deploy**

The included `vercel.json` handles SPA routing automatically.

---

## 📁 Project Structure

```
fake-news-detector/
├── public/
│   ├── favicon.svg
│   └── icons.svg
├── src/
│   ├── assets/
│   ├── components/
│   │   ├── ExplanationCard/
│   │   ├── Header/
│   │   ├── InputBox/
│   │   ├── Loader/
│   │   ├── MetricCard/
│   │   ├── ResultCard/
│   │   └── VerdictBanner/
│   ├── App.jsx
│   ├── App.module.css
│   ├── index.css
│   └── main.jsx
├── .env.example
├── .gitignore
├── index.html
├── package.json
├── vercel.json
└── vite.config.js
```

---

## 📄 Environment Variables

| Variable           | Description                        | Required |
| ------------------ | ---------------------------------- | -------- |
| `VITE_WEBHOOK_URL` | n8n webhook endpoint for analysis  | Yes      |

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📜 License

This project is licensed under the MIT License.

---

<p align="center">
  Built with ❤️ using React + Vite &bull; Powered by AI + n8n
</p>
