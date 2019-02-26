const ADD_SUBSCRIBER = `ADD_SUBSCRIBER`;
const REMOVE_SUBSCRIBER = `REMOVE_SUBSCRIBER`;

const actionTypes = {
  ADD_SUBSCRIBER,
  REMOVE_SUBSCRIBER,
};

const addSubscriber = address => {
  return {
    type: ADD_SUBSCRIBER,
    address,
  };
};

const removeSubscriber = address => {
  return {
    type: REMOVE_SUBSCRIBER,
    address,
  };
};

const actionCreators = {
  addSubscriber,
  removeSubscriber,
};

module.exports = {
  actionTypes,
  actionCreators,
};
