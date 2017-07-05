
module.exports = {

  development: {
    client: 'postgresql',
    connection: {
      host: 'localhost',
      port: 5432,
      database: 'postgres',
      user:     'postgres',
      password: ''
    }
  },

  staging: {
    client: 'postgresql',
    connection: {
      host: 'localhost',
      port: 5432,
      database: 'my_db',
      user:     'username',
      password: 'password'
    },
    pool: {
      min: 2,
      max: 10
    }
  },

  production: {
    client: 'postgresql',
    connection: {
      host: 'localhost',
      port: 5432,
      database: 'my_db',
      user:     'username',
      password: 'password'
    },
    pool: {
      min: 2,
      max: 10
    }
  }

};
