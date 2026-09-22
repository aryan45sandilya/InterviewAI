# InterviewAI

**AI-powered mock interview platform** — practice with voice, get scored, improve faster.

[![Next.js](https://img.shields.io/badge/Next.js-15-black?style=flat-square)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7-3178c6?style=flat-square)](https://www.typescriptlang.org/)
[![Vercel](https://img.shields.io/badge/Deployed_on-Vercel-black?style=flat-square)](https://vercel.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-orange?style=flat-square)](https://opensource.org/licenses/MIT)

---

## What it does

InterviewAI simulates real job interviews end-to-end. You answer questions by voice, the AI transcribes and scores your responses, tracks your emotion and confidence through the camera, and produces a detailed report when the session ends.

**Core capabilities:**

- **AI question generation** — Gemini 2.5 & GPT-4o generate role-specific questions based on your target job and difficulty
- **Voice answers** — speak your answers; OpenAI Whisper transcribes them in real time
- **Emotion & attention tracking** — confidence, eye contact, and focus scored per question
- **Live coding round** — Monaco Editor with multi-language support and Judge0 code execution
- **Resume-based interviews** — upload a PDF and questions are tailored to your experience
- **Performance reports** — per-question scores, radar chart, strengths/weaknesses, and an improvement plan
- **Analytics dashboard** — track score trends and interview history over time
- **Dark industrial UI** — amber accent, near-black surfaces, Plus Jakarta Sans — no gradient soup

---

## Tech stack

| Layer | Stack |
|---|---|
| Framework | Next.js 15 (App Router), React 19, TypeScript |
| Styling | Tailwind CSS, shadcn/ui, Radix UI |
| Auth | Clerk |
| Database | PostgreSQL (Neon) + Drizzle ORM |
| AI | Google Gemini 2.5, OpenAI GPT-4o, Whisper |
| Code execution | Judge0 API, Monaco Editor |
| Deployment | Vercel |

---

## Getting started

**Prerequisites:** Node.js 18+, a Neon (or any PostgreSQL) database, and API keys for Clerk, Google Gemini, and OpenAI.

```bash
git clone https://github.com/aryan45sandilya/AI-MOCK-INTERVIEW-PLATFORM.git
cd AI-MOCK-INTERVIEW-PLATFORM
npm install
cp .env.example .env.local   # fill in your keys
npm run db:push
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

---

## Environment variables

```env
# Database
DATABASE_URL=postgresql://user:password@host/database

# Clerk
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...
CLERK_WEBHOOK_SECRET=whsec_...
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/dashboard
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/dashboard

# AI
GOOGLE_GENERATIVE_AI_API_KEY=...
OPENAI_API_KEY=sk-...

# Code execution (optional)
RAPIDAPI_KEY=...

# App
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

---

## Project structure

```
app/
├── (auth)/                  # Sign-in, sign-up
├── (dashboard)/             # Protected routes
│   ├── dashboard/           # Home dashboard
│   ├── interviews/          # List, create, room, report
│   ├── analytics/           # Score trends
│   ├── resume/              # Resume upload & management
│   └── settings/            # User settings
├── api/                     # API routes
│   ├── interviews/
│   ├── answers/
│   ├── speech/
│   ├── emotion/
│   ├── code/
│   └── webhooks/
└── page.tsx                 # Landing page

components/
├── ui/                      # shadcn/ui primitives
├── interviews/              # Interview room, cards, countdown
├── dashboard/               # Stats, recent activity
├── analytics/               # Charts
└── reports/                 # Report view

lib/
├── ai/                      # Gemini + OpenAI clients
├── db/                      # Drizzle schema & queries
└── utils.ts
```

---

## Database

```bash
npm run db:push       # apply schema to database
npm run db:generate   # generate migration files
npm run db:studio     # open Drizzle Studio GUI
```

**Tables:** `users`, `interviews`, `questions`, `answers`, `emotion_records`, `resumes`, `interview_reports`

---

## Clerk webhook

1. Clerk Dashboard → **Webhooks** → add endpoint: `https://your-domain.com/api/webhooks/clerk`
2. Subscribe to: `user.created`, `user.updated`, `user.deleted`
3. Copy the signing secret → `CLERK_WEBHOOK_SECRET`

---

## Scripts

```bash
npm run dev           # development server
npm run build         # production build
npm run start         # production server
npm run lint          # ESLint
npm run db:push       # push schema
npm run db:studio     # Drizzle Studio
```

---

## Author

**Aryan Sandilya** — [github.com/aryan45sandilya](https://github.com/aryan45sandilya)
