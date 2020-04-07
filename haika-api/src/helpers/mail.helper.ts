import config from "../config/config"
const nodemailer = require('nodemailer')
const Email = require('email-templates')

async function sendMail( sender: string, to: string, template: any, locals: string ) {

  const transport = {
    type: 'smtp',
    host: 'haika.com',
    port: 465, //587,
    secure: true,
    auth: { user: 'noreply@outlook.com', pass: 'xE3(#B3955%P' },
    tls: {
      rejectUnauthorized: false
    }
  }

  let senderInfo = 'noreply@haika.com'

  if (sender !== 'admin') {
    senderInfo = sender
  }

  const email = new Email({
    transport,
    send: config.env === 'production',
    i18n: {
      phrases: {},
      logger: console,
      directory: './emails/_locale',
      locales: ['en'],
      defaultLocale: 'en',
      synFiles: false,
      autoReload: false,
      updateFiles: true,
      objectNotation: "\\", //true: '.', false: single object
    }
  })

  let message = {
    from: senderInfo,
    to
  }

  return email.send( { template, message, locals })
}

module.exports = {
  sendMail
}
