require(`dotenv`).config();

require(`./src/model/util/readCurrentOutputFile`)(
  `/Users/mgmolisani/Documents/projects/iot/power-text/test.txt`
);

const app = require(`./src/controller`);

app.run();
