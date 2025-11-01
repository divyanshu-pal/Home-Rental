# 🏡 Dream Nest

> “Wherever life takes you, live in the moment and create lasting memories.”

Dream Nest is a **full-stack vacation rental platform** built using the **MERN stack**.  
It allows users to explore, publish, and book vacation stays effortlessly — featuring a **host onboarding system**, **Razorpay payment integration**, and a **clean, modern UI** inspired by Airbnb.

---

## 🚀 Live Demo
🔗 [Add your deployed link here]

---

## ✨ Features

### 🧭 User Features
- 🔍 **Search & Explore** top categories like *Beachfront, Windmills, Islands,* and more  
- 🏠 **Detailed Listings** with images, amenities, highlights, and pricing  
- 📅 **Booking Calendar** to select start and end dates  
- 💳 **Razorpay Payment Gateway Integration** *(Test Mode)*  
- 🧾 **Dynamic Price Calculation** based on number of nights  
- 🧑‍💻 **User Authentication** *(Future Ready)*  

---

### 🧑‍🍳 Host Features
- 🏗️ **Join as a Host** to publish listings through a multi-step form  
- 🧾 **Add Property Details**, amenities, highlights, images, and pricing  
- 🏡 **Manage Your Properties** easily with an intuitive UI  
- 📤 **Upload Photos** directly from the device  

---

## 👤 User Account & Dashboard

Dream Nest provides a **dedicated user menu** that dynamically changes based on authentication status.

### 🔐 Before Login
- **Login** – Access your Dream Nest account  
- **Sign Up** – Create a new account in seconds  
- *(Note: Users can explore and book listings even before login.)*

### 🏠 After Login
Once the user is signed in, the menu expands to include personalized options:
- Trip List  
- Wish List  
- Property List  
- Reservation List  
- Become a Host  
- Log Out  

---

## 🏠 Home Page
Explore categories like **Beachfront**, **Countryside**, **Castles**, etc.

![Home Page](https://github.com/user-attachments/assets/6511f452-3362-428f-8fd2-7627f23591e7)

---

## 🧑‍💼 Join as a Host
A **multi-step form** for adding new property listings.

![Join as a Host](https://github.com/user-attachments/assets/61c32177-a828-4317-9ae5-99e2b64b926c)

---

## 📋 Listing Details Page
View all property details, amenities, highlights, and booking form.

![Listing Details](https://github.com/user-attachments/assets/3cf879c5-7f94-4b77-ac60-c681bdcc6dec)

---

## 💳 Razorpay Payment Page
Secure payments with **UPI, cards, net banking, and EMI options**.

![Razorpay Payment Page](https://github.com/user-attachments/assets/fc06aa8c-f311-460a-88e3-ec65b13d403d)

---

## 🔑 Signup Page

![Signup Page](https://github.com/user-attachments/assets/000da3bc-b990-4fc0-b7a5-6d14bc65dd17)

---

## 🔐 Login Page

![Login Page](https://github.com/user-attachments/assets/050d6a01-816c-485e-9458-0647672a3749)

---

## 🧭 User Menu (Dropdown)
The **user dropdown menu** dynamically updates based on login status.

### Before Login
- Login  
- Sign Up  

### After Login
- Trip List  
- Wish List  
- Property List  
- Reservation List  
- Become A Host  
- Log Out  

---

## 🛠️ Tech Stack

| Category | Technology |
|-----------|-------------|
| Frontend | React.js, SCSS, React Router |
| Backend | Node.js, Express.js |
| Database | MongoDB Atlas |
| Payment Integration | Razorpay (Test Mode) |
| State Management | React Hooks |
| Deployment | [Add hosting platform: Vercel / Render / Netlify / etc.] |

---

## ⚙️ Setup Instructions

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/dream-nest.git
   cd server
   Install dependencies
   npm i
   npm start
   
   cd client
   Install dependencies
   npm i
   npm start

Create a .env file in the root directory and include:
MONGO_URI=your_mongodb_connection_string
RAZORPAY_KEY_ID=your_razorpay_key
RAZORPAY_SECRET_KEY=your_razorpay_secret
