let util = require('util');

let bleno = require('bleno');

let BlenoCharacteristic = bleno.Characteristic;

let ProstheticFlexStatusCharacteristic = new BlenoCharacteristic({
    uuid: '58d3c1f4-b253-4055-9d02-3932126539f8',
    properties: ['read', 'notify'],
    onReadRequest:
	    function(offset, callback) {
		    if (offset) {
			    callback(this.RESULT_ATTR_NOT_LONG, null);
		    }

		    callback(this.RESULT_SUCCESS, this._value);
	    },
    onSubscribe:
	    function(maxValueSize, updateValueCallback) {
		    this._updateValueCallback = updateValueCallback;
	    },
});

Object.defineProperty(ProstheticFlexStatusCharacteristic, 'value', {
	get: function() { return this._value; },
	set: function(value) {
		this._value = Buffer.from(value);

		if (this._updateValueCallback) {
			this._updateValueCallback(this._value);
		}
	}
});

module.exports = ProstheticFlexStatusCharacteristic;
