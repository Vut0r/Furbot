require('dotenv').config();
const axios = require('axios');
const getUserID = require('./getUserID');
const twitchHeader = require('./header');

const clipCommand = async (channel, client) => {
  const userID = await getUserID.getUserID();
  const url = `https://api.twitch.tv/helix/clips?broadcaster_id=${userID}`;

  try {
    const response = await axios.post(url, twitchHeader.twitchHeader);
    const res = await response.data;
    if (res.data === undefined || res.data.length == 0) {
      return -1;
    } else if (res.status == 401) {
      return -2;
    } else if (res.data !== undefined && res.data[0].id !== undefined) {
      console.log(res.data);
      const url = res.data[0].edit_url;
      client.say(channel, `${url}`);
    }
  } catch (e) {
    console.log(e);
  }
}

module.exports = {
  clipCommand: clipCommand,
}