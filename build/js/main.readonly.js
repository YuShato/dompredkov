import {forEachPolyfill} from './utils/polyfill-foreach';
import {initIe11Download} from './utils/init-ie11-download';
import {openMenu} from './modules/openMenu';
import {sliderMenu} from './modules/sliderMenu';
import {sliderEvent} from "./modules/sliderEvent";
import {instSlider} from "./modules/instSlider";
import {fixNav} from './modules/fixNav';
import {mapPopup} from './modules/mapPopup';
import {showForm} from './modules/showForm';
import {activeDropdownArticles} from './modules/mobile-articles';

// Utils
// ---------------------------------
forEachPolyfill();
initIe11Download();

// Modules
// ---------------------------------
openMenu();
mapPopup();
sliderMenu();
sliderEvent();
instSlider();
fixNav();
showForm();
activeDropdownArticles();

const ie11Download = (el) => {
    if (el.href === ``) {
      throw Error(`The element has no href value.`);
    }
  
    let filename = el.getAttribute(`download`);
    if (filename === null || filename === ``) {
      const tmp = el.href.split(`/`);
      filename = tmp[tmp.length - 1];
    }
  
    el.addEventListener(`click`, (evt) => {
      evt.preventDefault();
      const xhr = new XMLHttpRequest();
      xhr.onloadstart = () => {
        xhr.responseType = `blob`;
      };
      xhr.onload = () => {
        navigator.msSaveOrOpenBlob(xhr.response, filename);
      };
      xhr.open(`GET`, el.href, true);
      xhr.send();
    });
  };
  
  const downloadLinks = document.querySelectorAll(`a[download]`);
  
  const initIe11Download = () => {
    if (window.navigator.msSaveBlob) {
      if (downloadLinks.length) {
        downloadLinks.forEach((el) => {
          ie11Download(el);
        });
      }
    }
  };
  
  export {initIe11Download};
  
const forEachPolyfill = () => {
    if (window.NodeList && !NodeList.prototype.forEach) {
      NodeList.prototype.forEach = Array.prototype.forEach;
    }
  };
  
  export {forEachPolyfill};
  
const body = document.querySelector(`body`);

const getScrollbarWidth = () => {
  const outer = document.createElement(`div`);
  outer.style.visibility = `hidden`;
  outer.style.overflow = `scroll`;
  outer.style.msOverflowStyle = `scrollbar`;
  body.appendChild(outer);
  const inner = document.createElement(`div`);
  outer.appendChild(inner);
  const scrollbarWidth = (outer.offsetWidth - inner.offsetWidth);
  outer.parentNode.removeChild(outer);
  return scrollbarWidth;
};

const getBodyScrollTop = () => {
  return (
    self.pageYOffset ||
    (document.documentElement && document.documentElement.ScrollTop) ||
    (body && body.scrollTop)
  );
};

const disableScrolling = () => {
  const scrollWidth = getScrollbarWidth();
  body.setAttribute(`style`, `padding-right: ` + scrollWidth + `px;`);
  body.dataset.scrollY = `${getBodyScrollTop()}`;
  body.style.top = `-${body.dataset.scrollY}px`;
  body.classList.add(`scroll-lock`);
};

const enableScrolling = () =>{
  body.removeAttribute(`style`);
  body.classList.remove(`scroll-lock`);
  window.scrollTo(0, +body.dataset.scrollY);
};

export {enableScrolling, disableScrolling};

const fixNav = () => {
    const articlesNav = document.getElementById(`articlesNav`);
    const servicesNav = document.getElementById(`servicesNav`);
  
    if (articlesNav || servicesNav) {
      document.addEventListener(`DOMContentLoaded`, () => {
        window.addEventListener(`scroll`, myFunctionForSticky);
  
  
        const sticky = articlesNav.offsetTop;
  
        function myFunctionForSticky() {
          if (window.pageYOffset > sticky) {
            articlesNav.classList.add(`our-park__nav-articles--sticky`);
            if (servicesNav) {
              servicesNav.classList.add(`services--sticky`);
            }
          } else {
            articlesNav.classList.remove(`our-park__nav-articles--sticky`);
            if (servicesNav) {
              servicesNav.classList.remove(`services--sticky`);
            }
          }
        }
      });
    }
  };
  
  export {
    fixNav
  };
  
const instSlider = () => {

    const instagramSlider = new Swiper(`.inst-slider__slider-container`, {
      slidesPerView: `auto`,
      slidesPerColumn: 1,
      spaceBetween: 10,
  
      navigation: {
        nextEl: `.inst-slider__btn--next`,
        prevEl: `.inst-slider__btn--prev`,
      },
      breakpoints: {
        769: {
          slidesPerView: `auto`,
          slidesPerColumn: 2,
          spaceBetween: 36,
        },
      },
    });
  
  };
  
  export {instSlider};
  
import MicroModal from 'micromodal';

const mapPopup = () => {
  MicroModal.init({disableScroll: true});
};

export {mapPopup};

const dropdownList = document.querySelector(`.our-park__nav-item--dropdown`);
const dropdownMenu = document.querySelector(`.sub-menu-articles`);

const activeDropdownArticles = () => {
  dropdownList.addEventListener(`click`, () => {
    if (dropdownMenu.classList.contains(`sub-menu-articles--show`)) {
      dropdownMenu.classList.remove(`sub-menu-articles--show`);
    } else {
      dropdownMenu.classList.add(`sub-menu-articles--show`);
    }
  });
};

