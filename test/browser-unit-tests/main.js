require(['nodeunit', 'networkconnection-peer-test'], function(_, networkConnectionPeerTest) {
    nodeunit.run({
        'Network Connection - Peer': networkConnectionPeerTest
    });
});