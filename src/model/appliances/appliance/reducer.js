// const subscriptionFactory = require(`./src/model/subscription`);
// const readCurrentOutputFile = require(`./src/model/util/readCurrentOutputFile`);
// const currentIsAmbient = require(`./src/model/util/currentIsAmbient`);
// const calculateCurrentBaseline = require(`./src/model/util/calculateCurrentBaseline`);
//
// const applianceFactory = (name, displayName, outputFile, onChange) => {
//   const self = {};
//   let baseline = null;
//   let enabled = false;
//   const subscription = subscriptionFactory();
//
//   const readCurrent = () => readCurrentOutputFile(outputFile /*TODO: parser*/);
//
//   const checkForData = minPoints => {
//     return readCurrent().then(data => {
//       if (data.length < minPoints) {
//         return checkForData();
//       }
//       return data;
//     });
//   };
//
//   const getName = () => {
//     return name;
//   };
//
//   const getDisplayName = () => {
//     return displayName;
//   };
//
//   const getSubscribers = () => {
//     return subscription.getSubscribers();
//   };
//
//   const addSubscriber = address => {
//     subscription.subscribe(address);
//   };
//
//   const removeSubscriber = address => {
//     subscription.unsubscribe(address);
//   };
//
//   const isEnabled = () => {
//     return enabled;
//   };
//
//   const readBaseline = () => {
//     return checkForData(100)
//       .then(data => calculateCurrentBaseline(data.splice(0, 100)))
//       .then(res => (baseline = res));
//   };
//
//   const readData = () => {
//     return checkForData(5).then(data => {
//       const ambientFlag = currentIsAmbient(
//         data.splice(data.length - 5, data.length),
//         baseline
//       );
//
//       if ((ambientFlag && enabled) || !(ambientFlag || enabled)) {
//         enabled = !enabled;
//         console.log(`I changed and I am now ${enabled ? `on` : `off`}`);
//         if (onChange) {
//           onChange(self);
//         }
//       }
//     });
//   };
//
//   const update = () => {
//     (baseline === null ? readBaseline() : readData()).finally(() => {
//       setTimeout(update, 100);
//     });
//   };
//
//   update();
//
//   self.getName = getName;
//   self.getDisplayName = getDisplayName;
//   self.getSubscribers = getSubscribers;
//   self.addSubscriber = addSubscriber;
//   self.removeSubscriber = removeSubscriber;
//   self.isEnabled = isEnabled;
//
//   return self;
// };
//
// module.exports = applianceFactory;
//
module.exports = (state = {}, action) => state;
