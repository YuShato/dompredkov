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
  