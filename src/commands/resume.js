const { musicPlayer } = require('../utils/musicPlayer');

/**
 * Handles the `!resume` command, resuming playback of the paused song.
 * @param {Message} message - The message object containing the command.
 */
const resumeCommand = async (message) => {
  try {
    await musicPlayer.resume(message);
    message.reply('Music resumed!');
  } catch (error) {
    console.error('Error resuming music:', error);
    message.reply('Error resuming music. Please try again.');
  }
};

module.exports = { resumeCommand };