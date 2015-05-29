'use strict';

var Joi = require('joi');
var userController = require('./../controllers/user');


module.exports = function (plugin, options, next) {
  console.log('userController initialisation');
  return [
    {
      method: 'GET',
      path: '/s/users/{id}',
      handler: userController.findByID
    },
    {
      method: 'POST',
      path: '/s/users',
      handler: userController.create
    },
    {
      method: 'PUT',
      path: '/s/users/{id}',
      handler: userController.update
    },
    {
      method: 'DELETE',
      path: '/s/users/{id}',
      handler: userController.delete
    }
  ];

}();
