<div align="center">

# 🚀 Abishek Raj's Developer Portfolio

**A modern, full-stack personal portfolio website built with React + TypeScript & Express.js**

[![Live Demo](https://img.shields.io/badge/🌐%20Live%20Demo-Visit%20Site-6366f1?style=for-the-badge)](https://abishekraj.tech)
[![GitHub](https://img.shields.io/badge/GitHub-AbishekRaj2007-181717?style=for-the-badge&logo=github)](https://github.com/AbishekRaj2007)
[![Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-000000?style=for-the-badge&logo=vercel)](https://vercel.com)

---

![React](https://img.shields.io/badge/React_18-20232A?style=flat-square&logo=react&logoColor=61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat-square&logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=flat-square&logo=vite&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js_5-000000?style=flat-square&logo=express&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=flat-square&logo=nodedotjs&logoColor=white)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-0055FF?style=flat-square&logo=framer&logoColor=white)

</div>

---

## 📋 Table of Contents

- [About](#-about)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Getting Started](#-getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Project Structure](#-project-structure)
- [Environment Variables](#-environment-variables)
- [API Routes](#-api-routes)
- [Deployment](#-deployment)
- [Featured Projects](#-featured-projects)
- [Contact](#-contact)

---

## 👋 About

This is a full-stack personal portfolio website designed to showcase my work as a developer. Built with **React 18 + TypeScript** on the frontend and **Express.js 5** on the backend, the site is blazing fast, fully animated, and deployed on **Vercel**.

The portfolio highlights my featured projects, work experience, achievements, and includes a fully functional contact form powered by **Resend** for email delivery.

> 🎯 **Live Demo:** [www.abishekraj.tech](https://abishekraj.tech)

---

## ✨ Features

- **Animated UI** – Smooth page transitions and scroll animations via Framer Motion
- **Fully Responsive** – Mobile-first design built with Tailwind CSS
- **Contact Form** – Functional email delivery using the Resend API
- **REST API Backend** – Express.js server serving portfolio data via structured endpoints
- **Type-Safe** – End-to-end TypeScript with Zod schema validation
- **Accessible Components** – Built with Radix UI primitives
- **Fast Builds** – Powered by Vite and ESBuild
- **Sections:** Hero · Projects · Experience · Achievements · Contact

---

## 🛠 Tech Stack

### Frontend
| Technology | Purpose |
|---|---|
| React 18 | UI framework |
| TypeScript | Type safety |
| Vite | Build tool & dev server |
| Tailwind CSS | Utility-first styling |
| Framer Motion | Animations & transitions |
| Radix UI | Accessible component primitives |
| TanStack Query | Server state management |
| Wouter | Lightweight client-side routing |
| Lucide React | Icon library |
| React Hook Form | Form state management |
| Zod | Schema validation |

### Backend
| Technology | Purpose |
|---|---|
| Express.js 5 | REST API server |
| Node.js | Runtime environment |
| MemStorage | In-memory data storage |
| Resend | Transactional email delivery |
| TSX | TypeScript execution |
| ESBuild | Production bundling |

---

## 🚀 Getting Started

### Prerequisites

Make sure you have the following installed on your machine:

- **Node.js** `v18+` — [Download here](https://nodejs.org/)
- **npm** `v9+` (comes with Node.js)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/AbishekRaj2007/your-portfolio-repo.git
   cd your-portfolio-repo
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   ```
   Then fill in the required values (see [Environment Variables](#-environment-variables)).

4. **Start the development server**
   ```bash
   npm run dev
   ```
   The app will be running at `http://localhost:5000`.

### Available Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start development server on port `5000` |
| `npm run build` | Build frontend + backend for production |
| `npm run start` | Run the production server |
| `npm run check` | TypeScript type checking |

---

## 📁 Project Structure

```
├── client/                   # Frontend (React + TypeScript)
│   ├── src/
│   │   ├── components/       # Reusable UI components
│   │   ├── pages/            # Page-level components
│   │   ├── hooks/            # Custom React hooks
│   │   ├── lib/              # Utility functions & API helpers
│   │   └── main.tsx          # App entry point
│   └── index.html
│
├── server/                   # Backend (Express.js)
│   ├── routes.ts             # API route definitions
│   ├── storage.ts            # MemStorage data layer
│   ├── index.ts              # Server entry point
│   └── vite.ts               # Vite dev middleware integration
│
├── shared/                   # Shared types & Zod schemas
│   └── schema.ts
│
├── vercel.json               # Vercel deployment configuration
├── vite.config.ts            # Vite configuration
├── tailwind.config.ts        # Tailwind CSS configuration
├── tsconfig.json             # TypeScript configuration
└── package.json
```

---

## 🔐 Environment Variables

Create a `.env` file in the root of the project and add the following:

```env
# Resend API key for contact form email delivery
# Get yours at https://resend.com
RESEND_API_KEY=your_resend_api_key_here
```

> ⚠️ Never commit your `.env` file. It is already included in `.gitignore`.

---

## 🔌 API Routes

The Express.js backend exposes the following REST endpoints:

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/projects` | Fetch all featured projects |
| `GET` | `/api/experiences` | Fetch all work experiences |
| `GET` | `/api/achievements` | Fetch all achievements |
| `POST` | `/api/messages` | Submit a contact form message |

---

## ☁️ Deployment

This project is deployed on **Vercel** with a custom `vercel.json` configuration that handles routing for both the frontend SPA and the Express.js backend API.

### Deploy Your Own

1. Fork this repository
2. Import the project into [Vercel](https://vercel.com/new)
3. Add your environment variable `RESEND_API_KEY` in the Vercel project settings
4. Deploy — Vercel will auto-detect the configuration from `vercel.json`

```json
// vercel.json (example structure)
{
  "builds": [...],
  "routes": [
    { "src": "/api/(.*)", "dest": "/server/index.ts" },
    { "src": "/(.*)", "dest": "/client/index.html" }
  ]
}
```

---

## 🌟 Featured Projects

### 🔗 [CertiChain](https://github.com/AbishekRaj2007)
> Blockchain-based certificate verification platform

A decentralized application for issuing and verifying academic/professional certificates on-chain, eliminating forgery.

**Stack:** `React` `Solidity` `Ethers.js` `Hardhat`

---

### 🤖 [RepoScribe](https://github.com/AbishekRaj2007)
> AI-powered GitHub README generator

Automatically generates professional README files for any GitHub repository using LLM-powered analysis.

**Stack:** `React` `Groq AI` `Python`

---

### 🚨 [ResQ-Desk](https://github.com/AbishekRaj2007)
> AI 911 call dispatcher

An intelligent emergency call routing system powered by AWS Bedrock that triages and dispatches emergency services in real-time.

**Stack:** `AWS Bedrock` `Node.js`

---

### 📰 [Fake News Detector](https://github.com/AbishekRaj2007)
> ML/NLP news classifier

A machine learning model that classifies news articles as real or fake using NLP techniques.

**Stack:** `Python` `Scikit-Learn` `Streamlit`

---

### 📱 [Post-Dost](https://github.com/AbishekRaj2007)
> AI social post generator for Indian small businesses

Helps small business owners generate culturally relevant, engaging social media content effortlessly.

**Stack:** `Next.js` `Gemini AI`

---

## 📬 Contact

Have a question, opportunity, or just want to say hi?

- **GitHub:** [@AbishekRaj2007](https://github.com/AbishekRaj2007)
- **Contact Form:** Available directly on the [portfolio site](https://your-portfolio.vercel.app)

---

<div align="center">

**Built with ❤️ by Abishek Raj**

⭐ If you found this helpful, consider giving it a star!

</div>
