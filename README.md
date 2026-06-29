# AI Expenses Tracker

A full-stack web application for tracking personal expenses and income with an intuitive dashboard, user authentication, and financial analytics.

## Project Overview

The AI Expenses Tracker is built with a modern tech stack featuring a Node.js/Express backend and a React frontend with Vite. It provides users with comprehensive expense tracking, income management, and visual financial dashboards.

---

## Project Structure

```
AI-Expenses-Tracker/
├── backend/                          # Node.js/Express API Server
│   ├── package.json                  # Backend dependencies
│   ├── server.js                     # Main server entry point
│   ├── config/
│   │   └── db.js                     # Database configuration (MongoDB)
│   ├── controllers/                  # Business logic handlers
│   │   ├── dashboardController.js    # Dashboard data aggregation
│   │   ├── expenseController.js      # Expense CRUD operations
│   │   ├── incomeController.js       # Income CRUD operations
│   │   └── userController.js         # User authentication & profile
│   ├── middleware/
│   │   └── auth.js                   # JWT authentication middleware
│   ├── models/                       # Mongoose database schemas
│   │   ├── expenseModel.js           # Expense schema & validations
│   │   ├── incomeModel.js            # Income schema & validations
│   │   └── userModel.js              # User schema with password hashing
│   ├── routes/                       # API endpoint definitions
│   │   ├── dashboardRoutes.js        # GET /api/dashboard/*
│   │   ├── expenseRoute.js           # GET/POST/PUT/DELETE /api/expense/*
│   │   ├── incomeRoute.js            # GET/POST/PUT/DELETE /api/income/*
│   │   └── userRoute.js              # POST /api/auth/*, GET/PUT /api/user/*
│   └── utils/
│       └── dateFilter.js             # Date filtering utilities
│
├── frontend/                         # React + Vite Application
│   ├── package.json                  # Frontend dependencies
│   ├── vite.config.js                # Vite build configuration
│   ├── eslint.config.js              # ESLint rules
│   ├── index.html                    # HTML entry point
│   ├── public/                       # Static assets (favicon, etc.)
│   └── src/
│       ├── main.jsx                  # React app entry point
│       ├── App.jsx                   # Main app component with routing
│       ├── index.css                 # Global styles
│       ├── assets/                   # App resources
│       │   ├── color.jsx             # Color theme definitions
│       │   ├── dummy.js              # Mock data for development
│       │   └── dummyStyles.js        # Component styling objects
│       ├── components/               # Reusable React components
│       │   ├── Add.jsx               # Add expense/income modal
│       │   ├── FinancialCard.jsx     # Financial summary cards
│       │   ├── GaugeCard.jsx         # Gauge chart component
│       │   ├── Helpers.jsx           # Helper functions & utilities
│       │   ├── Layout.jsx            # Main layout wrapper
│       │   ├── Login.jsx             # Login page component
│       │   ├── Navbar.jsx            # Navigation bar
│       │   ├── Sidebar.jsx           # Sidebar navigation
│       │   ├── Signup.jsx            # Registration page component
│       │   ├── TimeFrame.jsx         # Date range selector
│       │   └── Transactionitem.jsx   # Transaction list item
│       ├── pages/                    # Full-page components
│       │   ├── Dashboard.jsx         # Main dashboard view
│       │   ├── Expense.jsx           # Expense management page
│       │   ├── Income.jsx            # Income management page
│       │   └── Profile.jsx           # User profile & settings
│       └── utils/
│           └── exportUtils.js        # Excel export functionality
│
└── README.md                         # Project documentation
```

---

## Technology Stack

### Backend
- **Runtime**: Node.js (v18+)
- **Framework**: Express.js v5.1
- **Database**: MongoDB (with Mongoose v8.16)
- **Authentication**: JWT (jsonwebtoken v9.0)
- **Security**: Bcrypt (bcryptjs v3.0)
- **Utilities**: CORS, dotenv, validator, XLSX

### Frontend
- **Library**: React 19.2
- **Build Tool**: Vite 7.2
- **Styling**: Tailwind CSS 4.3 + Tailwind Vite Plugin
- **Routing**: React Router DOM 7.18
- **HTTP Client**: Axios 1.18
- **UI Components**: Lucide React (icons), React Modal
- **Data Visualization**: Recharts 3.9
- **Notifications**: React Toastify 11.1
- **Animation**: Framer Motion 12.40
- **Export**: XLSX (Excel files)
- **Linting**: ESLint 9.39

---

## Installation & Setup

### Prerequisites
- Node.js v18.0 or higher
- npm or yarn package manager
- MongoDB instance running (local or cloud)

### Backend Setup

