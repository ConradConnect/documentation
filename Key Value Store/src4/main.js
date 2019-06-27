// Import mydaco interfaces
const mydaco = require('mydaco');

exports.main = async function main(call) {
  const keys = [1, 2, 3, 4, 5, 'a', 'b', 'c', 'd', 'e'];
  keys.push(new Date('1/1/2019'));
  keys.push(new Date('2/1/2019'));
  keys.push(new Date('2/10/2019'));
  keys.push(new Date('3/18/2019'));
  keys.push(new Date('4/5/2019'));

  const promises = keys.map(key => mydaco.interface('KeyValueStore', 'put', { key, value: 'testvalue' }));
  await Promise.all(promises);

  const listParams = [
    { gt: 2, lt: 5 },
    { gt: 'a', lt: 'd' },
    { gt: new Date('1/1/2019'), lt: new Date('4/5/2019') },
  ];

  const listPromises = listParams.map(f => mydaco.interface('KeyValueStore', 'list', { filter: f }));
  const result = await Promise.all(listPromises);

  const { params: { lang = 'en' } } = call;

  let html;
  if (lang === 'de') {
    html = `Zahlen: ${JSON.stringify(result[0].keys)}<br>`;
    html += `Buchstaben: ${JSON.stringify(result[1].keys)}<br>`;
    html += `Daten: ${JSON.stringify(result[2].keys)}<br>`;
  } else {
    html = `Numbers: ${JSON.stringify(result[0].keys)}<br>`;
    html += `Letters: ${JSON.stringify(result[1].keys)}<br>`;
    html += `Dates: ${JSON.stringify(result[2].keys)}<br>`;
  }
  return { html };
};
