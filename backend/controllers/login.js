const queryString = require('querystring');
const loginRouter = require('express').Router();
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


module.exports = loginRouter;