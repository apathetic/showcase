import Carousel from '@apatheticwes/flexicarousel';

// ---- carousel ---- //
const featured = document.querySelector('#featured');
const sections = document.querySelectorAll('main .tile');
const tabs = document.querySelectorAll('.filters li');
const bullets = featured.querySelectorAll('nav li');
const carousel = new Carousel(featured, {
  slides: '.carousel__slide',
  onSlide: (current) => {
    for (let i = bullets.length; i--;) {
      bullets[i].classList.remove('active');
    }
    bullets[current].classList.add('active');
  },
});


featured.querySelector('.prev').addEventListener('click', () => {
  carousel.prev();
});
featured.querySelector('.next').addEventListener('click', () => {
  carousel.next();
});

// Array.from(bullets, (bullet, to) => {
Array.prototype.forEach.call(bullets, (bullet, to) => {
  bullet.addEventListener('click', () => {
    carousel.go(to);
  });
});


// ---- filters ---- //
// Array.from(tabs, (tab) => {
Array.prototype.forEach.call(tabs, (tab) => {
  const filter = tab.getAttribute('data-filter');

  tab.addEventListener('click', function(e) {
    e.preventDefault();

    for (let i = tabs.length; i--;) {
      tabs[i].classList.remove('active');
    }

    tab.classList.add('active');

    for (let i = sections.length; i--;) {
      const regex = new RegExp(filter, 'i');
      let tags;

      tags = sections[i].getAttribute('data-tags') || '';
      tags = tags.toLowerCase();

      if (!tags.match(regex)) {
        sections[i].classList.add('collapsed');
      } else {
        sections[i].classList.remove('collapsed');
      }
    }
  });
});
/* */
