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
  user: 'root',  // choose your user
  password: 'Arun123@', // choose your password
  database: 'comments_db'  // create your database
});

db.connect((err) => {  // to check if connected to MySQL database
  if (err) throw err;
  console.log('Connected to MySQL database');
});

// API to log in a user and generate a ID
app.post('/api/login', (req, res) => {
  const { username } = req.body;
  const sessionId = uuidv4(); // To generate a unique session ID
  res.json({ sessionId });
});

// API to fetch all comments from the database
app.get('/api/comments', (req, res) => {
  const query = 'SELECT * FROM comments ORDER BY timestamp DESC';
  db.query(query, (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

// API to post a new comment into the database
app.post('/api/comments', (req, res) => {
  const { username, comment } = req.body;
  const query = 'INSERT INTO comments (username, comment) VALUES (?, ?)';
  db.query(query, [username, comment], (err, results) => {
    if (err) throw err;
    const newComment = { id: results.insertId, username, comment, timestamp: new Date() };
    io.emit('newComment', newComment); // For Broadcasting new comment to all clients that are connected
    res.status(201).json(newComment);
  });
});


io.on('connection', (socket) => {
  console.log('user is connected');
  socket.on('disconnect', () => {
    console.log('user is disconnected');
  });
});

// Starting the server
server.listen(4000, () => {
  console.log('Server is running on http://localhost:4000');
});
