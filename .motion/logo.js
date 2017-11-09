'use strict';

(function(){

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

	const tileRebound = mojs.easing.path('M0, 0 C0, 0 40, 0 40, 0 C40, 0 43.49726775956284, 30 43.49726775956284, 30 C43.49726775956284, 30 45, -30 45, -30 C45, -30 45.98419091937623, -11.631097193165132 55, -5 C64.01580908062377, 1.6310971931651221 100, 0 100, 0');

	// creates a shape
	const tilt = new mojs.Shape({
		shape: 'circle',
		radius: 5,
		fill: '#00ffdd',
		isShowStart: false,
		y: {
			'-200' : '-200',
			curve: tiltBounce
		},
		scaleY: {
			1: 1,
			curve: tileRebound
		},
		origin: '50% 100%',
		duration: 1200
	});

	// adds shapes to the timeline
	timeline.add(
		tilt
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