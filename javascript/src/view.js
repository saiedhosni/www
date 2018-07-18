'use strict';

import mojs from 'mo-js';
import Barba from 'barba.js';
import emergence from 'emergence.js';
import TypeIt from 'typeit';
import {body, device, colors, curves} from './global.js';
import {motio} from './motio.js';
import {dot} from './dot.js';
import * as scroll from './scroll.js';
import * as event from './event.js';

export function init() {

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
				return new Promise(function(resolve) {

					// indicates that a transition is engaged
					motio.transitionEngaged = true;

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

				new Promise(function(resolve) {

					// restores the body scrollbars
					body.classList.remove('no-scroll');

					// scroll to the top when the new page is ready
					window.scrollTo(0, 0);

					// indicates that the transition is done
					resolve();
					transition.done();
					motio.transitionEngaged = false;
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

			motio.oTweenEnter = new mojs.Html({
				el: path,
				strokeDasharray: length,
				strokeDashoffset: device.large ? { [length] : 0 } : { [length] : (length / 3) * 2 },
				strokeWidth: 24,
				transformOrigin: '50% 50%',
				angleZ: device.large ? { 0 : 360 } : 0,
				duration: 1400,
				easing: mojs.easing.expo.inout
			});
		},
		onEnterCompleted: function() {
			motio.oTweenEnter.then({
				strokeDashoffset: 0,
				duration: 0
			}).play();
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
				easing: mojs.easing.expo.inout
			};

			motio.motioTween = {
				'vertical letter-m': new mojs.Timeline().add(
					new mojs.Html(
						mojs.helpers.extend({
							el: '.shape-letter-m-arc1',
							strokeDasharray: 466.61,
							strokeDashoffset: { 466.61 : 933.22 }
						}, motioOptions)
					),
					new mojs.Html(
						mojs.helpers.extend({
							el: '.shape-letter-m-arc2',
							strokeDasharray: 466.61,
							strokeDashoffset: { 466.61 : 933.22 },
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
						strokeDashoffset: { 438.81 : 877.62 },
						angleZ: { [-90] : 0 }
					}, motioOptions)
				),
				'vertical letter-t': new mojs.Timeline().add(
					new mojs.Html(
						mojs.helpers.extend({
							el: '.shape-letter-t-horizontal',
							strokeDasharray: 170.878,
							strokeDashoffset: { 170.878 : 341.756 },
							strokeWidth: 60.262,
							delay: motioOptions.interval
						}, motioOptions)
					),
					new mojs.Html(
						mojs.helpers.extend({
							el: '.shape-letter-t-vertical',
							strokeDasharray: 360.33,
							strokeDashoffset: { 360.33 : 720.66 }
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
						angleZ: { 90 : 0 },
						delay: 400
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
				className: 'isolated',
				top: 200,
				fill: 'transparent',
				stroke: colors.vibrant,
				strokeWidth: 70,
				strokeDasharray: '100%',
				strokeDashoffset: { '100%' : 0 },
				duration: 800,
				easing: mojs.easing.expo.inout
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
						radius: { 120 : 120, curve: curves.elastic },
						easing: curves.elastic
					}),
					new mojs.Shape(
						mojs.helpers.extend({
							shape: 'circle',
							stroke: 'transparent',
							strokeWidth: 0,
							fill: colors.vibrant,
							radius: { 20 : 37 },
							y: { 35 : -300 },
							delay: 400,
							duration: 400,
							easing: mojs.easing.circ.out
						}, iOptions)
					).then({
						radius: { 37 : 45, curve: curves.flat },
						scaleY: { 1 : 1, curve: curves.scale },
						delay: 0,
						duration: 700,
						y: -210,
						easing: curves.rebound
					})
				)
			};
		}
	}).init();

	// contact page base view
	Barba.BaseView.extend({
		namespace: 'contact',
		onEnter: function() {

			// mojs options and objects for the "arc" tween
			const path = document.querySelector('.shape-arc');
			const length = path.getTotalLength();

			motio.arcTween = {
				'letter-arc vertical': new mojs.Html({
					playstate: false,
					el: path,
					strokeDasharray: length,
					strokeDashoffset: { [length] : length * 2 },
					strokeWidth: device.large ? 28 : 40,
					duration: 1400,
					easing: mojs.easing.expo.inout
				})
			};

			// gets the contact form
			const form = document.querySelector('form');

			// binds the submit event of the form to validate the content
			form.addEventListener('submit', function(e) {

				// prevents default event
				e.preventDefault();

				// defines the mail regular expression
				const regex = /(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))/;

				// gets the textarea field
				const message = form.querySelector('textarea');

				// gets the post button
				const button = form.querySelector('button');

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
						if (request.responseText === 'posted') {
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
				request.send(`message=${message.value}`);
			});
		},
		onEnterCompleted: function() {

			// disables the type writer on small touch devices
			if (device.small && device.touch) {
				return;
			}

			// gets the text to type
			let text = document.querySelector('.type');
			let strings = text.innerText.split(',');

			// cleans the current text content
			text.innerText = '';

			// instanciates the typeit library and type
			let typewriter = new TypeIt('.type', {
				autoStart: false,
				startDelay: 1200,
				cursor: false,
				speed: 70,
				callback: function() {
					const textarea = document.querySelector('textarea');

					if (textarea !== null && textarea !== document.activeElement && window.scrollY === 0) {
						textarea.focus();
						textarea.setSelectionRange(0, 0);
					}

					typewriter.destroy();
				}
			}).type(`${strings[0]},`).pause(500).type(strings[1]);
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
				delay: 'rand(0, 400)'
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
				onComplete: function() {
					if (document.querySelector('.illustration-404') !== null) {
						this.generate().replay();
					} else {
						this.stop();
					}
				}
			}).play();
		}
	}).init();

	// manages the linkClicked event of barba js
	Barba.Dispatcher.on('linkClicked', function(link, e) {

		// defines that a click event from mouse/keyboard has been raised
		motio.clickEvent = true;

		// tunes the dot for the next transition
		dot.tune(link.getAttribute('data-dot') || 'base', e);

		// manages the mobile menu display if it is opened
		if (document.querySelector('.menu-trigger:checked') !== null) {
			let active = document.querySelector('.menu.mobile ul:not(.lang) > li.active');

			if (active !== null) {
				active.classList.add('out');
			}

			let item = link.classList.contains('index') ? document.querySelector('[data-target="index"]') : link.parentNode;

			if (link.classList.contains('index')) {
				item.classList.add('active', 'in');
			} else {
				item.classList.add('active', 'in');
			}

			setTimeout(function () {
				if (active !== null) {
					active.classList.remove('active', 'out');
				}

				item.classList.remove('in');
				document.querySelector('.menu-button-close').click();
			}, 500);
		}
	});

	// manages the initStateChange event of barba js
	Barba.Dispatcher.on('initStateChange', function() {

		// determines if the user is navigating with backward/forward arrows
		if (!motio.clickEvent) {

			// tunes the dot for the next transition
			dot.tune(motio.dotPreviousColor);
		}

		// resets the click event
		motio.clickEvent = false;
	});

	// manages the newPageReady event of barba js
	Barba.Dispatcher.on('newPageReady', function(currentStatus, prevStatus, HTMLElementContainer) {

		// sets the page title
		document.title = HTMLElementContainer.getAttribute('data-title');

		// updating Google Analytics properly
		if (typeof gtag === 'function') {
			const oops = currentStatus.namespace === '404';
			const fr = document.documentElement.lang === 'fr';

			gtag('config', 'UA-90171753-1', {
				'page_title': document.title,
				'page_location': oops ? location.href.replace(location.pathname, fr ? '/404' : '/en/404') : location.href,
				'page_path': oops ? (fr ? '/404' : '/en/404') : location.pathname
			});
		}

		// sets some body data attributes to allow specific style override per page
		body.setAttribute('data-page', currentStatus.namespace);
		body.setAttribute('data-color', motio.dotColor);

		// manages the mobile menu display if it is closed
		if (document.querySelector('.menu-trigger:checked') === null) {
			let active = document.querySelector('.menu.mobile ul:not(.lang) > li.active');

			if (active !== null) {
				active.classList.remove('active');
			}

			let item = document.querySelector(`[data-target="${currentStatus.namespace}"]`);

			if (item !== null) {
				item.classList.add('active');
			}
		}
	});

	// manages the transitionCompleted event of barba js
	Barba.Dispatcher.on('transitionCompleted', function() {

		// in preload mode, only fires emergence, isolation and the text effect
		if (!motio.preloaded) {

			// initializes emergence js
			emergence.init({
				elemCushion: 1,
				offsetTop: device.small ? 90 : 110,
				offsetBottom: device.small ? -700 : 0,
				throttle: 200,
				callback: function(element, state) {
					if (device.small) {
						return;
					}

					// gets the page namespace
					const page = body.getAttribute('data-page');

					// gets the tween object depending on the page
					let tweenObject = null;

					if (page === 'studio') {
						tweenObject = motio.motioTween;
					} else if (page === 'services') {
						tweenObject = motio.iTween;
					} else if (page === 'contact') {
						tweenObject = motio.arcTween;
					} else {
						return;
					}

					// plays the specified tween if the element is present on the page
					if (typeof tweenObject[element.className] !== 'undefined') {
						const tween = tweenObject[element.className];

						if (state === 'visible' && !tween._props.playstate) {
							tween._props.playstate = true;
							tween.play();
						}

						if (state === 'reset' && tween._props.playstate) {
							tween._props.playstate = false;
							tween.playBackward();
						}
					}
				}
			});

			// engage emergence
			emergence.engage();

			// binds the isolation
			event.bindIsolation();

			// animates the main title
			event.bindTextEffect();

			// indicates that the preload site has complete
			motio.preloaded = true;
			return;
		}

		// destroys and rebuilds the smooth scrolling
		scroll.rebuild();

		// fires emergence on transition complete
		emergence.engage();

		// inits some stuff for the new page
		event.bindLinks(true);
		event.bindLogos(true);
		event.bindIsolation();
		event.bindTextEffect();
	});
}