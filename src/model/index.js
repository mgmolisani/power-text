const applianceFactory = require(`./appliance`);

module.exports = () => {
  const appliances = new Map();

  const addAppliance = (name, displayName, outputFile, onChange) => {
    appliances.set(
      name,
      applianceFactory(name, displayName, outputFile, onChange)
    );
  };

  const removeAppliance = applianceName => {
    appliances.delete(applianceName);
  };

  const getAppliances = () => {
    return appliances;
  };

  return {
    getAppliances,
    addAppliance,
    removeAppliance,
  };
};
