
	function setupMainNav() {
		var nav = $('#huge-nav'),
			toggle = $('#toggle'),
			overlay = $('.overlay'),
			open = false,
			closingtimer,
			items = nav.find('li a');

		items.attr('tabindex', -1);


		// toggle menu open / closed with the burger
		toggle.click(function(e){
			e.preventDefault();
			showMenu(open = !open);					// note: assignment
		});

		// close menu with ESC
		$(document).keyup(function(e) {
			if (e.keyCode === 27) {
				showMenu(open = false);				// note: assignment
			}
		});

		// close menu by clicking anywhere in the background
		overlay.on('click', function() {
			showMenu(open = false);					// note: assignment
		});


		function showMenu(toggle) {

			// disable scrolling when nav is open
			if (toggle) {
				$('body').bind('touchmove', function(e) {
					e.preventDefault();
				});
			} else {
				$('body').unbind('touchmove');

				nav.addClass('closing');

				clearTimeout(closingtimer);
				closingtimer = setTimeout(function() {	// TODO: use transitionEnd ...?
					nav.removeClass('closing');
				}, 450);
			}

			nav.toggleClass('open', toggle);
			items.attr('tabindex', (toggle ? 0 : -1) );

			return false;
		}

	}
