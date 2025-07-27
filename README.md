# 🚀 SmartDrive – Secure File Storage System

SmartDrive is a modern, secure, and responsive file storage web application that enables users to upload, view, delete and logout files using an intuitive dashboard. It integrates **AWS S3** for file storage and uses **JWT-based authentication** to ensure secure access.

---

## 🧠 Project Overview

- 🔐 **Authentication:** Register and login functionality with JWT token storage in `localStorage`.
- ☁️ **File Upload:** Upload files securely to AWS S3 via backend API.
- 📂 **File List View:** View uploaded files with support for metadata.
- 🗑️ **File Delete:** Delete files securely from AWS S3.
- 📱 **Responsive UI:** Mobile-first, modern interface with dark mode toggle.

---

## 🛠️ Tech Stack

### Frontend (Next.js + Tailwind CSS)

- Next.js 15+ (App Router)
- Tailwind CSS
- Lucide icons
- JWT (stored in `localStorage`)
- Responsive

### Backend (Node.js + Express + MongoDB)

- Node.js + Express.js
- MongoDB (for user and file metadata)
- JWT for authentication
- AWS SDK for S3 integration
- CORS for security

---

## 🧪 Features Checklist

| Feature               | Status |
| --------------------- | ------ |
| Register/Login        | ✅     |
| JWT-based Auth Flow   | ✅     |
| Upload Files to S3    | ✅     |
| View Uploaded Files   | ✅     |
| Delete Files from S3  | ✅     |
| Mobile Responsive UI  | ✅     |
| Environment Variables | ✅     |

---

## 🚀 Setup Instructions

### 1. Clone the Repo

```bash
git clone https://github.com/dipankarmajumdar/smartdrive.git
cd smartdrive
```

## Setup Backend

```bash
cd server
npm install
```

## 👉 Create a .env file in /server with:

```bash
PORT=5000
MONGO_URI=mongodb://localhost:27017/smartdrive
JWT_SECRET=your_jwt_secret
REFRESH_TOKEN_SECRET=your_jwt_refresh_token
AWS_ACCESS_KEY_ID=your_aws_key
AWS_SECRET_ACCESS_KEY=your_aws_secret
AWS_REGION=your_aws_region
AWS_BUCKET_NAME=your_bucket_name
```

### Start Backend:

```bash
npm run dev
```

## Setup Frontend

```bash
cd client
npm install
```

## 👉 Create .env.local in /frontend:

```bash
NEXT_PUBLIC_API_URL=http://localhost:5000
```

## Start Frontend:

```bash
npm run dev
```

## 📡 API Documentation

```bash
Base URL: http://localhost:5000/api
```

## 🧾 Auth Routes

```bash
| Method | Endpoint         | Description             |
| ------ | ---------------- | ----------------------- |
| POST   | `/auth/register` | Register new user       |
| POST   | `/auth/login`    | Login and get JWT token |
```

#### Request Body (JSON):

```bash
{
  "email": "user@example.com",
  "password": "your_password"
}
```

## 📁 File Routes (Protected via Bearer Token)

```bash
| Method | Endpoint                        | Description                |
| ------ | ------------------------------- | -------------------------- |
| POST   | `/auth/upload`                  | Upload file to S3          |
| GET    | `/auth/files`                   | Get list of user's files   |
| DELETE | `/auth/files/:id?filename=name` | Delete file by ID and name |
```

## 🔐 Auth Header Example:

```bash
Authorization: Bearer <your_token_here>
```
