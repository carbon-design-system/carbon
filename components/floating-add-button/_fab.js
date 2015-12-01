(function() {
		var fabButton = document.querySelector('.fab');
		fabButton.addEventListener('click', function(e) {
			e.preventDefault();
			fabButton.classList.toggle('fab--close');
		});
})();