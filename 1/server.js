const express = require('express');
const mongoConnect = require('./config/db');

const server = express();

mongoConnect();

//Init Middleware
server.use(express.json({ extended: true }));//Add This statement to initialise middleware

//Start Page
server.get('/', (req, res) => {
  res.send('API RUNNING')
});

//Define Routes
server.use('/api/users', require('./routes/api/users'));

server.use('/api/auth', require('./routes/api/auth'));

server.use('/api/profile', require("./routes/api/profile"));

server.use('/api/post', require('./routes/api/posts'));

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  console.log(`Server running at ${PORT}`);
});



