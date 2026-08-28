# Student Management Portal — Frontend

A modern React + Vite frontend for the Spring Boot Student CRUD REST API.

---

## 🚀 Quick Start

### 1. Make sure your Spring Boot backend is running
Your Spring Boot application runs on `http://localhost:8080`.

### 2. Start the Frontend Development Server
From the project root:
```bash
cd frontend
npm run dev
```
Open your browser at **`http://localhost:3000`** (or the URL printed in your terminal).

---

## 🔌 API Endpoints Connected

| Operation | HTTP Method | Endpoint | Frontend Component |
| :--- | :--- | :--- | :--- |
| **Get All Students** | `GET` | `/api/students/getall` | [`StudentTable.jsx`](src/components/StudentTable.jsx) |
| **Get Student by ID** | `GET` | `/api/students/get/{id}` | [`StudentDetailModal.jsx`](src/components/StudentDetailModal.jsx) |
| **Create Student** | `POST` | `/api/students/create` | [`StudentModal.jsx`](src/components/StudentModal.jsx) |
| **Update Student** | `PUT` | `/api/students/update/{id}` | [`StudentModal.jsx`](src/components/StudentModal.jsx) |
| **Delete Student** | `DELETE` | `/api/students/delete/{id}` | [`DeleteConfirmModal.jsx`](src/components/DeleteConfirmModal.jsx) |

---

## ✨ Features

- **Live Backend Health Indicator**: Real-time status pill indicating whether the Spring Boot API is reachable.
- **Full CRUD Operations**: Register, edit, view details, and delete students with confirmation prompts.
- **Search & Filter**: Search by name, roll number, ID, or filter by school.
- **Dual View Modes**: Switch seamlessly between **Table View** and **Grid Cards View**.
- **Sorting**: Click column headers (ID, Name, Roll No, Age, School) to sort ascending or descending.
- **Metric Cards**: Real-time summary statistics for Total Students, Unique Schools, Average Age, and Active Records.
- **Toast Notifications**: Non-intrusive feedback on create, update, delete, and connection errors.
