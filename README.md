# Inventory Hub

Inventory Hub is a MERN (MongoDB, Express, React, Node) admin workspace for catalog, stock, customers, orders, and promotions.

## 1. Prerequisites

Install Node.js 18 or newer and start MongoDB locally, or create a MongoDB Atlas database.

## 2. Create environment files

Copy `backend/.env.example` to `backend/.env`, then replace `MONGODB_URI` and `JWT_SECRET`. `ADMIN_EMAIL` and `ADMIN_PASSWORD` seed the first admin account on the first server start. Never commit `.env`.

## 3. Install and run

Open two terminals from this project folder:

```text
cd backend
npm install
npm run dev
```

```text
cd frontend
npm install
npm run dev
```

Visit `http://localhost:5173`. The API health check is `http://localhost:5000/api/health`.

## 4. Folder guide

`backend/server.js` creates Express, CORS, JSON parsing, routes, and error handling. `backend/config/db.js` connects Mongoose. `backend/models/index.js` defines Admin, Product, Stock, Customer, Order, and Coupon schemas. `backend/controllers` contains business logic; `backend/routes` maps REST endpoints; `backend/middleware` contains JWT protection, validation, and errors.

`frontend/src/main.jsx` mounts React. `frontend/src/App.jsx` defines public and protected routes. `frontend/src/components` contains the shell, sidebar, cards, modal, toast, and auth guard. `frontend/src/pages` contains login, dashboard, product/customer/coupon management, stock, and order views. `frontend/src/services/api.js` is the Axios client and automatically attaches the JWT. `frontend/src/styles/index.css` is the responsive visual system.

## Business rules

Stock is represented by immutable addition/removal transactions. A removal is rejected when it would make the balance negative. Creating an order checks each product balance, records removal transactions, and calculates coupon discounts. Coupons enforce active state, expiration, minimum order amount, and usage limits. Admin passwords are bcrypt-hashed and API access uses seven-day JWTs.
