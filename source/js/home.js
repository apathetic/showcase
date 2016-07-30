// import Scrollify from '@apatheticwes/scrollify';
import Carousel from  '@apatheticwes/flexicarousel';

// var Scrollify = require('@apatheticwes/scrollify');
// var Carousel = require('@apatheticwes/flexicarousel');

// ---- carousel ---- //
const featured = document.querySelector('#featured');
const bullets = featured.querySelectorAll('nav li');
const sections = document.querySelectorAll('main section');
const tabs = document.querySelectorAll('#tabs li');
let tags;

const carousel = new Carousel(featured, {
  slides: '.slide',
  offscreen: 1,
  onSlide: updateNav
});


featured.querySelector('.prev').addEventListener('click', carousel.prev);
featured.querySelector('.next').addEventListener('click', carousel.next);
Array.from(bullets, (bullet, to) => {
  bullet.addEventListener('click', (e) => { carousel.go(to); });
});

function updateNav(current) {
  for (let i = bullets.length; i--;) {
    bullets[i].classList.remove('active');
  }
  bullets[current].classList.add('active');
}

/* */

// ---- filters ---- //

Array.from(tabs, (tab) => {
  const filter = tab.getAttribute('data-filter');

  tab.addEventListener('click', function(e) {
    let regex;

    e.preventDefault();

    for (let i = tabs.length; i--;) {
      tabs[i].classList.remove('active');
    }

    tab.classList.add('active');

    for (let i = sections.length; i--;) {
      tags = sections[i].getAttribute('data-tags') || '';
      tags = tags.toLowerCase();
      regex = new RegExp(filter, 'i');    // ghetto, doesn't care about surrounding whitespace

      if (!tags.match(regex)) {
        sections[i].classList.add('collapsed');
      } else {
        sections[i].classList.remove('collapsed');
      }
    }

  });
});
/* */
