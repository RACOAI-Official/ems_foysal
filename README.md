# 🎯 Employee Management System (EMS)

A comprehensive, role-based **Employee Management System** built on the **MERN stack** (MongoDB, Express.js, React, Node.js) for streamlining employee administration, team management, attendance tracking, and leave management.

## ✨ Key Features

### 🔐 Authentication & Security
- JWT-based authentication with access & refresh tokens
- Password hashing with bcrypt
- Role-based access control (RBAC)
- OTP-based password recovery
- Secure httpOnly cookies

### 👤 User Management
- Create, read, update users across roles (Admin, Leader, Employee)
- Profile image upload
- User status management
- Free user listing (unassigned to teams)

### 👥 Team Management
- Create and manage teams
- Assign/remove team members
- Assign/remove team leaders
- Team image uploads
- Team status tracking

### 📋 Attendance System
- Mark daily attendance (Present/Absent)
- View attendance records
- Filter by date range
- Employee-specific attendance tracking
- Annual/monthly attendance reports

### 🏖️ Leave Management
- Apply for leaves (vacation, medical, personal)
- Admin approval/rejection system
- View leave status
- Leave period calculation
- Leave history tracking

### 💰 Salary Management
- Assign salary to employees
- Bonus allocation with reasons
- View salary information
- Update salary details
- Salary history records

### 📊 Dashboard & Analytics
- System statistics (user count, team count, etc.)
- Role-specific dashboards
- Quick action access

---

## 🏗️ Project Structure

### Backend Structure
```
Easy-Employee-API-master/
├── configs/              # Configuration files
├── controllers/          # Business logic controllers
├── dtos/                # Data Transfer Objects
├── middlewares/         # Express middlewares
├── models/              # MongoDB schemas
├── routes/              # API endpoints
├── services/            # Business services
├── storage/             # File storage
├── templates/           # Email templates
├── utils/               # Utility functions
├── .env                 # Environment variables
├── package.json         # Dependencies
└── server.js            # Entry point
```

### Frontend Structure
```
Easy-Employee-master/
├── public/              # Static files
├── src/
│   ├── components/      # Reusable components
│   ├── pages/          # Page components
│   ├── store/          # Redux state management
│   ├── hooks/          # Custom React hooks
│   ├── http/           # API client
│   ├── assets/         # CSS, images
│   └── App.js          # Root component
├── .env                # Environment variables
└── package.json        # Dependencies
```

---

## 🚀 Quick Start

### Prerequisites
- Node.js v14+
- MongoDB (Local or Atlas)
- npm or yarn

### Installation

#### 1. Clone/Extract Project
```bash
cd Easy-Employee
```

#### 2. Backend Setup
```bash
cd Easy-Employee-API-master
npm install
node create-admin.js
npm run dev
```
Backend runs on: `http://localhost:5501`

#### 3. Frontend Setup
```bash
cd ../Easy-Employee-master
npm install
npm start
```
Frontend runs on: `http://localhost:3001`

---

## 🔑 Login Credentials

### Admin Account
- **Email:** admin@admin.com
- **Password:** admin123

### Test Accounts
| Email | Role | Password |
|-------|------|----------|
| john.doe@example.com | Admin | password123 |
| jane.smith@example.com | Leader | password123 |
| mike.johnson@example.com | Employee | password123 |
| sarah.davis@example.com | Employee | password123 |

---

## 📚 API Documentation

### Authentication Endpoints
```
POST   /api/auth/login         - Login
POST   /api/auth/forgot        - Request password reset
PATCH  /api/auth/reset         - Reset password
GET    /api/auth/logout        - Logout
GET    /api/auth/refresh       - Refresh token
```

### Admin Endpoints
```
GET    /api/admin/users        - Get all users
POST   /api/admin/user         - Create user
PATCH  /api/admin/user/:id     - Update user
GET    /api/admin/employees    - Get employees
GET    /api/admin/leaders      - Get leaders
GET    /api/admin/teams        - Get teams
POST   /api/admin/team         - Create team
PATCH  /api/admin/team/:id     - Update team
```

### Employee Endpoints
```
POST   /api/employee/mark-attendance         - Mark attendance
POST   /api/employee/view-attendance         - View attendance
POST   /api/employee/apply-leave             - Apply leave
POST   /api/employee/view-leave-applications - View leaves
POST   /api/employee/view-salary             - View salary
```

### Leader Endpoints
```
GET    /api/leader/team                - Get team
GET    /api/leader/team/members        - Get team members
POST   /api/leader/mark-attendance     - Mark attendance
POST   /api/leader/view-attendance     - View attendance
POST   /api/leader/apply-leave         - Apply leave
```

---

## 🗄️ Database Models

