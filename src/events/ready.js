const { Events } = require('discord.js');

module.exports = {
	name: Events.ClientReady,
	once: true,
	async execute(client) {
        const { funcao } = require('../../handlers/registryCommands')
        funcao
		console.log(`[BOT] Estou online com sucesso!`);
	},
};
