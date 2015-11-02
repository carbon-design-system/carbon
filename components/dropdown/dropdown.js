window.onhashchange = function() { 
	var current = document.querySelector("#current");
	var hash = document.location.hash;
	if (hash == '') {
		current.innerHTML = "Home";
	} else {
	var currentHash = hash.substring(1, hash.length);
	current.innerHTML = currentHash.charAt(0).toUpperCase() + currentHash.slice(1);
	}
	console.log(current.innerHTML);
}