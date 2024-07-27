const { Client, IntentsBitField } = require('discord.js');
const { joinVoiceChannel, createAudioPlayer, createAudioResource, AudioPlayerStatus } = require('@discordjs/voice');
const ytdl = require('ytdl-core');
const dotenv = require('dotenv');
const { PREFIX } = require('./constants');

dotenv.config();

const client = new Client({ intents: [IntentsBitField.Flags.Guilds, IntentsBitField.Flags.GuildVoiceStates, IntentsBitField.Flags.GuildMessages] });

const queue = [];
let currentSong = null;
let connection = null;
let audioPlayer = null;

client.on('ready', () => {
  console.log(`${client.user.tag} is ready!`);
});

client.on('messageCreate', async (message) => {
  if (message.author.bot) return;

  if (message.content.startsWith(PREFIX)) {
    const args = message.content.slice(PREFIX.length).trim().split(/ +/);
    const command = args.shift().toLowerCase();

    switch (command) {
      case 'play':
        if (!message.member.voice.channel) {
          message.reply('You need to be in a voice channel to play music!');
          return;
        }

        const songUrl = args[0];
        if (!songUrl) {
          message.reply('Please provide a YouTube URL!');
          return;
        }

        queue.push(songUrl);
        if (!currentSong) {
          await playNextSong(message);
        }
        break;

      case 'pause':
        if (audioPlayer && audioPlayer.state.status === AudioPlayerStatus.Playing) {
          audioPlayer.pause();
          message.reply('Music paused!');
        } else {
          message.reply('There is no music playing!');
        }
        break;

      case 'resume':
        if (audioPlayer && audioPlayer.state.status === AudioPlayerStatus.Paused) {
          audioPlayer.unpause();
          message.reply('Music resumed!');
        } else {
          message.reply('Music is not paused!');
        }
        break;

      case 'skip':
        if (queue.length > 0) {
          queue.shift();
          await playNextSong(message);
          message.reply('Skipped to the next song!');
        } else {
          message.reply('There are no more songs in the queue!');
        }
        break;

      case 'stop':
        if (audioPlayer) {
          audioPlayer.stop();
          connection.destroy();
          message.reply('Stopped playing music and disconnected!');
          connection = null;
          audioPlayer = null;
          currentSong = null;
          queue.length = 0;
        } else {
          message.reply('There is no music playing!');
        }
        break;

      default:
        message.reply('Invalid command!');
        break;
    }
  }
});

async function playNextSong(message) {
  if (queue.length === 0) {
    return;
  }

  const songUrl = queue[0];
  currentSong = songUrl;

  const voiceChannel = message.member.voice.channel;

  try {
    const stream = ytdl(songUrl, { filter: 'audioonly' });
    const resource = createAudioResource(stream);

    if (!connection) {
      connection = joinVoiceChannel({
        channelId: voiceChannel.id,
        guildId: voiceChannel.guild.id,
        adapterCreator: voiceChannel.guild.voiceAdapterCreator,
      });

      audioPlayer = createAudioPlayer();
      audioPlayer.on('stateChange', (oldState, newState) => {
        if (newState.status === AudioPlayerStatus.Idle && queue.length > 0) {
          queue.shift();
          playNextSong(message);
        }
      });

      connection.subscribe(audioPlayer);
    }

    audioPlayer.play(resource);

    message.reply(`Now playing: ${await getSongInfo(songUrl)}`);
  } catch (error) {
    console.error('Error playing song:', error);
    message.reply('Error playing song. Please try again.');
  }
}

async function getSongInfo(songUrl) {
  try {
    const info = await ytdl.getInfo(songUrl);
    return `${info.videoDetails.title} by ${info.videoDetails.author.name}`;
  } catch (error) {
    console.error('Error getting song info:', error);
    return 'Unknown Song';
  }
}

client.login(process.env.DISCORD_TOKEN);