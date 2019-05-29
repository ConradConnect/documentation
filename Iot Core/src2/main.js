
const mydaco = require('mydaco');

exports.main = async function main(call) {
  if (call.inter === 'ServiceMarketplace') {
    if (call.func === 'start') {
      return await first();
    }
    if (call.func === 'interact') {
      return await second(call.params);
    }
  }
  if (call.inter === 'IotCore') {
    buttonEvent();
  }
}

async function first() {
  // retrieve all devices in account
  const devices = await getLampsAndButtons();


  let html = 'Lamps<br>';
  for (const lamp of devices.lamps) {
    html += `<input type="radio" name="lampId" value="${lamp.id}" required> ${lamp.name}<br>`;
  }

  html += 'Buttons<br>';
  for (const button of devices.buttons) {
    html += `<input type="radio" name="buttonId" value="${button.id}" required> ${button.name}<br>`;
  }

  html += `<input type="button" onclick="sendInputs()" value="OK" />`;
  return { html };
}

async function buttonEvent() {
  const value = Math.round(Math.random() * 256 * 256 * 256);
  const hexString = value.toString(16);

  const storage = await mydaco.interface('KeyValueStore', 'get', { key: 'lampId' });

  if (storage.key) {
    const device = storage.value;
    await mydaco.interface('IotCore', 'actuate', { device, property: 'color', value: hexString });
  }
  return {};
}

async function second(params) {
  const { buttonId, lampId } = params.inputs;
  if (!buttonId || !lampId) {
    return { html: 'Please select a proper device.' }
  }
  const message = await deleteOldTasks();

  await mydaco.interface('IotCore', 'createEvent', { event: 'click', device: buttonId });
  await mydaco.interface('KeyValueStore', 'put', { key: 'lampId', value: lampId });

  return { html: `The service is configured. Deleted ${message.length} old events.` };
}

// get all devices in the user's account
async function getLampsAndButtons() {
  const devices = await mydaco.interface('IotCore', 'devices', { types: ['lamp', 'button'] });
  const lamps = devices.filter(device => device.metadata.types.includes('lamp'));
  const buttons = devices.filter(device => device.metadata.types.includes('button'));
  return { lamps, buttons };
}


async function deleteOldTasks() {
  const events = await mydaco.interface('IotCore', 'listEvents', {});
  for (const event of events) {
    await mydaco.interface('IotCore', 'deleteEvent', { task: event.task });
  }
  return events;
}
