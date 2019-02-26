const checkForData = require(`./checkForData`);
const currentIsAmbient = require(`./currentIsAmbient`);

const MIN_DATA_POINTS = 5;

module.exports = (path, onChange, parser) => {
  return checkForData({ path, minPoints: MIN_DATA_POINTS, parser }).then(
    data => {
      const ambientFlag = currentIsAmbient(data, appliance.getBaseline());
      const enabled = appliance.isEnabled;

      if ((ambientFlag && enabled) || !(ambientFlag || enabled)) {
        appliance.toggleEnabled();
        if (onChange) {
          onChange(appliance);
        }
      }
    }
  );
};
