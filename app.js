require(`dotenv`).config();

const app = require(`./src/controller`);

//app.run();

const { addAppliance, getAppliances } = require(`./src/model`);

const dryer = {
  name: `MD1`,
  displayName: `Mike's Dryer`,
  outputFile: `some/path`,
};

addAppliance(dryer);

console.log(getAppliances());
