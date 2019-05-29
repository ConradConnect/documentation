
const mydaco = require('mydaco');
const { fillTemplate } = require('./Template.js');

exports.main = async function main(call) {

  const { params: { lang = 'en' } } = call;
  let text;

  // retrieve all devices in account
  const devices = await getMyDevices();
  if (lang === 'de') {
    text = 'Das sind deine Geräte:';
  } else {
    text = 'You have these devices:';
  }
  const html = fillTemplate({ text, devices });
  return { html };
}

// get all devices in the user's account
async function getMyDevices() {
  // first retrieve providers
  const devices = await mydaco.interface('IotCore', 'devices', {});
  // the devices could be directly filtered by "types" "properties" and/or "events"
  console.log(devices);

  const deviceInformation = devices.map(device => `${device.name} - ${device.metadata.types.join(', ')}`);
  return deviceInformation;
}
