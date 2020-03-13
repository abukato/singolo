const NAV = document.querySelector('.navigation');

// Header tabs

NAV.addEventListener('click', (event) => {
  if (event.target.tagName === 'A') {
    NAV.querySelectorAll('li a').forEach(elem => {
      elem.classList.remove('navigation-link_active');
      event.target.classList.add('navigation-link_active');
    });
  }
});