/*
 * parallax
 * https://github.com/....
 *
 * Copyright (c) 2013 Wes Hatch
 * Licensed under the MIT license.
 *
 */


var parallax = (function($, window, undefined ) {

	var parallax,
		ticking = false;
		scroll = 0;
		height = window.innerHeight;
		transform = 'webkitTransform';		// [TODO]

	function onScroll(e) {
		if (!ticking) {
			ticking = true;
			window.requestAnimationFrame(updateParallax);
			scroll = window.scrollY;
		}
	}

	function onResize () {
		scroll = window.scrollY;
		height = window.innerHeight;
		updateParallax();
	}

	function updateParallax() {

		var position;
		parallax.each(function() {
			var range = 500;

			// option 1: works for anything in the initial viewport / window height only
			var position1 = Math.min(1, scroll / window.innerHeight) * range;		// 0 -> range

			// option 2: more computationalish, but will consider element's position on the page
			position2 = pos(0, range, scroll, 170);									// 0 -> range, starting at offset


			// console.log("pos1: %s | pos2: %s", position1, position2);
			var position = position1;



			this.style[transform] = 'translate3d(0, '+ position +'px , 0)';
		});

		ticking = false;
	}




  function pos(base, range, dY, offset) {
    return base + limit(0, 1, (dY - offset)/dY ) * range;
  }

  function limit(min, max, value) {
    return Math.max(min, Math.min(max, value));
  }


/*
	parallax.each(function() {
		this.parallax-speed = $(this).data('parallax-speed');	// store on HTMLElement
	});

 */



	return {
		init: function(opts) {
			parallax = $(opts.el) || $('.parallax');
			// kick off
			window.addEventListener('scroll', onScroll, false);
			window.addEventListener('resize', onResize, false);
		},
		destroy: function() {
			window.removeEventListenter('scroll');
			window.removeEventListenter('resize');
			parallax = null;
		}
	};


}( jQuery, window ));

