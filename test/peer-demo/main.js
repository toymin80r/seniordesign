require(['nodeunit', 'peer-demo'], function(_, PeerDemo) {
    document.getElementById('runServerButton').onclick = PeerDemo.runServer;
    document.getElementById('runClientButton').onclick = function() {
        var serverID = document.getElementById('serverIDInput').value;
        PeerDemo.runClient(serverID);
    };
});