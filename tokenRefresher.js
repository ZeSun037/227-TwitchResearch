// Using Axios (requires installation: npm install axios)
const axios = require('axios');
var config = require("./data/config.json");
const querystring = require('querystring');

axios.post('https://id.twitch.tv/oauth2/token', querystring.stringify({
  grant_type: "refresh_token",
  client_id: config.client_id,
  client_secret: config.client_secret,
  refresh_token: config.refreshToken
}), {
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded'
  }
})
.then(response => console.log(response.data))
.catch(error => console.error(error));
