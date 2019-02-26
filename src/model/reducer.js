const { ADD_APPLIANCE, REMOVE_APPLIANCE } = require(`./actions`).actionTypes;
const { setProperty, deleteProperty } = require(`./util/reducerHelpers`);
const applianceReducer = require(`./appliance/reducer`);

module.exports = (state = {}, action) => {
  switch (action.type) {
    case ADD_APPLIANCE:
      return setProperty(state, action.appliance.id, action.appliance);
    case REMOVE_APPLIANCE:
      return deleteProperty(state, action.id);
    default:
      return state.keys().reduce((newState, key) => {
        return {
          ...newState,
          [key]: applianceReducer(state[key], action),
        };
      }, {});
  }
};
