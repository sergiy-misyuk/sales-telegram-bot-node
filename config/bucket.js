const { Storage } = require('@google-cloud/storage');
const path = require('path');
require('dotenv').config();

const STORAGE_PROJECT_KEY = {
  type: process.env.TYPE,
  project_id: process.env.PROJECT_ID,
  private_key_id: process.env.PRIVATE_KEY_ID,
  private_key: process.env.PRIVATE_KEY,
  client_email: process.env.CLIENT_EMAIL,
  client_id: process.env.CLIENT_ID,
  auth_uri: process.env.AUTH_URI,
  token_uri: process.env.TOKEN_URI,
  auth_provider_x509_cert_url: process.env.AUTH_PROVIDER,
  client_x509_cert_url: process.env.CLIENT_URL,
  universe_domain: process.env.UNIVERSE_DOMAIN,
};

const gc = new Storage({
  //   keyFilename: path.join(__dirname, './telegram-bot-keys.json'),
  credentials: STORAGE_PROJECT_KEY,
  projectId: process.env.PROJECT_ID,
});

// check connect to bucket
gc.getBuckets().then(x => console.log(x));

module.exports = { gc, STORAGE_PROJECT_KEY };
