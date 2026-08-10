# Shree's Journey (v4.0) — Interactive Tribute Website

A 3D cinematic interactive web experience honoring Shree's 5 Million celebration milestone.

---

## 🔒 Security Audit & Secret Safety Pass

> [!WARNING]
> **Secret Rotation Warning**: If any API keys, credentials, or tokens were previously committed to Git history in earlier versions, **rotate those secrets immediately** in your service provider dashboard (e.g., Supabase, Vercel, AWS). Old values remain in Git commit history even after being untracked.

### Environment Setup

1. Copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```

2. Fill in your environment credentials:
   ```env
   VITE_SUPABASE_URL=https://your-project-id.supabase.co
   VITE_SUPABASE_ANON_KEY=your-supabase-anon-key-here
   ```

3. Ensure `.env` is **never committed** to Git (enforced in `.gitignore`).

---

## 🚀 Local Development

```bash
# Install dependencies
npm install

# Start local dev server
npm run dev

# TypeScript type check
npx tsc --noEmit

# Production build
npm run build
```
