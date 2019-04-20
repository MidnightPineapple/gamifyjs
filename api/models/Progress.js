/**
 * Progress.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {

    grade: {
      type:'number',
      allowNull: true,
    }, 

    code: {
      type: 'string',
      required: true,
    },

    state: {
      type: 'json',
      required: true,
    },

    feedback: {
      type: 'string',
      allowNull: true,
    },
    
    user: {
      model: "user"
    },

    problem: {
      model: 'problem'
    }

  },

  // TODO: custom validation rule: userXproblem must be unique

};

