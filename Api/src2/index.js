const mydaco = require('mydaco');

async function main(call) {
    const { inter, func, params } = call

    if (inter === 'Api' && func === 'endpoint') {
      // Called via the '/api' endpoint
      console.info('Called by Bearer Token: ' + params.bearerToken)
      console.info('The request had this body: ' + params.body)
    }
    else {
        // Create Bearer Token
        const bearerToken = await mydaco.interface('Api', 'createBearerToken', {});

        const config = {
            verb: 'POST',
            url: 'https://yourdomain.com:3000/data',
            body: { token: bearerToken.id },
        };
        // Send the created token to the external server
        const result = await mydaco.interface('Api', 'request', config);
    }
}

exports.main = main;
