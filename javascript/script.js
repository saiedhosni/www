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

	// gets the contact form
	var form = document.querySelector('form');

	// checks if the form is present on the page
	if (form != null) {

		// binds the submit event of the form to validate the content
		form.addEventListener('submit', function(e) {

			// prevents default event
			e.preventDefault();

			// defines the mail regular expression
			var regex = /(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))/;

			// displays an invalid message if email address is not specified
			if (!regex.test(document.querySelector('textarea').value)) {
				e.preventDefault();
				form.classList.add('invalid');
				document.querySelector('button').blur();

				// restores the previous state after 2.2 seconds
				setTimeout(function() {
					form.className = '';
				}, 2200);

				return;
			}
		});
	}
})();