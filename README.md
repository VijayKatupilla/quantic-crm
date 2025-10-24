# Quantic CRM – Technical Assessment (NestJS + SQLite + WebSocket)

A secure, modular CRM backend built with **NestJS**, **SQLite**, and **WebSockets**, implementing authentication, role-based access, CRUD operations, and real-time updates with end-to-end testing.

---

## 🚀 Overview

This project fulfills the **Quantic Technical Assessment** requirements.  
It provides a secure CRM backend that includes:
- Authentication and authorization (JWT, refresh tokens, RBAC)
- CRUD operations for Leads, Accounts, and Activities
- Real-time updates through WebSocket
- Security best practices (Helmet, CSRF, Validation)
- SQLite integration with sample seeded data
- Automated testing using Jest

---

## 🧱 Tech Stack

- **NestJS (v10)** – Modular Node.js framework
- **TypeScript** – Strongly typed language for scalable backend
- **SQLite (better-sqlite3)** – Lightweight relational database
- **JWT** – Authentication with access & refresh tokens
- **WebSockets (Socket.IO)** – Real-time client notifications
- **Helmet / CSRF / ValidationPipe** – Security & request validation
- **Jest** – Testing framework for unit and e2e tests

---

## ⚙️ Setup & Installation

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/VijayKatupilla/quantic-crm.git
cd quantic-crm
2️⃣ Install Dependencies
bash
Copy code
npm install
3️⃣ Run in Development Mode
bash
Copy code
npm run start:dev
Server will start at:

🌐 http://localhost:3000

Swagger API Docs available at:

📘 http://localhost:3000/docs

🧱 Database Setup
Database file: crm.db

Created automatically on first launch

Pre-seeded with sample users, leads, and accounts

If needed, delete crm.db to regenerate with seed.sql

🔐 Authentication API
Signup
http
Copy code
POST /auth/signup
Request Body:

json
Copy code
{
  "email": "user1@example.com",
  "password": "Password123",
  "role": "rep"
}
Response:

json
Copy code
{
  "message": "Signup successful",
  "accessToken": "...",
  "refreshToken": "..."
}
Login
http
Copy code
POST /auth/login
Request Body:

json
Copy code
{
  "email": "user1@example.com",
  "password": "Password123"
}
Response:

json
Copy code
{
  "message": "Login successful",
  "accessToken": "...",
  "refreshToken": "..."
}
📊 Leads API
Create Lead
http
Copy code
POST /leads
Body:

json
Copy code
{
  "name": "John Doe",
  "company": "Acme Corp",
  "status": "new"
}
List Leads (with filters)
http
Copy code
GET /leads?status=qualified&createdFrom=2025-01-01&createdTo=2025-12-31
Convert Lead
http
Copy code
POST /leads/:id/convert
✅ Converts a lead into an Account and triggers a WebSocket update.

🏢 Accounts API
Get Accounts
http
Copy code
GET /accounts
Returns all accounts with a count of related activities.

CRUD
POST /accounts

GET /accounts/:id

PUT /accounts/:id

DELETE /accounts/:id

🗓 Activities API
Add Activity
http
Copy code
POST /accounts/:id/activities
Body:

json
Copy code
{
  "type": "call",
  "notes": "Follow-up discussion",
  "next_follow_up": "2025-11-01"
}
Get Activities
http
Copy code
GET /accounts/:id/activities
✅ Each activity has type, notes, and optional next_follow_up.

🔁 WebSocket – Live Updates
Endpoint: /ws/updates

Browser Test Example:

js
Copy code
const socket = io("http://localhost:3000", { path: "/ws/updates" });
socket.on("activityUpdate", (data) => console.log("Live:", data));
When you create or update a lead/activity, the socket emits:

json
Copy code
{
  "event": "created",
  "payload": {
    "id": "uuid",
    "type": "call",
    "notes": "Follow-up discussion"
  }
}
🔒 Security
Feature	Description
Helmet	Secures HTTP headers
CORS	Enabled for all domains
CSRF	Implemented but disabled for testing
ValidationPipe	DTO validation and sanitization
JWT Tokens	Access + Refresh with expiry
SQL Protection	Uses parameterized queries
RBAC	Manager vs Rep roles enforced

🧪 Testing
Run Jest tests:

bash
Copy code
npm test
✅ Example output:

bash
Copy code
PASS  src/app.e2e-spec.ts
  AppController (e2e)
    ✓ / (GET) (42 ms)
📄 Deliverables
Item	Description
Source Code	GitHub Repository
SQLite File	crm.db preloaded with API data
Documentation	README.md + Swagger /docs
Testing	Jest suite and Postman tested endpoints

👨‍💻 Author
Vijay Katupilla
Software Engineer | Java & QA Automation | Cloud & Data Quality Specialist
📧 vijay.katupilla@example.com
🔗 https://github.com/VijayKatupilla

🧩 Submission Notes:
This implementation fulfills all assessment requirements:

Authentication with JWT & refresh tokens

Role-based permissions

CRUD for Leads, Accounts, Activities

Real-time WebSocket updates

SQL joins, validation, and testing

Swagger documentation at /docs