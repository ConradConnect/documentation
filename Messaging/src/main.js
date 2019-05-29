
//import interfaces in mydaco
const mydaco = require('mydaco');
const { mailDE, mailEN } = require('./mailTemplates');

exports.main = async function (call) {
    // retrieve language from parameters
    const { params: { lang = 'en' } } = call;

    let html;

    if (lang === 'de') {
        try {
            const subject = 'Meine erste Mail';
            const text = 'Das ist meine erste Mail mit Conrad Connect. Sie ist als Text geschrieben';
            // send email in german
            await sendMail(subject, text, mailDE);
            // email sending is not activated in the testing environment!

            html = 'Hallo Welt! Das ist mein Mail Service. Ich habe dir gerade eine Mail geschickt.';
        } catch (error) {
            html = 'Hallo Welt! Das ist mein Mail Service. Leider ging etwas schief.';
        }
    } else {
        try {
            const subject = 'My first Mail';
            const text = 'This is my first mail with Conrad Connect. It is written as text';
            // send email in english
            await sendMail(subject, text, mailEN);
            // email sending is not activated in the testing environment!

            html = 'Hello World! This is my mail service. I have just send you a mail';
        } catch (error) {
            html = 'Hello World! This is my mail service. Unfortunately, something went wrong.';
        }
    }
    return { html };
}

function sendMail(subject, text, html) {
    const parameters = { subject, text, html };
    // send a mail using the mydaco interface 'Mail'
    // email sending is not activated in the testing environment!
    return mydaco.interface('Messaging', 'sendEmail', parameters);
}
