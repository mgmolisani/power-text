const subscriptionFactory = require(`../subscription`);
const readCurrentOutputFile = require(`../util/readCurrentOutputFile`);
const currentIsAmbient = require(`../util/currentIsAmbient`);
const calculateCurrentBaseline = require(`../util/calculateCurrentBaseline`);

const applianceFactory = (name, displayName, outputFile, onChange) => {
  const self = {};
  let baseline = null;
  let enabled = false;
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
        .then(data => calculateCurrentBaseline(data.splice(0, 100)))
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
          onChange(self);
        }
      }
    });
  }, 50);

  self.getName = getName;
  self.getDisplayName = getDisplayName;
  self.getSubscribers = getSubscribers;
  self.addSubscriber = addSubscriber;
  self.removeSubscriber = removeSubscriber;
  self.isEnabled = isEnabled;

  return self;
};

module.exports = applianceFactory;
