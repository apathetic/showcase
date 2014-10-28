/* global Huge, UiBridge */
/**
 * @fileOverview The Huge Overlay keyboard control interface.
 * @author Tim McDuffie <tmcduffie@hugeinc.com>
 */



var OverlayKeyboard = function(overlay) {
  Huge.parent(this, overlay);

  this.overlay = overlay;

  // use self = this for event listeners until function.prototype.bind is more widely supported (IE8)
  var self = this;

  document.addEventListener('keyup', function(e) {
    self.handleElemClick.call(self, e);
  });
};
Huge.inherit(OverlayKeyboard, UiBridge);


OverlayKeyboard.requiredAPI = ['rootElem', 'close'];

OverlayKeyboard.prototype.handleElemClick = function() {
  if (this.overlay.isOpen) {
    this.overlay.close();
  }
};
