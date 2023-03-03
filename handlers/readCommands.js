const fs = require('node:fs');
const path = require('node:path');
const { Collection } = require('discord.js');

const commandHandler = function loadCommands(collection, directory){

    const files = fs.readdirSync(directory);

    for (const file of files) { 
        const path=`${directory}/${file}`;
        
        if(file.endsWith('.js')){
            const command = require('.'+path);
            collection.set(command.data.name, command); 
        }
        else if(fs.lstatSync(path).isDirectory()){
            loadCommands(collection, path);
        }
    }
};

module.exports = { commandHandler }
