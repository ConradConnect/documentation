const mydaco = require('mydaco');

async function main(call) {
    const { inter, func, params } = call

    if (inter === 'Api' && func === 'endpoint') {
        // Called via the '/api' endpoint
        return {
            html: "Action was called by token " + params.bearerToken + "<br/>The body was " + JSON.stringify(params.body)
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
        // Uncomment the next line if you have the server in place.
        // await mydaco.interface('Api', 'request', config);
        return { html: "Token created and sent to external server<br/>Token: " + bearerToken.bearerToken }
    }
}

exports.main = main;
