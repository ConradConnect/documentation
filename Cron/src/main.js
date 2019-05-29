
//import interfaces in mydaco
const mydaco = require('mydaco');

exports.main = async function (call) {
  if (call.inter === 'Cron') {
    return await handleCron();
  }
  return await handleInit(call.params);
}

async function handleInit(params) {
  const { lang = 'en' } = params;
  let html;

  const number = await getNumber();

  // cron pattern for every minute
  const cronPatterns = ['* * * * *'];

  if (lang === 'de') {
    try {
      await setCron(cronPatterns);
      html = `Hallo Welt! Das ist mein Cron Service. Die aktuelle Nummer ist: <b>${number}</b>. Der Counter wird nun zurückgesetzt.`;
    } catch (error) {
      html = 'Hallo Welt! Das ist mein Cron Service. Leider ging etwas schief.';
    }
  } else {
    try {
      await setCron(cronPatterns);
      html = `Hello World! This is my cron service. The current number is<b>${number}</b>. The counter will be resetted.`;
    } catch (error) {
      html = 'Hello World! This is my cron service. Unfortunately, something went wrong.';
    }
  }

  // reset
  await setNumber(0);

  return { html, lang };
}

async function handleCron() {
  const number = await getNumber();
  if (number >= 5) {
    // stop cron if number too high
    const cronPatterns = [];
    await setCron(cronPatterns);
  } else {
    await setNumber(number + 1);
  }
  return {};
}

function setCron(cronPatterns) {
  // send cron patterns. This service is automatically called based on them.
  return mydaco.interface('Cron', 'put', { cronPatterns });
}

// function to get the number from the KeyValueStore
async function getNumber() {
  const parameters = {
    key: 'cronNumber'
  };
  try {
    const result = await mydaco.interface('KeyValueStore', 'get', parameters);
    if (typeof result.value === 'number') {
      // result.value hold the value saved to the KeyValueStore
      return result.value;
    }
    // ignore errors (e.g. first call)
  } catch (error) { }
  return 0;
}

// save the number using the key: cronNumber
async function setNumber(number) {
  const parameters = {
    key: 'cronNumber',
    value: number
  }
  return await mydaco.interface('KeyValueStore', 'put', parameters);
}
