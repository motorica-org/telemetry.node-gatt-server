var util = require('util');

var bleno = require('bleno');

var BlenoCharacteristic = bleno.Characteristic;

var read_count = 0;

var ProstheticFlexStatusCharacteristic = new BlenoCharacteristic({
    uuid: '58d3c1f4-b253-4055-9d02-3932126539f8',
    properties: ['read', 'notify'],
    value: null,
    onReadRequest:
	    function(offset, callback) {
		    // FIXME: handle offset

		    callback(this.RESULT_SUCCESS, Buffer.from([read_count]));
		    read_count += 1;
	    }
});

module.exports = ProstheticFlexStatusCharacteristic;
