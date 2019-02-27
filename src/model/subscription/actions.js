const ADD_SUBSCRIPTION = `ADD_SUBSCRIPTION`;
const REMOVE_SUBSCRIPTION = `REMOVE_SUBSCRIPTION`;

const actionTypes = {
  ADD_SUBSCRIPTION,
  REMOVE_SUBSCRIPTION,
};

const keyGenerator = ({ applianceId, address }) => {
  return `${applianceId}_${address}`;
};

const addSubscription = ({ applianceId, address }) => {
  const id = keyGenerator({ applianceId, address });
  return {
    type: ADD_SUBSCRIPTION,
    payload: {
      [id]: {
        id,
        applianceId,
        address,
      },
    },
  };
};

const removeSubscription = ({ applianceId, address }) => {
  return {
    type: REMOVE_SUBSCRIPTION,
    payload: keyGenerator({ applianceId, address }),
  };
};

const actionCreators = {
  addSubscription,
  removeSubscription,
};

module.exports = {
  actionTypes,
  actionCreators,
};
