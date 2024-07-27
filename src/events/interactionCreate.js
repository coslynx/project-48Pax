const { commands } = require('../commands');

/**
 * Handles the 'interactionCreate' event, which is triggered when a user interacts with a slash command.
 * @param {Interaction} interaction - The interaction object representing the user's interaction.
 */
const interactionCreateHandler = async (interaction) => {
  if (!interaction.isChatInputCommand()) return;

  const commandName = interaction.commandName;
  const args = interaction.options;

  try {
    // Get the corresponding command handler from the 'commands' object.
    const commandHandler = commands[commandName];

    // Check if the command handler exists.
    if (!commandHandler) {
      await interaction.reply({ content: 'Invalid command!', ephemeral: true });
      return;
    }

    // Execute the command handler.
    await commandHandler(interaction, args);
  } catch (error) {
    console.error('Error executing command:', error);
    await interaction.reply({ content: 'An error occurred while executing the command.', ephemeral: true });
  }
};

module.exports = { interactionCreateHandler };