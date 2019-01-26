/**
 * User.js
 *
 * @description :: A model definition.  Represents a database table/collection/etc.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

 const bcrypt = require('bcrypt-nodejs');
 module.exports = {
 attributes: {
     email: {
       type: 'string',
       required: true,
       unique: true
     },
     username: {
       type: 'string',
       required: true,
       unique: true
     },
     password: {
       type: 'string',
       required: true
     },

     //add calculation function from user level. last checkpoint passed update
     grade: {
       type: 'number',
       defaultsTo: 0
     },

     userLevels: {
       collection: 'userlevel',
       via:'user'
     }

   },
   customToJSON: function() {
      return _.omit(this, ['password'])
   },
   beforeCreate: function(user, cb){
     bcrypt.genSalt(10, function(err, salt){
       bcrypt.hash(user.password, salt, null, function(err, hash){
         if(err) return cb(err);
         user.password = hash;
         return cb();
       });
     });
   }
 };
