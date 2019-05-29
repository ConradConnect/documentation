exports.main = function main(call) {
  console.log('widget service started');
  const { params: { lang = 'en' } } = call;

  if (call.inter === 'Widget') {
    let html, subTitle;

    // first call: func is "start"
    if (call.func === 'start') {
      if (lang === 'de') {
        subTitle = 'Mein zweites Widget';
        html = 'Hallo Welt! Das ist mein zweites Widget.<br>';
        html += 'Bitte gibt deinen Namen ein:<br>';
        html += '<input type="text" name="name"/><br>';
        html += '<input type="button" onclick="sendInputs()" value="Los" />';
      } else {
        subTitle = 'My second Widget';
        html = 'Hello World! This is my second Widget.<br>';
        html += 'Please enter your name:<br>';
        html += '<input type="text" name="name"/><br>';
        html += '<input type="button" onclick="sendInputs()" value="Go" />';
      }
    } else {
      // call.func === 'interact'
      // after submitting the inputs
      if (lang === 'de') {
        subTitle = 'Mein zweites Widget';
        html = `Sei gegrüßt, ${call.params.inputs.name}`;
      } else {
        subTitle = 'My second Widget';
        html = `Hello ${call.params.inputs.name}`;
      }
    }

    return { html, subTitle };

  }

  if (call.inter === 'ServiceMarketplace') {
    let html;
    if (lang === 'de') {
      html = 'Hallo Welt! Nun wurde mein zweites Widget im Service Marketplace aktiviert.';
    } else {
      html = 'Hello World! My second widget has been activated in the Service Marketplace right now.';
    }

    return { html };
  }
}
