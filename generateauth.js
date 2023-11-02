require('dotenv').config();
const axios = require('axios');

async function generateAuthToken() {
  try {
    const response = await axios.post('https://tracking-idp.responsiblelendinglimited.co.uk/token', {
      grant_type: 'client_credentials',
      client_id: process.env.CLIENT_ID,
      client_secret: process.env.CLIENT_SECRET
    }, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    });

    return response.data.access_token;
  } catch (error) {
    console.error('Error generating auth token:', error);
    return null;
  }
}

module.exports = generateAuthToken;
