const environment = process.env.NODE_ENV;
const config = require('../../../knexfile.js')[environment];

export let dbClient = require('knex')(config);
export let mongoClient = require('mongodb').MongoClient;
