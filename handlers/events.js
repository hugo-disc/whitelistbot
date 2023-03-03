const fs = require('node:fs');
const path = require('node:path');
const eventsPath = path.join(__dirname, '../src/events');
const eventFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith('.js'));

const eventHandler = async function(Bpcbot) {
    for (const file of eventFiles) {
        const filePath = path.join(eventsPath, file);
        const event = require(filePath);
        if (event.once) {
            Bpcbot.once(event.name, (...args) => event.execute(...args));
        } else {
            Bpcbot.on(event.name, (...args) => event.execute(...args));
        }
    }
}

module.exports = { eventHandler }
