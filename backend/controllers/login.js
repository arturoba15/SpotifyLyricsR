const queryString = require('querystring');
const loginRouter = require('express').Router();
const axios = require('axios');
const utils = require('../utils');

const redirect_uri = process.env.URI || 'http://localhost:5000/api/login/response';
const stateKey = 'spotify_auth_state';

// Request authorization
loginRouter.get('/', (req, res) => {
  let scope = 'user-read-currently-playing';
  let state = utils.generateRandomString(16);
  res.cookie(stateKey, state);

  res.redirect('https://accounts.spotify.com/authorize/?' + 
    queryString.stringify({
      client_id: process.env.CLIENT_ID,
      response_type: 'code',
      redirect_uri: redirect_uri,
      scope: scope,
      state: state
    }))
});

// Try to get an access token
loginRouter.get('/response', async (req, res, next) => {
  let code = req.query.code || null;
  let state = req.query.state || null;
  let storedState = req.cookies ? req.cookies[stateKey] : null;

  // Check if the cookie comes from the same browser
  if (state !== null && state === storedState) {
    res.clearCookie(stateKey);

    // Exchange the code for an access token
    let encodedClient = Buffer.from(`${process.env.CLIENT_ID}:${process.env.CLIENT_SECRET}`);
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

    try {
      let response = await axios.post('https://accounts.spotify.com/api/token', data, config);
      if (response.status === 200) {
        console.log(response.data.access_token);
        console.log(response.data.refresh_token);
        // Store tokens
      }
    } catch (error) {
      return next(error);
    }
  } else {

  }
});

module.exports = loginRouter;