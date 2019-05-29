exports.main = function main(call) {
  console.log('widget service started');
  const { params: { lang = 'en' } } = call;

  // call.inter contains the name of the interface
  // that triggered this execution
  if (call.inter === 'Widget') {
    let html, subTitle;
    if (lang === 'de') {
      subTitle = 'Mein erstes Widget';
      html = 'Hallo Welt! Das ist mein erstes Widget.';
    } else {
      subTitle = 'My first Widget';
      html = 'Hello World! This is my first Widget.';
    }

    // return for the Widget interface is html and subTitle
    return { html, subTitle };

  }

  // the ServiceMarketplace interface is still needed
  // to activate the widget
  if (call.inter === 'ServiceMarketplace') {
    let html;
    if (lang === 'de') {
      html = 'Hallo Welt! Nun wurde mein erstes Widget im Service Marketplace aktiviert.';
    } else {
      html = 'Hello World! My first widget has been activated in the Service Marketplace right now.';
    }

    return { html };
  }
}
