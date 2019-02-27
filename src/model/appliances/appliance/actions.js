const TOGGLE_ENABLED = `TOGGLE_ENABLED`;
const SET_BASELINE = `SET_BASELINE`;

const actionTypes = {
  TOGGLE_ENABLED,
  SET_BASELINE,
};

const toggleEnabled = id => {
  return {
    type: TOGGLE_ENABLED,
    id,
  };
};

const setBaseline = (id, baseline) => {
  return {
    type: TOGGLE_ENABLED,
    id,
    baseline,
  };
};

const actionCreators = {
  toggleEnabled,
  setBaseline,
};

module.exports = {
  actionTypes,
  actionCreators,
};
