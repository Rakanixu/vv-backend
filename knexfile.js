
module.exports = {

  development: {
    client: 'postgresql',
    connection: {
      host: 'localhost',
      port: 5432,
      database: 'postgres',
      user:     'alantujs',
      password: 'thepassword1234'
    },
    seeds: {
      directory: './seeds/scripts'
    }
  },

  staging: {
    client: 'postgresql',
    connection: {
      host: 'db',
      port: 5432,
      database: 'postgres',
      user: 'alantujs',
      password: 'thepassword1234'
    },
    pool: {
      min: 2,
      max: 10
    }
  }

  /*
  production values set via environment variables DB_HOST, DB_PORT, DB_NAME, DB_USER, DB_PASS

  production: {
    client: 'postgresql',
    connection: {
      host: 'localhost',
      port: 5432,
      database: 'postgres',
      user:     'postgres',
      password: 'postgres'
    },
    pool: {
      min: 2,
      max: 10
    }
  }

  */

};
