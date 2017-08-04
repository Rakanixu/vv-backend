const path = require('path');

interface Config {
    env: string;
    root: string;
    port: number;
    securePort: number;
    ip: string;
    uploadDestination: string;
    apiPathPrefix: string;
    chatPathEndpoint: string;
    mongoUrl: string;
    sessionSecret: string;
    sessionTokenDuration: number;
    sessionCookieName: string;
    sparkpost: {
      apiKey: string;
      sandbox: boolean;
      templates: {
        userActivation: string;
      }
    };
    tribecast: {
      apiUrl: string;
      apiKey: string;
      secret: string;
      tokensDuration: number;
      useBroadcast: boolean;
    };
}

export let config: Config = {
  env: process.env.NODE_ENV,

  // root path of server
  root: path.normalize(__dirname + '/../..'),

  // server port
  port: parseInt(process.env.APP_PORT || '9000', 10),

  securePort: parseInt(process.env.SECURE_PORT || '9043', 10),

  // server IP
  ip: process.env.IP || '0.0.0.0',

  // upload destination for files / images
  uploadDestination: __dirname + './../static',

  // api path prefix
  apiPathPrefix: '/api/v1',

  // chat path endpoint
  chatPathEndpoint: '/chat',

  // mongo  url
  mongoUrl: process.env.MONGO_URL || 'mongodb://localhost:27017/alantu',

  // secret used for generating secure tokens
  sessionSecret: 'sda4tgghsc&32fg!!fdd',
  sessionTokenDuration: 60 * 60 * 5,
  sessionCookieName: 'jwt_token',
  sparkpost: {
    apiKey: process.env.SPARKPOST_API_KEY || 'b99c452431f9bdaf9c16f468875bf82fbc2a3451',
    sandbox: true,
    templates: {
      userActivation: 'my-first-email'
    }
  },
  tribecast: {
    apiUrl: process.env.TRIBECAST_API_URL || '',
    apiKey: process.env.TRIBECAST_API_KEY || 'AK-Y3VzdG9tZXJJZD0zJm5vbmNlPTAuNTQ5OTc3OTAzNTI1ODIzNyZzaWduPTEwNjczZmQ0NDNjOWEyYjQ4MzMwZThlNWE1MjZkNjFiMjUxMDk5ZjQ=',
    secret: process.env.TRIBECAST_SECRET || 't80qX5WP9T.F2Jdsp1$2_2wD6DJ6xuOL',
    tokensDuration: 8640 * 1000,
    useBroadcast: false
  }
};

