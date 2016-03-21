import BluemixComponents from '../../../../js';

document.addEventListener('DOMContentLoaded', () => {
  [... document.querySelectorAll('[data-file-input]')].forEach((element) => BluemixComponents.FileUploader.create(element));
  [... document.querySelectorAll('[data-tabs]')].forEach((element) => BluemixComponents.Tab.create(element));
  [... document.querySelectorAll('[data-nav-target]')].forEach((element) => {
    [... document.querySelectorAll(element.getAttribute('data-nav-target'))].forEach((target) => {
      target.addEventListener('header-beingselected', (e) => {
        // In demo, don't follow the link in nav
        e.detail.initiatingEvent.preventDefault();
      });
    });
    BluemixComponents.HeaderNav.hook(element);
  });
  [... document.querySelectorAll('[data-list-icons-search-action-target]')].forEach((element) => BluemixComponents.Toolbars.create(element));
});
