'use strict';

(function(){

	// defines some design constants
	const colors = {
		base: '#000',
		vibrant: '#00ffd3',
		contrast: '#fff',
		bright: '#5f5f5f',
		warning: '#f6cc00',
		fog: '#dadce0'
	};

	// creates the timeline
	const timeline = new mojs.Timeline({
		speed: 1.0,
		delay: 0
	});

	// defines the base options
	const options = {
		parent: document.querySelector('#illustration-404'),
		isForce3d: true
	};

	// fog tween
	const fogShape = mojs.stagger(mojs.Shape);
	const fog = new fogShape(
		mojs.helpers.extend({
			quantifier: 40,
			shape: 'line',
			stroke: colors.fog,
			strokeWidth: 'rand(1.5, 3)',
			strokeDasharray: '100%',
			strokeDashoffset: { '-100%' : '100%' },
			x: { 'rand(-250, 250)' : 'rand(-250, 250)' },
			y: 'rand(-40, 60)',
			opacity: { 0.8 : 0 },
			radius: 'rand(20, 60)',
			duration: 500,
			repeat: 100,
			delay: 'rand(0, 2000)',
			isShowEnd: false,
			speed: 0.03
		}, options)
	);

	// sun tween
	let sun = new mojs.Shape(
		mojs.helpers.extend({
			shape: 'circle',
			fill: colors.warning,
			left: '80%',
			top: '20%',
			radius: { 18 : 20 },
			opacity: { 0.2 : 0.3 },
			duration: 4000,
			repeat: 3000,
			isYoyo: true
		}, options)
	);

	// adds shapes to the timeline
	timeline.add(
		fog,
		sun
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