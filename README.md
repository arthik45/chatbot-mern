

# MERN Chatbot with Authentication

A real-time chatbot built with **MERN** (MongoDB, Express, React, Node.js) featuring user authentication. Users can register, login, and chat with the bot.

---

## Features

* User Authentication (Register/Login)
* Real-time chat interface
* Responsive UI

---

## Tech Stack

* **Frontend:** React.js, Axios, CSS/Bootstrap
* **Backend:** Node.js, Express.js
* **Database:** MongoDB
* **Auth:** JWT

---

## Setup & Run

### 1. Clone Project

```bash
git clone https://github.com/arthik45/chatbot-mern.git
cd mern-chatbot
```

---

### 2. Run Backend (Server)

```bash
cd server
node server.js
```

Server runs at `http://localhost:5000`.

---

### 3. Run Frontend (Client)

```bash
cd ../client
npm install
npm run dev

---

## Folder Structure

```
mern-chatbot/
├── client/        # React frontend
├── server/        # Express backend
│   ├── models/    
│   ├── routes/    
│   ├── controllers/
│   ├── middleware/
│   └── server.js
└── README.md
```

---

## Dependencies

* **Backend:** express, mongoose, bcryptjs, jsonwebtoken, cors, dotenv, nodemon
* **Frontend:** react, axios, react-router-dom, bootstrap

---

