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
  