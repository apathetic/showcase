import Scrollify from '@apatheticwes/scrollify';
import Carousel from '@apatheticwes/flexicarousel';


// ---- carousel ---- //
let featured = document.querySelector('#featured');
let bullets = featured.querySelectorAll('nav li');
let carousel = new Carousel(featured, {
  slides: '.slide',
  offscreen: 1
  // onSlide: updateNav
});

/* * /

featured.querySelector('.prev').addEventListener('click', carousel.prev);
featured.querySelector('.next').addEventListener('click', carousel.next);

Array.prototype.forEach.call(bullets, (bullet, to) => {
  bullet.addEventListener('click', (e) => { carousel.go(to); });
});

function updateNav(current) {
  for (i = bullets.length; i--;) {
    bullets[i].classList.remove('active');
    bullets[current].classList.add('active');
  }
}


// ---- filters ---- //
let sections = document.querySelectorAll('main section');
let tabs = document.querySelectorAll('#tabs li');
let tags;
let i, j;

Array.prototype.forEach.call(tabs, (tab) => {
  tab.addEventListener('click', function(e) {
    let filter = tab.getAttribute('data-filter');
    let regex;

    e.preventDefault();

    for (j = tabs.length; j--;) {
      tabs[j].classList.remove('active');
    }

    tab.classList.add('active');

    for (j = sections.length; j--;) {
      tags = sections[j].getAttribute('data-tags') || '';
      tags = tags.toLowerCase();
      regex = new RegExp(filter, 'i');    // ghetto, doesn't care about surrounding whitespace

      if (!tags.match(regex)) {
        sections[j].classList.add('collapsed');
      } else {
        sections[j].classList.remove('collapsed');
      }
    }

  });
});
/* */