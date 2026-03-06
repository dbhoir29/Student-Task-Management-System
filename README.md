# 📚 Student Task Management System

A full-stack web application for managing student academic tasks. Built with the **MERN stack** (MongoDB, Express, React, Node.js), it lets teachers or administrators create, track, update, and delete tasks assigned to students — with a live dashboard showing task summaries, priorities, and due-date alerts.

---

## 🚀 Features

- **📊 Dashboard Overview** — At-a-glance stats: total tasks, pending, in-progress, completed, high priority, and overdue counts.
- **⏰ Due Soon — Priority List** — Highlights students with tasks overdue or due within the next 5 days, grouped by High / Medium / Low priority.
- **📋 All Tasks Page** — Filterable task list by status (All / Pending / In Progress / Completed) with a due-date alert modal on load.
- **➕ Create Task** — Form to assign a new task to a student with full details.
- **✏️ Edit & Delete Tasks** — Click any task card to view, edit fields inline, or delete with a confirmation prompt.
- **🏷️ Task Categorization** — Tasks classified as Assignment, Project, Exam, Lab, or Other.
- **🔴 Priority Levels** — Low, Medium, High with color-coded badges.
- **📌 Status Tracking** — Pending → In Progress → Completed workflow.
- **🔔 Overdue / Due Soon Indicators** — Visual warning banners on task cards.
- **🌙 DaisyUI Forest Theme** — Clean, dark-themed UI using Tailwind CSS + DaisyUI.

---

## 🛠️ Tech Stack

### Frontend
| Technology | Version | Purpose |
|---|---|---|
| React | 19 | UI framework |
| React Router | 7 | Client-side routing |
| Axios | 1.x | HTTP requests |
| Tailwind CSS | 3.x | Utility-first styling |
| DaisyUI | 4.x | Component library |
| Lucide React | 0.562 | Icons |
| React Hot Toast | 2.x | Notifications |
| Vite | 7.x | Build tool & dev server |

### Backend
| Technology | Version | Purpose |
|---|---|---|
| Node.js | — | Runtime |
| Express | 5.x | Web framework |
| Mongoose | 9.x | MongoDB ODM |
| MongoDB Atlas | — | Cloud database |
| dotenv | 17.x | Environment variables |
| CORS | 2.x | Cross-origin support |
| Nodemon | 3.x | Dev auto-reload |

---

## 📁 Project Structure

```
Student-Task-Management/
├── package.json               # Root scripts (build & start)
│
├── backend/
│   ├── package.json
│   ├── .env                   # Environment variables (not committed)
│   └── src/
│       ├── server.js          # Express app entry point
│       ├── config/
│       │   └── db.js          # MongoDB connection
│       ├── models/
│       │   └── taskModel.js   # Mongoose Task schema
│       ├── controllers/
│       │   └── taskController.js  # Business logic
│       └── routes/
│           └── taskRoutes.js  # API route definitions
│
└── frontend/
    ├── package.json
    ├── index.html
    ├── vite.config.js
    ├── tailwind.config.js
    ├── postcss.config.js
    └── src/
        ├── main.jsx           # React entry point
        ├── App.jsx            # Route definitions
        ├── index.css          # Global styles
        ├── lib/
        │   ├── axios.js       # Axios instance (baseURL config)
        │   └── utils.js       # Date helpers, color utilities
        ├── Components/
        │   ├── Navbar.jsx     # Top navigation bar
        │   ├── TaskCard.jsx   # Task card with edit/delete
        │   └── TaskNotFound.jsx  # Empty state component
        └── pages/
            ├── DashboardPage.jsx   # Home / summary view
            ├── AllTasksPage.jsx    # Filtered task list
            ├── CreatePage.jsx      # New task form
            └── TaskDetailPage.jsx  # Edit / delete task
```

---

