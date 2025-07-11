🎓 Mentorship System (Feb 2025 – June 2025)
Mentorship System is a full-stack, scalable platform designed for structured mentor-mentee interactions, developed as a major project for the Software Design and Architecture course. It features role-based dashboards for Mentors, Students, and Admins, with modular architecture and integrated design principles.

Tech Stack: MERN (MongoDB, Express.js, React.js, Node.js)
Architecture: Layered, modular, Client Srever
Diagrams: Includes UML Class, Use Case, Sequence, and Activity diagrams
Docs: Includes SRS, SDD, and Deployment Guide

✨ Core Features
👨‍🏫 Mentor Dashboard
Create and manage mentor profile (bio, expertise, CNIC, WhatsApp)
View and manage student bookings
See and respond to reviews and ratings
Request and view badge verification status
Access Stripe-integrated payment history
Notifications for job applications and badge approval

👩‍🎓 Student Dashboard
Browse and search mentors by skill or domain
View mentor profiles with ratings and reviews
Upload CV for analysis
Book services and pay via Stripe
Access booking history and feedback section
Chat with mentors through built-in messaging

🛠️ Admin Dashboard
View/manage all mentors, students, services
Handle badge approval requests
View user reports (reported: true)
Growth in mentees
Number of active mentors
Pending/approved bookings
Send notifications to users (e.g., badge status, admin messages)

🧱 Tech Stack
💻 Frontend:
React.js + React Router
Tailwind CSS
Axios


⚙️ Backend:
Node.js
Express.js
MongoDB + Mongoose

🔐 Other Integrations:
Stripe API – Payments
JWT – Authentication
Custom Middleware – Auth, validation, error handling


📁 Folder Structure
mentorship-system/
│
├── client/                    # Frontend (React)
│   ├── pages/
│   │   ├── MentorDashboard.jsx
│   │   ├── StudentDashboard.jsx
│   │   └── AdminDashboard.jsx
│   ├── components/
│   ├── services/              # API calls
│   └── App.jsx
│
├── server/                    # Backend (Express)
│   ├── models/                # User, Mentor, Booking, Service
│   ├── routes/                # mentorRoutes.js, adminRoutes.js, etc.
│   ├── controllers/
│   ├── middleware/
│   ├── config/
│   └── server.js
│
├── diagrams/                  # UML (Class, Use Case, Activity, etc.)
├── docs/                      # SRS, SDD, Test Cases, Deployment Guide
└── README.md
⚙️ Getting Started
1. Clone Repository
bash
Copy
Edit
git clone https://github.com/your-username/mentorship-system.git
cd mentorship-system
2. Install Dependencies
bash
Copy
Edit
# Backend
npm install

# Frontend
cd client
npm install
3. Environment Setup
Create .env in the root
4. Start Development Servers
bash
Copy
Edit
# Terminal 1 - Backend
cd backend
npm run server

# Terminal 2 - Frontend
cd ochi
npm start
Open in browser: http://localhost:3000

📄 Documentation Delivered
✅ SRS – Functional and non-functional requirements

✅ SDD – Layered architecture, design patterns, UML diagrams

✅ Test Cases – API and UI testing

✅ Deployment Guide – MongoDB Atlas + Render/Vercel steps

📊 Design Patterns Used
three tiered Pattern – For scalable route-controller-model structure

Singleton Pattern – For shared services and DB connections

client server Architecture – Separating responsibilities cleanly

🙋‍♀️ Developed By
Maryam Munawar
Muhammad Abdullah
Mahnoor Saleha
Momna Shafqaat
Momna Ahmad
📚 Course Information
Course: Software Design and Architecture

Institution: COMSATS University Lahore

Semester: Spring 2025





# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh


