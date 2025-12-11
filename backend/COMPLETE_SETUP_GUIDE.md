# Employee Management System - Complete Setup Guide

## 📁 Project Structure

### Backend Folder Structure
```
Easy-Employee-API-master/
├── configs/
│   ├── db-config.js           # MongoDB connection configuration
│   └── mail-config.js         # Email configuration
├── controllers/
│   ├── auth-controller.js     # Authentication logic (login, logout, refresh)
│   ├── user-controller.js     # User management (CRUD, attendance, leaves, salary)
│   ├── team-controller.js     # Team management
│   └── leader-controller.js   # Leader-specific logic
├── dtos/
│   ├── user-dto.js            # User Data Transfer Object
│   ├── team-dto.js            # Team DTO
│   └── leader-dto.js          # Leader DTO
├── middlewares/
│   ├── auth-middleware.js     # JWT token verification
│   ├── error-middleware.js    # Global error handling
│   └── async-middleware.js    # Async function wrapper
├── models/
│   ├── user-model.js          # User schema
│   ├── team-model.js          # Team schema
│   ├── attendance-model.js    # Attendance schema
│   ├── leave-model.js         # Leave application schema
│   ├── token-model.js         # Refresh token schema
│   ├── otp-model.js           # OTP schema
│   └── user-salary.js         # Salary schema
├── routes/
│   ├── auth-route.js          # Auth endpoints
│   ├── admin-route.js         # Admin endpoints
│   ├── employee-route.js      # Employee endpoints
│   └── leader-route.js        # Leader endpoints
├── services/
│   ├── user-service.js        # User business logic
│   ├── team-service.js        # Team business logic
│   ├── attendance-service.js  # Attendance logic
│   ├── token-service.js       # Token generation & verification
│   ├── mail-service.js        # Email sending logic
│   ├── otp-service.js         # OTP generation & verification
│   └── file-upload-service.js # Image upload (Multer)
├── templates/
│   └── mail-template.js       # Email templates
├── utils/
│   └── error-handler.js       # Custom error handling
├── storage/
│   └── images/
│       ├── profile/           # User profile pictures
│       └── teams/             # Team images
├── dummy-data/                # Sample data files
│   ├── users.json
│   ├── teams.json
│   ├── attendance.json
│   ├── leaves.json
│   ├── otps.json
│   ├── tokens.json
│   └── userSalaries.json
├── .env                       # Environment variables
├── package.json               # Dependencies
├── server.js                  # Main entry point
└── README.md                  # Documentation
```

### Frontend Folder Structure
```
Easy-Employee-master/
├── public/
│   ├── index.html
│   ├── manifest.json
│   └── robots.txt
├── src/
│   ├── assets/
│   │   ├── css/
│   │   │   ├── bootstrap.min.css
│   │   │   ├── components.css
│   │   │   └── style.css
│   │   ├── js/
│   │   └── img/
│   ├── components/
│   │   ├── Admin/              # Admin panel components
│   │   ├── dashboard/          # Dashboard components
│   │   ├── Employees/          # Employee components
│   │   ├── forms/              # Form components
│   │   ├── modal/              # Modal components
│   │   ├── Navigation/         # Navigation components
│   │   ├── rows/               # Table row components
│   │   ├── DashboardEmployee.jsx
│   │   ├── DashboardLeader.jsx
│   │   ├── HeaderSection.jsx
│   │   ├── Loading.jsx
│   │   ├── navigation.jsx
│   │   └── sidebar.jsx
│   ├── hooks/
│   │   └── useAutoLogin.js     # Auto login logic
│   ├── http/
│   │   └── index.js            # API client (axios)
│   ├── pages/
│   │   ├── Home.jsx
│   │   ├── admin/              # Admin pages
│   │   ├── auth/               # Auth pages (login, forgot-password)
│   │   ├── employee/           # Employee pages
│   │   ├── leader/             # Leader pages
│   │   ├── leaderpage/
│   │   ├── team/               # Team pages
│   │   └── user/               # User pages
│   ├── store/
│   │   ├── auth-slice.js       # Authentication state
│   │   ├── main-slice.js       # Main state
│   │   ├── team-slice.js       # Team state
│   │   ├── user-slice.js       # User state
│   │   └── index.js            # Redux store config
│   ├── App.js                  # Main app component
│   ├── App.css
│   ├── index.js                # React entry point
│   ├── index.css
│   └── reportWebVitals.js
├── .env                        # Environment variables
├── package.json                # Dependencies
└── README.md                   # Documentation
```

