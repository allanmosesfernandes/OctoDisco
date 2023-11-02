const generateAuthToken = require('./netlify/functions/generateauth');

async function test() {
  const token = await generateAuthToken();
  console.log('Generated Token:', token);
}

test();
https://tracking-idp.responsiblelendinglimited.co.uk/token