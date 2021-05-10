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
  