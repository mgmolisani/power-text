require(`dotenv`).config();

const app = require(`./src/controller`);

app.run();
setInterval(() => app.run(), 60000);
