const { PREFIX } = require('../constants');

/**
 * Handles the `!help` command, sending a message with the list of available commands.
 * @param {Message} message - The message object containing the command.
 */
const helpCommand = async (message) => {
  const helpMessage = `**Available Commands:**\n\n` +
    `**${PREFIX}play [YouTube URL]:** Plays the song from the given YouTube URL.\n` +
    `**${PREFIX}pause:** Pauses the current song.\n` +
    `**${PREFIX}resume:** Resumes the paused song.\n` +
    `**${PREFIX}skip:** Skips to the next song in the queue.\n` +
    `**${PREFIX}stop:** Stops playback and disconnects the bot from the voice channel.\n` +
    `**${PREFIX}help:** Displays this help message.`;

  await message.channel.send(helpMessage);
};

module.exports = { helpCommand };