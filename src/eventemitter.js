if(typeof define !== 'function') {
    var define = require('amdefine')(module);
}

define(function() {
    var EventEmitter = function() {
        this._eventHandlers = { };
    };

    function typeCheckEvent(event) {
        if(typeof event !== 'string') {
            throw new Error('event must be a string');
        }
    }

    function typeCheckListener(listener) {
        if(typeof listener !== 'function') {
            throw new Error('listener must be a function');
        }
    }

    function typeCheckEventAndListener(event, listener) {
        typeCheckEvent(event);
        typeCheckListener(listener);
    }

    EventEmitter.prototype = {
        addListener: function(event, listener) {
            return on(event, listener);
        },
        on: function(event, listener) {
            typeCheckEventAndListener(event, listener);

            this._eventHandlers[event] = this._eventHandlers[event] || [];
            this._eventHandlers[event].push(listener);

            return this;
        },
        once: function(event, listener) {
            var self = this;
            typeCheckEventAndListener(event, listener);

            function listenerWrapper() {
                listener.apply(self, arguments);
                self.removeListener(event, listenerWrapper);
            }

            this.on(event, listenerWrapper);

            return this;
        },
        removeListener: function(event, listener) {
            typeCheckEventAndListener(event, listener);

            if(this._eventHandlers[event]) {
                var events = this._eventHandlers[event];

                if(events.indexOf(listener) != -1) {
                    events.splice(events.indexOf(listener), 1);
                }
            }

            return this;
        },
        removeAllListeners: function(event) {
            typeCheckEvent(event);

            delete this._eventHandlers[event];

            return this;
        },
        listeners: function(event) {
            typeCheckEvent(event);

            return this._eventHandlers[event] || [];
        },
        emit: function(event, data) {
            typeCheckEvent(event);

            var self = this;
            var events = this._eventHandlers[event] || [];
            var result = events.length > 0;

            events.forEach(function(listener) {
                listener.call(self, data)
            });

            return result;
        }
    };

    return EventEmitter;
});
