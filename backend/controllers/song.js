const { currentSong, getNewAccessToken } = require('../services/spotify');
const retryOnce = require('../util/retry');

const getCurrentSong = async (accessToken, refreshToken) =>
  (async () => await retryOnce(currentSong, refresh, accessToken, refreshToken))();

function refresh(err, refreshToken) {
  if (err.response.status == 401)
    return getNewAccessToken(refreshToken);
  else
    return Promise.reject(err);
}

exports.getCurrentSong = getCurrentSong;
