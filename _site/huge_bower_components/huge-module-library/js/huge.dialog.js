/* global Huge, Overlay */
/**
 * @fileOverview The Huge Dialog base module
 * @author Tim McDuffie <tmcduffie@hugeinc.com>
 */


/**
 * Dialog UI component base module.
 * @param {Element} rootElem Root element for the module.
 * @param {string} opt_slidesSelector Selector string for slides. This is searched for within the rootElem.
 */
var Dialog = function(rootElem) {
  if (!rootElem) {
    throw new Error('Dialog requires a rootElem.');
  }

  Huge.parent(this, rootElem);

  this.rootElem.className += ' ' + Dialog.classNames.DEFAULT;

  this.mediator.publish(Dialog.eventNames.AFTER_CONSTRUCT, this);
};
Huge.inherit(Dialog, Overlay);


Dialog.classNames = {
  DEFAULT: 'dialog',
  OPENED: 'opened',
  CLOSED: 'closed'
};


Dialog.eventNames = {
  BEFORE_SET_POSITION_SETUP: 'before-set-position-setup',
  AFTER_SET_POSITION_SETUP: 'after-set-position-setup'
};


Dialog.topMultiplier = .1;


Dialog.maxWidthPercentage = 50;


/**
 * @inheritDoc
 */
Dialog.prototype.rootElem = undefined;


Dialog.prototype.isOpen = false;


Dialog.prototype.open = function() {
  this.setPosition();
  Huge.parent(this, 'open');
};


Dialog.prototype.setPosition = function() {
  this.mediator.publish(Dialog.eventNames.BEFORE_SET_POSITION_SETUP, this);

  var top, right, bottom, left;
  left = (Dialog.maxWidthPercentage/2).toString() + '%';
  top = (document.body.scrollTop + Dialog.topMultiplier * window.innerHeight).toString() + 'px';
  right = (Dialog.maxWidthPercentage/2).toString() + '%';

  this.mediator.publish(Dialog.eventNames.AFTER_SET_POSITION_SETUP, this);
  Huge.parent(this, 'setPosition', top, right, bottom, left);
};
