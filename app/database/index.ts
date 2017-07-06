const environment = process.env.NODE_ENV;
const config = require('../../../knexfile.js')[environment];

export let dbClient = require('knex')(config);
/*
 public | admission                     | table | pabloaguirre
 public | auction                       | table | pabloaguirre
 public | bid                           | table | pabloaguirre
 public | donation                      | table | pabloaguirre
 public | event                         | table | pabloaguirre
 public | event_location                | table | pabloaguirre
 public | event_type                    | table | pabloaguirre
 public | named_guest                   | table | pabloaguirre
 public | named_guest_media_type        | table | pabloaguirre
 public | participant                   | table | pabloaguirre
 public | payment                       | table | pabloaguirre
 public | poll                          | table | pabloaguirre
 public | poll_entry                    | table | pabloaguirre
 public | principal                     | table | pabloaguirre
 public | principal_event_types_allowed | table | pabloaguirre
 public | question                      | table | pabloaguirre
 public | question_topic                | table | pabloaguirre
 public | quiz                          | table | pabloaguirre
 public | quiz_entry                    | table | pabloaguirre
 public | role                          | table | pabloaguirre
 public | slider_image                  | table | pabloaguirre
 public | user_account */

