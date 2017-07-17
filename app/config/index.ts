const path = require('path');

interface Config {
    env: string;
    root: string;
    port: string;
    securePort: string;
    ip: string;
    apiPathPrefix: string;
    chatPathEndpoint: string;
    mongoUrl: string;
    sessionSecret: string;
    sessionTokenDuration: number;
    sessionCookieName: string;
}

export let config: Config = {
  env: process.env.NODE_ENV,

  // root path of server
  root: path.normalize(__dirname + '/../..'),

  // server port
  port: process.env.PORT || '9000',

  securePort: process.env.SECURE_PORT || '9043',

  // server IP
  ip: process.env.IP || '0.0.0.0',

  // api path prefix
  apiPathPrefix: '/api/v1',

  // chat path endpoint
  chatPathEndpoint: '/chat',

  // mongo  url
  mongoUrl: 'mongodb://localhost:27017/alantu',

  // secret used for generating secure tokens
  sessionSecret: 'sda4tgghsc&32fg!!fdd',
  sessionTokenDuration: 60 * 60 * 5,
  sessionCookieName: 'jwt_token'
};

