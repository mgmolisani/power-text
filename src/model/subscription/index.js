class Subscription {
  constructor() {
    this._subscriptions = new Set();
  }

  subscribe(address) {
    this._subscriptions.add(address);
  }

  unsubscribe(address) {
    this._subscriptions.delete(address);
  }
}

module.exports = Subscription;
