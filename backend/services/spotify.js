const axios = require('axios');
const queryString = require('querystring');

const getNewAccessToken = async (refreshToken) => {
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

  let response = await axios.post('https://accounts.spotify.com/api/token', data, config);
  return response.data.access_token;
};

// Gets the current song played by the user
const currentSong = async (accessToken) => {
  let config = {
    headers : {
      'Authorization': `Bearer ${accessToken}`
    }
  };
  const url = 'https://api.spotify.com/v1/me/player/currently-playing';
  const res = await axios.get(url, config);
  
  if (res.status === 200) {
    if (res.data === '')
      return { error: 'No song is playing' };
    else
      return {
        name: res.data.item.name,
        artist: res.data.item.artists[0].name
      };
  } else {
    return { error: 'No song is playing' };
  }
};

exports.getNewAccessToken = getNewAccessToken;
exports.currentSong = currentSong;
