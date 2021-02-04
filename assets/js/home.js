(function () {
  'use strict';

  /*!
  MIT License

  Copyright (c) 2013, 2017 wes hatch

  Permission is hereby granted, free of charge, to any person obtaining a copy
  of this software and associated documentation files (the "Software"), to deal
  in the Software without restriction, including without limitation the rights
  to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
  copies of the Software, and to permit persons to whom the Software is
  furnished to do so, subject to the following conditions:

  The above copyright notice and this permission notice shall be included in all
  copies or substantial portions of the Software.

  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
  IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
  FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
  AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
  LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
  OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
  SOFTWARE.
  */
  var Carousel = function Carousel(container, options) {
    var this$1 = this;
    if ( options === void 0 ) { options={}; }


    this.handle = container;

    // default options
    this.options = {
      animateClass: 'animate',
      activeClass: 'active',
      slideWrap: 'ul',
      slides: 'li',         // the slides
      infinite: true,       // set to true to be able to navigate from last to first slide, and vice versa
      display: 1,           // the minimum # of slides to display at a time. If you want to have slides
                              // "hanging" off outside the currently viewable ones, they'd be included here.
      disableDragging: false, // set to true if you'd like to only use the API to navigate
      initialIndex: 0       // slide index where the carousel should start
    };

    // state vars
    this.current = 0;
    this.slides = [];
    this.sliding = false;
    this.cloned = 0;
    this.active = true;

    // touch vars
    this.dragging = false;
    this.dragThreshold = 50;
    this.deltaX = 0;

    // feature detection
    this.isTouch = 'ontouchend' in document;
    ['transform', 'webkitTransform', 'MozTransform', 'OTransform', 'msTransform'].forEach(function (t) {
      if (document.body.style[t] !== undefined) { this$1.transform = t; }
    });

    // set up options
    this.options = this._assign(this.options, options);

    // engage engines
    this.init();
  };

  /**
   * Initialize the carousel and set some defaults
   * @param{object} options List of key: value options
   * @return {void}
   */
  Carousel.prototype.init = function init () {
      var this$1 = this;

    this.slideWrap = this.handle.querySelector(this.options.slideWrap);
    this.slides = this.slideWrap.querySelectorAll(this.options.slides);
    this.numSlides = this.slides.length;
    this.current = this.options.initialIndex;

    if (!this.slideWrap || !this.slides || this.numSlides < this.options.display) { 
      console.log('Carousel: insufficient # slides');
      return this.active = false;
    }
    if (this.options.infinite) { this._cloneSlides(); }

    this._createBindings();
    this._getDimensions();
    this.go(this.current, false);

    if (!this.options.disableDragging) {
      if (this.isTouch) {
        ['touchstart', 'touchmove', 'touchend', 'touchcancel'].map(function (event) {
          this$1.handle.addEventListener(event, this$1._bindings[event]);
        });
      } else {
        ['mousedown', 'mousemove', 'mouseup', 'mouseleave', 'click'].map(function (event) {
          this$1.handle.addEventListener(event, this$1._bindings[event]);
        });
      }
    }

    window.addEventListener('resize', this._bindings['resize']);
    window.addEventListener('orientationchange', this._bindings['orientationchange']);

    return this;
  };

  /**
   * Removes all event bindings.
   * @returns {Carousel}
   */
  Carousel.prototype.destroy = function destroy () {
      var this$1 = this;

    if (!this.active) { return; }

    for (var event in this$1._bindings) {
      this$1.handle.removeEventListener(event, this$1._bindings[event]);
    }

    window.removeEventListener('resize', this._bindings['resize']);
    window.removeEventListener('orientationchange', this._bindings['orientationchange']);

    this._bindings = null;
    this.options = this.slides = this.slideWrap = this.handle = null;
    this.active = false;

    // remove classes ...
    // remove clones ...
  };

  /**
   * Go to the next slide
   * @return {void}
   */
  Carousel.prototype.next = function next () {
    if (this.options.infinite || this.current !== this.numSlides-1) {
      this.go(this.current + 1);
    } else {
      this.go(this.numSlides-1);
    }
  };

  /**
   * Go to the previous slide
   * @return {void}
   */
  Carousel.prototype.prev = function prev () {
    if (this.options.infinite || this.current !== 0) {
      this.go(this.current - 1);
    } else {
      this.go(0);  // allow the slide to "snap" back if dragging and not infinite
    }
  };

  /**
   * Go to a particular slide. Prime the "to" slide by positioning it, and then calling _slide() if needed
   * @param{int} to  the slide to go to
   * @return {void}
   */
  Carousel.prototype.go = function go (to, animate) {
      if ( animate === void 0 ) { animate = true; }

    var opts = this.options;

    if (this.sliding || !this.active) { return; }

    if (to < 0 || to >= this.numSlides) {                           // position the carousel if infinite and at end of bounds
      var temp = (to < 0) ? this.current + this.numSlides : this.current - this.numSlides;
      this._slide( -(temp * this.width - this.deltaX) );
      this.slideWrap.offsetHeight;                                  // force a repaint to actually position "to" slide. *Important*
    }

    to = this._loop(to);
    this._slide( -(to * this.width), animate );

    if (opts.onSlide && to !== this.current) { opts.onSlide.call(this, to, this.current); }// note: doesn't check if it's a function

    this._removeClass(this.slides[this.current], opts.activeClass);
    this._addClass(this.slides[to], opts.activeClass);
    this.current = to;
  };

  // ----------------------------------- Event Listeners ----------------------------------- //

  /**
   * Create references to all bound Events so that they may be removed upon destroy()
   * @return {void}
   */
  Carousel.prototype._createBindings = function _createBindings () {
      var this$1 = this;

    this._bindings = {
      // handle
      'touchstart': function (e) { this$1._dragStart(e); },
      'touchmove': function (e) { this$1._drag(e); },
      'touchend': function (e) { this$1._dragEnd(e); },
      'touchcancel': function (e) { this$1._dragEnd(e); },
      'mousedown': function (e) { this$1._dragStart(e); },
      'mousemove': function (e) { this$1._drag(e); },
      'mouseup': function (e) { this$1._dragEnd(e); },
      'mouseleave': function (e) { this$1._dragEnd(e); },
      'click': function (e) { this$1._checkDragThreshold(e); },

      // window
      'resize': function (e) { this$1._updateView(e); },
      'orientationchange': function (e) { this$1._updateView(e); }
    };
  };

  // ------------------------------------- Drag Events ------------------------------------- //
    
  Carousel.prototype._checkDragThreshold = function _checkDragThreshold (e) {
    if (this.dragThresholdMet) {
      e.preventDefault();
    }
  };

  /**
   * Start dragging (via touch)
   * @param{event} e Touch event
   * @return {void}
   */
  Carousel.prototype._dragStart = function _dragStart (e) {
    var touches;

    if (this.sliding) {
      return false;
    }

    e = e.originalEvent || e;
    touches = e.touches !== undefined ? e.touches : false;

    this.dragThresholdMet = false;
    this.dragging = true;
    this.startClientX = touches ? touches[0].pageX : e.clientX;
    this.startClientY = touches ? touches[0].pageY : e.clientY;
    this.deltaX = 0;// reset for the case when user does 0,0 touch
    this.deltaY = 0;// reset for the case when user does 0,0 touch

    if (e.target.tagName === 'IMG' || e.target.tagName === 'A') { e.target.draggable = false; }
  };

  /**
   * Update slides positions according to user's touch
   * @param{event} e Touch event
   * @return {void}
   */
  Carousel.prototype._drag = function _drag (e) {
    var touches;

    if (!this.dragging) {
      return;
    }

    e = e.originalEvent || e;
    touches = e.touches !== undefined ? e.touches : false;
    this.deltaX = (touches ? touches[0].pageX : e.clientX) - this.startClientX;
    this.deltaY = (touches ? touches[0].pageY : e.clientY) - this.startClientY;

    // drag slide along with cursor
    this._slide( -(this.current * this.width - this.deltaX ) );

    // determine if we should do slide, or cancel and let the event pass through to the page
    this.dragThresholdMet = Math.abs(this.deltaX) > this.dragThreshold;
  };

  /**
   * Drag end, calculate slides' new positions
   * @param{event} e Touch event
   * @return {void}
   */
  Carousel.prototype._dragEnd = function _dragEnd (e) {
    if (!this.dragging) {
      return;
    }

    if (this.dragThresholdMet) {
      e.preventDefault();
      e.stopPropagation();
      e.stopImmediatePropagation();
    }

    this.dragging = false;

    if ( this.deltaX !== 0 && Math.abs(this.deltaX) < this.dragThreshold ) {
      this.go(this.current);
    }
    else if ( this.deltaX > 0 ) {
      // var jump = Math.round(this.deltaX / this.width);// distance-based check to swipe multiple slides
      // this.go(this.current - jump);
      this.prev();
    }
    else if ( this.deltaX < 0 ) {
      this.next();
    }

    this.deltaX = 0;
  };


  // ------------------------------------- carousel engine ------------------------------------- //


  /**
   * Applies the slide translation in browser
   * @param{number} offset Where to translate the slide to. 
   * @param{boolean} animate Whether to animation the transition or not.
   * @return {void}
   */
  Carousel.prototype._slide = function _slide (offset, animate) {
      var this$1 = this;

    var delay = 400;

    offset -= this.offset;

    if (animate) {
      this.sliding = true;
      this._addClass(this.slideWrap, this.options.animateClass);

      setTimeout(function () {
        this$1.sliding = false;
        this$1.active && this$1._removeClass(this$1.slideWrap, this$1.options.animateClass);
      }, delay);
    }

    if (this.transform) {
      this.slideWrap.style[this.transform] = 'translate3d(' + offset + 'px, 0, 0)';
    }
    else {
      this.slideWrap.style.left = offset+'px';
    }
  };


  // ------------------------------------- "helper" functions ------------------------------------- //


  /**
   * Helper function. Calculate modulo of a slides position
   * @param{int} val Slide's position
   * @return {int} the index modulo the # of slides
   */
  Carousel.prototype._loop = function _loop (val) {
    return (this.numSlides + (val % this.numSlides)) % this.numSlides;
  };

  /**
   * Set the Carousel's width and determine the slide offset.
   * @return {void}
   */
  Carousel.prototype._getDimensions = function _getDimensions () {
    this.width = this.slides[0].getBoundingClientRect().width;
    this.offset = this.cloned * this.width;
  };

  /**
   * Update the slides' position on a resize. This is throttled at 300ms
   * @return {void}
   */
  Carousel.prototype._updateView = function _updateView () {
      var this$1 = this;

    // Check if the resize was horizontal. On touch devices, changing scroll
    // direction will cause the browser tab bar to appear, which triggers a resize
    if (window.innerWidth !== this._viewport) {
      this._viewport = window.innerWidth;
      clearTimeout(this.timer);
      this.timer = setTimeout(function () {
        this$1._getDimensions();
        this$1.go(this$1.current);
      }, 300);
    }
  };

  /**
   * Duplicate the first and last N slides so that infinite scrolling can work.
   * Depends on how many slides are visible at a time, and any outlying slides as well
   * @return {void}
   */
  Carousel.prototype._cloneSlides = function _cloneSlides () {
      var this$1 = this;

    var duplicate;
    var display = this.options.display;
    var fromEnd = Math.max(this.numSlides - display, 0);
    var fromBeg = Math.min(display, this.numSlides);

    // take "display" slides from the end and add to the beginning
    for (var i = this.numSlides; i > fromEnd; i--) {
      duplicate = this$1.slides[i-1].cloneNode(true);                     // cloneNode --> true is deep cloning
      duplicate.removeAttribute('id');
      duplicate.setAttribute('aria-hidden', 'true');
      this$1._addClass(duplicate, 'clone');
      this$1.slideWrap.insertBefore(duplicate, this$1.slideWrap.firstChild);// "prependChild"
      this$1.cloned++;
    }

    // take "display" slides from the beginning and add to the end
    for (var i$1 = 0; i$1 < fromBeg; i$1++) {
      duplicate = this$1.slides[i$1].cloneNode(true);
      duplicate.removeAttribute('id');
      duplicate.setAttribute('aria-hidden', 'true');
      this$1._addClass(duplicate, 'clone');
      this$1.slideWrap.appendChild(duplicate);
    }
  };

  /**
   * Helper function to add a class to an element
   * @param{int} i     Index of the slide to add a class to
   * @param{string} name Class name
   * @return {void}
   */
  Carousel.prototype._addClass = function _addClass (el, name) {
    if (el.classList) { el.classList.add(name); }
    else {el.className += ' ' + name; }
  };

  /**
   * Helper function to remove a class from an element
   * @param{int} i     Index of the slide to remove class from
   * @param{string} name Class name
   * @return {void}
   */
  Carousel.prototype._removeClass = function _removeClass (el, name) {
    if (el.classList) { el.classList.remove(name); }
    else { el.className = el.className.replace(new RegExp('(^|\\b)' + name.split(' ').join('|') + '(\\b|$)', 'gi'), ' '); }
  };

  /**
   * Shallow Object.assign polyfill
   * @param {object} dest The object to copy into
   * @param {object} srcThe object to copy from
   */
  Carousel.prototype._assign = function _assign (dest, src) {
    Object.keys(src).forEach(function (key) {
      dest[key] = src[key];
    });

    return dest;
  };

  // ---- carousel ---- //
  var featured = document.querySelector('#featured');
  var sections = document.querySelectorAll('main .tile');
  var tabs = document.querySelectorAll('.filters li');
  var bullets = featured.querySelectorAll('nav li');
  var carousel = new Carousel(featured, {
    slides: '.carousel__slide',
    onSlide: function (current) {
      for (var i = bullets.length; i--;) {
        bullets[i].classList.remove('active');
      }
      bullets[current].classList.add('active');
    },
  });


  featured.querySelector('.prev').addEventListener('click', function () {
    carousel.prev();
  });
  featured.querySelector('.next').addEventListener('click', function () {
    carousel.next();
  });

  // Array.from(bullets, (bullet, to) => {
  Array.prototype.forEach.call(bullets, function (bullet, to) {
    bullet.addEventListener('click', function () {
      carousel.go(to);
    });
  });


  // ---- filters ---- //
  // Array.from(tabs, (tab) => {
  Array.prototype.forEach.call(tabs, function (tab) {
    var filter = tab.getAttribute('data-filter');

    tab.addEventListener('click', function(e) {
      e.preventDefault();

      for (var i = tabs.length; i--;) {
        tabs[i].classList.remove('active');
      }

      tab.classList.add('active');

      for (var i$1 = sections.length; i$1--;) {
        var regex = new RegExp(filter, 'i');
        var tags = (void 0);

        tags = sections[i$1].getAttribute('data-tags') || '';
        tags = tags.toLowerCase();

        if (!tags.match(regex)) {
          sections[i$1].classList.add('collapsed');
        } else {
          sections[i$1].classList.remove('collapsed');
        }
      }
    });
  });
  /* */

}());
