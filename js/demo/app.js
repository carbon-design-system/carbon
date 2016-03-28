import BluemixComponents from '../index';

document.addEventListener('DOMContentLoaded', () => {
  // The following Components have custom setup for demo purposes, so we aren't using init();
  [... document.querySelectorAll('[data-tabs] .item__link')].forEach((element) => {
    // In demo, don't follow links in tab
    element.addEventListener('click', (event) => {
      event.preventDefault();
    });
  });
  [... document.querySelectorAll('[data-nav-target]')].forEach((element) => {
    [... document.querySelectorAll(element.getAttribute('data-nav-target'))].forEach((target) => {
      target.addEventListener('header-beingselected', (event) => {
        // In demo, don't follow the link in nav
        event.detail.initiatingEvent.preventDefault();
      });
    });
    // In demo, don't follow taxonomy nav links
    element.addEventListener('click', (event) => {
      event.preventDefault();
    });
  });
  [... document.querySelectorAll('[data-spinner]')].forEach((element) => {
    const spinner = BluemixComponents.Spinner.components.get(element);
    setInterval(() => spinner.toggle(), 3000);
  });
});
