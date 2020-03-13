const NAV = document.querySelector('.navigation');

const V_PHONE = document.getElementById('vertical-phone');
const H_PHONE = document.getElementById('horizontal-phone');

const CAROUSEL = document.querySelector('.carousel');
const SLIDES = document.querySelector('.carousel__slides');
const PREV_BTN = document.querySelector('.button-prev');
const NEXT_BTN = document.querySelector('.button-next');


// Header tabs


NAV.addEventListener('click', (event) => {
  if (event.target.tagName === 'A') {
    NAV.querySelectorAll('li a').forEach(elem => {
      elem.classList.remove('navigation-link_active');
      event.target.classList.add('navigation-link_active');
    });
  }
});


// Slider 
// Display OFF

V_PHONE.addEventListener('click', (event) => {
  if (V_PHONE.querySelector('div').classList.contains('display-off')) {
    V_PHONE.querySelector('div').classList.remove('display-off');
  } else {
    V_PHONE.querySelector('div').classList.add('display-off');
  }
});

H_PHONE.addEventListener('click', (event) => {
  if (H_PHONE.querySelector('div').classList.contains('display-off')) {
    H_PHONE.querySelector('div').classList.remove('display-off');
  } else {
    H_PHONE.querySelector('div').classList.add('display-off');
  }
});

// CAROUSEL

let direction;

NEXT_BTN.addEventListener('click', function() {
  direction = -1;
  CAROUSEL.style.justifyContent = 'flex-start';
  SLIDES.style.transform = 'translate(-50%)';
});

PREV_BTN.addEventListener('click', function() {
  if (direction === -1) {
    direction = 1;
    SLIDES.appendChild(SLIDES.firstElementChild);
  }
  CAROUSEL.style.justifyContent = 'flex-end';
  SLIDES.style.transform = 'translate(50%)';
});

SLIDES.addEventListener('transitionend', function() {
  if (direction === 1) {
    SLIDES.prepend(SLIDES.lastElementChild);
  } else {
    SLIDES.appendChild(SLIDES.firstElementChild);
  }
  SLIDES.style.transition = 'none';
  SLIDES.style.transform = 'translate(0)';
  setTimeout(() => {
    SLIDES.style.transition = 'all 0.5s';
  })
}, false);