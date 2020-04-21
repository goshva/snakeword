/*
var els = document.getElementsByClassName('current-class-name');
removeClass(els, 'current-class-name');
addClass(els, 'new-class-name');

var el = document.getElementById('current-class-name');
removeClass([el], 'current-class-name');
addClass([el], 'new-class-name');
*/
function addClass(elements, className) {
	for (var i = 0; i < elements.length; i++) {
		var element = elements[i];
		if (element.classList) {
			element.classList.add(className);
		} else {
			element.className += ' ' + className;
		}
	}
}

function removeClass(elements, className) {
	for (var i = 0; i < elements.length; i++) {
		var element = elements[i];
		if (element.classList) {
			element.classList.remove(className);
		} else {
			element.className = element.className.replace(new RegExp('(^|\\b)' + className.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
		}
	}
}