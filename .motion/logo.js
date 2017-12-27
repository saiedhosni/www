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

	// linear easing path (1:1)
	const linearCurve = mojs.easing.path('M0, -100 C0, -100 100, 0 100, 0');
	const bounceCurve = mojs.easing.path('M0, 50 C0, 50 17.25503118510422, -149.86658034848554 35, -150 C52.744968814895785, -150.13341965151443 62.32679796811743, 12.80677716048544 70, 25 C77.67320203188257, 37.193222839514554 100, 0 100, 0');
	const reboundCurve = mojs.easing.path('M0, 0 C0, 0 10, 95 10, 95 C10, 95 19.734172277623827, 0.13682671383441278 45, 0 C64.43392377726468, 0.14888757187990748 100, 0 100, 0');

	// tween interval
	let motio_interval = 150;

	// defines the base options
	const motio_options = {
		fill: 'transparent',
		stroke: colors.base,
		strokeWidth: 10,
		strokeDasharray: '100%',
		strokeDashoffset: { '100%' : 0 },
		y: -19,
		duration: 500,
		easing: mojs.easing.path('M0,100 C50,100 50,67.578125 50,50 C50,32.421875 50,0 100,0'),
		isForce3d: true
	};

	// defines the base shapes
	class MotioMArc1 extends mojs.CustomShape {
		getShape() { return '<path d="M38.56 50.39c0-5.36 5.17-9.7 11.54-9.7 6.3 0 11.43 4.25 11.53 9.54V64.6"/>'; }
		getLength() { return 47.7; }
	}

	class MotioMArc2 extends mojs.CustomShape {
		getShape() { return '<path d="M38.47 42.75c0-5.35 5.16-9.7 11.53-9.7 6.31 0 11.43 4.26 11.53 9.54v24.36"/>'; }
		getLength() { return 57.7; }
	}

	class MotioO extends mojs.CustomShape {
		getShape() { return '<path d="M50 64.21A14.21 14.21 0 1 0 35.8 50"/>'; }
		getLength() { return 66.9; }
	}

	class MotioT extends mojs.CustomShape {
		getShape() { return '<path d="M42.95 27.4v33.33c.03 6.39 2.56 10.73 7.9 11.64 2.18.37 4.07.17 6.2.17"/>';}
		getLength() { return 55; }
	}

	// adds all custom shapes to the library
	mojs.addShape('motio-m-arc1', MotioMArc1);
	mojs.addShape('motio-m-arc2', MotioMArc2);
	mojs.addShape('motio-o', MotioO);
	mojs.addShape('motio-t', MotioT);

	// motio "m" tween
	let motio_m_vertical = new mojs.Shape(
		mojs.helpers.extend({
			shape: 'line',
			strokeWidth: 10.5,
			radius: 19.4,
			x: -95,
			angle: -90,
		}, motio_options)
	);

	let motio_m_arc_1 = new mojs.Shape(
		mojs.helpers.extend({
			shape: 'motio-m-arc1',
			x: -83.3,
			y: -24.2,
			delay: motio_interval
		}, motio_options)
	);

	let motio_m_arc_2 = new mojs.Shape(
		mojs.helpers.extend({
			shape: 'motio-m-arc2',
			x: -60.1,
			y: -16.5,
			delay: motio_interval * 2
		}, motio_options)
	);

	// motio "o" tween
	let motio_o_first = new mojs.Shape(
		mojs.helpers.extend({
			shape: 'motio-o',
			x: -15.5,
			angle: { 90 : 0 },
			delay: motio_interval * 3
		}, motio_options)
	);

	// motio "t" tween
	let motio_t_horizontal = new mojs.Shape(
		mojs.helpers.extend({
			shape: 'line',
			strokeWidth: 9,
			radius: 13,
			x: 21.5,
			y: -33.8,
			delay: motio_interval * 4
		}, motio_options)
	);

	let motio_t_vertical = new mojs.Shape(
		mojs.helpers.extend({
			shape: 'motio-t',
			x: 27.5,
			y: -27.4,
			delay: motio_interval * 5
		}, motio_options)
	);

	// motio "i" tween
	let motio_i_vertical = new mojs.Shape(
		mojs.helpers.extend({
			shape: 'line',
			radius: 9.7,
			x: 47.5,
			y: -28.5,
			angle: -90,
			delay: motio_interval * 6
		}, motio_options)
	).then({
		delay: 85,
		y: { '-20' : '-28.5' },
		radius: { 9.7 : 9.7, curve: reboundCurve },
		easing: reboundCurve
	});

	let motio_i_dot = new mojs.Shape(
		mojs.helpers.extend({
			shape: 'circle',
			stroke: 'transparent',
			fill: colors.base,
			radius: { 5.3 : 6.3 },
			x: 47,
			y: { '-45' : -49.5, curve: bounceCurve },
			delay: motio_interval * 7 + 100
		}, motio_options)
	);

	// motio "o" tween
	let motio_o_last = new mojs.Shape(
		mojs.helpers.extend({
			shape: 'motio-o',
			x: 80.5,
			angle: { 180 : 90 },
			delay: motio_interval * 8
		}, motio_options)
	);

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
		motio_o_last
	);

	// creates the "studio" timeline
	const studio_timeline = new mojs.Timeline({
		speed: 1.0,
		delay: motio_o_last._o.delay + 300
	});

	// tween interval
	let studio_interval = 70;

	// defines the base options
	const studio_options = {
		fill: 'transparent',
		stroke: { 'transparent' : colors.base },
		strokeWidth: 0.71,
		strokeDasharray: '100%',
		strokeDashoffset: { '-100%' : 0 },
		y: -56,
		duration: 500,
		easing: mojs.easing.ease.in,
		isForce3d: true
	};

	// defines the base shapes
	class StudioS extends mojs.CustomShape {
		getShape() { return '<path d="M54.034 48.451c-.076-.852-.473-1.473-1.043-1.89-.633-.459-1.188-.563-2.086-.57-.279-.004-1.143-.021-1.807.368-.492.288-.83.608-1.033 1.105-.207.494-.242.729-.203 1.213.041.482.135.76.338 1.018.205.256.434.438.955.635.514.189 1.398.377 1.988.506a11.68 11.68 0 0 1 1.666.492c.355.137.803.346 1.021.578.248.266.336.441.408.635.055.146.152.523.121 1.029-.021.363-.078.701-.258 1.025-.143.256-.35.57-.742.813-.373.23-.91.514-1.754.572-1.096.078-1.426-.037-1.965-.195a2.968 2.968 0 0 1-1.51-1.07c-.215-.305-.443-.654-.5-1.23"/>'; }
		getLength() { return 27.4; }
	}

	class StudioT extends mojs.CustomShape {
		getShape() { return '<path d="M53.1758 55.6758c-.3281 0-1.4688.1826-2.0215-.004-.8457-.2665-1.0527-.7187-1.2783-1.1591-.2608-.6387-.2217-1.2246-.2295-2.0547V42.0332"/><path d="M47.3389 46.0557h5.7959"/>'; }
		getLength() { return 22.1; }
	}

	class StudioU extends mojs.CustomShape {
		getShape() { return '<path d="M54.579 45.869v6.64c-.094.723-.173 1.064-.554 1.727-.653 1.139-1.829 1.758-3.032 1.777-1.166.02-1.969-.34-2.585-1.006-.609-.658-.993-1.541-1.001-2.5v-6.638m7.172 0v10.304"/>'; }
		getLength() { return 34.71; }
	}

	class StudioD extends mojs.CustomShape {
		getShape() { return '<ellipse cx="51.002" cy="50.99" rx="4.564" ry="5.022"/><path d="M55.566 40.214v15.911"/>'; }
		getLength() { return 46.06; }
	}

	class StudioI extends mojs.CustomShape {
		getShape() { return '<circle cx="51" cy="41.907" r="0.7" stroke="none"/><path d="M50.965 45.97v10.305"/>'; }
		getLength() { return 10.53; }
	}

	class StudioO extends mojs.CustomShape {
		getShape() { return '<ellipse cx="50.999" cy="50.98" rx="4.777" ry="5.025"/>'; }
		getLength() { return 30.8; }
	}

	// adds all custom shapes to the library
	mojs.addShape('studio-s', StudioS);
	mojs.addShape('studio-t', StudioT);
	mojs.addShape('studio-u', StudioU);
	mojs.addShape('studio-d', StudioD);
	mojs.addShape('studio-i', StudioI);
	mojs.addShape('studio-o', StudioO);

	// studio "s" tween
	let studio_s = new mojs.Shape(
		mojs.helpers.extend({
			shape: 'studio-s',
			x: -97,
		}, studio_options)
	);

	// studio "t" tween
	let studio_t = new mojs.Shape(
		mojs.helpers.extend({
			shape: 'studio-t',
			x: -88,
			strokeDashoffset: { '100%' : 0 },
			delay: studio_interval
		}, studio_options)
	);

	// studio "u" tween
	let studio_u = new mojs.Shape(
		mojs.helpers.extend({
			shape: 'studio-u',
			x: -79,
			delay: studio_interval * 2
		}, studio_options)
	);

	// studio "d" tween
	let studio_d = new mojs.Shape(
		mojs.helpers.extend({
			shape: 'studio-d',
			x: -67,
			delay: studio_interval * 3
		}, studio_options)
	);

	// studio "i" tween
	let studio_i = new mojs.Shape(
		mojs.helpers.extend({
			shape: 'studio-i',
			fill: { 'transparent' : colors.base },
			x: -58,
			delay: studio_interval * 4
		}, studio_options)
	);

	// studio "o" tween
	let studio_o = new mojs.Shape(
		mojs.helpers.extend({
			shape: 'studio-o',
			x: -49,
			strokeDashoffset: { '100%' : 0 },
			delay: studio_interval * 5
		}, studio_options)
	);

	// stagger effect on the "studio" word
	var diagonalLinesStagger = mojs.stagger(mojs.Shape);
	var stagger_diagonal = new diagonalLinesStagger({
		quantifier: 10,
		shape: 'line',
		stroke: [colors.bright, colors.vibrant],
		strokeWidth: { 'rand(1, 5)' : 0 },
		strokeDasharray: '100%',
		strokeDashoffset: { '-100%': '100%' },
		opacity: { 1 : 0, curve: linearCurve },
		x: 'rand(-120, -20)',
		y: 'rand(-70, -40)',
		radius: 40,
		angle: '-45',
		duration: 'rand(250, 700)',
		delay: 'rand(0, 500)'
	});

	// adds shapes to the timeline
	studio_timeline.add(
		studio_s,
		studio_t,
		studio_u,
		studio_d,
		studio_i,
		studio_o,
		stagger_diagonal
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