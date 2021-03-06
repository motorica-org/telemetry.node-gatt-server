const bleno = require('bleno');
const ProstheticFlexStatusCharacteristic = require('./characteristic');

const mProstheticFlexStatusCharacteristic = new ProstheticFlexStatusCharacteristic([0]);

const ProstheticFlexStatusService = new bleno.PrimaryService({uuid: 'e35c8bac-a062-4e3f-856d-2cfa87f2f171',
                                                              characteristics: [mProstheticFlexStatusCharacteristic]});

bleno.on('stateChange', (state) => {
  console.log(`on -> stateChange: ${state}`);

  if (state === 'poweredOn') {
    bleno.startAdvertising('echo', [ProstheticFlexStatusService.uuid]);
  } else {
    bleno.stopAdvertising();
  }
});

bleno.on('advertisingStart', (error) => {
  console.log(`on -> advertisingStart: ${error ? `error ${error}` : 'success'}`);

  if (!error) {
    bleno.setServices([
      ProstheticFlexStatusService,
    ]);
  }
});

console.log('bleno - echo');

process.stdin.setRawMode(true);  // don't require Enter to get keystrokes
process.stdin.resume();          // resume parent processes's stdin
process.stdin.setEncoding('utf8');
console.log('Press any key to update ProstheticFlexStatusCharacteristic\'s value');

let i = 0;
process.stdin.on('data', (key) => {
  if (key === '\u0003') { // C-c
    process.exit();
  }
  mProstheticFlexStatusCharacteristic.value = [i];
  i += 1;
});
