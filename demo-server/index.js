var Hapi = require('hapi');
var Good = require('good');

var routes = require('./routes');

// Http Server
var server = new Hapi.Server(); //{ debug: { request: ['info', 'error'] } }
server.connection({port: 8080});


var plugins = [
    {
        register: Good, options: {
        reporters: [{
            reporter: require('good-console'),
            events: {response: '*', log: ['error', 'info', 'debug']}
        }]
    }
    }
];


server.register(plugins, function (err) {
    if (err) {
        console.log('error when registering modules', error);
        throw err; // something bad happened loading the plugin
    }

    //server.auth.strategy('google', 'bell', Providers.google);


    // Add all the routes within the routes folder
    for (var route in routes) {
        //console.log('-- Route', routes[route]);
        server.route(routes[route]);
    }

    server.start(function (err) {
        if (err) {
            console.log('error when starting server', error);
        }
        server.log('info', 'Server running at: ' + server.info.uri);
    });
});

//server.start();