---

## 🚀 Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (Local or Atlas)
- npm or yarn package manager

### Backend Setup

#### 1. Install Backend Dependencies
```bash
cd Easy-Employee-API-master
npm install
```

#### 2. Configure Environment Variables (.env)
```env
# Database
DB_URL=mongodb+srv://RACO:P2zbjmPN2Az80ai3@invertory.lhz7idi.mongodb.net/easy-employee?retryWrites=true&w=majority&appName=Invertory

# Server
PORT=5501
BASE_URL=http://localhost:5501
CLIENT_URL=http://localhost:3000

# JWT Tokens
ACCESS_TOKEN_SECRET_KEY=your_secret_key_here
REFRESH_TOKEN_SECRET_KEY=your_refresh_secret_here

# Email Configuration
SMTP_HOST=smtp.gmail.com
SMTP_PORT=465
SMTP_SECURE=false
SMTP_REQUIRE_TLS=true
SMTP_AUTH_USER=your_email@gmail.com
SMTP_AUTH_PASS=your_app_password

# System Config
TYPE_FORGOT_PASSWORD=2
WEBSITE_NAME=Easy Employee
BCRYPT_PASSWORD_SALT_FACTOR=10
```

#### 3. Create Admin User
```bash
node create-admin.js
```

#### 4. Start Backend Server
```bash
npm run dev
```

Server runs on: **http://localhost:5501**

---

### Frontend Setup

#### 1. Install Frontend Dependencies
```bash
cd Easy-Employee-master
npm install
```

#### 2. Configure Environment Variables (.env)
```env
REACT_APP_BASE_URL=http://localhost:5501
```

#### 3. Start Frontend Server
```bash
npm start
```

Frontend runs on: **http://localhost:3001** (or auto-assigned port)

---

## 🔐 Authentication Flow

```
1. User enters email/username and password
   ↓
2. Frontend sends POST /api/auth/login
   ↓
3. Backend validates credentials
   ↓
4. Backend generates JWT tokens (access + refresh)
   ↓
5. Tokens stored in httpOnly cookies
   ↓
6. User redirected to dashboard based on role
   ↓
7. All subsequent requests include tokens in headers
```

---

## 🎯 Role-Based Access Control

### Admin
- Full access to all users, teams, attendance, leaves, and salary
- Can create/update/delete users
- Can manage teams and assign leaders
- Can approve/reject leaves
- Can view all system data

### Leader
- Can only access own team data
- Can mark attendance
- Can apply for leaves
- Can view team members
- Limited to team-specific operations

### Employee
- Can only access personal data
- Can mark own attendance
- Can apply for own leaves
- Can view team information
- Limited to individual operations

---

## 📝 Key Features Implementation

### 1. User Management
**File:** `controllers/user-controller.js`
- createUser() - Admin creates new users
- updateUser() - Update user details (Admin) or self (Others)
- getUsers() - Get users by type with filters
- getFreeEmployees() - Get unassigned employees

### 2. Team Management
**File:** `controllers/team-controller.js`
- createTeam() - Admin creates teams
- updateTeam() - Modify team details
- addMember() - Add employee to team
- removeMember() - Remove employee from team
- addRemoveLeader() - Assign/remove team leader

### 3. Attendance Tracking
**File:** `services/attendance-service.js`
- markEmployeeAttendance() - Mark present/absent
- viewEmployeeAttendance() - View attendance records
- getAttendanceByPeriod() - Filter by date range

### 4. Leave Management
**File:** `controllers/user-controller.js`
- applyLeaveApplication() - Employee applies for leave
- viewLeaveApplications() - View leave requests
- updateLeaveApplication() - Admin approves/rejects

### 5. Salary Management
**File:** `controllers/user-controller.js`
- assignEmployeeSalary() - Admin sets salary
- updateEmployeeSalary() - Modify salary
- viewSalary() - View salary information

