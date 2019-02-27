const { createStore } = require(`redux`);
const rootReducer = require(`./reducer`);

module.exports = createStore(rootReducer);
