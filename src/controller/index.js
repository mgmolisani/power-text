const sendMail = require(`../model/sender`).sendMail;
const connect = require(`../model/reciever`).connect;

const controller = {
  run: () => connect(sendMail),
};

module.exports = controller;
