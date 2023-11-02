const axios = require('axios');

exports.handler = async function(event, context) {
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

    return {
      statusCode: 200,
      body: JSON.stringify({ access_token: response.data.access_token })
    };
  } catch (error) {
    console.error('Error generating auth token:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Internal Server Error' })
    };
  }
};
