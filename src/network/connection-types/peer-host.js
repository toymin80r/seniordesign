if(typeof define !== 'function') {
    var define = require('amdefine')(module);
}

define('../../eventemitter', function(EventEmitter) {
    function Server(serverID) {
        this._serverID = serverID;
    }

    Server.prototype = new EventEmitter();
    Server.prototype = {
        start: function(serverAddress, serverPort) {
            var self = this;
            var promise = new Promise(function(resolve, reject) {
                /* Do Server Initialization and Setup */
                var server = new Peer(self._serverID, { host: serverAddress, port: serverPort });

                server.on('connection', function(connection) {
                    connection.on('open', function() {
                        // connection is fully established
                        self.emit('connect');
                    }).on('close', function() {
                        // client disconnected
                        self.emit('disconnect', client);
                    }).on('error', function(error) {
                        // error occurred
                    }).on('data', function(data) {
                        // received data from client
                        self.emit('data', data);
                    });
                });

                self._server = server;
                resolve(self._server);
            });

            return promise;
        },
        stop: function() {
            var self = this;
            var promise = new Promise(function(resolve, reject) {
                self._server.destroy();
                resolve(self._server);
            });

            return promise;
        },
        send: function(bitStream, clientID) {
            var promise = new Promise(function(resolve, reject) {
            });

            return promise;
        }
    };

    function Client(clientID) {
        this._clientID = clientID;
    }

    Client.prototype = new EventEmitter();
    Client.prototype = {
        connect: function(serverAddress, serverPort, serverID) {
            var self = this;
            var promise = new Promise(function(resolve, reject) {
                /* Do Connection and Setup */
                var client = new Peer(self._clientID, { host: serverAddress, port: serverPort });
                var connection = client.connect(serverID);

                connection.on('open', function() {
                    self._connection = connection;
                    self.emit('connected');
                    resolve();
                }).on('close', function() {
                    self.emit('disconnected');
                }).on('error', function(error) {
                    // error occurred
                    reject();
                }).on('data', function(data) {
                    self.emit('data', data);
                });

                self._client = client;
            });

            return promise;
        },
        disconnect: function() {
            var self = this;
            var promise = new Promise(function(resolve, reject) {
                self._client.destroy();
                resolve();
            });

            return promise;
        },
        send: function(bitStream, clientID) {
            var promise = new Promise(function(resolve, reject) {
            });

            return promise;
        }
    };

    return {
        Client: Client,
        Server: Server
    };
});
