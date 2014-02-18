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

            return this;
        },
        readNumber: function() {
            return this._buffer.shift();
        },
        writeString: function(string) {
            this._buffer.push(string);

            return this;
        },
        readString: function() {
            return this._buffer.shift();
        },
        writeBool: function(boolean) {
            this._buffer.push(boolean);

            return this;
        },
        readBool: function() {
            return this._buffer.shift();
        },
        isEmpty: function() {
            return this._buffer.length === 0;
        },
        reset: function() {
            this._buffer = [];

            return this;
        }
    };

    return BitStream;
});
