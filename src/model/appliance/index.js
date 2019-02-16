const Subscription = require(`../subscription`);

class Appliance {
  constructor(name, displayName, frequency) {
    this.name = name;
    this.displayName = displayName;
    this.enabled = false;
    this.subscription = new Subscription();
    this._current = 0;
    this._frequency = frequency;

    setInterval(this._checkStatus, this._frequency);
  }

  getSubscribers() {
    return this.subscription.subscribers;
  }

  addSubscription(address, callback) {
    if (!this.enabled) {
      const error = new Error(`${this.displayName} is not currently enabled.`);
      if (callback) callback(error, this);
    } else {
      this.subscription.subscribe(address);
      if (callback) callback(null, this);
    }
  }

  removeSubscription(address, callback) {
    this.subscription.unsubscribe(address);
    callback(this);
  }

  isEnabled() {
    return this.enabled;
  }

  _checkStatus() {
    if (this._current > 0) {
      this.enabled = true;
    } else {
      this.enabled = false;
    }
  }
}

module.exports = Appliance;
