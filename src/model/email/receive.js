const Imap = require(`imap`);
const parser = require(`mailparser`).simpleParser;

class ReceiveService {
  constructor(user, password, imapConfig) {
    this._imap = new Imap({ user, password, ...imapConfig });
    this.connect = this.connect.bind(this);
  }

  connect(handleMessage) {
    const onReady = handleMessage => {
      this._imap.openBox(`INBOX`, true, err =>
        handleMostRecentEmail(err, handleMessage)
      );
    };

    const onError = err => {
      console.log(err);
    };

    const onEnd = () => {
      console.log(`Connection ended`);
    };

    const handleMostRecentEmail = (err, handleMessage) => {
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
                handleMessage({
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
        this._imap.end();
      };

      const emails = this._imap.seq.fetch(`*`, {
        bodies: ``,
      });

      emails.on(`message`, onMessage);
      emails.once(`error`, onError);
      emails.once(`end`, onEnd);
    };

    this._imap.once(`ready`, () => onReady(handleMessage));
    this._imap.once(`error`, onError);
    this._imap.once(`end`, onEnd);
    this._imap.connect();
  }
}

module.exports = ReceiveService;
