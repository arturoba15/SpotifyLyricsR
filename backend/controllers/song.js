const songRouter = require('express').Router();
const axios = require('axios');
const queryString = require('querystring');

// Try to get the currently played song
songRouter.get('/', async (req, res, next) => {
  let config = {
    headers : {
    'Authorization': `Bearer ${req.cookies['at']}`
    }
  };

  try {
    const url = 'https://api.spotify.com/v1/me/player/currently-playing';
    const response = await axios.get(url, config);
    if (response.data == '')
      res.send("No song is playing");
    res.json(response.data);
  } catch (error) {
    if (error.response.status == 401) {
      if (req.cookies['rt']) { // Refresh the token
         getNewAccessToken(req.cookies['rt'], res).then(e => {if (e) res.redirect('/song')});
      }
      // ELSE Not authenticated
    }
  }
});

// Returns true if it gets a new access token
async function getNewAccessToken(refresh_token, res) {
  let encodedClient = Buffer.from(`${process.env.CLIENT_ID}:${process.env.CLIENT_SECRET}`);
  let data = queryString.stringify({
    grant_type: 'refresh_token',
    refresh_token: refresh_token 
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
      res.cookie('at', response.data.access_token, { httpOnly: true, overwrite: true });
      return true;
    }
  } catch (error) {
    return false;
  }
}

module.exports = songRouter;
