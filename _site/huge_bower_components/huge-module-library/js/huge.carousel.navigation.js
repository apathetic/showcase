/* global Huge */
/**
 * @fileOverview The Huge Carousel navigation interface.
 * @author Tim McDuffie <tmcduffie@hugeinc.com>
 */



var Navigation = function(carousel, opt_rootElem, opt_previousClassName, opt_nextClassName) {
  Huge.parent(this, carousel);

  this.carousel = carousel;
  this.rootElem = opt_rootElem || carousel.rootElem;
  this.previousClassName = opt_previousClassName || Navigation.previousClassName;
  this.nextClassName = opt_nextClassName || Navigation.nextClassName;

  // use self = this for event listeners until function.prototype.bind is more widely supported (IE8)
  var self = this;
  this.rootElem.addEventListener('click', function(e) {
    self.handleElemClick.call(self, e);
  });
};
Huge.inherit(Navigation, UiBridge);


Navigation.requiredAPI = ['rootElem', 'next', 'previous'];

Navigation.previousClassName = 'prev';

Navigation.nextClassName = 'next';

Navigation.prototype.handleElemClick = function(e) {
  var trigger = e.target || e.srcElement;
  if (trigger.className.indexOf(this.previousClassName) !== -1) {
    this.carousel.previous();
  } else if (trigger.className.indexOf(this.nextClassName) !== -1) {
    this.carousel.next();
  }
};
