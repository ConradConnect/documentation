// Import mydaco interfaces
const mydaco = require('mydaco');

exports.main = async function main(call) {
  // Retrieve language from parameters
  const { params: { lang = 'en' } } = call;
  let { version } = call.params;
  let html;

  const { number, storedVersion } = await getNumber();
  version = version || storedVersion;

  // Choose title and body (html) based on the language of the user.
  if (lang === 'de') {
    html = `Hallo Welt! Immer wenn ich diesen Service aufrufe, erhöht sich die Zahl um 2: <b>${number}</b> und die Version <b>${storedVersion}</b> um 1. Wenn ich eine Version bei put oder remove mitschicke, muss dieser der aktuellen entsprechen, sonst scheitert das Update. Somit kann sichergestellt werden, dass konkurierende Zugriffe sich nicht gegenseitig überschreiben.`;
  } else {
    html = `Hello World! Everytime I call this service, the number is incremented by 2: <b>${number}</b> and the version <b>${storedVersion}</b> by 1. I can send the version attribute on put and remove requests and the update will only work if the version matches. This is how I can prevend concurrent executions from overwriting each others data.`;
  }

  try {
    await setNumber(number + 2, version);
  } catch (e) {
    html = `Failed with error message: ${e.message}`;
  }

  return { html };
};

// Get the number from the KeyValueStore
async function getNumber() {
  const parameters = {
    key: 'myNumber',
  };

  const result = await mydaco.interface('KeyValueStore', 'get', parameters);
  if (typeof result.value === 'number') {
    // result.value holds the value saved to the KeyValueStore
    return {
      number: result.value,
      storedVersion: result.version,
    };
  }
  // Ignore errors (e.g. first call)

  return {
    number: 0,
    storedVersion: 0,
  };
}

// Save the number using the key 'myNumber'
async function setNumber(number, version) {
  const parameters = {
    key: 'myNumber',
    value: number,
  };
  if (version > 0) {
    parameters.version = version;
  }
  return await mydaco.interface('KeyValueStore', 'put', parameters);
}
