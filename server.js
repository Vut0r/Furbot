//dependencias
require('dotenv').config();

const tmi = require('tmi.js');

const {
    commandList
} = require('./command-list/commandList');

let userCommandHistory = {};
const COMMAND_REPEAT_LIMIT = 10;

const client = new tmi.Client({
    connection: {
        reconnect: true
    },
    identity: {
        username: process.env.TWITCH_BOT_USERNAME,
        password: process.env.TWITCH_OAUTH_TOKEN
    },
	channels: [ process.env.TWITCH_CHANNEL_NAME ]
});

try {
    client.connect();
} catch (error) {
    console.log(error);
}

//Timer & antiChambi Start
let interval;
client.on('chat', (channel, userstate, message, self) => {
    if (self) return

    const msg = message.split(' ')
    if (msg[0].toLowerCase() === '$loop') {

      if (interval) { // Check if set
        console.log('stop $loop')
        clearInterval(interval) // delete Timer
        interval = false
      } else {
        console.log('start $loop')
        interval = setInterval(function () {
          client.say(channel, 'jaythe88Goofy Únete a mi Furbysecta: https://discord.gg/Guqtj2mGbe jaythe88Goofy') // client.say(channel, msg[1]) // ?
        }, 300000) // 60000ms = 60s = 1min
      }

    }
});
//Timer End

//Sanciones por el lol
client.on('chat', (channel, userstate, message, self) => {
    console.log(`Message "${message}" received from ${userstate['display-name']}`)

	let leagueTalk = message.toLowerCase().includes('aram') || message.toLowerCase().includes('league of legends')

	if (leagueTalk) {

		if (userstate['display-name'].toLowerCase() === 'santigonzauwu') {

			client.say(channel, `@${userstate['display-name']} QUIERETE DOS PESOS. pepeAgony pepeAgony pepeAgony`)
			return
		}
		client.say(channel, `@${userstate['display-name']} Callate el hocico porfa. No hables de eso. pepeAgony pepeAgony pepeAgony`)
	}
});

client.on('message', (channel, tags, message, self) => {

	if (self || !message.startsWith('-')) {
		return
	}

	const args = message.slice(1).split(' ')
	const command = args.shift().toLowerCase()

	if (command in commandList) {
		if (!userCommandHistory[tags.username]) {
			userCommandHistory[tags.username] = []
		}

		let history = userCommandHistory[tags.username]

		if (
			history.length >= COMMAND_REPEAT_LIMIT &&
			history.every((hist) => hist === command)
		) {
			client.say(
				channel,
				`@${tags.username}, Usa otro comandoantes de usar este de nuevo.`
			)
		} else {
			commandList[command](channel, tags, args, client)
			history.push(command)

			if (history.length > COMMAND_REPEAT_LIMIT) {
				history.shift()
			}
		}
	}


});