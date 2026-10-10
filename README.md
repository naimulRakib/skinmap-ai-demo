# 🌿 SkinMap AI (স্কিনম্যাপ এআই)

> **আপনার ত্বক বদলায়। আপনার যত্নও শিখুক।**  
> *(Your skin changes. Your care should learn too.)*

**SkinMap AI** is an intelligent, privacy-first skincare companion app designed for the Bengali-speaking demographic. It tracks your skin's progress over time, manages your routines, and provides smart insights based on daily check-ins and facial scans.

> **⚠️ Note to Investors & Reviewers:** This repository contains the interactive **Demo Prototype**. It includes a "Demo Mode" that injects synthetic data (scans, routines, check-ins) to showcase the full app experience without requiring real user data over time. All data is processed and stored locally on the device.

---

## ✨ Key Features

- 📸 **AI Skin Scanning:** Capture daily or weekly photos of your face. The AI analyzes specific regions (forehead, cheeks, chin, nose) to track improvements or irritations.
- 🧴 **Routine Management:** Organize your morning and evening skincare routines. Track your daily adherence and understand *why* each step is necessary.
- 📝 **Daily Check-ins:** Log daily symptoms, irritation levels, and environmental factors. Built-in alerts for dermatological "red flags".
- 📈 **Progress Tracking:** Side-by-side photo comparisons, adherence charts, and visual timelines to see if a routine is actually working.
- 🔒 **Privacy First:** No shady cloud uploads. Your face data and health logs stay strictly on your device. Easily export or delete your data anytime.
- 🇧🇩 **Fully Localized:** Built ground-up in Bengali (with `next-intl`) specifically tailored for the local market and climate.

---

## 🛠️ Technology Stack

- **Framework:** [Next.js](https://nextjs.org/) (App Router, React Server Components)
- **Styling:** [Tailwind CSS v4](https://tailwindcss.com/) (Custom UI/UX with glassmorphism, dynamic gradients, and fluid Bengali typography)
- **State Management:** [Zustand](https://github.com/pmndrs/zustand) (Persistent local storage adapters)
- **Localization:** [`next-intl`](https://next-intl-docs.vercel.app/)
- **Icons & UI:** `lucide-react`, `framer-motion`

---

## 🚀 Getting Started

### Prerequisites
Make sure you have [Node.js](https://nodejs.org/) installed (v18.17+ recommended).

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/naimulRakib/skinmap-ai-demo.git
   cd skinmap-ai
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run the development server (uses Turbopack for ultra-fast HMR):
   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser. The app defaults to the Bengali (`/bn`) locale.

---

## 🎭 Running the Demo (Investor Mode)

To experience the full capabilities of SkinMap AI without waiting weeks to generate real data:

1. Navigate to the onboarding screen: `http://localhost:3000/bn/onboarding`
2. Click the **"শুরু করুন (লোড ডেমো ডেটা)"** (Get Started - Load Demo Data) button.
3. The app will automatically seed the local database with **Persona A** (a mock user profile with pre-existing scans, routines, and check-in history) and redirect you to the main dashboard.

---

## 📱 Design Philosophy

- **Tap Targets:** All interactive elements are strictly built for mobile touch accessibility (min `48x48px`).
- **Typography:** Uses `Noto Sans Bengali` and `Hind Siliguri` to ensure beautiful, legible Bengali rendering without improper letter-spacing or transformations.
- **Aesthetics:** Navy and Teal primary palette, soft gradients, and minimal skeletal loading screens to create a premium, medical-yet-approachable feel.

---

## 📄 License
All rights reserved for the SkinMap AI prototype. Not for open-source distribution without permission.
