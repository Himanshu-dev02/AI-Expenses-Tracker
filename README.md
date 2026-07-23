# 💰 AI Expenses Tracker

<div align="center">

[![Node.js](https://img.shields.io/badge/Node.js-v18+-green?style=flat-square&logo=node.js)](https://nodejs.org/)
[![React](https://img.shields.io/badge/React-19.2-blue?style=flat-square&logo=react)](https://react.dev/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-green?style=flat-square&logo=mongodb)](https://www.mongodb.com/)
[![Express](https://img.shields.io/badge/Express-v5.1-black?style=flat-square&logo=express)](https://expressjs.com/)
[![License](https://img.shields.io/badge/License-Private-red?style=flat-square)](#license)
[![Status](https://img.shields.io/badge/Status-Active-brightgreen?style=flat-square)](#)
[![Version](https://img.shields.io/badge/Version-1.0.0-blue?style=flat-square)](#)

**A powerful, full-stack web application for intelligent expense tracking with real-time analytics, receipt scanning, and comprehensive financial dashboards.**

[Live Demo](#) • [Documentation](#documentation) • [Getting Started](#-quick-start) • [Contributing](#-contributing)

</div>

---

## ✨ Highlights

- 🎯 **Smart Expense Management** - Categorize, track, and analyze expenses in real-time
- 📊 **Interactive Dashboards** - Beautiful charts and gauges for financial insights
- 🧾 **Receipt Scanner** - OCR-powered receipt scanning and automatic data extraction
- 👤 **Secure Authentication** - JWT-based authentication with bcrypt password hashing
- 📈 **Advanced Analytics** - Time-series analysis with daily/weekly/monthly/yearly views
- 📥 **Excel Export** - Download transaction data for further analysis
- 🎨 **Responsive Design** - Mobile-friendly UI with Tailwind CSS
- ⚡ **Real-time Updates** - Instant synchronization across all dashboard metrics

---

## 📋 Table of Contents

- [Features](#-key-features)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Quick Start](#-quick-start)
- [Installation](#-installation--setup)
- [API Documentation](#-api-endpoints)
- [Configuration](#-environment-variables)
- [Development](#-development-workflow)
- [Screenshots](#-screenshots)
- [Contributing](#-contributing)
- [Support](#-support)

---

## 🎯 Key Features

### 💳 Transaction Management
- ✅ Create, read, update, and delete expenses & income
- ✅ Categorize transactions with custom tags
- ✅ Date-based filtering and sorting
- ✅ Real-time transaction validation

### 📊 Analytics & Reporting
- ✅ Comprehensive financial dashboard
- ✅ Expense vs Income comparison charts
- ✅ Spending gauge charts with targets
- ✅ Time-frame selection (Daily/Weekly/Monthly/Yearly)
- ✅ Category-wise expense breakdown
- ✅ Summary cards for quick insights

### 🔐 User Management
- ✅ Secure registration and login
- ✅ JWT token-based session management
- ✅ Profile management
- ✅ Secure password change functionality
- ✅ Password hashing with bcrypt

### 🧾 Advanced Features
- ✅ Receipt scanning with OCR
- ✅ Automatic data extraction from receipts
- ✅ Excel export functionality
- ✅ Budget tracking
- ✅ Spending notifications

---

## 🛠️ Tech Stack

### Backend
<div align="center">

| Component | Technology | Version |
|-----------|-----------|---------|
| **Runtime** | Node.js | 18+ |
| **Framework** | Express.js | 5.1 |
| **Database** | MongoDB | Latest |
| **ORM** | Mongoose | 8.16 |
| **Authentication** | JWT | 9.0 |
| **Security** | Bcryptjs | 3.0 |
| **Utilities** | CORS, dotenv, validator, XLSX | Latest |

</div>

### Frontend
<div align="center">

| Component | Technology | Version |
|-----------|-----------|---------|
| **Library** | React | 19.2 |
| **Build Tool** | Vite | 7.2 |
| **Styling** | Tailwind CSS | 4.3 |
| **Routing** | React Router DOM | 7.18 |
| **HTTP Client** | Axios | 1.18 |
| **Charts** | Recharts | 3.9 |
| **Icons** | Lucide React | Latest |
| **Animations** | Framer Motion | 12.40 |
| **Notifications** | React Toastify | 11.1 |
| **Linting** | ESLint | 9.39 |

</div>

---

## 📁 Project Structure

```
AI-Expenses-Tracker/
├── 📦 backend/                              # Node.js/Express API Server
│   ├── 📄 server.js                         # Main server entry point
│   ├── 📂 config/
│   │   └── db.js                            # MongoDB configuration
│   ├── 📂 controllers/                      # Business logic handlers
│   │   ├── dashboardController.js           # Dashboard aggregation
│   │   ├── expenseController.js             # Expense CRUD
│   │   ├── incomeController.js              # Income CRUD
│   │   ├── receiptController.js             # Receipt scanning
│   │   └── userController.js                # Authentication
│   ├── 📂 middleware/
│   │   ├── auth.js                          # JWT middleware
│   │   └── receiptMiddleware.js             # Receipt handling
│   ├── 📂 models/                           # Mongoose schemas
│   │   ├── expenseModel.js
│   │   ├── incomeModel.js
│   │   └── userModel.js
│   ├── 📂 routes/                           # API endpoints
│   │   ├── dashboardRoutes.js
│   │   ├── expenseRoute.js
│   │   ├── incomeRoute.js
│   │   ├── userRoute.js
│   │   └── receiptRoute.js
│   └── 📂 utils/
│       └── dateFilter.js                    # Date utilities
│
├── 🎨 frontend/                             # React + Vite Application
│   ├── 📄 vite.config.js                    # Vite configuration
│   ├── 📄 index.html                        # HTML entry point
│   ├── 📂 src/
│   │   ├── App.jsx                          # Main component
│   │   ├── 📂 components/                   # Reusable components
│   │   │   ├── Add.jsx                      # Add transaction modal
│   │   │   ├── FinancialCard.jsx            # Summary cards
│   │   │   ├── GaugeCard.jsx                # Gauge charts
│   │   │   ├── Login.jsx                    # Login form
│   │   │   ├── Navbar.jsx                   # Navigation
│   │   │   ├── ReceiptScanner.jsx           # Receipt scanner
│   │   │   ├── Sidebar.jsx                  # Sidebar nav
│   │   │   ├── Signup.jsx                   # Registration
│   │   │   └── Transactionitem.jsx          # Transaction list
│   │   ├── 📂 pages/                        # Page components
│   │   │   ├── Dashboard.jsx
│   │   │   ├── Expense.jsx
│   │   │   ├── Income.jsx
│   │   │   └── Profile.jsx
│   │   ├── 📂 assets/                       # Themes & assets
│   │   ├── 📂 utils/                        # Helper functions
│   │   └── index.css                        # Global styles
│   └── 📂 public/                           # Static files
│
└── 📄 README.md                             # This file
```

---

## 🚀 Quick Start

### Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** v18.0 or higher ([Download](https://nodejs.org/))
- **npm** or **yarn** package manager
- **MongoDB** instance (local or [MongoDB Atlas](https://www.mongodb.com/cloud/atlas))

### Step 1: Clone the Repository

```bash
git clone https://github.com/yourusername/AI-Expenses-Tracker.git
cd AI-Expenses-Tracker
```

### Step 2: Backend Setup

```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Create .env file
cat > .env << EOF
PORT=4000
MONGODB_URI=mongodb://localhost:27017/expenses-tracker
JWT_SECRET=your_super_secret_jwt_key_here
JWT_EXPIRE=7d
NODE_ENV=development
EOF

 
```

✅ Backend running at `http://localhost:4000`

### Step 3: Frontend Setup

```bash
# Navigate to frontend directory (from project root)
cd frontend

# Install dependencies
npm install

# Start development server
npm run dev
```

✅ Frontend running at `http://localhost:5173`

 
---

## 📦 Installation & Setup

### Detailed Backend Setup

#### 1. Environment Configuration

Create a `.env` file in the `backend` directory:

```env
# Server Configuration
PORT=4000
NODE_ENV=development

# Database Configuration
MONGODB_URI=mongodb://localhost:27017/expenses-tracker
# OR for MongoDB Atlas:
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/expenses-tracker

# JWT Configuration
JWT_SECRET=your_jwt_secret_key_minimum_32_characters
JWT_EXPIRE=7d

# CORS Configuration (Optional)
CORS_ORIGIN=http://localhost:5173
```

 
 


---

## 📡 API Endpoints

### Authentication Endpoints

```http
POST   /api/user/signup              # Register new user
POST   /api/user/login               # User login
GET    /api/user/me                  # Get current user (⚠️ Auth required)
PUT    /api/user/profile             # Update profile (⚠️ Auth required)
PUT    /api/user/password            # Change password (⚠️ Auth required)
```

### Expense Endpoints

```http
GET    /api/expense                  # List expenses (⚠️ Auth required)
POST   /api/expense                  # Create expense (⚠️ Auth required)
PUT    /api/expense/:id              # Update expense (⚠️ Auth required)
DELETE /api/expense/:id              # Delete expense (⚠️ Auth required)
```

* 

### Income Endpoints

```http
GET    /api/income                   # List income entries (⚠️ Auth required)
POST   /api/income                   # Create income (⚠️ Auth required)
PUT    /api/income/:id               # Update income (⚠️ Auth required)
DELETE /api/income/:id               # Delete income (⚠️ Auth required)
```

### Dashboard Endpoints

```http
GET    /api/dashboard/summary        # Financial summary (⚠️ Auth required)
GET    /api/dashboard/analytics      # Analytics data (⚠️ Auth required)
GET    /api/dashboard/charts         # Chart data (⚠️ Auth required)
```

### Receipt Endpoints

```http
POST   /api/receipt/upload           # Upload & scan receipt (⚠️ Auth required)
GET    /api/receipt/:id              # Get receipt details (⚠️ Auth required)
DELETE /api/receipt/:id              # Delete receipt (⚠️ Auth required)
```

---
 

### Frontend Configuration

API endpoints are configured in component files or `.env`:

```env
VITE_API_BASE_URL=http://localhost:4000/api
VITE_APP_NAME=AI Expenses Tracker
```

 
 

### 2. Development Features

- ✅ **Hot Module Replacement (HMR)** - Frontend changes auto-reload
- ✅ **Nodemon** - Backend auto-restarts on file changes
- ✅ **Source Maps** - Easy debugging in browser DevTools
- ✅ **Vite** - Lightning-fast development server

 

 
 
---

## 🖼️ Screenshots

### Dashboard
```
[Beautiful dashboard with expense charts, income overview, and spending gauges]
```

### Expense Management
```
[Expense listing, categorization, and quick add interface]
```

### Receipt Scanner
```
[Receipt upload interface with automatic data extraction]
```

### Analytics
```
[Time-series charts and financial analytics]
```

 
 
 

 
 

 

 
 

### Authentication Flow

```
1. User submits credentials
   ↓
2. Validate against database
   ↓
3. Generate JWT token
   ↓
4. Send token to client
   ↓
5. Client stores in localStorage
   ↓
6. Include token in API requests
```
 
---

## 🤝 Contributing

We welcome contributions from the community! Here's how to get started:

### 1. Fork the Repository

Click the "Fork" button at the top right of this page.

### 2. Create a Feature Branch

```bash
git checkout -b feature/amazing-feature
```

### 3. Make Your Changes

- Follow existing code style
- Add comments for complex logic
- Update README if needed

### 4. Commit Your Changes

```bash
git add .
git commit -m "feat: add amazing feature"
```

Use conventional commits:
- `feat:` - New feature
- `fix:` - Bug fix
- `docs:` - Documentation
- `style:` - Code style changes
- `refactor:` - Code refactoring
- `test:` - Adding tests

### 5. Push to Your Fork

```bash
git push origin feature/amazing-feature
```

### 6. Open a Pull Request

- Provide clear description
- Link related issues
- Include screenshots if applicable

---

## 📝 Code Style

This project uses:
- **ESLint** for JavaScript linting
- **Prettier** for code formatting (recommended)

 

## 🔒 Security

### Best Practices

- ✅ Never commit `.env` files
- ✅ Use strong JWT secrets (minimum 32 characters)
- ✅ Hash passwords with bcrypt
- ✅ Validate all user inputs
- ✅ Use HTTPS in production
- ✅ Keep dependencies updated
- ✅ Implement rate limiting

 
 
 
---

## 👨‍💻 Author

**Himanshu Meshram**
- 🔗 Portfolio: [portfolio.com](https://himanshumeshram.netlify.app/)
- 💼 LinkedIn: [linkedin.com](www.linkedin.com/in/himanshu-meshram-hm)
- 📧 Email: [EMAIL_ADDRESS](meshramhimanshu20@gmail.com)

---

 

 
 

## 📊 Project Statistics

- 📦 **Dependencies**: 30+
- 📄 **Lines of Code**: 5000+
- 🧪 **Test Coverage**: Configurable
- ⭐ **Stars**: [Help us grow!](#)

---

 

## ⭐ Show Your Support

If you find this project helpful, please give it a star! It helps others discover the project and motivates development.

```
If this project helped you, please consider:
⭐ Starring this repository
🐦 Sharing with your network
📝 Writing a review
🤝 Contributing improvements
```

---

<div align="center">

**Made with ❤️ by [Himasnu Meshram]**

[⬆ Back to top](#-ai-expenses-tracker)

 

 

</div>
 
