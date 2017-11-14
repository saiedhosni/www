'use strict';

(function(){

	// defines some design constants
	const colors = {
		base: '#000',
		vibrant: '#00ffd3',
		contrast: '#fff',
		bright: '#5f5f5f'
	};

	// creates the curve editor
	const curve = new MojsCurveEditor({
		name: 'custom'
	});

	// creates the timeline
	const timeline = new mojs.Timeline({
		speed: 1.0,
		delay: 0
	});

	// creates the curves and easings
	const tiltBounce = mojs.easing.path('M0, 0 C0, 0 39.98856580219907, 0.41453685823112857 40, 100 C42.092030590252264, 104.15689171319744 43.124434296272355, 104.28571428571429 45, 100 C45.43679342240491, 0.2857142857142857 100, 0 100, 0');
	const tiltRebound = mojs.easing.path('M0, 0 C0, 0 40, 0 40, 0 C40, 0 43.49726775956284, 30 43.49726775956284, 30 C43.49726775956284, 30 45, -30 45, -30 C45, -30 45.98419091937623, -11.631097193165132 55, -5 C64.01580908062377, 1.6310971931651221 100, 0 100, 0');

	// creates a shape
	const tilt = new mojs.Shape({
		shape: 'circle',
		radius: 4,
		fill: 'transparent',
		stroke: colors.vibrant,
		strokeWidth: 2,
		isShowStart: false,
		y: {
			'-200' : '-200',
			curve: tiltBounce
		},
		scaleY: {
			1 : 1,
			curve: tiltRebound
		},
		origin: '50% 100%',
		duration: 1200,
		repeat: 1
	});

	// creates a burst
	const burst = new mojs.Burst({
		y: 10,
		degree: 180,
		angle: 90,
		count: 'rand(4, 6)',
		radius: {10 : 25},
		children: {
			radius: ['rand(1, 3)', 'rand(2, 4)', 'rand(1, 2)'],
			fill: [colors.base, colors.vibrant, colors.bright],
			opacity: {1 : 0.5},
			scale: {
				1 : 0,
				easing: 'quad.in'
			},
			pathScale: [0.8, null],
			easing: 'quint.out',
			delay: 500,
			repeat: 1
		}
	});

	var motionpath = new mojs.MotionPath({
		el: tilt.el,
		path: 'M0.91,88.5V0V88.5c0,0,0-38.8,9.99-38.8 c12.68,0,12.68,38.8,12.68,38.8s0-32.31,10.53-32.31c10.53,0,10.53,32.31,10.53,32.31c0-16.33,13.61-29.55,30.43-29.55 c7.43,0,13.45,5.91,13.45,13.2c0,7.3-6.02,13.21-13.45,13.21v0c-7.44,0-13.45-5.91-13.45-13.21c0-13.01,19.79-28.63,47.19-28.63 h-0.33c19.43,0,34.83,12.67,43.17,33.28c3.2,6.99,5.6,8.56,13.04,8.56c7.43,0,13.45-5.91,13.45-13.21c0,0,0-71.65-36.74-71.65 c-33.74,0-32.91,72.47-32.91,72.47c0,6.66,5.49,12.05,12.28,12.05c6.79,0,12.28-5.39,12.28-12.05V43.53',
		offsetY: -81,
		duration: 10000,
		//easing: curve.getEasing(),
		//isReverse: false,
		//delay: 2400
		//isRunLess: true
	});

	// adds shapes to the timeline
	timeline.add(
		//tilt,
		//burst,
		motionpath
	);

	// creates the player
	new MojsPlayer({
		add: timeline,
		isSaveState: true,
		isPlaying: false,
		isRepeat: false,
		isHidden: false
	});
})();