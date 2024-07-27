const { joinVoiceChannel, createAudioPlayer, createAudioResource, AudioPlayerStatus } = require('@discordjs/voice');
const ytdl = require('ytdl-core');
const { Client } = require('discord.js');

class MusicPlayer {
  constructor(client) {
    this.client = client;
    this.queue = [];
    this.currentSong = null;
    this.connection = null;
    this.audioPlayer = null;
  }

  /**
   * Adds a song to the queue and starts playback if no song is currently playing.
   * @param {Message} message - The message object containing the command.
   * @param {Object} songInfo - An object containing the song's title, artist, and URL.
   */
  async play(message, songInfo) {
    this.queue.push(songInfo);
    if (!this.currentSong) {
      await this.playNextSong(message);
    }
  }

  /**
   * Plays the next song in the queue.
   * @param {Message} message - The message object containing the command (optional).
   * @param {VoiceChannel} voiceChannel - The voice channel to join (optional).
   */
  async playNextSong(message, voiceChannel) {
    if (this.queue.length === 0) {
      return;
    }

    const songInfo = this.queue[0];
    this.currentSong = songInfo;

    try {
      const stream = ytdl(songInfo.url, { filter: 'audioonly' });
      const resource = createAudioResource(stream);

      if (!this.connection) {
        const channel = voiceChannel || (message && message.member.voice.channel);
        if (!channel) {
          throw new Error('Bot is not in a voice channel.');
        }
        this.connection = joinVoiceChannel({
          channelId: channel.id,
          guildId: channel.guild.id,
          adapterCreator: channel.guild.voiceAdapterCreator,
        });

        this.audioPlayer = createAudioPlayer();
        this.audioPlayer.on('stateChange', (oldState, newState) => {
          if (newState.status === AudioPlayerStatus.Idle && this.queue.length > 0) {
            this.queue.shift();
            this.playNextSong(message);
          }
        });

        this.connection.subscribe(this.audioPlayer);
      }

      this.audioPlayer.play(resource);

      if (message) {
        message.reply(`Now playing: ${songInfo.title} by ${songInfo.artist}`);
      }
    } catch (error) {
      console.error('Error playing song:', error);
      if (message) {
        message.reply('Error playing song. Please try again.');
      }
    }
  }

  /**
   * Pauses the current song.
   * @param {Message} message - The message object containing the command.
   */
  async pause(message) {
    if (this.audioPlayer && this.audioPlayer.state.status === AudioPlayerStatus.Playing) {
      this.audioPlayer.pause();
      if (message) {
        message.reply('Music paused!');
      }
    } else if (message) {
      message.reply('There is no music playing!');
    }
  }

  /**
   * Resumes the paused song.
   * @param {Message} message - The message object containing the command.
   */
  async resume(message) {
    if (this.audioPlayer && this.audioPlayer.state.status === AudioPlayerStatus.Paused) {
      this.audioPlayer.unpause();
      if (message) {
        message.reply('Music resumed!');
      }
    } else if (message) {
      message.reply('Music is not paused!');
    }
  }

  /**
   * Skips to the next song in the queue.
   * @param {Message} message - The message object containing the command.
   */
  async skip(message) {
    if (this.queue.length > 0) {
      this.queue.shift();
      await this.playNextSong(message);
      if (message) {
        message.reply('Skipped to the next song!');
      }
    } else if (message) {
      message.reply('There are no more songs in the queue!');
    }
  }

  /**
   * Stops music playback and disconnects the bot from the voice channel.
   * @param {Message|VoiceChannel} target - The message object containing the command or the voice channel to disconnect from.
   */
  async stop(target) {
    if (this.audioPlayer) {
      this.audioPlayer.stop();
      this.connection.destroy();
      if (target instanceof Client) {
        target.reply('Stopped playing music and disconnected!');
      } else if (target instanceof Message) {
        target.reply('Stopped playing music and disconnected!');
      }
      this.connection = null;
      this.audioPlayer = null;
      this.currentSong = null;
      this.queue.length = 0;
    } else if (target instanceof Message) {
      target.reply('There is no music playing!');
    }
  }
}

module.exports = { MusicPlayer };