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
	const motio_timeline = new mojs.Timeline({
		speed: 1.0,
		delay: 0
	});

	// tween interval
	let motio_interval = 100;

	// defines the base options
	const motio_options = {
		fill: 'transparent',
		stroke: colors.base,
		duration: 500,
		easing: mojs.easing.path('M0,100 C50,100 50,67.578125 50,50 C50,32.421875 50,0 100,0'),
		isForce3d: true
	};

	// motio "m" tween
	let motio_m_vertical = new mojs.Html(
		mojs.helpers.extend({
			el: '#motio-m-vertical',
			strokeDasharray: 80,
			strokeDashoffset: { '-80' : 0 }
		}, motio_options)
	);

	let motio_m_arc_1 = new mojs.Html(
		mojs.helpers.extend({
			el: '#motio-m-arc-1',
			strokeDasharray: 98,
			strokeDashoffset: { 98 : 0 },
			delay: motio_interval
		}, motio_options)
	);

	let motio_m_arc_2 = new mojs.Html(
		mojs.helpers.extend({
			el: '#motio-m-arc-2',
			strokeDasharray: 119,
			strokeDashoffset: { 119 : 0 },
			delay: motio_interval * 2
		}, motio_options)
	);

	// motio "o" tween
	let motio_o_first = new mojs.Html(
		mojs.helpers.extend({
			el: '#motio-o-first',
			strokeDasharray: 138,
			strokeDashoffset: { 138 : 0 },
			angleZ: { 90 : 0 },
			transformOrigin: '50% 50%',
			delay: motio_interval * 3
		}, motio_options)
	);

	// motio "t" tween
	let motio_t_horizontal = new mojs.Html(
		mojs.helpers.extend({
			el: '#motio-t-horizontal',
			strokeDasharray: 54,
			strokeDashoffset: { 54 : 0 },
			delay: motio_interval * 4
		}, motio_options)
	);

	let motio_t_vertical = new mojs.Html(
		mojs.helpers.extend({
			el: '#motio-t-vertical',
			strokeDasharray: 113,
			strokeDashoffset: { '-113' : 0 },
			delay: motio_interval * 5
		}, motio_options)
	);

	// motio "i" tween
	let motio_i_vertical = new mojs.Html(
		mojs.helpers.extend({
			el: '#motio-i-vertical',
			strokeDasharray: 40,
			strokeDashoffset: { '-40' : 0 },
			delay: motio_interval * 6
		}, motio_options)
	);

	let motio_i_dot = new mojs.Html(
		mojs.helpers.extend({
			el: '#motio-i-dot',
			r: { 0 : 12.633 },
			delay: motio_interval * 7,
			fill: '#000'
		}, motio_options)
	);

	// motio "o" tween
	let motio_o_last = new mojs.Html(
		mojs.helpers.extend({
			el: '#motio-o-last',
			strokeDasharray: 138,
			strokeDashoffset: { '-138' : 0 },
			angleZ: { '-90' : 0 },
			transformOrigin: '50% 50%',
			delay: motio_interval * 8
		}, motio_options)
	);

	// burst effect on start
	let burst_start = new mojs.Burst({
		x: -95,
		y: 0,
		count: 10,
		radius: { 5 : 50 },
		children: {
			shape: 'line',
			duration: 1000,
			radius: ['rand(2, 3)', 'rand(2, 3)', 'rand(2, 5)'],
			stroke: [colors.warning, colors.bright, colors.vibrant],
			scale: {
				1 : 0,
				easing: 'quad.in'
			},
			easing: 'quint.out'
		}
	});

	// adds shapes to the timeline
	motio_timeline.add(
		motio_m_vertical,
		motio_m_arc_1,
		motio_m_arc_2,
		motio_o_first,
		motio_t_horizontal,
		motio_t_vertical,
		motio_i_vertical,
		motio_i_dot,
		motio_o_last,
		burst_start
	);

	// creates the "studio" timeline
	const studio_timeline = new mojs.Timeline({
		speed: 1.0,
		delay: motio_o_last._o.delay + 300
	});

	// tween interval
	let studio_interval = 30;

	// defines the base options
	const studio_options = {
		fill: 'transparent',
		stroke: { 'transparent' : colors.base },
		duration: 1200,
		easing: mojs.easing.ease.in,
		isForce3d: true
	};

	// studio "s" tween
	let studio_s = new mojs.Html(
		mojs.helpers.extend({
			el: '#studio-s',
			strokeDasharray: 56.3,
			strokeDashoffset: { '-56.3' : 0 },
		}, studio_options)
	);

	// studio "t" tween
	let studio_t_horizontal = new mojs.Html(
		mojs.helpers.extend({
			el: '#studio-t-horizontal',
			strokeDasharray: 12,
			strokeDashoffset: { '12' : 0 },
			delay: studio_interval
		}, studio_options)
	);

	let studio_t_vertical = new mojs.Html(
		mojs.helpers.extend({
			el: '#studio-t-vertical',
			strokeDasharray: 34,
			strokeDashoffset: { '34' : 0 },
			delay: studio_interval * 2
		}, studio_options)
	);

	// studio "u" tween
	let studio_u = new mojs.Html(
		mojs.helpers.extend({
			el: '#studio-u',
			strokeDasharray: 50.2,
			strokeDashoffset: { '-50.2' : 0 },
			delay: studio_interval * 3
		}, studio_options)
	);

	let studio_u_vertical = new mojs.Html(
		mojs.helpers.extend({
			el: '#studio-u-vertical',
			strokeDasharray: 21.2,
			strokeDashoffset: { '-21.2' : 0 },
			delay: studio_interval * 4
		}, studio_options)
	);

	// studio "d" tween
	let studio_d = new mojs.Html(
		mojs.helpers.extend({
			el: '#studio-d',
			strokeDasharray: 62,
			strokeDashoffset: { '62' : 0 },
			angleZ: { '-90' : 0 },
			transformOrigin: '50% 50%',
			delay: studio_interval * 5
		}, studio_options)
	);

	let studio_d_vertical = new mojs.Html(
		mojs.helpers.extend({
			el: '#studio-d-vertical',
			strokeDasharray: 33,
			strokeDashoffset: { '33' : 0 },
			delay: studio_interval * 6
		}, studio_options)
	);

	// studio "i" tween
	let studio_i_vertical = new mojs.Html(
		mojs.helpers.extend({
			el: '#studio-i-vertical',
			strokeDasharray: 21.2,
			strokeDashoffset: { '-21.2' : 0 },
			delay: studio_interval * 7
		}, studio_options)
	);

	let studio_i_dot = new mojs.Html(
		mojs.helpers.extend({
			el: '#studio-i-dot',
			r: { 0 : 1.31 },
			stroke: 'transparent',
			fill: { 'transparent' : colors.base },
			delay: studio_interval * 8
		}, studio_options)
	);

	// studio "o" tween
	let studio_o = new mojs.Html(
		mojs.helpers.extend({
			el: '#studio-o',
			strokeDasharray: 63.3,
			strokeDashoffset: { '-63.3' : 0 },
			angleZ: { '280' : 0 },
			transformOrigin: '50% 50%',
			delay: studio_interval * 9
		}, studio_options)
	);

	// adds shapes to the timeline
	studio_timeline.add(
		studio_s,
		studio_t_horizontal,
		studio_t_vertical,
		studio_u,
		studio_u_vertical,
		studio_d,
		studio_d_vertical,
		studio_i_vertical,
		studio_i_dot,
		studio_o
	);

	// merges timelines
	motio_timeline.add(
		studio_timeline
	);

	// creates the player
	new MojsPlayer({
		add: motio_timeline,
		isSaveState: true,
		isPlaying: false,
		isRepeat: false,
		isHidden: false
	});
})();