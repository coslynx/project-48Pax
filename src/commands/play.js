const { musicPlayer } = require('../utils/musicPlayer');
const { youtubeApiKey } = require('../utils/config');
const ytdl = require('ytdl-core');

/**
 * Handles the `!play` command, fetching the song from YouTube and starting playback.
 * @param {Message} message - The message object containing the command.
 */
const playCommand = async (message) => {
  try {
    const youtubeUrl = message.content.split(' ')[1];

    // Validate the YouTube URL
    if (!ytdl.validateURL(youtubeUrl)) {
      message.reply('Please provide a valid YouTube URL!');
      return;
    }

    // Fetch song information from the YouTube Data API
    const info = await ytdl.getInfo(youtubeUrl);
    const songInfo = {
      title: info.videoDetails.title,
      artist: info.videoDetails.author.name,
      url: youtubeUrl,
    };

    // Play the song using the music player
    await musicPlayer.play(message, songInfo);
    message.reply(`Now playing: ${songInfo.title} by ${songInfo.artist}`);
  } catch (error) {
    console.error('Error playing song:', error);
    message.reply('Error playing song. Please try again.');
  }
};

module.exports = { playCommand };