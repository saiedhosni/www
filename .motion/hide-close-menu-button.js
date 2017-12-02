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

	// cross shape to allow the user to close the menu
	let cross = new mojs.Shape(
		mojs.helpers.extend({
			shape: 'cross',
			className: 'menu-button-close',
			angle: 45,
			radius: 20,
			strokeWidth: 4,
			isShowStart: true
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