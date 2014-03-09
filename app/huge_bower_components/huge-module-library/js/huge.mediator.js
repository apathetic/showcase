/**
 * @file Defines the Mediator (pubsub) for the Huge JS Component Library.
 * @author Tim McDuffie <tmcduffie@hugeinc.com>
 *
 * Source adapted from https://github.com/addyosmani/pubsubz/blob/master/pubsubz.js
 */



var Mediator = function() {
  this.topics_ = {};
  this.token = -1;
};


Mediator.prototype.subscribe = function(topic, func) {
  var token = (++this.token).toString();
  this.topics_[topic] = this.topics_[topic] || [];
  this.topics_[topic].push({
    token: token, func: func
  });
  return {token: token, topic: topic};
};


Mediator.prototype.unsubscribe = function(hash) {
  var topic = hash.topic;
  var token = hash.token;

  if (this.topics_[topic]) {
    for (var i = 0; i < this.topics_[topic].length; i++) {
      if (this.topics_[topic][i].token) {
        this.topics_[topic].splice(i, 1);
        return hash;
      }
    }
  }
  return false;
};


Mediator.prototype.publish = function(topic, data) {
  if (!this.topics_[topic]) {
    return false;
  }

  var listeners = this.topics_[topic].reverse();
  var length = listeners ? listeners.length : 0;

  // using the setTimeout allows the method to return before listeners are fired.
  setTimeout(function () {
      while (length--) {
          listeners[length].func(data);
      }
  }, 0);

  return true;
};
