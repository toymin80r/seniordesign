// peerjs setup
var PeerServer = require('peer').PeerServer;
var peerServer = new PeerServer({ port: 9000 });

peerServer.on('connection', function(id) {
    console.log('Peer connect', id);
});

peerServer.on('disconnect', function(id) {
    console.log('Peer disconnect', id);
});

// express web application setup
var express = require('express');
var app = express();

app.use(express.static(__dirname + '../../'));

app.listen(3000);