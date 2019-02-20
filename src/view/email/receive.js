const Imap = require(`imap`);
const parser = require(`mailparser`).simpleParser;

module.exports = (user, password, imapConfig) => {
  return {
    readMessages: onMessageRead => {
      return new Promise(resolve => {
        const imap = new Imap({ user, password, ...imapConfig });

        const onReady = () => {
          // console.log(`Connection successful`);
          // console.log(`Opening inbox`);
          imap.openBox(`INBOX`, onInboxOpen);
        };

        const onError = err => {
          throw err;
        };

        const onEnd = () => {
          // console.log(`Connection closed`);
          // console.log(`----------------------------------------\n`);

          resolve();
        };

        const onInboxOpen = err => {
          if (err) throw err;

          // console.log(`Fetching new emails`);

          let i = 0;
          const onMessage = (msg, index) => {
            // console.log(`Reading message #${index}`);
            msg.on(`body`, stream => {
              let buffer = ``;

              const onData = chunk => {
                buffer += chunk.toString();
              };

              const onEnd = () => {
                i++;
                parser(buffer, (err, res) => {
                  if (err) throw err;

                  if (onMessageRead) onMessageRead(res);
                });
              };

              stream.on(`data`, onData);
              stream.once(`end`, onEnd);
            });
          };

          const onEnd = () => {
            // console.log(`${i} message${i !== 1 ? `s` : ``} read`);

            // console.log(`Expunging Inbox`);
            imap.seq.addFlags(`1:*`, `Deleted`, err => {
              if (err) throw err;

              imap.closeBox(err => {
                if (err) throw err;

                // console.log(`Expunging complete`);
                // console.log(`Closing connection`);
                imap.end();
              });
            });
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

        // console.log(`----------------------------------------`);
        // console.log(`Connecting to ${user}`);
        imap.connect();
      });
    },
  };
};
