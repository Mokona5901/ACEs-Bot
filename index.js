const { Client, Events, GatewayIntentBits, ActivityType, Intents } = require('discord.js');
//const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder } = require('@discordjs/builders');
const { token } = require('./config.json');
const fs = require('fs');
const ytdl = require('ytdl-core-discord');

// Create a new client instance
const client = new Client(
	{ 
		intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildVoiceStates] 
	}
	);

// When the client is ready, run this code (only once)
client.once(Events.ClientReady, c =>
	{
		console.log(`Ready! Logged in as ${c.user.tag}`);
		//client.user.setStatus('dnd');
		//client.user.setActivity('you', { type: "WATCHING" });
		client.user.setActivity('the postponed tourny', {
			type: ActivityType.Watching,
		  });
	}
);

// Log in to Discord with your client's token
client.login(token);


client.on('message', message => {
	if (message.mentions.has(c.user)) {
	  message.channel.send('Hey there!');
	}
  });

//Ping interaction
client.on('interactionCreate', async interaction =>
	{
		if (!interaction.isCommand()) return;

		if (interaction.commandName === 'ping')
			{	
				timeStamp = Date.now();
				await interaction.reply(`Pong! Command's latency is ${timeStamp - interaction.createdTimestamp} ms.`);
				var dateFormat = new Date(timeStamp);
				console.log(`${interaction.user.username} ran /${interaction.commandName} command at ${dateFormat} with a latency of ${timeStamp - interaction.createdTimestamp} ms`);
			}
	}
);

//Server interaction
client.on('interactionCreate', async interaction => 
	{
		if (!interaction.isCommand()) return;

		if (interaction.commandName === 'server')
			{
				await interaction.reply(`This server is ${interaction.guild.name} and has ${interaction.guild.memberCount} members.`);
				timeStamp = Date.now();
				var dateFormat = new Date(timeStamp);
				console.log(`${interaction.user.username} ran /${interaction.commandName} command at ${dateFormat} with a latency of ${timeStamp - interaction.createdTimestamp} ms`);
			}
	}
);

//User interaction
client.on('interactionCreate', async interaction =>
	{
		if (!interaction.isCommand()) return;

		if (interaction.commandName === 'user')
			{
				const user = interaction.options.getUser('user');
				await interaction.reply(`${user.username} joined on ${interaction.member.joinedAt}.`);
				timeStamp = Date.now();
				var dateFormat = new Date(timeStamp);
				console.log(`${interaction.user.username} ran /${interaction.commandName} command at ${dateFormat} with a latency of ${timeStamp - interaction.createdTimestamp} ms`);
			}
	}
);

//Rob-balls interaction
client.on('interactionCreate', async interaction =>
	{
		if (!interaction.isCommand()) return;

		if (interaction.commandName === 'rob-balls')
			{
				const user = interaction.options.getUser('user');
				await interaction.reply(`Stolen ${user.username} balls <:troll_blur:1075725167432585216>`);
				timeStamp = Date.now();
				var dateFormat = new Date(timeStamp);
				console.log(`${interaction.user.username} ran /${interaction.commandName} command at ${dateFormat} with a latency of ${timeStamp - interaction.createdTimestamp} ms`);
			}
	}
);

//Tournament interaction
client.on('interactionCreate', async interaction =>
	{
		if (!interaction.isCommand()) return;

		if (interaction.commandName === 'tournament')
			{
				const ownerRole = interaction.guild.roles.cache.find(role => role.name === 'Owner');
				if (interaction.member.roles.cache.has(ownerRole.id))
					{
						const title = interaction.options.getString('title');
        				const description = interaction.options.getString('description');
        				const participants = interaction.options.getInteger('participants').toString();
        				const startTime = interaction.options.getString('start_time');
						const tournamentEmbed = new EmbedBuilder()
						 	.addFields(
							{ name: 'ACEs Tournament #x', value: title },
							{ name: 'Description :', value: description },
							{ name: 'Number of contestants :', value: participants },
							{ name: 'Timestamp :', value: startTime });
						await interaction.reply({ embeds: [tournamentEmbed] });
					}
				else
					{
						await interaction.reply('You do not have permission to use this command!');
					}
			};
				timeStamp = Date.now();
				var dateFormat = new Date(timeStamp);
				console.log(`${interaction.user.username} ran /${interaction.commandName} command at ${dateFormat} with a latency of ${timeStamp - interaction.createdTimestamp} ms`);
	},
);

