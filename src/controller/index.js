const emailService = require(`../model/email`);
const Appliance = require(`../model/appliance`);

const dryer = new Appliance(`LG1`, `Mike's Dryer`, 60000);
dryer.enabled = true;

const imapConfig = {
  host: process.env.IMAP_HOST, // `_imap.gmail.com`
  port: parseInt(process.env.IMAP_PORT), // 993
  tls: process.env.IMAP_TLS === `true`, // true
};

const smtpConfig = {
  host: process.env.SMTP_HOST, // `smtp.gmail.com`
  port: parseInt(process.env.SMTP_PORT), // 465
  secure: process.env.SMTP_TLS === `true`, // true
};

const email = emailService(
  process.env.EMAIL,
  process.env.PASSWORD,
  imapConfig,
  smtpConfig
);

const controller = {
  run: () =>
    email.readMessages(res => {
      const { from, attachments } = res;

      attachments.forEach(attachment => {
        email.sendMessage({
          to: from.text,
          text: attachment.content,
        });
      });
    }),
};

module.exports = controller;
