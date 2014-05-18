/* global Huge, UiBridge, Accordion */
/**
 * @fileOverview The Huge Carousel navigation interface.
 * @author Tim McDuffie <tmcduffie@hugeinc.com>
 */



var OverlayControl = function(overlay, opt_internalCloseClassName, opt_internalOpenClassName) {
  Huge.parent(this, overlay);

  this.overlay = overlay;
  this.rootElem = this.overlay.rootElem;
  this.containerElem = this.overlay.contentContainer;
  this.internalCloseClassName = opt_internalCloseClassName || OverlayControl.classNames.CLOSE;
  this.internalOpenClassName = opt_internalOpenClassName || OverlayControl.classNames.OPEN;

  // use self = this for event listeners until function.prototype.bind is more widely supported (IE8)

  var self = this
  this.containerElem.addEventListener('click', function(e) {
    self.handleInternalControlClick_.call(self, e);
  });
};
Huge.inherit(OverlayControl, UiBridge);


OverlayControl.requiredAPI = ['rootElem', 'contentContainer', 'open', 'close'];


OverlayControl.classNames = {
  OPEN: 'open',
  CLOSE: 'close'
};


OverlayControl.prototype.handleInternalControlClick_ = function(e) {
  var target = e.target || e.srcElement;
  if (target.className.indexOf(this.internalCloseClassName) !== -1) {
    this.overlay.close();
  } else if (target.className.indexOf(this.internalOpenClassName) !== -1) {
    this.overlay.open();
  }
};


OverlayControl.prototype.addControl_ = function(method, control, opt_preFunc, opt_postFunc) {
  var overlay = this.overlay;

  control.addEventListener('click', function(e) {
    if (opt_preFunc) {
      opt_preFunc(overlay, e);
    }

    overlay[method]();

    if (opt_postFunc) {
      opt_postFunc(overlay, e);
    }
  });
};


OverlayControl.prototype.addOpenControl = function(control, opt_preFunc, opt_postFunc) {
  this.addControl_.call(this, 'open', control, opt_preFunc, opt_postFunc);
};


OverlayControl.prototype.addCloseControl = function(control, opt_preFunc, opt_postFunc) {
  this.addControl_.call(this, 'close', control, opt_preFunc, opt_postFunc);
};