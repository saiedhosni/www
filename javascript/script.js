'use strict';

(function() {

	// gets the white section as a wrapper
	const wrapper = document.querySelector('section.white');

	// checks if the wrapper is initialized
	if (wrapper != null && wrapper.length != 0) {

		// clones the header
		const header = document.querySelector('header').cloneNode(true);
		header.classList.add('clone');
		header.querySelector('#trigger').id = 'trigger-clone';
		wrapper.appendChild(header);

		// clones the media (for medium and large screens)
		if (window.innerWidth >= 640) {
			var media = document.querySelector('.media').cloneNode(true);
			media.classList.add('clone');
			wrapper.appendChild(media);
		}

		// binds the load/scroll/resize events to refresh the cloned objects position
		['load', 'scroll', 'resize'].forEach(function(e) {
			window.addEventListener(e, function() {

				// gets the wrapper section boundary
				let top = wrapper.getBoundingClientRect().top * -1;

				// moves the header at the good top
				header.style['top'] = top + 'px';

				// moves the media block at the good top (for medium and large screens)
				if (typeof(media) !== 'undefined') {
					media.style['top'] = 'calc(' + top + 'px + 50vh)';
				}
			});
		});
	}

	// gets the contact form
	const form = document.querySelector('form');

	// checks if the form is present on the page
	if (form != null) {

		// binds the submit event of the form to validate the content
		form.addEventListener('submit', function(e) {

			// prevents default event
			e.preventDefault();

			// defines the mail regular expression
			const regex = /(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))/;

			// gets the textarea field
			const message = document.querySelector('textarea');

			// gets the post button
			const button = document.querySelector('button');

			// displays an invalid message if no mail address is specified
			if (!regex.test(message.value)) {
				form.classList.add('state', 'nomail');
				button.blur();

				// restores the previous state after 2.2 seconds
				setTimeout(function() {
					form.className = '';
				}, 2200);

				return;
			}

			// displays a pending state before sending the message
			message.setAttribute('disabled', 'disabled');
			form.classList.add('state', 'pending');
			button.blur();

			// prepares the message for sending
			const request = new XMLHttpRequest();
			request.open('POST', '/javascript/asynchronous/message.php');
			request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
			request.addEventListener('readystatechange', function() {
				if (request.readyState === XMLHttpRequest.DONE && request.status === 200) {
					if (request.responseText == 'posted') {
						form.classList.remove('pending');
						form.classList.add('state', 'delivered');

						// restores the previous state after 2.2 seconds
						setTimeout(function() {
							form.className = '';
							message.removeAttribute('disabled');
							message.value = '';
						}, 3200);
					} else {
						form.classList.remove('pending');
						form.classList.add('undelivered');

						// restores the previous state after 3.2 seconds
						setTimeout(function() {
							form.className = '';
							message.removeAttribute('disabled');
						}, 3200);
					}
				}
			});

			// sends the contact message to the studio
			request.send('message=' + document.querySelector('textarea').value);
		});
	}
})();