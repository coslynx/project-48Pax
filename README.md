# Discord Music Bot

This is a Discord music bot built with Node.js and the Discord.js library. It allows users to request songs from YouTube, play, pause, resume, skip, and stop music playback. 

## Features

* **Music Playback:** Plays songs from YouTube.
* **Playback Controls:**
    * **!play:** Requests a song from YouTube.
    * **!pause:** Pauses playback.
    * **!resume:** Resumes playback.
    * **!skip:** Skips to the next song in the queue.
    * **!stop:** Stops playback and disconnects the bot from the voice channel.
* **Dedicated Control Channel:** Uses a designated text channel for all bot interactions. 
* **Simple Command Handling:** Easy-to-use commands for controlling the bot.

## Getting Started

1. **Clone the Repository:**
```bash
git clone https://github.com/your-username/discord-music-bot.git
```

2. **Install Dependencies:**
```bash
cd discord-music-bot
npm install
```

3. **Create a `.env` file:**
    * Copy the `.env.example` file to `.env`.
    * Replace the placeholder values with your Discord bot token, YouTube API key, and any other necessary credentials.

4. **Start the Bot:**
```bash
npm start
```

## Usage

1. **Add the bot to your Discord server:**
    * Go to [https://discord.com/api/oauth2/authorize?client_id=YOUR_CLIENT_ID&permissions=8&scope=bot](https://discord.com/api/oauth2/authorize?client_id=YOUR_CLIENT_ID&permissions=8&scope=bot) and replace `YOUR_CLIENT_ID` with your bot's client ID.
    * Choose the server you want to add the bot to and click "Authorize".

2. **Create a dedicated control channel for the bot.**

3. **Use the following commands in the control channel:**

    * **!play [YouTube URL]:** Plays the song from the given YouTube URL.
    * **!pause:** Pauses the current song.
    * **!resume:** Resumes the paused song.
    * **!skip:** Skips to the next song in the queue.
    * **!stop:** Stops playback and disconnects the bot from the voice channel.
    * **!help:** Displays a list of available commands.

## Project Structure

```
discord-music-bot
├── src
│   ├── commands
│   │   ├── play.js
│   │   ├── pause.js
│   │   ├── resume.js
│   │   ├── skip.js
│   │   ├── stop.js
│   │   └── help.js
│   ├── events
│   │   ├── ready.js
│   │   ├── messageCreate.js
│   │   ├── voiceStateUpdate.js
│   │   └── interactionCreate.js
│   ├── utils
│   │   ├── musicPlayer.js
│   │   └── config.js
│   └── index.js
├── .env
├── README.md
└── package.json

```

## Contributions

Contributions are welcome! Please open an issue or submit a pull request.

## License

This project is licensed under the MIT License.