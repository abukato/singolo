const NAV = document.querySelector('.navigation');

const V_PHONE = document.querySelector('.vertical-phone');
const H_PHONE = document.querySelector('.horizontal-phone');

const CAROUSEL = document.querySelector('.carousel');
const SLIDES = document.querySelector('.carousel__slides');
const PREV_BTN = document.querySelector('.button-prev');
const NEXT_BTN = document.querySelector('.button-next');

const TABS = document.querySelector('.portfolio-controls');
const PORTFOLIO_LIST = document.querySelector('.portfolio__list');

const FORM = document.getElementById('feedback-form');
const SUBMIT_BTN = document.getElementById('submit-btn');
const CLOSE_BTN = document.getElementById('close-btn');


// Header tabs

NAV.addEventListener('click', (event) => {
  if (event.target.tagName === 'A') {
    NAV.querySelectorAll('li a').forEach(elem => {
      elem.classList.remove('navigation__link_active');
      event.target.classList.add('navigation__link_active');
    });
  }
});


// Slider
// Display OFF

const phoneDisplayOff = (phone) => {
  if (phone.querySelector('div').classList.contains('display-off')) {
    phone.querySelector('div').classList.remove('display-off');
  } else {
    phone.querySelector('div').classList.add('display-off');
  }
}

V_PHONE.addEventListener('click', () => {
  phoneDisplayOff(V_PHONE);
})

H_PHONE.addEventListener('click', () => {
  phoneDisplayOff(H_PHONE);
})

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
    SLIDES.style.transition = 'all 0.7s';
  })
}, false);


// Portfolio TABS && shuffle preview image && BORDERED image

TABS.addEventListener('click', (event) => {
  if (event.target.tagName === 'BUTTON') {
    TABS.querySelectorAll('button').forEach(button => {
      button.classList.remove('portfolio-controls__button_active');
      button.disabled = false;
      event.target.classList.add('portfolio-controls__button_active');
      event.target.disabled = true;
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
      div.parentNode.classList.remove('portfolio__preview_bordered');
    });
    event.target.parentNode.classList.add('portfolio__preview_bordered');
  } else {
    PORTFOLIO_LIST.querySelectorAll('div').forEach(div => {
      div.parentNode.classList.remove('portfolio__preview_bordered');
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