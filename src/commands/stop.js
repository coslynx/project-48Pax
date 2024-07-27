const { musicPlayer } = require('../utils/musicPlayer');

/**
 * Handles the `!stop` command, stopping music playback and disconnecting the bot from the voice channel.
 * @param {Message} message - The message object containing the command.
 */
const stopCommand = async (message) => {
  try {
    await musicPlayer.stop(message);
    message.reply('Stopped playing music and disconnected!');
  } catch (error) {
    console.error('Error stopping music:', error);
    message.reply('Error stopping music. Please try again.');
  }
};

module.exports = { stopCommand };