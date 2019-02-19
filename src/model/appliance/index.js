const subscriptionFactory = require(`../subscription`);
const readCurrentOutputFile = require(`../util/readCurrentOutputFile`);
const currentIsAmbient = require(`../util/currentIsAmbient`);
const calculateCurrentBaseline = require(`../util/calculateCurrentBaseline`);

const applianceFactory = (name, displayName, outputFile, onChange) => {
  let baseline = null;
  let enabled = true; //TODO: set to false as default
  const subscription = subscriptionFactory();

  const readCurrent = () => readCurrentOutputFile(outputFile);

  const checkForData = minPoints => {
    return readCurrent().then(data => {
      if (data.length < minPoints) {
        checkForData();
      }
      return data;
    });
  };

  const getName = () => {
    return name;
  };

  const getDisplayName = () => {
    return displayName;
  };

  const getSubscribers = () => {
    return subscription.getSubscribers();
  };

  const addSubscriber = address => {
    subscription.subscribe(address);
  };

  const removeSubscriber = address => {
    subscription.unsubscribe(address);
  };

  const isEnabled = () => {
    return enabled;
  };

  setInterval(() => {
    if (baseline === null) {
      checkForData(100)
        .then(calculateCurrentBaseline)
        .then(res => (baseline = res));
    }
    checkForData(5).then(data => {
      const recentData = [];

      for (let i = 1; i <= 5; i++) {
        recentData.push(data[data.length - i]);
      }

      const ambientFlag = currentIsAmbient(recentData, baseline);
      if ((ambientFlag && enabled) || !(ambientFlag || enabled)) {
        enabled = !enabled;
        if (onChange) {
          onChange(enabled);
        }
      }
    });
  }, 1000);

  return {
    getName,
    getDisplayName,
    getSubscribers,
    addSubscriber,
    removeSubscriber,
    isEnabled,
  };
};

module.exports = applianceFactory;
