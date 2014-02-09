var Strategy = {
    connectToServer: function(address, serverID) {
        var promise = new Promise(function(resolve, reject) {
            /* Do Connection and Setup */
        });

        return promise;
    },
    disconnectFromServer: function() {
    },
    startServer: function(serverID) {
        var promise = new Promise(function(resolve, reject) {
            /* Do Server Initialization and Setup */
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