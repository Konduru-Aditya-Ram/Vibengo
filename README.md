# Vibengo

# Vibengo

A full‑stack ride‑hailing platform with support for single rides, shared rides, and long‑fare‑sharing rides, built using Node.js/Express/MongoDB on the backend and React/Vite/Tailwind on the frontend.

---

## 🔗 Live Demo

[https://vibengo.vercel.app](https://vibengo.vercel.app)

---

## 📚 Table of Contents

- [Features](#features)  
- [Tech Stack](#tech-stack)  
- [Getting Started](#getting-started)  
  - [Prerequisites](#prerequisites)  
  - [Environment Variables](#environment-variables)  
  - [Installation & Running](#installation--running)  
- [API Endpoints](#api-endpoints)  
- [Project Structure](#project-structure)  
- [License](#license)  

---

## Features

- **User & Captain Authentication** (JWT‑based)  
- **Single Rides**: Request, fare estimation, confirmation, OTP‑secured start, and completion  
- **Shared Rides**: Create/share ride pools, add passengers mid‑trip  
- **LFS Rides**: Long‑fare‑sharing rides with end‑trip settlement  
- **Real‑time Updates**: Socket.io notifications for ride status  
- **Maps Integration**: Google Maps APIs for address auto‑complete, geocoding, distance & time estimation  
- **Responsive React Frontend** with GSAP animations and Tailwind CSS  

---

## Tech Stack

### Backend

- **Node.js** + **Express**  
- **MongoDB** + **Mongoose**  
- **JWT** for authentication  
- **Socket.io** for real‑time communication  
- **express-validator**, **bcrypt**, **cookie-parser**, **cors** :contentReference[oaicite:0]{index=0}

### Frontend

- **React** (v18) + **Vite** :contentReference[oaicite:1]{index=1}  
- **Tailwind CSS** for styling  
- **GSAP** + **@gsap/react** for animations  
- **@react-google-maps/api** for map components  
- **Socket.io‑client** for live updates  
- **Axios** for HTTP requests  

---

## Getting Started

### Prerequisites

- **Node.js** (>=16.0) & **npm**  
- **MongoDB** instance (local or Atlas)  
- **Google Maps API key** with Places & Directions enabled  

### Environment Variables

Create a `.env` in **both** the backend and frontend folders:

#### Backend (`/Backend/.env`)

```bash
PORT=3000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
GOOGLE_MAPS_API_KEY=your_google_maps_api_key
```
### Frontend

- **React** (v18) + **Vite**  
- **Tailwind CSS** for styling  
- **GSAP** + **@gsap/react** for animations  
- **@react-google-maps/api** for map components  
- **Socket.io‑client** for live updates  
- **Axios** for HTTP requests  

---

## Getting Started

### Prerequisites

- **Node.js** (>=16.0) & **npm**  
- **MongoDB** instance (local or Atlas)  
- **Google Maps API key** with Places & Directions enabled  

### Environment Variables

Create a `.env` file in **both** the `Backend` and `frontend` folders.

#### Backend (`Backend/.env`)

```bash
PORT=3000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
GOOGLE_MAPS_API_KEY=your_google_maps_api_key
```
#### Frontend (`frontend/.env`)
```bash
VITE_BACKEND_URL=http://localhost:3000
VITE_GOOGLE_MAPS_API_KEY=your_google_maps_api_key
```
### Installation & Running
# 1. Clone the repository
git clone https://github.com/Konduru-Aditya-Ram/Vibengo.git
cd Vibengo

# 2. Backend setup
cd Backend
npm install
npm start
# Server will run at http://localhost:3000

# 3. Frontend setup
cd ../frontend
npm install
npm run dev
# Open http://localhost:5173 in your browser

### Project Structure
Vibengo
├── Backend
│   ├── controllers
│   ├── db
│   ├── middlewares
│   ├── models
│   ├── routes
│   ├── socket.js
│   ├── app.js
│   └── server.js
└── frontend
    ├── public
    ├── src
    │   ├── components
    │   ├── pages
    │   ├── services
    │   └── App.jsx
    ├── vite.config.js
    └── tailwind.config.js
