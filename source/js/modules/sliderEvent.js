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
  