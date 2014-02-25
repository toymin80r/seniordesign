var Strategy = {
    var server;
    var client;
    var ID;
    connectToServer: function(address, serverID) {
        var promise = new Promise(function(resolve, reject) {
            /* Do Connection and Setup */
            client = io.connect(address);
            client.on()
        });

        return promise;
    },
    disconnectFromServer: function() {
    },
    startServer: function(serverID) {
        var promise = new Promise(function(resolve, reject) {
            /* Do Server Initialization and Setup */
                server = require('socket.io').listen(80);
            })
        });

        return promise;
    },
    stopServer: function() {
    },
    send: function(bitStream) {
        var promise = new Promise(function(resolve, reject) {
        });

        return promise;
    },
    onReceive: function(cb) {
    },
    onClientDisconnect: function(cb) {
    },
    onServerDisconnect: function(cb) {
    }
};

module.exports = Strategy;
