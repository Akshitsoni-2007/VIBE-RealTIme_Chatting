# Vibe V1 💬

### Connect. Chat. Vibe.

Vibe is a real-time chat application built to make communication simple, interactive, and seamless. Built with React and Node.js, the project combines a responsive user interface with real-time messaging and backend authentication.

> **Vibe V1** — A full-stack web development project focused on real-time communication.

## ✨ Features

- 💬 **Real-Time Messaging** — Communicate with other users through a chat interface powered by Socket.IO.
- 🔐 **User Authentication** — Backend authentication using JWT and secure password hashing with bcrypt.
- 👥 **User Conversations** — View users and select conversations from the chat interface.
- 🟢 **Real-Time Connectivity** — Socket.IO integration for real-time communication.
- 🎨 **Modern UI** — Responsive interface built with React, Tailwind CSS, and DaisyUI.
- 🗄️ **Database Integration** — MongoDB and Mongoose for storing application data.
- 🔔 **Toast Notifications** — User feedback for application events.

## 🛠️ Tech Stack

| Technology | Purpose |
|---|---|
| React | Frontend UI |
| Vite | Frontend development and build tooling |
| Tailwind CSS | Styling |
| DaisyUI | UI components |
| Redux Toolkit | Global state management |
| Redux Persist | Persisting selected Redux state |
| Node.js | Backend runtime |
| Express.js | REST API and server |
| Socket.IO | Real-time communication |
| MongoDB Atlas | Cloud database |
| Mongoose | MongoDB object modeling |
| JWT | Authentication |
| bcryptjs | Password hashing |

## 📁 Project Structure

```text
Vibe-V1/
├── backend/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── server.js
│   ├── package.json
│   └── .env
│
├── frontend/
│   ├── public/
│   ├── src/
│   ├── index.html
│   └── package.json
│
└── README.md
```

## 🚀 Getting Started

### Prerequisites

Make sure you have the following installed or configured:

- [Node.js](https://nodejs.org/)
- npm
- [MongoDB Atlas](https://www.mongodb.com/atlas)
- [Git](https://git-scm.com/)

### 1. Clone the Repository

```bash
git clone https://github.com/Akshitsoni-2007/VIBE-RealTIme_Chatting.git
cd Vibe_V1 - MAIN
```

### 2. Set Up the Backend

```bash
cd backend
npm install
```

Create a `.env` file inside the backend directory:

```env
PORT=8080
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_long_random_secret
FRONTEND_URL=http://localhost:5173
```

Use the actual environment variable names expected by your backend code. Never commit your `.env` file or publish real credentials.

Start the backend:

```bash
npm install
npm start
```

### 3. Set Up the Frontend

Open a second terminal:

```bash
cd frontend
npm install
npm run dev
```

Open the local URL printed by Vite in your terminal.

> Ensure the frontend API and Socket.IO URLs point to the backend server you are running.

## 🔧 Environment Configuration

The backend may require environment variables such as:

| Variable | Description |
|---|---|
| `PORT` | Port used by the backend server |
| `MONGO_URI` | MongoDB Atlas connection string |
| `JWT_SECRET` | Secret used to sign and verify JWTs |

Use the exact variable names your source code expects. Configure production secrets through your hosting provider's environment settings.

## 🌐 Deployment

Vibe can be deployed using separate hosting services:

- **Frontend:** [Vercel](https://vercel.com/)
- **Backend:** [Render](https://render.com/)
- **Database:** [MongoDB Atlas](https://www.mongodb.com/atlas)

Production deployment requires the frontend to use the deployed backend URL, appropriate CORS configuration, and a working Socket.IO connection.

## 🔮 Future Improvements

Potential improvements for future versions include:

- 📎 Image and file sharing
- 🟢 Online/offline presence indicators
- ✍️ Typing indicators
- ✅ Message delivery and read receipts
- 🔔 Improved notification handling
- 📱 Further mobile UI improvements
- 🔒 Additional security and session management

*These are possible future enhancements, not promises about the current version.*

## 🎯 Project Goal

Vibe was built as a hands-on full-stack development project to explore frontend development, backend APIs, authentication, database integration, global state management, and real-time communication.

## 🤝 Contributions

Suggestions, feedback, and contributions are welcome. Feel free to open an issue to discuss a bug or potential improvement.

---

**Built with ❤️ and JavaScript.**

*Thanks for checking out Vibe V1!*
