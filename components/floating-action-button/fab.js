// ------------------------------------------------------
// This probably should be made more configurable but..
// -------------------------------------------------------

export default function() {
  const fabButton = document.querySelector('#fab');
  fabButton.addEventListener('click', (e) => {
    e.preventDefault();
    fabButton.classList.toggle('fab--close');
  });
}
