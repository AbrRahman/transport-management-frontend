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

# Project ERD Diagram

<a href="https://res.cloudinary.com/dmhfrwdq3/image/upload/v1770206499/Transport_Management_Module_ERD_rhfejs.png">
  <img src="https://res.cloudinary.com/dmhfrwdq3/image/upload/v1770206499/Transport_Management_Module_ERD_rhfejs.png" alt="ERD Diagram" width="600">
</a>

## API documentation

### Bsae Url : `https://transport-management-backend-beta.vercel.app/api/v1`

## 1 Vehicle Management

| Method | Endpoint       | Description                |
| ------ | -------------- | -------------------------- |
| POST   | `/vehicle`     | Create a new vehicle       |
| GET    | `/vehicle`     | Get all vehicles           |
| GET    | `/vehicle/:id` | Get single vehicle details |
| PUT    | `/vehicle/:id` | Update vehicle information |
| DELETE | `/vehicle/:id` | Remove a vehicle           |

---

## 2 Pickup Point Management

| Method | Endpoint            | Description               |
| ------ | ------------------- | ------------------------- |
| POST   | `/pickup-point`     | Create a new pickup point |
| GET    | `/pickup-point`     | Get all pickup points     |
| GET    | `/pickup-point/:id` | Get specific pickup point |
| PUT    | `/pickup-point/:id` | Update pickup point       |
| DELETE | `/pickup-point/:id` | Delete a pickup point     |

---

## 3 Route Management

| Method | Endpoint              | Description                                  |
| ------ | --------------------- | -------------------------------------------- |
| POST   | `/route`              | Create a new route                           |
| GET    | `/route`              | Get all routes                               |
| GET    | `/route/stop-watch`   | Get routes with assigned stops/pickup points |
| GET    | `/route/unassign-fee` | Get routes without assigned fees             |
| GET    | `/route/:id`          | Get specific route details                   |
| PUT    | `/route/:id`          | Update route details                         |
| DELETE | `/route/:id`          | Delete a route                               |

---

## 4 Route-Vehicle Assignment

| Method | Endpoint                            | Description                            |
| ------ | ----------------------------------- | -------------------------------------- |
| POST   | `/route-vehicle`                    | Assign a vehicle to a specific route   |
| GET    | `/route-vehicle`                    | Get all route-vehicle assignments      |
| GET    | `/route-vehicle/unassigned-route`   | List routes without any vehicle        |
| GET    | `/route-vehicle/unassigned-vehicle` | List vehicles without any route        |
| DELETE | `/route-vehicle/:id`                | Remove vehicle assignment from a route |

---

## 5 Route-Pickup Point Mapping

| Method | Endpoint                        | Description                          |
| ------ | ------------------------------- | ------------------------------------ |
| POST   | `/route-pickup-point`           | Add a pickup point (stop) to a route |
| GET    | `/route-pickup-point`           | Get all route-pickup point mappings  |
| GET    | `/route-pickup-point/route/:id` | Get all stops for a specific route   |
| DELETE | `/route-pickup-point/:id`       | Remove a stop from a route           |

---

## 6 Transport Fee Management

| Method | Endpoint             | Description                           |
| ------ | -------------------- | ------------------------------------- |
| POST   | `/transport-fee`     | Set a monthly fee for a route         |
| GET    | `/transport-fee`     | Get all transport fees                |
| GET    | `/transport-fee/:id` | Get fee details for a specific record |
| PUT    | `/transport-fee/:id` | Update monthly fee amount             |
| DELETE | `/transport-fee/:id` | Remove transport fee record           |

---

## 7 Student Transport Assignment & Fees

| Method | Endpoint                                | Description                                       |
| ------ | --------------------------------------- | ------------------------------------------------- |
| POST   | `/student-transport/student-assign`     | Assign a student to a route and pickup point      |
| GET    | `/student-transport/student-assign`     | Get all student transport assignments             |
| PUT    | `/student-transport/student-assign/:id` | Toggle (Active/Inactive) student transport status |
| DELETE | `/student-transport/student-assign/:id` | Delete student transport assignment               |
| GET    | `/student-transport/transport-fee`      | Get all student transport fee payment records     |

**Note:** Assigning a student automatically generates a transport fee record in `StudentFeeAssignment` for the current month.

---

## 8 Student Management

| Method | Endpoint   | Description                                                        |
| ------ | ---------- | ------------------------------------------------------------------ |
| GET    | `/student` | Get list of students (filtered for those without active transport) |

---
