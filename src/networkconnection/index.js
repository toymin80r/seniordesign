if(typeof define !== 'function') {
    var define = require('amdefine')(module);
}

if(typeof Promise !== 'function') {
    var Promise = require('promise');
}

define(function() {
    var NetworkConnection = function(strategy) {
        if(typeof strategy !== 'string') {
            throw new Error("NetworkConnection constructor must be given a strategy");
        }

        try {
            var Strategy = require('./strategies/' + strategy);
        }
        catch(err) {
            throw new Error(strategy + " is not a valid strategy");
        }

        return new Strategy();
    };

    return NetworkConnection;
});


var connection = new NetworkConnection('peer-host')
var connection = new NetworkConnection('server-host')

connection.startServer()