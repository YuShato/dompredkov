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
  