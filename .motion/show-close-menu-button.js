'use strict';

(function(){

	// defines some design constants
	const colors = {
		base: '#000',
		vibrant: '#00ffd3',
		contrast: '#fff',
		bright: '#5f5f5f',
		warning: '#f6cc00'
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

	// tween base time
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

	// burst for pulse tween
	let pulse = new mojs.Burst({
		radius: { 0 : 60 },
		children: mojs.helpers.extend({
			shape: 'line',
			radius: { 5 : 2, curve: linearCurve },
			duration: time * 1.5,
			delay: 70,
		}, options)
	});

	// cross shape to allow the user to close the menu
	let cross = new mojs.Shape(
		mojs.helpers.extend({
			shape: 'cross',
			angle: 45,
			radius: { 0 : 20 },
			strokeWidth: 4,
			easing: 'circ.out',
			duration: time * 2,
			delay: 200
		}, options)
	);

	// staggered shape for bubbles around the cross
	const stage = mojs.stagger(mojs.Shape);
	const bubbles = new stage(
		mojs.helpers.extend({
			shape: 'circle',
			radius: [{ 0: 10 }, { 0: 6 }, { 0: 4 }],
			quantifier: 3,
			x: ['rand(-30px, -20px)', 'rand(5px, 10px)', 'rand(15px, 30px)'],
			y: ['rand(-20px, -40px)', 'rand(30px, 40px)', 'rand(-10px, -20px)'],
			opacity: { 1 : 0, curve: linearCurve },
			stroke: colors.vibrant,
			delay: 'stagger(' + (time - 200) + ', 150)'
		}, options)
	);

	// adds shapes to the timeline
	timeline.add(
		circle,
		pulse,
		cross,
		bubbles
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