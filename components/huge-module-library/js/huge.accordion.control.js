/* global Huge, UiBridge, Accordion */
/**
 * @fileOverview The Huge Accordion control interface.
 * @author Tim McDuffie <tmcduffie@hugeinc.com>
 */



var AccordionControl = function(accordion, controlElem, opt_methodName) {
  Huge.parent(this, accordion);

  if (!controlElem) {
    throw new Error('Accordion Control element is a required parameter');
  }

  if (!!opt_methodName && typeof accordion[opt_methodName] !== 'function') {
    throw new Error('Method "' + opt_methodName + '"" does not exist on the accordion');
  }

  this.accordion = accordion;
  this.controlElem = controlElem || this.accordion.controlElem;
  this.methodName = opt_methodName || AccordionControl.methodName;

  // use self = this for event listeners until function.prototype.bind is more widely supported (IE8)
  var self = this;
  this.controlElem.addEventListener('click', function(e) {
    self.handleControlClick.call(self, e);
  });
};
Huge.inherit(AccordionControl, UiBridge);


AccordionControl.requiredAPI = ['toggle', 'expand', 'contract']; // Maybe we should standardize 'collapse' vs 'contract'

AccordionControl.methodName = 'toggle';

AccordionControl.contractedText = 'Expand';

AccordionControl.expandedText = 'Collapse';

AccordionControl.prototype.shouldChangeControlText = false;

AccordionControl.prototype.handleControlClick = function(e) {
  this.accordion[this.methodName]();
};

AccordionControl.prototype.changeControlText = function(opt_contractedText, opt_expandedText) {
  this.shouldChangeControlText = true;
  this.contractedText = opt_contractedText || AccordionControl.contractedText;
  this.expandedText = opt_expandedText || AccordionControl.expandedText;

  var self = this;
  this.accordion.mediator.subscribe(Accordion.eventNames.BEFORE_EXPAND, function() {
    self.setControlText_.call(self, self.expandedText);
  });
  this.accordion.mediator.subscribe(Accordion.eventNames.BEFORE_CONTRACT, function() {
    self.setControlText_.call(self, self.contractedText);
  });

  if (this.accordion.isOpen) {
    this.setControlText_(this.expandedText);
  } else {
    this.setControlText_(this.contractedText);
  }
};

AccordionControl.prototype.setControlText_ = function(text) {
  this.controlElem.textContent = text;
};
