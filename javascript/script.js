'use strict';

(function() {

	// gets the white section as a wrapper
	var wrapper = document.querySelector('section.white');

	// checks if the wrapper is initialized
	if (wrapper != null && wrapper.length != 0) {

		// clones the header
		var header = document.querySelector('header').cloneNode(true);
		header.classList.add('clone');
		wrapper.appendChild(header);

		// clones the media
		var media = document.querySelector('.media').cloneNode(true);
		media.classList.add('clone');
		wrapper.appendChild(media);

		// binds the load/scroll/resize events to refresh the cloned objects position
		['load', 'scroll', 'resize'].forEach(function(e) {
			window.addEventListener(e, function() {

				// gets the wrapper section boundary
				var top = wrapper.getBoundingClientRect().top * -1;

				// moves the header at the good top
				header.style['top'] = top + 'px';

				// moves the media block at the good top
				media.style['top'] = 'calc(' + top + 'px + 50vh)';
			});
		});
	}
})();