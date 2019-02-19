const fs = require(`fs`);
const readline = require(`readline`);

module.exports = path => {
  return new Promise(resolve => {
    const lines = [];

    const rl = readline.createInterface({
      input: fs.createReadStream(path),
      crlfDelay: Infinity,
    });

    rl.on(`line`, line => {
      lines.push(parseFloat(line));
    });

    rl.once(`close`, () => {
      resolve(lines);
    });
  });
};
