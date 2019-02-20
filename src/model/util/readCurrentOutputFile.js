const fs = require(`fs`);
const readline = require(`readline`);

module.exports = (path, parser = parseFloat) => {
  return new Promise(resolve => {
    const lines = [];

    const rl = readline.createInterface({
      input: fs.createReadStream(path),
      crlfDelay: Infinity,
    });

    rl.on(`line`, line => {
      lines.push(parser(line));
    });

    rl.once(`close`, () => {
      resolve(lines);
    });
  });
};
