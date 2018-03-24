import * as SendGrid from '@sendgrid/mail';
import { config } from 'config/config';
import { logger } from './winston.lib';

class Mailer {

  constructor() {
    if (!config.sendGrid.apiToken)
      logger.warn('A SendGrid API token has not been configured. You will not be able to send emails.')

    SendGrid.setApiKey(config.sendGrid.apiToken);
  }

  send(to: string, subject: string, html: string, text?: string) {
    SendGrid.send({
      to: 'beep-boop@mean-au-ts.net',
      from: config.sendGrid.from,
      subject: subject,
      text: text,
      html: html,
    });
  }
}

export const mailer = new Mailer();
