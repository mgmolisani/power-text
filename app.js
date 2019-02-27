require(`dotenv`).config();

const { getState } = require(`./src/model/store`);

const app = require(`./src/controller`);

//app.run();

const {
  addAppliance,
  removeAppliance,
  getAppliances,
  addSubscription,
  removeSubscription,
  getSubscribersForAppliance,
  getAppliancesForSubscriber,
} = require(`./src/model`);

const dryer = {
  id: `MD1`,
  displayName: `Mike's Dryer`,
  outputFile: `some/path`,
};

const washer = {
  id: `WM1`,
  displayName: `Mike's Washer`,
  outputFile: `some/path`,
};

addAppliance(dryer);
addAppliance(washer);

addSubscription({ applianceId: `WM1`, address: `abc@123.com` });
// addSubscription({ applianceId: `WM1`, address: `xyz@123.com` });
// addSubscription({ applianceId: `MD1`, address: `xyz@123.com` });

console.log(getAppliances());
console.log(getSubscribersForAppliance(`WM1`));
// console.log(getAppliancesForSubscriber(`xyz@123.com`));

removeAppliance(`WM1`);

// removeSubscription({ applianceId: `WM1`, address: `xyz@123.com` });

console.log(getAppliances());
console.log(getSubscribersForAppliance(`WM1`));
// console.log(getAppliancesForSubscriber(`xyz@123.com`));
