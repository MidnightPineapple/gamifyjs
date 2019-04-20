/**
 * Problem.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {

    defaultCode: {
      type:'string',
      required: true,
    },

    spawnCoordinates: {
      type: 'json',
      required: true
    },

    name: {
      type: 'string',
      required: true,
    },

    description: {
      type:'string',
      required: true,
    },

    slug: {
      type: 'string'
    },

    level: {
      model: 'level'
    },

    progress: {
      collection: 'progress',
      via: 'problem'
    }

  },

  // TODO: autogenerate slug before creating

};

