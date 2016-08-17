const bleno = require('bleno');


// FIXME: reading is currently broken
// For reasons unknown to me, a mere mortal, :method: onReadRequest seemingly does not get triggered if :attribute: value is impld with getters and setters and ES6 class syntax is used (:commit: 8c54783 is fine).
// As subscription works fine and we don't actually need reading ATM, I'll leave that be, but that's *weird*.
class ProstheticFlexStatusCharacteristic extends bleno.Characteristic {
	constructor(value) {
		super({
			uuid: '58d3c1f4-b253-4055-9d02-3932126539f8',
			properties: ['read', 'notify'],
		})
		this._value = Buffer.from(value);
	}
	// we use custom .value attribute because bleno does not care about its' changes by default
	get value() {
		return this._value;
	}
	set value(value) {
		if (value === null) { return; }

		this._value = Buffer.from(value);

		if (this.updateValueCallback) {
			this.updateValueCallback(this.value);
		}
	}
}

module.exports = new ProstheticFlexStatusCharacteristic([0]);
