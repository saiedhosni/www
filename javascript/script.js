'use strict';

(function() {

	// web developer console signature
	console.log('%c Made with ❤︎️ by Studio MOTIO — https://www.studiomotio.com', 'background:#000;color:#fff;padding:0.5em 1em;line-height:2;');

	// screen size detection (based on Foundation build)
	let screen = {
		small: window.innerWidth < 640,
		medium: window.innerWidth >= 640 && window.innerWidth < 1024,
		large: window.innerWidth >= 1024,
		touch: "ontouchstart" in document.documentElement || navigator.MaxTouchPoints > 0
	}

	// global motio object for global tweens
	window.motio = {};

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
	const flatCurve = mojs.easing.path('M0, 0 C0, 0 100, 0 100, 0 ');
	const linearCurve = mojs.easing.path('M0, -100 C0, -100 100, 0 100, 0');
	const easingCurve = mojs.easing.path('M0,100 C50,100 50,67.578125 50,50 C50,32.421875 50,0 100,0');
	const elasticCurve = mojs.easing.path('M0, 0 C0, 0 4.849404450774318, 19.999999999999982 12.791828475731364, 20 C24.190094519338984, 19.428571428571438 29.27028214126006, -5.143614215712348 35, -5 C40.62000858830659, -4.856385784287652 45.232927349299665, 4.978765515972064 50, 5 C54.767072650700335, 5.02123448402794 54.71135836980356, -0.434601857594152 70, 0 C89.43392377726468, 0.14888757187990745 100, 0 100, 0');
	const reboundCurve = mojs.easing.path('M0, 100 C44.9687098810755, 100.46990312590644 32.608640807316306, -112.71428571428571 50, -112.71428571428571 C53.88142541784926, -113 50.5690732831949, -112.77159800612652 53.187808896210875, -112.71428571428571 C69.63942143079312, -112.6569734224449 62.47664961113968, 10.152839571695123 80, 10 C89.59652112056764, 9.84716042830488 89.16196028466256, -9.97870241527512 91.82926829268293, -10 C94.4965763007033, -10.021297584724882 95.18543962777919, -0.4699031259064711 100, 0');
	const scaleCurve = mojs.easing.path('M0, 0 C0, 0 40, 0 40, 0 C40.43668122270742, 13.428571428571429 41.99545637252657, 19.999999999999993 48.25324744707157, 20 C54.51103852161658, 20.000000000000007 65, -20 65, -20 C65, -20 74.54070841137144, 0.10152544552210262 100, 0');

	// global elements
	let body = document.querySelector('body');

	// detect touch screen and add a css class to the body
	if (screen.touch) {
		body.classList.add('touch');
	}

	// initializes prefetch of barba js
	Barba.Prefetch.init();

	// defines the barba js page transition
	Barba.Pjax.getTransition = function() {
		return Barba.BaseTransition.extend({
			start: function() {
				Promise.all([
					this.newContainerLoading,
					this.onLeave()
				]).then(this.onEnter.bind(this));
			},
			onLeave: function() {
				return new Promise(function(resolve, reject) {

					// disables the body scrollbars
					body.classList.add('no-scroll');

					// removes the dot link class
					dot.classList.remove('link');

					// creates the dot transition
					new mojs.Shape({
						className: 'dot-transition',
						shape: 'circle',
						left: 0,
						top: 0,
						x: motio.dotEventX,
						y: motio.dotEventY,
						radius: { 0 : motio.dotRadius },
						// need to optimize dot fill transition based on current page / next page
						// fill: { [colors[motio.dotColor == 'base' ? 'contrast' : 'base']] : colors[motio.dotColor] },
						fill: colors[motio.dotColor],
						duration: 1700,
						easing: mojs.easing.expo.inout,
						isForce3d: true,
						onComplete: function() {
							resolve();
						}
					}).play();
				});
			},
			onEnter: function() {
				let transition = this;

				// removes the dot transition layer from the DOM
				let dotlayer = document.querySelector('.dot-transition');
				dotlayer.parentNode.removeChild(dotlayer);

				new Promise(function(resolve, reject) {
					// need to manage onEnter transition depending on the page
					// Barba.HistoryManager.currentStatus().namespace;

					// restores the body scrollbars
					body.classList.remove('no-scroll');

					// scroll to the top when the new page is ready
					window.scrollTo(0, 0);

					resolve();
					transition.done();
				});
			}
		});
	};

	// index page base view
	Barba.BaseView.extend({
		namespace: 'index',
		onEnter: function() {

			// mojs options and objects for the "o" tween
			const path = document.querySelector('.motio-o-home path');
			const length = path.getTotalLength();

			const pathOptions = {
				el: path,
				strokeDasharray: length,
				transformOrigin: '50% 50%',
				strokeWidth: 24,
				duration: 1400,
				easing: mojs.easing.expo.inout,
				isForce3d: true
			};

			motio.oTweenEnter = new mojs.Html(
				mojs.helpers.extend({
					strokeDashoffset: { [length] : 0 },
					angleZ: { 0 : 360 }
				}, pathOptions)
			);
		},
		onEnterCompleted: function() {
			motio.oTweenEnter.play();
		}
	}).init();

	// studio page base view
	Barba.BaseView.extend({
		namespace: 'studio',
		onEnter: function() {

			// mojs options and objects for the motio vertical tween
			const motioOptions = {
				interval: 100,
				playstate: false,
				strokeWidth: 65.502,
				duration: 800,
				easing: easingCurve,
				isForce3d: true
			};

			motio.motioTween = {
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
	}).init();

	// services page base view
	Barba.BaseView.extend({
		namespace: 'services',
		onEnter: function() {

			// defines the base options
			const iOptions = {
				playstate: false,
				parent: '.letter-i-rebound',
				top: 200,
				fill: 'transparent',
				stroke: colors.vibrant,
				strokeWidth: 70,
				strokeDasharray: '100%',
				strokeDashoffset: { '100%' : 0 },
				duration: 800,
				easing: easingCurve
			};

			motio.iTween = {
				'vertical letter-i-rebound': new mojs.Timeline().add(
					new mojs.Shape(
						mojs.helpers.extend({
							shape: 'line',
							radius: 120,
							y: 0,
							angle: -90
						}, iOptions)
					).then({
						delay: 300,
						y: { 120 : 0 },
						radius: { 120 : 120, curve: elasticCurve },
						easing: elasticCurve
					}),
					new mojs.Shape(
						mojs.helpers.extend({
							shape: 'circle',
							stroke: 'transparent',
							fill: colors.vibrant,
							radius: { 20 : 37 },
							y: { 35 : -300 },
							delay: 400,
							duration: 400,
							easing: mojs.easing.circ.out
						}, iOptions)
					).then({
						radius: { 37 : 45, curve: flatCurve },
						scaleY: { 1 : 1, curve: scaleCurve },
						delay: 0,
						duration: 700,
						y: -210,
						easing: reboundCurve
					})
				)
			};
		}
	}).init();

	// contact page base view
	Barba.BaseView.extend({
		namespace: 'contact',
		onEnter: function() {

			// gets the contact form
			const form = document.querySelector('form');

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
		},
		onEnterCompleted: function() {

			// gets the text to type
			let text = document.querySelector('.type');
			let strings = text.innerText.split(',');

			// cleans the current text content
			text.innerText = '';

			// instanciates the typeit library and type
			let typewriter = new TypeIt('.type', {
				autoStart: false,
				startDelay: 500,
				cursor: false,
				speed: 70,
				callback: function() {
					const textarea = document.querySelector('textarea');

					if (textarea != null && window.scrollY == 0) {
						textarea.focus();
						textarea.setSelectionRange(0, 0);
					}

					typewriter.destroy();
				}
			}).type(strings[0] + ',').pause(500).type(strings[1]);
		}
	}).init();

	// 404 page base view
	Barba.BaseView.extend({
		namespace: '404',
		onEnter: function() {

			// mojs options and objects for the 404 tween
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
			new mojs.Shape({
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
					if (document.querySelector('.illustration-404') != null) {
						this.generate().replay();
					} else {
						this.stop();
					}
				}
			}).play();
		}
	}).init();

	// starts barba js
	Barba.Pjax.start();

	// manages the initStateChange event of barba js
	Barba.Dispatcher.on('initStateChange', function() {

		// updating Google Analytics properly
		if (typeof ga === 'function') {
			ga('send', 'pageview', location.pathname);
		}
	});

	// manages the linkClicked event of barba js
	Barba.Dispatcher.on('linkClicked', function(link, e) {

		// evaluates the color and position of the transition dot
		motio.dotColor = link.getAttribute('data-dot') || 'base';
		motio.dotEventX = e.pageX;
		motio.dotEventY = e.pageY;

		// evaluates the radius of the transition dot
		let deltaX = e.clientX <= window.innerWidth * 0.5 ? window.innerWidth - e.clientX : e.clientX;
		let deltaY = e.clientY <= window.innerHeight * 0.5 ? window.innerHeight - e.clientY : e.clientY;
		motio.dotRadius = Math.sqrt(deltaX * deltaX + deltaY * deltaY) + 20;
	});

	// manages the newPageReady event of barba js
	Barba.Dispatcher.on('newPageReady', function(currentStatus, prevStatus, HTMLElementContainer, newPageRawHTML) {

		// sets the body class to allow specific style override per page
		body.setAttribute('data-page', currentStatus.namespace);
	});

	// manages the transitionCompleted event of barba js
	Barba.Dispatcher.on('transitionCompleted', function(currentStatus, prevStatus) {

		// destroys and rebuilds the smooth scrolling
		motio.smooth.destroy();
		motio.smooth.options.section = document.querySelector('.smooth-scroll');
		motio.smooth = new Smooth(motio.smooth.options);
		motio.smooth.init();

		// fires emergence on transition complete
		emergence.engage();

		// inits some stuff for the new page
		motio.bindDotCursor(true);
		motio.bindLogos(true);
	});

	// initializes emergence js
	emergence.init({
		elemCushion: 1,
		offsetTop: screen.small ? 90 : 110,
		offsetBottom: screen.small ? -700 : 0,
		throttle: 110,
		callback: function(element, state) {
			if (screen.small) {
				return;
			}

			// animates the motio wrapper if present on the page
			if (typeof motio.motioTween !== 'undefined' && typeof motio.motioTween[element.className] !== 'undefined') {
				const tween = motio.motioTween[element.className];

				if (state == 'visible' && !tween._props.playstate) {
					tween._props.playstate = true;
					tween.play();
				}

				if (state == 'reset' && tween._props.playstate) {
					tween._props.playstate = false;
					tween.playBackward();
				}
			}

			// animates the i wrapper if present on the page
			if (typeof motio.iTween !== 'undefined' && typeof motio.iTween[element.className] !== 'undefined') {
				const tween = motio.iTween[element.className];

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

	// manages all logos animations
	(motio.bindLogos = function(transitionCompleted) {
		Array.from(document.querySelectorAll(typeof transitionCompleted !== 'undefined' ? 'footer .logo' : '.logo')).forEach(function(logo) {

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

	// manages the footer scroll animation
	let throttle;
	let scrollY = 0;
	let visibility = false;

	// binds the scroll event to hide/show the footer content
	window.addEventListener('scroll', function() {
		scrollY = window.scrollY;
		window.cancelAnimationFrame(throttle);

		// displays the footer content and animate the footer logo depending on the scroll position
		throttle = window.requestAnimationFrame(function() {
			if (Math.floor(scrollY / (document.documentElement.scrollHeight - document.documentElement.clientHeight) * 100) >= (screen.small ? 100 : 97)) {
				if (!visibility) {
					document.querySelector('footer').classList.add('show');
					visibility = true;
					setTimeout(() => {
						document.querySelector('footer .logo').dispatchEvent(new Event('mouseenter'));
					}, 500);
				}
			} else {
				if (visibility) {
					document.querySelector('footer').classList.remove('show');
					visibility = false;
				}
			}
		});
	});

	// binds the resize event to properly updates screen resolution object
	let debounce;

	window.addEventListener('resize', function(e) {
		clearTimeout(debounce);

		debounce = setTimeout(function() {
			screen = {
				small: window.innerWidth < 640,
				medium: window.innerWidth >= 640 && window.innerWidth < 1024,
				large: window.innerWidth >= 1024,
				touch: "ontouchstart" in document.documentElement || navigator.MaxTouchPoints > 0
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

		// support for non-blending browsers: this value is override by css for browsers that supports blending mode
		let blend = dot.classList.contains('support') ? colors.base : colors.contrast;

		// creates a dot pulse effect on mouseup
		new mojs.Shape({
			className: 'dot-pulse',
			shape: 'circle',
			left: 0,
			top: 0,
			x: e.pageX,
			y: e.pageY,
			radius: { 6 : 40 },
			fill: blend,
			opacity: { 0.35 : 0 },
			duration: 500,
			isForce3d: true,
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
		tempX += (deltaX - radius) * 0.25;
		tempY += (deltaY - radius) * 0.25;

		// sets the dot position
		dot.style.left = Math.round(tempX) + 'px';
		dot.style.top = Math.round(tempY) + 'px';

		// makes this function run at 60fps
		requestAnimationFrame(dotframe);
	}

	// run the dot frame
	dotframe();

	// manages the dot cursor size for all links
	(motio.bindDotCursor = function(transitionCompleted) {

		// binds the mouseenter/mouseleave/click events of all links to increase/decrease the dot size and avoid page reload on same urls
		Array.from(document.querySelectorAll(typeof transitionCompleted !== 'undefined' ? 'main a, main .button' : 'a, .button')).forEach(function(link) {
			link.addEventListener('mouseenter', function() {
				dot.classList.add('link');
			});

			link.addEventListener('mouseleave', function() {
				dot.classList.remove('link');
			});

			link.addEventListener('click', function(e) {
				dot.classList.remove('link');

				if (this.href == window.location.href) {
					e.preventDefault();
					setTimeout(function () {
						window.scroll({
							top: 0,
							left: 0,
							behavior: 'smooth'
						});
					}, 500);
				}
			});
		});

		// binds the mouseenter and mouseleave events of all white sections and footer to support the dot circle fill transition
		Array.from(document.querySelectorAll('section.white, footer.white')).forEach(function(element) {
			element.addEventListener('mouseenter', function() {
				dot.classList.add('support');
			});

			element.addEventListener('mouseleave', function() {
				dot.classList.remove('support');
			});
		});
	})();

	// builds the smooth scrolling
	motio.smooth = new Smooth({
		section: document.querySelector('.smooth-scroll'),
		native: true,
		noscrollbar: true,
		preload: false,
		ease: 0.1
	});

	motio.smooth.init();
})();