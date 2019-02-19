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

const emailService = require(`../model/email`)(
  process.env.EMAIL,
  process.env.PASSWORD,
  imapConfig,
  smtpConfig
);

const { appliances } = require(`../model`);

const toggleSubscription = (address, appliance) => {
  if (appliance.getSubscribers().has(address)) {
    appliance.removeSubscriber(address);
    return false;
  } else {
    appliance.addSubscriber(address, err => {
      if (err) throw err;
    });
    return true;
  }
};

const onMessageRead = msg => {
  const { from, attachments } = msg;
  const to = from.text;

  attachments.forEach(attachment => {
    const content = attachment.content.toString(`utf8`);
    const applianceIndex = appliances.findIndex(
      appliance =>
        appliance.getName().toLowerCase() === content.toLowerCase().trim()
    );
    const email = {
      to,
      subject: ``,
      text: ``,
    };

    if (applianceIndex !== -1) {
      const appliance = appliances[applianceIndex];
      const name = appliance.getName();
      const displayName = appliance.getDisplayName();

      const subscribed = toggleSubscription(to, appliance);

      if (subscribed) {
        email.subject = `You have subscribed to updates for ${displayName}!`;
        email.text = `To unsubscribe, respond with "${name}".`;
      } else {
        email.subject = `You have unsubscribed from updates for ${displayName}!`;
      }
    } else {
      const applianceListString = appliances
        .map(
          appliance => `${appliance.getName()}: ${appliance.getDisplayName()}`
        )
        .join(`\n`);

      email.subject = `${content} is not a valid choice`;
      email.text =
        `Please respond with one of the following:\n\n` +
        `${applianceListString}`;
    }

    emailService.sendMessage(email);
  });
};

const run = () =>
  emailService.readMessages(onMessageRead).finally(() => {
    setTimeout(() => run(), 1000);
  });

module.exports = {
  run,
};
