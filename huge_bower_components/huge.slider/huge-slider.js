'use strict';

// var IS_FF = (/Firefox/i.test(navigator.userAgent));

var Slider = function() {

    var lastY;
    var self = this;
    var currSlide = 0;

    var slideTransActive = false;
    var $window = $(window);

    // TODAYS FUN LESSON: FF CANNOT SUPPORT SIMULTANEOUS TRANSISTIONS. 
    // I WANT 2 HOURS OF MY LIFE BACK

    if ( !$.support.transition) {
        // console.log('jq animate');

        $.fn.transition = $.fn.animate;

        // Set easing function for $.animate if we're falling back to that
        $.easing.bounce = function(x, t, b, c, d) {
            return c * ((t = t / d - 1) * t * t + 1) + b;
        };
    }

    // Alias css3 easing function to match jquery.animate easing function
    $.cssEase.bounce = 'cubic-bezier(0, 0, 0.25, 1)';

    var getCurrSlidePosition = function() {
        return Math.round(0 - $('article').offset().top / $window.innerHeight());
    };

    // up/down arrow slide transition
    $('html').on('keydown', function(e) {
        if (e.which === 38 || e.which === 40) {
            if (e.which === 40) {
                self.scrollSlideDown();
            } else if (e.which === 38) {
                self.scrollSlideUp();
            }
        }
    });

    // mousewheel slide transition
    $('article').on('mousewheel', function(e) {
        var delta = e.deltaY;

        if (delta < 0) {
            self.scrollSlideDown(300);
        } else if (delta > 0) {
            self.scrollSlideUp(300);
        }
    });

    // Mobile touch up / down listeners
    $(document).bind('touchmove', function(e) {
        e.preventDefault();

        if (slideTransActive) {
            return;
        }

        var currentY = e.originalEvent.touches ? e.originalEvent.touches[0].pageY : e.pageY;

        if (!lastY) {
            lastY = currentY;
            return;
        }

        if (Math.abs(currentY - lastY) < 5) {
            lastY = currentY;
            return;
        }

        var cb = function() {
            lastY = currentY + $window.height();
        };

        if (currentY > lastY) {
            self.scrollSlideUp(cb);
        } else {
            self.scrollSlideDown(cb);
        }
    });

    self.scrollSlideDown = function(delay, cb) {
        if (slideTransActive) {
            return;
        }

        var maxSlides = $('section:visible').length - 1;
        if (currSlide < maxSlides) {
            self.scrollToSlide(++currSlide, delay, cb);
        }
    };

    self.scrollSlideUp = function(delay, cb) {
        if (slideTransActive) {
            return;
        }

        if (currSlide > 0) {
            self.scrollToSlide(--currSlide, delay, cb);
        }
    };

    self.scrollToSlide = function(i, delay, cb) {
        if (!slideTransActive) {

            if (!delay) {
                delay = 0;
            }

            slideTransActive = true;

            currSlide = i;

            $(document).trigger('slideChange', [getCurrSlidePosition(), i]);

            var topPerc = '-' + (i * 100) + '%';

            $('article').transition({
                    y: topPerc
                },
                750, 'bounce', function() {
                    setTimeout(function() {
                        slideTransActive = false;
                        lastY = null;
                    }, delay);

                    if (cb) {
                        cb();
                    }
                    $(document).trigger('slideChange:done', [getCurrSlidePosition(), i]);

                }
            );
        }
    };
};
