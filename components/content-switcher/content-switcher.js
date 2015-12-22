const ContentSwitcher = () => {

  const csButtons = [... (document.querySelectorAll('.content-switcher__btn'))];

  const addActive = (buttons) => {
    buttons.forEach(button => {
      button.addEventListener('click', function() {
        removeActive(buttons);
        button.classList.add('active');
      });
    });
  };

  const removeActive = (buttons) => {
    buttons.forEach(button => {
      if (button.classList.contains('active')) {
        button.classList.remove('active');
      }
    });
  }

  addActive(csButtons);

};

export default ContentSwitcher;
