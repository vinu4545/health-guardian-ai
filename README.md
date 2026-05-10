# 🩺 MediCare — AI Smart Health Guardian

> **Intelligent. Accessible. Life-saving.**
> MediCare is an AI-powered healthcare assistant that detects health risks early, prevents dangerous drug interactions, and puts smart medical guidance in everyone's hands — even before a doctor is available.

---

## 🚨 The Problem

Every day, people make health decisions without proper guidance:

| Risk | Impact |
|------|--------|
| ⚠️ Ignored early symptoms | Late disease detection |
| 💊 Unsafe self-medication | Harmful side effects |
| 🔄 Unknown drug interactions | Life-threatening combinations |
| ⏳ Delayed diagnosis | Worsened health outcomes |

**MediCare solves all of this — using AI.**

---

## ✨ Core Features

### 🤖 AI Symptom Analysis
Enter your symptoms and get instant AI-powered disease predictions using Machine Learning.

**Example:**
```
Symptoms:  Fever, Headache, Fatigue
AI Output: Viral Fever · Flu · Dengue Risk
```

---

### 💊 Drug Interaction Detection
Enter the medicines you're currently taking. MediCare cross-checks for dangerous combinations and alerts you before harm occurs.

```
⚠️  Warning: Combining Aspirin + Ibuprofen may increase
    the risk of stomach bleeding.
```

---

### 📊 Smart Health Dashboard
A clean, intuitive dashboard giving you full visibility into your health:

- 📈 Health insights & trends
- 🕓 Symptom analysis history
- 🔔 Medicine safety alerts
- 🎯 Risk level indicators
- 📥 Health report downloads

---

### 🤖 AI Health Chatbot (Copilot-style)
A floating assistant inspired by VS Code Copilot — always available, never intrusive.

- 💬 Sliding right-side chat panel
- 🧠 Interactive health guidance
- 🔍 Symptom explanations
- 🛠️ Usage assistance

---

### 📄 Smart Health Report Generation
After your analysis, download a full report containing:

- Predicted diseases & risk levels
- Drug interaction warnings
- Personalized health recommendations

---

## 🏗️ System Architecture

```
┌─────────────────────────────────────────────────────┐
│                     Frontend                        │
│         React · Vite · TypeScript · Tailwind        │
│                    shadcn/ui                         │
└────────────────────┬────────────────────────────────┘
                     │ HTTP / REST
        ┌────────────┴─────────────┐
        │                         │
┌───────▼────────┐      ┌─────────▼──────────┐
│  Backend       │      │  Copilot Backend    │
│  FastAPI       │      │  FastAPI (Chatbot)  │
│  Port 8001     │      │  Port 8000          │
└───────┬────────┘      └─────────┬──────────┘
        │                         │
┌───────▼─────────────────────────▼──────────┐
│               AI / ML Layer                │
│         Scikit-learn · Machine Learning    │
└───────────────────┬────────────────────────┘
                    │
┌───────────────────▼────────────────────────┐
│                 Database                   │
│          PostgreSQL / MongoDB              │
└────────────────────────────────────────────┘
```

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|------------|
| **Frontend** | React, Vite, TypeScript, Tailwind CSS, shadcn/ui |
| **Backend (Main)** | Python, FastAPI |
| **Backend (Copilot)** | Python, FastAPI |
| **AI / ML** | Scikit-learn, Machine Learning |
| **Database** | PostgreSQL / MongoDB |
| **Frontend Deploy** | Vercel / Netlify |
| **Backend Deploy** | Render / Railway |
| **DB Hosting** | Supabase / MongoDB Atlas |

---

## 🎨 Design System

| Element | Choice | Reason |
|---------|--------|--------|
| Primary Color | 🔵 Blue | Trust & Technology |
| Secondary Color | 🟢 Green | Healthcare & Safety |
| Accent | 🩵 Teal Gradient | AI Intelligence |
| Layout | Clean dashboard | Minimal & intuitive |
| Chatbot UI | Copilot-style | Familiar & productive |

---

## 🚀 Getting Started

### Prerequisites
Make sure you have the following installed:
- **Node.js** (v18+)
- **Python** (v3.9+)
- **pip**

---

### 1️⃣ Frontend

```bash
# Install dependencies
npm install

# Start the development server
npm run dev
```

> Runs at: `http://localhost:5173`

---

### 2️⃣ Main Backend (API)

```bash
cd Backend2

# Start the FastAPI server
uvicorn main:app --reload --port 8001
```

> Runs at: `http://localhost:8001`
> API Docs: `http://localhost:8001/docs`

---

### 3️⃣ Copilot Backend (Chatbot)

```bash
cd backend

# Start the Copilot FastAPI server
uvicorn app.main:app --reload
```

> Runs at: `http://localhost:8000`
> API Docs: `http://localhost:8000/docs`

---

### 🗂️ Project Structure

```
medicare/
├── backend/              # Copilot / Chatbot backend (port 8000)
│   └── app/
│       └── main.py
├── Backend2/             # Main API backend (port 8001)
│   └── main.py
├── src/                  # React frontend source
├── public/
├── package.json
└── README.md
```

---

## ☁️ Deployment

| Service | Platform |
|---------|----------|
| Frontend | Vercel / Netlify |
| Backend | Render / Railway |
| Database | Supabase / MongoDB Atlas |

---

## ⚠️ Disclaimer

MediCare is an AI-assisted tool designed to provide **preliminary health guidance only**.
It is **not a substitute** for professional medical advice, diagnosis, or treatment.
Always consult a qualified healthcare provider for medical decisions.

---

<div align="center">

**Built with ❤️ to make healthcare accessible for everyone.**

</div>
