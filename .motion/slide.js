'use strict';

(function(){

	// triangle shape for slide 01 tween
	const slide01 = new mojs.Shape({
		shape: 'polygon',
		points: 3,
		fill: 'transparent',
		stroke: '#f6cc00',
		strokeWidth: { 10 : 2 },
		radius: { 0 : 50 },
		duration: 1500
	}).play();

	// square shape for slide 02 tween
	const slide02 = new mojs.Shape({
		shape: 'polygon',
		points: 4,
		fill: 'transparent',
		stroke: '#509ee2',
		strokeWidth: { 10 : 2 },
		radius: { 0 : 50 },
		angle: { 0 : -360 },
		duration: 1500
	});

	// pentagon shape for slide 03 tween
	const slide03 = new mojs.Shape({
		shape: 'polygon',
		points: 5,
		fill: 'transparent',
		stroke: '#19f1ab',
		strokeWidth: { 10 : 2 },
		radius: { 0 : 50 },
		angle: { 0 : 360 },
		duration: 1500
	});

	// timeline array
	var timeline = [
		slide01,
		slide02,
		slide03
	];

	// current slide index, starts at 0 in an array
	var slide = 0;

  // binds the click event of the document
	document.addEventListener('click', function(e) {

		// stops the current tween
		timeline[slide].stop();

		// tunes the current tween
		timeline[slide].tune({
			duration: 1500
		});

		// next slide (based on timeline length)
		slide = slide + 1 == timeline.length ? 0 : slide + 1;

		// plays the next slide tween
		timeline[slide].play();
	});
})();