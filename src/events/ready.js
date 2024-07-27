const { client } = require('../index');

/**
 * Handles the 'ready' event, which is triggered when the bot is ready to connect to Discord.
 * @param {Client} client - The Discord client object.
 */
const readyHandler = async (client) => {
  console.log(`${client.user.tag} is ready!`);
};

module.exports = { readyHandler };