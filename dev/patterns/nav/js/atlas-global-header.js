var menuButton = document.querySelector('#global-menu-toggle');
var dropdownMenu = document.querySelector('.nav__global-menu');

menuButton.addEventListener('click', function (event) {
  dropdownMenu.classList.toggle('active');
});
