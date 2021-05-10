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
  