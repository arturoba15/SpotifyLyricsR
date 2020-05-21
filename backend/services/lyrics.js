const axios = require('axios');
const cheerio = require('cheerio');
const createError = require('http-errors');

// Gets the best hit on a lyric search on Genius
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
        throw createError(404, `No lyrics found for ${title}`);
      }
    }
    );
};

// Parse the HTML response by Genius
const getLyrics = async url =>
  axios.get(url)
    .then(res => {
      const $ = cheerio.load(res.data);
      const lyrics = $('.lyrics p').text(); 
      // Sometimes the lyrics are inside <meta> tags for some reason
      if (lyrics === '') throw createError(422, 'Couldn\'nt find lyrics in HTML');
      return lyrics;
    });

exports.getBestHit = getBestHit;
exports.getLyrics = getLyrics;
