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

	// circle shape for explode tween
	let circle = new mojs.Shape({
		left: 0,
		top: 0,
		shape: 'circle',
		fill: 'transparent',
		stroke: '#f6cc00',
		strokeWidth: { 10 : 0 },
		radius: { 0 : 30 },
		duration: 1000,
		delay: 500,
		repeat: 500,
		isForce3d: true
	}).play();

  // binds the shape to the cursor position
	document.addEventListener('mousemove', function (e) {
		circle.tune({
			x: e.clientX,
			y: e.clientY,
		})
	});
})();