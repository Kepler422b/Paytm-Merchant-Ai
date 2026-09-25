<div align="center">

# 🤖 Paytm AI Business Partner

### *Small Insights. Big Growth.*

**An AI assistant that turns every Paytm merchant's transactions into decisions.**

Built for **Paytm x AI — Build for India Hackathon, Mumbai**
Track: **Merchant Growth AI**

[![Team](https://img.shields.io/badge/Team-Banana-FFD400?style=for-the-badge)](https://github.com/Kepler422b/Paytm-Merchant-Ai)
[![Track](https://img.shields.io/badge/Track-Merchant%20Growth%20AI-1E6BFF?style=for-the-badge)]()
[![Status](https://img.shields.io/badge/Status-Hackathon%20Prototype-00BAF2?style=for-the-badge)]()
[![License](https://img.shields.io/badge/License-MIT-002E6E?style=for-the-badge)]()

[Live Demo](#) · [Report Bug](https://github.com/Kepler422b/Paytm-Merchant-Ai/issues) · [Request Feature](https://github.com/Kepler422b/Paytm-Merchant-Ai/issues)

</div>

---

## 📖 Table of Contents

- [About The Project](#-about-the-project)
- [The Problem](#-the-problem)
- [Our Solution](#-our-solution)
- [Screenshots](#-screenshots)
- [Core Features](#-core-features)
- [The Wow Flow](#-the-wow-flow-demo)
- [Tech Stack](#-tech-stack)
- [Architecture](#-architecture)
- [Getting Started](#-getting-started)
- [Project Structure](#-project-structure)
- [Roadmap](#-roadmap)
- [Impact](#-impact)
- [Team](#-team)
- [License](#-license)

---

## 🎯 About The Project

Millions of small merchants accept UPI payments every single day, but all they get back is a raw list of transactions. **Paytm AI Business Partner** turns that data into a personal business advisor — one that explains *why* sales moved, *predicts* what happens next, and *acts* on it by launching a ready-made campaign in a single click.

> "Every Paytm merchant deserves an AI business partner."

## 😟 The Problem

- 🤷 **Why did sales drop?** No visibility into which hours, products, or days are underperforming.
- 🎲 **When to run an offer?** Discounts are guesses with no idea of impact or cost.
- 💸 **Will cash run short?** No forecast of income, expenses, and balance ahead of time.

Big retailers have analysts. Kirana owners have guesswork. **We close that gap.**

## 💡 Our Solution

A single, continuous flow that goes from raw data to a live marketing campaign:

```
Transaction Data → AI Analysis → Problem Detected → Insight → Recommendation → Campaign
```

The product doesn't stop at showing numbers — it tells the merchant exactly what to do next, and does most of the work for them.

## 🖼️ Screenshots

<div align="center">

### Landing Page — Hero
<img src="assets/landing-hero.png" alt="Landing page hero section" width="850"/>

### Landing Page — Feature Grid
<img src="assets/landing-features.png" alt="Everything you need to grow feature grid" width="850"/>

### Merchant Dashboard
<img src="assets/dashboard-home.png" alt="Merchant business dashboard with demo flow" width="850"/>

### AI Insights
<img src="assets/ai-insights.png" alt="AI generated insights with recommendations" width="850"/>

### Smart Campaigns
<img src="assets/smart-campaigns.png" alt="AI generated WhatsApp and SMS campaigns" width="850"/>

</div>

## ✨ Core Features

| Feature | Description |
|---|---|
| 📊 **Business Dashboard** | Track sales, transactions and average bill value in real time |
| 🧠 **AI Insights** | Instant, plain-language explanations behind business trends |
| 📈 **Sales Prediction** | Know your next-day and next-week expected sales |
| 💰 **Cash-Flow Forecast** | See expected income, expenses and balance ahead of time |
| 🎯 **Growth Opportunities** | Identify weak time slots, underperforming products and hidden opportunities |
| 📢 **Smart Campaigns** | AI drafts the best offers plus ready-to-send WhatsApp/SMS copy |
| 💬 **Ask My Business** | Ask questions in plain English or Hinglish, get instant answers |
| ⭐ **Merchant Growth Score** | A simple 0–100 score that tracks overall business health |

## 🎬 The Wow Flow (Demo)

The heart of the prototype — a one-click journey from a real problem to a live solution:

1. **Sales dip detected** — Today's Sales down, red ▼ trend on the dashboard
2. **AI pinpoints the cause** — *"Sales are down 42%. Afternoon (2–5 PM) transactions dropped 42% vs your usual average."*
3. **Recommendation generated** — *"Boost Afternoon Sales"* with estimated impact **+₹2,400** and **82% confidence**
4. **One-click action** — Merchant hits **Take Action**, and the AI auto-drafts a WhatsApp + SMS campaign: *"Namaste! Aaj ka special: ₹20 OFF on orders above ₹199 (Valid 2–5 PM)."*
5. **Campaign goes live** — Status flips to **LIVE**, targeting *Past 30 Days Customers*, and the Growth Score updates

Try it yourself: open the dashboard, click **Start Demo**, and watch the whole flow play out — then hit **Reset Demo** to run it again.

## 🛠️ Tech Stack

**Frontend**
- React + TypeScript
- Tailwind CSS
- Recharts (charts & graphs)
- Framer Motion (animations)

**Backend**
- Node.js + Express
- Prisma ORM
- SQLite (dev) / PostgreSQL (prod)
- JWT authentication

**AI Layer**
- LLM API for insights, chat replies and campaign copy
- Rule-based fallback engine so the app works fully offline
- Hinglish-aware "Ask My Business" chat assistant

**Analytics Engine**
- Anomaly detection (deviation vs weekday/hour baseline)
- Seasonal sales forecasting
- Cash-flow projection model
- Growth score calculation

## 🏗️ Architecture

```
Paytm Transaction Data
        │
        ▼
   Database (Prisma)
        │
        ▼
  Analytics Engine  ──►  Anomaly Detection · Forecasting · Growth Score
        │
        ▼
     AI Layer  ──►  Insights · Chat · Campaign Copy
        │
        ▼
   Merchant UI (Dashboard)
```

## 🚀 Getting Started

### Prerequisites
- Node.js ≥ 18
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/Kepler422b/Paytm-Merchant-Ai.git
cd Paytm-Merchant-Ai

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env

# Seed the database with demo merchant data
npm run seed

# Start the app (client + server)
npm run dev
```

The app will be available at `http://localhost:5173` (frontend) and `http://localhost:3000` (backend API).

> 💡 No LLM API key? No problem — the app automatically falls back to a rule-based engine so every feature still works offline.

### Demo Login
Use the seeded demo merchant **"Sharma Kirana Store, Mumbai"** — phone number and OTP are provided in `.env.example` for local testing.

## 📁 Project Structure

```
Paytm-Merchant-Ai/
├── client/          # React + TypeScript frontend
├── server/          # Node.js + Express backend
│   ├── prisma/      # Database schema & seed script
│   └── src/
│       ├── routes/       # REST API endpoints
│       └── services/     # Analytics, forecasting & AI services
├── shared/          # Shared TypeScript types
└── README.md
```

## 🗺️ Roadmap

- [x] Business dashboard with live KPIs
- [x] AI-generated insights & recommendations
- [x] Auto-drafted WhatsApp/SMS campaigns
- [x] Merchant Growth Score
- [ ] Live WhatsApp/SMS sending integration
- [ ] Inventory-based recommendations
- [ ] Regional-language voice assistant
- [ ] Credit & loan matching for merchants

See the [open issues](https://github.com/Kepler422b/Paytm-Merchant-Ai/issues) for a full list of proposed features.

## 📈 Impact

| For Merchants | For Paytm | For Society |
|---|---|---|
| More sales in weak time slots | Higher merchant engagement & retention | Digital confidence for small businesses |
| Better cash-flow planning | More transaction volume | Wider access to business insights |
| Data-backed decisions, no analyst needed | New premium-tier revenue opportunity | Stronger local economies |

## 👥 Team

<div align="center">

### Team Banana 🍌

Built with ❤️ for the **Paytm x AI — Build for India Hackathon, Mumbai**

</div>

## 📄 License

Distributed under the MIT License. This is a hackathon prototype and is not affiliated with or endorsed by Paytm.

---

<div align="center">

**⭐ If you like this project, give it a star on GitHub! ⭐**

[github.com/Kepler422b/Paytm-Merchant-Ai](https://github.com/Kepler422b/Paytm-Merchant-Ai)

</div>
