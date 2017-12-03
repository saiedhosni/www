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
	let time = 1000;

	// defines the base options
	const options = {
		stroke: colors.contrast,
		duration: time,
		isForce3d: true
	};

	// cross shape to allow the user to close the menu
	let cross = new mojs.Shape(
		mojs.helpers.extend({
			shape: 'cross',
			className: 'menu-button-close',
			angle: 45,
			radius: 20,
			strokeWidth: 4,
			isShowStart: true,
			scale: { 1 : 0 },
			duration: time / 2
		}, options)
	);

	// adds shapes to the timeline
	timeline.add(
		cross
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