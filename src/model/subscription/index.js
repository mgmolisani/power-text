const { bindActionCreators } = require(`redux`);
const { dispatch, getState } = require(`../store`);
const { actionCreators } = require(`./actions`);

const { addSubscription, removeSubscription } = bindActionCreators(
  actionCreators,
  dispatch
);

module.exports = {
  addSubscription,
  removeSubscription,
  getSubscribersForAppliance: applianceId => {
    return Object.values(getState().subscriptions).reduce(
      (subscribers, subscription) =>
        subscription.applianceId === applianceId
          ? [...subscribers, subscription.address]
          : subscribers,
      []
    );
  },
  getAppliancesForSubscriber: address => {
    return Object.values(getState().subscriptions).reduce(
      (appliances, subscription) =>
        subscription.address === address
          ? [...appliances, getState().appliances[subscription.applianceId]]
          : appliances,
      []
    );
  },
};
