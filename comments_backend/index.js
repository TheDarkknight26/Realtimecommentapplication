// index.js
const express = require('express');
const cors = require('cors');
const http = require('http');
const { Server } = require('socket.io');
const mysql = require('mysql2');
const { v4: uuidv4 } = require('uuid');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"]
  }
});

app.use(cors());
app.use(express.json());


const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Arunesh9110@',
  database: 'comments_db'
});

db.connect((err) => {
  if (err) throw err;
  console.log('Connected to MySQL database');
});

// API to log in a user (just generates a session ID)
app.post('/api/login', (req, res) => {
  const { username } = req.body;
  const sessionId = uuidv4(); // Generate a unique session ID
  res.json({ sessionId });
});

// API to fetch all comments
app.get('/api/comments', (req, res) => {
  const query = 'SELECT * FROM comments ORDER BY timestamp DESC';
  db.query(query, (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

// API to post a new comment
app.post('/api/comments', (req, res) => {
  const { username, comment } = req.body;
  const query = 'INSERT INTO comments (username, comment) VALUES (?, ?)';
  db.query(query, [username, comment], (err, results) => {
    if (err) throw err;
    const newComment = { id: results.insertId, username, comment, timestamp: new Date() };
    io.emit('newComment', newComment); // Broadcast new comment to all clients
    res.status(201).json(newComment);
  });
});

// Real-time comments via Socket.IO
io.on('connection', (socket) => {
  console.log('A user connected');
  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});

// Start server
server.listen(4000, () => {
  console.log('Server is running on http://localhost:4000');
});
