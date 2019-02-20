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

const model = require(`../model`)();
const view = require(`../view`)(
  process.env.EMAIL,
  process.env.PASSWORD,
  imapConfig,
  smtpConfig
);

let i = 0;
setInterval(() => {
  i++;
  fs.appendFile(`test.txt`, `${i % 1000 >= 500 ? 20 : 1}\n`, function(err) {
    if (err) throw err;
  });
}, 10);

const onStatusChange = appliance => {
  const name = appliance.getName();
  const displayName = appliance.getDisplayName();
  appliance.getSubscribers().forEach(subscriber => {
    const email = {
      to: subscriber,
      subject: ``,
      text: ``,
    };
    if (appliance.isEnabled()) {
      email.subject = `${displayName} has turned on!`;
      email.text =
        `You are receiving this message because you have subscribed to updates from ${displayName}. ` +
        `To unsubscribe, respond with "${name}".`;
    } else {
      appliance.removeSubscriber(subscriber);
      email.subject = `${displayName} has turned off!`;
      email.text =
        `You are receiving this message because you have subscribed to updates from ${displayName}. ` +
        `You will now be unsubscribed from ${displayName}. ` +
        `To resubscribe, respond with "${name}".`;
    }

    view.sendMessage(email).catch(err => console.log(err));
  });
};

model.addAppliance(`LG1`, `Mike's Dryer`, `test.txt`, onStatusChange);
model.addAppliance(`WM1`, `Mike's Washer`, `test.txt`, onStatusChange);

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
        email.text =
          `${displayName} is currently ${
            appliance.isEnabled() ? `on` : `off.`
          }\n` +
          `To unsubscribe, respond with "${name}". ` +
          `You will automatically be unsubscribed the next time ${displayName} turns off.`;
      } else {
        email.subject =
          `You have unsubscribed from updates for ${displayName}! ` +
          `To resubscribe, respond with "${name}".`;
      }
    } else {
      const applianceListString = appliances
        .map(
          appliance => `${appliance.getName()}: ${appliance.getDisplayName()}`
        )
        .join(`\n`);

      email.subject = `${content} is not a valid choice`;
      email.text =
        `Please respond with one of the following:\n` +
        `${applianceListString}`;
    }

    let errCount = 0;
    view.sendMessage(email).catch(err => {
      console.log(err);
      errCount++;
      if (errCount >= 10) {
        onMessageRead(msg);
      }
    });
  });
};

const run = () =>
  view
    .readMessages(onMessageRead)
    .catch(err => console.log(err))
    .finally(() => {
      setTimeout(run, 1000);
    });

module.exports = {
  run,
};
