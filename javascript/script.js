'use strict';

(function() {

	// web developer console signature
	console.log('%c Made with ❤︎️ by Studio MOTIO — https://www.studiomotio.com', 'background:#000;color:#fff;padding:0.5em 1em;line-height:2;');

	// screen size detection (based on Foundation build)
	let screen = {
		small: window.innerWidth < 640,
		medium: window.innerWidth >= 640 && window.innerWidth < 1024,
		large: window.innerWidth >= 1024
	}

	// initializes barba js
	Barba.Pjax.start();
	Barba.Prefetch.init();

	// manages the newPageReady event of barba js
	Barba.Dispatcher.on('newPageReady', function(currentStatus, prevStatus, HTMLElementContainer, newPageRawHTML) {

		// scroll to the top when the new page is ready
		window.scrollTo(0, 0);

		// inits the form on the contact page
		if (currentStatus.namespace == 'contact') {
			initForm();
		}
	});

	// manages the transitionCompleted event of barba js
	Barba.Dispatcher.on('transitionCompleted', function(currentStatus, prevStatus) {

		// inits some tweens for the current page
		initScrollTween();
		initLogoTween();
		initEmergence();
		initDotCursor();
	});

	// manages the contact form
	(window.initForm = function() {
		const form = document.querySelector('form');

		// exits if the form isn't present on the page
		if (form == null) {
			return;
		}

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
	})();

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
	(window.initLogoTween = function() {
		Array.from(document.querySelectorAll('.logo')).forEach(function(logo) {

			// mojs options and objects for the "mouseenter/mouseleave logo" tween
			const letter = logo.querySelector('.motion-letter');
			const length = letter.getTotalLength();

			const letterOptions = {
				playstate: false,
				el: letter,
				strokeDasharray: length,
				transformOrigin: '109.2px 13.2px',
				duration: 700,
				easing: easingCurve
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
						this._props.playstate = false;
						letterIn.play();
					}
				}, letterOptions)
			);

			// hides the "o" letter of the logo on enter
			logo.addEventListener('mouseenter', function() {
				letterOut._props.playstate = true;
				letterOut.play();
			});

			// shows the "o" letter of the logo on leave
			logo.addEventListener('mouseleave', function() {
				if (letterOut._props.playstate == true) {
					letterOut.playBackward();
				}
			});
		});
	})();

	// manages emergence js
	(window.initEmergence = function() {

		// manages the motio vertical wrapper
		const motioWrapper = document.querySelector('.wrapper-motio-vertical');

		// checks if the motio vertical wrapper is present on the page
		if (motioWrapper != null) {

			// mojs options and objects for the motio vertical tween
			const motioOptions = {
				interval: 100,
				playstate: false,
				strokeWidth: 65.502,
				duration: 800,
				easing: easingCurve,
				isForce3d: true
			};

			var motioTween = {
				'vertical letter-m': new mojs.Timeline().add(
					new mojs.Html(
						mojs.helpers.extend({
							el: '.shape-letter-m-arc1',
							strokeDasharray: 466.61,
							strokeDashoffset: { [-466.61] : 0 }
						}, motioOptions)
					),
					new mojs.Html(
						mojs.helpers.extend({
							el: '.shape-letter-m-arc2',
							strokeDasharray: 466.61,
							strokeDashoffset: { [-466.61] : 0 },
							delay: motioOptions.interval
						}, motioOptions)
					),
					new mojs.Html(
						mojs.helpers.extend({
							el: '.shape-letter-m-vertical',
							strokeDasharray: 248.51,
							strokeDashoffset: { 248.51 : 0 },
							delay: motioOptions.interval * 2
						}, motioOptions)
					)
				),
				'vertical letter-o': new mojs.Html(
					mojs.helpers.extend({
						el: '.shape-letter-o',
						transformOrigin: '244px 126px',
						strokeDasharray: 438.81,
						strokeDashoffset: { [-438.81] : 0 },
						angleZ: { [-180] : 0 }
					}, motioOptions)
				),
				'vertical letter-t': new mojs.Timeline().add(
					new mojs.Html(
						mojs.helpers.extend({
							el: '.shape-letter-t-horizontal',
							strokeDasharray: 170.878,
							strokeDashoffset: { [-170.878] : 0 },
							strokeWidth: 60.262,
							delay: motioOptions.interval
						}, motioOptions)
					),
					new mojs.Html(
						mojs.helpers.extend({
							el: '.shape-letter-t-vertical',
							strokeDasharray: 360.33,
							strokeDashoffset: { [-360.33] : 0 }
						}, motioOptions)
					)
				),
				'vertical letter-i': new mojs.Timeline().add(
					new mojs.Html(
						mojs.helpers.extend({
							el: '.shape-letter-i-vertical',
							strokeDasharray: 128.45,
							strokeDashoffset: { 128.45 : 0 },
							strokeWidth: 68.777,
							delay: 200
						}, motioOptions)
					),
					new mojs.Html(
						mojs.helpers.extend({
							el: '.shape-letter-i-dot',
							fill: colors.vibrant,
							transformOrigin: '40px 40px',
							scale: { 0 : 1 }
						}, motioOptions)
					)
				),
				'vertical letter-o-last': new mojs.Html(
					mojs.helpers.extend({
						el: '.shape-letter-o-last',
						transformOrigin: '244px 126px',
						strokeDasharray: 438.79,
						strokeDashoffset: { 438.79 : 0 },
						angleZ: { 180 : 0 }
					}, motioOptions)
				)
			};
		}

		// initializes emergence js
		emergence.init({
			elemCushion: 1,
			offsetTop: screen.small ? 90 : 80,
			offsetBottom: screen.small ? -700 : 0,
			throttle: 100,
			callback: function(element, state) {
				if (screen.small) {
					return;
				}

				// animates the motio wrapper if present on the page
				if (motioWrapper != null && typeof(motioTween[element.className]) !== 'undefined') {
					const tween = motioTween[element.className];

					if (state == 'visible' && !tween._props.playstate) {
						tween._props.playstate = true;
						tween.play();
					}

					if (state == 'reset' && tween._props.playstate) {
						tween._props.playstate = false;
						tween.playBackward();
					}
				}
			}
		});
	})();

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

	// manages the footer scroll animation
	(window.initScrollTween = function() {
		let scrollY = 0;
		let throttle;
		let footer = document.querySelector('footer');

		// binds the scroll event to hide/show the footer content
		window.addEventListener('scroll', function() {
			scrollY = window.scrollY;
			window.cancelAnimationFrame(throttle);

			// displays the footer content and animate the footer logo depending on the scroll position
			throttle = window.requestAnimationFrame(function() {
				if (Math.floor(scrollY / (document.documentElement.scrollHeight - document.documentElement.clientHeight) * 100) >= (screen.small ? 85 : 95)) {
					if (!footer.classList.contains('show')) {
						footer.classList.add('show');
						footer.querySelector('.logo').dispatchEvent(new Event('mouseenter'));
					}
				} else {
					footer.classList.remove('show');
				}
			});
		});
	})();

	// binds the resize event to properly updates screen resolution object
	let debounce;

	window.addEventListener('resize', function(e) {
		clearTimeout(debounce);

		debounce = setTimeout(function() {
			screen = {
				small: window.innerWidth < 640,
				medium: window.innerWidth >= 640 && window.innerWidth < 1024,
				large: window.innerWidth >= 1024
			};
		}, 250);
	});

	// manages the dot custom cursor effect
	let dot = document.querySelector('.dot');
	let mouseX = dot.offsetLeft;
	let mouseY = dot.offsetTop;
	let tempX = mouseX;
	let tempY = mouseY;
	let deltaX = 0;
	let deltaY = 0;
	let init = false;
	let radius = dot.clientWidth / 2;
	let radius2 = dot.clientWidth;

	// binds the mousemove event to make the dot follow the mouse cursor
	document.addEventListener('mousemove', function(e) {

		// init the dot on first move
		if (!init) {
			dot.classList.add('init');
			init = true;
		}

		// stores the mouse position
		mouseX = e.clientX;
		mouseY = e.clientY;
	});

	// binds the mousedown event to decrease the dot size on mousedown
	document.addEventListener('mousedown', function() {
		dot.classList.add('down');
	});

	// binds the mouseup event to restore the dot size on mouseup
	document.addEventListener('mouseup', function(e) {
		dot.classList.remove('down');

		// creates a dot pulse effect on mouseup
		let dotPulse = new mojs.Shape({
			className: 'dot-pulse',
			shape: 'circle',
			left: 0,
			top: 0,
			x: e.pageX,
			y: e.pageY,
			radius: { 6 : 40 },
			fill: colors.contrast,
			opacity: { 0.5 : 0 },
			duration: 500,
			onComplete: function() {
				this.el.parentNode.removeChild(this.el);
			}
		}).play();
	});

	// follows the mouse cursor on every frame
	function dotframe() {

		// calcultates the new position to follow
		deltaX = mouseX - tempX;
		deltaY = mouseY - tempY;
		tempX += (deltaX - radius) * 0.22;
		tempY += (deltaY - radius) * 0.22;

		// sets the dot position
		dot.style.left = Math.round(tempX) + 'px';
		dot.style.top = Math.round(tempY) + 'px';

		// makes this function run at 60fps
		requestAnimationFrame(dotframe);
	}

	// run the dot frame
	dotframe();

	// manages the dot cursor size for all links
	(window.initDotCursor = function() {
		dot.classList.remove('link');

		// binds the mouseenter and mouseleave events of all links to increase/decrease the dot size
		Array.from(document.querySelectorAll('a, .button')).forEach(function(link) {
			link.addEventListener('mouseenter', function() {
				dot.classList.add('link');
			});

			link.addEventListener('mouseleave', function() {
				dot.classList.remove('link');
			});
		});
	})();
})();