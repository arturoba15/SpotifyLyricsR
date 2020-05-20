const axios = require('axios');
const htmlParser2 = require('htmlparser2');

const getBestHit = async (title, artist) => {
  const config = {
    headers: {
      'Authorization': 'Bearer ' + process.env.GENIUS_AT
    }
  };
  const url = `https://api.genius.com/search?q=${encodeURIComponent(title + ' ' + artist)}`;
  return axios.get(url, config)
    .then(res =>  {
      const bestHit = res.data.response.hits[0].result;
      if (bestHit.title.toUpperCase() === title.toUpperCase()) {
        return {
            url: bestHit['url'],
            img: bestHit['song_art_image_thumbnail_url'],
            title: bestHit['title'],
            artist: bestHit['primary_artist']['name']
        }
      } else {
        return { error: 'No lyrics available'}
      }
    }
    );
};

const getLyrics = async url => {
  const config = {
    headers: {
      'Authorization': 'Bearer ' + process.env.GENIUS_AT
    }
  };
  const lyricsUrl = `https://api.genius.com/search?q=${encodeURIComponent(name + ' ' + artist)}`;
  return axios.get(url, config)

};

exports.getBestHit = getBestHit;
exports.getLyrics = getLyrics;
