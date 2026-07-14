# Hauslab — Interactive Interior Design

Plan rooms, place furniture, craft color palettes, and build mood boards. Designs sync to a **Postgres** database (Prisma) and deploy on **Vercel**.

## Stack

- Next.js 16 · React 19 · TypeScript · Tailwind CSS 4
- Prisma 7 + PostgreSQL (Prisma Postgres)
- Zustand (local device cache)
- Vercel hosting

## Features

- Room planner with drag-and-drop furniture
- **Cloud save** (Postgres) + local device saves
- Furniture catalog, color lab, mood boards, style quiz, gallery

## Local development

```bash
cp .env.example .env   # add DATABASE_URL
npm install
npx prisma db push
npm run dev
```

Open http://localhost:3000

## API

| Method | Path | Description |
|--------|------|-------------|
| GET/POST | `/api/projects` | List / save projects for this browser |
| GET/DELETE | `/api/projects/[id]` | Load / delete one project |
| GET/PUT | `/api/moodboards` | Load / save mood board |
| GET | `/api/health` | DB health check |

Owner identity uses an anonymous `hauslab_owner` cookie (no login required).

## Scripts

```bash
npm run dev
npm run build
npm run db:push
npm run db:studio
```
