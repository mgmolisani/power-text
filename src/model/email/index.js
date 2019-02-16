const recieveService = require(`./receive`);
const sendService = require(`./send`);

module.exports = (email, password, receiveConfig, sendConfig) => {
  const receiver = recieveService(email, password, receiveConfig);
  const sender = sendService(email, password, sendConfig);

  return {
    readMessages: receiver.readMessages,
    sendMessage: sender.sendMessage,
  };
};
