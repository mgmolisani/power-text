const Imap = require(`imap`);
require(`dotenv`).config();

const imap = new Imap({
  user: process.env.EMAIL,
  password: process.env.PASSWORD,
  host: process.env.HOST, // 'imap.gmail.com',
  port: parseInt(process.env.PORT), // 993
  tls: process.env.TLS === `true`, // true
});

const onReady = () => {
  imap.openBox(`INBOX`, true, readMostRecentEmail);
};

const onError = err => {
  console.log(err);
};

const onEnd = () => {
  console.log(`Connection ended`);
};

const readMostRecentEmail = err => {
  if (err) throw err;

  const onMessage = msg => {
    msg.on(`body`, stream => {
      let buffer = ``;

      const onData = chunk => {
        buffer += chunk.toString();
      };

      const onEnd = () => {
        console.log(Imap.parseHeader(buffer));
      };

      stream.on(`data`, onData);
      stream.once(`end`, onEnd);
    });
  };

  const onError = err => {
    console.log(`Fetch error: ` + err);
  };

  const onEnd = () => {
    //imap.end();
  };

  const emails = imap.seq.fetch(`*`, {
    bodies: `HEADER.FIELDS (FROM)`,
  });

  emails.on(`message`, onMessage);
  emails.once(`error`, onError);
  emails.once(`end`, onEnd);
};

imap.once(`ready`, onReady);
imap.once(`error`, onError);
imap.once(`end`, onEnd);
imap.connect();
