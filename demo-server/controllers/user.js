'use strict';
var Hoek = require('hoek'); // hapi utilities https://github.com/hapijs/hoek
var Boom = require('boom'); // error handling https://github.com/hapijs/boom

var aguid = require('aguid');


var internals = {};

internals.modelGet = {
    "1": {
        _id: '1',
        _version: 12,
        _source: {
            firstname: 'Alice',
            lastname: 'Clark'
        }
    },
    "2": {
        _id: '2',
        _version: 1,
        _source: {
            firstname: 'Bob',
            lastname: 'Douglas'
        }
    }

};


var UserDAO = function () {
};

UserDAO.prototype.findByID = function get(request, reply) {
    var entityId = request.params.id;
    var entity = internals.modelGet[entityId];
    if (entity) {
        reply(null, entity);
    } else {
        reply( Boom.notFound('Not Found User '+ entityId), null );
    }

};


UserDAO.prototype.create = function create(request, reply) {
    var doc = request.body;
   // Create Logic
    var entity = {
        _id: aguid(),
        _version: 1
    };
    entity._source = doc.body;
    // Save
    internals.modelGet[entity._id] = entity;

    reply(null, entity);
};


UserDAO.prototype.update = function update(request, reply) {
    // Complete the request
    var entityId = request.params.id;
    var doc = request.body;
   // Get entity
    var entity = internals.modelGet[entityId];
    if (!entity) {
        return reply( Boom.notFound('Not Found User '+ entityId), null );
    }
    // Validation
    if (!doc.version) {
        return reply( Boom.preconditionFailed( 'Document Version is required for update'), null );
    }
    if (doc.version !== entity._version) {
        return reply( Boom.conflict( 'Conflict version'), null );
    }
    // Update
    entity._source = doc.body;
    entity._version = entity._version +1;
    reply(null, entity);

};


UserDAO.prototype.delete = function (request, reply) {
    var entityId = request.params.id;
    // Get entity
    var entity = internals.modelGet[entityId];
    if (!entity) {
        return reply( Boom.notFound('Not Found User '+ entityId), null );
    }
    delete internals.modelGet[entityId];

    reply(null, { deleted: true});
};


var userDAO = new UserDAO();
module.exports = userDAO;
