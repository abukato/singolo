const NAV = document.querySelector('.navigation');

const V_PHONE = document.getElementById('vertical-phone');
const H_PHONE = document.getElementById('horizontal-phone');

const CAROUSEL = document.querySelector('.carousel');
const SLIDES = document.querySelector('.carousel__slides');
const PREV_BTN = document.querySelector('.button-prev');
const NEXT_BTN = document.querySelector('.button-next');

const TABS = document.querySelector('.portfolio__list--control');
const PORTFOLIO_LIST = document.getElementById('portfolio__list');

const FORM = document.getElementById('feedback-form');
const SUBMIT_BTN = document.getElementById('submit-btn');
const CLOSE_BTN = document.getElementById('close-btn');


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


// Portfolio TABS && shuffle preview image && BORDERED image


TABS.addEventListener('click', (event) => {
  if (event.target.tagName === 'BUTTON') {
    TABS.querySelectorAll('button').forEach(elem => {
      elem.classList.remove('portfolio__list--button-active');
      event.target.classList.add('portfolio__list--button-active');
    });
    PORTFOLIO_LIST.querySelectorAll('li').forEach(li => {
      li.style.order = '';
      li.style.order = `${Math.floor(Math.random()*100)}`;
    });
  }
});

PORTFOLIO_LIST.addEventListener('click', (event) => {
  if (event.target.tagName === 'DIV') {
    PORTFOLIO_LIST.querySelectorAll('div').forEach(div => {
      div.parentNode.classList.remove('portfolio__preview-bordered');
    });
    event.target.parentNode.classList.add('portfolio__preview-bordered');
  } else {
    PORTFOLIO_LIST.querySelectorAll('div').forEach(div => {
      div.parentNode.classList.remove('portfolio__preview-bordered');
    });
  }
});


// FORM SUBMIT


SUBMIT_BTN.addEventListener('click', (event) => {
  const POPUP_MESSAGE = document.getElementById('popup__message');

  const SUBJECT_VALUE = document.getElementById('subject').value 
    ? `Тема: ${document.getElementById('subject').value}` 
    : `Без темы`;
  const MESSAGE_VALUE = document.getElementById('message').value 
    ? `Описание: ${document.getElementById('message').value}` 
    : `Без описания`;

  if (FORM.checkValidity()) {
    document.querySelector('.popup').classList.remove('hidden');

    POPUP_MESSAGE.insertAdjacentHTML('afterbegin', 
      `<h4>Письмо отправлено</h4>
      <p>${SUBJECT_VALUE}</p>
      <p>${MESSAGE_VALUE}</p>`
    );
    event.preventDefault();
  }
});

CLOSE_BTN.addEventListener('click', (event) => {
  document.querySelector('.popup').classList.add('hidden');
  document.querySelector('.popup__message h4').remove();
  document.querySelectorAll('.popup__message p').forEach(p => {
    p.remove();
  });
  FORM.reset();
});