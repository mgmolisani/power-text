const { ADD_APPLIANCE, REMOVE_APPLIANCE } = require(`./actions`).actionTypes;
const { setProperty, deleteProperty } = require(`../util/reducerHelpers`);
const applianceReducer = require(`./appliance/reducer`);

module.exports = (state = {}, action) => {
  switch (action.type) {
    case ADD_APPLIANCE:
      return setProperty(state, action.payload);
    case REMOVE_APPLIANCE:
      return deleteProperty(state, action.payload);
    default:
      return Object.keys(state).reduce((newState, key) => {
        return {
          ...newState,
          [key]: applianceReducer(state[key], action),
        };
      }, {});
  }
};
