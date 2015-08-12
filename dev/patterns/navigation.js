(function(){
  var menuToggle = document.querySelector('#menu-toggle');
  var nav = document.querySelector('ul.nav__links');
  
  menuToggle.addEventListener('click', function (event) {
    nav.classList.toggle('visible');
  });
})();