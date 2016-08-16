let bleno = require('bleno');

let BlenoPrimaryService = bleno.PrimaryService;

let ProstheticFlexStatusCharacteristic = require('./characteristic');

console.log('bleno - echo');

bleno.on('stateChange', function(state) {
  console.log('on -> stateChange: ' + state);

  if (state === 'poweredOn') {
    bleno.startAdvertising('echo', ['e35c8bac-a062-4e3f-856d-2cfa87f2f171']);
  } else {
    bleno.stopAdvertising();
  }
});

bleno.on('advertisingStart', function(error) {
  console.log('on -> advertisingStart: ' + (error ? 'error ' + error : 'success'));

  if (!error) {
    bleno.setServices([
      new BlenoPrimaryService({
        uuid: 'e35c8bac-a062-4e3f-856d-2cfa87f2f171',
        characteristics: [
          ProstheticFlexStatusCharacteristic
        ]
      })
    ]);
  }
});


process.stdin.setRawMode(true); // don't require Enter to get keystrokes
process.stdin.resume(); // resume parent processes's stdin
process.stdin.setEncoding('utf8');
console.log('Press any key to update ProstheticFlexStatusCharacteristic\'s value');

let i = 0;
process.stdin.on('data',
		(key) => {
			if (key === '\u0003') { // C-c
				process.exit();
			}
			ProstheticFlexStatusCharacteristic.value = [i];
			i += 1;
		});
