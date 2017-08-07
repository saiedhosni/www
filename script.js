'use strict';

(function(){
	document.addEventListener('DOMContentLoaded', function() {
		
		// highlight on mailto link
		var mailto = document.querySelector('#mailto');
		
		mailto.addEventListener('click', function() {
			window.location.href = 'mailto:hello@studiomotio.com';
		});
	});
})();