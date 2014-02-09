if(typeof define !== 'function') {
    var define = require('amdefine')(module);
}

define(['../src/bitstream'], function(BitStream) {
    function setUp(callback) {
        this.stream = new BitStream();
        callback();
    }

    function tearDown(callback) {
        delete this.stream;
        callback();
    }

    function testBitStreamResetAndIsEmpty(test) {
        var stream = this.stream;

        test.ok(stream.isEmpty());

        stream.writeNumber(3);
        stream.writeString("Hello");
        stream.writeBool(true);

        test.ok(!stream.isEmpty());

        stream.reset();

        test.ok(stream.isEmpty());

        test.done();
    }

    function testWriteReadEmptinessCondition(test) {
        var stream = this.stream;

        stream.writeBool(true);
        stream.writeString("Hello, World");
        stream.writeNumber(249);

        test.ok(!stream.isEmpty());

        stream.readBool();
        stream.readString();
        stream.readNumber();

        test.ok(stream.isEmpty());

        test.done();
    }

    function testWriteReadOrderAndCorrectness(test) {
        var stream = this.stream;

        stream.writeBool(false);
        stream.writeNumber(2329);
        stream.writeNumber(92);
        stream.writeString("Hello");
        stream.writeNumber(2);
        stream.writeString("Hi");

        test.equal(stream.readBool(), false);
        test.equal(stream.readNumber(), 2329);
        test.equal(stream.readNumber(), 92);
        test.equal(stream.readString(), "Hello");
        test.equal(stream.readNumber(), 2);
        test.equal(stream.readString(), "Hi");

        test.done();
    }

    return {
        setUp: setUp,
        tearDown: tearDown,
        testBitStreamResetAndIsEmpty: testBitStreamResetAndIsEmpty,
        testWriteReadEmptinessCondition: testWriteReadEmptinessCondition,
        testWriteReadOrderAndCorrectness: testWriteReadOrderAndCorrectness
    }
});
