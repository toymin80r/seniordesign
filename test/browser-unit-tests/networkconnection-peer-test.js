if(typeof define !== 'function') {
    var define = require('amdefine')(module);
}

define(['../../src/network/index', '../../src/eventemitter'], function(NetworkHostFactory, EventEmitter) {
    var hostFactory = new NetworkHostFactory('peer');
    var port = 9000;

    function setUp(callback) {
        callback();
    }

    function tearDown(callback) {
        callback();
    }

    function testClientDisconnect(test) {
        var server = hostFactory.createServer();
        var client = hostFactory.createClient();
        var clientConnectEvent = false;
        var serverConnectEvent = false;

        server.start('localhost', port).then(function(serverID) {
            client.connect('localhost', port, serverID);
        });

        client.on('connect', function() {
            test.ok(!clientConnectEvent);
            clientConnectEvent = true;
        });

        server.on('connect', function(clientID) {
            test.ok(!serverConnectEvent);
            serverConnectEvent = true;
            client.disconnect();
        });

        server.on('disconnect', function(clientID) {
            test.ok(serverConnectEvent);
            test.done();
        });
    }

    function testServerDisconnect(test) {
        var server = hostFactory.createServer();
        var client = hostFactory.createClient();
        var clientConnectEvent = false;
        var serverConnectEvent = false;

        server.start('localhost', port).then(function(serverID) {
            client.connect('localhost', port, serverID);
        });

        client.on('connect', function() {
            test.ok(!clientConnectEvent);
            clientConnectEvent = true;
        });

        server.on('connect', function(clientID) {
            test.ok(!serverConnectEvent);
            serverConnectEvent = true;
            server.stop();
        });

        client.on('disconnect', function() {
            test.ok(clientConnectEvent);
            test.done();
        });
    }

    return {
        setUp: setUp,
        tearDown: tearDown,
        testClientDisconnect: testClientDisconnect,
        testServerDisconnect: testServerDisconnect
    }
});
