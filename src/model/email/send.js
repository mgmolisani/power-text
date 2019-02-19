const nodemailer = require(`nodemailer`);

module.exports = (user, pass, smtpConfig) => {
  const transporter = nodemailer.createTransport({
    auth: { user, pass },
    ...smtpConfig,
  });

  return {
    sendMessage: ({ to, subject, text }) => {
      return new Promise(resolve => {
        const data = {
          from: user,
          to,
          subject,
          text,
        };

        transporter.sendMail(data, (err, info) => {
          if (err) throw err;
          resolve(info);
        });
      });
    },
  };
};
