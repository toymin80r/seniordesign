if(typeof define !== 'function') {
    var define = require('amdefine')(module);
}

define(['../../src/network/index', '../../src/eventemitter', '../../src/bitstream'], 
    function(NetworkHostFactory, EventEmitter, BitStream) {

    var hostFactory = new NetworkHostFactory('peer');
    var port = 9000;

    function runDrawLoop(dots) {
        var ctx = document.getElementById('dotCanvas').getContext('2d');

        setInterval(drawDots, 15);

        function drawDots() {
            ctx.clearRect(0, 0, 800, 600);

            for(var i in dots) {
                drawDot(dots[i]);
            }

            function drawDot(dot) {
                ctx.beginPath();
                ctx.arc(dot.x, dot.y, 40, 0, 2*Math.PI, false);
                ctx.fillStyle = dot.color;
                ctx.fill();
                ctx.lineWidth = 5;
                ctx.strokeStyle = '#003300';
                ctx.stroke();
            }
        }
    }

    function runServer() {
        var dots = { };
        var server = hostFactory.createServer();

        server.start('localhost', port).then(function(serverID) {
            document.getElementById('statusArea').innerHTML = 'Running Server With ID ' + serverID;
        });

        server.on('data', function(data) {
            var clientID = data.client;
            var data = data.data;
            var dot = dots[clientID];

            if(dot === undefined) {
                dots[clientID] = dot = { };
            }

            dot.x = data.readNumber();
            dot.y = data.readNumber();
            dot.color = data.readString();
        });

        runDrawLoop(dots);
    }

    function runClient(serverID) {
        var dots = { };
        var client = hostFactory.createClient();
        var bitStream = new BitStream();
        var canvas = document.getElementById('dotCanvas');

        function randomColor() {
            return 'rgb(' 
                + parseInt(255*Math.random()) + ', ' 
                + parseInt(255*Math.random()) + ', ' 
                + parseInt(255*Math.random()) + ')';
        }

        client.connect('localhost', port, serverID).then(function(clientID) {
            var myDot = dots[clientID] = { x: 100, y: 100, color: randomColor() };
            dots[clientID] = myDot;

            canvas.addEventListener('click', function(event) {
                var x = event.clientX - canvas.offsetLeft;
                var y = event.clientY - canvas.offsetTop;

                myDot.x = x;
                myDot.y = y;
            }, false);

            setInterval(function() {
                bitStream.reset();
                bitStream.writeNumber(myDot.x);
                bitStream.writeNumber(myDot.y);
                bitStream.writeString(myDot.color);

                client.send(bitStream);
            }, 30);
        });

        runDrawLoop(dots);
    }

    return {
        runServer: runServer,
        runClient: runClient
    };
});
