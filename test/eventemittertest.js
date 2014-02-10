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

    return {
        setUp: setUp,
        tearDown: tearDown,
        testOneEvent: testOneEvent,
        testEmitNoEvent: testEmitNoEvent,
        testMultipleEvents: testMultipleEvents,
        testOnceEvent: testOnceEvent
    }
});
