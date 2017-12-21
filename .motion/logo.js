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

	// tween base time and delay
	let time = 500;
	let delay = 100;

	// defines the base options
	const options = {
		fill: 'transparent',
		stroke: colors.base,
		duration: time,
		easing: mojs.easing.path('M0,100 C50,100 50,67.578125 50,50 C50,32.421875 50,0 100,0'),
		isForce3d: true
	};

	// motio "m" tween
	let motion_m_vertical = new mojs.Html(
		mojs.helpers.extend({
			el: '#motio-m-vertical',
			strokeDasharray: 80,
			strokeDashoffset: { '-80' : 0 }
		}, options)
	);

	let motion_m_arc_1 = new mojs.Html(
		mojs.helpers.extend({
			el: '#motio-m-arc-1',
			strokeDasharray: 98,
			strokeDashoffset: { 98 : 0 },
			delay: delay
		}, options)
	);

	let motion_m_arc_2 = new mojs.Html(
		mojs.helpers.extend({
			el: '#motio-m-arc-2',
			strokeDasharray: 119,
			strokeDashoffset: { 119 : 0 },
			delay: delay * 2
		}, options)
	);

	// motio "o" tween
	let motion_o_first = new mojs.Html(
		mojs.helpers.extend({
			el: '#motio-o-first',
			strokeDasharray: 138,
			strokeDashoffset: { 138 : 0 },
			angleZ: { 90 : 0 },
			transformOrigin: '50% 50%',
			delay: delay * 3
		}, options)
	);

	// motio "t" tween
	let motio_t_horizontal = new mojs.Html(
		mojs.helpers.extend({
			el: '#motio-t-horizontal',
			strokeDasharray: 54,
			strokeDashoffset: { 54 : 0 },
			delay: delay * 4
		}, options)
	);

	let motio_t_vertical = new mojs.Html(
		mojs.helpers.extend({
			el: '#motio-t-vertical',
			strokeDasharray: 113,
			strokeDashoffset: { '-113' : 0 },
			delay: delay * 5
		}, options)
	);

	// motio "i" tween
	let motio_i_vertical = new mojs.Html(
		mojs.helpers.extend({
			el: '#motio-i-vertical',
			strokeDasharray: 40,
			strokeDashoffset: { '-40' : 0 },
			delay: delay * 6
		}, options)
	);

	let motio_i_dot = new mojs.Html(
		mojs.helpers.extend({
			el: '#motio-i-dot',
			r: { 0 : 12.633 },
			delay: delay * 7,
			fill: '#000'
		}, options)
	);

	// motio "o" tween
	let motio_o_last = new mojs.Html(
		mojs.helpers.extend({
			el: '#motio-o-last',
			strokeDasharray: 138,
			strokeDashoffset: { '-138' : 0 },
			angleZ: { '-90' : 0 },
			transformOrigin: '50% 50%',
			delay: delay * 8
		}, options)
	);

	// adds shapes to the timeline
	timeline.add(
		motion_m_vertical,
		motion_m_arc_1,
		motion_m_arc_2,
		motion_o_first,
		motio_t_horizontal,
		motio_t_vertical,
		motio_i_vertical,
		motio_i_dot,
		motio_o_last
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