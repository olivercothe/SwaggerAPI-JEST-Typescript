const mailHelper = require('../helpers/mail.helper')

class NotificationController {
    constructor() {}
    async registeredNewUser ( sender: string,  to: string, link: string, locale: string) {
        return mailHelper.sendMail ( sender, to, 'user_email_verify', { locale: locale, link } )
    }
}

export const notificationApi = new NotificationController();
