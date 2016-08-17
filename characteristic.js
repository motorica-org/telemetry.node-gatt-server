let bleno = require('bleno');

let ProstheticFlexStatusCharacteristic = new bleno.Characteristic({
    uuid: '58d3c1f4-b253-4055-9d02-3932126539f8',
    properties: ['read', 'notify'],
    onReadRequest:
	    (offset, callback) => {
		    if (offset) {
			    callback(this.RESULT_ATTR_NOT_LONG, null);
		    }

		    callback(this.RESULT_SUCCESS, this._value);
	    },
    onSubscribe:
	    (maxValueSize, updateValueCallback) => {
		    this._updateValueCallback = updateValueCallback;
	    },
});

Object.defineProperty(ProstheticFlexStatusCharacteristic, 'value', {
	get: () => { return this._value; },
	set: (value) => {
		this._value = Buffer.from(value);

		if (this._updateValueCallback) {
			this._updateValueCallback(this._value);
		}
	}
});

module.exports = ProstheticFlexStatusCharacteristic;
