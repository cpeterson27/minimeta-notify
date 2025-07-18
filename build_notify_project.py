import os
from zipfile import ZipFile

base_dir = "minimeta-notify"
dirs = ["api", "workers", "channels", "queue", "public", "docs"]
        
files = {
    "README.md": """# MiniMeta Notify

A real-time notification system built with Node.js, Redis, and WebSockets to demonstrate system design skills for large-scale applications.

## Features
- Event queuing with Redis (BullMQ)
- Notification routing (email + WebSocket)
- Retry and backoff support
- Real-time in app delivery using Socket.IO
- REST APT to simulate events

## Architecture
User Action -> REST API -> Redis Queue -> Worker -> Email/WebSocket -> User

## Live Demo (WebSocket Viewer)
Open [http://localhost:3000](http://localhost:3000) and send a test event:
```bash
curl -X POST localhost:3000/api/send -H "Content-Type: application/json" -d '{"userId": "42", "event": "post_liked"}'
```  # ← closing triple-quotes end here
"""
}