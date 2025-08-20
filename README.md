# CampusColab – Unified Learning & Task Management Platform  

🚀 *CampusColab* is a full-stack web application designed to streamline *task management, communication, and collaboration* across colleges.  
It enables Admins, Teachers, and Students to connect seamlessly, share updates, manage tasks, and collaborate effectively.  

---

## 📌 Features
- 🔐 *Authentication & Authorization* with JWT (Admin / Teacher / Student roles).  
- 👥 *User Management (CRUD)* – Admins can create, edit, and remove users.  
- ✅ *Task Management (CRUD)* – Create, assign, update, and delete tasks.  
- 📂 *File Uploads* – Attach up to 3 PDF documents per task and view them later.  
- 📅 *Filtering & Sorting* – Tasks can be filtered by status, priority, and due date.  
- 🔔 *Real-Time Notifications* for new events and updates.  
- 💬 *Messaging & Communication* – Group and one-on-one chat (future-ready with WebSockets).  
- 📊 *Dashboards* – Role-specific dashboards (Admin, Teacher, Student).  
- 🐳 *Dockerized Setup* – Run with a single command using docker-compose.  
- 📝 *API Documentation* – Swagger/Postman available.  
- ✅ *Automated Tests* for authentication & task management.  

---

## 🏗 Tech Stack
*Frontend:* React, Redux, React Router, TailwindCSS  
*Backend:* Django Rest Framework (DRF)  
*Database:* PostgreSQL  
*Authentication:* JWT  
*File Storage:* Local storage (extendable to AWS S3)  
*Deployment:* Vercel (Frontend), Render/Heroku (Backend)  
*Testing:* Jest (frontend), PyTest (backend)  

---

## ⚙ Installation & Setup  

### 🔹 Clone the repository
bash
git clone [https://github.com/renuka-club/CampusColab.git](https://github.com/renuka-club/CampusColab.git)
cd CampusColab


### 🔹 Run with Docker
Make sure you have Docker & Docker Compose installed.  
bash
docker-compose up --build

This will start:
- Backend (Django API)  
- Frontend (React UI)  
- PostgreSQL Database  

The app should be available at:  
👉 Frontend: http://localhost:3000  
👉 Backend API: http://localhost:8000/api/  

### 🔹 Run without Docker

*Backend (Django + DRF)*  
bash
cd backend
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver


*Frontend (React)*  
bash
cd frontend
npm install
npm run dev


---

## 📖 API Documentation
- Swagger UI: http://localhost:8000/api/docs/  
- Postman Collection: [Link to JSON File]  

---

## 🧪 Testing  

*Backend (PyTest)*  
bash
pytest --maxfail=1 --disable-warnings -q


*Frontend (Jest)*  
bash
npm test


At least *80% coverage* is implemented for authentication & task CRUD APIs.  

---

## 🌍 Deployment  

- 🔗 *Frontend (Vercel):* [https://campus-colab.vercel.app/](https://campus-colab.vercel.app/)  
- 🔗 *Backend (Render/Heroku):*https://campuscolab.onrender.com



## 👨‍💻 Contributors  
- *K. Renuka*  
- *Ch. Raju*  
- *B. Bhoomika*  


---

## 📜 License  
This project is licensed under the MIT License.  
Feel free to use and extend it for learning purposes.


