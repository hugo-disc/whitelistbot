const { Client, GatewayIntentBits, Collection } = require('discord.js');
const { commandHandler } = require('./handlers/readCommands.js')
const { eventHandler } = require('./handlers/events.js');
const config = require('./src/utils/config.json')

const Whitelistbot = new Client({
	intents: [GatewayIntentBits.Guilds, GatewayIntentBits.DirectMessages, GatewayIntentBits.MessageContent, GatewayIntentBits.GuildMessages, GatewayIntentBits.GuildMembers ],
	partials: ['MESSAGE', 'REACTION', 'CHANNEL']
});

Whitelistbot.commands = new Collection()
commandHandler(Whitelistbot.commands, './src/commands')
eventHandler(Whitelistbot)

process.on('unhandledRejection', (err) => {
    console.log(err)
}).on('uncaughtException', (err) => {
    console.log(err)
})

Whitelistbot.login(config.bot_token)
