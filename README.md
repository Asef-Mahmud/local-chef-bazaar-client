🍽️ Local Chef Bazaar
📌 Project Overview

Local Chef Bazaar is a full-stack food marketplace platform where users can discover homemade meals prepared by local chefs, place orders, manage favorites, and track their activities. The platform includes role-based access control for users, chefs, and admins, ensuring secure and scalable functionality.

This project is built as a modern MERN-style application with Firebase authentication and a responsive, animated UI.

🎯 Purpose of the Project

The purpose of this project is to:

Connect local chefs with customers

Provide a secure role-based platform (user / chef / admin)

Implement real-world admin management features

Practice full-stack development with authentication, authorization, and database control

🌐 Live Website

🔗 Live URL:
👉 https://local-chef-bazaar-4-all.web.app/

(Replace with your actual deployed URL if different)

🚀 Key Features
👤 User Features

User registration & login using Firebase Authentication

View meals from local chefs

Add & remove meals from Favorites

Place meal orders with quantity and address

View personal profile (name, email, role, status)

Fraud users are automatically restricted from placing orders



🧑‍🍳 Chef Features

Chef role-based access

Create and manage meals

View chef profile with Chef ID

Fraud chefs are blocked from creating meals



🛠️ Admin Features

Admin-only Manage Users Dashboard

View all users in a table

Mark users or chefs as Fraud

Fraud logic enforced from backend

Admin accounts are protected from fraud actions



🎨 UI & UX Features

Fully responsive design (mobile, tablet, desktop)

Smooth animations using Framer Motion

Interactive sliders using Swiper.js

Clean UI components using DaisyUI

Charts and data visualization with Recharts

Confirmation & alert dialogs using SweetAlert2


🧱 Tech Stack
🖥️ Frontend

React.js

Tailwind CSS

DaisyUI

TanStack Query (React Query)

Axios (with axiosSecure interceptor)

React Hook Form

React Router DOM

Framer Motion

Swiper.js

React Icons

SweetAlert2

Recharts



💳 Payment

Stripe Payment Gateway


🔐 Authentication & Hosting

Firebase Authentication

Firebase Hosting


🚀 Deployment

Firebase Hosting (Client)

Vercel (Server)



🗄️ Backend

Node.js

Express.js

MongoDB

JWT (Firebase token verification)

Vercel (Backend Deployment)



📦 NPM Packages Used
react
react-router-dom
firebase
axios
@tanstack/react-query
react-hook-form
sweetalert2
framer-motion
swiper
react-icons
recharts
tailwindcss
daisyui



🔐 Security & Authorization

Firebase token verification middleware

Role-based access control (user / chef / admin)

Fraud users restricted from critical actions

Server-side enforcement for all sensitive operations



📁 Project Structure
src/
├── components/
├── hooks/
├── pages/
│   ├── Home
│   ├── Login
│   ├── Register
│   ├── Profile
│   ├── Dashboard
│   │   ├── ManageUsers
│   │   ├── CreateMeal
│   │   └── Orders
├── routes/
├── utils/