const readCurrentOutputFile = require(`./src/model/util/readCurrentOutputFile`);

const checkForData = ({ path, minPoints, parser }) => {
  return readCurrentOutputFile(path, parser).then(data => {
    data.length < minPoints ? checkForData({ ...arguments }) : data;
  });
};

module.exports = checkForData;
