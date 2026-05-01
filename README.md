# 💇‍♂️ Stylora – Salon Appointment Booking System

🚀 Stylora is a modern full-stack salon appointment booking web application that allows users to explore services, book appointments, and make secure payments seamlessly.

---

## 🌐 Live Demo

👉 https://stylora-six.vercel.app

---

## 🚀 Features

### 👤 User Side

* 🏠 Attractive & Responsive Home Page
* 💅 Browse All Services & Top Services
* 📅 Book Appointments with Time Slot Selection
* 👤 Update User Profile
* 🔐 Forgot Password & Authentication System
* 💳 Online Payment (Stripe / Razorpay) + Cash on Visit
* 📞 About & Contact Pages

---

### 🛠️ Admin Panel

* 📊 Dashboard Overview
* ➕ Add / ✏️ Update / ❌ Delete Services
* 🔄 Activate / Deactivate Services
* 📅 Appointment Management:

  * ✅ Accept
  * ❌ Reject
  * ✔️ Mark as Completed

---

## 📧 Email System

Stylora includes a fully functional email notification system:

* 📩 Appointment Booking Confirmation Email
* 🔔 Appointment Status Updates (Accepted / Rejected / Completed)
* 🔐 Password Reset Email

**Tech Used:**

* Nodemailer (SMTP Integration)

---

## 🧑‍💻 Tech Stack

**Frontend:**

* React.js
* Tailwind CSS

**Backend:**

* Node.js
* Express.js

**Database:**

* MongoDB

**Other:**

* JWT Authentication
* Stripe / Razorpay Payment Gateway
* ImageKit (for image handling)
* Nodemailer (Email Service)

---

## 📁 Project Structure

```
/frontend   → User Panel (React)
/backend    → Server (Node + Express)
/admin      → Admin Dashboard
```

---

## ⚙️ Installation & Setup

### 1️⃣ Clone Repository

```bash
git clone https://github.com/rahulparmar09/Stylora.git
cd Stylora
```

### 2️⃣ Install Dependencies

```bash
# frontend
cd frontend
npm install

# backend
cd ../backend
npm install

# admin
cd ../admin
npm install
```

### 3️⃣ Run Project

```bash
# backend
npm run dev

# frontend
npm run dev

# admin
npm run dev
```

---

## 🔐 Environment Variables

Create a `.env` file in **backend** folder and add:

```
PORT=your_port
MONGODB_URL=your_mongodb_connection_string
IMAGEKIT_PRIVATE_KEY=your_imagekit_private_key
JWT_SECRET=your_jwt_secret

ADMIN_EMAIL=admin@example.com
ADMIN_PASSWORD=admin123

STRIPE_SECRET_KEY=your_stripe_secret_key
RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_KEY_SECRET=your_razorpay_key_secret

EMAIL=your_email
PASS=your_email_password
```

---

## 📌 Future Improvements

* ⭐ Reviews & Ratings System
* 📱 Better Mobile Optimization
* 🎯 AI-based Service Recommendations

---

## 📬 Contact

* 💼 GitHub: https://github.com/rahulparmar09

---

**Made with ❤️ by Stylora**
