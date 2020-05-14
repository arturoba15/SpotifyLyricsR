const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const app = express();

const loginRouter = require('./controllers/login');

require('dotenv').config();

// Serve static files from the React app
app.use(express.static(path.join(__dirname, '../frontend/dist')));

app.use(bodyParser.json());
app.use(cookieParser());

app.use('/api/login', loginRouter);

module.exports = app;
