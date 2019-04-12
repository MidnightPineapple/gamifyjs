const bcrypt = require('bcrypt');

module.exports = {
  attributes: {
    firstName: {
      type: "string",
      required: true,
      isNotEmptyString:true,
    },
    lastName: {
      type: "string",
      required: true,
      isNotEmptyString:true,
    },
    email: {
      type: 'string',
      required: true,
      unique: true,
      isEmail: true
    },
    username: {
      type: 'string',
      required: true,
      unique: true,
      isNotEmptyString:true,
    },
    password: {
      type: 'string',
      required: true,
      minLength:8,
    },

    //add calculation function from user level. last checkpoint passed update
    grade: {
      type: 'number',
      defaultsTo: 0,
      min:0,
      max:20,
    },

    userLevels: {
      collection: 'userlevel',
      via: 'user'
    }

  },
  customToJSON: function () {
    return _.omit(this, ['password'])
  },
  beforeCreate: async function (user, proceed) {

    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(user.password, salt)

    user.password = hash 

    proceed()
  }
};