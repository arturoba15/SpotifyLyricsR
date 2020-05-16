const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const app = express();

const loginRouter = require('./controllers/login');
const songRouter = require('./controllers/song');

require('dotenv').config();

// Serve static files from the React app
app.use(express.static(path.join(__dirname, '../frontend/dist')));

app.use(bodyParser.json());
app.use(cookieParser());

// app.use((req, res, next) => {
//   if (req.cookies['rt']) {
//     if (req.cookies['at']) {
//     // Try to get currently played song 
//       res.redirect('/song');
//     }
//   } else {
//     // Show '/'
//   }
//   next();
// });

app.use('/login', loginRouter);
app.use('/song', songRouter);

module.exports = app;
