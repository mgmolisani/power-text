const subscriptionFactory = require(`../subscription`);
const readCurrentOutputFile = require(`../util/readCurrentOutputFile`);

const applianceFactory = (name, displayName, outputFile, onChange) => {
  let enabled = true; //TODO: set to false as default
  const subscription = subscriptionFactory();

  const getName = () => {
    return Object.freeze(name);
  };

  const getDisplayName = () => {
    return Object.freeze(displayName);
  };

  const getSubscribers = () => {
    return subscription.getSubscribers();
  };

  const addSubscriber = (address, callback) => {
    let error = null;

    if (!enabled) {
      error = new Error(`${displayName} is not currently enabled.`);
    } else {
      subscription.subscribe(address);
    }

    if (callback) callback(error);
  };

  const removeSubscriber = address => {
    subscription.unsubscribe(address);
  };

  const isEnabled = () => {
    return enabled;
  };

  const checkStatus = () => {
    readCurrentOutputFile(outputFile).then(data => {
      const recentData = [];
      for (let i = 1; i <= 5; i++) {
        recentData.push(data[data.length - i]);
      }
      const average = recentData.reduce((val, acc) => acc + val) / recentData.length;
      return recentData;
    });
  };

  return {
    getName,
    getDisplayName,
    getSubscribers,
    addSubscriber,
    removeSubscriber,
    checkStatus,
  };
};

module.exports = applianceFactory;
