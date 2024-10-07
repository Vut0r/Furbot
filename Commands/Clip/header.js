const axios = require(axios);


const getOAuth = async () => {
  const url = `https://id.twitch.tv/oauth2/authorize?response_type=code&client_id=${process.env.TWITCH_CLIENT_ID}&redirect_uri=http://localhost:8080&scope=channel%3Amanage%3Apolls+channel%3Aread%3Apolls&state=c3ab8aa609ea11e793ae92361f002671`
  try {
      response = await axios.get(url);
      
      const res = await response.data;
      
      if (res.data === undefined || res.data.length == 0) {
        return -1;
      } else if (res.data !== undefined && res.data[0].id !== undefined) {
        const access_token = res.data[0].id;
        return access_token;
      }

    } catch (e) {
        console.log(e);
    }
}

const twitchHeader = {
    headers: {
      "Client-ID": process.env.TWITCH_CLIENT_ID,
      Autorization: `Bearer ${getOAuth}`
    }
  }

module.exports = {
    twitchHeader: twitchHeader,
}