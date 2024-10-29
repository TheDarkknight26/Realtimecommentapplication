# Real-Time Comments System

A simple real-time comments system built with Next.js, Node.js, MySQL, and Socket.IO. Users can log in, post comments, and view new comments in real time.

## Table of Contents

1. [Project Structure](#project-structure)
2. [Technologies Used](#technologies-used)
3. [Setup and Installation](#setup-and-installation)
   - [Backend Setup](#backend-setup)
   - [Frontend Setup](#frontend-setup)
   - [Database Setup](#database-setup)
4. [How to Run](#how-to-run)
5. [Features](#features)


---

## Project Structure

```bash
root/
├── comments_backend/
# Backend (Node.js + Express + Socket.IO)
├── comments_frontend/
# Frontend (Next.js + MUI)
└── README.md
```


## Technologies Used

- **Frontend**: Next.js, Material UI (MUI), Axios
- **Backend**: Node.js, Express, MySQL, Socket.IO
- **Database**: MySQL

---

## Setup and Installation

### Prerequisites

Ensure you have the following installed:
- Node.js v18.18.0 or later
- MySQL server
- npm (Node Package Manager)

### Backend Setup

1. **Navigate to the backend directory**:
   ```bash
   cd Realtimecommentapplication/comments_backend
   npm i
   ```
2. **Configure your MySQL connection inside comments_backend/index.js**:
     ```bash
     const db = mysql.createConnection({
     host: 'localhost',
     user: 'your_mysql_user',
     password: 'your_mysql_password',
     database: 'comments_db',
     });
    ```
3. **Run the backend server**
   ```bash
   node index.js
   ```
### Frontend Setup

1. **Navigate to the frontend directory**:
  ```bash
    cd Realtimecommentapplication/comments_frontend
  ```
2. **Install dependencies** :
   ```bash
   npm install
   ```
3. **Run the Next.js development server:**
   ```bash
   npm run dev
   ```

### The frontend should be accessible at http://localhost:3000

### Database setup

1. **Open MySQL**:
   ```bash
   mysql -u root -p
   ```
2. **Create the database**:
   ```bash
   CREATE DATABASE comments_db;
   USE comments_db;
   ```
3. **Create the comments table**:
   ```bash
   CREATE TABLE comments (
   id INT AUTO_INCREMENT PRIMARY KEY,
   username VARCHAR(255),
   comment TEXT,
   timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
   );
   ```
4. Exit MySQL
   ```bash
   exit;
   ```

### How to Run
 **Start the backend server**:
 ```bash
 cd Realtimecommentapplication/comments_backend
 node index.js
 ```
**Start the frontend server**:
```bash
cd Realtimecommentapplication/comments_frontend
npm run dev
```

### Access the app:

**Visit http://localhost:3000 to see the real-time comments system**.
**Login with a username, post comments, and see new comments appear in real-time**.

   
### Features
  **User login with a simple username field**.
  
  **Real-time comments using Socket.IO**.'
  
  **Comments stored and retrieved from MySQL database**.
  
  **Responsive, mobile-friendly UI with Material UI**.










