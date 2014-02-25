if(typeof define !== 'function') {
    var define = require('amdefine')(module);
}

define(['../../src/network/index', '../../src/eventemitter', '../../src/bitstream'], 
    function(NetworkHostFactory, EventEmitter, BitStream) {

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
            setTimeout(function() { client.disconnect(); }, 1000);
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
            client.connect('localhost', port, serverID).then(function() {}, function(err) {
            });
        });

        client.on('connect', function() {
            test.ok(!clientConnectEvent);
            clientConnectEvent = true;
        });

        server.on('connect', function(clientID) {
            test.ok(!serverConnectEvent);
            serverConnectEvent = true;
            setTimeout(function() { server.stop(); }, 1000);
        });

        client.on('disconnect', function() {
            test.ok(clientConnectEvent);
            test.done();
        });
    }

    function testClientSend(test) {
        var server = hostFactory.createServer();
        var client = hostFactory.createClient();
        var messagesToSend = 10;
        var receivedMessages = 0;
        var expectedClientID;

        server.start('localhost', port).then(function(serverID) {
            var bitStream = new BitStream();

            client.connect('localhost', port, serverID).then(function(clientID) {
                var counter = messagesToSend;

                expectedClientID = clientID;

                var interval = setInterval(function() {
                    if(counter) {
                        bitStream.writeNumber(counter);
                        client.send(bitStream);
                        counter --;
                    }
                    else {
                        clearInterval(interval);
                    }
                }, 100);
            }, function(err) {
                test.ok(false, JSON.stringify(err, undefined, 4));
            });
        }, function(err) {
            test.ok(false, JSON.stringify(err, undefined, 4));
        });

        server.on('data', function(data) {
            var clientID = data.client;
            var data = data.data;

            test.equal(clientID, expectedClientID);

            for(var i=messagesToSend;i>=messagesToSend-receivedMessages;i--) {
                test.equal(data.readNumber(), i);
            }

            console.log('Client (' + clientID + ') sent', data);

            receivedMessages ++;

            if(receivedMessages === messagesToSend) {
                test.done();
            }
        });
    }

    return {
        setUp: setUp,
        tearDown: tearDown,
        testClientDisconnect: testClientDisconnect,
        testServerDisconnect: testServerDisconnect,
        testClientSend: testClientSend
    }
});
