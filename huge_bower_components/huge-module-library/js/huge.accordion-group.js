/* global Huge, Module, Accodrion */
/**
 * @fileOverview The Huge Accordion base module
 * @author Tim McDuffie <tmcduffie@hugeinc.com>
 */


/**
 * Accordion UI component base module.
 * @param {Element} rootElem Root element for the module.
 * @param {string} opt_slidesSelector Selector string for slides. This is searched for within the rootElem.
 */
var AccordionGroup = function() {
  Huge.parent(this);

};
Huge.inherit(AccordionGroup, Module);


AccordionGroup.prototype.accordions = [];

AccordionGroup.prototype.defaultAccordion = null;


AccordionGroup.prototype.addAccordion = function(accordion) {
  this.accordions.push(accordion);
  var self = this;
  var token = accordion.mediator.subscribe(Accordion.eventNames.BEFORE_EXPAND, function(data) {
    self.closeOthers_(data);
  });
  if (!!this.defaultAccordion) {
    accordion.contract();
  }
  return token;
};


AccordionGroup.prototype.makeDefault = function(accordion) {
  var token;
  if (this.accordions.indexOf(accordion) === -1) {
    token = this.addAccordion(accordion);
  }

  this.defaultAccordion = accordion;

  accordion.expand();
  return token;
};


AccordionGroup.prototype.closeOthers_ = function(openingAccordion) {
  var numOfAccordions = this.accordions.length;
  for (var i = 0; i < numOfAccordions; i++) {
    if (this.accordions[i] !== openingAccordion) {
      this.accordions[i].contract();
    }
  }
};
