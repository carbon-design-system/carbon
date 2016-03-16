import BluemixComponents from '../../../../js';

document.addEventListener('DOMContentLoaded', () => {
  [... document.querySelectorAll('[data-tabs]')]
  .forEach((element) => new BluemixComponents.Tab(element));
  [... document.querySelectorAll('[data-tabs] .item__link')].forEach((element) => {
    // In demo, don't follow links in tab
    element.addEventListener('click', (event) => {
      event.preventDefault();
    });
  });
});
