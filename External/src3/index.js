const mydaco = require('mydaco');
const qs = require('qs');

async function main(call) {
    const { inter, func, params } = call;
    const { lang = 'en' } = params;

    if (inter === 'External' && func === 'start') {
        let html;
        if (lang === 'de') {
            html = `Danke fürs externe aufrufen der Action. Das Objekt ist ${JSON.stringify(params.obj)}.`;
        } else {
            html = `Thanks for calling the action form external. The Object is ${JSON.stringify(params.obj)}.`;
        }
        return {
            html,
        };
    }

    // Create Bearer Token
    const tokenAndUrls = await mydaco.interface('External', 'createBearerToken', {});

    const obj = {
        some: {
            object: ['with', 'internal'],
            string: 'structure',
        },
    };
    // 'lang' is optional but required if you want the Action call and its environment to receive the correct language
    const url = `${tokenAndUrls.browserUrl}?${qs.stringify({ lang, obj })}`;
    let html;
    if (lang === 'de') {
        html = `Bitte diesen Link öffnen <br> ${url}`;
    } else {
        html = `Please open this link <br> ${url}`;
    }
    return { html };
}

exports.main = main;
