var data = require('../sample-data/data').data;
exports.seed = function (knex, Promise) {

  var promises = [];
  return init(knex)
  .then(function() {
    data.forEach(function (item) {
      if (item.type === 'principal') {
        console.log('Inserting princial')
        promises.push(createPrincipal(knex, item));
      } else if (item.type === 'guest_user') {
        console.log('Inserting guest users')
        promises.push(createGuestUser(knex, item));
      }
    });
    return Promise.all(promises);
  });
};

function init(knex) {
  var promises = [];
  promises.push(knex.schema.withSchema('public').raw(`ALTER SEQUENCE principal_id_seq2 RESTART WITH 1000`));
  promises.push(knex.schema.withSchema('public').raw(`ALTER SEQUENCE user_account_id_seq2 RESTART WITH 1000`));
  return Promise.all(promises);
}


function createGuestUser(knex, guestUser) {
  return knex
    .table('user_account')
    .insert(guestUser.entity)
}

function createPrincipal(knex, item) {
  return knex
    .table('principal')
    .returning('id')
    .insert(item.entity)
    .then(function (principalIds) {
      console.log('Principal inserted. Id: ' + principalIds);
      let owner = item.owner_user;
      owner.principal_id = principalIds[0];
      return knex
        .table('user_account')
        .returning('id')
        .insert(owner)
        .then(function (ownerIds) {
          console.log('User inserted. Id: ' + ownerIds[0])
          if (item.events && item.events.length > 0) {
            console.log('Inserting events for the principal. Count: ' + item.events.length);
            var eventPromises = [];
            item.events.forEach(function (event) {
              console.log('Inserting event for principal ' + principalIds[0]);
              event.user_account_id = ownerIds[0];
              event.principal_id = principalIds[0];
              event.event_type_id = 1;
              eventPromises.push(
              knex
                .table('event')
                .returning('id')
                .insert(event));
            });
            return Promise.all(eventPromises);
          } else {
            console.log('principal without events');
          }
        });
    });
}