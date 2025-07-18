import express from "express";
import http from "http";
import { Server } from "socket.io";
import { Queue } from "bullmq";
import Redis from "ioredis";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const server = http.createServer(app);
const io = new Server(server);

const redisConnection = new Redis({
  maxRetriesPerRequest: null,
});

const notificationQueue = new Queue("notifications", {
  connection: redisConnection,
});

app.use(express.json());
app.use(express.static("public"));

io.on("connection", (socket) => {
  console.log("User connected:", socket.id);
});

app.post("/api/send", async (req, res) => {
  const { userId, event } = req.body;
  if (!userId || !event) {
    return res.status(400).json({ error: "userId and event required" });
  }
  await notificationQueue.add("notify", { userId, event });
  res.json({ status: "Notification queued" });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

const redisSubscriber = new Redis({ maxRetriesPerRequest: null });

redisSubscriber.subscribe("notifications", () => {
  console.log("Subscribed to notifications channel");
});

redisSubscriber.on("message", (channel, message) => {
  if (channel === "notifications") {
    const data = JSON.parse(message);
    console.log("📡 Sending to clients:", data);
    io.emit("notification", data); // Emit to all connected WebSocket clients
  }
});
