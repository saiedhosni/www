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

	// creates a shape
	const tilt = new mojs.Shape({
		shape: 'circle',
		radius: 3,
		fill: '#00ffdd',
		stroke: '#00ffdd',
		strokeWidth: 4,
		isShowStart: true,
		y:	{ '-100' : '100' },
		duration: 5000,
		//easing: 'M0, 100 C0, 100 10, 25 10, 25 C10, 25 62.42857142857143, 60 62.42857142857143, 60 C62.42857142857143, 60 100, 0 100, 0 ',
		//easing: 'M0, 0 C0, 0 30, 100 30, 100 C30, 100 60, 37 60, 37 C60, 37 100, 80 100, 80 ',
		//easing: 'M0, 0 C0, 0 12.777811038085517, 99.59581172374884 50, 100 C88.8370381485382, 100.42172359932991 100, 0 100, 0 ',
		easing: mojsCurve.getEasing()
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