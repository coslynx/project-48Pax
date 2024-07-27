const { musicPlayer } = require('../utils/musicPlayer');

/**
 * Handles the 'voiceStateUpdate' event, which is triggered when a user's voice state changes.
 * @param {VoiceState} oldState - The user's previous voice state.
 * @param {VoiceState} newState - The user's current voice state.
 */
const voiceStateUpdateHandler = async (oldState, newState) => {
  // Check if the user joined or left a voice channel
  if (oldState.channel !== newState.channel) {
    // User joined a voice channel
    if (newState.channel) {
      // Check if the bot is already in a voice channel
      if (musicPlayer.connection) {
        // Check if there are songs in the queue
        if (musicPlayer.queue.length > 0) {
          // Start playing the next song in the queue
          await musicPlayer.playNextSong(newState.channel);
        }
      }
    } else if (oldState.channel) {
      // User left a voice channel
      // Check if the bot is the only one left in the channel
      if (oldState.channel.members.size === 1 && oldState.channel.members.has(musicPlayer.client.user.id)) {
        // Disconnect the bot from the voice channel
        await musicPlayer.stop(oldState.channel);
      }
    }
  }
};

module.exports = { voiceStateUpdateHandler };