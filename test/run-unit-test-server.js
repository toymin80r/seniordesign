// peerjs setup
var PeerServer = require('peer').PeerServer;
var peerServer = new PeerServer({ port: 9000 });

// express web application setup
var express = require('express');
var app = express();

app.use(express.logger());
app.use(express.static(__dirname + '../../'));

app.listen(3000);