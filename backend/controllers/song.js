const { addAsync } = require('@awaitjs/express');
const songRouter = addAsync(require('express').Router());
const axios = require('axios');
const spotifyService = require('../services/spotify');

// Try to get the currently played song
songRouter.getAsync('/', async (req, res) => {
  const accessToken = req.cookies['at'];
  let config = {
    headers : {
    'Authorization': `Bearer ${accessToken}`
    }
  };
  const url = 'https://api.spotify.com/v1/me/player/currently-playing';

  const response = await axios.get(url, config)
    .catch(async () => {
      const refresh_token = req.cookies['rt'];
      const accessToken = await spotifyService.getNewAccessToken(refresh_token);
      res.cookie('at', accessToken, { httpOnly: true, overwrite: true });
      res.redirect('/song');
    });

  if (response.status === 200) {
    if (response.data === '')
      res.json({ error: 'No song is playing' });
    else
      res.json({
        name: response.data.item.name,
        artist: response.data.item.artists[0].name
      });
  } else {
    res.json({ error: 'No song is playing' });
  }
});

module.exports = songRouter;
