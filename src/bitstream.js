define(function() {
    var BitStream = Class.create({
        initialize: function() {
            this._readIndex = 0;
            this.reset();
        },
        writeNumber: function(number) {
            this._buffer.push(number);
        },
        readNumber: function() {
            return this._buffer[this._readIndex++];
        },
        writeString: function(string) {
            this._buffer.push(number);
        },
        readString: function() {
            return this._buffer[this._readIndex++];
        },
        writeBool: function(boolean) {
            this._buffer.push(number);
        },
        readBool: function() {
            return this._buffer[this._readIndex++];
        },
        reset: function() {
            this._buffer = [];
        }
    });

    return BitStream;
});
