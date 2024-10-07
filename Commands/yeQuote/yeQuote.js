const axios = require('axios');

const yeQuoteCommand = async (channel, tags, args, client) => {
	let yeQuote
	let yeQuoteOptions = {
		url: 'https://api.kanye.rest/',
		headers: { Accept: 'application/json' },
	}

	try {
		const response = await axios(yeQuoteOptions)
		console.log('response: ', response)
		if (response.status === 200) {
			yeQuote = response.data
			client.say(channel, `"${yeQuote.quote}" - Kanye West 🐻`)
		} else {
			client.say(channel, "Algo anda muerto hoy. 💀")
		}
	} catch (error) {
		client.say(channel, "Algo anda muerto hoy. 💀")
	}
};

module.exports = {
	yeQuoteCommand: yeQuoteCommand,
};