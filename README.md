# 🔔 MiniMeta Notify

A real-time notification system using **Node.js**, **BullMQ**, **Redis**, **Socket.IO**, and **WebSockets** — built to scale like Meta.

This project shows how to queue and deliver user notifications (email + browser) asynchronously using modern backend architecture.

![screenshot](https://raw.githubusercontent.com/your-username/minimeta-notify/main/docs/screenshot.png)

[Link} (https://minimeta-notify.onrender.com/)

---

## ✨ Features

- ⚡ Real-time browser notifications via WebSockets
- 📨 Email notifications (mocked with `nodemailer`)
- ⏱ Job queueing with BullMQ + Redis
- 📡 Redis pub/sub for cross-process communication
- 🌐 Frontend viewer UI with live notification stream
- 🔁 Ready to deploy on [Render](https://render.com)

---

## 🚀 Quick Start (Local)

> Requires Node.js (v18+), Redis, and npm.

```bash
git clone https://github.com/your-username/minimeta-notify.git
cd minimeta-notify
npm install
