🌇 SkyTower - Building Management System
Live Site: https://skytower-8931f.web.app
Server URL: https://sky-tower-server.vercel.app

📌 Project Overview
SkyTower is a full-stack, responsive web application built to manage a single building with role-based dashboards for users, members, and admins. The system includes features such as apartment listings, rent payments with coupon support, announcements, agreement management, authentication, and real-time admin controls.

Designed with scalability and usability in mind, SkyTower ensures secure authentication, clean UI/UX, and seamless deployment, making it a complete solution for smart building management.

🎯 Project Objectives
✅ Design a role-based building management system (user, member, admin)

✅ Implement secure login, registration, and dashboard routing

✅ Enable rent payments with dynamic coupon discounts

✅ Admin-powered apartment, user, coupon, and announcement management

✅ Ensure full mobile responsiveness and proper deployment

✅ Meet academic guidelines with secure backend & environment variables

🚀 Technologies Used
🖥️ Frontend
React.js

Tailwind CSS

DaisyUI

Framer Motion (for animations)

Lucide React & React Icons (for icons)

Firebase Authentication

TanStack Query (for efficient data fetching)

Axios

🌐 Backend
Node.js & Express.js

MongoDB (with Mongoose ODM)

Firebase Admin SDK (for role validation)

CORS

dotenv (for managing secrets)

🔐 Security & Best Practices
Firebase and MongoDB credentials are secured using .env files

Middleware using Firebase Admin SDK implemented for role-based route protection

Deployed using Vercel (server) and Firebase Hosting (client)

CORS policies configured correctly

No CORS / 404 / 504 errors on production

📱 Responsiveness
SkyTower is fully responsive across all devices:

✅ Mobile

✅ Tablet

✅ Desktop

🧩 Key Features
🏠 Public Pages
Home page with banner, about section, coupon display, and location map

Apartment listing with pagination and search by rent range

🔐 Authentication
Email/password login and registration

Google OAuth support

Form validations with password strength check

SweetAlert2 feedback on success/failure

👤 User Dashboard
My Profile (basic info, agreement = none)

View all admin announcements

🧍‍♂️ Member Dashboard
My Profile with rented apartment info

Make Payment (Stripe simulated with coupon logic)

Payment History

Announcements

🛠️ Admin Dashboard
Admin Profile with building/user stats

Manage Members (remove role)

Manage Coupons (add, view, update availability)

Agreement Requests (approve/reject)

Make Announcement

✅ Challenge Tasks Implemented
🔐 Firebase Admin SDK-based Middleware

📊 Admin dashboard stats (room status, user/member count)

💸 Coupon availability toggle

✅ Payment with coupon support and DB storage

🎞️ Framer Motion animations

⚙️ Axios interceptor configured

🔗 Useful Links
🔗 React Documentation

🔗 Tailwind CSS

🔗 DaisyUI

🔗 Firebase

🔗 MongoDB

🔗 TanStack Query

🤝 Author
Md. Jahirul Islam Shifat
Software Engineering Student | IUT

📌 Disclaimer
This project is built from scratch and any resemblance to other course/module/assignment projects is purely coincidental. It follows all university guidelines strictly and does not express Gobindo design principles.