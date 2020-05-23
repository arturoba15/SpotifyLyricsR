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
      let lyrics = $('.lyrics p').text(); 
      // Sometimes lyrics are inside a <script> tag
      if (lyrics === '') {
        const scriptTag = $('body > script:not([src])').html();
        const parsedJson = eval(scriptTag.substring(36, scriptTag.indexOf('window.__APP')));
        const lyricsObj = parsedJson.songPage.lyricsData.body;
        lyrics = lyricsObj.children[0].children.filter(e => typeof e === 'string').join('\n');
      }
      return lyrics;
    })
    .catch(res => {throw createError(422, 'Couldn\'nt find lyrics in HTML')});

exports.getBestHit = getBestHit;
exports.getLyrics = getLyrics;
