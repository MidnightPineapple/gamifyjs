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
    'POST /user/create': 'UserController.store',
    'GET /user': "UserController.index",
    'GET r|/user/(\\d+)|id': 'UserController.show',
    'PATCH r|/user/(\\d+)|id': 'UserController.update', 
    'DELETE r|/user/(\\d+)|id': 'UserController.destroy',
 
    'GET /*': {
        skipAssets:true,
        action:"react",
    }

};
