const { REST, Routes } = require('discord.js');
const { clientId, guildId } = require('../src/utils/config.json');
const fs = require('node:fs');
require('dotenv').config()

const commands = [];
loadCommands('./src/commands')
function loadCommands(directory) {

	const files = fs.readdirSync(directory)
	for (const file of files) { 
        const path=`${directory}/${file}`;
        
        if(file.endsWith('.js')){
            const command = require('.'+path);
            commands.push(command.data.toJSON())
        }
        else if(fs.lstatSync(path).isDirectory()){
            loadCommands(path);
        }
	}
}

const rest = new REST({ version: '10' }).setToken(process.env.BOT_TOKEN);

const funcao = (async () => {
	try {
		console.log(`[RELOAD] Comecei a carregar ${commands.length} slashCommands.`);


		const data = await rest.put(
			Routes.applicationGuildCommands(clientId, guildId),
			{ body: commands },
		);

		console.log(`Carregados ${data.length} comandos.`);
	} catch (error) {
		console.error(error);
	}
})();