1. **Navigate to backend directory**
   ```bash
   cd backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Create `.env` file** in the backend root:
   ```env
   PORT=4000
   MONGODB_URI=mongodb://localhost:27017/expenses-tracker
   JWT_SECRET=your_secret_key_here
   NODE_ENV=development
   ```

4. **Start the server**
   ```bash
   npm run dev          # Development with file watching
   npm start            # Production
   ```

   Server runs at `http://localhost:4000`

### Frontend Setup

1. **Navigate to frontend directory**
   ```bash
   cd frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

   Frontend runs at `http://localhost:5173` (or next available port)

4. **Build for production**
   ```bash
   npm run build
   ```

---

## Key Features

### Authentication
- User registration and login with JWT tokens
- Secure password hashing with bcrypt
- Password change functionality
- Session management

### Expense & Income Management
- Add, edit, and delete transactions
- Categorize expenses and income
- Date-based filtering
- Real-time updates

### Dashboard
- Financial overview with summary cards
- Expense vs Income charts
- Gauge charts for spending metrics
- Time-frame selection (Daily/Weekly/Monthly/Yearly)

### User Profile
- View and edit personal information
- Change password securely
- Logout functionality

### Export
- Export transaction data to Excel (XLSX format)
- Customizable export options

---

## API Endpoints

### Authentication
- `POST /api/user/signup` - Register new user
- `POST /api/user/login` - User login
- `GET /api/user/me` - Get current user (requires auth)
- `PUT /api/user/profile` - Update user profile (requires auth)
- `PUT /api/user/password` - Change password (requires auth)

### Expenses
- `GET /api/expense` - List all expenses (with filters)
- `POST /api/expense` - Create new expense
- `PUT /api/expense/:id` - Update expense
- `DELETE /api/expense/:id` - Delete expense

### Income
- `GET /api/income` - List all income entries
- `POST /api/income` - Create new income
- `PUT /api/income/:id` - Update income
- `DELETE /api/income/:id` - Delete income

### Dashboard
- `GET /api/dashboard/summary` - Get financial summary
- `GET /api/dashboard/analytics` - Get analytics data

---

## Common Issues & Solutions

### Frontend Not Running

**Issue**: Port 5173 already in use or Vite not starting
```bash
# Solution: Specify a different port
npm run dev -- --port 3000
```

**Issue**: Dependencies not installed
```bash
# Solution: Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

### Backend Connection Issues

**Issue**: Cannot connect to MongoDB
- Ensure MongoDB is running: `mongod`
- Check MONGODB_URI in .env file
- Verify connection string format

**Issue**: CORS errors in browser console
- Backend should have CORS enabled in server.js
- Ensure frontend and backend URLs match in API calls

**Issue**: 401 Unauthorized errors
- Check JWT token is saved in localStorage
- Verify token hasn't expired
- Clear localStorage and re-login

---

## Development Workflow

1. **Start Backend** (Terminal 1):
   ```bash
   cd backend
   npm run dev
   ```

2. **Start Frontend** (Terminal 2):
   ```bash
   cd frontend
   npm run dev
   ```

3. **Make Changes**:
   - Frontend changes auto-reload via Vite HMR
   - Backend changes auto-reload with Node watch mode

4. **Testing**:
   - Test API endpoints with Postman/Insomnia
   - Check browser console for frontend errors
   - Monitor backend terminal for API logs

---

## Environment Variables

### Backend `.env`
```env
PORT=4000
MONGODB_URI=mongodb://localhost:27017/expenses-tracker
JWT_SECRET=your_jwt_secret_key
JWT_EXPIRE=7d
NODE_ENV=development
```

### Frontend Configuration
API base URL is set in component files (typically `http://localhost:4000/api`)

---

## Scripts Reference

### Backend
| Command | Description |
|---------|-------------|
| `npm start` | Run production server |
| `npm run dev` | Run development server with file watching |

### Frontend
| Command | Description |
|---------|-------------|
| `npm run dev` | Start Vite dev server with HMR |
| `npm run build` | Build optimized production bundle |
| `npm run preview` | Preview production build locally |
| `npm run lint` | Run ESLint checks |

---

## Contributing

1. Create a feature branch: `git checkout -b feature/your-feature`
2. Make your changes
3. Commit: `git commit -m "Add your feature"`
4. Push: `git push origin feature/your-feature`
5. Open a Pull Request

---

## License

This project is private and not licensed for public use.

---

## Support & Questions

For issues or questions, please check:
- Backend logs in terminal
- Browser console (F12) for frontend errors
- Network tab for API request/response debugging

---

**Last Updated**: 2026-06-28
**Version**: 1.0.0
 
 
