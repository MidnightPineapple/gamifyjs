/**
 * Level.js
 *
 * @description :: A model definition.  Represents a database table/collection/etc.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {

    numCheckpoints: {
      type: 'number',
      required: true
    },
    name: {
      type: 'string'
    },
    
    userLevels: {
      collection: 'userlevel',
      via: 'level'
    }

  },

};

