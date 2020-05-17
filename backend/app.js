const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const app = express();

const loginRouter = require('./controllers/login');
const songRouter = require('./controllers/song');
const lyricsRouter = require('./controllers/lyrics');

require('dotenv').config();

// Serve static files from the React app
app.use(express.static(path.join(__dirname, '../frontend/dist')));

app.use(bodyParser.json());
app.use(cookieParser());

app.use('/login', loginRouter);
app.use('/song', songRouter);
app.use('/lyrics', lyricsRouter);

module.exports = app;
