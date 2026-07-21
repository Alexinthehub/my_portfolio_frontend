# 🚀 Alex Mwendwa — Full-Stack Portfolio

Welcome to my personal portfolio website! This is more than just a static page — it's a **full-stack, interactive web application** that I built from scratch to showcase my work, share my journey, and connect with the world.

---

## 📖 What Is This?

Think of this as my **digital home on the internet**. It's a place where you can:

- Learn who I am and what I do
- See the projects I've built
- Follow what I'm currently working on
- View my certificates and achievements
- Send me a message directly
- (If you're me) Manage all the content easily through a private admin dashboard

Whether you're a recruiter, a fellow developer, a potential client, or just curious — this site gives you everything you need to know about me and my work.

---

## ✨ What Can You Do Here?

### For Visitors (Everyone)

| Section | What It Does |
| :--- | :--- |
| **Home** | Introduces me — my name, title, photo, and a short "Who am I?" section. It's the first impression. |
| **Projects** | A gallery of my portfolio projects. Each card shows the project name, description, tech stack, and links to the live demo and GitHub repo. |
| **Vision** | Two things: (1) **Current Projects** — what I'm working on right now (you can even leave a ⭐ on projects you like). (2) **Certificates** — my formal achievements, with "Verify" links where applicable. |
| **Contact** | A simple form where you can send me a message. It goes directly to my email, so I can reply quickly. |

### For Me (Admin)

| Feature | What It Does |
| :--- | :--- |
| **Admin Dashboard** | A private area where I can update everything — my profile, skills, projects, certificates, and even view messages people send me. |
| **Secure Login** | Only I can access the dashboard. It uses a secure login system with a username and password. |

---

## 🛠️ How Does It Work? (For the Curious)

Even if you're not a developer, here's a simple breakdown of how the site works behind the scenes:

### The Big Picture

Imagine three main parts working together:

1. **The Website You See (Frontend)** — This is what you're looking at right now. It's built with React and runs in your browser.
2. **The Brain (Backend)** — A server that processes requests, handles logins, and manages data. It's built with Node.js and Express.
3. **The Memory (Database)** — Where all the information is stored — my name, projects, messages, certificates, etc. It's hosted on MongoDB Atlas (a cloud database).

┌─────────────────┐ ┌─────────────────┐ ┌─────────────────┐
│ Your Browser │ ──▶ │ The Server │ ──▶ │ Database │
│ (Frontend) │ ◀── │ (Backend) │ ◀── │ (MongoDB) │
└─────────────────┘ └─────────────────┘ └─────────────────┘


### A Typical Visit

1. You open the website → Your browser loads the React app.
2. The app asks the server for my profile data.
3. The server fetches it from the database and sends it back.
4. The app displays it on the screen.
5. When you send a message, the app sends it to the server, which saves it in the database and forwards it to my email.

---

## 📸 Screenshots

### Homepage

*(Screenshot of your homepage goes here)*

### Projects Page

*(Screenshot of your projects page goes here)*

### Vision Page

*(Screenshot of your vision page goes here)*

### Contact Page

*(Screenshot of your contact page goes here)*

### Admin Dashboard

*(Screenshot of your admin dashboard goes here)*

---

## 🗺️ A Quick Tour of the App

### 1. Home

The homepage introduces me with a hero section containing:
- "HI THERE" heading
- "I am Alex Mwendwa" with an orange glow
- A Full Stack Developer and Problem Solver title
- A short "Who am I?" bio
- A list of my technical skills (JavaScript, React, Python, etc.)
- Social links (GitHub, LinkedIn, X, Discord) in the footer

### 2. Projects

This page displays all my portfolio projects. Each project card includes:
- A screenshot/thumbnail (if available)
- Project title and description
- Tech stack badges
- "Live Demo" and "GitHub" links

### 3. Vision

This page has two main sections:
- **Current Projects**: Projects I'm actively working on. Visitors can leave a ⭐ to show support.
- **Certificates**: My formal certifications and achievements, with "Verify" links where applicable.

### 4. Contact

A clean form with fields for:
- Your Name
- Your Email
- Your Message

After submitting, I receive an email notification and the message is saved in the database.

### 5. Admin Dashboard (Private)

After logging in, I can:
- **Edit Profile**: Update my name, title, bio, skills, languages, avatar, resume link, and social links.
- **Add/Manage Projects**: Add new portfolio projects with title, description, tech stack, images, and links.
- **Add/Manage Current Projects**: Add projects for the Vision page with status and repo URL.
- **Add/Manage Certificates**: Add certificates with title, issuer, date, category, image, and verify URL.
- **View Contact Messages**: See all messages sent through the contact form.

---

## 🚀 Running the App Locally

If you're a developer and want to run this on your own machine, here's how:

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/my_portfolio_frontend.git
cd my_portfolio_frontend

2. Install Dependencies
bash
npm install
3. Set Up Environment Variables
Create a .env file in the root folder:

env
VITE_API_URL=http://localhost:5001/api
4. Start the Development Server
bash
npm run dev
Open http://localhost:5173 in your browser.

🛠️ Tech Stack
Category	Technologies Used
Frontend	React (with Vite), Tailwind CSS, Axios, React Router
Backend	Node.js, Express.js, MongoDB, Mongoose, JWT, Nodemailer
Hosting	Vercel (Frontend), Render (Backend), MongoDB Atlas (Database)
🌐 Deployment
This app is deployed on two platforms:

Frontend → Vercel — hosts the website itself.

Backend → Render — hosts the server and API.

Database → MongoDB Atlas — hosts the data.

All deployments are connected to GitHub, so every time I push changes, the site updates automatically.

📬 Contact
Email: alexandermwendwa3@gmail.com

GitHub: github.com/Alexinthehub

LinkedIn: linkedin.com/in/yourusername

🧠 About This Project
I built this portfolio as a way to:

Showcase my skills and projects in a professional way

Learn full-stack development by building something real

Have a single place where people can learn about me and contact me

Practice modern web development tools and practices

This project was built from the ground up over several weeks. It includes everything from design to deployment — a truly complete full-stack application.

📝 License
This project is open source and available under the MIT License.

Built with ❤️ by Alex Mwendwa

Thank you for visiting! 🚀