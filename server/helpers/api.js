const axios = require('axios');
const config = require('./config/config.js');

const api = axios.create({
  baseURL: 'https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp',
  timeout: 3000,
  headers: {
    Authorization: config.API_TOKEN,
  },
});

module.exports.api = api;