//tournament-status command
client.on('interactionCreate', async interaction =>
	{
		if (!interaction.isCommand()) return;

		if (interaction.commandName === 'news')
			{
				const tournamentEmbed = new EmbedBuilder()
				/*.setColor(
					{ value: "Purple" })*/
				.addFields(
                	{ name: '__ACEs Tournament #3__', value: ' ' },
                	{ name: '__Description :__', value: 'For that tournament, you will only be able to use event forms pokemons.' },
					{ name: '__Requirements :__', value: '> One Gmax Pokémon maximum\n > One Mega Pokémon maximum\n > One Legendary/Mythical Pokémon maximum\n > One Easter event Pokémon maximum / Non-event form with "Obtained from a Community Event" tag\n > God Pokémon are banned\n > No illegal pokemons allowed <:minion_stare:1070271546016399401>'},
                	{ name: '__Maximum number of contestants :__', value: '8' },
					{ name: '__Current number of contestants who entered :__', value: '3'},
                	{ name: '__When ?__', value: '<t:1683880200:F>' },
					{ name: '__Prizes__', value: '> 1st : Good IV Legendary/Mythical + 100k\n > 2nd : Mid IV Legendary/Mythical + 50k' });
				await interaction.reply({ embeds: [tournamentEmbed] });
			};
				timeStamp = Date.now();
				var dateFormat = new Date(timeStamp);
				console.log(`${interaction.user.username} ran /${interaction.commandName} command at ${dateFormat} with a latency of ${timeStamp - interaction.createdTimestamp} ms`);
	},
);

//reminder command
const reminders = new Map();

function setReminder(time, message, userId) {
  const reminderTime = new Date(time);
  const currentTime = new Date();

  if (reminderTime <= currentTime) {
    return 'Invalid reminder time. Please provide a future time.';
  }

  const timeDifference = reminderTime.getTime() - currentTime.getTime();

  const reminder = setTimeout(() => {
    const user = client.users.cache.get(userId);
    user.send(`⏰ Reminder: ${message}`);
    reminders.delete(userId);
  }, timeDifference);

  reminders.set(userId, reminder);
  return 'Reminder set successfully!';
}

function clearReminder(userId) {
  if (reminders.has(userId)) {
    clearTimeout(reminders.get(userId));
    reminders.delete(userId);
    return 'Reminder cleared successfully!';
  }
  return 'You have no active reminders.';
}

client.on('interactionCreate', async (interaction) => {
  if (!interaction.isCommand()) return;

  if (interaction.commandName === 'reminder') {
    const time = interaction.options.getString('time');
    const message = interaction.options.getString('message');
    const userId = interaction.user.id;

    if (time && message) {
      const response = setReminder(time, message, userId);
      await interaction.reply(response);
    } else {
      await interaction.reply('Invalid command usage. Please provide both time and message.');
    }
  } /*else if (interaction.commandName === 'clearreminder') {
    const userId = interaction.user.id;
    const response = clearReminder(userId);
    await interaction.reply(response);
  }*/
});


//play command
client.on('interactionCreate', async interaction =>
	{
		if (!interaction.isCommand()) return;

		if (interaction.commandName === 'play')
			{

  
				// Check if the user is in a voice channel
				if (!interaction.member.voice.channel) {
	 			 	await interaction.reply('You need to be in a voice channel to play music!');
	  				return;
					}
  
				// Join the voice channel
				const connection = await interaction.member.voice.channel.join();
  
				// Get the video URL from the slash command arguments
				const url = interaction.options.getString('url');
  
				// Play the YouTube audio stream in the voice channel
				const stream = await ytdl(url, { filter: 'audioonly' });
				const dispatcher = connection.play(stream, { type: 'opus' });
  
				dispatcher.on('start', () => {
	 			console.log('Playing audio in the voice channel!');
				interaction.reply('Now playing: ' + url);
				});
  
				dispatcher.on('finish', () => {
	  			console.log('Finished playing audio!');
	  			interaction.member.voice.channel.leave();
				});
  
				dispatcher.on('error', (err) => {
	  			console.error(err);
	  			interaction.member.voice.channel.leave();
				});
  			};
  });






//Error handler
client.on('message', (msg) => {
	// Your message handling code
  });
  
  client.on('error', (error) => {
	console.error('Discord client error:', error);
  });
  
  process.on('unhandledRejection', (error) => {
	console.error('Unhandled promise rejection:', error);
  });
  
  process.on('uncaughtException', (error) => {
	console.error('Uncaught exception:', error);
	process.exit(1); // Exit with error code 1
  });