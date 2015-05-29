'use strict';
var Hoek = require('hoek'); // hapi utilities https://github.com/hapijs/hoek
var Boom = require('boom'); // error handling https://github.com/hapijs/boom


var internals = {};

internals.modelGet = {
    _id: '1',
    _version: 12,
    _source: {
        firstname: 'Alice',
        lastname: 'Clark'
    }
};


var UserDAO = function () {
};

UserDAO.prototype.findByID = function get(request, reply) {
    var entityId = request.params.id;
    reply(null, internals.modelGet);
};


UserDAO.prototype.create = function create(request, reply) {
    var entityId = request.params.id;
    var err = Boom.preconditionFailed('Document Version is required for update', null);
    reply(err, null);
};


UserDAO.prototype.update = function update(request, reply) {
    // Compplete the request
    var entityId = request.params.id;
    var opt = registerIndex(request.payload, true);
    opt.id = entityId;
    // Validation
    // Validation
    if (!opt.version) {
        //Boom.preconditionFailed( 'Document Version is required for update', [data]);
    }
    var err = Boom.preconditionFailed('Document Version is required for update', null);
    var res = null;
    reply(err, res);

};


UserDAO.prototype.delete = function (request, reply) {
    var entityId = request.params.id;
    var err = Boom.preconditionFailed('Document Version is required for update', null);
    var res = null;
    reply(err, res);
};


var userDAO = new UserDAO();
module.exports = userDAO;
