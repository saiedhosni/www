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

	// linear easing path (1:1)
	const linearCurve = mojs.easing.path('M0, -100 C0, -100 100, 0 100, 0');

	// tween duration time
	let time = 700;

	// defines the base options
	const options = {
		fill: 'transparent',
		stroke: colors.contrast,
		strokeWidth: { 4 : 0 },
		duration: time,
		isForce3d: true
	};

	// circle shape for explode tween
	let circle = new mojs.Shape(
		mojs.helpers.extend({
			shape: 'circle',
			radius: { 0 : 30 },
			opacity: { 1 : 0, curve: linearCurve }
		}, options)
	);

	const bubbles = new stage(
		mojs.helpers.extend({
			shape: 'circle',
			radius:  [{ 0: 10 },  { 0: 6 }, { 0: 4 }],
			quantifier: 3,
			x: '-100px',
			y: '-100px',
			delay: time
			// animate scale from `0` to staggered value (`1` for 1st module, `1.25` for 2nd, `1.5` for 3rd etc.)
			//scale: { 0: 'stagger(1, .25)' },
			// random value in range from `0` to staggered value (`200` for 1st module, `400` for 2nd, `600` for 3rd etc.)
			//x: 'stagger(-300, rand(100, 200))'
		}, options)
	);

	// adds shapes to the timeline
	timeline.add(
		circle,
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