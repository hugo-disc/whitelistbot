const { Events } = require('discord.js');

module.exports = {
	name: Events.InteractionCreate,
	once: false,
	async execute(interaction) {

        if(interaction.isChatInputCommand()) {
            const command = interaction.client.commands.get(interaction.commandName);

            if (!command) {
                console.error(`Nenhum comando encontrado.`);
                return;
            }

            try {
                await command.execute(interaction);
            } catch (error) {
                console.error(error);
                await interaction.reply({ content: 'Não consegui executar este comando!', ephemeral: true });
            }
        }
	},
};
