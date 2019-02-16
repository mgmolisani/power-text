const nodemailer = require(`nodemailer`);

module.exports = (user, pass, smtpConfig) => {
  const transporter = nodemailer.createTransport({
    auth: { user, pass },
    ...smtpConfig,
  });

  return {
    sendMessage: ({ to, subject, text }) => {
      const data = {
        from: user,
        to,
        subject,
        text,
      };

      transporter.sendMail(data, err => {
        if (err) throw err;
      });
    },
  };
};
