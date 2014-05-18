/* global Huge */
/**
 * @fileOverview The Huge Carousel pagination interface.
 * @author Tim McDuffie <tmcduffie@hugeinc.com>
 */



var Pagination = function(carousel, opt_rootElem, opt_goToClassName, opt_slideIdAttributeName) {
    Huge.parent(this, carousel);

    this.carousel = carousel;
    this.rootElem = opt_rootElem || carousel.rootElem;
    this.goToClassName = opt_goToClassName || Pagination.goToClassName;
    this.slideIdAttributeName = opt_slideIdAttributeName || Pagination.slideIdAttributeName;

    this.classNames = {
        ACTIVE: 'active'
    };

    // use self = this for event listeners until function.prototype.bind is more widely supported (IE8)
    var self = this;
    this.rootElem.addEventListener('click', function(e) {
        self.handleElemClick.call(self, e);
    });

    this.module.mediator.subscribe(Carousel.eventNames.AFTER_GOTO, function(e) {
        self.updatePaginationView.call(self, e);
    });

    this.updatePaginationView();
};
Huge.inherit(Pagination, UiBridge);



Pagination.requiredAPI = ['rootElem', 'goTo'];

Pagination.goToClassName = 'goto';

Pagination.slideIdAttributeName = 'data-slide-id';

Pagination.prototype.handleElemClick = function(e) {
    var trigger = e.target || e.srcElement;

    if (trigger.className.indexOf(this.goToClassName) !== -1) {
        this.carousel.goTo(trigger.getAttribute(this.slideIdAttributeName));
    }
};



Pagination.prototype.updatePaginationView = function() {

    var pages = this.rootElem.querySelectorAll('.' + this.goToClassName);

    for (var i = 0; i < this.carousel.totalSlides; i++) {
        classNames = pages[i].className = pages[i].className
            .replace(this.classNames.ACTIVE, '')
            .trim();
        if (i === this.carousel.activeSlideIndex) {
            classNames += ' ' + this.classNames.ACTIVE;
        }
        pages[i].className = classNames.trim();
    }
}
