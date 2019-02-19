const applianceFactory = require(`../model/appliance`);

const dryer = applianceFactory(
  `LG1`,
  `Mike's Dryer`,
  `/Users/mgmolisani/Documents/projects/iot/power-text/test.txt`
);

const washer = applianceFactory(
  `WM1`,
  `Mike's Washer`,
  `/Users/mgmolisani/Documents/projects/iot/power-text/test.txt`
);

const appliances = [dryer, washer];

module.exports = {
  appliances,
};
