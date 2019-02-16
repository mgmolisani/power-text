const nodemailer = require(`nodemailer`);

class SendService {
  constructor(user, pass, smtpConfig) {
    this._email = user;
    this._transporter = nodemailer.createTransport({
      auth: { user, pass },
      ...smtpConfig,
    });
    this.send = this.send.bind(this);
  }

  send({ to, subject, text }) {
    const data = {
      from: this._email,
      to,
      subject,
      text,
    };

    this._transporter.sendMail(data, err => {
      if (err) throw err;
    });
  }
}

module.exports = SendService;
