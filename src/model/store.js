const { createStore, combineReducers } = require(`redux`);
const appliances = require(`./reducer`);

module.exports = createStore(combineReducers({ appliances }));
