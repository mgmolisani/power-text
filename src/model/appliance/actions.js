const TOGGLE_ENABLED = `TOGGLE_ENABLED`;
const SET_BASELINE = `SET_BASELINE`;

const actionTypes = {
  TOGGLE_ENABLED,
  SET_BASELINE,
};

const toggleEnabled = name => {
  return {
    type: TOGGLE_ENABLED,
    name,
  };
};

const setBaseline = (name, baseline) => {
  return {
    type: TOGGLE_ENABLED,
    name,
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
