import * as multer from 'multer';
import * as fs from 'fs';
import { ICustomRequest } from './custom.types';
import { config } from '../config/index';

const uuid = require('uuid/v4');

export const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, config.uploadDestination);
  },
  filename: function (req, file, cb) {
    const splittedName = file.originalname.split('.');
    cb(null, uuid() + '.' + splittedName[splittedName.length - 1]);
  }
});

export function manageFiles(req: ICustomRequest, resourcesNames: string[]) {
  for (let i = 0; i < resourcesNames.length; i++) {
    const name = resourcesNames[i];

    if (req.files) {
      if (req.files[name]) {
        const file = req.files[name][0];
        const path = file.path.split('static');

        req.body[name] = path[path.length - 1];
      } else {
        // todo: when uploading several files in a single request, and only some files are uploaded from the possible ones
        // req.body[name] is the base64 image causing an error on DB due to be long
        if (req.body[name].startsWith('data')) {
          req.body[name] = '';
          /* fs.writeFile('out.png', req.body[name], 'base64', function(err) {
            console.log(err);
          }); */
        }
      }
    } else {
      req.body[name] = '';
    }
  }

  return req.body;
}
