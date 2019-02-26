require(`dotenv`).config();

const app = require(`./src/controller`);

//app.run();

const { addAppliance, getAppliances } = require(`./src/model`);

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

console.log(getAppliances());
