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

	// adds a css class to pages that displays a footer (all pages except the homepage)
	Barba.Dispatcher.on('newPageReady', function(currentStatus, prevStatus, HTMLElementContainer, newPageRawHTML) {
		if (currentStatus.namespace != 'index') {
			document.querySelector('body').classList.add('has-footer');
		}
	});

	// initializes emergence js
	emergence.init({
		elemCushion: 1,
		offsetTop: screen.small ? 90 : 110,
		offsetBottom: screen.small ? -700 : 50,
		throttle: 100
	});

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
		cloud: '#dadce0'
	};

	// easing path for motion effects
	const linearCurve = mojs.easing.path('M0, -100 C0, -100 100, 0 100, 0');
	const easingCurve = mojs.easing.path('M0,100 C50,100 50,67.578125 50,50 C50,32.421875 50,0 100,0');

	// binds all logos and create an animation for each one
	Array.from(document.querySelectorAll('.logo')).forEach(function(logo) {

		// mojs options and objects for the "mouseenter/mouseleave logo" tween
		const letter = logo.querySelector('.letter');
		const length = letter.getTotalLength();
		let letterPlayState = false;

		const letterOptions = {
			el: letter,
			strokeDasharray: length,
			transformOrigin: '109.2px 13.2px',
			duration: 700,
			easing: easingCurve,
			isForce3d: true
		};

		let letterIn = new mojs.Html(
			mojs.helpers.extend({
				strokeDashoffset: { [-length] : 0 },
				angleZ: { 90 : 360 }
			}, letterOptions)
		);

		let letterOut = new mojs.Html(
			mojs.helpers.extend({
				strokeDashoffset: { 0 : length },
				angleZ: { 0 : 180 },
				onComplete: function() {
					this.el.style['strokeDashoffset'] = -length;
					letterPlayState = false;
					letterIn.play();
				}
			}, letterOptions)
		);

		// hides the "o" letter of the logo on enter
		logo.addEventListener('mouseenter', function() {
			letterPlayState = true;
			letterOut.play();
		});

		// shows the "o" letter of the logo on leave
		logo.addEventListener('mouseleave', function() {
			if (letterPlayState == true) {
				letterOut.playBackward();
			}
		});
	});

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
			easing: mojs.easing.circ.out,
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
			easing: mojs.easing.cubic.in
		}, menuOptions)
	});

	let menuTimeline = new mojs.Timeline({delay: 1200});
	menuTimeline.add(menuCircle, menuCross, menuBubbles);

	// binds all open menu buttons to displays the tween when the menu is opened (from white or black section)
	document.querySelector('.menu-button').addEventListener('click', function() {
		menuBubbles.generate();
		menuTimeline.play();
	});

	// binds the close menu button to displays the tween when the menu is closed
	menuOptions.parent.addEventListener('click', function() {
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

		// bird tween
		const birdOptions = {
			parent: '.illustration-404',
			shape: 'zigzag',
			count: 2,
			radiusX: 7,
			radiusY: 5,
			angle: 180,
			scale: 'rand(0.5, 1)',
			opacity: { 0 : 1 },
			fill: 'transparent',
			stroke: colors.base,
			strokeWidth: 'rand(1, 1.5)',
			strokeLinecap: 'round',
			x: 'rand(0, 140)',
			y: 'rand(-60, -10)',
			duration: 'rand(500, 1500)',
			delay: 'rand(0, 400)',
			isForce3d: true
		};

		// creates some birds and makes them fly
		for(let i = 0; i < Math.floor((Math.random() * 5) + 2); i++) {
			new mojs.Shape(birdOptions).then({
				radiusY: { 5 : 2 },
				origin: { '50% 50%' : '50% 20%' },
				easing: mojs.easing.sin.inout,
				speed: 'rand(0.3, 0.4)',
				delay: 0,
				isYoyo: true,
				repeat: 999
			}).play();
		}

		// defines the wind shape
		class Wind extends mojs.CustomShape {
			getShape() { return '<path d="M14.798 70.488c9.153.405 19.657-4.285 27.707-8.416 10.015-5.139 22.439-12.05 27.156-22.866 6.19-14.195-14.828-10.743-6.568-.406 6.633 8.301 19.062-.819 22.108-7.998"/>';}
			getLength() { return 118.114; }
		}

		// adds the wind shape to the library
		mojs.addShape('wind', Wind);

		// creates the wind effect
		let wind = new mojs.Shape({
			parent: '.illustration-404',
			shape: 'wind',
			left: 'rand(10%, 90%)',
			top: 'rand(20%, 60%)',
			fill: 'transparent',
			stroke: colors.cloud,
			strokeWidth: { 2 : 'rand(0.5, 1)' },
			strokeDasharray: '40% 140%',
			strokeDashoffset: { '50%' : '-140%' },
			opacity: { 1 : 0 },
			scale: 'rand(0.5, 1)',
			easing: mojs.easing.quint.out,
			duration: 'rand(3000, 4000)',
			delay: 'rand(1000, 2000)',
			isForce3d: true,
			onComplete: function() {
				this.generate().replay();
			}
		}).play();
	}
})();