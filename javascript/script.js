'use strict';

(function() {

	// gets the white section as a wrapper
	const wrapper = document.querySelector('section.white');

	// checks if the wrapper is initialized
	if (wrapper != null) {

		// clones the header
		const header = document.querySelector('header').cloneNode(true);
		header.classList.add('clone');
		header.querySelector('#trigger').setAttribute('id', 'trigger-clone');
		header.querySelector('[for="trigger"]').setAttribute('for', 'trigger-clone');
		header.querySelector('.menu-button-close').setAttribute('for', 'trigger-clone');
		wrapper.appendChild(header);

		// tells to the base menu button to activate the cloned trigger
		document.querySelector('[for="trigger"]').setAttribute('for', 'trigger-clone');

		// clones the media if we are on medium and large screens
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

	// motion colors based on main theme
	const colors = {
		base: '#000',
		vibrant: '#00ffd3',
		contrast: '#fff',
		bright: '#5f5f5f',
		warning: '#f6cc00'
	};

	// linear easing path (1:1)
	const linearCurve = mojs.easing.path('M0, -100 C0, -100 100, 0 100, 0');

	// mojs options and objects for the "show close menu button" tween
	const options_showCloseMenuButton = {
		parent: document.querySelector(wrapper != null ? '.clone .menu-button-close' : '.menu-button-close'),
		fill: 'transparent',
		stroke: colors.contrast,
		strokeWidth: { 4 : 0 },
		duration: 700,
		isForce3d: true
	};

	let circle_showCloseMenuButton = new mojs.Shape(
		mojs.helpers.extend({
			shape: 'circle',
			radius: { 0 : 30 },
			opacity: { 1 : 0, curve: linearCurve }
		}, options_showCloseMenuButton)
	);

	let pulse_showCloseMenuButton = new mojs.Burst({
		radius: { 0 : 60 },
		children: mojs.helpers.extend({
			shape: 'line',
			radius: { 5 : 2, curve: linearCurve },
			duration: 1050,
			delay: 70,
		}, options_showCloseMenuButton)
	});

	let cross_showCloseMenuButton = new mojs.Shape(
		mojs.helpers.extend({
			shape: 'cross',
			angle: 45,
			radius: { 0 : 20 },
			strokeWidth: 4,
			easing: 'circ.out',
			duration: 1400,
			delay: 200
		}, options_showCloseMenuButton)
	);

	let stage_showCloseMenuButton = mojs.stagger(mojs.Shape);
	let bubbles_showCloseMenuButton = new stage_showCloseMenuButton(
		mojs.helpers.extend({
			shape: 'circle',
			radius: [{ 0: 10 }, { 0: 6 }, { 0: 4 }],
			quantifier: 3,
			x: ['rand(-30px, -20px)', 'rand(5px, 10px)', 'rand(15px, 30px)'],
			y: ['rand(-20px, -40px)', 'rand(30px, 40px)', 'rand(-10px, -20px)'],
			opacity: { 1 : 0, curve: linearCurve },
			stroke: colors.vibrant,
			delay: 'stagger(500, 150)'
		}, options_showCloseMenuButton)
	);

	let timeline_showCloseMenuButton = new mojs.Timeline({delay: 1200});
	timeline_showCloseMenuButton.add(circle_showCloseMenuButton, pulse_showCloseMenuButton, cross_showCloseMenuButton, bubbles_showCloseMenuButton);

	// blinds all close menu buttons to displays the tween when the menu is opened
	Array.from(document.querySelectorAll('.menu-button')).forEach(function(button) {
		button.addEventListener('click', function(e) {
			bubbles_showCloseMenuButton.generate();
			timeline_showCloseMenuButton.replay();
		});
	});
})();