export {activeDropdownArticles};

/* eslint-disable no-invalid-this */
import {
    disableScrolling,
    enableScrolling
  } from '../utils/scroll-lock';
  
  const openMenu = () => {
  
    const btn = document.getElementById(`nav-btn`);
    const mainNav = document.getElementById(`main-nav`);
    const dropDown = document.querySelector(`.main-nav__link--dropdown`);
    const subMenu = document.querySelector(`.sub-menu`);
    const menuItems = document.querySelectorAll(`.main-nav__item`);
  
    // eslint-disable-next-line consistent-return
    const heightDropdown = () => {
      const ch = subMenu.clientHeight;
      const sh = subMenu.scrollHeight;
  
      const isCollapsed = !ch;
      const noHeightSet = !subMenu.style.height;
  
      if (isCollapsed || noHeightSet) {
        openDropdownMenu(sh);
      } else {
        closeDropdownMenu();
      }
  
      if (noHeightSet) {
        return heightDropdown.call(this);
      }
    };
  
    const openDropdownMenu = (sh) => {
      dropDown.classList.add(`main-nav__link--open`);
      subMenu.classList.add(`sub-menu--open`);
      subMenu.style.height = `${sh}px`;
  
      for (const item of menuItems) {
        if (!item.classList.contains(`main-nav__item--dropdown`)) {
          item.style.opacity = `0.3`;
        }
      }
    };
  
    const closeDropdownMenu = () => {
      dropDown.classList.remove(`main-nav__link--open`);
      subMenu.classList.remove(`sub-menu--open`);
      subMenu.style.height = `0px`;
  
      for (const item of menuItems) {
        if (!item.classList.contains(`main-nav__item--dropdown`)) {
          item.style.opacity = `1`;
        }
      }
    };
  
    const getMenu = () => {
      if (window.innerWidth <= 768) {
  
        mainNav.style.height = `${window.innerHeight - 76}px`;
  
        btn.addEventListener(`click`, function () {
          if (!mainNav.classList.contains(`main-nav--open`)) {
            mainNav.classList.add(`main-nav--open`);
            this.classList.add(`menu-btn--open`);
            disableScrolling();
          } else {
            mainNav.classList.remove(`main-nav--open`);
            this.classList.remove(`menu-btn--open`);
            enableScrolling();
  
            closeDropdownMenu();
          }
        });
  
        dropDown.addEventListener(`click`, function (evt) {
          evt.preventDefault();
          heightDropdown();
        });
      }
    };
  
    const removeMobileMenu = () => {
      if (window.innerWidth >= 768) {
        mainNav.removeAttribute(`style`);
        closeDropdownMenu();
        mainNav.classList.remove(`main-nav--open`);
        btn.classList.remove(`menu-btn--open`);
      }
    };
  
    getMenu();
    removeMobileMenu();
  
    window.addEventListener(`resize`, removeMobileMenu);
  };
  
  export {
    openMenu
  };
  
const showForm = () => {

    const showFormButton = document.querySelector(`.question-form__button-show-form`);
  
    if (showFormButton) {
      const visibleBlock = document.querySelector(`.question-form__inner-visible`);
      const hiddenBlock = document.querySelector(`.question-form__inner-hidden`);
  
  
      showFormButton.addEventListener(`click`, function () {
  
        visibleBlock.classList.add(`question-form__inner--hidden`);
        hiddenBlock.classList.remove(`question-form__inner--hidden`);
      });
    }
  };
  
  export {showForm};
  
const sliderEvent = () => {

    const eventSlider = new Swiper(`.upcoming-events__slider-container`, {
      slidesPerView: `auto`,
      spaceBetween: 10,
      autoHeight: true,
  
      navigation: {
        nextEl: `.upcoming-events__btn--next`,
        prevEl: `.upcoming-events__btn--prev`,
      },
      breakpoints: {
        600: {
          slidesPerView: `auto`,
          autoHeight: false,
          spaceBetween: 37,
        },
      }
    });
  
  };
  
  export {sliderEvent};
  
const sliderMenu = () => {

    const topSlider = new Swiper(`.slider-menu__slider-container`, {
      autoplay: {
        delay: 3000,
      },
      pagination: {
        el: `.slider-menu__list`,
        type: `custom`,
        clickable: true,
        renderCustom(swiper, current, total) {
          let item = ``;
          for (let i = 1; i <= total; i++) {
            if (current === i) {
              item += `<li class="slider-menu__item active"> <a href="${swiper.slides[i - 1].dataset.slideHref}"><span>${swiper.slides[i - 1].dataset.slideName}</span> </a></li>`;
            } else {
              item += `<li class="slider-menu__item"> <a href="${swiper.slides[i - 1].dataset.slideHref}"><span>${swiper.slides[i - 1].dataset.slideName}</span> <a href="#"> </li>`;
            }
          }
          return item;
        },
      },
    });
  
    topSlider.on(`transitionStart`, function () {
      const slides = topSlider.pagination.el.querySelectorAll(`.slider-menu__item`);
  
      slides.forEach((slide, inx) => {
  
        slide.addEventListener(`click`, function () {
          topSlider.slideTo(inx);
        });
      });
    });
  };
  
  export {
    sliderMenu
  };
  