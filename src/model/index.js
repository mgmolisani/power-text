const appliances = require(`./appliances`);
const subscriptions = require(`./subscription`);

module.exports = {
  ...appliances,
  ...subscriptions,
};