### User Model
```javascript
{
  name: String,
  email: String (unique),
  username: String (unique),
  mobile: Number,
  password: String (hashed),
  type: Enum ['admin', 'employee', 'leader'],
  status: Enum ['active', 'banned'],
  team: ObjectId (ref: Team),
  image: String,
  address: String,
  createdAt: Date,
  updatedAt: Date
}
```

### Team Model
```javascript
{
  name: String (unique),
  description: String,
  image: String,
  leader: ObjectId (ref: User),
  status: Enum ['active', 'expired', 'banned', 'deleted'],
  createdAt: Date,
  updatedAt: Date
}
```

### Attendance Model
```javascript
{
  employeeID: ObjectId (ref: User),
  year: Number,
  month: Number,
  date: Number,
  day: String,
  present: Boolean
}
```

### Leave Model
```javascript
{
  applicantID: ObjectId (ref: User),
  title: String,
  type: String,
  startDate: String,
  endDate: String,
  appliedDate: String,
  period: Number,
  reason: String,
  adminResponse: String
}
```

### UserSalary Model
```javascript
{
  employeeID: ObjectId (ref: User),
  salary: Number,
  bonus: Number,
  reasonForBonus: String,
  assignedDate: String
}
```

---

## 🎭 Role-Based Features

### Admin Dashboard
- ✅ Create/Edit/Delete users
- ✅ Create/Edit/Delete teams
- ✅ Manage team members and leaders
- ✅ View all attendance records
- ✅ Approve/Reject leave applications
- ✅ Assign and manage salaries
- ✅ System statistics and analytics

### Leader Dashboard
- ✅ View team members
- ✅ Mark own attendance
- ✅ Apply for leaves
- ✅ View salary
- ✅ Update profile
- ✅ View team attendance (read-only)

### Employee Dashboard
- ✅ Mark own attendance
- ✅ Apply for leaves
- ✅ View salary
- ✅ Update profile
- ✅ View team information

---

## 🔧 Environment Configuration

### Backend `.env`
```env
# Database
DB_URL=mongodb+srv://username:password@cluster.mongodb.net/database

# Server
PORT=5501
BASE_URL=http://localhost:5501
CLIENT_URL=http://localhost:3000

# JWT
ACCESS_TOKEN_SECRET_KEY=your_secret_here
REFRESH_TOKEN_SECRET_KEY=your_refresh_secret_here

# Email
SMTP_HOST=smtp.gmail.com
SMTP_PORT=465
SMTP_AUTH_USER=your_email@gmail.com
SMTP_AUTH_PASS=your_app_password

# System
TYPE_FORGOT_PASSWORD=2
WEBSITE_NAME=Easy Employee
BCRYPT_PASSWORD_SALT_FACTOR=10
```

### Frontend `.env`
```env
REACT_APP_BASE_URL=http://localhost:5501
```

---

## 🛠️ Development Commands

### Backend
```bash
# Install dependencies
npm install

# Start development server (with auto-reload)
npm run dev

# Create admin user
node create-admin.js

# Test login
node test-login.js
```

### Frontend
```bash
# Install dependencies
npm install

# Start development server
npm start

# Build for production
npm run build
```

---

## 🐛 Troubleshooting

| Issue | Solution |
|-------|----------|
| Cannot login | Run `node test-login.js` to verify admin user |
| Port already in use | Change PORT in .env file |
| Database connection error | Verify DB_URL and MongoDB is running |
| CORS errors | Check CLIENT_URL matches frontend URL |
| Missing dependencies | Run `npm install` in respective folder |

---

## 📦 Dependencies

### Backend
- `express.js` - Web framework
- `mongoose` - MongoDB ODM
- `jsonwebtoken` - JWT authentication
- `bcrypt` - Password hashing
- `multer` - File uploads
- `nodemailer` - Email service
- `validator` - Input validation

### Frontend
- `react` - UI library
- `redux` - State management
- `axios` - HTTP client
- `react-router-dom` - Routing
- `react-toastify` - Notifications
- `bootstrap` - CSS framework

---

## 📝 License

This project is proprietary and developed for internal use.

---

## 👥 Team

**Developed by:** Deepak Singh & Social Codia  
**Contact:** [GitHub](https://github.com/deepak-singh5219) | [LinkedIn](https://www.linkedin.com/in/deepaksingh5219/)

---

## ✅ Status

**System Status:** Ready for Production ✅  
**Last Updated:** December 9, 2025  
**Version:** 1.0.0

---

## 🎯 Next Steps

1. ✅ Setup backend and frontend
2. ✅ Login with admin credentials
3. ✅ Create test users and teams
4. ✅ Test all features
5. ✅ Deploy to production

**Happy coding! 🚀**
