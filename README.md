

# 🎵 **Musify — A Modern Spotify Clone with Chat & Admin Panel**

A full-stack music streaming application built with **React, TypeScript, Tailwind, Zustand** on the frontend and **Node.js, Express, MongoDB, Socket.IO** on the backend.
Musify offers core Spotify-like features plus a **real-time chat system**, **admin panel**, and full CRUD music management.

---

## 🚀 **Features**

### 🎧 **User Features**

* Play/Pause, Next/Previous, Seek, Shuffle, Repeat
* Browse music, albums, and artists
* Real-time chat with friends (Socket.IO)
* User authentication (Register/Login)
* Personal playlists (optional)
* Responsive UI, modern design (Tailwind + shadcn)

### 🛠️ **Admin Panel**

* Add new music tracks
* Manage albums
* Edit/Delete songs
* Manage users
* Admin-protected routes (RBAC)

### 💬 **Real-time Chat**

* 1:1 private messaging
* Typing indicators
* Online/offline user presence
* Message persistence in MongoDB
* Delivered/Seen indicators (if implemented)

---

## 🧰 **Tech Stack**

### **Frontend**

* **React + TypeScript**
* **Tailwind CSS**
* **shadcn/UI**
* **Zustand** (global state)
* **React Router**
* **Axios**
* HTML5 `<audio>` for music playback

### **Backend**

* **Node.js**
* **Express.js**
* **MongoDB (Mongoose)**
* **Socket.IO** (real-time chat)
* **JWT Authentication**
* **Multer / Cloudinary / S3** (for audio uploads — depending on implementation)

### **Tools & Utilities**

* Zod/express-validator (optional validation)
* Bcrypt (password hashing)
* CORS
* dotenv

---

## 📁 **Folder Structure**

### **Monorepo Example**

```
musify/
├── client/               # React + TS frontend
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── store/        # Zustand stores
│   │   ├── hooks/
│   │   ├── utils/
│   │   └── assets/
│   └── package.json
│
└── server/               # Node + Express backend
    ├── src/
    │   ├── controllers/
    │   ├── models/
    │   ├── routes/
    │   ├── middleware/
    │   ├── sockets/
    │   └── utils/
    ├── package.json
    └── .env
```

---

# ⚙️ **Backend Setup**

### 1. Clone repo

```bash
git clone https://github.com/yourusername/musify.git
cd musify/server
```

### 2. Install dependencies

```bash
npm install
```

### 3. Create `.env` file

```
MONGO_URI=your_mongo_uri
JWT_SECRET=your_secret_key
CLOUDINARY_KEY=optional
CLOUDINARY_SECRET=optional
PORT=5000
```

### 4. Run server

```bash
npm run dev
```

---

# 🖥️ **Frontend Setup**

### 1. Move into client folder

```bash
cd ../client
```

### 2. Install dependencies

```bash
npm install
```

### 3. Run frontend

```bash
npm run dev
```

---

# 🔌 **API Overview**

### **Auth**

* `POST /api/auth/register`
* `POST /api/auth/login`

### **Music**

* `GET /api/tracks`
* `GET /api/tracks/:id`
* `POST /api/tracks` *(admin only)*
* `DELETE /api/tracks/:id` *(admin only)*

### **Albums**

* `GET /api/albums`
* `POST /api/albums` *(admin only)*

### **Users**

* `GET /api/users` *(admin)*
* `PATCH /api/users/:id` *(admin)*

---

# 🔊 **Socket.IO Events**

### Client → Server

```js
socket.emit("join-room", roomId);
socket.emit("send-message", { roomId, text });
socket.emit("typing", { roomId });
```

### Server → Client

```js
io.to(roomId).emit("receive-message", messageObj);
io.to(roomId).emit("user-typing", userId);
```

---

# 🛡️ **Security**

* JWT authentication
* Role-based access control (admin vs user)
* Password hashing with bcrypt
* CORS protected
* Input validation
* Rate limiting (optional)

---

# 📸 **Screenshots** *(Add yours here)*

```
/screenshots/
    home.png
    player.png
    album.png
    admin.png
    chat.png
```

---

# 🚀 **Future Enhancements**

* Group chats
* Live activity feed (what friends are listening to)
* Lyrics display
* Search & filters
* Playlist sharing
* Full mobile app
* Music streaming with buffering optimization

---



Just tell me!
