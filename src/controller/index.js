const fs = require(`fs`);

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

const model = require(`../model`)(
  process.env.EMAIL,
  process.env.PASSWORD,
  imapConfig,
  smtpConfig
);

let i = 0;
const interval = setInterval(() => {
  i++;
  fs.appendFile(`test.txt`, `${0}\n`, function(err) {
    if (err) throw err;
  });
  if (i === 101) {
    clearInterval(interval);
  }
}, 10);

model.addAppliance(`LG1`, `Mike's Dryer`, `test.txt`);
model.addAppliance(`WM1`, `Mike's Washer`, `test.txt`);

const toggleSubscription = (address, appliance) => {
  const hasSubscriber = appliance.getSubscribers().has(address);
  if (hasSubscriber) {
    appliance.removeSubscriber(address);
  } else {
    appliance.addSubscriber(address);
  }
  return !hasSubscriber;
};

const onMessageRead = msg => {
  const { from, attachments } = msg;
  const to = from.text;

  attachments.forEach(attachment => {
    const content = attachment.content.toString(`utf8`);
    const email = {
      to,
      subject: ``,
      text: ``,
    };

    const appliances = model.getAppliances();
    const appliance = appliances.get(content.toUpperCase().trim());

    if (appliance) {
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

    model.sendMessage(email);
  });
};

const run = () =>
  model.readMessages(onMessageRead).finally(() => {
    setTimeout(() => run(), 1000);
  });

module.exports = {
  run,
};
