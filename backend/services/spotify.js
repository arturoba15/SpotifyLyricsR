const axios = require('axios');
const queryString = require('querystring');

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
    if (res.data === '')
      throw new Error('No song is playing');
    else
      return {
        title: res.data.item.name,
        artist: res.data.item.artists[0].name
      };
  } else {
    throw new Error('No song is playing');
  }
  });
  
};

exports.getNewAccessToken = getNewAccessToken;
exports.currentSong = currentSong;
