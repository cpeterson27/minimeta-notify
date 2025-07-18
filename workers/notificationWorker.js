import { Worker } from "bullmq";
import Redis from "ioredis";
import nodemailer from "nodemailer";

const redisConnection = new Redis({ maxRetriesPerRequest: null });
const redisPub = new Redis({ maxRetriesPerRequest: null }); // For publishing

const worker = new Worker(
  "notifications",
  async (job) => {
    const { userId, event } = job.data;

    console.log(`Sending notification to user ${userId}: ${event}`);

    const transporter = nodemailer.createTransport({
      jsonTransport: true,
    });

    await transporter.sendMail({
      from: '"MiniMeta" <no-reply@minimeta.com>',
      to: `user${userId}@example.com`,
      subject: `Notification: ${event}`,
      text: `You have a new event: ${event}`,
    });

    // 👉 Publish to Redis pub/sub
    await redisPub.publish(
      "notifications",
      JSON.stringify({
        userId,
        message: `You have a new ${event}`,
      })
    );
  },
  { connection: redisConnection }
);

worker.on("completed", (job) => {
  console.log(`Job ${job.id} completed`);
});

worker.on("failed", (job, err) => {
  console.error(`Job ${job.id} failed:`, err);
});
