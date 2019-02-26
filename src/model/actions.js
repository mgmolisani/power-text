const ADD_APPLIANCE = `ADD_APPLIANCE`;
const REMOVE_APPLIANCE = `REMOVE_APPLIANCE`;

const actionTypes = {
  ADD_APPLIANCE,
  REMOVE_APPLIANCE,
};

const addAppliance = ({ name, displayName, outputFile }) => {
  const appliance = {
    name,
    displayName,
    outputFile,
  };

  return {
    type: ADD_APPLIANCE,
    name,
    appliance,
  };
};

const removeAppliance = name => {
  return {
    type: REMOVE_APPLIANCE,
    name,
  };
};

const actionCreators = {
  addAppliance,
  removeAppliance,
};

module.exports = {
  actionTypes,
  actionCreators,
};
