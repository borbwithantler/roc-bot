var Discord = require('discord.io');
var logger = require('winston');
const Ship = require('./Ship.js');
const ships = require('./ships.json');

// Configure logger settings
logger.remove(logger.transports.Console);
logger.add(logger.transports.Console, {
    colorize: true
});

logger.level = 'debug';

// Initialize Discord Bot
var bot = new Discord.Client({
   token: process.env.TOKEN,
   autorun: true
});

function listships(){
  let ship = new Ship('Wraith', 'Electron laser', 'Vorpal lance', 'Mega bomb')
  return string(ship.name + ship.weapon + ship.aura + ship.zen);
}

bot.on('ready', function (evt) {
    logger.info('Connected');
    logger.info('Logged in as: ');
    logger.info(bot.username + ' - (' + bot.id + ')');
    logger.info(listships());
});

bot.on('message', function (user, userID, channelID, message, evt) {
    // Our bot needs to know if it will execute a command
    // It will listen for messages that will start with `!`
    if (message.substring(0, 1) == '!') {
        var args = message.substring(1).split(' ');
        var cmd = args[0];

        args = args.splice(1);
        switch(cmd) {
            // !ping
            case 'ships':
                bot.sendMessage({
                    to: channelID,
                    message: "Test" + listships()
                });
            break;
            // Just add any case commands if you want to..
         }
     }
});
