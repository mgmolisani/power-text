const Imap = require(`imap`);
const parser = require(`mailparser`).simpleParser;

const imap = new Imap({
  user: process.env.EMAIL,
  password: process.env.PASSWORD,
  host: process.env.IMAP_HOST, // `imap.gmail.com`
  port: parseInt(process.env.IMAP_PORT), // 993
  tls: process.env.IMAP_TLS === `true`, // true
});

const onReady = subscriptionCallback => {
  imap.openBox(`INBOX`, true, err =>
    handleMostRecentEmail(err, subscriptionCallback)
  );
};

const onError = err => {
  console.log(err);
};

const onEnd = () => {
  console.log(`Connection ended`);
};

const handleMostRecentEmail = (err, subscriptionCallback) => {
  if (err) throw err;

  const onMessage = msg => {
    msg.on(`body`, stream => {
      let buffer = ``;

      const onData = chunk => {
        buffer += chunk.toString();
      };

      const onEnd = () => {
        parser(buffer, (err, res) => {
          if (err) throw err;

          const { from, attachments } = res;

          attachments.forEach(attachment => {
            subscriptionCallback({
              to: from.text,
              text: attachment.content,
            });
          });
        });
      };

      stream.on(`data`, onData);
      stream.once(`end`, onEnd);
    });
  };

  const onError = err => {
    console.log(`Fetch error: ` + err);
  };

  const onEnd = () => {
    imap.end();
  };

  const emails = imap.seq.fetch(`*`, {
    bodies: ``,
  });

  emails.on(`message`, onMessage);
  emails.once(`error`, onError);
  emails.once(`end`, onEnd);
};

const connect = subscriptionCallback => {
  imap.once(`ready`, () => onReady(subscriptionCallback));
  imap.once(`error`, onError);
  imap.once(`end`, onEnd);
  imap.connect();
};

module.exports.connect = connect;
