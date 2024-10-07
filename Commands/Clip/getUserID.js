require('dotenv').config();
const axios = require('axios');
const twitchHeader = require('./header');

const getUserID = async () => {
    const url = `https://api.twitch.tv/helix/users?login=${process.env.TWITCH_CHANNEL_NAME}`;
    try {
      const response = await axios.get(url, twitchHeader.twitchHeader);
      
      const res = await response.data;
      
      if (res.data === undefined || res.data.length == 0) {
      
        return -1;
      } else if (res.data !== undefined && res.data[0].id !== undefined) {
      
        const userID = res.data[0].id;
        return userID;
      }
    } catch (e) {
        
        console.log(e);
    }
}

module.exports = {
    getUserID: getUserID,
}