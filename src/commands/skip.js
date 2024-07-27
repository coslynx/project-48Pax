const { musicPlayer } = require('../utils/musicPlayer');

/**
 * Handles the `!skip` command, skipping to the next song in the queue.
 * @param {Message} message - The message object containing the command.
 */
const skipCommand = async (message) => {
  try {
    await musicPlayer.skip(message);
    message.reply('Skipped to the next song!');
  } catch (error) {
    console.error('Error skipping song:', error);
    message.reply('Error skipping song. Please try again.');
  }
};

module.exports = { skipCommand };