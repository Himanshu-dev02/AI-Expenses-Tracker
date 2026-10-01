# 💰 AI Expenses Tracker

<div align="center">

[![Node.js](https://img.shields.io/badge/Node.js-v18+-green?style=flat-square&logo=node.js)](https://nodejs.org/)
[![React](https://img.shields.io/badge/React-19.2-blue?style=flat-square&logo=react)](https://react.dev/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-green?style=flat-square&logo=mongodb)](https://www.mongodb.com/)
[![Express](https://img.shields.io/badge/Express-v5.1-black?style=flat-square&logo=express)](https://expressjs.com/)
[![License](https://img.shields.io/badge/License-Private-red?style=flat-square)](#license)
[![Status](https://img.shields.io/badge/Status-Active-brightgreen?style=flat-square)](#)
[![Version](https://img.shields.io/badge/Version-1.0.0-blue?style=flat-square)](#)

**A full-stack expense tracker with AI-powered receipt scanning, next-month spending predictions, and a financial analytics dashboard.**

[Live Demo](https://ai-expenses-tracker-frontend-mgfb.onrender.com) • [API Endpoints](#-api-endpoints) • [Quick Start](#-quick-start)

</div>

---

## ✨ Highlights

- 🎯 **Smart Expense Management** — categorize, track, and update expenses and income
- 📊 **Interactive Dashboards** — charts and gauges built with Recharts
- 🧾 **AI Receipt Scanner** — Google Gemini vision extracts amount, merchant, category, and date from a photo, with confidence scoring and a local Tesseract OCR fallback if the AI call fails
- 🔮 **Spending Prediction** — Gemini-powered next-month, per-category forecast based on 6 months of MongoDB aggregated history
- 👤 **JWT Authentication** — bcrypt-hashed passwords, token-based sessions
- 📥 **Excel Export** — download transaction history via the `xlsx` library
- 💡 **Budget Alerts** — client-side comparison of predicted spend against a user-set threshold
- 🎨 **Responsive UI** — Tailwind CSS, Framer Motion

---

## 📋 Table of Contents

- [Key Features](#-key-features)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Quick Start](#-quick-start)
- [API Endpoints](#-api-endpoints)
- [Environment Variables](#-environment-variables)
- [Known Limitations](#-known-limitations--roadmap)
- [Contributing](#-contributing)
- [Author](#-author)

---

## 🎯 Key Features

### 💳 Transaction Management
- ✅ Create, read, update, and delete expenses & income
- ✅ Categorize transactions
- ✅ Date-range filtering (`/overview` endpoints)
- ✅ Required-field validation, client-side and server-side

### 📊 Analytics & Reporting
- ✅ Dashboard combining income + expense for a selected period
- ✅ Savings-rate and category-breakdown calculations
- ✅ Time-frame comparison (current vs previous period) via `useMemo`-derived stats
- ✅ Excel export per transaction type

### 🔐 User Management
- ✅ Registration and login with bcrypt password hashing
- ✅ JWT session tokens (24h expiry)
- ✅ Profile update and password change, both auth-protected

### 🧾 AI Features
- ✅ Receipt photo upload → Sharp image compression → Gemini vision extraction → optional auto-save as an expense
- ✅ Fallback to Tesseract.js + regex parsing if the Gemini call fails
- ✅ 6-month spending history aggregation (MongoDB pipeline) feeding a Gemini-generated next-month forecast per category, with trend, confidence, and a savings tip
- ✅ Budget threshold set and compared client-side against the predicted total (not yet persisted server-side — see [Known Limitations](#-known-limitations--roadmap))

---

## 🛠️ Tech Stack

### Backend
| Component | Technology |
|-----------|-----------|
| **Runtime** | Node.js 18+ |
| **Framework** | Express.js 5.1 |
| **Database** | MongoDB (Atlas) via Mongoose 8.16 |
| **Auth** | JWT 9.0 + bcryptjs 3.0 |
| **AI** | Google Gemini API (vision + text) |
| **Image processing** | Sharp |
| **File uploads** | Multer |
| **Reports** | xlsx |
| **Utilities** | CORS, dotenv, validator |

### Frontend
| Component | Technology |
|-----------|-----------|
| **Library** | React 19.2 |
| **Build Tool** | Vite 7.2 |
| **Styling** | Tailwind CSS 4.3 |
| **Routing** | React Router DOM 7.18 |
| **HTTP Client** | Axios 1.18 |
| **Charts** | Recharts 3.9 |
| **Icons** | Lucide React |
| **Animations** | Framer Motion 12.40 |
| **Notifications (UI toasts)** | React Toastify 11.1 |

---

## 📁 Project Structure

```
AI-Expenses-Tracker/
├── 📦 backend/
│   ├── 📄 server.js                         # Express app entry, mounts all routers
│   ├── 📂 config/
│   │   └── db.js                            # MongoDB connection
│   ├── 📂 controllers/
│   │   ├── dashboardController.js           # Combined income/expense summary
│   │   ├── expenseController.js             # Expense CRUD + Excel export
│   │   ├── incomeController.js              # Income CRUD + Excel export
│   │   ├── predictionController.js          # 6-month aggregation + Gemini forecast
│   │   ├── receiptController.js             # Gemini vision scan + Tesseract fallback
│   │   └── userController.js                # Register/login/profile
│   ├── 📂 middleware/
│   │   ├── auth.js                          # JWT verification
│   │   └── receiptUpload.js                 # Multer config (type/size limits)
│   ├── 📂 models/
│   │   ├── expenseModel.js
│   │   ├── incomeModel.js
│   │   └── userModel.js
│   ├── 📂 routes/
│   │   ├── dashboardRoutes.js
│   │   ├── expenseRoute.js
│   │   ├── incomeRoute.js
│   │   ├── predictionRoute.js
│   │   ├── receiptRoute.js
│   │   └── userRoute.js
│   └── 📂 utils/
│       └── dateFilter.js                    # Shared date-range helper
│
├── 🎨 frontend/
│   ├── 📄 vite.config.js
│   ├── 📂 src/
│   │   ├── App.jsx                          # Routing + auth bootstrap
│   │   ├── 📂 components/
│   │   │   ├── Add.jsx                      # Add transaction modal
│   │   │   ├── FinancialCard.jsx
│   │   │   ├── GaugeCard.jsx
│   │   │   ├── Login.jsx
│   │   │   ├── Navbar.jsx / Sidebar.jsx
│   │   │   ├── ReceiptScanner.jsx           # Upload + review extracted data
│   │   │   ├── SpendingPrediction.jsx       # Forecast chart + budget alert
│   │   │   ├── Signup.jsx
│   │   │   └── Transactionitem.jsx
│   │   ├── 📂 pages/
│   │   │   ├── Dashboard.jsx
│   │   │   ├── Expense.jsx
│   │   │   ├── Income.jsx
│   │   │   └── Profile.jsx
│   │   ├── 📂 assets/                       # Styles, icon maps
│   │   └── index.css
│   └── 📂 public/
│
└── 📄 README.md
```

---

## 🚀 Quick Start

### Prerequisites
- Node.js v18+
- npm
- MongoDB instance (local or [MongoDB Atlas](https://www.mongodb.com/cloud/atlas))
- A [Google Gemini API key](https://ai.google.dev/) for receipt scanning and predictions

### 1. Clone the repository
```bash
git clone https://github.com/Himanshu-dev02/AI-Expenses-Tracker.git
cd AI-Expenses-Tracker
```

### 2. Backend setup
```bash
cd backend
npm install
```

Create a `.env` file in `backend/` (see [Environment Variables](#-environment-variables)), then:
```bash
npm start
```
✅ Backend runs at `http://localhost:4000`

### 3. Frontend setup
```bash
cd frontend
npm install
npm run dev
```
✅ Frontend runs at `http://localhost:5173`

---

## 📡 API Endpoints

All routes except register/login require an `Authorization: Bearer <token>` header.

### Auth — `/api/user`
```http
POST   /api/user/register            # Create account
POST   /api/user/login               # Get JWT
GET    /api/user/me                  # Current user
PUT    /api/user/profile             # Update name/email
PUT    /api/user/password            # Change password
```

### Expenses — `/api/expense`
```http
POST   /api/expense/add
GET    /api/expense/get
GET    /api/expense/overview         # Date-ranged totals
GET    /api/expense/downloadexcel
PUT    /api/expense/update/:id
DELETE /api/expense/delete/:id
```

### Income — `/api/income`
```http
POST   /api/income/add
GET    /api/income/get
GET    /api/income/overview
GET    /api/income/downloadexcel
PUT    /api/income/update/:id
DELETE /api/income/delete/:id
```

### Dashboard — `/api/dashboard`
```http
GET    /api/dashboard/               # Combined summary for a period
```

### Receipt — `/api/receipt`
```http
POST   /api/receipt/scan             # multipart "receipt" field; ?save=true to auto-save
```

### Prediction — `/api/prediction`
```http
GET    /api/prediction/spending      # Raw 6-month aggregated history
GET    /api/prediction/next-month    # Gemini-generated forecast
```

---

## ⚙️ Environment Variables

**`backend/.env`**
```env
PORT=4000
MONGODB_URI=mongodb+srv://<user>:<password>@cluster.mongodb.net/expenses-tracker
JWT_SECRET=replace_with_a_long_random_value
GEMINI_API_KEY=your_gemini_api_key
NODE_ENV=development
```

> ⚠️ **Note:** the current codebase has `JWT_SECRET` and `TOKEN_EXPIRY` hardcoded directly in `userController.js`/`auth.js` rather than read from `process.env`. Wiring these to the `.env` value above is a pending fix — don't rely on the `.env` value alone until that's done.

**`frontend/.env`** *(not yet wired into the code — the API base URL is currently hardcoded per-file; see Known Limitations)*
```env
VITE_API_BASE_URL=http://localhost:4000/api
```

---

## 🔒 Known Limitations & Roadmap

Being upfront about the current state rather than overstating it:

- [ ] `JWT_SECRET` is hardcoded in source instead of loaded from `.env` — needs to move to `process.env.JWT_SECRET`
- [ ] Delete endpoints (`expense`/`income`) don't verify the record belongs to the requesting user — needs the same ownership filter already used in `update`
- [ ] No pagination on list endpoints (`/get`) — fine at small scale, needs `limit`/`skip` before real growth
- [ ] `API_BASE_URL` is duplicated as a hardcoded string across several frontend files instead of a single configured Axios instance
- [ ] Budget threshold is stored in `localStorage`, not persisted per-user on the backend, so it doesn't follow the user across devices
- [ ] No rate limiting on auth routes or the Gemini-backed endpoints
- [ ] No automated tests yet

Planned next: fix the two security items above first, then centralize the frontend API client, then add pagination and rate limiting.

---

## 🤝 Contributing

1. Fork the repo
2. `git checkout -b feature/your-feature`
3. Commit with a conventional prefix (`feat:`, `fix:`, `docs:`, `refactor:`)
4. Push and open a Pull Request with a clear description

---

## 👨‍💻 Author

**Himanshu Meshram**
- Portfolio: [himanshumeshram.netlify.app](https://himanshumeshram.netlify.app/)
- LinkedIn: [linkedin.com/in/himanshu-meshram-hm](https://www.linkedin.com/in/himanshu-meshram-hm)
- Email: meshramhimanshu20@gmail.com

---

<div align="center">

**Made with ❤️ by Himanshu Meshram**

[⬆ Back to top](#-ai-expenses-tracker)

</div>
