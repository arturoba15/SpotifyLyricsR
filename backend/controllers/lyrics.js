const { getBestHit, getLyrics } = require('../services/lyrics');
const { getNewAccessToken, currentSong } = require('../services/spotify');
const retryOnce = require('../util/retry');

const retrieveLyrics = async (accessToken, refreshToken) =>
  (async () => await retryOnce(
    async (newAt) => {
      const song = await currentSong(newAt || accessToken);
      const hit = await getBestHit(song.title, song.artist);
      const lyrics = await getLyrics(hit.url);
      return {
        ...hit,
        lyrics: lyrics,
        at: newAt
      };
    },
    refresh,
    refreshToken
  ))()

function refresh(err, refreshToken) {
  if (err.response)
    if (err.response.status === 401)
      return getNewAccessToken(refreshToken);
  return Promise.reject(err);
}

exports.retrieveLyrics = retrieveLyrics;
