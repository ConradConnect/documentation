const mydaco = require('mydaco');

async function main(params) {

    const config = {
        verb: 'GET',
        url: 'https://raw.githubusercontent.com/ConradConnect/documentation/master/Api/HelloWorld.txt'
    };

    const result = await mydaco.interface('Api', 'request', config);

    return { html: result.body };
}

exports.main = main;
