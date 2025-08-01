# DeQuizifi Webapp

## 🧠 Overview

The DeQuizifi Webapp powers the user-facing core of DeQuizifi—a Farcaster-native DeFi quiz platform. With tokenized rewards, real-time quizzes, and community mechanics, it offers a clean, premium UX tailored to crypto-social learners and practitioners.

This repo includes the quiz engine, progress tracking, social interactions, and reward flows for the MVP.

---

## 🚀 Features

- Real-Time Quiz Engine  
  Offers multi-select and single-answer quizzes with partial credit scoring across difficulty tiers (News, Tokens, Code, DeFi‑Fundamentals), including animations and instant feedback.

- Social Learning & Rewards  
  Streak bonuses, badges, leaderboards, multiplayer challenges, and one-tap sharing of score cards.

- Token Rewards Workflow  
  WalletConnect-signed transfers after each quiz for earned tokens.

- Progress & Stats Dashboard  
  User profiles with performance summary, streak tracking, badge gallery, and progress insights.

- Developer & Content Tools  
  Quiz-session analytics and optional third-party API access for partners and creators.

---

## ⚙️ Getting Started

### Prerequisites

- Node.js 18.x or later  
- pnpm (or npmyarn)  
- `.env.local` file configured with
  - `DATABASE_URL` (PostgreSQL)
  - Credentials for token transfers (via WalletConnect)
  - Farcaster Auth credentials

### Install & Run Locally

```bash
git clone httpsgithub.comDeQuizifiapp.dequizifi.xyz
npm install
npm run dev
````

Visit [httplocalhost3000](httplocalhost3000) to explore the app locally.

### Build & Deploy

```bash
npm run build
npm run start
```

Changes pushed to `main` branch auto-deploy via Vercel.

---

## 🧪 Usage Guide

### Quiz Flow

1. User signs in via Farcaster Auth or wallet.
2. Selects a quiz category (e.g., News, Tokenomics).
3. Completes 5–10 questions per session.
4. Scores assigned based on accuracy, speed, partial credit, and streaks.
5. Badge rewards and token transfers issued instantly.
6. Players can challenge friends or share score cards via Farcaster.

### Profile & Social Elements

 View badge gallery, achievement history, and leaderboard ranking.
 Challenge friends directly within the Farcaster channel or app share features.
 Track streaks, daily plays, and cumulative stats.

### Developer Integration (Beta)

 Partners can request API access to fetch quiz data, scores, and stats.
 Embedded quizzes and scoreboard widgets possible via developer portal.

---

## Contributing

We welcome contributions to to help us improve! Please read our [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines on submitting issues, feature requests, and pull requests.

---

## 📬 Contact & Support

General Inquiries [team@dequizfi.xyz](mailtoteam@dequizfi.xyz)
For product demos, API access requests, or partnership proposals, please get in touch via email.

---

div align=center
  strongDeQuizFistrong — Where DeFi meets Game Night 🧠💸
div
