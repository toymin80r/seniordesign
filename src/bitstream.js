if(typeof define !== 'function') {
    var define = require('amdefine')(module);
}

define(function(require) {
    var BitStream = function() {
        this.reset();
    };
    BitStream.prototype = {
        writeNumber: function(number) {
            this._buffer.push(number);
        },
        readNumber: function() {
            return this._buffer.shift();
        },
        writeString: function(string) {
            this._buffer.push(string);
        },
        readString: function() {
            return this._buffer.shift();
        },
        writeBool: function(boolean) {
            this._buffer.push(boolean);
        },
        readBool: function() {
            return this._buffer.shift();
        },
        isEmpty: function() {
            return this._buffer.length === 0;
        },
        reset: function() {
            this._buffer = [];
        }
    };

    return BitStream;
});
