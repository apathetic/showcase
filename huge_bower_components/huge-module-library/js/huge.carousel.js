/* global Huge */
/**
 * @fileOverview The Huge Carousel base module
 * @author Tim McDuffie <tmcduffie@hugeinc.com>
 */


/**
 * Carousel UI component base module.
 * @param {Element} rootElem Root element for the module.
 * @param {string} opt_slidesSelector Selector string for slides. This is searched for within the rootElem.
 */
var Carousel = function(rootElem, opt_slidesSelector) {
  if (!rootElem) {
    throw new Error('Carousel requires a rootElem.');
  }

  Huge.parent(this);

  var slideSelector = opt_slidesSelector || Carousel.slidesSelector;
  this.rootElem = rootElem;
  this.slides = this.rootElem.querySelectorAll(slideSelector);
  this.activeSlideIndex = 0;
  this.totalSlides = this.slides.length;
  this.previousResetValue = 0;
  this.nextResetValue = this.totalSlides - 1;
  this.updateSlideClassNames_();

  this.mediator.publish(Carousel.eventNames.AFTER_CONSTRUCT, this);
};
Huge.inherit(Carousel, Module);


Carousel.slidesSelector = '.slide';


/**
 * Classname map.
 * @enum {string}
 */
Carousel.classNames = {
  PREV: 'prev',
  NEXT: 'next',
  ACTIVE: 'active'
};


Carousel.eventNames = {
  AFTER_CONSTRUCT: 'after-construct',
  BEFORE_NEXT: 'before-next',
  AFTER_NEXT: 'after-next',
  BEFORE_PREV: 'before-prev',
  AFTER_PREV: 'after-prev',
  BEFORE_GOTO: 'before-goto',
  AFTER_GOTO: 'after-goto'
};


/**
 * Advances the carousel to the next slide.
 * @return {Carousel} the carousel instance.
 */
Carousel.prototype.next = function() {
  this.mediator.publish(Carousel.eventNames.BEFORE_NEXT, this);

  var nextSlide = this.activeSlideIndex + 1;
  nextSlide = (nextSlide < this.totalSlides) ? nextSlide : this.nextResetValue;
  this.goTo(nextSlide);
  return this;
};


/**
 * Rewinds the carousel to the previous slide.
 * @return {Carousel} the carousel instance.
 */
Carousel.prototype.previous = function() {
  this.mediator.publish(Carousel.eventNames.BEFORE_PREV, this);

  var prevSlide = this.activeSlideIndex - 1;
  prevSlide = (prevSlide >= 0) ? prevSlide : this.previousResetValue;
  this.goTo(prevSlide);
  return this;
};


/**
 * Navigate the carousel to the selected index.
 * @param  {number} index 0 based index of the slide to navigate to.
 */
Carousel.prototype.goTo = function(index) {
  if (index < 0 || index >= this.totalSlides) {
    throw new Error('Requested index is outside aceptable bounds.');
  }

  this.mediator.publish(Carousel.eventNames.BEFORE_GOTO, this);

  this.activeSlideIndex = +index;
  this.updateSlideClassNames_();

  this.mediator.publish(Carousel.eventNames.AFTER_GOTO, this);
  return this;
};


/**
 * Updates the classnames of slides. All slides preceeding the active slide are marked as previous. All
 *     slides foloing the active slide are marked as next. The active slide is marked as such.
 * @private
 */
Carousel.prototype.updateSlideClassNames_ = function() {
  var classNames;
  for (var i = 0; i < this.totalSlides; i++) {
    classNames = this.slides[i].className = this.slides[i].className
      .replace(Carousel.classNames.ACTIVE, '')
      .replace(Carousel.classNames.NEXT, '')
      .replace(Carousel.classNames.PREV, '')
      .trim();
    if (i < this.activeSlideIndex) {
      classNames += (' ' + Carousel.classNames.PREV);
    } else if (i > this.activeSlideIndex) {
      classNames += ' ' + Carousel.classNames.NEXT;
    } else if (i === this.activeSlideIndex) {
      classNames += ' ' + Carousel.classNames.ACTIVE;
    }
    this.slides[i].className = classNames.trim();
  }
};
