// Import mydaco interfaces
const mydaco = require('mydaco');

exports.main = async function main(call) {
  // Retrieve language from parameters
  const { params: { lang = 'en' } } = call;
  let title;
  let html;

  const number = await getNumber();

  // Choose title and body (html) based on the language of the user.
  if (lang === 'de') {
    title = 'Mein Key Value Service';
    html = `Hallo Welt! Immer wenn irgendjemand diesen Service aufruft, erhöht sich die Zahl um 1: <b>${number}</b>`;
  } else {
    title = 'My Key Value Service';
    html = `Hello World! Everytime anyone calls this service, the number is incremented by 1: <b>${number}</b>`;
  }

  await setNumber(number + 1);

  return { html, title };
}

// Get the number from the KeyValueStore
async function getNumber() {
  const parameters = {
    key: 'sharedNumber'
  };
  try {
    const result = await mydaco.interface('KeyValueStore', 'getShared', parameters);
    if (typeof result.value === 'number') {
      // result.value holds the value read from the KeyValueStore
      return result.value;
    }
    // Ignore errors (e.g. first call)
  } catch (error) { }
  return 0;
}

// Save the number using the key 'sharedNumber'
async function setNumber(number) {
  const parameters = {
    key: 'sharedNumber',
    value: number
  }
  return await mydaco.interface('KeyValueStore', 'putShared', parameters);
}
