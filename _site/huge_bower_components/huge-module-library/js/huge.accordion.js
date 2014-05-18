/* global Huge, Module */
/**
 * @fileOverview The Huge Accordion base module
 * @author Tim McDuffie <tmcduffie@hugeinc.com>
 */


/**
 * Accordion UI component base module.
 * @param {Element} rootElem Root element for the module.
 * @param {string} opt_slidesSelector Selector string for slides. This is searched for within the rootElem.
 */
var Accordion = function(rootElem, opt_isStartingExpanded, opt_expandedHeight, opt_contractedHeight) {
  if (!rootElem) {
    throw new Error('Accordion requires a rootElem.');
  }

  Huge.parent(this);

  this.rootElem = rootElem;
  this.expandedHeight = opt_expandedHeight || this.calculateHeight_();
  this.contractedHeight = opt_contractedHeight || 0;

  if (!!opt_isStartingExpanded) {
    this.expand();
  } else {
    this.contract();
  }

  this.mediator.publish(Accordion.eventNames.AFTER_CONSTRUCT, this);
};
Huge.inherit(Accordion, Module);


Accordion.classNames = {
  OPEN: 'expanded',
  CLOSED: 'contracted'
};


Accordion.eventNames = {
  AFTER_CONSTRUCT: 'after-construct',
  BEFORE_TOGGLE: 'before-toggle',
  AFTER_TOGGLE: 'after-toggle',
  BEFORE_EXPAND: 'before-expand',
  AFTER_EXPAND: 'after-expand',
  BEFORE_CONTRACT: 'before-contract',
  AFTER_CONTRACT: 'after-contract'
};


Accordion.prototype.isOpen = false;


Accordion.prototype.toggle = function() {
  this.mediator.publish(Accordion.eventNames.BEFORE_TOGGLE, this);

  if (!!this.isOpen) {
    this.contract();
  } else {
    this.expand();
  }

  this.mediator.publish(Accordion.eventNames.AFTER_TOGGLE, this);
};


Accordion.prototype.expand = function() {
  this.mediator.publish(Accordion.eventNames.BEFORE_EXPAND, this);

  var classNames = this.rootElem.className;
  classNames = classNames.replace(Accordion.classNames.CLOSED, '').trim();
  if (classNames.indexOf(Accordion.classNames.OPEN) === -1) {
    classNames += ' ' + Accordion.classNames.OPEN;
  }
  this.rootElem.className = classNames;
  this.rootElem.style.height = (this.expandedHeight + 'px').toString();
  this.isOpen = true;

  this.mediator.publish(Accordion.eventNames.AFTER_EXPAND, this);
};


Accordion.prototype.contract = function() {
  this.mediator.publish(Accordion.eventNames.BEFORE_CONTRACT, this);

  var classNames = this.rootElem.className;
  classNames = classNames.replace(Accordion.classNames.OPEN, '').trim();
  if (classNames.indexOf(Accordion.classNames.CLOSED) === -1) {
    classNames += ' ' + Accordion.classNames.CLOSED;
  }
  this.rootElem.className = classNames;
  this.rootElem.style.height = (this.contractedHeight + 'px').toString();
  this.isOpen = false;

  this.mediator.publish(Accordion.eventNames.AFTER_CONTRACT, this);
};


Accordion.prototype.calculateHeight_ = function() {
  var props = {
    'display': 'block',
    'float': 'none',
    'left' : '-9999px',
    'position': 'absolute',
    'visibility': 'hidden'
  };
  var height = this.rootElem.clientHeight || this.rootElem.offsetHeight;

  if (!height) {
    // iterate once to set the style values so we can calculate the height
    for (var prop in props) {
      if (props.hasOwnProperty(prop)) {
        this.rootElem.style[prop] = props[prop];
      }
    }

    height = this.rootElem.clientHeight || this.rootElem.offsetHeight;

    // iterate again to reset values back to the originals
    for (var prop in props) {
      if (props.hasOwnProperty(prop)) {
        this.rootElem.style[prop] = '';
      }
    }
  }

  return height;
};
