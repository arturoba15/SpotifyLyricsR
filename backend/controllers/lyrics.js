const { addAsync } = require('@awaitjs/express');
const lyricsRouter = addAsync(require('express').Router());
const axios = require('axios');

lyricsRouter.getAsync('/', async (req, res) => {
  console.log('cool');
  const song = await axios.get('/song');
  const config = {
    headers: {
      'Authorization': `Bearer ${process.env.GENIUS_AT}`
    }
  };
  const url = "https://api.genius.com/search?q=" + song.artist + ' ' + song.name;

  const response = await axios.get(url, config);

  res.json(response);

});

module.exports = lyricsRouter;
