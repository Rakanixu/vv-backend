import express = require('express');
import { ICustomRequest } from './custom.types';

export function resolve(req: ICustomRequest, res: express.Response, promise: Promise<any>) {
  promise.then((output) => {
    handleResponse(req, res, output);
  }).catch((err) => {
    console.log('ERROR 1');
    console.error(`Error: ${err}`);
    handleError(res, err);
  }).catch((err) => {
    console.log('ERROR 2');
    console.error(`Error: ${err}`);
    res.status(400).json();
  });
}

function handleError(res: express.Response, err: any) {
  if (typeof err === 'object' && typeof err.message === 'string') {
    sendError(res, err.message, err.code);
  } else {
    sendError(res, err);
  }
}

function sendError(res: express.Response, errorMessage?: any, statusCode?: number) {
  console.log(errorMessage + '  ' + statusCode);
  res.status(statusCode || 400).json({
      errorCode: statusCode,
      message: errorMessage
  });
}

function handleResponse(req: ICustomRequest, res: express.Response, output?: any) {
  let statusCode = 200;
  let splittedpath;

  switch (req.method) {
    case 'GET':
      splittedpath = req.originalUrl.split('/');

      // single entity if originalUrl ends with an integer /:id, array otherwise
      if (!isNaN(parseInt(splittedpath[splittedpath.length - 1], 10))) {
        if (output.length <= 0) {
          statusCode = 404;
        }
        output = output[0];
      }
      break;
    case 'POST':
      // created
      if (typeof output !== 'string' && output.length > 0) {
        output = output[0];
      }
      break;
    case 'PUT':
      // entity does not exists
      if (output.length <= 0) {
          statusCode = 404;
          output = {};
      } else {
        // return single updated entity
        output = output[0];
      }
      break;
    case 'DELETE':
      // does not exists on DB
      if (output === 0) {
        statusCode = 404;
      }
      output = {};
      break;
  }

  res.status(statusCode).json(output);
}

