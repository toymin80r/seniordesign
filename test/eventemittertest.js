if(typeof define !== 'function') {
    var define = require('amdefine')(module);
}

define(['../src/eventemitter'], function(EventEmitter) {
    function setUp(callback) {
        this.emitter = new EventEmitter();
        callback();
    }

    function tearDown(callback) {
        delete this.emitter;
        callback();
    }

    function testOneEvent(test) {
        var emitter = this.emitter;

        emitter.on('myEvent', function(data) {
            test.equal(data[0], 'one');
            test.equal(data[1], 'two');
            test.equal(data[2], 'three');
        });

        test.ok(emitter.emit('myEvent', ['one', 'two', 'three']));
        test.done();
    }

    function testEmitNoEvent(test) {
        var emitter = this.emitter;

        test.ok(!emitter.emit('myEvent'));
        test.done();
    }

    function testMultipleEvents(test) {
        var emitter = this.emitter;

        emitter.on('myEvent1', function(data) {
            test.equal(data['key1'], 'value1');
        });

        emitter.on('myEvent2', function(data) {
            test.equal(data['key2'], 'value2');
        });

        test.ok(emitter.emit('myEvent1', { 'key1': 'value1' }));
        test.ok(emitter.emit('myEvent2', { 'key2': 'value2' }));
        test.done();
    }

    function testOnceEvent(test) {
        var emitter = this.emitter;

        test.expect(3);

        emitter.once('myEvent', function(data) {
            test.ok(true);
        });

        test.ok(emitter.emit('myEvent', { }));
        test.ok(!emitter.emit('myEvent', { }));
        test.done();
    }

    function testRemoveListeners(test) {
        var emitter = this.emitter;
        var runCount = { 
            'eventHandler1': 0,
            'eventHandler2': 0,
            'eventHandler3': 0
        };

        function eventHandler1() {
            runCount['eventHandler1'] += 1;
        }

        function eventHandler2() {
            runCount['eventHandler2'] += 1;
        }

        function eventHandler3() {
            runCount['eventHandler3'] += 1;
        }

        // test basic functionality
        emitter.on('myEvent', eventHandler1);
        emitter.on('myEvent', eventHandler2);
        emitter.on('myEvent', eventHandler3);

        test.ok(emitter.emit('myEvent'));

        test.equal(runCount['eventHandler1'], 1);
        test.equal(runCount['eventHandler2'], 1);
        test.equal(runCount['eventHandler3'], 1);

        emitter.removeListener('myEvent', eventHandler1);
        test.ok(emitter.emit('myEvent'));

        test.equal(runCount['eventHandler1'], 1);
        test.equal(runCount['eventHandler2'], 2);
        test.equal(runCount['eventHandler3'], 2);

        emitter.on('myEvent', eventHandler1);
        test.ok(emitter.emit('myEvent'));

        test.equal(runCount['eventHandler1'], 2);
        test.equal(runCount['eventHandler2'], 3);
        test.equal(runCount['eventHandler3'], 3);

        emitter.removeAllListeners('myEvent');
        test.ok(!emitter.emit('myEvent'));

        test.equal(runCount['eventHandler1'], 2);
        test.equal(runCount['eventHandler2'], 3);
        test.equal(runCount['eventHandler3'], 3);

        // test error handling. removing all handlers from empty event
        test.doesNotThrow(function() { emitter.removeAllListeners('myEvent') });
        // test error handling. removing all handlers from non-existent event
        test.doesNotThrow(function() { emitter.removeAllListeners('nonExistantEvent') });

        // test removing an event handler from a non-empty event that has not been added to that event
        emitter.on('myEvent', eventHandler1);
        test.doesNotThrow(function() { emitter.removeListener('myEvent', eventHandler2); });

        test.done();
    }

    return {
        setUp: setUp,
        tearDown: tearDown,
        testOneEvent: testOneEvent,
        testEmitNoEvent: testEmitNoEvent,
        testMultipleEvents: testMultipleEvents,
        testOnceEvent: testOnceEvent,
        testRemoveListeners: testRemoveListeners
    }
});
