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

    // Add OAuth routes somewhere here

    'GET /login': { view: 'login' },
    'POST /login': 'AuthController.login',
    '/logout': 'AuthController.logout',

    'GET /register': { view: 'register' },

    'GET /*': {
        skipAssets:true,
        action:"react",
    }


};
