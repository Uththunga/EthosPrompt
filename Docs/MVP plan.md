# 📦 Stage 1 MVP Plan – Prompt Engineering Platform

## 🎯 Goal

Deliver a fast, scalable, and low-cost MVP of the Prompt Engineering Platform where users can:

* Learn the basics of prompt engineering
* Access a categorized library of reusable prompts (free + paid)
* Pay a one-time \$299 for lifetime access
* Manage and preview prompts via a simple UI

---

## 🚀 Features to Deliver (MVP)

### ✅ User System

* Supabase Auth (email-based login/signup)
* Role/flag: `has_lifetime_access` boolean
* Profile page: basic info + access status

### ✅ Prompt Library

* Organized by: Industry → Use Case → Skill Level (Basic, Intermediate, Advanced)
* Filter by: Skill Level, Tags, Industry
* Prompt structure:

  * `title`, `role`, `goal`, `input`, `output_format`, `constraints`, `tags`
* Prompt access control:

  * `access_type`: `free` or `paid`
  * Locked view with CTA for non-paid users
* Prompt interaction:

  * View prompt card
  * Preview prompt with placeholders
  * Copy to clipboard
  * Favorite (optional)

### ✅ Learning Hub

* Static or MDX-based courses:

  * What is Prompt Engineering?
  * Prompt Basics for Beginners
* Modular learning UI (Basic → Intermediate → Advanced visual roadmap)

### ✅ Payments & Access

* Stripe checkout page (\$299 one-time)
* Webhook → update Supabase user metadata `has_lifetime_access = true`
* Payment confirmation + dashboard unlock

### ✅ Frontend UI

* Stack: Next.js + TailwindCSS + ShadCN UI
* Pages:

  * Home (Landing Page)
  * Prompt Library (filterable grid)
  * Prompt View & Editor
  * Course/Module Pages
  * Login/Register
  * Purchase Page (\$299 Lifetime)

---

## 🛠️ Technical Stack (Stage 1)

### 🔧 Frontend

* **Framework**: Next.js
* **Styling**: TailwindCSS + ShadCN UI
* **State**: React + Zustand

### 🗃️ Backend & Infra

* **Database**: Supabase (PostgreSQL)
* **Auth**: Supabase Auth (email/password)
* **Hosting**: Vercel (Frontend) + Supabase (Backend)
* **Payments**: Stripe Checkout (one-time plan)

### 📁 Prompt Storage

* Supabase table `prompts`
* Fields: `id`, `title`, `role`, `goal`, `input`, `output_format`, `constraints`, `tags`, `industry`, `use_case`, `skill_level`, `access_type`, `created_at`, `updated_at`

### ✅ Optional (If Time Permits)

* Prompt favorite/save feature
* Basic user progress tracking on course modules

---

## ⏱️ Timeline (Est. 30–45 days)

| Week | Focus                                                           |
| ---- | --------------------------------------------------------------- |
| 1    | UI design, setup Supabase, auth, database schema                |
| 2    | Prompt library page + filtering, add prompt viewer/editor       |
| 3    | Learning page (Markdown/MDX), Stripe integration, payment logic |
| 4    | Finish access control logic, polish UI, test flows              |
| 5    | Bug fixing, content upload, launch prep                         |

---

## 📌 Success Criteria

* All free prompts accessible without login
* Locked prompts show payment CTA
* Stripe payment updates user access in Supabase
* Users can log in, preview, and copy prompts
* Learning content loads correctly

---

## 📥 Next Steps

* [ ] Set up GitHub repo
* [ ] Initialize Next.js + Tailwind project
* [ ] Set up Supabase project + DB schema
* [ ] Design prompt schema (JSON & SQL)
* [ ] Write prompt import script
* [ ] Integrate Stripe for lifetime access
* [ ] Build UI components

---

✅ *Ready to Build: Clear, Scalable, and MVP-Ready!*
