const axios = require('axios');
const cors = require('cors');

const corsHandler = cors({
  origin: '*', // This allows any origin to access the function
  methods: 'GET,POST', // Adjust according to the methods your function should allow
  // You can add more configuration options if needed
});

exports.handler = async function(event, context) {
  return new Promise((resolve, reject) => {
    corsHandler(event, context, async () => {
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

        resolve({
          statusCode: 200,
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*', // Ensure this header is set
            'Access-Control-Allow-Headers': 'Content-Type',
            'Access-Control-Allow-Methods': 'POST, OPTIONS',
          },
          body: JSON.stringify({ access_token: response.data.access_token })
        });
      } catch (error) {
        console.error('Error generating auth token:', error);
        resolve({
          statusCode: 500,
          body: JSON.stringify({ error: 'Internal Server Error' })
        });
      }
    });
  });
};
