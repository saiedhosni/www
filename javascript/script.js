'use strict';

(function(){
	document.addEventListener('DOMContentLoaded', function() {
		
		// click and highlight on mailto link
		var mailto = document.querySelector('#mailto');
		var arrow = document.querySelector('#arrow');
		
		mailto.addEventListener('click', function() {
			window.location.href = 'mailto:hello@studiomotio.com';
		});
		
		mailto.addEventListener('mouseover', function() {
			if (!this.classList.contains('highlight')) {
				this.classList.add('highlight');
				arrow.classList.add('highlight');
			}
		});
		
		mailto.addEventListener('mouseout', function() {
			if (this.classList.contains('highlight')) {
				this.classList.remove('highlight');
				arrow.classList.remove('highlight');
			}
		});
	});
})();