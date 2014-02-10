
if(typeof define !== 'function') {
    var define = require('amdefine')(module);
}

define(['../src/networkconnection'], function(NetworkConnection) {
    function setUp(callback) {
        this.serverConnection = new NetworkConnection("peer-host");
        this.clientConnection = new NetworkConnection("peer-host");
        callback();
    }

    function tearDown(callback) {
        delete this.connection;
        callback();
    }

    function testConnectDisconnect(test) {
        var serverConnection = this.serverConnection;
        var clientConnection = this.clientConnection;

        serverConnection.startServer(0);
        serverConnection.onClientDisconnect(function(client, err) {
            if(err) {
                /* Something went wrong */
            }
            else {
                /* OK */
            }
        });

        serverConnection.onClientConnect(function(client, err) {
            if(err) {
            }
            else {
            }
        });

        clientConnection.connectToServer("localhost", 0)
            .then(function() {
                doClientDisconnect();
            }, function(err) {
                /* something went wrong */
            });

        function doClientDisconnect() {
            clientConnection.disconnectFromServer()
                .then(function() {
                }, function(err) {
                });
        }
    }

    return {
        setUp: setUp,
        tearDown: tearDown,
        testBitStreamResetAndIsEmpty: testBitStreamResetAndIsEmpty
    }
});
