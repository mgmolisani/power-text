module.exports = () => {
  const subscribers = new Set();

  const getSubscribers = () => {
    return Object.freeze(subscribers);
  };

  const subscribe = address => {
    subscribers.add(address);
  };

  const unsubscribe = address => {
    subscribers.delete(address);
  };

  return {
    getSubscribers,
    subscribe,
    unsubscribe,
  };
};
