import nodemailer from 'nodemailer';
import pug from 'pug';
import path from 'path';
import { htmlToText } from 'html-to-text';

export class Email {
  constructor(user, url) {
    this.to = user.email;
    this.firstName = user.name.split(' ')[0];
    this.url = url;
    this.from = `Kiruba <${process.env.EMAIL_FROM}>`;
    this.__dirname = path.resolve();
  }

  newTransport() {
    // CREATE A TRANSPORTER
    if (process.env.NODE_ENV === 'production') {
      //   SENDGRID EMAIL
      return nodemailer.createTransport({
        service: 'SendGrid',
        auth: {
          user: process.env.SENDGRID_USERNAME,
          pass: process.env.SENDGRID_PASSWORD,
        },
      });
    }
    // return nodemailer.createTransport({
    //   service: 'SendGrid',
    //   auth: {
    //     user: process.env.SENDGRID_USERNAME,
    //     pass: process.env.SENDGRID_PASSWORD,
    //   },
    // });
    return nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: process.env.EMAIL_PORT,
      auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD,
      },
    });
  }

  async send(template, subject) {
    // RENDER HTML BASED ON PUG TEMPLATE
    const html = pug.renderFile(
      `${this.__dirname}/backend/utils/emailTemplates/${template}.pug`,
      {
        firstName: this.firstName,
        url: this.url,
        subject,
      }
    );
    // DEFINE EMAIL OPTIONS
    const mailOptions = {
      from: this.from,
      to: this.to,
      subject,
      html,
      text: htmlToText(html),
    };

    // CREATE A TRANSPORT AND SEND EMAIL
    // await transporter.sendMail(mailOptions) - Reference
    await this.newTransport().sendMail(mailOptions);
  }

  async sendWelcome() {
    await this.send('welcome', 'Welcome to the Hempire Family!!');
  }

  async passwordReset() {
    await this.send(
      'passwordReset',
      'Your password reset token (Valid only for 10 minutes)'
    );
  }
}
