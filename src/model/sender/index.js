const nodemailer = require(`nodemailer`);

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST, // `smtp.gmail.com`
  port: parseInt(process.env.SMTP_PORT), // 465
  secure: process.env.SMTP_TLS === `true`, // true
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD,
  },
});

const sendMail = ({ to, text }) => {
  const data = {
    from: process.env.EMAIL,
    to,
    subject: `You a bitch`,
    text,
  };

  transporter.sendMail(data, err => {
    if (err) throw err;
  });
};

module.exports.sendMail = sendMail;
