const { addAsync } = require('@awaitjs/express');
const songRouter = addAsync(require('express').Router());
const axios = require('axios');
const queryString = require('querystring');

// Try to get the currently played song
songRouter.getAsync('/', async (req, res, next) => {
  let config = {
    headers : {
    'Authorization': `Bearer ${req.cookies['at']}`
    }
  };

    const url = 'https://api.spotify.com/v1/me/player/currently-playing';
    const response = await axios.get(url, config)
      .catch(e => {
        if (req.cookies['rt']) { // Refresh the token
          return getNewAccessToken(req.cookies['rt'], res)
            .then(gotNewToken => {
              if (gotNewToken)
                res.redirect('/song');
              throw new Error('User needs to log-in');
            });
        } else {
          throw new Error('User needs to log-in');
        }
      });

    if (response.status === 200) {
      if (response.data === '')
        res.send('No song is playing');
      else
        res.json(response.data);
    } else {
      res.send('No song is playing');
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
