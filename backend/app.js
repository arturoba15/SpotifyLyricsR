const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const app = express();

const loginRouter = require('./controllers/login');

// Serve static files from the React app
app.use(express.static(path.join(__dirname, '../frontend/dist')));

app.use(bodyParser.json());

app.use('/api/login', loginRouter);

module.exports = app;