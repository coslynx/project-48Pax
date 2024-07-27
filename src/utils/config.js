require('dotenv').config();

module.exports = {
  prefix: process.env.PREFIX || '!',
  youtubeApiKey: process.env.YOUTUBE_API_KEY,
};