if(typeof define !== 'function') {
    var define = require('amdefine')(module);
}

define(['./connection-types/peer-host', 
        './connection-types/server-host'], function(PeerHost, ServerHost) {

    function NetworkHostFactory(connectionType) {
        if(connectionType === 'peer') {
            this._Client = PeerHost.Client;
            this._Server = PeerHost.Server;
        }
        else if(connectionType === 'server') {
            this._Client = ServerHost.Client;
            this._Server = ServerHost.Server;
        }
        else {
            throw new Error("Unknown connection type: " + connectionType);
        }
    }

    NetworkHostFactory.prototype = {
        createServer: function(serverID) {
            return new this._Server(serverID);
        },
        createClient: function(clientID) {
            return new this._Client(clientID);
        }
    };

    return NetworkHostFactory;
});
