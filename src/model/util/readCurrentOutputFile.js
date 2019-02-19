const fs = require(`fs`);
const readline = require(`readline`);

module.exports = path => {
  return new Promise(resolve => {
    const lines = [];

    console.log(`Parsing output file`);
    const rl = readline.createInterface({
      input: fs.createReadStream(path),
      crlfDelay: Infinity,
    });

    rl.on(`line`, line => {
      lines.push(line);
    });

    rl.once(`close`, () => {
      console.log(`Output file parsed`);
      resolve(lines);
    });
  });
};
