# 🏭 Industry Intelligence Dashboard

A real-time intelligence dashboard for **Mining**, **Energy**, and **Data Centers** — built with Next.js 14, Tailwind CSS, OpenAI (GPT-4o-mini), and Supabase.

---

## 🗂 Architecture Overview

```
┌─────────────┐    every 6h     ┌─────────────────────┐
│ Vercel Cron │ ──────────────► │ GET /api/cron        │
└─────────────┘                 └──────────┬──────────┘
                                           │
                                           ▼
                                ┌─────────────────────┐
                                │ POST /api/ingest     │
                                │                      │
                                │ 1. Fetch RSS feeds   │
                                │ 2. Dedup vs DB       │
                                │ 3. OpenAI process    │
                                │ 4. Store articles    │
                                └──────────┬──────────┘
                                           │
                              ┌────────────┴───────────┐
                              │                        │
                        ┌─────▼──────┐         ┌──────▼─────┐
                        │  Supabase  │   OR     │ JSON file  │
                        │ (prod DB)  │         │(local dev) │
                        └─────┬──────┘         └──────┬─────┘
                              │                        │
                              └────────────┬───────────┘
                                           │
                                ┌──────────▼──────────┐
                                │ GET /api/articles   │
                                │ (with filters)      │
                                └──────────┬──────────┘
                                           │
                                ┌──────────▼──────────┐
                                │   Next.js UI         │
                                │  Dashboard.tsx       │
                                └─────────────────────┘
```

---

## 🚀 Quick Start

### 1. Install dependencies

```bash
cd industry-intelligence-dashboard
npm install
```

### 2. Configure environment variables

```bash
cp .env.example .env.local
```

Edit `.env.local`:

```env
# Required
OPENAI_API_KEY=sk-...

# Optional (uses JSON file if not set)
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_SERVICE_KEY=eyJ...

# Cron protection
CRON_SECRET=your-secret-token

# App URL
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### 3. (Optional) Set up Supabase

If you want persistent storage, run the migration in your Supabase SQL editor:

```bash
# Copy the contents of:
supabase/migrations/001_articles.sql
# and paste into Supabase > SQL Editor > Run
```

### 4. Run in development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

---

## 📡 Data Flow

### RSS Ingestion

The dashboard fetches from **28 RSS-enabled trusted sources** across 6 countries:

| Country | Institutional Sources | Press Sources |
|---------|----------------------|---------------|
| Chile | Cochilco, Sernageomin, Min. Energía, CNE, CEN | DF, La Tercera, Rev. Electricidad, BNamericas |
| Italy | Ministero Ambiente, Terna | Il Sole 24 Ore, Energia Oltre |
| Poland | Min. Climate, PSE | BiznesAlert, Warsaw BJ |
| Mexico | SENER, CFE | El Financiero, Energía Hoy |
| Spain | MITECO, Red Eléctrica | El País, Expansión |
| Global | IEA, World Bank | Reuters, Mining.com, DCD, TechCrunch |

### AI Processing (OpenAI GPT-4o-mini)

Each new article is processed to generate:
- **Category classification** (Mining / Energy / Data Centers)
- **Location detection** (Chile / Italy / Poland / Mexico / Spain / Global)
- **Extended description** (3-5 sentences, EN + ES)
- **Short summary** (3 bullets, EN + ES)
- **Title translation** (to Spanish)

---

## ⏰ Cron Job (Auto-ingestion every 6 hours)

### Vercel (Recommended)

Add to Vercel environment variables:
- `CRON_SECRET` — same value as in `.env.local`
- All other env vars

The `vercel.json` already configures the cron schedule:
```json
{
  "crons": [{ "path": "/api/cron", "schedule": "0 */6 * * *" }]
}
```

### Manual trigger

```bash
curl -X POST http://localhost:3000/api/ingest \
  -H "Authorization: Bearer your-secret-token"
```

---

## 🗃 Storage

### Option A: Supabase (Recommended for production)

Set `SUPABASE_URL` and `SUPABASE_SERVICE_KEY` in your environment. The app auto-detects and uses Supabase when configured.

### Option B: JSON file (Zero config, local dev)

If Supabase vars are not set, articles are stored in `data/articles.json`. This is ideal for local development and testing.

### Mock data

On first load, if the database/file is empty, the app displays **10 pre-built mock articles** covering all 3 categories, multiple locations, and both source types — so the UI is always populated.

---

## 🖥 UI Features

- **3-column layout**: Sidebar filters → Article feed → Summary panel
- **Left sidebar**: Category nav, location multi-select, source type toggle, per-source filter
- **Main feed**: Article cards with extended description and structured tags
- **Right panel**: AI summary bullets, aggregated metrics (category/location/source type), source breakdown
- **Language toggle**: EN ↔ ES — translates all UI labels, titles, summaries, and descriptions
- **Refresh button**: Re-fetches articles with current filters

---

## 📁 Project Structure

```
src/
├── app/
│   ├── api/
│   │   ├── articles/route.ts   # GET articles with filters
│   │   ├── ingest/route.ts     # POST trigger RSS + AI pipeline
│   │   └── cron/route.ts       # GET called by Vercel Cron
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   ├── Dashboard.tsx           # Main state orchestrator
│   ├── Header.tsx
│   ├── Sidebar.tsx
│   ├── MainFeed.tsx
│   ├── ArticleCard.tsx
│   ├── RightPanel.tsx
│   └── LoadingScreen.tsx
├── lib/
│   ├── sources.ts              # Trusted source definitions + RSS URLs
│   ├── rss.ts                  # RSS fetching and normalization
│   ├── openai.ts               # GPT-4o-mini processing pipeline
│   ├── storage.ts              # Supabase / JSON abstraction
│   ├── supabase.ts             # Supabase client singleton
│   └── mockData.ts             # 10 pre-built mock articles
└── types/
    └── article.ts              # TypeScript types
```

---

## 🔧 Customization

### Add a new trusted source

Edit `src/lib/sources.ts`:

```ts
{
  name: 'New Source Name',
  location: 'Chile',          // Chile | Italy | Poland | Mexico | Spain | Global
  source_type: 'Press',       // Institutional | Press
  rss: 'https://example.com/feed/',
  categories: ['Mining'],     // which categories this source covers
  lang: 'es',
}
```

### Change cron frequency

Edit `vercel.json`:
```json
{ "schedule": "0 */6 * * *" }  // every 6 hours
{ "schedule": "0 */12 * * *" } // every 12 hours
{ "schedule": "0 8 * * *" }    // daily at 8am UTC
```

---

## 🚢 Deploy to Vercel

```bash
npx vercel --prod
```

Set all environment variables in the Vercel dashboard, then the cron job runs automatically.
