const environment = process.env.NODE_ENV;

let cfg: any;

if (environment === 'production') {

  const dbHost = process.env.DB_HOST || 'postgres';
  const dbName = process.env.DB_NAME || 'postgres';
  const dbPort = parseInt(process.env.DB_PORT || '5432', 10);
  const dbUser = process.env.DB_USER || 'postgres';
  const dbPass = process.env.DB_PASS || 'postgres';

  cfg = {
    client: 'postgresql',
    connection: {
      host: dbHost,
      port: dbPort,
      database: dbName,
      user: dbUser,
      password: dbPass
    },
    debug: false
  };
} else {
  cfg = require('../../../knexfile.js')[environment];
}

const config = cfg;

export let dbClient = require('knex')(config);
export let mongoClient = require('mongodb').MongoClient;
