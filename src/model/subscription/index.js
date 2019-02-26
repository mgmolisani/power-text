const { bindActionCreators } = require(`redux`);
const { dispatch } = require(`../store`);
const { actionCreators } = require(`./actions`);

const { addSubscriber, removeSubscriber } = bindActionCreators(
  actionCreators,
  dispatch
);

module.exports = {
  addSubscriber,
  removeSubscriber,
  getSubscribers: appliance => {
    return appliance.subscribers;
  },
};
