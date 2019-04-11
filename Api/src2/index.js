const mydaco = require('mydaco');

async function main(call) {
    const { inter, func, params } = call

    if (inter === 'Api' && func === 'endpoint') {
      // Called via the '/api' endpoint
      return {
          title: "Action was called by token " +  params.bearerToken,
          html: "The body was " + JSON.stringify(params.body)
      }
    }
    else {
        // Create Bearer Token
        const bearerToken = await mydaco.interface('Api', 'createBearerToken', {});

        const config = {
            verb: 'POST',
            url: 'http://yourdomain.com:3333/data',
            body: { token: bearerToken.bearerToken },
        };
        // Send the created token to the external server
        const result = await mydaco.interface('Api', 'request', config);
        return { title: "Token created and sent to external server", html: "Token: " + bearerToken.bearerToken }
    }
}

exports.main = main;
