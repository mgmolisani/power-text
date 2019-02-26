const { ADD_SUBSCRIBER, REMOVE_SUBSCRIBER } = require(`./actions`);

module.exports = (state = new Set(), action) => {
  switch (action.type) {
    case ADD_SUBSCRIBER:
      return new Set(state).add(action.address);
    case REMOVE_SUBSCRIBER:
      return new Set(state).delete(action.address);
    default:
      return state;
  }
};
