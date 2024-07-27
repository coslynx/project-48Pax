const { musicPlayer } = require('../utils/musicPlayer');

/**
 * Handles the `!pause` command, pausing the current song.
 * @param {Message} message - The message object containing the command.
 */
const pauseCommand = async (message) => {
  try {
    await musicPlayer.pause(message);
    message.reply('Music paused!');
  } catch (error) {
    console.error('Error pausing music:', error);
    message.reply('Error pausing music. Please try again.');
  }
};

module.exports = { pauseCommand };