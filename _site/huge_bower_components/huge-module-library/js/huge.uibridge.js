/**
 * @file Defines the base UiBridge for the Huge JS Component Library.
 * @author Tim McDuffie <tmcduffie@hugeinc.com>
 */



var UiBridge = function(module) {
  if (!module) {
    throw new Error('a module is required for the interface to be applied');
  }

  this.module = module;
  this.checkRequiredApi_();
};


UiBridge.prototype.checkRequiredApi_ = function() {
  var requirements = this.constructor.requiredAPI;
  if (requirements) {
    for (var i = 0; i < requirements.length; i++) {
      if (typeof this.module[requirements[i]] === 'undefined') {
        throw new Error('\'' + requirements[i] + '\' is a required API member.');
      }
    }
  }
};
