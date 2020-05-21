const { addAsync } = require('@awaitjs/express');
const queryString = require('querystring');
const loginRouter = addAsync(require('express').Router());
const axios = require('axios');
const csurf = require('csurf');
const createError = require('http-errors');

const csrfMiddleware = csurf({ cookie: true });
const redirect_uri = process.env.URI || 'http://localhost:5000/login/response';
const stateKey = 'spotify_auth_state';

const enterIfNotLoggedIn = (req, res, next) => {
  (req.cookies['rt']) ? res.redirect('/') : next()
};

// Request authorization
loginRouter.get('/', enterIfNotLoggedIn, csrfMiddleware, (req, res) => {
  let scope = 'user-read-currently-playing';

  // Use the csrfToken() as a state for the spotify auth
  let csrfToken = req.csrfToken();
  res.cookie(stateKey, csrfToken, { httpOnly: true });

  res.redirect('https://accounts.spotify.com/authorize/?' + 
    queryString.stringify({
      client_id: process.env.CLIENT_ID,
      response_type: 'code',
      redirect_uri: redirect_uri,
      scope: scope,
      state: csrfToken
    }))
});

// Try to get an access token
loginRouter.getAsync('/response', enterIfNotLoggedIn , async (req, res, next) => {
  let code = req.query.code || null;
  let state = req.query.state || null;
  let storedState = req.cookies[stateKey] ? req.cookies[stateKey] : null;
  
  // Check if the cookie comes from the same browser
  if (state !== null && state === storedState) {
    res.clearCookie(stateKey);
    // Exchange the code for an access token
    let encodedClient = Buffer.from(`${process.env.CLIENT_ID}:${process.env.CLIENT_SECRET}`);
    // Data must be encoded in application/x-www-form-urlencoded
    let data = queryString.stringify({
      grant_type: 'authorization_code',
      redirect_uri: redirect_uri,
      code: code
    });
    let config = {
      headers: {
        'Authorization': `Basic ${encodedClient.toString('base64')}`
      },
      responseType: 'json'
    };

    let response = await axios.post('https://accounts.spotify.com/api/token', data, config)

    if (response.data.refresh_token) {
      // Store tokens
      res.cookie('loggedIn', true, { overwrite: true });
      res.cookie('at', response.data.access_token, { httpOnly: true, overwrite: true });
      res.cookie('rt', response.data.refresh_token, { httpOnly: true, overwrite: true });
      res.redirect('/');
    } else {
      throw createError(503, 'Spotify request unavailable');
    }
  } else {
    throw createError(401, 'Bad state');
  }
});

module.exports = loginRouter;