### 6. Token Management
**File:** `services/token-service.js`
- generateToken() - Create access + refresh tokens
- verifyRefreshToken() - Validate refresh token
- storeRefreshToken() - Save token to DB
- removeRefreshToken() - Logout

---

## 🔄 API Endpoints Summary

### Authentication
- `POST /api/auth/login` - User login
- `POST /api/auth/forgot` - Request password reset
- `PATCH /api/auth/reset` - Reset password
- `GET /api/auth/logout` - User logout
- `GET /api/auth/refresh` - Refresh access token

### Admin Routes (`/api/admin/*`)
- User Management (CRUD, view by type)
- Team Management (CRUD, member management)
- Attendance & Leaves (View, approve, reject)
- Salary Management (Assign, update, view)
- Dashboard (Get counts)

### Employee Routes (`/api/employee/*`)
- Mark Attendance
- View Own Attendance
- Apply Leave
- View Leave Status
- View Salary
- Update Profile

### Leader Routes (`/api/leader/*`)
- View Team
- View Team Members
- Mark Attendance
- View Attendance
- Apply Leave
- Update Profile

---

## 🛡️ Error Handling

All errors are handled through centralized error middleware:
```javascript
// Error Structure
{
  success: false,
  message: "Error description",
  status: 400 // HTTP status code
}
```

---

## 📊 Database Schema Relationships

```
User (1) ─── (Many) Attendance
User (1) ─── (Many) Leave
User (1) ─── (Many) UserSalary
User (1) ─── (Many) Token
User (1) ─── (Many) OTP

Team (1) ─── (Many) User (via team field)
User (1) ─── (1) Team (as leader)
```

---

## 🎨 Frontend State Management (Redux)

### Slices
1. **auth-slice.js** - Login state, user role
2. **user-slice.js** - User data
3. **team-slice.js** - Team data
4. **main-slice.js** - Global state

### Store Usage
```javascript
import { useSelector, useDispatch } from 'react-redux';
import { setAuth } from './store/auth-slice';

const dispatch = useDispatch();
const user = useSelector(state => state.auth.user);
```

---

## 📱 Component Architecture

### Page Layout
```
App.js
├── Navigation
├── Sidebar
├── Main Content Area
│   ├── Admin Dashboard
│   ├── Employee Dashboard
│   ├── Leader Dashboard
│   └── User Pages
└── Footer
```

### Data Flow
```
User Input → Form Component
           ↓
API Call (http/index.js)
           ↓
Redux Store Update
           ↓
Component Re-render
```

---

## ✅ Testing Credentials

### Admin Account
- **Email:** admin@admin.com
- **Password:** admin123
- **Role:** Admin

### Additional Test Accounts
- **Email:** john.doe@example.com (Admin)
- **Email:** jane.smith@example.com (Leader)
- **Email:** mike.johnson@example.com (Employee)
- **Password:** password123 (for all test accounts)

---

## 🚨 Troubleshooting

### Issue: Cannot Login
**Solution:** Verify admin user exists in database
```bash
node test-login.js
```

### Issue: Port Already in Use
**Solution:** Change PORT in .env file
```env
PORT=5502
```

### Issue: CORS Errors
**Solution:** Check CLIENT_URL in backend .env matches frontend URL

### Issue: Database Connection Failed
**Solution:** Verify DB_URL is correct and MongoDB is running

---

## 📚 Dependencies

### Backend
- express.js - Web framework
- mongoose - MongoDB ODM
- jsonwebtoken - JWT authentication
- bcrypt - Password hashing
- multer - File uploads
- nodemailer - Email sending
- dotenv - Environment variables

### Frontend
- react - UI library
- redux/@reduxjs/toolkit - State management
- axios - HTTP client
- react-router-dom - Routing
- react-toastify - Notifications
- bootstrap - CSS framework

---

## 🎓 Next Steps

1. ✅ Verify both servers are running
2. ✅ Test login with provided credentials
3. ✅ Explore admin dashboard
4. ✅ Create test users and teams
5. ✅ Test attendance marking
6. ✅ Test leave applications
7. ✅ Deploy to production

---

**System Status:** ✅ Ready for Production  
**Last Updated:** December 9, 2025
