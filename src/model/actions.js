const ADD_APPLIANCE = `ADD_APPLIANCE`;
const REMOVE_APPLIANCE = `REMOVE_APPLIANCE`;

const actionTypes = {
  ADD_APPLIANCE,
  REMOVE_APPLIANCE,
};

const addAppliance = ({ id, displayName, outputFile }) => {
  const appliance = {
    id,
    displayName,
    outputFile,
  };

  return {
    type: ADD_APPLIANCE,
    id,
    appliance,
  };
};

const removeAppliance = id => {
  return {
    type: REMOVE_APPLIANCE,
    id,
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
