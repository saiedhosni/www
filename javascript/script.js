'use strict';

(function() {

	// web developer console signature
	console.log('%c Made with ❤︎️ by Studio MOTIO — https://www.studiomotio.com', 'background:#000;color:#fff;padding:0.5em 1em;line-height:2;');

	// screen size detection (based on Foundation build)
	const screen = {
		small: window.innerWidth < 640,
		medium: window.innerWidth >= 640 && window.innerWidth < 1024,
		large: window.innerWidth >= 1024
	}

	// initializes barba js
	Barba.Pjax.start();

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
		warning: '#f6cc00',
		fog: '#dadce0'
	};

	// linear easing path (1:1)
	const linearCurve = mojs.easing.path('M0, -100 C0, -100 100, 0 100, 0');

	// mojs options and objects for the "show/hide the close menu button" tween
	const menuOptions = {
		parent: document.querySelector('.menu-button-close'),
		fill: 'transparent',
		stroke: colors.contrast,
		strokeWidth: { 4 : 0 },
		duration: 700,
		isForce3d: true
	};

	let menuCircle = new mojs.Shape(
		mojs.helpers.extend({
			shape: 'circle',
			radius: { 0 : 30 },
			opacity: { 1 : 0, curve: linearCurve }
		}, menuOptions)
	);

	let menuCross = new mojs.Shape(
		mojs.helpers.extend({
			shape: 'cross',
			angle: 45,
			radius: { 0 : 20 },
			strokeWidth: 4,
			easing: 'circ.out',
			duration: 1400,
			delay: 200
		}, menuOptions)
	);

	let stageMenu = mojs.stagger(mojs.Shape);
	let menuBubbles = new stageMenu(
		mojs.helpers.extend({
			shape: 'circle',
			radius: [{ 0: 10 }, { 0: 6 }, { 0: 4 }],
			quantifier: 3,
			x: ['rand(-30px, -20px)', 'rand(5px, 10px)', 'rand(15px, 30px)'],
			y: ['rand(-20px, -40px)', 'rand(30px, 40px)', 'rand(-10px, -20px)'],
			opacity: { 1 : 0, curve: linearCurve },
			stroke: colors.vibrant,
			delay: 'stagger(500, 150)'
		}, menuOptions)
	);

	let menuSteam = new mojs.Burst({
		degree: 20,
		radius: { 0 : 90 },
		parent: menuOptions.parent,
		children: mojs.helpers.extend({
			shape: 'circle',
			swirlSize: 10,
			swirlFrequency: 'rand(5, 7)',
			pathScale: 'rand(0.3, 1)',
			degreeShift: 10,
			isSwirl: true,
			radius: { 'rand(6, 8)' : 0 },
			fill: [colors.contrast, colors.vibrant],
			stroke: 'transparent',
			delay: 100,
			duration: 600,
			easing: 'cubic.in'
		}, menuOptions)
	});

	let menuTimeline = new mojs.Timeline({delay: 1200});
	menuTimeline.add(menuCircle, menuCross, menuBubbles);

	// binds all open menu buttons to displays the tween when the menu is opened (from white or black section)
	document.querySelector('.menu-button').addEventListener('click', function(e) {
		menuBubbles.generate();
		menuTimeline.play();
	});

	// binds the close menu button to displays the tween when the menu is closed
	menuOptions.parent.addEventListener('click', function(e) {
		menuCross.then({
			radius: 0,
			duration: 500,
			delay: 0
		}).play();

		menuCircle.play();
		menuSteam.generate().play();
	});

	// 404 illustration tween
	const illustration = document.querySelector('.illustration-404');

	// checks if the illustration is present on the page
	if (illustration != null) {

		// base options for the 404 illustration
		const illustrationOptions = {
			parent: document.querySelector('.illustration-404'),
			isForce3d: true
		};

		// fog tween
		const fogShape = mojs.stagger(mojs.Shape);
		const fog = new fogShape(
			mojs.helpers.extend({
				quantifier: 40,
				shape: 'line',
				stroke: colors.fog,
				strokeWidth: 'rand(1.5, 3)',
				strokeDasharray: '100%',
				strokeDashoffset: { '-100%' : '100%' },
				x: { 'rand(-250, 250)' : 'rand(-250, 250)' },
				y: 'rand(-40, 60)',
				opacity: { 0.8 : 0 },
				radius: 'rand(20, 60)',
				duration: 500,
				repeat: 100,
				delay: 'rand(0, 2000)',
				isShowEnd: false,
				speed: 0.03
			}, illustrationOptions)
		).play();

		// sun tween
		let sun = new mojs.Shape(
			mojs.helpers.extend({
				shape: 'circle',
				fill: colors.warning,
				left: '80%',
				top: '20%',
				radius: { 18 : 20 },
				opacity: { 0.2 : 0.3 },
				duration: 4000,
				repeat: 3000,
				isYoyo: true
			}, illustrationOptions)
		).play();
	}
})();