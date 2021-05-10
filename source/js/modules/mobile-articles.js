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
