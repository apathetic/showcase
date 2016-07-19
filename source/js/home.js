
import Carousel from 'flexicarousel';



// ---- carousel ---- //
var featured = document.querySelector('#featured'),
	bullets = featured.querySelectorAll('nav li'),
	carousel = new Carousel(featured, {
		slides: '.slide',
		offscreen: 1,
		onSlide: updateNav
	});

featured.querySelector('.prev').addEventListener('click', function(){ carousel.prev(); });
featured.querySelector('.next').addEventListener('click', function(){ carousel.next(); });

Array.prototype.forEach.call(bullets, function(bullet, to) {
	bullet.addEventListener('click', function(e) { carousel.go(to); });
});

function updateNav(current) {
	for (i = bullets.length; i--;) {
		bullets[i].classList.remove('active');
		bullets[current].classList.add('active');
	}
}


// ---- filters ---- //
var sections = document.querySelectorAll('main section'),
	tabs = document.querySelectorAll('#tabs li'),
	tab,
	tags,
	i, j;

for (i = tabs.length; i--;) {
	tab = tabs[i];
	tab.addEventListener('click', function(e){
		var filter,
			regex;

		e.preventDefault();
		for (j = tabs.length; j--;) {
			tabs[j].classList.remove('active');
		}

		this.classList.add('active');
		filter = this.getAttribute('data-filter');

		for (j = sections.length; j--;) {
			tags = sections[j].getAttribute('data-tags') || '';
			tags = tags.toLowerCase();
			regex = new RegExp(filter, "i");		// ghetto, doesn't care about surrounding whitespace

			if (!tags.match(regex)) {
				sections[j].classList.add('collapsed');
			} else {
				sections[j].classList.remove('collapsed');
			}
		}
	});
}
