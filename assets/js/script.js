"use strict";

/**
 * PRELOAD
 *
 * loading will be end after document is loaded
 */

const preloader = document.querySelector("[data-preloader]");

window.addEventListener("load", () => {
  preloader.classList.add("loaded"); // it will hide the preloader
  document.body.classList.add("loaded"); // it will show the scroll bar
});

/**
 * add Event listener on multiple elements
 */

const addEventOnElements = function (elements, eventType, callback) {
  // let len = elements.length;
  for (let i = 0; i < elements.length; i++) {
    elements[i].addEventListener(eventType, callback);
  }
};

/**
 * NAVBAR
 */
const navbar = document.querySelector("[data-navbar]");
const navTogglers = document.querySelectorAll("[data-nav-toggler]");
const overlay = document.querySelector("[data-overlay]");

const toggleNavbar = function () {
  navbar.classList.toggle("active");
  navTogglers.classList.toggle("active");
  document.body.classList.toggle("nav-active");
};

addEventOnElements(navTogglers, "click", toggleNavbar);

/**
 * HEADER & BACK TOP BTN
 */
const header = document.querySelector("[data-header]");
const backTopBtn = document.querySelector("[data-back-top-btn]");

let lastScrollPos = 0;

const hideHeader = function () {
  const isScrollBottom = lastScrollPos < window.scrollY;
  if (isScrollBottom) {
    header.classList.add("hide");
  } else {
    header.classList.remove("hide");
  }

  lastScrollPos = window.scrollY;
};

window.addEventListener("scroll", function () {
  if (window.scrollY >= 50) {
    // 50px
    header.classList.add("active");
    backTopBtn.classList.add("active");
    hideHeader();
  } else {
    header.classList.remove("active");
    backTopBtn.classList.remove("active");
  }
});

// const closeBtn = document.querySelector(".close-btn");
// // const navbar = document.querySelector(".navbar");
// const navOpenBtn = document.querySelector(".nav-open-btn");

// closeBtn.addEventListener('click', ()=> {
//     navbar.classList.remove('active');
// });
// navOpenBtn.addEventListener("click", () => {
//   navbar.classList.add("active");
// });

/**
 * HERO SLIDER
 */

const heroSlider = document.querySelector("[data-hero-slider]");
const heroSliderItems = document.querySelectorAll("[data-hero-slider-item]");
const heroSliderPrevBtn = document.querySelector("[data-prev-btn]");
const heroSliderNextBtn = document.querySelector("[data-next-btn]");

let currentSlidePos = 0;
let lastActiveSlideItem = heroSliderItems[0];

const updateSliderPos = function () {
  lastActiveSlideItem.classList.remove("active");
  heroSliderItems[currentSlidePos].classList.add("active");
  lastActiveSlideItem = heroSliderItems[currentSlidePos];
};

const slideNext = function () {
  if (currentSlidePos >= heroSliderItems.length - 1) {
    currentSlidePos = 0;
  } else {
    currentSlidePos++;
  }

  updateSliderPos();
};

heroSliderNextBtn.addEventListener("click", slideNext);

const slidePrev = function () {
  if (currentSlidePos <= 0) {
    currentSlidePos = heroSliderItems.length - 1;
  } else {
    currentSlidePos--;
  }

  updateSliderPos();
};

heroSliderPrevBtn.addEventListener("click", slidePrev);

/**
 * auto slide
 */

let autoSlideInterval;

const autoSlide = function () {
  autoSlideInterval = setInterval(function () {
    slideNext();
  }, 7000);
};

addEventOnElements(
  [heroSliderNextBtn, heroSliderPrevBtn],
  "mouseover",
  function () {
    clearInterval(autoSlideInterval);
  }
);

addEventOnElements(
  [heroSliderNextBtn, heroSliderPrevBtn],
  "mouseout",
  autoSlide
);

window.addEventListener("load", autoSlide);

/**
 * PARLLAX EFFECT
 */

const parallaxItem = document.querySelectorAll("[data-parallax-item]");

let x, y;

window.addEventListener("mousemove", function (event) {
  x = (event.clientX / window.innerWidth) * 10 - 5;
  y = (event.clientY / window.innerHeight) * 10 - 5;

  //reverse the number eg. 20 -> -20, -5 -> 5
  x = x - x * 2;
  y = y - y * 2;

  for (let i = 0; i < parallaxItem.length; i++) {
    x = x * Number(parallaxItem[i].dataset.parallaxSpeed);
    y = y * Number(parallaxItem[i].dataset.parallaxSpeed);
    parallaxItem[i].style.transform = `translate3d(${x}px, ${y}px, 0px)`;
  }
});

