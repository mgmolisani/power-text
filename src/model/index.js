const { bindActionCreators } = require(`redux`);
const { dispatch, getState } = require(`./store`);
const { actionCreators } = require(`./actions`);

const { addAppliance, removeAppliance } = bindActionCreators(
  actionCreators,
  dispatch
);

module.exports = {
  addAppliance,
  removeAppliance,
  getAppliances: () => {
    return getState().appliances;
  },
};
