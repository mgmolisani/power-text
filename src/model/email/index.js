const RecieveService = require(`./receive`);
const SendService = require(`./send`);

class EmailService {
  constructor(email, password, receiveConfig, sendConfig) {
    this._reciever = new RecieveService(email, password, receiveConfig);
    this._sender = new SendService(email, password, sendConfig);
    this.connect = this.connect.bind(this);
  }

  connect() {
    this._reciever.connect(this._sender.send);
  }
}

module.exports = EmailService;
