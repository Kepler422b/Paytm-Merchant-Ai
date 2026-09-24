# Paytm AI Business Partner

An AI assistant for Paytm merchants that analyzes their transactions, predicts sales, finds growth opportunities and recommends actionable steps.

## Monorepo Architecture

- **`/client`**: React, Vite, TailwindCSS, Zustand, TanStack Query, Framer Motion, Recharts.
- **`/server`**: Node.js, Express, Prisma, Zod, JWT auth. (SQLite for dev, Postgres ready for prod).
- **`/shared`**: Shared TypeScript types and Zod DTOs.

## Quick Start (Development)

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Setup Environment**
   ```bash
   cp server/.env.example server/.env
   # Ensure DATABASE_URL is set to file:./dev.db
   ```

3. **Build Shared Package**
   ```bash
   npm run build -w shared
   ```

4. **Initialize Database**
   ```bash
   cd server
   npx prisma generate
   npx prisma db push
   npm run seed
   cd ..
   ```

5. **Run the App**
   ```bash
   npm run dev
   ```
   * Frontend will run at `http://localhost:5173`
   * Backend will run at `http://localhost:3001`

## Demo the Wow Flow in 60 Seconds

1. Go to `http://localhost:5173` and click **Get Started**.
2. Enter `9999999999` as the phone number.
3. Enter `123456` as the OTP.
4. Once in the dashboard, locate the **Demo Flow** box and click **Start Demo**.
5. Watch as the AI analyzes the data, detects a sudden drop in afternoon sales, slides in a recommendation, automatically generates a WhatsApp campaign, and launches it with confetti!

## Switching to PostgreSQL (Production)

To switch to PostgreSQL, simply edit `server/prisma/schema.prisma`:
```prisma
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}
```
Then use Docker Compose:
```bash
docker-compose up --build
```
