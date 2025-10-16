# 🎓 Devora - Registration & Automation Backend

Devora is a Node.js-based backend designed to automate student registration and seamlessly connect a website with **Discord**, **Email**, and **Google Sheets** — all in real time.

---

## ✨ Features

| Feature | Description |
|---------|-------------|
| ✅ **REST API for User Registration** | Accepts registration data (`name`, `email`, `phoneNumber`) via `/api/users` |
| 🤖 **Integrated Discord Bot** | Sends registration notifications directly to a private Discord channel |
| 📩 **Automatic Email Confirmation** | Sends a confirmation email to the registered student |
| 🧾 **Google Sheets Sync** | Appends every registration into a Google Spreadsheet (`students` sheet) |
| 📌 **Pinned Discord Registration Button** | The bot auto-creates and pins a “Register” button in a public channel |
| 💬 **DM-Based Registration Forwarding** | If a user DMs the bot, their message gets forwarded to the staff channel |

---

## 🏗 Tech Stack

| Component | Technology |
|-----------|------------|
| Backend Framework | Express.js |
| Discord Integration | discord.js (Bot + Interaction Buttons) |
| Email Service | Nodemailer |
| Google Spreadsheet Integration | `googleapis` (Service Account) |
| Deployment Ready | Supports both Localhost & Cloud Hosting |

---

## 🚀 How It Works (Flow)

1. User fills registration form on the website **OR** messages the bot directly.
2. Backend:
   - Saves / processes request.
   - **Sends data to Discord private channel.**
   - **Appends user to Google Sheets.**
   - **Sends a confirmation email.**
3. Admin receives instant notification o
