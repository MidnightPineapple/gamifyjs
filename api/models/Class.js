/**
 * Class.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {

    token: {
      type:'string',
      allowNull: true, 
    },

    name: {
      type: 'string',
      required: true,
    },

    slug: {
      type: 'string',
    },

    users: {
      collection: "user",
      via: 'class'
    }

  },

  beforeCreate: async function(model, proceed) {
    // TODO: generate class access token and store

    // TODO: generate slug and store

    proceed() 
  }
};

