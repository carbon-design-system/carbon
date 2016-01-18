const OverflowMenu = () => {

  const overflowMenu = document.querySelector('.overflow-menu');
  overflowMenu.addEventListener('click', (e) => {
    e.preventDefault();
    overflowMenu.classList.toggle('open');
  });

};

export default OverflowMenu;
