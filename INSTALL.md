# ⚙️ virtForce Installation & Setup Guide

Ensure your host meets these prerequisites:
- Docker Engine >= 20.10.x
- Docker Compose v2
- Node.js >= 18.x (for development / local mode)

---

## 🛠️ Step-by-Step Installation

### 1. Clone & Position
Clone the repository and jump into the workspace directory:
```bash
git clone https://github.com/virtforce/virtforce.git
cd virtforce
```

### 2. Configure Environment Parameters
Copy the example environment parameters into an active `.env` file:
```bash
cp .env.example .env
```
Open `.env` in your editor and provide your Gemini API key:
```env
# Server secret tokens - NEVER share these or commit to Git
GEMINI_API_KEY=your_gemini_api_key_here

# Social Messenger Integration Webhooks
TELEGRAM_BOT_TOKEN=
WHATSAPP_VERIFY_TOKEN=
```

### 3. Build & Boot with Docker
Launch the orchestrator and insulated micro-containers:
```bash
docker-compose up --build
```
This builds standard images for the DEV, QA, and MKT layers and boots the central Express controller at port `3000`.

---

## 💻 Local Developer (No Docker) Run Mode

If you are developing locally and want to run tasks without setting up Docker sandboxes, run:
```bash
# Ingest developer dependencies
npm install

# Start development full-stack proxy (Vite & Express server)
npm run dev
```
Open **`http://localhost:3000`** in your browser. All agent loops will execute using localized node child-process workers on your machine.

---

## 🤖 Configuring Live Messenger Webhooks

### Connecting and Testing a Telegram Bot
1. Contact `@BotFather` on Telegram to register a new bot and take down your bot token.
2. Store the token inside your `.env` file.
3. Configure your bot's webhook URL to your deployment gateway:
   ```bash
   curl -F "url=https://your-public-host.com/api/gateways/inbound" https://api.telegram.org/bot<YOUR_TOKEN>/setWebhook
   ```
4. Send your active bot `/status` or `/help` and verify real-time log ingestion:
