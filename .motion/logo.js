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
		radius: 5,
		fill: colors.vibrant,
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

	// adds shapes to the timeline
	timeline.add(
		tilt,
		burst
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