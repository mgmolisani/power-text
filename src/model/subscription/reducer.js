const { setProperty, deleteProperty } = require(`../util/reducerHelpers`);
const {
  ADD_SUBSCRIPTION,
  REMOVE_SUBSCRIPTION,
} = require(`./actions`).actionTypes;
const { REMOVE_APPLIANCE } = require(`../appliances/actions`).actionTypes;

module.exports = (state = {}, action) => {
  switch (action.type) {
    case REMOVE_APPLIANCE:
      return Object.keys(state).reduce(
        (newState, key) =>
          action.payload !== state[key].applianceId
            ? {
                ...newState,
                [key]: state[key],
              }
            : newState,
        {}
      );
    case ADD_SUBSCRIPTION:
      return setProperty(state, action.payload);
    case REMOVE_SUBSCRIPTION:
      return deleteProperty(state, action.payload);
    default:
      return state;
  }
};
