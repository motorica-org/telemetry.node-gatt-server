var util = require('util');

var bleno = require('bleno');

var BlenoCharacteristic = bleno.Characteristic;

var EchoCharacteristic = function() {
  EchoCharacteristic.super_.call(this, {
    uuid: '58d3c1f4-b253-4055-9d02-3932126539f8',
    properties: ['read', 'notify'],
    value: Buffer.from([0])
  });
};

util.inherits(EchoCharacteristic, BlenoCharacteristic);

module.exports = EchoCharacteristic;