## ⚙️ Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) v18 or higher
- [npm](https://www.npmjs.com/) v8 or higher
- A [MongoDB Atlas](https://www.mongodb.com/atlas) account (or a local MongoDB instance)

---

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/Student-Task-Management.git
cd Student-Task-Management
```

---

### 2. Configure Environment Variables

Create a `.env` file inside the `backend/` directory:

```bash
cd backend
touch .env
```

Add the following variables:

```env
PORT=3000
MONGO_URI=your_mongodb_connection_string_here
```

> **How to get your MongoDB URI:**
> 1. Go to [MongoDB Atlas](https://cloud.mongodb.com/)
> 2. Create a free cluster
> 3. Click **Connect → Drivers** and copy the connection string
> 4. Replace `<password>` with your database user's password

> ⚠️ **Never commit your `.env` file.** Add it to `.gitignore`.

---

### 3. Install Dependencies & Run (Development)

Open **two terminals**:

**Terminal 1 — Backend:**
```bash
cd backend
npm install
npm run dev
```
Backend runs at: `http://localhost:3000`

**Terminal 2 — Frontend:**
```bash
cd frontend
npm install
npm run dev
```
Frontend runs at: `http://localhost:5173`

---

### 4. Production Build (from root)

```bash
# From the project root
npm run build   # Installs deps + builds frontend
npm start       # Starts the backend server
```

---

## 🔌 API Reference

Base URL: `http://localhost:3000`

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/tasks` | Get all tasks (sorted by newest) |
| `GET` | `/tasks/:id` | Get a single task by ID |
| `POST` | `/tasks` | Create a new task |
| `PUT` | `/tasks/:id` | Update an existing task |
| `DELETE` | `/tasks/:id` | Delete a task |
| `GET` | `/tasks/summary` | Dashboard stats (totals, overdue, etc.) |
| `GET` | `/tasks/priority-due-list` | Tasks due within 5 days, grouped by priority |

### Task Object Schema

```json
{
  "studentId":  "string (required) — student's mobile/ID number",
  "title":      "string (required)",
  "description":"string (required)",
  "category":   "Assignment | Project | Exam | Lab | Other",
  "priority":   "Low | Medium | High",
  "status":     "Pending | In Progress | Completed",
  "email":      "string (required) — student's email",
  "dueDate":    "Date (required)",
  "assignedTo": "string (required) — student's name",
  "dateAdded":  "Date (auto)",
  "createdAt":  "Date (auto)",
  "updatedAt":  "Date (auto)"
}
```

### Example — Create a Task

```bash
curl -X POST http://localhost:3000/tasks \
  -H "Content-Type: application/json" \
  -d '{
    "studentId": "9876543210",
    "title": "Submit Lab Report",
    "description": "Write and submit the physics lab report",
    "category": "Lab",
    "priority": "High",
    "status": "Pending",
    "email": "student@example.com",
    "dueDate": "2026-03-15",
    "assignedTo": "Devashish Bhoir"
  }'
```

---

## 📸 Pages Overview

| Page | Route | Description |
|------|-------|-------------|
| Dashboard | `/` | Summary stats + priority due-soon list |
| All Tasks | `/tasks` | Full task list with status filter tabs |
| Create Task | `/create` | Form to add a new student task |
| Task Detail | `/task/:id` | Edit all task fields or delete the task |

---

## 🔒 Environment Variables Reference

| Variable | Description | Example |
|----------|-------------|---------|
| `PORT` | Port the backend server listens on | `3000` |
| `MONGO_URI` | MongoDB Atlas connection string | `mongodb+srv://user:pass@cluster.mongodb.net/dbname` |

---

## 🧩 Key Implementation Details

- **DNS Override** — The backend explicitly sets DNS servers to `1.1.1.1` and `8.8.8.8` to ensure reliable MongoDB Atlas connectivity in restricted network environments.
- **CORS** — Backend is configured to allow requests from `http://localhost:5173` (Vite dev server). Update this for production deployments.
- **Overdue Detection** — The `getPriorityDueList` endpoint computes overdue status server-side (tasks not completed with `dueDate < now`).
- **Due Soon Alert Modal** — `AllTasksPage` shows a modal popup on load if any incomplete tasks are due within 3 days.
- **Optimistic UI Updates** — Task deletion on the cards page removes the item from state immediately without a full refetch.

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature-name`
3. Commit your changes: `git commit -m "feat: add your feature"`
4. Push to the branch: `git push origin feature/your-feature-name`
5. Open a Pull Request

---

## 📄 License

This project is licensed under the **ISC License**.

---

## 👨‍💻 Author

**Devashish Bhoir**  
Feel free to reach out or open an issue for any questions or suggestions!
