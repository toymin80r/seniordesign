if(typeof define !== 'function') {
    var define = require('amdefine')(module);
}

define(['../../../lib/rsvp', '../../../lib/peer', '../../eventemitter'], function(_, _, EventEmitter) {
    var Promise = RSVP.Promise;

    function Server() {
    }

    Server.prototype = new EventEmitter();
    Server.prototype.start = function(serverAddress, serverPort) {
        var self = this;
        var promise = new Promise(function(resolve, reject) {
            /* Do Server Initialization and Setup */
            var server = new Peer({ host: serverAddress, port: serverPort });

            server.on('open', function(id) {
                console.log('Server', id, 'started successfully');

                self._serverID = id;
                resolve(id);
            }).on('close', function() {
                console.log('Server', self._serverID, 'destroyed successfully');
            }).on('connection', function(connection) {
                var clientID = connection.peer;

                connection.on('open', function() {
                    // connection is fully established
                    console.log('Client', clientID, 'connected to server', self._serverID);

                    self.emit('connect', clientID);
                }).on('close', function() {
                    // client disconnected
                    console.log('Client', clientID, 'disconnected from server', self._serverID);

                    self.emit('disconnect', clientID);
                }).on('error', function(error) {
                    console.log('Connection error ', error);
                    // error occurred
                }).on('data', function(data) {
                    // received data from client
                    self.emit('data', data);
                });
            }).on('error', function(err) {
                console.log('Server could not be started', err.message);

                //server.destroy();
                //reject(err);
            });

            self._server = server;
        });

        console.log('Starting server using peerjs host: ', serverAddress, serverPort);

        return promise;
    };

    Server.prototype.stop = function() {
        var self = this;
        var promise = new Promise(function(resolve, reject) {
            self._server.destroy();
            resolve(self._server);
        });

        return promise;
    };

    Server.prototype.send = function(bitStream, clientID) {
        var promise = new Promise(function(resolve, reject) {
        });

        return promise;
    };

    function Client(clientID) {
        this._clientID = clientID;
    }

    Client.prototype = new EventEmitter();
    Client.prototype.connect = function(serverAddress, serverPort, serverID) {
        var self = this;
        var promise = new Promise(function(resolve, reject) {
            /* Do Connection and Setup */
            var client = new Peer({ host: serverAddress, port: serverPort });
            client.on('open', function(id) {
                console.log('Client', id, 'started successfully');

                self._clientID = id;
            }).on('close', function() {
                console.log('Client', self._clientID, 'destroyed successfully');
            }).on('error', function(err) {
                console.log('Client could not be started', err);

                client.destroy();
                reject(err);
            })

            var connection = client.connect(serverID);

            connection.on('open', function() {
                console.log('Client connected to server', serverID);
                self._connection = connection;
                self.emit('connect');
                resolve(self._clientID);
            }).on('close', function() {
                console.log('Client disconnected');
                self.emit('disconnect');
            }).on('error', function(err) {
                console.log('Client could not connect to server', serverID, err);
                reject(err);
            }).on('data', function(data) {
                console.log('Client received data from server', data);
                self.emit('data', data);
            });

            self._client = client;
        });

        return promise;
    };

    Client.prototype.disconnect = function() {
        var self = this;
        var promise = new Promise(function(resolve, reject) {
            self._client.destroy();
            resolve();
        });

        return promise;
    };

    Client.prototype.send = function(bitStream, clientID) {
        var promise = new Promise(function(resolve, reject) {
        });

        return promise;
    };

    return {
        Client: Client,
        Server: Server
    };
});
