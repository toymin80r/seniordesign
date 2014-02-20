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

    function testConnectDisconnect(test) {
        var serverID = 0;
        var clientID = 1;
        var server = hostFactory.createServer(serverID);
        var client = hostFactory.createClient(clientID);
        var clientConnectEvent = false;
        var serverConnectEvent = false;

        /*test.expect(5);

        server.start().then(function() {
            client.connect('localhost', port, serverID);
        });

        client.on('connect', function() {
            test.ok(!clientConnectEvent);
            clientConnectEvent = true;
        });

        server.on('connect' function(clientID_) {
            test.ok(!serverDisconnectEvent);
            test.equal(clientID_, clientID);
            serverConnectEvent = true;
        });

        server.on('disconnect', function(clientID_) {
            test.ok(serverConnectEvent);
            test.equal(clientID_, clientID);
            test.done();
        });*/
        test.done();
    }

    return {
        setUp: setUp,
        tearDown: tearDown,
        testConnectDisconnect: testConnectDisconnect
    }
});
