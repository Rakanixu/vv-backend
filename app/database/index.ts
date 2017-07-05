const environment = process.env.NODE_ENV;
const config = require('../../../knexfile.js')[environment];

export let knex = require('knex')(config);
