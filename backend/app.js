const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const createError = require('http-errors');
const { addAsync } = require('@awaitjs/express');
const app = addAsync(express());

const loginRouter = require('./controllers/login');
const { retrieveLyrics } = require('./controllers/lyrics');

/* Handles controller execution
 * @param promise Promise returned by a controller
 * @param params A Function (req, res, next) that maps the
 * desired controller parameters. E.g. (req) => [req.params.username]
 */
const controllerHandler = (promise, params) => async (req, res, next) => {
  const boundParams = params ? params(req, res, next) : [];
  try {
    const result = await promise(...boundParams);
    if (result.at) {
      res.cookie('at', result.at, { httpOnly: true, overwrite: true });
      delete result.at;
    }
    return res.json(result || { message: 'OK' });
  } catch (error) {
    throw error;
  }
};
const ch = controllerHandler;

const loggedIn = (req, res, next) => {
  if (res.cookie['rt']) return next();
  res.end();
};

require('dotenv').config();

// Serve static files from the React app
app.use('/', express.static(path.join(__dirname, '../frontend/dist')));

app.use(bodyParser.json());
app.use(cookieParser());

app.use('/login', loginRouter);
app.getAsync('/lyrics', loggedIn, ch(retrieveLyrics, (req) => [req.cookies['at'], req.cookies['rt']]));

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({ 
    message: error.message,
    status: error.status
  });
});

module.exports = app;
