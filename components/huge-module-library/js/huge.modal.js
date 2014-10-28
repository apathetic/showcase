/* global Huge, Overlay */
/**
 * @fileOverview The Huge Modal base module
 * @author Tim McDuffie <tmcduffie@hugeinc.com>
 */


/**
 * Modal UI component base module.
 * @param {Element} rootElem Root element for the module.
 * @param {Element} contentContainer
 */
var Modal = function(rootElem, contentContainer) {
  if (!rootElem) {
    throw new Error('Modal requires a rootElem.');
  }

  Huge.parent(this, rootElem, contentContainer);
  Modal.instances.push(this);

  this.rootElem.className += ' ' + Modal.classNames.DEFAULT;

  this.mediator.publish(Modal.eventNames.AFTER_CONSTRUCT, this);
};
Huge.inherit(Modal, Overlay);


Modal.classNames = {
  DEFAULT: 'modal',
  OPENED: 'opened',
  CLOSED: 'closed'
};


Modal.eventNames = {
  BEFORE_CLOSE_OTHERS: 'before-close-others',
  AFTER_CLOSE_OTHERS: 'after-close-others'
};


Modal.instances = [];


Modal.prototype.isOpen = false;


Modal.prototype.open = function() {
  this.mediator.publish(Modal.eventNames.BEFORE_CLOSE_OTHERS, this);

  for (var i = 0; i < Modal.instances.length; i++) {
    if (Modal.instances[i] !== this) {
      Modal.instances[i].close();
    }
  }

  this.mediator.publish(Modal.eventNames.AFTER_CLOSE_OTHERS, this);
  Huge.parent(this, 'open');
};
