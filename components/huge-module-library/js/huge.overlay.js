/* global Huge */
/**
 * @fileOverview The Huge Overlay base module
 * @author Tim McDuffie <tmcduffie@hugeinc.com>
 */


/**
 * Overlay UI component base module.
 * @param {Element} rootElem Root element for the module.
 * @param {Element} opt_contentContainer
 */
var Overlay = function(rootElem, opt_contentContainer) {
  if (!rootElem) {
    throw new Error('Overlay requires a rootElem.');
  }

  Huge.parent(this);

  this.rootElem = rootElem;
  this.contentContainer = opt_contentContainer || this.rootElem;
  this.rootElem.className += ' ' + Overlay.classNames.DEFAULT;

  this.mediator.publish(Overlay.eventNames.AFTER_CONSTRUCT, this);
};
Huge.inherit(Overlay, Module);


Overlay.classNames = {
  DEFAULT: 'overlay',
  OPENED: 'opened',
  CLOSED: 'closed'
};


Overlay.eventNames = {
  AFTER_CONSTRUCT: 'after-construct',
  BEFORE_OPEN: 'before-open',
  AFTER_OPEN: 'after-open',
  BEFORE_CLOSE: 'before-close',
  AFTER_CLOSE: 'after-close',
  BEFORE_SET_SIZE: 'before-set-size',
  AFTER_SET_SIZE: 'after-set-size',
  BEFORE_SET_POSITION: 'before-set-position',
  AFTER_SET_POSITION: 'after-set-position',
  BEFORE_SET_CONTENT: 'before-set-content',
  AFTER_SET_CONTENT: 'after-set-content'
};


Overlay.prototype.isOpen = false;


Overlay.prototype.open = function(opt_position, opt_dimensions) {
  this.mediator.publish(Overlay.eventNames.BEFORE_OPEN, this);

  var className;
  if (!this.isOpen) {
    if (opt_dimensions) {
      this.setSize(opt_dimensions.width, opt_dimensions.height);
    }

    if (opt_position) {
      this.setPosition(opt_position.top, opt_position.right, opt_position.bottom, opt_position.left);
    }

    className = this.rootElem.className;
    className = className.replace(Overlay.classNames.CLOSED, '').trim();
    className += ' ' + Overlay.classNames.OPENED;
    this.rootElem.className = className;
    this.isOpen = true;
  }

  this.mediator.publish(Overlay.eventNames.AFTER_OPEN, this);
};

Overlay.prototype.close = function() {
  this.mediator.publish(Overlay.eventNames.BEFORE_CLOSE, this);

  var className;
  if (!!this.isOpen) {
    className = this.rootElem.className;
    className = className.replace(Overlay.classNames.OPENED, '').trim();
    className += ' ' + Overlay.classNames.CLOSED;
    this.rootElem.className = className;
    this.isOpen = false;
  }

  this.mediator.publish(Overlay.eventNames.AFTER_CLOSE, this);
};

Overlay.prototype.setSize = function(width, height) {
  this.mediator.publish(Overlay.eventNames.BEFORE_SET_SIZE, this);

  this.rootElem.style.height = height;
  this.rootElem.style.width = width;

  this.mediator.publish(Overlay.eventNames.AFTER_SET_SIZE, this);
};

Overlay.prototype.setPosition = function(top, right, bottom, left) {
  this.mediator.publish(Overlay.eventNames.BEFORE_SET_POSITION, this);

  this.rootElem.style.top = top || '';
  this.rootElem.style.right = right || '';
  this.rootElem.style.bottom = bottom || '';
  this.rootElem.style.left = left || '';

  this.mediator.publish(Overlay.eventNames.AFTER_SET_POSITION, this);
};

Overlay.prototype.setContent = function(content) {
  this.mediator.publish(Overlay.eventNames.BEFORE_SET_CONTENT, this);

  var container = this.contentContainer;
  var text;
  if (content instanceof HTMLElement) {
    container.innerHTML = '';
    container.appendChild(content);
  } else if (typeof content === 'string' || content instanceof Text) {
    text = typeof content === 'string' ? content : content.textContent;
    container.innerHTML = text;
  } else {
    throw new Error('Overlay.setContent expects the content to either be an HTML Element or string');
  }

  this.mediator.publish(Overlay.eventNames.AFTER_SET_CONTENT, this);
};
