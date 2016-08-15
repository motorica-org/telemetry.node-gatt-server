var bleno = require('bleno');

var BlenoPrimaryService = bleno.PrimaryService;

var ProstheticFlexStatusCharacteristic = require('./characteristic');

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
