
# Quantic CRM – Technical Assessment (NestJS + SQLite + WebSocket)

A lightweight CRM backend built with **NestJS**, **SQLite**, and **WebSockets**, implementing secure authentication, CRUD operations, and real-time updates.

---

## 🚀 Tech Stack

- **Node.js** (v20+)
- **NestJS** (v10)
- **TypeScript**
- **SQLite (better-sqlite3)**
- **JWT Authentication**
- **Helmet / Cookie-Parser / CSRF (secure middleware)**
- **WebSockets (Socket.IO)**
- **Jest (unit & e2e testing)**

---

## ⚙️ Setup & Installation

### 1️⃣ Clone Repository

```bash
# Local setup
git clone https://github.com/<VijayKatupilla>/quantic-crm.git
cd quantic-crm

2️⃣ Install Dependencies
npm install

3️⃣ Run in Development
npm run start:dev


Server will start on: http://localhost:3000

🧱 Database

SQLite file auto-generated at: crm.db

Initial seed runs automatically on first launch via seed.sql

If you want to reset, delete crm.db and restart the app.

🔐 Authentication API
Signup
POST http://localhost:3000/auth/signup
Content-Type: application/json

{
  "email": "user1@example.com",
  "password": "test123",
  "role": "rep"
}


✅ Response:

{
  "message": "Signup successful",
  "accessToken": "xxxxx",
  "refreshToken": "yyyyy"
}

Login
POST http://localhost:3000/auth/login
Content-Type: application/json

{
  "email": "user1@example.com",
  "password": "test123"
}


✅ Response:

{
  "message": "Login successful",
  "accessToken": "xxxxx",
  "refreshToken": "yyyyy"
}

📊 Leads API
Create a Lead
POST http://localhost:3000/leads
Authorization: Bearer <accessToken>

{
  "name": "John Doe",
  "company": "Acme Inc",
  "status": "New"
}


✅ Response:

{
  "id": "uuid",
  "name": "John Doe",
  "company": "Acme Inc",
  "status": "New"
}

List Leads
GET http://localhost:3000/leads
Authorization: Bearer <accessToken>

🔁 WebSocket: Live Updates
Test via Browser Console
const socket = io("http://localhost:3000", { path: "/ws/updates" });
socket.on("activityUpdate", (data) => console.log("Live:", data));


Then in Postman, perform:

POST http://localhost:3000/leads


✅ You should see in browser:

Live: { event: "created", payload: { id: "...", name: "...", ... } }

🧪 Testing (Jest)

Run all tests:

npm test


✅ Example Output:

PASS  src/app.e2e-spec.ts
  AppController (e2e)
    ✓ / (GET) (43 ms)

🧰 Deliverables

✅ Include these files for submission:

/src source folder

crm.db SQLite database

README.md

package.json

(optional) seed.sql

📄 Notes

CSRF middleware is implemented using csurf, but commented out for Postman testing.

All sensitive operations are JWT-protected.

WebSocket Gateway broadcasts updates across all connected clients.

👨‍💻 Author

Vijay Katupilla
Software Engineer | Java & QA Automation | Cloud & Data Quality Specialist
📧 [your.email@example.com
]
🔗 https://github.com/VijayKatupilla

---

## ✅ Step 2: Clean Git setup (local + remote)

1. **Initialize Git locally**
   ```bash
   git init
   git add .
   git commit -m "Initial commit - Quantic CRM assessment complete"
Add your GitHub remote

bash
Copy code
git remote add origin https://github.com/VijayKatupilla/quantic-crm.git
Push your work

bash
Copy code
git branch -M main
git push -u origin main
Verify
Visit:
👉 https://github.com/VijayKatupilla/quantic-crm
and confirm your files appear (including README.md and crm.db).

🏁 That’s it!

You now have:

Full working project ✅

Clean, documented README.md ✅

Passing Jest tests ✅

Remote Git repo ready for review ✅

🧩 Submission Info
Submitted by: Vijay Katupilla  
Date: October 25, 2025  
Notes: All APIs tested locally, database pre-seeded with sample data via API calls.
