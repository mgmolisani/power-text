const appliancesReducer = require(`./appliances/reducer`);
const subscriptionReducer = require(`./subscription/reducer`);

module.exports = (state = {}, actions) => ({
  appliances: appliancesReducer(state.appliances, actions),
  subscriptions: subscriptionReducer(state.subscriptions, actions),
});
