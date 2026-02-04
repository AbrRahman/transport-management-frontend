# 🚍 Transport Management Module – Frontend

A **Transport Management Module frontend** built as part of a **School Management System** technical assignment.  
This application enables administrators to manage vehicles, routes, pickup points, fee masters, and student transport assignments in a clean, structured, and scalable way.

> This repository contains the **frontend implementation only**, designed to integrate with a Node.js + Express.js + PostgreSQL (Prisma) backend.

---

## ✨ Features Overview

### 🚦 Transport Configuration (Masters)

- **Fees Master**
  - Define and manage transport fee structures.
- **Pickup Points**
  - Create, update, and delete pickup locations.
- **Vehicles**
  - Manage vehicle details (vehicle number, driver, helper, contact info).

### 🛣️ Route Operations

- **Routes**
  - Define routes with start point, end point, and route name.
- **Route Pickup Points**
  - Map multiple pickup points to a route with stop order.
- **Assign Vehicle**
  - Assign vehicles to routes.

### 🎓 Student Transport

- **Student Transport Assignment**
  - Assign students to routes and vehicles.
- **Student Transport Fees View**
  - Displays assigned transport records (fee generation handled by backend).

---

### 🔗 Demo Links

- 🔗 **Live Frontend:** [https://transport-management-smoky.vercel.app/](https://transport-management-smoky.vercel.app/)
- 🔗 **Backend GitHub Repository:** [transport-management-backend](https://github.com/AbrRahman/transport-management-backend)

---

## 🧰 Tech Stack

### Frontend

- **React.js (v19)**
- **TypeScript**
- **Vite**
- **React Router v7**
- **TanStack React Query**
- **Axios**

### Forms & Validation

- **React Hook Form**
- **Zod** (Schema-based form validation)

### UI & Styling

- **Tailwind CSS**
- **shadcn/ui**
- **Lucide React Icons**
- **Sonner** (Toast notifications)

### Code Quality

- **ESLint**
- **Strict TypeScript**
- Modular and scalable folder structure

---

## ⚙️ Local Installation Guide

### 1. Clone the Repository

```
https://github.com/AbrRahman/transport-management-frontend.git
cd transport-management-frontend
```

### 2. Install Dependencies

```
npm install
```

### 3. Setup Environment Variables

Create a **.env.local** file in the root:

```
VITE_API_BASE_URL=http://localhost:3000/api/v1
```

This variable defines the **base URL of the backend API.**
Make sure your backend server is running on port **3000** and exposes APIs under /api/v1.

### Step 4: Start Development Server

```
npm run dev
```

## 📁 Project Structure (Simplified)

```
src/
├── components/ # Reusable UI & feature components
├── pages/ # Application pages
├── hooks/ # React Query hooks
├── schema/ # Zod validation schemas
├── types/ # TypeScript types
├── lib/ # API & utility helpers
├── routes/ # Application routing
├── layout/ # Layout components
└── main.tsx # Entry point
```

