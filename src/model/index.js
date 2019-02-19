const emailService = require(`./email`);
const applianceFactory = require(`./appliance`);

module.exports = (user, password, receiveConfig, sendConfig) => {
  const email = emailService(user, password, receiveConfig, sendConfig);
  const { readMessages, sendMessage } = email;
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
    readMessages,
    sendMessage,
  };
};
