window.onload = () => {

  // Header
  // TASK 1. Header Tabs
  addNavigationClickHandler();

  // Slider
  // TASK 2. Carousel functionality
  // TASK 3. Turn Off Phone Displays of First Slide
  addCarouselClickHandler();

  // Portfolio
  // TASK 4. TAGS switching & shuffle items
  addTagsClickHandler();
  // TASK 5. Selecting Images
  addImagesClickHandler();

  // Form
  // TASK 6. Submitting Form
  addSubmitButtonClickHandler();
  addCloseButtonClickHandler();
}

// Header
// TASK 1. Header Tabs
const addNavigationClickHandler = () => {
  let nav = document.querySelector('.navigation');

  nav.addEventListener('click', (event) => {
    if (event.target.tagName === 'A') {
      let selectedLink = event.target;
      selectClickedLink(selectedLink);
    }
  });
}

const selectClickedLink = (selectedLink) => {
  let navigationLinks = document.querySelectorAll('.navigation .navigation__link');

  navigationLinks.forEach(elem => {
    elem.classList.remove('navigation__link_active');
  });

  selectedLink.classList.add('navigation__link_active');
}

// Slider
// TASK 2. Carousel functionality
// TASK 3. Turn Off Phone Displays of First Slide
const CAROUSEL = document.querySelector('.carousel');
const V_PHONE_DISPLAY = CAROUSEL.querySelector('.vertical-phone__display');
const H_PHONE_DISPLAY = CAROUSEL.querySelector('.horizontal-phone__display');

const SLIDES_LIST = CAROUSEL.querySelector('.carousel__slides');

const addCarouselClickHandler = () => {
  let direction;

  CAROUSEL.addEventListener('click', (event) => {
    let clickedElement = event.target;
    if (clickedElement.classList.contains('horizontal-phone__button')) {
      turnOffDisplay(H_PHONE_DISPLAY);
    } else if (clickedElement.classList.contains('vertical-phone__button')) {
      turnOffDisplay(V_PHONE_DISPLAY);
    } else if (clickedElement.classList.contains('button-prev')) {
      previousSlide(direction);
    } else if (clickedElement.classList.contains('button-next')) {
      nextSlide(direction);
    }
  })

  SLIDES_LIST.addEventListener('transitionend', function() {
    slideSwap(direction);
    setTimeout(() => {
      SLIDES_LIST.style.transition = 'all 0.5s';
    })
  }, false);
}

const turnOffDisplay = (phoneDisplay) => {
  if (phoneDisplay.classList.contains('display-off')) {
    phoneDisplay.classList.remove('display-off');
  } else {
    phoneDisplay.classList.add('display-off');
  }
}

const previousSlide = (direction) => {
  if (direction === -1) {
    direction = 1;
    SLIDES_LIST.appendChild(SLIDES_LIST.firstElementChild);
  }
  CAROUSEL.style.justifyContent = 'flex-end';
  SLIDES_LIST.style.transform = 'translate(50%)';
}

const nextSlide = (direction) => {
  direction = -1;
  CAROUSEL.style.justifyContent = 'flex-start';
  SLIDES_LIST.style.transform = 'translate(-50%)';
}

const slideSwap = (direction) => {
  if (direction === 1) {
    SLIDES_LIST.prepend(SLIDES_LIST.lastElementChild);
  } else {
    SLIDES_LIST.appendChild(SLIDES_LIST.firstElementChild);
  }
  SLIDES_LIST.style.transition = 'none';
  SLIDES_LIST.style.transform = 'translate(0)';
}

// Portfolio
// TASK 4. TAGS switching & shuffle items
const addTagsClickHandler = () => {
  document.querySelector('.portfolio-controls').addEventListener('click', (event) => {
    if (event.target.tagName === 'BUTTON') {
      let selectedTag = event.target;
      switchingTags(selectedTag);
      shuffleImages();
    }
  });
}

const switchingTags = (selectedTag) => {
  document.querySelectorAll('.portfolio-controls button').forEach(button => {
    button.classList.remove('portfolio-controls__button_active');
    button.disabled = false;
  });
  selectedTag.classList.add('portfolio-controls__button_active');
  selectedTag.disabled = true;
}

const shuffleImages = () => {
  document.querySelectorAll('.portfolio__preview').forEach(li => {
    li.style.order = '';
    li.style.order = `${Math.floor(Math.random()*100)}`;
  });
}

// TASK 5. Selecting Images

const addImagesClickHandler = () => {
  document.querySelector('.portfolio__list').addEventListener('click', (event) => {
    let selectedImage = event.target;
    if (selectedImage.classList.contains('preview')) {
      borderedSelectingImage(selectedImage);
    } else {
      removeBorder();
    }
  });
}

const borderedSelectingImage = (selectedImage) => {
  document.querySelectorAll('.portfolio__list .preview').forEach(div => {
    div.parentNode.classList.remove('portfolio__preview_bordered');
  });
  selectedImage.parentNode.classList.add('portfolio__preview_bordered');
}

const removeBorder = () => {
  document.querySelectorAll('.portfolio__list .preview').forEach(div => {
    div.parentNode.classList.remove('portfolio__preview_bordered');
  });
}

// Form
// TASK 6. Submitting Form

const addSubmitButtonClickHandler = () => {
  document.querySelector('.submit-btn').addEventListener('click', (event) => {
    if (document.querySelector('.feedback-form').checkValidity()) {
      event.preventDefault();
      createModalMessage();
      showModalWithResult(MODAL_MESSAGE);
    }
  });
};

const createModalMessage = () => {
  const regExp = /<.*?>/g;

  const SUBJECT_VALUE = document.getElementById('subject').value 
    ? `Тема: ${document.getElementById('subject').value.replace(regExp)}` 
    : `Без темы`;

  const MESSAGE_VALUE = document.getElementById('message').value 
    ? `Описание: ${document.getElementById('message').value.replace(regExp)}` 
    : `Без описания`;

  MODAL_MESSAGE = `<h4>Письмо отправлено</h4><p>${SUBJECT_VALUE}</p><p>${MESSAGE_VALUE}</p>`;
  return MODAL_MESSAGE;
}

const showModalWithResult = (MODAL_MESSAGE) => {
  document.querySelector('.modal').classList.remove('hidden');
  document.querySelector('.modal__message').insertAdjacentHTML('afterbegin', MODAL_MESSAGE);
  document.body.style.overflow = 'hidden';
}

const addCloseButtonClickHandler = () => {
  document.querySelector('.close-btn').addEventListener('click', () => {
    closeModalWindow();
    clearModalWindow();
    document.querySelector('.feedback-form').reset();
  });
}

const closeModalWindow = () => {
  document.querySelector('.modal').classList.add('hidden');
  document.body.style.overflow = '';
}

const clearModalWindow = () => {
  document.querySelector('.modal__message h4').remove();
  document.querySelectorAll('.modal__message p').forEach(p => {
    p.remove();
  });
}