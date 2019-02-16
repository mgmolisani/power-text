const Imap = require(`imap`);
const parser = require(`mailparser`).simpleParser;

module.exports = (user, password, imapConfig) => {
  const imap = new Imap({ user, password, ...imapConfig });
  return {
    readMessages: handleMessage => {
      const onReady = () => {
        console.log(`Connection ready`);
        imap.openBox(`INBOX`, true, err =>
          onInboxOpen(err, handleMessage)
        );
      };

      const onError = err => {
        console.log(err);
      };

      const onEnd = () => {
        console.log(`Connection ended`);
      };

      const onInboxOpen = (err, handleMessage) => {
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

                handleMessage(res);
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

        const emails = imap.seq.fetch(`1:*`, {
          bodies: ``,
        });

        emails.on(`message`, onMessage);
        emails.once(`error`, onError);
        emails.once(`end`, onEnd);
      };

      imap.once(`ready`, onReady);
      imap.once(`error`, onError);
      imap.once(`end`, onEnd);
      imap.connect();
    },
  };
};
