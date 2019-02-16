class Subscription {
  constructor() {
    this.subscribers = new Set();
  }

  subscribe(address) {
    this.subscribers.add(address);
  }

  unsubscribe(address) {
    this.subscribers.delete(address);
  }
}

module.exports = Subscription;
