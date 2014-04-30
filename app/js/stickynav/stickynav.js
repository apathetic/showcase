/*
 * sticky nav
 * https://github.com/apathetic/stickynav
 *
 * Copyright (c) 2013 Wes Hatch
 * Licensed under the MIT license.
 *
 */


var stickyNav = (function($, window, undefined ) {

	'use strict';

	var sticky,	// = $(sticky)[0];
		sections,
		currentSection,
		scrollPosition = window.pageYOffset,
		timer,
		bullets = $();


	/**
	 * Sets up a sticky bar which attaches / detaches to top of viewport
	 * @return {void}
	 */
	function setupSticky() {

		// var body = document.body,		// $('body')[0],	// local reference
		var offset,
			position,
			_currentState = '',
			_stateSwitcher,
			determine = {
				normal:function(){
					position = sticky.getBoundingClientRect();
					if (position.top < 1 ) { return setState('sticky'); }
				},
				sticky:function(){
					position = document.body.getBoundingClientRect();
					if( position.top > offset ) { return setState('normal'); }
				}
			};

		function setState (state){
			if(_currentState == state) { return; }
			$(sticky).removeClass(_currentState).addClass(state);
			_currentState = state;
			_stateSwitcher = determine[state];
		}

		position = sticky.getBoundingClientRect();
		offset = -(position.top + window.scrollY);	// store original offset

		//sticky initial position
		if (window.pageYOffset > position.top) {
			setState('sticky');
		} else {
			setState('normal');
		}

		//$(window).on({ 'scroll': function(){ _stateSwitcher() } });
		window.addEventListener('scroll', function(){ _stateSwitcher(); });
	}

	/**
	 * Generate the nav <li>'s and setup the Event Listeners
	 * @return {void}
	 */
	function setupPageNav() {

		var nav = $(sticky).find('ul');
			// offsets = [],

		sections.each(function(i, section) {
			var title = $(this).data('nav'),
				id = $(this).attr('id') || '',
				bullet = $('<li><a href="#'+id+'">'+ title + '</a></li>');	// [TODO]: option to use other elements ie. <td>

			bullet.click(function(e) {
				e.preventDefault();
				bullets.removeClass();
				$(this).addClass('active');
				scrollPage(section);
			});

			bullets = bullets.add(bullet);
			// offsets.push( $(section).offset().top );
			nav.append(bullet);

		});

		window.addEventListener('scroll', updateSelected);
	}

	/**
	 * Update the active nav item on window.scroll
	 * @return {void}
	 */
	function updateSelected() {
		clearTimeout(timer);
		scrollPosition = window.pageYOffset;
		timer = window.setTimeout(checkSectionPosition, 100);
	}

	/**
	 * check each sections' getBoundingClientRect
	 * to identify current viewing section
	 * @return {void}
	 */
	function checkSectionPosition() {

		currentSection = 0;
		for (var i = sections.length; i--;) {			// start at end at work back
			// if (sections.get(i).getBoundingClientRect().top <= 1) {
			if ( ~~sections.get(i).getBoundingClientRect().top <= 0 ) {		// note: ~~ is Math.floor
				currentSection = i;
				break;
			}
		}

		// console.log('active', currentSection);

		bullets.removeClass('active');
		bullets.eq(currentSection).addClass('active');
	}

	/**
	 * Scroll the page to a particular page anchor
	 * @param  {string} to	id of the element to scroll to
	 * @return {void}
	 */
	function scrollPage(to) {
		if ($(to).length) {
			$('html, body').animate({
				scrollTop: $(to).offset().top
			}, 500);
		}
	}



	return {
		init: function(opts) {
			// if(!core.Utils.isTouchDevice && sections.length > 0) {
				sections = $('[data-nav]');
				sticky = $(opts.nav)[0];	// [TODO] add some checks or sumthing
				if ( !sticky || !sticky.getBoundingClientRect) { return false; } // progressive enhancement for newer browers only.

				setupSticky();
				setupPageNav();
				checkSectionPosition();
			// }
		}
	};


}( jQuery, window ));
