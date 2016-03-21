import BluemixComponents from './js';

document.addEventListener('DOMContentLoaded', () => {
  BluemixComponents.FileUploader.init();
  BluemixComponents.Tab.init();
  BluemixComponents.OverflowMenu.init();
  BluemixComponents.Modal.init();
  BluemixComponents.Toolbars.init();

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
    BluemixComponents.HeaderNav.hook(element);
    // In demo, don't follow taxonomy nav links
    element.addEventListener('click', (event) => {
      event.preventDefault();
    });
  });
  [... document.querySelectorAll('[data-spinner]')].forEach((element) => {
    const spinner = BluemixComponents.Spinner.create(element);
    setInterval(() => spinner.toggle(), 3000);
  });

  // Where should this example code go?
  // example of how to hook into Modal for a 'transactional' effect
  /*
  const transactionalModal = BluemixComponents.Modal.components.get(document.getElementById('transactional-modal'));
  transactionalModal.options.canClose = false;

  transactionalModal.element.addEventListener('modal-beinghidden', (event) => {
    if (!transactionalModal.options.canClose) {
      event.preventDefault(); // this stops the event
      console.log('Nope! Overriding hide event. Hit save to close.'); // eslint-disable-line no-console
    }
  });

  transactionalModal.element.querySelector('.buttons__save').addEventListener('click', () => {
    transactionalModal.options.canClose = true;
    transactionalModal.hide();
    transactionalModal.options.canClose = false;
  });
  ----- transactional modal example
  */
});
