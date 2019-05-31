// the main function will be called
exports.main = function main(call) {

  // retrieve language from parameters
  const { params: { lang = 'en' } } = call;

  let html;

  //Choose body (html) based on the language of the user.
  if (lang === 'de') {
    html = 'Hallo Welt! Das ist mein erster Service für den Service Marketplace.';
  } else {
    html = 'Hello World! This is my first Service for the Service Marketplace.';
  }

  // we return html  since this is needed for the ServiceMarketplace interface
  return { html };
}
