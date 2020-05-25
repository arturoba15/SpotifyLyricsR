const axios = require('axios');
const queryString = require('querystring');
const createError = require('http-errors');

const getNewAccessToken = async refreshToken => {
  let encodedClient = Buffer.from(`${process.env.CLIENT_ID}:${process.env.CLIENT_SECRET}`);
  let data = queryString.stringify({
    grant_type: 'refresh_token',
    refresh_token: refreshToken 
  });
  
  let config = {
    headers: {
      'Authorization': `Basic ${encodedClient.toString('base64')}`
    },
    responseType: 'json'
  };
  return axios.post('https://accounts.spotify.com/api/token', data, config)
    .then(res => res.data.access_token);
};

// Gets the current song played by the user
const currentSong = async accessToken => {
  let config = {
    headers : {
      'Authorization': `Bearer ${accessToken}`
    }
  };
  const url = 'https://api.spotify.com/v1/me/player/currently-playing';
  return axios.get(url, config)
  .then(res => {
  if (res.status === 200) {
    if (res.data === '') {
      throw createError(400, 'No song is playing');
    } else {
      if (res.data.item)
        return {
          title: res.data.item.name,
          artist: res.data.item.artists[0].name,
          img: res.data.item.album.images[1].url
        };
      throw createError(400, 'This is not a valid song');
    }
  } else {
    throw createError(400, 'No song is playing');
  }
  })
  .catch(e => {throw createError(e.status, e)});
  
};

exports.getNewAccessToken = getNewAccessToken;
exports.currentSong = currentSong;
