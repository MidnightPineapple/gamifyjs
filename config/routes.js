/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes tell Sails what to do each time it receives a request.
 *
 * For more information on configuring custom routes, check out:
 * https://sailsjs.com/anatomy/config/routes-js
 */

module.exports.routes = {

    // TODO: Add OAuth routes somewhere here

    'GET /login': 'AuthController.show',

    'POST /login': 'AuthController.login',

    'POST /logout': 'AuthController.logout',

    'GET /user/create': 'UserController.create',

    'GET /*': {
        skipAssets:true,
        action:"react",
    }


};
