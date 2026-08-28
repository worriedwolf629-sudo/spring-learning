# Project Guidelines & Context: Student Management CRUD

## ⚠️ Core Collaboration Rule
- **NEVER modify or change backend files**: Do not create, edit, or delete any Java classes (`src/main/java`), configuration files (`application.properties`), or Maven files (`pom.xml`) unless explicitly requested by the user.
- **Frontend Ownership**: All UI development, React components, state management, styles, and client API services belong in the [`frontend/`](frontend/) directory.
- **Workflow**: The user writes backend logic and verifies endpoints using Postman. The agent inspects the backend endpoints and updates the React frontend accordingly.

---

## 🏗️ Architecture Overview

### Backend
- **Framework**: Spring Boot 3.x (Java)
- **Database**: MySQL (`students_crud_db` on `localhost:3306`)
- **Base Endpoint**: `http://localhost:8080/api/students`
- **Current Endpoints**:
  - `POST /api/students/create` — Create student
  - `GET /api/students/getall` — Retrieve all students
  - `GET /api/students/get/{id}` — Retrieve student by ID
  - `PUT /api/students/update/{id}` — Update student
  - `DELETE /api/students/delete/{id}` — Delete student

### Frontend
- **Stack**: React 19, Vite, Lucide Icons, Modern CSS Design System
- **Directory**: `frontend/`
- **Port**: `http://localhost:3000`
- **Proxy**: Configured in `vite.config.js` to forward `/api` requests to `http://localhost:8080`

---

## 🚀 Common Commands

### Backend
```bash
./mvnw spring-boot:run
```

### Frontend
```bash
cd frontend
npm run dev      # Start Vite dev server on http://localhost:3000
npm run build    # Production build
```
