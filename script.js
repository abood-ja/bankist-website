'use strict';
const header = document.querySelector('.header');
const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const btnScroll = document.querySelector('.btn--scroll-to');
const section1 = document.getElementById('section--1');
const tabs = document.querySelectorAll('.operations__tab');
const tabsContainer = document.querySelector('.operations__tab-container');
const tabsContent = document.querySelectorAll('.operations__content');
const ul = document.querySelector('.nav__links');
const nav = document.querySelector('.nav');
const allSections = document.querySelectorAll('.section');
///////////////////////////////////////
// Modal window

const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnsOpenModal.forEach((btn, i) => {
  btn.addEventListener('click', openModal);
});

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});
///////// handling the learn more button
btnScroll.addEventListener('click', function (e) {
  const s1coor = section1.getBoundingClientRect();
  console.log(s1coor);

  // window.scrollTo(s1coor.left, s1coor.top + window.scrollY);
  // window.scrollTo({
  //   left: s1coor.left + window.scrollX,
  //   top: s1coor.top + window.scrollY,
  //   behavior: 'smooth',
  // });
  section1.scrollIntoView({ behavior: 'smooth' });
});
////Page navigation
// document.querySelectorAll('.nav__link').forEach(function (ele) {
//   ele.addEventListener('click', function (e) {
//     e.preventDefault();

//     const id = this.getAttribute('href');
//     console.log(id);
//     document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
//   });
// });
document.querySelector('.nav__links').addEventListener('click', function (e) {
  e.preventDefault();
  if (e.target.classList.contains('nav__link')) {
    const id = e.target.getAttribute('href');
    document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
  }
});
/////////////////////// implementing the tabbed component
tabsContainer.addEventListener('click', function (e) {
  const clicked = e.target.closest('.operations__tab');
  //guard clause
  if (!clicked) return;

  /// removing the active class from the uncliked elements
  tabs.forEach(ele => ele.classList.remove('operations__tab--active'));

  // removing the active class from the content of the unclicked elements
  tabsContent.forEach(ele =>
    ele.classList.remove('operations__content--active')
  );

  // adding active class to the clicked element
  clicked.classList.add('operations__tab--active');

  // adding active class to the content of the clicked element
  document
    .querySelector(`.operations__content--${clicked.dataset.tab}`)
    .classList.add('operations__content--active');
});

///////////////// menu fade animation
const handleHover = function (e, opacity) {
  if (e.target.classList.contains('nav__link')) {
    const hovered = e.target;
    const siblings = e.target
      .closest('.nav__links')
      .querySelectorAll('.nav__link');
    siblings.forEach(ele => {
      if (ele != hovered) ele.style.opacity = this;
    });
  }
};
ul.addEventListener('mouseover', handleHover.bind(0.5));
ul.addEventListener('mouseout', handleHover.bind(1));
/// implementing sticky nav bar
const stickyNav = function (entries, observer) {
  const entry = entries[0];
  if (!entry.isIntersecting) nav.classList.add('sticky');
  else nav.classList.remove('sticky');
  // entries.forEach(entry => {
  //   if (!entry.isIntersecting) nav.classList.add('sticky');
  //   else nav.classList.remove('sticky');
  // });
};
const headerObserver = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0,
  rootMargin: `-${nav.getBoundingClientRect().height}px`,
});
headerObserver.observe(header);

//// reveal sections
const reveal = function (entries, observer) {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    entry.target.classList.remove('section--hidden');
    observer.unobserve(entry.target);
  });
};
const secObserver = new IntersectionObserver(reveal, {
  root: null,
  threshold: 0.15,
});
allSections.forEach(sec => {
  sec.classList.add('section--hidden');
  secObserver.observe(sec);
});
