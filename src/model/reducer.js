const { ADD_APPLIANCE, REMOVE_APPLIANCE } = require(`./actions`).actionTypes;

module.exports = (state = new Map(), action) => {
  switch (action.type) {
    case ADD_APPLIANCE:
      return new Map(state).set(action.name, action.appliance);
    case REMOVE_APPLIANCE:
      return new Map(state).delete(action.name);
    default:
      return state;
  }
};
