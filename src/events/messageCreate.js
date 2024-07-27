const { commands } = require('../commands');
const { PREFIX } = require('../constants');

/**
 * Handles the 'messageCreate' event, which is triggered when a new message is created in a Discord channel.
 * @param {Message} message - The message object representing the new message.
 */
const messageCreateHandler = async (message) => {
  if (message.author.bot) return; // Ignore messages from bots

  if (message.content.startsWith(PREFIX)) {
    const args = message.content.slice(PREFIX.length).trim().split(/ +/);
    const command = args.shift().toLowerCase();

    try {
      // Get the corresponding command handler from the 'commands' object.
      const commandHandler = commands[command];

      // Check if the command handler exists.
      if (!commandHandler) {
        await message.reply({ content: 'Invalid command!', ephemeral: true });
        return;
      }

      // Execute the command handler.
      await commandHandler(message, args);
    } catch (error) {
      console.error('Error executing command:', error);
      await message.reply({ content: 'An error occurred while executing the command.', ephemeral: true });
    }
  }
};

module.exports = { messageCreateHandler };